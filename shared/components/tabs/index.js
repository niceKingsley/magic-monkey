import { html, LitElement, unsafeCSS } from 'lit';
import { isArray, isObject, on } from '@shared/utils';
import styles from './style.scss?inline';
import '../theme';

export class MagicTabs extends LitElement {
  static properties = {
    /* 选项卡列表数据 [{ label, value, disabled }] */
    items: Array,
    /* 当前选中的选项卡值 */
    value: { type: String, reflect: true },
    /* 选项卡尺寸规格 (small, medium, large) */
    size: String,
    /* 选项卡展示类型 (capsule 胶囊模式, line 下划线模式) */
    type: String,
    /* 是否开启横向平滑滚动 */
    scrollable: { type: Boolean, reflect: true },
    /* 是否撑满父级容器宽度 */
    block: { type: Boolean, reflect: true },
    /* 内部状态：是否可向左滚动 */
    _canScrollLeft: { state: true },
    /* 内部状态：是否可向右滚动 */
    _canScrollRight: { state: true },
  };

  static styles = unsafeCSS(styles);

  #cleanups = [];

  constructor() {
    super();
    this.items = [];
    this.value = '';
    this.size = 'medium';
    this.type = 'capsule';
    this.scrollable = true;
    this.block = true;
    this._canScrollLeft = false;
    this._canScrollRight = false;

    this._isDragging = false;
    this._startX = 0;
    this._scrollLeftStart = 0;
    this._hasDragged = false;

    this._onScroll = this._onScroll.bind(this);
    this._onWheel = this._onWheel.bind(this);
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
  }

  get navElement() {
    return this.renderRoot?.querySelector('.magic-tabs__nav');
  }

  firstUpdated() {
    const nav = this.navElement;
    if (nav) {
      this.#cleanups.push(
        on(nav, 'scroll', this._onScroll, { passive: true }),
        on(nav, 'wheel', this._onWheel, { passive: false }),
        on(nav, 'mousedown', this._onMouseDown),
        on(window, 'mousemove', this._onMouseMove),
        on(window, 'mouseup', this._onMouseUp),
      );
    }
    this.updateScrollState();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#cleanups.forEach((fn) => fn?.());
    this.#cleanups = [];
  }

  updated(changedProperties) {
    if (changedProperties.has('items') || changedProperties.has('value')) {
      this.updateScrollState();
      const shouldSmooth = !changedProperties.has('items');
      setTimeout(() => {
        this.scrollToActiveItem(shouldSmooth);
      }, 0);
    }
  }

  updateScrollState() {
    const nav = this.navElement;
    if (!nav) return;

    const { scrollLeft, scrollWidth, clientWidth } = nav;
    const maxScrollLeft = Math.max(0, scrollWidth - clientWidth);

    this._canScrollLeft = scrollLeft > 2;
    this._canScrollRight = maxScrollLeft - scrollLeft > 2;
  }

  _onScroll() {
    this.updateScrollState();
  }

  _onWheel(event) {
    if (!this.scrollable) return;
    const nav = this.navElement;
    if (!nav) return;

    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      nav.scrollLeft += event.deltaY;
    }
  }

  _onMouseDown(event) {
    if (!this.scrollable || event.button !== 0) return;
    const nav = this.navElement;
    if (!nav) return;

    this._isDragging = true;
    this._hasDragged = false;
    this._startX = event.pageX;
    this._scrollLeftStart = nav.scrollLeft;
    nav.style.scrollBehavior = 'auto';
  }

  _onMouseMove(event) {
    if (!this._isDragging) return;
    const nav = this.navElement;
    if (!nav) return;

    const deltaX = event.pageX - this._startX;
    if (Math.abs(deltaX) > 4) {
      this._hasDragged = true;
    }

    nav.scrollLeft = this._scrollLeftStart - deltaX;
  }

  _onMouseUp() {
    if (!this._isDragging) return;
    this._isDragging = false;
    const nav = this.navElement;
    if (nav) {
      nav.style.scrollBehavior = 'smooth';
    }
  }

  scrollToActiveItem(smooth = true) {
    const nav = this.navElement;
    if (!nav) return;

    const activeItem = nav.querySelector('.magic-tabs__item.is-active');
    if (!activeItem) return;

    const targetLeft = activeItem.offsetLeft - (nav.clientWidth - activeItem.clientWidth) / 2;

    nav.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: smooth ? 'smooth' : 'auto',
    });
    this.updateScrollState();
  }

  handleItemClick(item, index, event) {
    if (this._hasDragged) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    const itemObj = isObject(item) ? item : null;
    const isDisabled = itemObj ? Boolean(itemObj.disabled) : false;
    if (isDisabled) {
      event.preventDefault();
      return;
    }

    const val = itemObj ? (itemObj.value ?? itemObj.label) : item;
    this.value = String(val);

    const detail = { value: this.value, item, index };
    this.dispatchEvent(new CustomEvent('change', { detail, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('tab-click', { detail, bubbles: true, composed: true }));
  }

  renderTabItem(item, index) {
    const itemObj = isObject(item) ? item : null;
    const label = itemObj ? (itemObj.label ?? itemObj.value) : item;
    const val = itemObj ? (itemObj.value ?? itemObj.label) : item;
    const isDisabled = itemObj ? Boolean(itemObj.disabled) : false;
    const isActive = String(this.value) === String(val);

    const classes = [
      'magic-tabs__item',
      isActive ? 'is-active' : '',
      isDisabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div
        class="${classes}"
        role="tab"
        tabindex="${isDisabled ? '-1' : '0'}"
        aria-selected="${isActive ? 'true' : 'false'}"
        @click=${(e) => this.handleItemClick(item, index, e)}
      >
        <span class="magic-tabs__label">${label}</span>
      </div>
    `;
  }

  render() {
    const navClasses = [
      'magic-tabs',
      `magic-tabs--${this.size || 'medium'}`,
      `magic-tabs--${this.type || 'capsule'}`,
      this.block ? 'is-block' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const safeItems = isArray(this.items) ? this.items : [];

    return html`
      <div class="${navClasses}">
        <slot name="prefix"></slot>
        <div class="magic-tabs__wrap">
          <div
            class="magic-tabs__shadow magic-tabs__shadow--left ${this._canScrollLeft ? 'is-show' : ''}"
          ></div>
          <div class="magic-tabs__nav" role="tablist">
            ${safeItems.map((item, index) => this.renderTabItem(item, index))}
          </div>
          <div
            class="magic-tabs__shadow magic-tabs__shadow--right ${this._canScrollRight ? 'is-show' : ''}"
          ></div>
        </div>
        <slot name="suffix"></slot>
      </div>
    `;
  }
}

if (!customElements.get('magic-tabs')) {
  customElements.define('magic-tabs', MagicTabs);
}
