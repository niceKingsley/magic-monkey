import { on } from './event';
import { isFunction, isString } from './types';

const MODIFIER_MAP = {
  ctrl: 'ctrl',
  control: 'ctrl',
  alt: 'alt',
  option: 'alt',
  opt: 'alt',
  shift: 'shift',
  meta: 'meta',
  cmd: 'meta',
  command: 'meta',
  win: 'meta',
  super: 'meta',
};

const INPUT_TAGS = new Set([
  'input',
  'textarea',
  'magic-input',
  'magic-textarea',
  'magic-hotkey',
  'magic-modal',
]);

export const isMac =
  navigator.userAgentData?.platform === 'macOS' || /Macintosh|Mac OS X/i.test(navigator.userAgent);

export function isRecordingHotkey() {
  if (customElements.get('magic-hotkey')?.activeRecorder) {
    return true;
  }
  return !!document.querySelector('magic-hotkey[recording], [data-magic-recording]');
}

/**
 * 判断当前事件或元素是否处于输入框、文本域、弹窗遮罩、快捷键录制等交互区域中
 */
export function isInputElement(target) {
  if (!target) return false;
  if (isRecordingHotkey() || document.querySelector('magic-modal[visible]')) {
    return true;
  }

  const path = target.composedPath ? target.composedPath() : [target.target || target];
  return path.some((el) => INPUT_TAGS.has(el?.tagName?.toLowerCase?.()) || el?.isContentEditable);
}

/**
 * 将任意快捷键字符串标准化
 */
export function normalizeHotkey(str) {
  if (!isString(str)) return '';
  const parts = str
    .split('+')
    .map((p) => p.trim().toLowerCase())
    .filter(Boolean);
  const modifiers = new Set();
  let primaryKey = '';

  for (const part of parts) {
    const mod = MODIFIER_MAP[part];
    if (mod) {
      modifiers.add(mod);
    } else {
      primaryKey = part;
    }
  }

  const sorted = Array.from(modifiers).sort();
  return sorted.length ? `${sorted.join('+')}+${primaryKey}` : primaryKey;
}

/**
 * 解析键盘事件为标准化快捷键字符串（兼容 Windows / macOS）
 */
export function formatKeyboardKey(event, options = {}) {
  if (!event || ['Control', 'Shift', 'Alt', 'Meta'].includes(event.key)) {
    return '';
  }

  const useMacLabels = options.isMac ?? isMac;
  const parts = [];

  if (event.ctrlKey) parts.push('Ctrl');
  if (event.altKey) parts.push(useMacLabels ? 'Option' : 'Alt');
  if (event.shiftKey) parts.push('Shift');
  if (event.metaKey) parts.push(useMacLabels ? 'Cmd' : 'Win');

  let key = event.key;
  if (key === ' ') key = 'Space';
  else if (key.length === 1) key = key.toUpperCase();

  parts.push(key);
  return parts.join('+');
}

/**
 * 判断键盘事件是否与目标快捷键匹配
 */
export function matchesHotkey(event, targetHotkey) {
  if (!event || !targetHotkey) return false;
  const currentKey = formatKeyboardKey(event);
  return currentKey ? normalizeHotkey(currentKey) === normalizeHotkey(targetHotkey) : false;
}

/**
 * 注册全局快捷键监听
 */
export function registerHotkeys(bindings) {
  return on(
    window,
    'keydown',
    (event) => {
      if (event.repeat || isInputElement(event)) return;

      for (const { key, handler } of bindings || []) {
        const target = isFunction(key) ? key() : key;
        if (target && matchesHotkey(event, target)) {
          event.preventDefault();
          event.stopImmediatePropagation();
          handler?.(event);
          return;
        }
      }
    },
    { capture: true },
  );
}
