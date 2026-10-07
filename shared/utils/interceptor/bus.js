import { isString } from '../types';

const win = globalThis.unsafeWindow || globalThis.window || globalThis;
const BUS_KEY = Symbol.for('__MAGIC_MONKEY_INTERCEPTOR_BUS__');

export function getSharedBus() {
  if (!win[BUS_KEY]) {
    win[BUS_KEY] = {
      rules: [],
      patched: false,
    };
  }
  return win[BUS_KEY];
}

export function extractRequestUrl(input) {
  if (isString(input)) return input;
  if (input instanceof URL) return input.href;
  return isString(input?.url) ? input.url : '';
}

export function isRuleMatched(requestUrl, rule) {
  if (!requestUrl || !rule?.url) return false;
  if (rule.url instanceof RegExp) {
    return rule.url.test(requestUrl);
  }
  return requestUrl.includes(rule.url);
}

export { win };
