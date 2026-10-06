import { on } from '@shared/utils';
import { CTRL_ACTION } from '../constants.js';

/**
 * 判断当前焦点是否处于输入框、文本域或弹幕/评论区中
 */
function isInputElement(event) {
  const path = event.composedPath ? event.composedPath() : [event.target];
  return path.some((el) => {
    const tag = el?.tagName?.toLowerCase();
    return tag === 'input' || tag === 'textarea' || tag === 'magic-input' || el?.isContentEditable;
  });
}

/**
 * 解析键盘事件为标准化快捷键字符串
 */
export function formatKeyboardKey(event) {
  if (['Control', 'Shift', 'Alt', 'Meta'].includes(event.key)) {
    return '';
  }

  const parts = [];
  if (event.ctrlKey) parts.push('Ctrl');
  if (event.altKey) parts.push('Alt');
  if (event.shiftKey) parts.push('Shift');
  if (event.metaKey) parts.push('Meta');

  let key = event.key;
  if (key === ' ') key = 'Space';
  else if (key.length === 1) key = key.toUpperCase();

  parts.push(key);
  return parts.join('+');
}

/**
 * 判断按键是否与目标快捷键匹配
 */
function matchesHotkey(event, targetHotkey) {
  if (!targetHotkey) return false;
  const currentKey = formatKeyboardKey(event);
  if (!currentKey) return false;
  return currentKey.toLowerCase() === targetHotkey.trim().toLowerCase();
}

/**
 * 监听全局键盘事件实现默认常驻的自定义快捷键切集
 */
export function usePodHotkeys({ settings, handlePlayerCtrl }) {
  const onKeyDown = (event) => {
    if (event.repeat) {
      return;
    }

    if (isInputElement(event.target)) {
      return;
    }

    if (matchesHotkey(event, settings.hotkeyPrev)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      handlePlayerCtrl?.(CTRL_ACTION.PREV);
      return;
    }

    if (matchesHotkey(event, settings.hotkeyNext)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      handlePlayerCtrl?.(CTRL_ACTION.NEXT);
    }
  };

  return on(window, 'keydown', onKeyDown, { capture: true });
}
