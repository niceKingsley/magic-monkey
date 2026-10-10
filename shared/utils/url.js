import { isFunction } from './types';

//  获取当前页面的所有参数对象
export function getUrlParams() {
  let queryString = window.location.search;
  if (!queryString && window.location.hash.includes('?')) {
    queryString = window.location.hash.slice(window.location.hash.indexOf('?'));
  }

  return Object.fromEntries(new URLSearchParams(queryString));
}

const urlChangeListeners = new Set();
let isListening = false;
let lastHref = typeof window !== 'undefined' ? window.location.href : '';

function notifyUrlChange() {
  const currentHref = window.location.href;
  if (currentHref !== lastHref) {
    lastHref = currentHref;
    for (const listener of urlChangeListeners) {
      try {
        listener(currentHref);
      } catch (err) {
        console.error('[observeUrlChange] 回调执行异常:', err);
      }
    }
  }
}

export function observeUrlChange(onChange) {
  if (typeof window === 'undefined' || !isFunction(onChange)) {
    return () => {};
  }

  urlChangeListeners.add(onChange);

  if (!isListening) {
    isListening = true;
    lastHref = window.location.href;
    window.addEventListener('popstate', notifyUrlChange);

    const originalPushState = history.pushState;
    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      notifyUrlChange();
    };

    const originalReplaceState = history.replaceState;
    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      notifyUrlChange();
    };
  }

  return () => {
    urlChangeListeners.delete(onChange);
  };
}
