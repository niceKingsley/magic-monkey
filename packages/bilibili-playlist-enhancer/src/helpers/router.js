import { on } from '@shared/utils';

/**
 * 检查当前是否为稍后再看列表页
 */
export function isWatchLaterRoute() {
  return window.location.pathname.startsWith('/list/watchlater');
}

/**
 * 监听路由变化
 */
export function observeUrlChange(onChange) {
  let lastHref = window.location.href;

  const checkChange = () => {
    if (window.location.href !== lastHref) {
      lastHref = window.location.href;
      onChange?.();
    }
  };

  on(window, 'popstate', checkChange);

  const originalPushState = history.pushState;
  history.pushState = function (...args) {
    originalPushState.apply(this, args);
    checkChange();
  };

  const originalReplaceState = history.replaceState;
  history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    checkChange();
  };
}
