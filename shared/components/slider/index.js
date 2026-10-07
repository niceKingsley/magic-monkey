import { html, LitElement, unsafeCSS } from 'lit';
import { isFunction, on } from '@shared/utils';
import styles from './style.scss?inline';
import '../theme';

function getValidProps(min, max, step) {
  const numMin = Number(min);
  const numMax = Number(max);
  const numStep = Number(step);
  const safeMin = Number.isFinite(numMin) ? numMin : 0;
  const safeMax = Number.isFinite(numMax) ? numMax : 100;
  const safeStep = Number.isFinite(numStep) && numStep > 0 ? numStep : 1;

  return {
    min: safeMin,
    max: safeMax > safeMin ? safeMax : safeMin + 100,
    step: safeStep,
  };
}

function getPrecision(step) {
  const stepStr = String(step);
  const dotIndex = stepStr.indexOf('.');
  return dotIndex === -1 ? 0 : stepStr.length - dotIndex - 1;
}

function clampAndStep(val, min, max, step) {
  const { min: sMin, max: sMax, step: sStep } = getValidProps(min, max, step);
  const precision = getPrecision(sStep);
  const steps = Math.round((val - sMin) / sStep);
  const stepped = sMin + steps * sStep;
  const clamped = Math.min(sMax, Math.max(sMin, stepped));
  return Number(clamped.toFixed(precision));
}

function calculateValueFromPointer(clientX, rect, min, max, step) {
  const { min: sMin, max: sMax, step: sStep } = getValidProps(min, max, step);
  if (rect.width <= 0) return sMin;
  const rawRatio = (clientX - rect.left) / rect.width;
  const clampedRatio = Math.max(0, Math.min(1, rawRatio));
  const rawValue = sMin + clampedRatio * (sMax - sMin);
  return clampAndStep(rawValue, sMin, sMax, sStep);
}

function getNextValueFromKey(key, value, min, max, step) {
  switch (key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      return value - step;
    case 'ArrowRight':
    case 'ArrowUp':
      return value + step;
    case 'Home':
      return min;
    case 'End':
      return max;
    case 'PageDown':
      return value - step * 10;
    case 'PageUp':
      return value + step * 10;
    default:
      return null;
  }
}

function valueToPercent(val, min, max) {
  const { min: sMin, max: sMax } = getValidProps(min, max, 1);
  const percent = ((val - sMin) / (sMax - sMin)) * 100;
  return Math.min(100, Math.max(0, percent));
}

export class MagicSlider extends LitElement {
  static properties = {
    /* 当前滑块数�?*/
    value: { type: Number, reflect: true },
    /* 最小�?*/
    min: Number,
    /* 最大�?*/
    max: Number,
    /* 步进间隔�?*/
    step: Number,
    /* 是否处于禁用状�?*/
    disabled: { type: Boolean, reflect: true },
    /* 尺寸规格 (small, medium, large) */
    size: String,
    /* 是否展示悬停/拖拽提示气泡 */
    showTooltip: { type: Boolean, attribute: 'show-tooltip' },
    /* 是否始终展示提示气泡 */
    alwaysShowTooltip: { type: Boolean, attribute: 'always-show-tooltip' },
    /* 是否在右侧展示实时数值文�?*/
    showValue: { type: Boolean, attribute: 'show-value' },
    /* 是否展示间断点刻度标�?*/
    showStops: { type: Boolean, attribute: 'show-stops' },
    /* 提示气泡数值格式化函数 */
    formatTooltip: Function,
    /* 内部私有是否处于拖拽中状�?*/
    _isDragging: { state: true },
    /* 内部私有是否处于悬停状�?*/
    _isHovered: { state: true },
  };

  static styles = unsafeCSS(styles);

  #cleanupMove = null;
  #cleanupUp = null;
  #cleanupCancel = null;

  constructor() {
    super();
    this.value = 0;
    this.min = 0;
    this.max = 100;
    this.step = 1;
    this.disabled = false;
    this.size = 'medium';
    this.showTooltip = true;
    this.alwaysShowTooltip = false;
    this.showValue = false;
    this.showStops = false;
    this.formatTooltip = null;
    this._isDragging = false;
    this._isHovered = false;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#clearDragListeners();
  }

  willUpdate(changedProperties) {
    if (
      changedProperties.has('value') ||
      changedProperties.has('min') ||
      changedProperties.has('max') ||
      changedProperties.has('step')
    ) {
      const rawVal = Number(this.value);
      const validVal = Number.isNaN(rawVal) ? this.min : rawVal;
      this.value = clampAndStep(validVal, this.min, this.max, this.step);
    }
  }

  get formattedValue() {
    if (isFunction(this.formatTooltip)) {
      return this.formatTooltip(this.value);
    }
    return this.value;
  }

