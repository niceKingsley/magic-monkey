import { html, LitElement, nothing, unsafeCSS } from 'lit';
import styles from './style.scss?inline';
import '../theme';

const INPUT_ICONS = {
  clear: html`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  `,
};

export class MagicInput extends LitElement {
  static properties = {
    /* 输入框绑定的值 */
    value: { type: String, reflect: true },
    /* 占位提示文案 */
    placeholder: String,
    /* 原生输入框类型 (text, password, number 等) */
    type: String,
    /* 尺寸规格 (small, medium, large) */
    size: String,
    /* 是否处于禁用状态 */
    disabled: { type: Boolean, reflect: true },
    /* 是否处于只读状态 */
    readonly: { type: Boolean, reflect: true },
    /* 是否展示一键清空图标按钮 */
    clearable: Boolean,
    /* 是否撑满父容器宽度 */
    block: { type: Boolean, reflect: true },
    /* 原生最大字符长度限制 */
    maxlength: { type: Number, attribute: 'maxlength' },
    /* 是否自动聚焦 */
    autofocus: Boolean,
    /* 是否处于聚焦状态 */
    focused: { state: true },
  };

  static styles = unsafeCSS(styles);

  constructor() {
    super();
    this.value = '';
    this.placeholder = '';
    this.type = 'text';
    this.size = 'medium';
    this.disabled = false;
    this.readonly = false;
    this.clearable = false;
    this.block = false;
    this.maxlength = undefined;
    this.autofocus = false;
    this.focused = false;
  }

  firstUpdated() {
    if (this.autofocus && !this.disabled && !this.readonly) {
      this.focus();
    }
  }

  get inputElement() {
    return this.shadowRoot?.querySelector('.magic-input__inner') || null;
  }

  focus() {
    this.inputElement?.focus();
  }

  blur() {
    this.inputElement?.blur();
  }

  select() {
    this.inputElement?.select();
  }

  handleInput(event) {
    event.stopPropagation();
    this.value = event.target.value;
    const detail = { value: this.value };
    this.dispatchEvent(new CustomEvent('input', { detail, bubbles: true, composed: true }));
  }

  handleChange(event) {
    event.stopPropagation();
    this.value = event.target.value;
    const detail = { value: this.value };
    this.dispatchEvent(new CustomEvent('change', { detail, bubbles: true, composed: true }));
  }

  handleFocus(event) {
    this.focused = true;
    this.dispatchEvent(
      new CustomEvent('focus', { detail: { event }, bubbles: true, composed: true }),
    );
  }

  handleBlur(event) {
    this.focused = false;
    this.dispatchEvent(
      new CustomEvent('blur', { detail: { event }, bubbles: true, composed: true }),
    );
  }

  handleKeyDown(event) {
    event.stopPropagation();
    this.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: event.key,
        code: event.code,
        keyCode: event.keyCode,
        which: event.which,
        shiftKey: event.shiftKey,
        ctrlKey: event.ctrlKey,
        altKey: event.altKey,
        metaKey: event.metaKey,
        repeat: event.repeat,
        isComposing: event.isComposing,
        bubbles: false,
        composed: false,
      }),
    );
  }

  handleKeyUp(event) {
    event.stopPropagation();
    this.dispatchEvent(
      new KeyboardEvent('keyup', {
        key: event.key,
        code: event.code,
        keyCode: event.keyCode,
        which: event.which,
        shiftKey: event.shiftKey,
        ctrlKey: event.ctrlKey,
        altKey: event.altKey,
        metaKey: event.metaKey,
        repeat: event.repeat,
        isComposing: event.isComposing,
        bubbles: false,
        composed: false,
      }),
    );
  }

  handleClear(event) {
    event.stopPropagation();
    event.preventDefault();
    this.value = '';
    this.dispatchEvent(
      new CustomEvent('clear', { detail: { value: '' }, bubbles: true, composed: true }),
    );
    this.dispatchEvent(
      new CustomEvent('input', { detail: { value: '' }, bubbles: true, composed: true }),
    );
    this.dispatchEvent(
      new CustomEvent('change', { detail: { value: '' }, bubbles: true, composed: true }),
    );
    this.focus();
  }

  renderClearBtn() {
    if (!this.clearable || !this.value || this.disabled || this.readonly) {
      return null;
    }
    return html`
      <span class="magic-input__clear" title="清空" @click=${this.handleClear}>
        ${INPUT_ICONS.clear}
      </span>
    `;
  }

  render() {
    const classes = [
      'magic-input',
      `magic-input--${this.size || 'medium'}`,
      this.focused ? 'is-focused' : '',
      this.disabled ? 'is-disabled' : '',
      this.readonly ? 'is-readonly' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div class="${classes}">
        <span class="magic-input__prefix">
          <slot name="prefix"></slot>
        </span>

        <input
          class="magic-input__inner"
          .type=${this.type || 'text'}
          .value=${this.value || ''}
          .placeholder=${this.placeholder || ''}
          .disabled=${this.disabled}
          .readOnly=${this.readonly}
          maxlength=${this.maxlength > 0 ? this.maxlength : nothing}
          @input=${this.handleInput}
          @change=${this.handleChange}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          @keydown=${this.handleKeyDown}
          @keyup=${this.handleKeyUp}
        />

        ${this.renderClearBtn()}

        <span class="magic-input__suffix">
          <slot name="suffix"></slot>
        </span>
      </div>
    `;
  }
}

if (!customElements.get('magic-input')) {
  customElements.define('magic-input', MagicInput);
}
