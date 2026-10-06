import { html, LitElement, unsafeCSS } from 'lit';
import styles from './style.scss?inline';
import '../theme.js';

export class MagicVersion extends LitElement {
  static properties = {
    /* 版本号字符串*/
    version: String,
    /* 版本前缀*/
    prefix: String,
    /* 尺寸大小 (mini, small, medium) */
    size: String,
  };

  static styles = unsafeCSS(styles);

  constructor() {
    super();
    this.version = '';
    this.prefix = 'v';
    this.size = 'small';
  }

  /**
   * 获取解析格式化后的展示版本文本
   */
  get displayVersion() {
    let ver = (this.version || '').trim();
    if (!ver && typeof GM_info !== 'undefined') {
      ver = (GM_info?.script?.version || '').trim();
    }
    if (!ver) {
      return '';
    }

    const p = this.prefix != null ? this.prefix : 'v';
    if (!p) {
      return ver;
    }

    // 若版本号已包含此前缀（不区分大小写），则标准化去重
    const cleanVer = ver.replace(new RegExp(`^${p}`, 'i'), '');
    return `${p}${cleanVer}`;
  }

  render() {
    const classes = ['magic-version', `magic-version--${this.size || 'small'}`]
      .filter(Boolean)
      .join(' ');

    return html`
      <span class="${classes}">
        <slot name="prefix"></slot>
        <span class="magic-version__content">
          <slot>${this.displayVersion}</slot>
        </span>
        <slot name="suffix"></slot>
      </span>
    `;
  }
}

if (!customElements.get('magic-version')) {
  customElements.define('magic-version', MagicVersion);
}
