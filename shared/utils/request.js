import { isNil, isObject, isString } from './types';

const serializeParams = (params) => {
  if (!params) return '';
  return Object.entries(params)
    .filter(([, val]) => !isNil(val))
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join('&');
};

const buildUrl = (baseUrl, params) => {
  if (!isObject(params)) return baseUrl;
  const queryString = serializeParams(params);
  if (!queryString) return baseUrl;
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}${queryString}`;
};

const preparePayload = (data, headers) => {
  if (!isObject(data) || data instanceof FormData) {
    return data;
  }
  if (!headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  return JSON.stringify(data);
};

const parseResponseData = (responseText) => {
  if (!responseText) return responseText;
  try {
    return JSON.parse(responseText);
  } catch {
    return responseText;
  }
};

const normalizeConfig = (config) => {
  return isString(config) ? { url: config } : config || {};
};

const handleResponse = (res, resolve, reject) => {
  const isSuccess = res.status >= 200 && res.status < 300;
  if (isSuccess) {
    resolve(parseResponseData(res.responseText));
  } else {
    reject(res);
  }
};

const http = (config) => {
  const {
    url,
    method = 'GET',
    data = null,
    params = null,
    headers = {},
    timeout = 10000,
    ...rest
  } = normalizeConfig(config);

  return new Promise((resolve, reject) => {
    const requestUrl = buildUrl(url, params);
    const requestData = preparePayload(data, headers);

    GM_xmlhttpRequest({
      url: requestUrl,
      method: method.toUpperCase(),
      data: requestData,
      headers,
      timeout,
      ...rest,
      onload: (res) => handleResponse(res, resolve, reject),
      onerror: reject,
      ontimeout: () => reject(new Error('Timeout')),
    });
  });
};

http.get = (url, config = {}) => http({ ...config, url, method: 'GET' });
http.post = (url, data, config = {}) => http({ ...config, url, data, method: 'POST' });
http.put = (url, data, config = {}) => http({ ...config, url, data, method: 'PUT' });
http.delete = (url, config = {}) => http({ ...config, url, method: 'DELETE' });

export { http };