  #clearDragListeners() {
    this.#cleanupMove?.();
    this.#cleanupUp?.();
    this.#cleanupCancel?.();
    this.#cleanupMove = null;
    this.#cleanupUp = null;
    this.#cleanupCancel = null;
  }

  #dispatchInputEvent() {
    const detail = { value: this.value };
    this.dispatchEvent(new CustomEvent('input', { detail, bubbles: true, composed: true }));
  }

  #dispatchChangeEvent() {
    const detail = { value: this.value };
    this.dispatchEvent(new CustomEvent('change', { detail, bubbles: true, composed: true }));
  }

  #updatePointerPosition(event) {
    const runway = this.shadowRoot?.querySelector('.magic-slider__runway');
    if (!runway) return;
    const rect = runway.getBoundingClientRect();
    const newValue = calculateValueFromPointer(event.clientX, rect, this.min, this.max, this.step);
    if (newValue !== this.value) {
      this.value = newValue;
      this.#dispatchInputEvent();
    }
  }

  focusThumb() {
    const thumb = this.shadowRoot?.querySelector('.magic-slider__thumb');
    thumb?.focus();
  }

  handlePointerDown(event) {
    if (this.disabled || event.button !== 0) return;
    event.preventDefault();
    this._isDragging = true;
    this.focusThumb();

    this.#updatePointerPosition(event);

    this.#clearDragListeners();
    this.#cleanupMove = on(window, 'pointermove', (e) => this.handlePointerMove(e));
    this.#cleanupUp = on(window, 'pointerup', () => this.handlePointerUp());
    this.#cleanupCancel = on(window, 'pointercancel', () => this.handlePointerUp());
  }

  handlePointerMove(event) {
    if (!this._isDragging) return;
    this.#updatePointerPosition(event);
  }

  handlePointerUp() {
    if (!this._isDragging) return;
    this._isDragging = false;
    this.#clearDragListeners();
    this.#dispatchChangeEvent();
  }

  handleMouseEnter() {
    this._isHovered = true;
  }

  handleMouseLeave() {
    this._isHovered = false;
  }

  handleKeyDown(event) {
    if (this.disabled) return;
    const nextVal = getNextValueFromKey(event.key, this.value, this.min, this.max, this.step);
    if (nextVal === null) return;

    event.preventDefault();
    const clamped = clampAndStep(nextVal, this.min, this.max, this.step);
    if (clamped !== this.value) {
      this.value = clamped;
      this.#dispatchInputEvent();
      this.#dispatchChangeEvent();
    }
  }

  renderStops() {
    if (!this.showStops || this.step <= 0) return null;
    const { min, max, step } = getValidProps(this.min, this.max, this.step);
    const range = max - min;
    const count = Math.floor(range / step);
    if (count <= 1 || count > 50) return null;

    const currentPercent = valueToPercent(this.value, min, max);
    const stops = [];

    for (let i = 1; i < count; i++) {
      const stopVal = min + i * step;
      const stopPercent = valueToPercent(stopVal, min, max);
      const isPassed = stopPercent <= currentPercent;
      stops.push(html`
        <span
          class="magic-slider__stop ${isPassed ? 'is-passed' : ''}"
          style="left: ${stopPercent}%;"
        ></span>
      `);
    }

    return html`<div class="magic-slider__stops">${stops}</div>`;
  }

  renderTooltip() {
    if (!this.showTooltip) return null;
    const isVisible = this.alwaysShowTooltip || this._isDragging || this._isHovered;

    return html`
      <div class="magic-slider__tooltip ${isVisible ? 'is-visible' : ''}">
        <span class="magic-slider__tooltip-content">${this.formattedValue}</span>
        <span class="magic-slider__tooltip-arrow"></span>
      </div>
    `;
  }

  renderValueText() {
    if (!this.showValue) return null;
    return html`<span class="magic-slider__value">${this.formattedValue}</span>`;
  }

  render() {
    const percent = valueToPercent(this.value, this.min, this.max);
    const classes = [
      'magic-slider',
      `magic-slider--${this.size || 'medium'}`,
      this.disabled ? 'is-disabled' : '',
      this._isDragging ? 'is-dragging' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div
        class="${classes}"
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <div class="magic-slider__runway" @pointerdown=${this.handlePointerDown}>
          <div class="magic-slider__track">
            <div class="magic-slider__bar" style="width: ${percent}%;"></div>
            ${this.renderStops()}
          </div>
          <div
            class="magic-slider__thumb"
            style="left: ${percent}%;"
            role="slider"
            tabindex="${this.disabled ? -1 : 0}"
            aria-valuemin="${this.min}"
            aria-valuemax="${this.max}"
            aria-valuenow="${this.value}"
            aria-disabled="${this.disabled}"
            @keydown=${this.handleKeyDown}
          >
            ${this.renderTooltip()}
          </div>
        </div>
        ${this.renderValueText()}
      </div>
    `;
  }
}

if (!customElements.get('magic-slider')) {
  customElements.define('magic-slider', MagicSlider);
}
