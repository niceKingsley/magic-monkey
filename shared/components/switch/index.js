import { html, LitElement, unsafeCSS } from 'lit';
import styles from './style.scss?inline';
import '../theme';

export class MagicSwitch extends LitElement {
  static properties = {
    /* 是否处于开启状态 */
    checked: { type: Boolean, reflect: true },
    /* 是否处于禁用状态 */
    disabled: { type: Boolean, reflect: true },
    /* 尺寸规格 (small, medium, large) */
    size: String,
    /* 开启状态时的提示文本 */
    activeText: { type: String, attribute: 'active-text' },
    /* 关闭状态时的提示文本 */
    inactiveText: { type: String, attribute: 'inactive-text' },
    /* 是否处于加载中状态 */
    loading: { type: Boolean, reflect: true },
  };

  static styles = unsafeCSS(styles);

  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
    this.size = 'medium';
    this.activeText = '';
    this.inactiveText = '';
    this.loading = false;
  }

  handleClick(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    this.checked = !this.checked;
    const detail = { value: this.checked };
    this.dispatchEvent(new CustomEvent('change', { detail, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('input', { detail, bubbles: true, composed: true }));
  }

  renderLabel() {
    const labelText = this.checked ? this.activeText : this.inactiveText || this.activeText;
    if (!labelText) {
      return html`<slot></slot>`;
    }
    return html`
      <span class="magic-switch__label">
        <slot>${labelText}</slot>
      </span>
    `;
  }

  render() {
    const classes = [
      'magic-switch',
      `magic-switch--${this.size || 'medium'}`,
      this.checked ? 'is-checked' : '',
      this.disabled ? 'is-disabled' : '',
      this.loading ? 'is-loading' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div
        class="${classes}"
        role="switch"
        aria-checked="${this.checked}"
        aria-disabled="${this.disabled}"
        tabindex="${this.disabled ? -1 : 0}"
        @click=${this.handleClick}
      >
        <span class="magic-switch__core">
          <span class="magic-switch__action"></span>
        </span>
        ${this.renderLabel()}
      </div>
    `;
  }
}

if (!customElements.get('magic-switch')) {
  customElements.define('magic-switch', MagicSwitch);
}
