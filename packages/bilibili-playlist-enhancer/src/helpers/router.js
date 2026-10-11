/**
 * 检查当前是否为稍后再看列表页
 */
export function isWatchLaterRoute() {
  return window.location.pathname.startsWith('/list/watchlater');
}
