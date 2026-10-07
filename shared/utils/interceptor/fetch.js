import { isFunction, isString } from '../types';
import { extractRequestUrl, isRuleMatched, win } from './bus';

/**
 * 判断请求是否为二进制数据流
 */
function isBinaryRequest(requestUrl, rules, response) {
  if (rules.some((rule) => rule.dataType === 'binary' || rule.dataType === 'arrayBuffer')) {
    return true;
  }
  if (requestUrl.includes('.so')) {
    return true;
  }
  const contentType = response.headers.get('content-type') || '';
  return contentType.includes('application/octet-stream') || contentType.includes('protobuf');
}

/**
 * 转换二进制格式的 Fetch 响应
 */
async function transformBinaryResponse(response, rules) {
  const rawBuffer = await response.clone().arrayBuffer();
  const processedBuffer = rules.reduce((curr, rule) => {
    try {
      return rule.onResponse(curr, response);
    } catch (err) {
      console.error('[NetworkInterceptor] Fetch 二进制响应拦截异常:', err);
      return curr;
    }
  }, rawBuffer);

  return new Response(processedBuffer, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

/**
 * 解析文本响应载荷
 */
function parsePayload(text) {
  try {
    return { data: JSON.parse(text), isJson: true };
  } catch {
    return { data: text, isJson: false };
  }
}

/**
 * 转换文本/JSON 格式的 Fetch 响应
 */
async function transformTextResponse(response, rules) {
  const rawText = await response.clone().text();
  const { data: initialData, isJson } = parsePayload(rawText);

  const processedData = rules.reduce((curr, rule) => {
    try {
      return rule.onResponse(curr, response);
    } catch (err) {
      console.error('[NetworkInterceptor] Fetch 文本响应拦截异常:', err);
      return curr;
    }
  }, initialData);

  const finalBody =
    isJson || !isString(processedData) ? JSON.stringify(processedData) : processedData;

  return new Response(finalBody, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

/**
 * 处理命中规则的 Fetch 响应体
 */
async function interceptFetchResponse(response, requestUrl, rules) {
  try {
    if (isBinaryRequest(requestUrl, rules, response)) {
      return await transformBinaryResponse(response, rules);
    }
    return await transformTextResponse(response, rules);
  } catch (err) {
    console.error('[NetworkInterceptor] Fetch 响应重构异常，降级回退原始响应:', err);
    return response;
  }
}

/**
 * 劫持全局 fetch
 */
export function patchFetchPrototype(bus) {
  const originalFetch = win.fetch;
  if (!isFunction(originalFetch)) return;

  win.fetch = async function (...args) {
    const [input, init] = args;
    const requestUrl = extractRequestUrl(input);

    const matchedRules = bus.rules.filter((rule) => isRuleMatched(requestUrl, rule));
    const activeRules = matchedRules.filter((rule) => isFunction(rule.onResponse));

    if (activeRules.length === 0) {
      return originalFetch.apply(this, args);
    }

    const response = await originalFetch.apply(this, [input, init]);
    return interceptFetchResponse(response, requestUrl, activeRules);
  };
}
