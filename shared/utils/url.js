//  获取当前页面（或指定 URL）的所有参数对象
export function getUrlParams() {
  let queryString = window.location.search;
  if (!queryString && window.location.hash.includes('?')) {
    queryString = window.location.hash.slice(window.location.hash.indexOf('?'));
  }

  return Object.fromEntries(new URLSearchParams(queryString));
}
