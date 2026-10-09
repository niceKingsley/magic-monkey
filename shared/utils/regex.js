import { isString } from './types';

export function parseAndValidateRegex(input, options = {}) {
  const { disallowEmptyMatch = false, emptyMatchError = '' } = options;

  if (!isString(input) || !input.trim()) {
    return { valid: false, error: '正则表达式不能为空' };
  }

  const trimmed = input.trim();
  const slashMatch = trimmed.match(/^\/(.*?)\/([gimsuy]*)$/);
  const pattern = slashMatch ? slashMatch[1] : trimmed;
  const flags = slashMatch ? slashMatch[2] : '';

  let reg;
  try {
    reg = new RegExp(pattern, flags);
  } catch {
    return { valid: false, error: `正则语法错误` };
  }

  // 防呆：检测是否会匹配空字符串
  if (disallowEmptyMatch && reg.test('')) {
    return {
      valid: false,
      error: emptyMatchError,
    };
  }

  return {
    valid: true,
    pattern,
    flags,
    reg,
  };
}
