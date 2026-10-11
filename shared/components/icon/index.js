import { html, LitElement, unsafeCSS } from 'lit';
import { isNumber } from '@shared/utils';
import { ICONS } from './icons';
import styles from './style.scss?inline';
import '../theme';

export class MagicIcon extends LitElement {
  static properties = {
    /* 图标名称 */
    name: String,
    /* 图标尺寸 (px 或 CSS 长度值) */
    size: String,
    /* 图标颜色 */
    color: String,
    /* 旋转角度 (度数) */
    rotate: Number,
    /* 是否以中心旋转动画 */
    spin: Boolean,
  };

  static styles = unsafeCSS(styles);

  constructor() {
    super();
    this.name = '';
    this.size = '';
    this.color = '';
    this.rotate = 0;
    this.spin = false;
  }

  render() {
    const icon = ICONS[this.name];
    const sizeVal =
      isNumber(this.size) || /^\d+$/.test(String(this.size)) ? `${this.size}px` : this.size;

    const dynamicStyle = [
      sizeVal ? `--magic-icon-size: ${sizeVal}` : '',
      this.color ? `--magic-icon-color: ${this.color}` : '',
      this.rotate ? `transform: rotate(${this.rotate}deg)` : '',
    ]
      .filter(Boolean)
      .join('; ');

    if (!icon) {
      return html`
        <span class="magic-icon ${this.spin ? 'is-spin' : ''}" style="${dynamicStyle}">
          <slot></slot>
        </span>
      `;
    }

    const isStroke = Boolean(icon.stroke);
    const strokeWidth = icon.stroke === true ? 2 : icon.stroke || 2;

    return html`
      <span class="magic-icon ${this.spin ? 'is-spin' : ''}" style="${dynamicStyle}">
        <svg
          viewBox="${icon.viewBox || '0 0 24 24'}"
          fill="${isStroke ? 'none' : 'currentColor'}"
          stroke="${isStroke ? 'currentColor' : 'none'}"
          stroke-width="${isStroke ? strokeWidth : '0'}"
          stroke-linecap="${icon.strokeLinecap || 'round'}"
          stroke-linejoin="${icon.strokeLinejoin || 'round'}"
          aria-hidden="true"
        >
          <path
            d="${icon.d}"
            clip-rule="${icon.clipRule || ''}"
            fill-rule="${icon.fillRule || ''}"
          />
        </svg>
      </span>
    `;
  }
}

if (!customElements.get('magic-icon')) {
  customElements.define('magic-icon', MagicIcon);
}
