import { html, LitElement, unsafeCSS } from 'lit';
import { isNil, on } from '@shared/utils';
import styles from './style.scss?inline';
import '../theme.js';

export class MagicRadio extends LitElement {
  static properties = {
    /* 选项绑定的实际值 */
    value: String,
    /* 原生单选组表单名称 */
    name: String,
    /* 选项文案内容 */
    label: String,
    /* 是否处于选中状态 */
    checked: { type: Boolean, reflect: true },
    /* 是否处于禁用状态 */
    disabled: { type: Boolean, reflect: true },
    /* 尺寸规格 (small, medium, large) */
    size: String,
  };

  static styles = unsafeCSS(styles);

  constructor() {
    super();
    this.value = '';
    this.name = '';
    this.label = '';
    this.checked = false;
    this.disabled = false;
    this.size = 'medium';
  }

  handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    if (!this.checked) {
      this.checked = true;
      const detail = { value: this.value, checked: true };
      this.dispatchEvent(new CustomEvent('change', { detail, bubbles: true, composed: true }));
      this.dispatchEvent(new CustomEvent('input', { detail, bubbles: true, composed: true }));
    }
  }

  render() {
    const classes = [
      'magic-radio',
      `magic-radio--${this.size || 'medium'}`,
      this.checked ? 'is-checked' : '',
      this.disabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <label class="${classes}" @click=${this.handleClick}>
        <span class="magic-radio__input">
          <span class="magic-radio__inner"></span>
          <input
            type="radio"
            class="magic-radio__original"
            .name=${this.name}
            .value=${this.value}
            .checked=${this.checked}
            .disabled=${this.disabled}
            tabindex="-1"
            aria-hidden="true"
          />
        </span>
        <span class="magic-radio__label">
          <slot>${this.label}</slot>
        </span>
      </label>
    `;
  }
}

export class MagicRadioGroup extends LitElement {
  static properties = {
    /* 单选组当前选中的值 */
    value: String,
    /* 是否全局禁用单选组 */
    disabled: { type: Boolean, reflect: true },
    /* 排列方向 (horizontal, vertical) */
    direction: String,
    /* 统一设置子单选框尺寸 (small, medium, large) */
    size: String,
  };

  static styles = unsafeCSS(styles);

  #cleanupChange = null;

  constructor() {
    super();
    this.value = '';
    this.disabled = false;
    this.direction = 'horizontal';
    this.size = 'medium';
  }

  get radios() {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return [];
    return slot.assignedElements({ flatten: true }).filter((el) => el.tagName === 'MAGIC-RADIO');
  }

  connectedCallback() {
    super.connectedCallback();
    this.#cleanupChange = on(this, 'change', (event) => this.handleChildChange(event));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#cleanupChange?.();
  }

  firstUpdated() {
    this.syncRadios();
  }

  updated(changedProperties) {
    if (
      changedProperties.has('value') ||
      changedProperties.has('disabled') ||
      changedProperties.has('size')
    ) {
      this.syncRadios();
    }
  }

  handleSlotChange() {
    this.syncRadios();
  }

  handleChildChange(event) {
    if (event.target === this) return;
    const childVal = event.detail?.value ?? event.target.value;
    if (!isNil(childVal) && this.value !== childVal) {
      this.value = childVal;
      this.syncRadios();
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { value: this.value },
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  syncRadios() {
    const radios = this.radios;
    radios.forEach((radio) => {
      radio.checked = String(radio.value) === String(this.value);
      radio.disabled = !!this.disabled;
      if (this.size) {
        radio.size = this.size;
      }
    });
  }

  render() {
    const classes = [
      'magic-radio-group',
      this.direction === 'vertical' ? 'magic-radio-group--vertical' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div class="${classes}" role="radiogroup">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
}

if (!customElements.get('magic-radio')) {
  customElements.define('magic-radio', MagicRadio);
}

if (!customElements.get('magic-radio-group')) {
  customElements.define('magic-radio-group', MagicRadioGroup);
}
