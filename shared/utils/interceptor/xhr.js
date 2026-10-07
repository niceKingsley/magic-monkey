import { isFunction, isString } from '../types';
import { extractRequestUrl, isRuleMatched, win } from './bus';

/**
 * 读取原始 XMLHttpRequest 属性值
 */
function readDescriptorValue(desc, xhr) {
  try {
    return desc ? desc.get.call(xhr) : undefined;
  } catch {
    return undefined;
  }
}

/**
 * 清洗数据
 */
function runResponsePipeline(rules, rawData, xhr) {
  return rules.reduce((currentData, rule) => {
    try {
      return rule.onResponse(currentData, xhr);
    } catch (err) {
      console.error('[NetworkInterceptor] XHR 响应拦截处理异常:', err);
      return currentData;
    }
  }, rawData);
}

/**
 * 格式化处理后的文本响应内容
 */
function resolveTextPayload(processed, rawTextReader) {
  if (isString(processed)) return processed;
  if (processed instanceof ArrayBuffer || processed == null) {
    return rawTextReader();
  }
  return JSON.stringify(processed);
}

/**
 * 为单个命中的 XMLHttpRequest 实例安装响应代理
 */
export function patchXhrInstance(xhr, rules) {
  const activeRules = rules.filter((r) => isFunction(r.onResponse));
  if (activeRules.length === 0) return;

  const proto = win.XMLHttpRequest?.prototype;
  if (!proto) return;

  const origResponseDesc = Object.getOwnPropertyDescriptor(proto, 'response');
  const origResponseTextDesc = Object.getOwnPropertyDescriptor(proto, 'responseText');

  let cachedResponse;
  let responseHandled = false;
  let cachedText;
  let textHandled = false;

  const readRawResponse = () => readDescriptorValue(origResponseDesc, xhr);
  const readRawText = () => readDescriptorValue(origResponseTextDesc, xhr);

  Object.defineProperty(xhr, 'response', {
    configurable: true,
    enumerable: true,
    get() {
      if (xhr.readyState !== 4) return readRawResponse();
      if (!responseHandled) {
        cachedResponse = runResponsePipeline(activeRules, readRawResponse(), xhr);
        responseHandled = true;
      }
      return cachedResponse;
    },
  });

  Object.defineProperty(xhr, 'responseText', {
    configurable: true,
    enumerable: true,
    get() {
      if (xhr.readyState !== 4) return readRawText();
      if (!textHandled) {
        cachedText = resolveTextPayload(xhr.response, readRawText);
        textHandled = true;
      }
      return cachedText;
    },
  });
}

/**
 * 劫持 XMLHttpRequest 原型方法
 */
export function patchXhrPrototype(bus) {
  const proto = win.XMLHttpRequest?.prototype;
  if (!proto) return;

  const origOpen = proto.open;
  const origSend = proto.send;

  proto.open = function (method, url, ...args) {
    this._interceptorUrl = extractRequestUrl(url);
    return origOpen.call(this, method, url, ...args);
  };

  proto.send = function (body) {
    const matchedRules = bus.rules.filter((rule) => isRuleMatched(this._interceptorUrl, rule));

    if (matchedRules.length > 0 && !this._interceptorPatched) {
      this._interceptorPatched = true;
      patchXhrInstance(this, matchedRules);
    }

    return origSend.call(this, body);
  };
}
