import { html, LitElement, unsafeCSS } from 'lit';
import { isArray, on } from '@shared/utils';
import styles from './style.scss?inline';
import '../theme.js';

const SELECT_ICONS = {
  arrowDown: html`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9" />
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
    /* 选项绑定的真实值 */
    value: String,
    /* 选项展示文本 */
    label: String,
    /* 是否禁用该选项 */
    disabled: { type: Boolean, reflect: true },
    /* 是否处于选中态 */
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
    /* 当前选中的选项值 */
    value: String,
    /* 未选中时的占位文本 */
    placeholder: String,
    /* 是否处于禁用状态 */
    disabled: { type: Boolean, reflect: true },
    /* 是否支持一键清空选中值 */
    clearable: Boolean,
    /* 尺寸规格 (small, medium, large) */
    size: String,
    /* 是否撑满父容器宽度 */
    block: Boolean,
    /* 下拉菜单是否展开 */
    open: { type: Boolean, reflect: true },
    /* 传入的选项列表数据 [{ label, value, disabled }] */
    options: Array,
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
    }
  }

  toggleDropdown(event) {
    event.stopPropagation();
    if (this.disabled) return;
    this.open = !this.open;
  }

  handleClear(event) {
    event.stopPropagation();
    this.value = '';
    this.open = false;
    this.dispatchEvent(new CustomEvent('clear', { bubbles: true, composed: true }));
    this.dispatchChangeEvent('');
  }

  handleSelectOption(option, event) {
    event?.stopPropagation();
    if (option.disabled) return;

    this.value = option.value;
    this.open = false;
    this.dispatchChangeEvent(option.value, option.label);
  }

  dispatchChangeEvent(value, label = '') {
    const detail = { value, label };
    this.dispatchEvent(new CustomEvent('change', { detail, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('input', { detail, bubbles: true, composed: true }));
  }

  get currentLabel() {
    if (isArray(this.options) && this.options.length > 0) {
      const match = this.options.find((item) => String(item.value) === String(this.value));
      if (match) return match.label ?? match.value;
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

  handleSlotClick(event) {
    const target = event.target.closest('magic-option');
    if (target && !target.disabled) {
      this.handleSelectOption({
        value: target.value,
        label: target.label || target.textContent?.trim(),
      });
    }
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
          ${item.label ?? item.value}
        </div>
      `;
    });
  }

  render() {
    const hasValue = this.value !== undefined && this.value !== null && this.value !== '';
    const displayLabel = this.currentLabel;

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
                <div class="magic-select__dropdown" role="listbox">${this.renderOptionList()}</div>
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
