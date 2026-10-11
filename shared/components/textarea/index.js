import { html, LitElement, nothing, unsafeCSS } from 'lit';
import styles from './style.scss?inline';
import '../theme';

export class MagicTextarea extends LitElement {
  static properties = {
    /* 文本域绑定的值 */
    value: { type: String, reflect: true },
    /* 占位提示文案 */
    placeholder: String,
    /* 尺寸规格 (small, medium, large) */
    size: String,
    /* 默认可见行数 */
    rows: { type: Number, attribute: 'rows' },
    /* 默认可见列数 */
    cols: { type: Number, attribute: 'cols' },
    /* 最大字符长度限制 */
    maxlength: { type: Number, attribute: 'maxlength' },
    /* 最小字符长度限制 */
    minlength: { type: Number, attribute: 'minlength' },
    /* 缩放模式 (none, vertical, horizontal, both) */
    resize: String,
    /* 是否处于禁用状态 */
    disabled: { type: Boolean, reflect: true },
    /* 是否处于只读状态 */
    readonly: { type: Boolean, reflect: true },
    /* 是否撑满父容器宽度 */
    block: { type: Boolean, reflect: true },
    /* 是否自动聚焦 */
    autofocus: Boolean,
    /* 是否展示字数统计 */
    showWordLimit: { type: Boolean, attribute: 'show-word-limit' },
    /* 是否处于聚焦状态 */
    focused: { state: true },
  };

  static styles = unsafeCSS(styles);

  constructor() {
    super();
    this.value = '';
    this.placeholder = '';
    this.size = 'medium';
    this.rows = 4;
    this.cols = undefined;
    this.maxlength = undefined;
    this.minlength = undefined;
    this.resize = 'none';
    this.disabled = false;
    this.readonly = false;
    this.block = false;
    this.autofocus = false;
    this.showWordLimit = false;
    this.focused = false;
  }

  get textareaElement() {
    return this.shadowRoot?.querySelector('.magic-textarea__inner') || null;
  }

  firstUpdated() {
    if (this.autofocus && !this.disabled && !this.readonly) {
      this.focus();
    }
  }

  focus() {
    this.textareaElement?.focus();
  }

  blur() {
    this.textareaElement?.blur();
  }

  select() {
    this.textareaElement?.select();
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

  renderWordLimit() {
    if (!this.showWordLimit) return null;
    const currentLength = (this.value || '').length;
    const limitText =
      this.maxlength > 0 ? `${currentLength}/${this.maxlength}` : `${currentLength}`;
    return html`<div class="magic-textarea__count">${limitText}</div>`;
  }

  render() {
    const classes = [
      'magic-textarea',
      `magic-textarea--${this.size || 'medium'}`,
      this.focused ? 'is-focused' : '',
      this.disabled ? 'is-disabled' : '',
      this.readonly ? 'is-readonly' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const innerStyle = this.resize ? `resize: ${this.resize};` : '';

    return html`
      <div class="${classes}">
        <textarea
          class="magic-textarea__inner"
          style="${innerStyle}"
          .value=${this.value ?? ''}
          .placeholder=${this.placeholder || ''}
          .disabled=${this.disabled}
          .readOnly=${this.readonly}
          rows=${this.rows > 0 ? this.rows : 4}
          cols=${this.cols > 0 ? this.cols : nothing}
          maxlength=${this.maxlength > 0 ? this.maxlength : nothing}
          minlength=${this.minlength > 0 ? this.minlength : nothing}
          @input=${this.handleInput}
          @change=${this.handleChange}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          @keydown=${this.handleKeyDown}
          @keyup=${this.handleKeyUp}
        ></textarea>
        ${this.renderWordLimit()}
      </div>
    `;
  }
}

if (!customElements.get('magic-textarea')) {
  customElements.define('magic-textarea', MagicTextarea);
}
