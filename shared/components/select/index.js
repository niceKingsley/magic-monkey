import { html, LitElement, unsafeCSS } from 'lit';
import { isArray, on } from '@shared/utils';
import styles from './style.scss?inline';
import '../theme';

const SELECT_ICONS = {
  arrowDown: html`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  `,
  chevronRight: html`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  `,
  clear: html`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  `,
};

export class MagicOption extends LitElement {
  static properties = {
    /* 选项绑定的真实�?*/
    value: String,
    /* 选项展示文本 */
    label: String,
    /* 是否禁用该选项 */
    disabled: { type: Boolean, reflect: true },
    /* 是否处于选中�?*/
    selected: { type: Boolean, reflect: true },
  };

  static styles = unsafeCSS(styles);

  constructor() {
    super();
    this.value = '';
    this.label = '';
    this.disabled = false;
    this.selected = false;
  }

  handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  render() {
    const classes = [
      'magic-option',
      this.selected ? 'is-selected' : '',
      this.disabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div class="${classes}" @click=${this.handleClick}>
        <slot>${this.label || this.value}</slot>
      </div>
    `;
  }
}

export class MagicSelect extends LitElement {
  static properties = {
    /* 当前选中的选项�?*/
    value: String,
    /* 未选中时的占位文本 */
    placeholder: String,
    /* 是否处于禁用状�?*/
    disabled: { type: Boolean, reflect: true },
    /* 是否支持一键清空选中�?*/
    clearable: Boolean,
    /* 尺寸规格 (small, medium, large) */
    size: String,
    /* 是否撑满父容器宽�?*/
    block: Boolean,
    /* 下拉菜单是否展开 */
    open: { type: Boolean, reflect: true },
    /* 传入的选项列表数据 [{ label, value, disabled, children }] */
    options: Array,
    /* 当前激活的二级子菜单父项�?*/
    activeSubmenuValue: { state: true },
    /* 二级子菜单垂直定位偏�?*/
    submenuTop: { state: true },
  };

  static styles = unsafeCSS(styles);

  #cleanupOutsideClick = null;

  constructor() {
    super();
    this.value = '';
    this.placeholder = '请选择';
    this.disabled = false;
    this.clearable = false;
    this.size = 'medium';
    this.block = false;
    this.open = false;
    this.options = [];
    this.activeSubmenuValue = '';
    this.submenuTop = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this.#cleanupOutsideClick = on(document, 'pointerdown', (event) =>
      this.handleOutsideClick(event),
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#cleanupOutsideClick?.();
  }

  handleOutsideClick(event) {
    if (this.open && !event.composedPath().includes(this)) {
      this.open = false;
      this.activeSubmenuValue = '';
    }
  }

  toggleDropdown(event) {
    event.stopPropagation();
    if (this.disabled) return;
    this.open = !this.open;
    if (!this.open) {
      this.activeSubmenuValue = '';
    }
  }

  handleClear(event) {
    event.stopPropagation();
    this.value = '';
    this.open = false;
    this.activeSubmenuValue = '';
    this.dispatchEvent(new CustomEvent('clear', { bubbles: true, composed: true }));
    this.dispatchChangeEvent('');
  }

  handleSelectOption(option, event) {
    event?.stopPropagation();
    if (option.disabled) return;

    this.value = option.value;
    this.open = false;
    this.activeSubmenuValue = '';
    this.dispatchChangeEvent(option.value, option.label);
  }

  dispatchChangeEvent(value, label = '') {
    const detail = { value, label };
    this.dispatchEvent(new CustomEvent('change', { detail, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('input', { detail, bubbles: true, composed: true }));
  }

  get currentLabel() {
    if (isArray(this.options) && this.options.length > 0) {
      const findInList = (list, parent = null) => {
        for (const item of list) {
          if (String(item.value) === String(this.value)) {
            return parent
              ? `${parent.label} · ${item.label ?? item.value}`
              : (item.label ?? item.value);
          }
          if (isArray(item.children)) {
            const match = findInList(item.children, item);
            if (match) return match;
          }
        }
        return null;
      };
      const match = findInList(this.options);
      if (match) return match;
    }

    const slot = this.shadowRoot?.querySelector('slot');
    if (slot) {
      const assigned = slot.assignedElements({ flatten: true });
      const matchedEl = assigned.find((el) => el.value === this.value);
      if (matchedEl) {
        return matchedEl.label || matchedEl.textContent?.trim() || matchedEl.value;
      }
    }

    return this.value || '';
  }

  get activeSubmenuItem() {
    if (!this.activeSubmenuValue || !isArray(this.options)) return null;
    return (
      this.options.find((item) => String(item.value) === String(this.activeSubmenuValue)) || null
    );
  }

  handleSlotClick(event) {
    const target = event.target.closest('magic-option');
    if (target && !target.disabled) {
      this.handleSelectOption({
        value: target.value,
        label: target.label || target.textContent?.trim(),
      });
    }
  }

  handleOptionMouseEnter(item, event) {
    if (isArray(item.children) && item.children.length > 0) {
      this.activeSubmenuValue = item.value;
      const target = event.currentTarget;
      this.submenuTop = target?.offsetTop || 0;
    } else {
      this.activeSubmenuValue = '';
    }
  }

  handleDropdownMouseLeave() {
    this.activeSubmenuValue = '';
  }

  renderSubOptionList(children) {
    if (!isArray(children) || children.length === 0) return html``;

    return children.map((item) => {
      const isSelected = String(item.value) === String(this.value);
      const classes = [
        'magic-option',
        isSelected ? 'is-selected' : '',
        item.disabled ? 'is-disabled' : '',
      ]
        .filter(Boolean)
        .join(' ');

      return html`
        <div class="${classes}" @click=${(e) => this.handleSelectOption(item, e)}>
          <span>${item.label ?? item.value}</span>
        </div>
      `;
    });
  }

  renderOptionList() {
    if (!this.options || this.options.length === 0) {
      return html`
        <div @click=${this.handleSlotClick}>
          <slot></slot>
        </div>
      `;
    }

    return this.options.map((item) => {
      const hasChildren = isArray(item.children) && item.children.length > 0;
      const isSelected = String(item.value) === String(this.value);
      const hasSelectedChild =
        hasChildren && item.children.some((c) => String(c.value) === String(this.value));
      const isActiveParent = String(item.value) === String(this.activeSubmenuValue);

      const classes = [
        'magic-option',
        isSelected ? 'is-selected' : '',
        hasSelectedChild ? 'has-selected-child' : '',
        isActiveParent ? 'is-active-parent' : '',
        item.disabled ? 'is-disabled' : '',
        hasChildren ? 'has-children' : '',
      ]
        .filter(Boolean)
        .join(' ');

      return html`
        <div
          class="${classes}"
          @mouseenter=${(e) => this.handleOptionMouseEnter(item, e)}
          @click=${(e) => {
            if (!hasChildren) {
              this.handleSelectOption(item, e);
            }
          }}
        >
          <span>${item.label ?? item.value}</span>
          ${
            hasChildren
              ? html`<span class="magic-option__arrow">${SELECT_ICONS.chevronRight}</span>`
              : html``
          }
        </div>
      `;
    });
  }

  render() {
    const hasValue = this.value !== undefined && this.value !== null && this.value !== '';
    const displayLabel = this.currentLabel;
    const subItem = this.activeSubmenuItem;

    const selectClasses = [
      'magic-select',
      `magic-select--${this.size || 'medium'}`,
      this.open ? 'is-open' : '',
      this.disabled ? 'is-disabled' : '',
      hasValue ? 'has-value' : '',
      this.clearable ? 'is-clearable' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div class="${selectClasses}">
        <div class="magic-select__trigger" @click=${this.toggleDropdown} role="button" tabindex="0">
          <span class="magic-select__label ${hasValue ? '' : 'is-placeholder'}">
            ${hasValue ? displayLabel : this.placeholder}
          </span>
          <span class="magic-select__suffix ${this.open ? 'is-reverse' : ''}">
            ${SELECT_ICONS.arrowDown}
          </span>
          ${
            this.clearable && hasValue && !this.disabled
              ? html`
                  <span
                    class="magic-select__clear"
                    @click=${this.handleClear}
                    title="清空"
                    role="button"
                  >
                    ${SELECT_ICONS.clear}
                  </span>
                `
              : html``
          }
        </div>

        ${
          this.open
            ? html`
                <div
                  class="magic-select__dropdown-container"
                  @mouseleave=${this.handleDropdownMouseLeave}
                >
                  <div class="magic-select__dropdown" role="listbox">
                    ${this.renderOptionList()}
                  </div>
                  ${
                    subItem && isArray(subItem.children)
                      ? html`
                          <div
                            class="magic-select__sub-dropdown"
                            style="top: ${this.submenuTop}px"
                            role="listbox"
                          >
                            ${this.renderSubOptionList(subItem.children)}
                          </div>
                        `
                      : html``
                  }
                </div>
              `
            : html``
        }
      </div>
    `;
  }
}

if (!customElements.get('magic-option')) {
  customElements.define('magic-option', MagicOption);
}

if (!customElements.get('magic-select')) {
  customElements.define('magic-select', MagicSelect);
}
