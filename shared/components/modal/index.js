import { html, LitElement, unsafeCSS } from 'lit';
import { isFunction, isNumber, isString, on, once, sleep } from '@shared/utils';
import styles from './style.scss?inline';
import '../button/index';
import '../theme';

const MODAL_ICONS = {
  close: html`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  `,
};

export class MagicModal extends LitElement {
  static properties = {
    /* 弹窗标题 */
    title: String,
    /* 是否显示弹窗 */
    visible: { type: Boolean, reflect: true },
    /* 弹窗宽度 */
    width: String,
    /* 弹窗高度 */
    height: String,
    /* 弹窗内容最大高度 */
    maxHeight: { type: String, attribute: 'max-height' },
    /* 弹窗距离顶部距离 */
    top: String,
    /* 是否垂直居中对齐 */
    centered: Boolean,
    /* 是否展示遮罩层 */
    mask: Boolean,
    /* 点击遮罩层是否允许关闭 */
    maskClosable: { type: Boolean, attribute: 'mask-closable' },
    /* 是否展示右上角关闭按钮 */
    showClose: { type: Boolean, attribute: 'show-close' },
    /* 确认按钮文案 */
    confirmText: { type: String, attribute: 'confirm-text' },
    /* 取消按钮文案 */
    cancelText: { type: String, attribute: 'cancel-text' },
    /* 是否展示确认按钮 */
    showConfirm: { type: Boolean, attribute: 'show-confirm' },
    /* 是否展示取消按钮 */
    showCancel: { type: Boolean, attribute: 'show-cancel' },
    /* 确认按钮是否处于加载状态 */
    confirmLoading: { type: Boolean, attribute: 'confirm-loading' },
    /* 内部退出动画状态 */
    _isLeaving: { state: true },
  };

  static styles = unsafeCSS(styles);

  #cleanupKeydown = null;

  constructor() {
    super();
    this.title = '';
    this.visible = false;
    this.width = '480px';
    this.height = '';
    this.maxHeight = '';
    this.top = '15vh';
    this.centered = false;
    this.mask = true;
    this.maskClosable = false;
    this.showClose = true;
    this.confirmText = '确定';
    this.cancelText = '取消';
    this.showConfirm = true;
    this.showCancel = true;
    this.confirmLoading = false;
    this._isLeaving = false;
  }

  static confirm(options = {}) {
    return new Promise((resolve) => {
      const {
        title = '提示',
        content = '',
        confirmText = '确定',
        cancelText = '取消',
        showCancel = true,
        centered = true,
        width = '420px',
        onConfirm,
        onCancel,
      } = options;

      const modal = document.createElement('magic-modal');
      modal.title = title;
      modal.confirmText = confirmText;
      modal.cancelText = cancelText;
      modal.showCancel = showCancel;
      modal.centered = centered;
      modal.width = width;
      modal.innerHTML = isString(content) ? `<div>${content}</div>` : '';

      document.body.appendChild(modal);
      modal.visible = true;

      modal.addEventListener('confirm', async () => {
        if (isFunction(onConfirm)) {
          const res = await onConfirm();
          if (res === false) return;
        }
        modal.close();
        resolve(true);
      });

      modal.addEventListener('cancel', () => {
        if (isFunction(onCancel)) {
          onCancel();
        }
        resolve(false);
      });

      once(modal, 'close', () => modal.remove());
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.#cleanupKeydown = on(window, 'keydown', (event) => this.handleKeydown(event));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#cleanupKeydown?.();
  }

  updated(changedProperties) {
    if (changedProperties.has('visible')) {
      if (this.visible) {
        this._isLeaving = false;
      }
    }
  }

  handleKeydown(event) {
    if (this.visible && event.key === 'Escape' && this.showClose) {
      this.close();
    }
  }

  async close() {
    if (!this.visible && !this._isLeaving) return;
    this._isLeaving = true;
    await sleep(200);
    this.visible = false;
    this._isLeaving = false;
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  handleMaskClick(event) {
    if (this.maskClosable && event.target === event.currentTarget) {
      this.close();
    }
  }

  handleConfirm() {
    this.dispatchEvent(new CustomEvent('confirm', { bubbles: true, composed: true }));
  }

  handleCancel() {
    this.dispatchEvent(new CustomEvent('cancel', { bubbles: true, composed: true }));
    this.close();
  }

  renderHeader() {
    return html`
      <div class="magic-modal__header">
        <slot name="header">
          <span class="magic-modal__title">${this.title}</span>
        </slot>
        ${
          this.showClose
            ? html`
                <button class="magic-modal__close" @click=${this.close} title="关闭">
                  ${MODAL_ICONS.close}
                </button>
              `
            : html``
        }
      </div>
    `;
  }

  renderFooter() {
    return html`
      <div class="magic-modal__footer">
        <slot name="footer">
          ${
            this.showCancel
              ? html`
                  <magic-button
                    type="default"
                    @click=${this.handleCancel}
                    .disabled=${this.confirmLoading}
                  >
                    ${this.cancelText}
                  </magic-button>
                `
              : html``
          }
          ${
            this.showConfirm
              ? html`
                  <magic-button
                    type="primary"
                    @click=${this.handleConfirm}
                    .loading=${this.confirmLoading}
                  >
                    ${this.confirmText}
                  </magic-button>
                `
              : html``
          }
        </slot>
      </div>
    `;
  }

  render() {
    if (!this.visible && !this._isLeaving) {
      return html``;
    }

    const widthVal =
      isNumber(this.width) || /^\d+$/.test(String(this.width)) ? `${this.width}px` : this.width;
    const heightVal =
      isNumber(this.height) || /^\d+$/.test(String(this.height)) ? `${this.height}px` : this.height;
    const maxHeightVal =
      isNumber(this.maxHeight) || /^\d+$/.test(String(this.maxHeight))
        ? `${this.maxHeight}px`
        : this.maxHeight;

    const modalStyle = [
      widthVal ? `width: ${widthVal}` : '',
      heightVal ? `height: ${heightVal}` : '',
      this.top && !this.centered ? `margin-top: ${this.top}` : '',
    ]
      .filter(Boolean)
      .join('; ');

    const bodyStyle = [
      maxHeightVal ? `max-height: ${maxHeightVal}` : '',
      heightVal ? 'flex: 1' : '',
    ]
      .filter(Boolean)
      .join('; ');

    const wrapperClasses = [
      'magic-modal-wrapper',
      this.centered ? 'is-centered' : '',
      this._isLeaving ? 'is-leaving' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const modalClasses = ['magic-modal', this._isLeaving ? 'is-leaving' : '']
      .filter(Boolean)
      .join(' ');

    return html`
      ${
        this.mask
          ? html`
              <div
                class="magic-modal-mask ${this._isLeaving ? 'is-leaving' : ''}"
                @click=${this.handleMaskClick}
              ></div>
            `
          : html``
      }
      <div class="${wrapperClasses}" @click=${this.handleMaskClick}>
        <div class="${modalClasses}" style="${modalStyle}" role="dialog" aria-modal="true">
          ${this.renderHeader()}
          <div class="magic-modal__body" style="${bodyStyle}">
            <slot></slot>
          </div>
          ${this.renderFooter()}
        </div>
      </div>
    `;
  }
}

export const modal = {
  confirm: (options) => MagicModal.confirm(options),
  info: (content, title = '提示') => MagicModal.confirm({ title, content, showCancel: false }),
};

if (!customElements.get('magic-modal')) {
  customElements.define('magic-modal', MagicModal);
}
