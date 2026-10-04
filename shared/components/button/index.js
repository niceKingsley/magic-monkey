import { html, LitElement, unsafeCSS } from 'lit';
import styles from './style.scss?inline';
import '../spinner/index.js';
import '../theme.js';

export class MagicButton extends LitElement {
  static properties = {
    /* 按钮类型变体 */
    type: String,
    /* 按钮尺寸 */
    size: String,
    /* 是否禁用 */
    disabled: { type: Boolean, reflect: true },
    /* 是否处于加载中状态 */
    loading: { type: Boolean, reflect: true },
    /* 是否圆角胶囊形状 */
    round: Boolean,
    /* 是否正圆图标按钮形状 */
    circle: Boolean,
    /* 是否撑满容器宽度 */
    block: Boolean,
  };

  static styles = unsafeCSS(styles);

  constructor() {
    super();
    this.type = 'default';
    this.size = 'medium';
    this.disabled = false;
    this.loading = false;
    this.round = false;
    this.circle = false;
    this.block = false;
  }

  get spinnerSize() {
    const sizeMap = {
      small: 12,
      medium: 14,
      large: 16,
    };
    return sizeMap[this.size] || 14;
  }

  handleClick(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  render() {
    const classes = [
      'magic-button',
      `magic-button--${this.type || 'default'}`,
      `magic-button--${this.size || 'medium'}`,
      this.disabled || this.loading ? 'is-disabled' : '',
      this.loading ? 'is-loading' : '',
      this.round ? 'is-round' : '',
      this.circle ? 'is-circle' : '',
      this.block ? 'is-block' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <button
        class="${classes}"
        ?disabled=${this.disabled || this.loading}
        @click=${this.handleClick}
      >
        ${
          this.loading
            ? html`
                <span class="magic-button__loading-icon">
                  <slot name="loading">
                    <magic-spinner
                      size="${this.spinnerSize}"
                      color="currentColor"
                      stroke-width="2"
                    />
                  </slot>
                </span>
              `
            : html`
                <span class="magic-button__icon">
                  <slot name="icon"></slot>
                </span>
              `
        }
        <span class="magic-button__content">
          <slot></slot>
        </span>
      </button>
    `;
  }
}

if (!customElements.get('magic-button')) {
  customElements.define('magic-button', MagicButton);
}
