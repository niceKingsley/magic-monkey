import { isFunction } from './types';

function queryElement(container, selector) {
  if (!isFunction(container?.querySelector)) {
    return null;
  }
  return container.querySelector(selector);
}

function getObserveTarget(container) {
  if (container instanceof Document) {
    return container.documentElement;
  }
  return container;
}

export function waitElement(selector, { el = document, timeout = 10000 } = {}) {
  return new Promise((resolve, reject) => {
    const existing = queryElement(el, selector);
    if (existing) {
      resolve(existing);
      return;
    }

    let timer = null;
    const observer = new MutationObserver(() => {
      const target = queryElement(el, selector);
      if (target) {
        stop();
        resolve(target);
      }
    });

    function stop() {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    }

    if (timeout > 0) {
      timer = setTimeout(() => {
        stop();
        reject(new Error(`Element not found: "${selector}"`));
      }, timeout);
    }

    observer.observe(getObserveTarget(el), {
      childList: true,
      subtree: true,
    });
  });
}
