import { isFunction, isObject, isString } from './types.js';

export function on(target, type, listener, options) {
  if (!isFunction(listener)) return () => {};

  const el = isString(target) ? document.querySelector(target) : target;
  if (!el || !isFunction(el.addEventListener)) {
    return () => {};
  }

  el.addEventListener(type, listener, options);

  return () => {
    el.removeEventListener(type, listener, options);
  };
}

export function once(target, type, listener, options) {
  const opt = isObject(options) && options !== null ? { ...options, once: true } : { once: true };
  return on(target, type, listener, opt);
}
