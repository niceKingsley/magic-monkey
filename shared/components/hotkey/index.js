import { formatKeyboardKey, on } from '@shared/utils';
import { html, LitElement, unsafeCSS } from 'lit';
import styles from './style.scss?inline';
import '../theme';

export class MagicHotkey extends LitElement {
  static activeRecorder = null;

  static properties = {
    /* 绑定的快捷键字符串，如 'Ctrl+A'、'[' */
    value: { type: String, reflect: true },
    /* 未设置时的占位文案 */
    placeholder: String,
    /* 录制中的提示文案 */
    recordingText: { type: String, attribute: 'recording-text' },
    /* 尺寸规格 (small, medium, large) */
    size: String,
    /* 是否处于禁用状态 */
    disabled: { type: Boolean, reflect: true },
    /* 是否撑满父容器宽度 */
    block: { type: Boolean, reflect: true },
    /* 是否支持清空 */
    clearable: Boolean,
    /* 是否处于录制中（外部可通过 [recording] 选择器检测与属性反射） */
    recording: { type: Boolean, reflect: true },
  };

  static styles = unsafeCSS(styles);

  #cleanupOutsideClick = null;
  #cleanupKeydown = null;

  constructor() {
    super();
    this.value = '';
    this.placeholder = '未设置';
    this.recordingText = '请按按键...';
    this.size = 'small';
    this.disabled = false;
    this.block = false;
    this.clearable = false;
    this.recording = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.#cleanupOutsideClick = on(document, 'pointerdown', (event) =>
      this.handleOutsideClick(event),
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#cleanupOutsideClick?.();
    this.#cleanupKeydown?.();
    if (MagicHotkey.activeRecorder === this) {
      MagicHotkey.activeRecorder = null;
    }
  }

  handleOutsideClick(event) {
    if (this.recording && !event.composedPath().includes(this)) {
      this.cancelRecording();
    }
  }

  startRecording(event) {
    if (this.disabled) return;
    event?.preventDefault();
    event?.stopPropagation();

    if (this.recording) return;

    MagicHotkey.activeRecorder = this;
    this.recording = true;
    this.setAttribute('recording', '');

    this.#cleanupKeydown?.();
    // 使用捕获阶段捕获全局键盘事件，保证在按下 Esc 或按键时优先拦截并阻止冒泡
    this.#cleanupKeydown = on(window, 'keydown', (e) => this.handleKeyDown(e), { capture: true });
  }

  cancelRecording() {
    if (!this.recording) return;

    if (MagicHotkey.activeRecorder === this) {
      MagicHotkey.activeRecorder = null;
    }
    this.recording = false;
    this.removeAttribute('recording');

    this.#cleanupKeydown?.();
    this.#cleanupKeydown = null;
    // 关键：不冒泡 cancel 事件，防止被父级 <magic-modal @cancel="..."> 拦截导致弹窗意外关闭
    this.dispatchEvent(new CustomEvent('cancel', { bubbles: false, composed: false }));
  }

  handleKeyDown(event) {
    if (!this.recording || this.disabled) return;

    // 优先阻止默认行为与立即停止传播，防止触发浏览器的默认快捷键以及父级模态框的 Escape 关闭逻辑
    event.preventDefault();
    event.stopImmediatePropagation();

    if (event.key === 'Escape') {
      this.cancelRecording();
      return;
    }

    const keyString = formatKeyboardKey(event);
    if (!keyString) return;

    this.value = keyString;
    this.cancelRecording();

    const detail = { value: keyString };
    this.dispatchEvent(new CustomEvent('change', { detail, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('input', { detail, bubbles: true, composed: true }));
  }

  handleClear(event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.disabled) return;

    this.value = '';
    this.cancelRecording();
    const detail = { value: '' };
    this.dispatchEvent(new CustomEvent('change', { detail, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('input', { detail, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('clear', { bubbles: false, composed: false }));
  }

  render() {
    const displayText = this.recording
      ? this.recordingText || '请按按键...'
      : this.value || this.placeholder || '未设置';

    const classes = [
      'magic-hotkey',
      `magic-hotkey--${this.size || 'small'}`,
      this.disabled ? 'is-disabled' : '',
      this.recording ? 'is-recording' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <button
        class="${classes}"
        type="button"
        tabindex="${this.disabled ? '-1' : '0'}"
        ?disabled=${this.disabled}
        @click=${this.startRecording}
      >
        <span class="magic-hotkey__content">${displayText}</span>
        ${
          this.clearable && this.value && !this.disabled && !this.recording
            ? html`
                <span class="magic-hotkey__clear" @click=${this.handleClear} title="清空快捷键">
                  ✕
                </span>
              `
            : html``
        }
      </button>
    `;
  }
}

if (!customElements.get('magic-hotkey')) {
  customElements.define('magic-hotkey', MagicHotkey);
}
