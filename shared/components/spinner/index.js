import { html, LitElement, unsafeCSS } from 'lit';
import { isNumber } from '@shared/utils';
import styles from './style.scss?inline';
import '../theme';

export class MagicSpinner extends LitElement {
  static properties = {
    /* 旋转圆环尺寸 */
    size: String,
    /* 圆环激活色 */
    color: String,
    /* 提示文案 */
    text: String,
    /* 是否上下垂直排列 */
    vertical: Boolean,
    /* 圆环边框线条宽度 */
    strokeWidth: { type: Number, attribute: 'stroke-width' },
  };

  static styles = unsafeCSS(styles);

  constructor() {
    super();
    this.size = '24';
    this.color = '';
    this.text = '';
    this.vertical = true;
    this.strokeWidth = 3;
  }

  render() {
    const sizeVal =
      isNumber(this.size) || /^\d+$/.test(String(this.size)) ? `${this.size}px` : this.size;

    const dynamicStyle = [
      sizeVal ? `--magic-spinner-size: ${sizeVal}` : '',
      this.color ? `--magic-spinner-color: ${this.color}` : '',
      this.strokeWidth ? `--magic-spinner-border-width: ${this.strokeWidth}px` : '',
    ]
      .filter(Boolean)
      .join('; ');

    return html`
      <div class="magic-spinner ${this.vertical ? 'is-vertical' : ''}" style="${dynamicStyle}">
        <div class="magic-spinner__circle"></div>
        ${
          this.text
            ? html`<span class="magic-spinner__text"><slot>${this.text}</slot></span>`
            : html`<slot></slot>`
        }
      </div>
    `;
  }
}

if (!customElements.get('magic-spinner')) {
  customElements.define('magic-spinner', MagicSpinner);
}
