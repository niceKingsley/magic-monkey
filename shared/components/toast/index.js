import { html, LitElement, unsafeCSS } from 'lit';
import { isString, once, sleep } from '@shared/utils';
import styles from './style.scss?inline';
import '../theme';

const TOAST_ICONS = {
  info: html`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  `,
  success: html`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  `,
  warning: html`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  `,
  error: html`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  `,
  close: html`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  `,
};

export class MagicToast extends LitElement {
  static properties = {
    /* 提示文本内容 */
    message: String,
    /* 提示类型 (info, success, warning, error) */
    type: String,
    /* 停留持续时间(ms)，为 0 则不自动关闭 */
    duration: Number,
    /* 垂直显示位置 (top, center, bottom) */
    position: String,
    /* 是否处于可见状�?*/
    visible: { type: Boolean, reflect: true },
    /* 是否展示关闭按钮 */
    closable: Boolean,
    /* 内部退出动画状�?*/
    _isLeaving: { state: true },
  };

  static styles = unsafeCSS(styles);

  #timer = null;

  constructor() {
    super();
    this.message = '';
    this.type = 'info';
    this.duration = 2500;
    this.position = 'top';
    this.visible = false;
    this.closable = false;
    this._isLeaving = false;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.visible) {
      this.startTimer();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.clearTimer();
  }

  updated(changedProperties) {
    if (changedProperties.has('visible')) {
      if (this.visible) {
        this._isLeaving = false;
        this.startTimer();
      } else {
        this.clearTimer();
        this._isLeaving = false;
      }
    }
  }

  startTimer() {
    this.clearTimer();
    if (this.duration > 0) {
      this.#timer = setTimeout(() => {
        this.close();
      }, this.duration);
    }
  }

  clearTimer() {
    if (this.#timer) {
      clearTimeout(this.#timer);
      this.#timer = null;
    }
  }

  async close() {
    if (!this.visible && !this._isLeaving) return;
    this.clearTimer();
    this._isLeaving = true;
    await sleep(200);
    this.visible = false;
    this._isLeaving = false;
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  static getOrCreateContainer(position = 'top') {
    const containerId = `magic-toast-root-${position}`;
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      container.className = `magic-toast-container magic-toast-container--${position}`;
      const posStyle =
        position === 'bottom'
          ? 'bottom: 24px; transform: translateX(-50%);'
          : position === 'center'
            ? 'top: 50%; transform: translate(-50%, -50%);'
            : 'top: 24px; transform: translateX(-50%);';
      container.style.cssText = `position: fixed; left: 50%; ${posStyle} z-index: var(--magic-toast-z-index, 999999); display: flex; flex-direction: column; align-items: center; gap: 10px; pointer-events: none; width: max-content; max-width: 90vw; box-sizing: border-box;`;
      document.body.appendChild(container);
    }
    return container;
  }

  static show(options = {}) {
    const config = isString(options) ? { message: options } : options;
    const {
      message = '',
      type = 'info',
      duration = 2500,
      position = 'top',
      closable = false,
    } = config;

    const container = MagicToast.getOrCreateContainer(position);
    const toastEl = document.createElement('magic-toast');
    toastEl.message = message;
    toastEl.type = type;
    toastEl.duration = duration;
    toastEl.position = position;
    toastEl.closable = closable;

    container.appendChild(toastEl);
    toastEl.visible = true;

    once(toastEl, 'close', () => {
      toastEl.remove();
      if (!container.children.length) {
        container.remove();
      }
    });

    return {
      close: () => toastEl.close(),
    };
  }

  static info(message, duration) {
    return MagicToast.show({ message, type: 'info', duration });
  }

  static success(message, duration) {
    return MagicToast.show({ message, type: 'success', duration });
  }

  static warning(message, duration) {
    return MagicToast.show({ message, type: 'warning', duration });
  }

  static error(message, duration) {
    return MagicToast.show({ message, type: 'error', duration });
  }

  render() {
    if (!this.visible && !this._isLeaving) {
      return html``;
    }

    const toastClasses = [
      'magic-toast',
      `magic-toast--${this.type || 'info'}`,
      this._isLeaving ? 'is-leaving' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const iconTemplate = TOAST_ICONS[this.type] || TOAST_ICONS.info;

    return html`
      <div class="${toastClasses}" role="alert">
        <span class="magic-toast__icon">
          <slot name="icon">${iconTemplate}</slot>
        </span>
        <span class="magic-toast__content">
          <slot>${this.message}</slot>
        </span>
        ${
          this.closable
            ? html`
                <button class="magic-toast__close" @click=${this.close}>
                  ${TOAST_ICONS.close}
                </button>
              `
            : html``
        }
      </div>
    `;
  }
}

export const toast = {
  show: (options) => MagicToast.show(options),
  info: (msg, dur) => MagicToast.info(msg, dur),
  success: (msg, dur) => MagicToast.success(msg, dur),
  warning: (msg, dur) => MagicToast.warning(msg, dur),
  error: (msg, dur) => MagicToast.error(msg, dur),
};

if (!customElements.get('magic-toast')) {
  customElements.define('magic-toast', MagicToast);
}
