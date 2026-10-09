// ==UserScript==
// @name         bilibili-danmaku-filter
// @namespace    https://github.com/niceKingsley/magic-monkey
// @version      1.0.0
// @author       kingsley
// @description  B站弹幕过滤助手，支持视频和直播的弹幕合并和清理
// @license      GPL-3.0-or-later
// @icon         https://static.hdslb.com/images/favicon.ico
// @homepageURL  https://github.com/niceKingsley/magic-monkey
// @supportURL   https://github.com/niceKingsley/magic-monkey/issues
// @match        *://www.bilibili.com/video/*
// @match        *://www.bilibili.com/list/*
// @match        *://www.bilibili.com/bangumi/play/*
// @match        *://www.bilibili.com/cheese/play/*
// @match        *://live.bilibili.com/*
// @require      https://cdn.jsdelivr.net/npm/vue@3.5.43/dist/vue.global.prod.js
// @grant        GM_addStyle
// @grant        GM_deleteValue
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_listValues
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(async function (vue) {
  'use strict';
  var s$3 = new Set();
  var _css = async (t) => {
    if (s$3.has(t)) return;
    s$3.add(t);
    ((c) => {
      if (typeof GM_addStyle === 'function') GM_addStyle(c);
      else
        (document.head || document.documentElement)
          .appendChild(document.createElement('style'))
          .append(c);
    })(t);
  };
  _css(
    ' .settings-container[data-v-35d9bb90]{-webkit-user-select:none;user-select:none;box-sizing:border-box;flex-direction:column;height:100%;display:flex;overflow:hidden}.settings-nav[data-v-35d9bb90]{flex-shrink:0;justify-content:center;align-items:center;padding:2px 0 16px;display:flex}.settings-nav magic-tabs[data-v-35d9bb90]{flex:none;width:fit-content;max-width:100%;margin:0 auto}.settings-content[data-v-35d9bb90]{scrollbar-width:thin;flex-direction:column;flex:1;gap:16px;padding:2px 4px 24px 2px;display:flex;overflow:hidden auto}.settings-modal-header[data-v-35d9bb90]{align-items:center;gap:10px;display:flex}.settings-modal-header .settings-modal-title[data-v-35d9bb90]{color:var(--magic-modal-title-color,var(--magic-text-primary,var(--text1)));letter-spacing:.2px;font-size:15px;font-weight:600;line-height:1.4}.settings-section[data-v-35d9bb90]{flex-direction:column;gap:8px;display:flex}.settings-section__title[data-v-35d9bb90]{color:var(--magic-primary-color,var(--brand_blue));letter-spacing:.3px;justify-content:space-between;align-items:center;font-size:13px;font-weight:600;display:flex}.settings-section__title .title-left[data-v-35d9bb90]{align-items:center;gap:6px;display:flex}.settings-section__title .title-left .rule-count[data-v-35d9bb90]{color:var(--magic-text-tertiary,var(--text3));font-size:11px}.settings-section__title .title-right[data-v-35d9bb90]{align-items:center;gap:6px;display:flex}.settings-section__title .title-right .action-btn[data-v-35d9bb90]{border:1px solid var(--magic-border-color,var(--line_regular));background:var(--magic-bg-subtle,var(--graph_bg_thin,var(--bg2)));height:22px;color:var(--magic-text-secondary,var(--text2));cursor:pointer;box-sizing:border-box;-webkit-user-select:none;user-select:none;border-radius:4px;outline:none;align-items:center;gap:4px;padding:0 8px;font-size:11px;font-weight:500;line-height:1;transition:all .2s cubic-bezier(.4,0,.2,1);display:inline-flex}.settings-section__title .title-right .action-btn__icon[data-v-35d9bb90]{stroke-width:2.2px;flex-shrink:0;width:11px;height:11px}.settings-section__title .title-right .action-btn[data-v-35d9bb90]:hover{color:var(--magic-primary-color,var(--brand_blue));border-color:var(--magic-primary-color,var(--brand_blue));background:var(--magic-primary-light-bg,#00aeec14)}.settings-section__title .title-right .action-btn[data-v-35d9bb90]:active{transform:scale(.96)}.settings-card[data-v-35d9bb90]{background:var(--magic-bg-subtle,var(--graph_bg_thin,var(--bg2)));border:1px solid var(--magic-border-color,var(--line_regular));border-radius:10px;flex-direction:column;padding:4px 16px;transition:all .25s cubic-bezier(.16,1,.3,1);display:flex}.settings-card[data-v-35d9bb90]:hover{border-color:var(--magic-border-color-hover,var(--line_regular));background:var(--magic-bg-hover,var(--line_regular))}.settings-item[data-v-35d9bb90]{justify-content:space-between;align-items:center;gap:16px;padding:12px 0;display:flex}.settings-item[data-v-35d9bb90]:not(:last-child){border-bottom:1px solid var(--magic-border-color,var(--line_regular))}.settings-item__info[data-v-35d9bb90]{flex-direction:column;flex:1;gap:3px;min-width:0;display:flex}.settings-item__title[data-v-35d9bb90]{color:var(--magic-text-primary,var(--text1));font-size:13.5px;font-weight:500;line-height:1.4}.settings-item__desc[data-v-35d9bb90]{color:var(--magic-text-tertiary,var(--text3));font-size:12px;line-height:1.45}.settings-item__action[data-v-35d9bb90]{flex-shrink:0;align-items:center;display:flex}.settings-item--slider[data-v-35d9bb90]{flex-direction:column;align-items:stretch;gap:8px}.settings-item--slider .slider-action[data-v-35d9bb90]{width:100%}.settings-item--vertical[data-v-35d9bb90]{flex-direction:column;align-items:stretch;gap:10px}.blacklist-card[data-v-35d9bb90]{gap:12px;padding:12px 16px}.add-rule-form[data-v-35d9bb90]{align-items:center;gap:8px;display:flex}.add-rule-form .rule-type-select[data-v-35d9bb90]{flex-shrink:0;width:90px}.add-rule-form .rule-input-field[data-v-35d9bb90]{flex:1;min-width:0}.add-rule-form .add-btn[data-v-35d9bb90]{flex-shrink:0}.rule-tags-container[data-v-35d9bb90]{flex-wrap:wrap;gap:6px;max-height:140px;padding-right:4px;display:flex;overflow-y:auto}.rule-tags-container .empty-rules[data-v-35d9bb90]{text-align:center;width:100%;color:var(--magic-text-tertiary,var(--text3));padding:16px 0;font-size:12px}.rule-tags-container .rule-tag[data-v-35d9bb90]{background:var(--magic-bg-subtle,var(--graph_bg_thin,var(--bg2)));border:1px solid var(--magic-border-color,var(--line_regular));border-radius:6px;align-items:center;gap:6px;padding:3px 8px;font-size:12px;display:inline-flex}.rule-tags-container .rule-tag .tag-badge[data-v-35d9bb90]{border-radius:3px;padding:1px 4px;font-size:10px;font-weight:500}.rule-tags-container .rule-tag .tag-badge.tag-contains[data-v-35d9bb90]{background:var(--magic-primary-light-bg,#00aeec26);color:var(--magic-primary-color,var(--brand_blue))}.rule-tags-container .rule-tag .tag-badge.tag-exact[data-v-35d9bb90]{color:#fa8c16;background:#fa8c1626}.rule-tags-container .rule-tag .tag-badge.tag-regex[data-v-35d9bb90]{color:#b37feb;background:#722ed126}.rule-tags-container .rule-tag .tag-text[data-v-35d9bb90]{color:var(--magic-text-primary,var(--text1));text-overflow:ellipsis;white-space:nowrap;max-width:180px;overflow:hidden}.rule-tags-container .rule-tag .tag-remove[data-v-35d9bb90]{cursor:pointer;color:var(--magic-text-tertiary,var(--text3));transition:color .2s}.rule-tags-container .rule-tag .tag-remove[data-v-35d9bb90]:hover{color:var(--magic-color-danger,#ff4d4f)}.settings-modal-footer[data-v-35d9bb90]{justify-content:space-between;align-items:center;width:100%;display:flex}.settings-modal-footer .footer-buttons[data-v-35d9bb90]{align-items:center;gap:10px;display:flex}:root{--magic-primary-color:var(--brand_blue);--magic-primary-hover-color:var(--brand_blue_hover,color-mix(in srgb, var(--magic-primary-color) 85%, #fff));--magic-primary-active-color:var(--brand_blue_active,color-mix(in srgb, var(--magic-primary-color) 85%, #000));--magic-primary-light-bg:var(--brand_blue_thin,color-mix(in srgb, var(--magic-primary-color) 12%, transparent));--magic-text-primary:var(--text1);--magic-text-secondary:var(--text2);--magic-text-tertiary:var(--text3);--magic-text-muted:var(--text3);--magic-bg-container:var(--bg1);--magic-bg-component:var(--bg2);--magic-bg-subtle:var(--graph_bg_thin,var(--bg2));--magic-bg-hover:var(--line_regular,var(--bg3));--magic-border-color:var(--line_regular);--magic-border-color-hover:var(--line_bold,var(--line_regular));--magic-bg-overlay:var(--bg1_float,var(--graph_bg_regular));--magic-modal-bg:var(--bg1_float,var(--graph_bg_regular));--magic-modal-border:var(--line_regular);--magic-modal-divider:var(--line_regular);--magic-modal-title-color:var(--text1);--magic-modal-color:var(--text1);--magic-modal-close-color:var(--text3);--magic-font-size-base:13px;--magic-font-size-sm:12px}\n/*$vite$:1*/ ',
  );
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJSMin = (cb, mod) => () => (
    mod || (cb((mod = { exports: {} }).exports, mod), (cb = null)),
    mod.exports
  );
  var __copyProps = (to, from, except, desc) => {
    if ((from && typeof from === 'object') || typeof from === 'function')
      for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
        key = keys[i];
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, {
            get: ((k) => from[k]).bind(null, key),
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
          });
      }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (
    (target = mod != null ? __create(__getProtoOf(mod)) : {}),
    __copyProps(
      isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, 'default')
        ? __defProp(target, 'default', {
            value: mod,
            enumerable: true,
          })
        : target,
      mod,
    )
  );
  var isArray = Array.isArray;
  var isFunction = (val) => typeof val === 'function';
  var isString = (val) => typeof val === 'string';
  var isNumber = (val) => typeof val === 'number' && !Number.isNaN(val);
  var isNil = (val) => val === null || val === void 0;
  var isObject = (val) => val !== null && typeof val === 'object';
  var assign = Object.assign;
  function queryElement(container, selector) {
    if (!isFunction(container?.querySelector)) return null;
    return container.querySelector(selector);
  }
  function getObserveTarget(container) {
    if (container instanceof Document) return container.documentElement;
    return container;
  }
  function waitElement(selector, { el = document, timeout = 1e4 } = {}) {
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
      if (timeout > 0)
        timer = setTimeout(() => {
          stop();
          reject(new Error(`Element not found: "${selector}"`));
        }, timeout);
      observer.observe(getObserveTarget(el), {
        childList: true,
        subtree: true,
      });
    });
  }
  var currentAppInstance = null;
  async function bootstrapApp(options = {}) {
    const { createApp, rootComponent, waitBody = true, mountId, beforeMount, onMounted } = options;
    if (isFunction(beforeMount)) {
      if ((await beforeMount()) === false) return null;
    }
    const parent = waitBody ? await waitElement('body') : document.body;
    const container = document.createElement('div');
    if (mountId) container.id = mountId;
    if (parent) parent.appendChild(container);
    if (currentAppInstance) {
      currentAppInstance.unmount?.();
      currentAppInstance = null;
    }
    const app = createApp(rootComponent);
    const vm = app.mount(container);
    currentAppInstance = app;
    if (isFunction(onMounted))
      onMounted(vm, {
        app,
        container,
      });
    return {
      app,
      vm,
      container,
    };
  }
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  var getEnvPrefix = () => {
    try {
      return '';
    } catch {
      return '';
    }
  };
  var formatKey = (key, namespace = '') => {
    return `${getEnvPrefix()}${namespace ? `${namespace}:` : ''}${key}`;
  };
  var getStorage = (key, defaultValue = null, namespace = '') => {
    if (!isString(key) || !key) return defaultValue;
    const finalKey = formatKey(key, namespace);
    const val = GM_getValue(finalKey, defaultValue);
    return isNil(val) ? defaultValue : val;
  };
  var setStorage = (key, value, namespace = '') => {
    if (!isString(key) || !key) return;
    const finalKey = formatKey(key, namespace);
    GM_setValue(finalKey, value);
  };
  var removeStorage = (key, namespace = '') => {
    if (!isString(key) || !key) return;
    const finalKey = formatKey(key, namespace);
    GM_deleteValue(finalKey);
  };
  var clearStorage = (namespace = '') => {
    const prefix = formatKey('', namespace);
    const allKeys = GM_listValues();
    for (const k of allKeys) if (k.startsWith(prefix)) GM_deleteValue(k);
  };
  var createStorage = (namespace = '') => ({
    get: (key, defaultValue) => getStorage(key, defaultValue, namespace),
    set: (key, value) => setStorage(key, value, namespace),
    remove: (key) => removeStorage(key, namespace),
    clear: () => clearStorage(namespace),
  });
  var serializeParams = (params) => {
    if (!params) return '';
    return Object.entries(params)
      .filter(([, val]) => !isNil(val))
      .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
      .join('&');
  };
  var buildUrl = (baseUrl, params) => {
    if (!isObject(params)) return baseUrl;
    const queryString = serializeParams(params);
    if (!queryString) return baseUrl;
    return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${queryString}`;
  };
  var preparePayload = (data, headers) => {
    if (!isObject(data) || data instanceof FormData) return data;
    if (!headers['Content-Type']) headers['Content-Type'] = 'application/json';
    return JSON.stringify(data);
  };
  var parseResponseData = (responseText) => {
    if (!responseText) return responseText;
    try {
      return JSON.parse(responseText);
    } catch {
      return responseText;
    }
  };
  var normalizeConfig = (config) => {
    return isString(config) ? { url: config } : config || {};
  };
  var handleResponse = (res, resolve, reject) => {
    if (res.status >= 200 && res.status < 300) resolve(parseResponseData(res.responseText));
    else reject(res);
  };
  var http = (config) => {
    const {
      url,
      method = 'GET',
      data = null,
      params = null,
      headers = {},
      timeout = 1e4,
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
  http.get = (url, config = {}) =>
    http({
      ...config,
      url,
      method: 'GET',
    });
  http.post = (url, data, config = {}) =>
    http({
      ...config,
      url,
      data,
      method: 'POST',
    });
  http.put = (url, data, config = {}) =>
    http({
      ...config,
      url,
      data,
      method: 'PUT',
    });
  http.delete = (url, config = {}) =>
    http({
      ...config,
      url,
      method: 'DELETE',
    });
  function on(target, type, listener, options) {
    if (!isFunction(listener)) return () => {};
    const el = isString(target) ? document.querySelector(target) : target;
    if (!el || !isFunction(el.addEventListener)) return () => {};
    el.addEventListener(type, listener, options);
    return () => {
      el.removeEventListener(type, listener, options);
    };
  }
  function once(target, type, listener, options) {
    return on(
      target,
      type,
      listener,
      isObject(options) && options !== null
        ? {
            ...options,
            once: true,
          }
        : { once: true },
    );
  }
  var win = globalThis.unsafeWindow || globalThis.window || globalThis;
  var BUS_KEY = Symbol.for('__MAGIC_MONKEY_INTERCEPTOR_BUS__');
  function getSharedBus() {
    if (!win[BUS_KEY])
      win[BUS_KEY] = {
        rules: [],
        patched: false,
      };
    return win[BUS_KEY];
  }
  function extractRequestUrl(input) {
    if (isString(input)) return input;
    if (input instanceof URL) return input.href;
    return isString(input?.url) ? input.url : '';
  }
  function isRuleMatched(requestUrl, rule) {
    if (!requestUrl || !rule?.url) return false;
    if (rule.url instanceof RegExp) return rule.url.test(requestUrl);
    return requestUrl.includes(rule.url);
  }
  function isBinaryRequest(requestUrl, rules, response) {
    if (rules.some((rule) => rule.dataType === 'binary' || rule.dataType === 'arrayBuffer'))
      return true;
    if (requestUrl.includes('.so')) return true;
    const contentType = response.headers.get('content-type') || '';
    return contentType.includes('application/octet-stream') || contentType.includes('protobuf');
  }
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
  function parsePayload(text) {
    try {
      return {
        data: JSON.parse(text),
        isJson: true,
      };
    } catch {
      return {
        data: text,
        isJson: false,
      };
    }
  }
  async function transformTextResponse(response, rules) {
    const { data: initialData, isJson } = parsePayload(await response.clone().text());
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
  async function interceptFetchResponse(response, requestUrl, rules) {
    try {
      if (isBinaryRequest(requestUrl, rules, response))
        return await transformBinaryResponse(response, rules);
      return await transformTextResponse(response, rules);
    } catch (err) {
      console.error('[NetworkInterceptor] Fetch 响应重构异常，降级回退原始响应:', err);
      return response;
    }
  }
  function patchFetchPrototype(bus) {
    const originalFetch = win.fetch;
    if (!isFunction(originalFetch)) return;
    win.fetch = async function (...args) {
      const [input, init] = args;
      const requestUrl = extractRequestUrl(input);
      const activeRules = bus.rules
        .filter((rule) => isRuleMatched(requestUrl, rule))
        .filter((rule) => isFunction(rule.onResponse));
      if (activeRules.length === 0) return originalFetch.apply(this, args);
      return interceptFetchResponse(
        await originalFetch.apply(this, [input, init]),
        requestUrl,
        activeRules,
      );
    };
  }
  function readDescriptorValue(desc, xhr) {
    try {
      return desc ? desc.get.call(xhr) : void 0;
    } catch {
      return;
    }
  }
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
  function resolveTextPayload(processed, rawTextReader) {
    if (isString(processed)) return processed;
    if (processed instanceof ArrayBuffer || processed == null) return rawTextReader();
    return JSON.stringify(processed);
  }
  function patchXhrInstance(xhr, rules) {
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
  function patchXhrPrototype(bus) {
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
  function applyPatches(bus) {
    patchXhrPrototype(bus);
    patchFetchPrototype(bus);
  }
  function installNetworkInterceptor({ url, onResponse, dataType }) {
    const bus = getSharedBus();
    bus.rules.push({
      url,
      onResponse,
      dataType,
    });
    if (!bus.patched) {
      bus.patched = true;
      applyPatches(bus);
    }
    console.info(`[NetworkInterceptor] 成功注册网络响应拦截规则: ${url}`);
  }
  function parseAndValidateRegex(input, options = {}) {
    const { disallowEmptyMatch = false, emptyMatchError = '' } = options;
    if (!isString(input) || !input.trim())
      return {
        valid: false,
        error: '正则表达式不能为空',
      };
    const trimmed = input.trim();
    const slashMatch = trimmed.match(/^\/(.*?)\/([gimsuy]*)$/);
    const pattern = slashMatch ? slashMatch[1] : trimmed;
    const flags = slashMatch ? slashMatch[2] : '';
    let reg;
    try {
      reg = new RegExp(pattern, flags);
    } catch {
      return {
        valid: false,
        error: `正则语法错误`,
      };
    }
    if (disallowEmptyMatch && reg.test(''))
      return {
        valid: false,
        error: emptyMatchError,
      };
    return {
      valid: true,
      pattern,
      flags,
      reg,
    };
  }
  var name = 'bilibili-danmaku-filter';
  var version = '1.0.0';
  var DEFAULT_VIDEO_CONFIG = {
    enabled: true,
    minWeight: 3,
    mergeThreshold: 0.75,
    mergeWindow: 5,
    blacklist: [],
  };
  var DEFAULT_LIVE_CONFIG = {
    enabled: true,
    mergeThreshold: 0.75,
    mergeWindow: 5,
    blacklist: [],
  };
  var DEFAULT_CONFIG = {
    video: DEFAULT_VIDEO_CONFIG,
    live: DEFAULT_LIVE_CONFIG,
  };
  var RULE_TYPE = {
    CONTAINS: 'contains',
    EXACT: 'exact',
    REGEX: 'regex',
  };
  var RULE_TYPE_LABELS = {
    [RULE_TYPE.CONTAINS]: '包含',
    [RULE_TYPE.EXACT]: '精确',
    [RULE_TYPE.REGEX]: '正则',
  };
  var RULE_TYPE_OPTIONS = Object.entries(RULE_TYPE_LABELS).map(([value, label]) => ({
    label,
    value,
  }));
  var storage = createStorage(name);
  function readPersistedConfig() {
    try {
      const raw = storage.get('user_config', null);
      if (raw && isObject(raw)) {
        const legacyVideo = !raw.video && 'minWeight' in raw ? raw : {};
        return {
          video: {
            ...DEFAULT_VIDEO_CONFIG,
            ...legacyVideo,
            ...raw.video,
          },
          live: {
            ...DEFAULT_LIVE_CONFIG,
            ...raw.live,
          },
        };
      }
    } catch (error) {
      console.warn('读取持久化配置失败，降级回退默认配置:', error);
    }
    return structuredClone(DEFAULT_CONFIG);
  }
  function readVideoConfig() {
    return readPersistedConfig().video;
  }
  function readLiveConfig() {
    return readPersistedConfig().live;
  }
  function persistConfig(targetConfig) {
    try {
      storage.set('user_config', targetConfig);
    } catch (error) {
      console.error('保存持久化配置失败:', error);
    }
  }
  var currentConfig = (0, vue.reactive)(readPersistedConfig());
  function useConfig() {
    const updateConfig = (patch) => {
      assign(currentConfig, patch);
      persistConfig(currentConfig);
    };
    const resetConfig = () => {
      const defaults = structuredClone(DEFAULT_CONFIG);
      Object.keys(currentConfig).forEach((k) => delete currentConfig[k]);
      assign(currentConfig, defaults);
      persistConfig(currentConfig);
      return currentConfig;
    };
    return {
      config: currentConfig,
      updateConfig,
      resetConfig,
    };
  }
  var cachedBlacklistRef = null;
  var compiledBlacklist = {
    exactSet: new Set(),
    containsKeywords: [],
    regexList: [],
  };
  function parseRegex(pattern, flags = '') {
    try {
      return new RegExp(pattern, flags);
    } catch {
      return null;
    }
  }
  function addBlacklistRule(rule, target) {
    if (!rule?.type) return;
    const { type, keyword, pattern, flags } = rule;
    if (type === RULE_TYPE.EXACT && keyword) {
      target.exactSet.add(keyword);
      return;
    }
    if (type === RULE_TYPE.CONTAINS && keyword) {
      target.containsKeywords.push(keyword);
      return;
    }
    if (type === RULE_TYPE.REGEX && pattern) {
      const reg = parseRegex(pattern, flags);
      if (reg) target.regexList.push(reg);
    }
  }
  function compileBlacklist(blacklist) {
    const result = {
      exactSet: new Set(),
      containsKeywords: [],
      regexList: [],
    };
    if (!isArray(blacklist)) return result;
    for (const rule of blacklist) addBlacklistRule(rule, result);
    return result;
  }
  function getOrCompileBlacklist(blacklist) {
    if (cachedBlacklistRef === blacklist) return compiledBlacklist;
    cachedBlacklistRef = blacklist;
    compiledBlacklist = compileBlacklist(blacklist);
    return compiledBlacklist;
  }
  function matchesBlacklist(content, engine) {
    if (!content || !engine) return false;
    if (engine.exactSet.has(content)) return true;
    for (const kw of engine.containsKeywords) if (content.includes(kw)) return true;
    for (const reg of engine.regexList) if (reg.test(content)) return true;
    return false;
  }
  function isBlocked(text, blacklist) {
    if (!text || !isArray(blacklist) || blacklist.length === 0) return false;
    return matchesBlacklist(text, getOrCompileBlacklist(blacklist));
  }
  var dpBuffer = new Int32Array(128);
  function getRowBuffer(size) {
    if (dpBuffer.length < size) dpBuffer = new Int32Array(Math.max(dpBuffer.length * 2, size));
    return dpBuffer;
  }
  function normalizeDanmaku(text) {
    if (!text) return '';
    return text
      .trim()
      .toLowerCase()
      .replace(/(.)\1+/g, '$1$1');
  }
  function computeLevenshteinFast(a, b) {
    let start = 0;
    const lenA = a.length;
    const lenB = b.length;
    while (start < lenA && start < lenB && a.codePointAt(start) === b.codePointAt(start)) start++;
    let endA = lenA - 1;
    let endB = lenB - 1;
    while (endA >= start && endB >= start && a.codePointAt(endA) === b.codePointAt(endB)) {
      endA--;
      endB--;
    }
    const subLenA = endA - start + 1;
    const subLenB = endB - start + 1;
    if (subLenA <= 0) return subLenB;
    if (subLenB <= 0) return subLenA;
    const [s1, s1Start, s1Len, s2, s2Start, s2Len] =
      subLenB > subLenA
        ? [b, start, subLenB, a, start, subLenA]
        : [a, start, subLenA, b, start, subLenB];
    const row = getRowBuffer(s2Len + 1);
    for (let j = 0; j <= s2Len; j++) row[j] = j;
    for (let i = 1; i <= s1Len; i++) {
      const charA = s1.codePointAt(s1Start + i - 1);
      let prevDiag = row[0];
      row[0] = i;
      for (let j = 1; j <= s2Len; j++) {
        const temp = row[j];
        const cost = charA === s2.codePointAt(s2Start + j - 1) ? 0 : 1;
        row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prevDiag + cost);
        prevDiag = temp;
      }
    }
    return row[s2Len];
  }
  function isCompactSimilar(compactA, compactB, threshold = 0.8) {
    if (!compactA || !compactB) return false;
    if (compactA === compactB) return true;
    const lenA = compactA.length;
    const lenB = compactB.length;
    const maxLen = Math.max(lenA, lenB);
    if (maxLen === 0 || Math.min(lenA, lenB) / maxLen < threshold) return false;
    return 1 - computeLevenshteinFast(compactA, compactB) / maxLen >= threshold;
  }
  var MAX_WINDOW_CAPACITY = 60;
  var slidingQueue = [];
  var exactTimeMap = new Map();
  function evictExpiredRecords(currentTime, windowMs) {
    while (slidingQueue.length > 0 && currentTime - slidingQueue[0].time > windowMs) {
      const expired = slidingQueue.shift();
      if (exactTimeMap.get(expired.compactText) === expired.time)
        exactTimeMap.delete(expired.compactText);
    }
  }
  function isExactDuplicate(compactText, currentTime, windowMs) {
    const lastTime = exactTimeMap.get(compactText);
    return isNumber(lastTime) && currentTime - lastTime <= windowMs;
  }
  function isFuzzyDuplicate(compactText, threshold) {
    for (let i = slidingQueue.length - 1; i >= 0; i--)
      if (isCompactSimilar(compactText, slidingQueue[i].compactText, threshold)) return true;
    return false;
  }
  function recordAllowedDanmaku(compactText, currentTime) {
    if (slidingQueue.length >= MAX_WINDOW_CAPACITY) {
      const evicted = slidingQueue.shift();
      if (exactTimeMap.get(evicted.compactText) === evicted.time)
        exactTimeMap.delete(evicted.compactText);
    }
    slidingQueue.push({
      compactText,
      time: currentTime,
    });
    exactTimeMap.set(compactText, currentTime);
  }
  function checkLiveDuplicate(text, options = {}) {
    const windowSeconds = options.windowSeconds;
    if (windowSeconds <= 0 || !text) return false;
    const compactText = normalizeDanmaku(text);
    if (!compactText) return false;
    const now = performance.now();
    const windowMs = windowSeconds * 1e3;
    const threshold = options.threshold ?? 0.8;
    evictExpiredRecords(now, windowMs);
    if (isExactDuplicate(compactText, now, windowMs)) return true;
    if (threshold < 1 && isFuzzyDuplicate(compactText, threshold)) return true;
    recordAllowedDanmaku(compactText, now);
    return false;
  }
  var DANMAKU_CONTAINER_SELECTOR = '.danmaku-item-container';
  function findDanmakuElement(node) {
    if (!node) return null;
    if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('bili-danmaku-x-dm'))
      return node;
    return node.parentElement ? node.parentElement.closest('.bili-danmaku-x-dm') : null;
  }
  function handleDanmakuNode(node, configGetter) {
    const dmNode = findDanmakuElement(node);
    if (!dmNode || dmNode.hasAttribute('data-dm-blocked')) return;
    const config = configGetter();
    if (!config?.enabled) return;
    const text = dmNode.textContent?.trim();
    if (!text || dmNode.dataset.dmHandledText === text) return;
    dmNode.dataset.dmHandledText = text;
    if (isBlocked(text, config.blacklist)) {
      console.log('%c[黑名单拦截]', 'color: #ff4d4f; font-weight: bold;', text);
      dmNode.setAttribute('data-dm-blocked', 'true');
      return;
    }
    if (
      checkLiveDuplicate(text, {
        threshold: config.mergeThreshold,
        windowSeconds: config.mergeWindow,
      })
    ) {
      console.log('%c[防刷屏拦截]', 'color: #faad14; font-weight: bold;', text);
      dmNode.setAttribute('data-dm-blocked', 'true');
    }
  }
  function processMutation(mutation, configGetter) {
    if (mutation.type === 'childList') {
      for (const added of mutation.addedNodes) handleDanmakuNode(added, configGetter);
      return;
    }
    if (mutation.type === 'characterData') {
      handleDanmakuNode(mutation.target, configGetter);
      return;
    }
    if (
      mutation.type === 'attributes' &&
      mutation.target.classList?.contains('bili-danmaku-x-show')
    )
      handleDanmakuNode(mutation.target, configGetter);
  }
  function mountObserver(container, state, configGetter) {
    if (state.activeContainer === container) return;
    if (state.observer) state.observer.disconnect();
    state.activeContainer = container;
    state.observer = new MutationObserver((mutations) => {
      for (const m of mutations) processMutation(m, configGetter);
    });
    state.observer.observe(container, {
      childList: true,
      characterData: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });
    console.info('直播间弹幕屏蔽监听已挂载至容器');
  }
  var isStyleInjected = false;
  function startLiveFilter(configGetter) {
    if (!isStyleInjected) {
      GM_addStyle(`
      .bili-danmaku-x-dm[data-dm-blocked="true"] {
        display: none !important;
      }
    `);
      isStyleInjected = true;
    }
    const state = {
      activeContainer: null,
      observer: null,
    };
    const syncContainer = () => {
      if (state.activeContainer?.isConnected) return;
      const container = document.querySelector(DANMAKU_CONTAINER_SELECTOR);
      if (container && container !== state.activeContainer) {
        console.info('检测到弹幕容器就绪/重置，正在重新绑定...');
        mountObserver(container, state, configGetter);
      }
    };
    setInterval(syncContainer, 1e3);
  }
  function isDanmakuAllowed(item, ctx) {
    if (ctx.minWeight > 1 && (item.weight || 0) < ctx.minWeight) return false;
    return !(ctx.blacklistEngine && matchesBlacklist(item.content, ctx.blacklistEngine));
  }
  function filterDanmaku(list, config = {}) {
    if (!list || list.length === 0) return [];
    const ctx = {
      minWeight: config.minWeight || 1,
      blacklistEngine: config.blacklist?.length ? getOrCompileBlacklist(config.blacklist) : null,
    };
    const result = list.filter((item) => isDanmakuAllowed(item, ctx));
    console.info(
      `基础规则过滤完成: ${list.length} -> ${result.length} 条 (过滤 ${list.length - result.length} 条)`,
    );
    return result;
  }
  function absorbDanmaku(cluster, candidate) {
    cluster.count++;
    cluster.totalProgress += candidate.progress || 0;
    const candidateContent = candidate.content;
    if (candidateContent.length > cluster.item.content.length) {
      cluster.item.content = candidateContent;
      cluster.compactText = candidate.compactText;
    }
    cluster.item.weight = Math.max(cluster.item.weight, candidate.weight);
  }
  function collectCluster(sorted, startIndex, used, windowMs, threshold) {
    const baseItem = sorted[startIndex];
    const baseProgress = baseItem.progress || 0;
    const cluster = {
      item: { ...baseItem },
      compactText: baseItem.compactText,
      totalProgress: baseProgress,
      count: 1,
    };
    for (let j = startIndex + 1; j < sorted.length; j++) {
      if (used[j]) continue;
      const candidate = sorted[j];
      if ((candidate.progress || 0) - baseProgress > windowMs) break;
      if (isCompactSimilar(cluster.compactText, candidate.compactText, threshold)) {
        used[j] = 1;
        absorbDanmaku(cluster, candidate);
      }
    }
    cluster.item.progress = Math.round(cluster.totalProgress / cluster.count);
    return {
      mergedItem: cluster.item,
      mergedCount: cluster.count - 1,
    };
  }
  function mergeSimilar(list, threshold, windowSec) {
    if (!list || list.length < 2)
      return {
        list: list || [],
        mergedCount: 0,
      };
    const windowMs = windowSec * 1e3;
    const sorted = [...list].sort((a, b) => a.progress - b.progress);
    for (const element of sorted) element.compactText = normalizeDanmaku(element.content);
    const result = [];
    const used = new Uint8Array(sorted.length);
    let totalMergedCount = 0;
    for (let i = 0; i < sorted.length; i++) {
      if (used[i]) continue;
      const { mergedItem, mergedCount } = collectCluster(sorted, i, used, windowMs, threshold);
      delete mergedItem.compactText;
      result.push(mergedItem);
      totalMergedCount += mergedCount;
    }
    console.info(
      `相似弹幕合并完成: ${list.length} -> ${result.length} 条 (合并 ${totalMergedCount} 条)`,
    );
    return {
      list: result,
      mergedCount: totalMergedCount,
    };
  }
  var require_aspromise = __commonJSMin((exports, module) => {
    module.exports = asPromise;
    function asPromise(fn, ctx) {
      var params = new Array(arguments.length - 1),
        offset = 0,
        index = 2,
        pending = true;
      while (index < arguments.length) params[offset++] = arguments[index++];
      return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err) {
          if (pending) {
            pending = false;
            if (err) reject(err);
            else {
              var params = new Array(arguments.length - 1),
                offset = 0;
              while (offset < params.length) params[offset++] = arguments[offset];
              resolve.apply(null, params);
            }
          }
        };
        try {
          fn.apply(ctx || null, params);
        } catch (err) {
          if (pending) {
            pending = false;
            reject(err);
          }
        }
      });
    }
  });
  var require_base64 = __commonJSMin((exports) => {
    var base64 = exports;
    base64.length = function length(string) {
      var p = string.length;
      if (!p) return 0;
      while (p > 0 && string.charAt(p - 1) === '=') --p;
      return Math.floor((p * 3) / 4);
    };
    var b64 = new Array(64);
    var s64 = new Array(123);
    for (var i = 0; i < 64;)
      s64[(b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : (i - 59) | 43)] = i++;
    s64[45] = 62;
    s64[95] = 63;
    base64.encode = function encode(buffer, start, end) {
      var parts = null,
        chunk = [];
      var i = 0,
        j = 0,
        t;
      while (start < end) {
        var b = buffer[start++];
        switch (j) {
          case 0:
            chunk[i++] = b64[b >> 2];
            t = (b & 3) << 4;
            j = 1;
            break;
          case 1:
            chunk[i++] = b64[t | (b >> 4)];
            t = (b & 15) << 2;
            j = 2;
            break;
          case 2:
            chunk[i++] = b64[t | (b >> 6)];
            chunk[i++] = b64[b & 63];
            j = 0;
        }
        if (i > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i = 0;
        }
      }
      if (j) {
        chunk[i++] = b64[t];
        chunk[i++] = 61;
        if (j === 1) chunk[i++] = 61;
      }
      if (parts) {
        if (i) parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join('');
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i));
    };
    var invalidEncoding = 'invalid encoding';
    base64.decode = function decode(string, buffer, offset) {
      var start = offset;
      var j = 0,
        t;
      for (var i = 0; i < string.length;) {
        var c = string.charCodeAt(i++);
        if (c === 61 && j > 1) break;
        if ((c = s64[c]) === void 0) throw Error(invalidEncoding);
        switch (j) {
          case 0:
            t = c;
            j = 1;
            break;
          case 1:
            buffer[offset++] = (t << 2) | ((c & 48) >> 4);
            t = c;
            j = 2;
            break;
          case 2:
            buffer[offset++] = ((t & 15) << 4) | ((c & 60) >> 2);
            t = c;
            j = 3;
            break;
          case 3:
            buffer[offset++] = ((t & 3) << 6) | c;
            j = 0;
        }
      }
      if (j === 1) throw Error(invalidEncoding);
      return offset - start;
    };
    var base64Re = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    var base64UrlRe = /[-_]/;
    var base64UrlNoPaddingRe =
      /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2}(?:==)?|[A-Za-z0-9_-]{3}=?)?$/;
    base64.test = function test(string) {
      return (
        base64Re.test(string) || (base64UrlRe.test(string) && base64UrlNoPaddingRe.test(string))
      );
    };
  });
  var require_eventemitter = __commonJSMin((exports, module) => {
    module.exports = EventEmitter;
    function EventEmitter() {
      this._listeners = Object.create(null);
    }
    EventEmitter.prototype.on = function on(evt, fn, ctx) {
      (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn,
        ctx: ctx || this,
      });
      return this;
    };
    EventEmitter.prototype.off = function off(evt, fn) {
      if (evt === void 0) this._listeners = Object.create(null);
      else if (fn === void 0) this._listeners[evt] = [];
      else {
        var listeners = this._listeners[evt];
        if (!listeners) return this;
        for (var i = 0; i < listeners.length;)
          if (listeners[i].fn === fn) listeners.splice(i, 1);
          else ++i;
      }
      return this;
    };
    EventEmitter.prototype.emit = function emit(evt) {
      var listeners = this._listeners[evt];
      if (listeners) {
        var args = [],
          i = 1;
        for (; i < arguments.length;) args.push(arguments[i++]);
        for (i = 0; i < listeners.length;) listeners[i].fn.apply(listeners[i++].ctx, args);
      }
      return this;
    };
  });
  var require_float = __commonJSMin((exports, module) => {
    module.exports = factory(factory);
    function factory(exports$4) {
      if (typeof Float32Array !== 'undefined')
        (function () {
          var f32 = new Float32Array([-0]),
            f8b = new Uint8Array(f32.buffer),
            le = f8b[3] === 128;
          function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
          }
          function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
          }
          exports$4.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
          exports$4.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
          function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
          }
          function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
          }
          exports$4.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
          exports$4.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
        })();
      else
        (function () {
          function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign) val = -val;
            if (val === 0) writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos);
            else if (isNaN(val)) writeUint(2143289344, buf, pos);
            else if (val > 34028234663852886e22)
              writeUint(((sign << 31) | 2139095040) >>> 0, buf, pos);
            else if (val < 11754943508222875e-54)
              writeUint(((sign << 31) | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
            else {
              var exponent = Math.floor(Math.log(val) / Math.LN2),
                mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
              writeUint(((sign << 31) | ((exponent + 127) << 23) | mantissa) >>> 0, buf, pos);
            }
          }
          exports$4.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
          exports$4.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
          function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos),
              sign = (uint >> 31) * 2 + 1,
              exponent = (uint >>> 23) & 255,
              mantissa = uint & 8388607;
            return exponent === 255
              ? mantissa
                ? NaN
                : sign * Infinity
              : exponent === 0
                ? sign * 1401298464324817e-60 * mantissa
                : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
          }
          exports$4.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
          exports$4.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
        })();
      if (typeof Float64Array !== 'undefined')
        (function () {
          var f64 = new Float64Array([-0]),
            f8b = new Uint8Array(f64.buffer),
            le = f8b[7] === 128;
          function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
          }
          function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
          }
          exports$4.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
          exports$4.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
          function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
          }
          function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
          }
          exports$4.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
          exports$4.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
        })();
      else
        (function () {
          function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign) val = -val;
            if (val === 0) {
              writeUint(0, buf, pos + off0);
              writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
              writeUint(0, buf, pos + off0);
              writeUint(2146959360, buf, pos + off1);
            } else if (val > 17976931348623157e292) {
              writeUint(0, buf, pos + off0);
              writeUint(((sign << 31) | 2146435072) >>> 0, buf, pos + off1);
            } else {
              var mantissa;
              if (val < 22250738585072014e-324) {
                mantissa = val / 5e-324;
                writeUint(mantissa >>> 0, buf, pos + off0);
                writeUint(((sign << 31) | (mantissa / 4294967296)) >>> 0, buf, pos + off1);
              } else {
                var exponent = Math.floor(Math.log(val) / Math.LN2);
                if (exponent === 1024) exponent = 1023;
                mantissa = val * Math.pow(2, -exponent);
                writeUint((mantissa * 4503599627370496) >>> 0, buf, pos + off0);
                writeUint(
                  ((sign << 31) | ((exponent + 1023) << 20) | ((mantissa * 1048576) & 1048575)) >>>
                    0,
                  buf,
                  pos + off1,
                );
              }
            }
          }
          exports$4.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
          exports$4.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
          function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0),
              hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1,
              exponent = (hi >>> 20) & 2047,
              mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047
              ? mantissa
                ? NaN
                : sign * Infinity
              : exponent === 0
                ? sign * 5e-324 * mantissa
                : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
          }
          exports$4.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
          exports$4.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
        })();
      return exports$4;
    }
    function writeUintLE(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = (val >>> 8) & 255;
      buf[pos + 2] = (val >>> 16) & 255;
      buf[pos + 3] = val >>> 24;
    }
    function writeUintBE(val, buf, pos) {
      buf[pos] = val >>> 24;
      buf[pos + 1] = (val >>> 16) & 255;
      buf[pos + 2] = (val >>> 8) & 255;
      buf[pos + 3] = val & 255;
    }
    function readUintLE(buf, pos) {
      return (buf[pos] | (buf[pos + 1] << 8) | (buf[pos + 2] << 16) | (buf[pos + 3] << 24)) >>> 0;
    }
    function readUintBE(buf, pos) {
      return ((buf[pos] << 24) | (buf[pos + 1] << 16) | (buf[pos + 2] << 8) | buf[pos + 3]) >>> 0;
    }
  });
  var require_utf8 = __commonJSMin((exports) => {
    var utf8 = exports;
    var looseDecoder = new TextDecoder('utf-8', { ignoreBOM: true });
    var strictDecoder;
    var TEXT_DECODER_MIN_LENGTH = 64;
    try {
      strictDecoder = new TextDecoder('utf-8', {
        fatal: true,
        ignoreBOM: true,
      });
    } catch (err) {
      strictDecoder = looseDecoder;
    }
    utf8.length = function utf8_length(string) {
      var len = 0,
        c = 0;
      for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128) len += 1;
        else if (c < 2048) len += 2;
        else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
          ++i;
          len += 4;
        } else len += 3;
      }
      return len;
    };
    function utf8_read_decoder(decoder, buffer, start, end) {
      var source = start === 0 && end === buffer.length ? buffer : buffer.subarray(start, end);
      return decoder.decode(source);
    }
    utf8.read = function utf8_read_loose(buffer, start, end) {
      if (end - start < 1) return '';
      if (end - start >= TEXT_DECODER_MIN_LENGTH)
        return utf8_read_decoder(looseDecoder, buffer, start, end);
      var str = '',
        i = start,
        c1,
        c2,
        c3,
        c4,
        c5,
        c6,
        c7,
        c8;
      for (; i + 7 < end; i += 8) {
        c1 = buffer[i];
        c2 = buffer[i + 1];
        c3 = buffer[i + 2];
        c4 = buffer[i + 3];
        c5 = buffer[i + 4];
        c6 = buffer[i + 5];
        c7 = buffer[i + 6];
        c8 = buffer[i + 7];
        if ((c1 | c2 | c3 | c4 | c5 | c6 | c7 | c8) & 128)
          return str + utf8_read_decoder(looseDecoder, buffer, i, end);
        str += String.fromCharCode(c1, c2, c3, c4, c5, c6, c7, c8);
      }
      for (; i < end; ++i) {
        c1 = buffer[i];
        if (c1 & 128) return str + utf8_read_decoder(looseDecoder, buffer, i, end);
        str += String.fromCharCode(c1);
      }
      return str;
    };
    utf8.readStrict = function utf8_read_strict(buffer, start, end) {
      if (end - start < 1) return '';
      if (end - start >= TEXT_DECODER_MIN_LENGTH)
        return utf8_read_decoder(strictDecoder, buffer, start, end);
      var str = '',
        i = start,
        c1,
        c2,
        c3,
        c4,
        c5,
        c6,
        c7,
        c8;
      for (; i + 7 < end; i += 8) {
        c1 = buffer[i];
        c2 = buffer[i + 1];
        c3 = buffer[i + 2];
        c4 = buffer[i + 3];
        c5 = buffer[i + 4];
        c6 = buffer[i + 5];
        c7 = buffer[i + 6];
        c8 = buffer[i + 7];
        if ((c1 | c2 | c3 | c4 | c5 | c6 | c7 | c8) & 128)
          return str + utf8_read_decoder(strictDecoder, buffer, i, end);
        str += String.fromCharCode(c1, c2, c3, c4, c5, c6, c7, c8);
      }
      for (; i < end; ++i) {
        c1 = buffer[i];
        if (c1 & 128) return str + utf8_read_decoder(strictDecoder, buffer, i, end);
        str += String.fromCharCode(c1);
      }
      return str;
    };
    utf8.write = function utf8_write(string, buffer, offset) {
      var start = offset,
        c1,
        c2;
      for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) buffer[offset++] = c1;
        else if (c1 < 2048) {
          buffer[offset++] = (c1 >> 6) | 192;
          buffer[offset++] = (c1 & 63) | 128;
        } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
          c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
          ++i;
          buffer[offset++] = (c1 >> 18) | 240;
          buffer[offset++] = ((c1 >> 12) & 63) | 128;
          buffer[offset++] = ((c1 >> 6) & 63) | 128;
          buffer[offset++] = (c1 & 63) | 128;
        } else {
          buffer[offset++] = (c1 >> 12) | 224;
          buffer[offset++] = ((c1 >> 6) & 63) | 128;
          buffer[offset++] = (c1 & 63) | 128;
        }
      }
      return offset - start;
    };
  });
  var require_pool = __commonJSMin((exports, module) => {
    module.exports = pool;
    function pool(alloc, slice, size) {
      var SIZE = size || 8192;
      var MAX = SIZE >>> 1;
      var slab = null;
      var offset = SIZE;
      return function pool_alloc(size) {
        if (size < 1 || size > MAX) return alloc(size);
        if (offset + size > SIZE) {
          slab = alloc(SIZE);
          offset = 0;
        }
        var buf = slice.call(slab, offset, (offset += size));
        if (offset & 7) offset = (offset | 7) + 1;
        return buf;
      };
    }
  });
  var require_longbits = __commonJSMin((exports, module) => {
    module.exports = LongBits;
    var Long;
    function LongBits(lo, hi) {
      this.lo = lo >>> 0;
      this.hi = hi >>> 0;
    }
    var zero = (LongBits.zero = new LongBits(0, 0));
    zero.toNumber = function () {
      return 0;
    };
    zero.zzEncode = zero.zzDecode = function () {
      return this;
    };
    zero.length = function () {
      return 1;
    };
    var zeroHash = (LongBits.zeroHash = '\0\0\0\0\0\0\0\0');
    LongBits.fromNumber = function fromNumber(value) {
      if (value === 0) return zero;
      var sign = value < 0;
      if (sign) value = -value;
      var lo = value >>> 0,
        hi = ((value - lo) / 4294967296) >>> 0;
      if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
          lo = 0;
          if (++hi > 4294967295) hi = 0;
        }
      }
      return new LongBits(lo, hi);
    };
    LongBits.from = function from(value) {
      if (typeof value === 'number') return LongBits.fromNumber(value);
      if (typeof value === 'string' || value instanceof String) {
        if (Long) value = Long.fromString(value);
        else return LongBits.fromNumber(parseInt(value, 10));
      }
      return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
    };
    LongBits.prototype.toNumber = function toNumber(unsigned) {
      if (!unsigned && this.hi >>> 31) {
        var lo = (~this.lo + 1) >>> 0,
          hi = ~this.hi >>> 0;
        if (!lo) hi = (hi + 1) >>> 0;
        return -(lo + hi * 4294967296);
      }
      return this.lo + this.hi * 4294967296;
    };
    LongBits.prototype.toLong = function toLong(unsigned) {
      return Long
        ? new Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
        : {
            low: this.lo | 0,
            high: this.hi | 0,
            unsigned: Boolean(unsigned),
          };
    };
    var charCodeAt = String.prototype.charCodeAt;
    LongBits.fromHash = function fromHash(hash) {
      if (hash === zeroHash) return zero;
      return new LongBits(
        (charCodeAt.call(hash, 0) |
          (charCodeAt.call(hash, 1) << 8) |
          (charCodeAt.call(hash, 2) << 16) |
          (charCodeAt.call(hash, 3) << 24)) >>>
          0,
        (charCodeAt.call(hash, 4) |
          (charCodeAt.call(hash, 5) << 8) |
          (charCodeAt.call(hash, 6) << 16) |
          (charCodeAt.call(hash, 7) << 24)) >>>
          0,
      );
    };
    LongBits.prototype.toHash = function toHash() {
      return String.fromCharCode(
        this.lo & 255,
        (this.lo >>> 8) & 255,
        (this.lo >>> 16) & 255,
        this.lo >>> 24,
        this.hi & 255,
        (this.hi >>> 8) & 255,
        (this.hi >>> 16) & 255,
        this.hi >>> 24,
      );
    };
    LongBits.prototype.zzEncode = function zzEncode() {
      var mask = this.hi >> 31;
      this.hi = (((this.hi << 1) | (this.lo >>> 31)) ^ mask) >>> 0;
      this.lo = ((this.lo << 1) ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.zzDecode = function zzDecode() {
      var mask = -(this.lo & 1);
      this.lo = (((this.lo >>> 1) | (this.hi << 31)) ^ mask) >>> 0;
      this.hi = ((this.hi >>> 1) ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.length = function length() {
      var part0 = this.lo,
        part1 = ((this.lo >>> 28) | (this.hi << 4)) >>> 0,
        part2 = this.hi >>> 24;
      return part2 === 0
        ? part1 === 0
          ? part0 < 16384
            ? part0 < 128
              ? 1
              : 2
            : part0 < 2097152
              ? 3
              : 4
          : part1 < 16384
            ? part1 < 128
              ? 5
              : 6
            : part1 < 2097152
              ? 7
              : 8
        : part2 < 128
          ? 9
          : 10;
    };
    LongBits._configure = function (Long_) {
      Long = Long_;
    };
  });
  var require_umd = __commonJSMin((exports, module) => {
    (function (global, factory) {
      function preferDefault(exports$1) {
        return exports$1.default || exports$1;
      }
      if (typeof define === 'function' && define.amd)
        define([], function () {
          var exports$2 = {};
          factory(exports$2);
          return preferDefault(exports$2);
        });
      else if (typeof exports === 'object') {
        factory(exports);
        if (typeof module === 'object') module.exports = preferDefault(exports);
      } else
        (function () {
          var exports$3 = {};
          factory(exports$3);
          global.Long = preferDefault(exports$3);
        })();
    })(
      typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : exports,
      function (_exports) {
        'use strict';
        Object.defineProperty(_exports, '__esModule', { value: true });
        _exports.default = void 0;
        var wasm = null;
        try {
          wasm = new WebAssembly.Instance(
            new WebAssembly.Module(
              new Uint8Array([
                0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1,
                127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117,
                108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114,
                101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104,
                105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32,
                1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66,
                32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32,
                134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167,
                36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32,
                2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4,
                167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3,
                173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1,
                1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32,
                134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11,
              ]),
            ),
            {},
          ).exports;
        } catch {}
        function Long(low, high, unsigned) {
          this.low = low | 0;
          this.high = high | 0;
          this.unsigned = !!unsigned;
        }
        Long.prototype.__isLong__;
        Object.defineProperty(Long.prototype, '__isLong__', { value: true });
        function isLong(obj) {
          return (obj && obj['__isLong__']) === true;
        }
        function ctz32(value) {
          var c = Math.clz32(value & -value);
          return value ? 31 - c : c;
        }
        Long.isLong = isLong;
        var INT_CACHE = {};
        var UINT_CACHE = {};
        function fromInt(value, unsigned) {
          var obj, cachedObj, cache;
          if (unsigned) {
            value >>>= 0;
            if ((cache = 0 <= value && value < 256)) {
              cachedObj = UINT_CACHE[value];
              if (cachedObj) return cachedObj;
            }
            obj = fromBits(value, 0, true);
            if (cache) UINT_CACHE[value] = obj;
            return obj;
          } else {
            value |= 0;
            if ((cache = -128 <= value && value < 128)) {
              cachedObj = INT_CACHE[value];
              if (cachedObj) return cachedObj;
            }
            obj = fromBits(value, value < 0 ? -1 : 0, false);
            if (cache) INT_CACHE[value] = obj;
            return obj;
          }
        }
        Long.fromInt = fromInt;
        function fromNumber(value, unsigned) {
          if (isNaN(value)) return unsigned ? UZERO : ZERO;
          if (unsigned) {
            if (value < 0) return UZERO;
            if (value >= TWO_PWR_64_DBL) return MAX_UNSIGNED_VALUE;
          } else {
            if (value <= -TWO_PWR_63_DBL) return MIN_VALUE;
            if (value + 1 >= TWO_PWR_63_DBL) return MAX_VALUE;
          }
          if (value < 0) return fromNumber(-value, unsigned).neg();
          return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
        }
        Long.fromNumber = fromNumber;
        function fromBits(lowBits, highBits, unsigned) {
          return new Long(lowBits, highBits, unsigned);
        }
        Long.fromBits = fromBits;
        var pow_dbl = Math.pow;
        function fromString(str, unsigned, radix) {
          if (str.length === 0) throw Error('empty string');
          if (typeof unsigned === 'number') {
            radix = unsigned;
            unsigned = false;
          } else unsigned = !!unsigned;
          if (str === 'NaN' || str === 'Infinity' || str === '+Infinity' || str === '-Infinity')
            return unsigned ? UZERO : ZERO;
          radix = radix || 10;
          if (radix < 2 || 36 < radix) throw RangeError('radix');
          var p;
          if ((p = str.indexOf('-')) > 0) throw Error('interior hyphen');
          else if (p === 0) return fromString(str.substring(1), unsigned, radix).neg();
          var radixToPower = fromNumber(pow_dbl(radix, 8));
          var result = ZERO;
          for (var i = 0; i < str.length; i += 8) {
            var size = Math.min(8, str.length - i),
              value = parseInt(str.substring(i, i + size), radix);
            if (size < 8) {
              var power = fromNumber(pow_dbl(radix, size));
              result = result.mul(power).add(fromNumber(value));
            } else {
              result = result.mul(radixToPower);
              result = result.add(fromNumber(value));
            }
          }
          result.unsigned = unsigned;
          return result;
        }
        Long.fromString = fromString;
        function fromValue(val, unsigned) {
          if (typeof val === 'number') return fromNumber(val, unsigned);
          if (typeof val === 'string') return fromString(val, unsigned);
          return fromBits(
            val.low,
            val.high,
            typeof unsigned === 'boolean' ? unsigned : val.unsigned,
          );
        }
        Long.fromValue = fromValue;
        var TWO_PWR_16_DBL = 65536;
        var TWO_PWR_24_DBL = 1 << 24;
        var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
        var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
        var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
        var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
        var ZERO = fromInt(0);
        Long.ZERO = ZERO;
        var UZERO = fromInt(0, true);
        Long.UZERO = UZERO;
        var ONE = fromInt(1);
        Long.ONE = ONE;
        var UONE = fromInt(1, true);
        Long.UONE = UONE;
        var NEG_ONE = fromInt(-1);
        Long.NEG_ONE = NEG_ONE;
        var MAX_VALUE = fromBits(-1, 2147483647, false);
        Long.MAX_VALUE = MAX_VALUE;
        var MAX_UNSIGNED_VALUE = fromBits(-1, -1, true);
        Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
        var MIN_VALUE = fromBits(0, -2147483648, false);
        Long.MIN_VALUE = MIN_VALUE;
        var LongPrototype = Long.prototype;
        LongPrototype.toInt = function toInt() {
          return this.unsigned ? this.low >>> 0 : this.low;
        };
        LongPrototype.toNumber = function toNumber() {
          if (this.unsigned) return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
          return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
        };
        LongPrototype.toString = function toString(radix) {
          radix = radix || 10;
          if (radix < 2 || 36 < radix) throw RangeError('radix');
          if (this.isZero()) return '0';
          if (this.isNegative()) {
            if (this.eq(MIN_VALUE)) {
              var radixLong = fromNumber(radix),
                div = this.div(radixLong),
                rem1 = div.mul(radixLong).sub(this);
              return div.toString(radix) + rem1.toInt().toString(radix);
            } else return '-' + this.neg().toString(radix);
          }
          var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
            rem = this;
          var result = '';
          while (true) {
            var remDiv = rem.div(radixToPower),
              digits = (rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0).toString(radix);
            rem = remDiv;
            if (rem.isZero()) return digits + result;
            else {
              while (digits.length < 6) digits = '0' + digits;
              result = '' + digits + result;
            }
          }
        };
        LongPrototype.getHighBits = function getHighBits() {
          return this.high;
        };
        LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
          return this.high >>> 0;
        };
        LongPrototype.getLowBits = function getLowBits() {
          return this.low;
        };
        LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
          return this.low >>> 0;
        };
        LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
          if (this.isNegative()) return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
          var val = this.high != 0 ? this.high : this.low;
          for (var bit = 31; bit > 0; bit--) if ((val & (1 << bit)) != 0) break;
          return this.high != 0 ? bit + 33 : bit + 1;
        };
        LongPrototype.isSafeInteger = function isSafeInteger() {
          var top11Bits = this.high >> 21;
          if (!top11Bits) return true;
          if (this.unsigned) return false;
          return top11Bits === -1 && !(this.low === 0 && this.high === -2097152);
        };
        LongPrototype.isZero = function isZero() {
          return this.high === 0 && this.low === 0;
        };
        LongPrototype.eqz = LongPrototype.isZero;
        LongPrototype.isNegative = function isNegative() {
          return !this.unsigned && this.high < 0;
        };
        LongPrototype.isPositive = function isPositive() {
          return this.unsigned || this.high >= 0;
        };
        LongPrototype.isOdd = function isOdd() {
          return (this.low & 1) === 1;
        };
        LongPrototype.isEven = function isEven() {
          return (this.low & 1) === 0;
        };
        LongPrototype.equals = function equals(other) {
          if (!isLong(other)) other = fromValue(other);
          if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1)
            return false;
          return this.high === other.high && this.low === other.low;
        };
        LongPrototype.eq = LongPrototype.equals;
        LongPrototype.notEquals = function notEquals(other) {
          return !this.eq(other);
        };
        LongPrototype.neq = LongPrototype.notEquals;
        LongPrototype.ne = LongPrototype.notEquals;
        LongPrototype.lessThan = function lessThan(other) {
          return this.comp(other) < 0;
        };
        LongPrototype.lt = LongPrototype.lessThan;
        LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
          return this.comp(other) <= 0;
        };
        LongPrototype.lte = LongPrototype.lessThanOrEqual;
        LongPrototype.le = LongPrototype.lessThanOrEqual;
        LongPrototype.greaterThan = function greaterThan(other) {
          return this.comp(other) > 0;
        };
        LongPrototype.gt = LongPrototype.greaterThan;
        LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
          return this.comp(other) >= 0;
        };
        LongPrototype.gte = LongPrototype.greaterThanOrEqual;
        LongPrototype.ge = LongPrototype.greaterThanOrEqual;
        LongPrototype.compare = function compare(other) {
          if (!isLong(other)) other = fromValue(other);
          if (this.eq(other)) return 0;
          var thisNeg = this.isNegative(),
            otherNeg = other.isNegative();
          if (thisNeg && !otherNeg) return -1;
          if (!thisNeg && otherNeg) return 1;
          if (!this.unsigned) return this.sub(other).isNegative() ? -1 : 1;
          return other.high >>> 0 > this.high >>> 0 ||
            (other.high === this.high && other.low >>> 0 > this.low >>> 0)
            ? -1
            : 1;
        };
        LongPrototype.comp = LongPrototype.compare;
        LongPrototype.negate = function negate() {
          if (!this.unsigned && this.eq(MIN_VALUE)) return MIN_VALUE;
          return this.not().add(ONE);
        };
        LongPrototype.neg = LongPrototype.negate;
        LongPrototype.add = function add(addend) {
          if (!isLong(addend)) addend = fromValue(addend);
          var a48 = this.high >>> 16;
          var a32 = this.high & 65535;
          var a16 = this.low >>> 16;
          var a00 = this.low & 65535;
          var b48 = addend.high >>> 16;
          var b32 = addend.high & 65535;
          var b16 = addend.low >>> 16;
          var b00 = addend.low & 65535;
          var c48 = 0,
            c32 = 0,
            c16 = 0,
            c00 = 0;
          c00 += a00 + b00;
          c16 += c00 >>> 16;
          c00 &= 65535;
          c16 += a16 + b16;
          c32 += c16 >>> 16;
          c16 &= 65535;
          c32 += a32 + b32;
          c48 += c32 >>> 16;
          c32 &= 65535;
          c48 += a48 + b48;
          c48 &= 65535;
          return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
        };
        LongPrototype.subtract = function subtract(subtrahend) {
          if (!isLong(subtrahend)) subtrahend = fromValue(subtrahend);
          return this.add(subtrahend.neg());
        };
        LongPrototype.sub = LongPrototype.subtract;
        LongPrototype.multiply = function multiply(multiplier) {
          if (this.isZero()) return this;
          if (!isLong(multiplier)) multiplier = fromValue(multiplier);
          if (wasm)
            return fromBits(
              wasm['mul'](this.low, this.high, multiplier.low, multiplier.high),
              wasm['get_high'](),
              this.unsigned,
            );
          if (multiplier.isZero()) return this.unsigned ? UZERO : ZERO;
          if (this.eq(MIN_VALUE)) return multiplier.isOdd() ? MIN_VALUE : ZERO;
          if (multiplier.eq(MIN_VALUE)) return this.isOdd() ? MIN_VALUE : ZERO;
          if (this.isNegative()) {
            if (multiplier.isNegative()) return this.neg().mul(multiplier.neg());
            else return this.neg().mul(multiplier).neg();
          } else if (multiplier.isNegative()) return this.mul(multiplier.neg()).neg();
          if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
            return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
          var a48 = this.high >>> 16;
          var a32 = this.high & 65535;
          var a16 = this.low >>> 16;
          var a00 = this.low & 65535;
          var b48 = multiplier.high >>> 16;
          var b32 = multiplier.high & 65535;
          var b16 = multiplier.low >>> 16;
          var b00 = multiplier.low & 65535;
          var c48 = 0,
            c32 = 0,
            c16 = 0,
            c00 = 0;
          c00 += a00 * b00;
          c16 += c00 >>> 16;
          c00 &= 65535;
          c16 += a16 * b00;
          c32 += c16 >>> 16;
          c16 &= 65535;
          c16 += a00 * b16;
          c32 += c16 >>> 16;
          c16 &= 65535;
          c32 += a32 * b00;
          c48 += c32 >>> 16;
          c32 &= 65535;
          c32 += a16 * b16;
          c48 += c32 >>> 16;
          c32 &= 65535;
          c32 += a00 * b32;
          c48 += c32 >>> 16;
          c32 &= 65535;
          c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
          c48 &= 65535;
          return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
        };
        LongPrototype.mul = LongPrototype.multiply;
        LongPrototype.divide = function divide(divisor) {
          if (!isLong(divisor)) divisor = fromValue(divisor);
          if (divisor.isZero()) throw Error('division by zero');
          if (wasm) {
            if (
              !this.unsigned &&
              this.high === -2147483648 &&
              divisor.low === -1 &&
              divisor.high === -1
            )
              return this;
            return fromBits(
              (this.unsigned ? wasm['div_u'] : wasm['div_s'])(
                this.low,
                this.high,
                divisor.low,
                divisor.high,
              ),
              wasm['get_high'](),
              this.unsigned,
            );
          }
          if (this.isZero()) return this.unsigned ? UZERO : ZERO;
          var approx, rem, res;
          if (!this.unsigned) {
            if (this.eq(MIN_VALUE)) {
              if (divisor.eq(ONE) || divisor.eq(NEG_ONE)) return MIN_VALUE;
              else if (divisor.eq(MIN_VALUE)) return ONE;
              else {
                approx = this.shr(1).div(divisor).shl(1);
                if (approx.eq(ZERO)) return divisor.isNegative() ? ONE : NEG_ONE;
                else {
                  rem = this.sub(divisor.mul(approx));
                  res = approx.add(rem.div(divisor));
                  return res;
                }
              }
            } else if (divisor.eq(MIN_VALUE)) return this.unsigned ? UZERO : ZERO;
            if (this.isNegative()) {
              if (divisor.isNegative()) return this.neg().div(divisor.neg());
              return this.neg().div(divisor).neg();
            } else if (divisor.isNegative()) return this.div(divisor.neg()).neg();
            res = ZERO;
          } else {
            if (!divisor.unsigned) divisor = divisor.toUnsigned();
            if (divisor.gt(this)) return UZERO;
            if (divisor.gt(this.shru(1))) return UONE;
            res = UZERO;
          }
          rem = this;
          while (rem.gte(divisor)) {
            approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
            var log2 = Math.ceil(Math.log(approx) / Math.LN2),
              delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48),
              approxRes = fromNumber(approx),
              approxRem = approxRes.mul(divisor);
            while (approxRem.isNegative() || approxRem.gt(rem)) {
              approx -= delta;
              approxRes = fromNumber(approx, this.unsigned);
              approxRem = approxRes.mul(divisor);
            }
            if (approxRes.isZero()) approxRes = ONE;
            res = res.add(approxRes);
            rem = rem.sub(approxRem);
          }
          return res;
        };
        LongPrototype.div = LongPrototype.divide;
        LongPrototype.modulo = function modulo(divisor) {
          if (!isLong(divisor)) divisor = fromValue(divisor);
          if (wasm)
            return fromBits(
              (this.unsigned ? wasm['rem_u'] : wasm['rem_s'])(
                this.low,
                this.high,
                divisor.low,
                divisor.high,
              ),
              wasm['get_high'](),
              this.unsigned,
            );
          return this.sub(this.div(divisor).mul(divisor));
        };
        LongPrototype.mod = LongPrototype.modulo;
        LongPrototype.rem = LongPrototype.modulo;
        LongPrototype.not = function not() {
          return fromBits(~this.low, ~this.high, this.unsigned);
        };
        LongPrototype.countLeadingZeros = function countLeadingZeros() {
          return this.high ? Math.clz32(this.high) : Math.clz32(this.low) + 32;
        };
        LongPrototype.clz = LongPrototype.countLeadingZeros;
        LongPrototype.countTrailingZeros = function countTrailingZeros() {
          return this.low ? ctz32(this.low) : ctz32(this.high) + 32;
        };
        LongPrototype.ctz = LongPrototype.countTrailingZeros;
        LongPrototype.and = function and(other) {
          if (!isLong(other)) other = fromValue(other);
          return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
        };
        LongPrototype.or = function or(other) {
          if (!isLong(other)) other = fromValue(other);
          return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
        };
        LongPrototype.xor = function xor(other) {
          if (!isLong(other)) other = fromValue(other);
          return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
        };
        LongPrototype.shiftLeft = function shiftLeft(numBits) {
          if (isLong(numBits)) numBits = numBits.toInt();
          if ((numBits &= 63) === 0) return this;
          else if (numBits < 32)
            return fromBits(
              this.low << numBits,
              (this.high << numBits) | (this.low >>> (32 - numBits)),
              this.unsigned,
            );
          else return fromBits(0, this.low << (numBits - 32), this.unsigned);
        };
        LongPrototype.shl = LongPrototype.shiftLeft;
        LongPrototype.shiftRight = function shiftRight(numBits) {
          if (isLong(numBits)) numBits = numBits.toInt();
          if ((numBits &= 63) === 0) return this;
          else if (numBits < 32)
            return fromBits(
              (this.low >>> numBits) | (this.high << (32 - numBits)),
              this.high >> numBits,
              this.unsigned,
            );
          else return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
        };
        LongPrototype.shr = LongPrototype.shiftRight;
        LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
          if (isLong(numBits)) numBits = numBits.toInt();
          if ((numBits &= 63) === 0) return this;
          if (numBits < 32)
            return fromBits(
              (this.low >>> numBits) | (this.high << (32 - numBits)),
              this.high >>> numBits,
              this.unsigned,
            );
          if (numBits === 32) return fromBits(this.high, 0, this.unsigned);
          return fromBits(this.high >>> (numBits - 32), 0, this.unsigned);
        };
        LongPrototype.shru = LongPrototype.shiftRightUnsigned;
        LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;
        LongPrototype.rotateLeft = function rotateLeft(numBits) {
          var b;
          if (isLong(numBits)) numBits = numBits.toInt();
          if ((numBits &= 63) === 0) return this;
          if (numBits === 32) return fromBits(this.high, this.low, this.unsigned);
          if (numBits < 32) {
            b = 32 - numBits;
            return fromBits(
              (this.low << numBits) | (this.high >>> b),
              (this.high << numBits) | (this.low >>> b),
              this.unsigned,
            );
          }
          numBits -= 32;
          b = 32 - numBits;
          return fromBits(
            (this.high << numBits) | (this.low >>> b),
            (this.low << numBits) | (this.high >>> b),
            this.unsigned,
          );
        };
        LongPrototype.rotl = LongPrototype.rotateLeft;
        LongPrototype.rotateRight = function rotateRight(numBits) {
          var b;
          if (isLong(numBits)) numBits = numBits.toInt();
          if ((numBits &= 63) === 0) return this;
          if (numBits === 32) return fromBits(this.high, this.low, this.unsigned);
          if (numBits < 32) {
            b = 32 - numBits;
            return fromBits(
              (this.high << b) | (this.low >>> numBits),
              (this.low << b) | (this.high >>> numBits),
              this.unsigned,
            );
          }
          numBits -= 32;
          b = 32 - numBits;
          return fromBits(
            (this.low << b) | (this.high >>> numBits),
            (this.high << b) | (this.low >>> numBits),
            this.unsigned,
          );
        };
        LongPrototype.rotr = LongPrototype.rotateRight;
        LongPrototype.toSigned = function toSigned() {
          if (!this.unsigned) return this;
          return fromBits(this.low, this.high, false);
        };
        LongPrototype.toUnsigned = function toUnsigned() {
          if (this.unsigned) return this;
          return fromBits(this.low, this.high, true);
        };
        LongPrototype.toBytes = function toBytes(le) {
          return le ? this.toBytesLE() : this.toBytesBE();
        };
        LongPrototype.toBytesLE = function toBytesLE() {
          var hi = this.high,
            lo = this.low;
          return [
            lo & 255,
            (lo >>> 8) & 255,
            (lo >>> 16) & 255,
            lo >>> 24,
            hi & 255,
            (hi >>> 8) & 255,
            (hi >>> 16) & 255,
            hi >>> 24,
          ];
        };
        LongPrototype.toBytesBE = function toBytesBE() {
          var hi = this.high,
            lo = this.low;
          return [
            hi >>> 24,
            (hi >>> 16) & 255,
            (hi >>> 8) & 255,
            hi & 255,
            lo >>> 24,
            (lo >>> 16) & 255,
            (lo >>> 8) & 255,
            lo & 255,
          ];
        };
        Long.fromBytes = function fromBytes(bytes, unsigned, le) {
          return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
        };
        Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
          return new Long(
            bytes[0] | (bytes[1] << 8) | (bytes[2] << 16) | (bytes[3] << 24),
            bytes[4] | (bytes[5] << 8) | (bytes[6] << 16) | (bytes[7] << 24),
            unsigned,
          );
        };
        Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
          return new Long(
            (bytes[4] << 24) | (bytes[5] << 16) | (bytes[6] << 8) | bytes[7],
            (bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3],
            unsigned,
          );
        };
        if (typeof BigInt === 'function') {
          Long.fromBigInt = function fromBigInt(value, unsigned) {
            return fromBits(
              Number(BigInt.asIntN(32, value)),
              Number(BigInt.asIntN(32, value >> BigInt(32))),
              unsigned,
            );
          };
          Long.fromValue = function fromValueWithBigInt(value, unsigned) {
            if (typeof value === 'bigint') return Long.fromBigInt(value, unsigned);
            return fromValue(value, unsigned);
          };
          LongPrototype.toBigInt = function toBigInt() {
            var lowBigInt = BigInt(this.low >>> 0);
            return (BigInt(this.unsigned ? this.high >>> 0 : this.high) << BigInt(32)) | lowBigInt;
          };
        }
        _exports.default = Long;
      },
    );
  });
  var require_minimal = __commonJSMin((exports) => {
    var util = exports;
    util.asPromise = require_aspromise();
    util.base64 = require_base64();
    util.EventEmitter = require_eventemitter();
    util.float = require_float();
    util.utf8 = require_utf8();
    util.pool = require_pool();
    util.LongBits = require_longbits();
    function isUnsafeProperty(key) {
      return key === '__proto__' || key === 'prototype' || key === 'constructor';
    }
    util.isUnsafeProperty = isUnsafeProperty;
    util.isNode = Boolean(
      typeof global !== 'undefined' &&
      global &&
      global.process &&
      global.process.versions &&
      global.process.versions.node,
    );
    util.global =
      (util.isNode && global) ||
      (typeof window !== 'undefined' && window) ||
      (typeof self !== 'undefined' && self) ||
      (typeof globalThis !== 'undefined' && globalThis) ||
      exports;
    util.emptyArray = Object.freeze ? Object.freeze([]) : [];
    util.emptyObject = Object.freeze ? Object.freeze({}) : {};
    util.isInteger =
      Number.isInteger ||
      function isInteger(value) {
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
      };
    util.isString = function isString(value) {
      return typeof value === 'string' || value instanceof String;
    };
    util.isObject = function isObject(value) {
      return value && typeof value === 'object';
    };
    util.isset = util.isSet = function isSet(obj, prop) {
      var value = obj[prop];
      if (value != null && Object.hasOwnProperty.call(obj, prop))
        return (
          typeof value !== 'object' ||
          (Array.isArray(value) ? value.length : Object.keys(value).length) > 0
        );
      return false;
    };
    util.Buffer = (function () {
      try {
        var Buffer = util.global.Buffer;
        return Buffer.prototype.utf8Write || util.isNode ? Buffer : null;
      } catch (e) {
        return null;
      }
    })();
    util.newBuffer = function newBuffer(sizeOrArray) {
      var Buffer = util.Buffer;
      return typeof sizeOrArray === 'number'
        ? Buffer
          ? Buffer.allocUnsafe(sizeOrArray)
          : new Uint8Array(sizeOrArray)
        : Buffer
          ? Buffer.from(sizeOrArray)
          : new Uint8Array(sizeOrArray);
    };
    util.rawField = function rawField(id, wireType, data) {
      var out = [],
        tag = (id << 3) | wireType;
      tag >>>= 0;
      while (tag > 127) {
        out.push((tag & 127) | 128);
        tag >>>= 7;
      }
      out.push(tag);
      for (var i = 0; i < data.length; ++i) out.push(data[i]);
      return util.newBuffer(out);
    };
    util.Array = Uint8Array;
    util.Long =
      (util.global.dcodeIO && util.global.dcodeIO.Long) ||
      util.global.Long ||
      (function () {
        try {
          var Long = require_umd();
          return Long && Long.isLong ? Long : null;
        } catch (e) {
          return null;
        }
      })();
    util.key2Re = /^(?:true|false|0|1)$/;
    util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    util.key64Re = /^(?:[\x00-\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    util.longToHash = function longToHash(value) {
      return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
    };
    util.longFromHash = function longFromHash(hash, unsigned) {
      var bits = util.LongBits.fromHash(hash);
      if (util.Long) return util.Long.fromBits(bits.lo, bits.hi, unsigned);
      return bits.toNumber(Boolean(unsigned));
    };
    util.longFromKey = function longFromKey(key, unsigned) {
      return util.key64Re.test(key) && !util.key32Re.test(key)
        ? util.longFromHash(key, unsigned)
        : key;
    };
    util.boolFromKey = function boolFromKey(key) {
      return key === 'true' || key === '1';
    };
    function merge(dst) {
      var ifNotSet = typeof arguments[arguments.length - 1] === 'boolean',
        limit = ifNotSet ? arguments.length - 1 : arguments.length;
      ifNotSet = ifNotSet && arguments[arguments.length - 1];
      for (var a = 1; a < limit; ++a) {
        var src = arguments[a];
        if (!src) continue;
        for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
          if (
            !isUnsafeProperty(keys[i]) &&
            (!ifNotSet ||
              !Object.prototype.hasOwnProperty.call(dst, keys[i]) ||
              dst[keys[i]] === void 0)
          )
            dst[keys[i]] = src[keys[i]];
      }
      return dst;
    }
    util.merge = merge;
    util.nestingLimit = 32;
    util.recursionLimit = 100;
    util.makeProp = function makeProp(obj, key, enumerable) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) return;
      Object.defineProperty(obj, key, {
        enumerable: enumerable === void 0 ? true : enumerable,
        configurable: true,
        writable: true,
      });
    };
    util.lcFirst = function lcFirst(str) {
      return str.charAt(0).toLowerCase() + str.substring(1);
    };
    function newError(name) {
      function CustomError(message, properties) {
        if (!(this instanceof CustomError)) return new CustomError(message, properties);
        Object.defineProperty(this, 'message', {
          get: function () {
            return message;
          },
        });
        if (Error.captureStackTrace) Error.captureStackTrace(this, CustomError);
        else Object.defineProperty(this, 'stack', { value: new Error().stack || '' });
        if (properties) merge(this, properties);
      }
      CustomError.prototype = Object.create(Error.prototype, {
        constructor: {
          value: CustomError,
          writable: true,
          enumerable: false,
          configurable: true,
        },
        name: {
          get: function get() {
            return name;
          },
          set: void 0,
          enumerable: false,
          configurable: true,
        },
        toString: {
          value: function value() {
            return this.name + ': ' + this.message;
          },
          writable: true,
          enumerable: false,
          configurable: true,
        },
      });
      return CustomError;
    }
    util.newError = newError;
    util.ProtocolError = newError('ProtocolError');
    util.oneOfGetter = function getOneOf(fieldNames) {
      var fieldMap = {};
      for (var i = 0; i < fieldNames.length; ++i) fieldMap[fieldNames[i]] = 1;
      return function () {
        for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i)
          if (fieldMap[keys[i]] === 1 && this[keys[i]] !== void 0 && this[keys[i]] !== null)
            return keys[i];
      };
    };
    util.oneOfSetter = function setOneOf(fieldNames) {
      return function (name) {
        for (var i = 0; i < fieldNames.length; ++i)
          if (fieldNames[i] !== name) delete this[fieldNames[i]];
      };
    };
    util.toJSONOptions = {
      longs: String,
      enums: String,
      bytes: String,
      json: true,
    };
  });
  var require_writer = __commonJSMin((exports, module) => {
    module.exports = Writer;
    var util = require_minimal();
    var BufferWriter;
    var LongBits = util.LongBits;
    var base64 = util.base64;
    var utf8 = util.utf8;
    function Writer() {
      this.pos = 0;
      this.buf = this.constructor.alloc(Writer.initialBufferSize);
      this.view = null;
      this.states = null;
    }
    Writer.initialBufferSize = 128;
    Object.defineProperty(Writer.prototype, 'len', {
      configurable: true,
      enumerable: true,
      get: function get_len() {
        return this.pos;
      },
    });
    var create = function create() {
      return util.Buffer
        ? function create_buffer_setup() {
            return (Writer.create = function create_buffer() {
              return new BufferWriter();
            })();
          }
        : function create_array() {
            return new Writer();
          };
    };
    Writer.create = create();
    Writer.alloc = function alloc(size) {
      return new Uint8Array(size);
    };
    Writer.alloc = util.pool(Writer.alloc, Uint8Array.prototype.subarray);
    function sizeVarint32(value) {
      return value < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5;
    }
    Writer.prototype._reserve = function _reserve(n) {
      var need = this.pos + n;
      if (need > this.buf.length) {
        var size = this.buf.length << 1;
        if (size < need) size = need;
        var buf = this.constructor.alloc(size);
        buf.set(this.buf.subarray(0, this.pos), 0);
        this.buf = buf;
        this.view = null;
      }
    };
    function writeStringAscii(val, buf, pos) {
      for (var i = 0; i < val.length;) buf[pos++] = val.charCodeAt(i++);
    }
    function writeVarint32(val, buf, pos) {
      while (val > 127) {
        buf[pos++] = (val & 127) | 128;
        val >>>= 7;
      }
      buf[pos] = val;
      return pos + 1;
    }
    Writer.prototype.uint32 = function write_uint32(value) {
      value = value >>> 0;
      this._reserve(5);
      var pos = this.pos;
      this.pos = writeVarint32(value, this.buf, pos);
      return this;
    };
    Writer.prototype.int32 = function write_int32(value) {
      if ((value |= 0) < 0) {
        this._reserve(10);
        writeVarint64(LongBits.fromNumber(value), this.buf, this.pos);
        this.pos += 10;
        return this;
      }
      return this.uint32(value);
    };
    Writer.prototype.sint32 = function write_sint32(value) {
      return this.uint32(((value << 1) ^ (value >> 31)) >>> 0);
    };
    function writeVarint64(val, buf, pos) {
      var lo = val.lo,
        hi = val.hi;
      while (hi) {
        buf[pos++] = (lo & 127) | 128;
        lo = ((lo >>> 7) | (hi << 25)) >>> 0;
        hi >>>= 7;
      }
      while (lo > 127) {
        buf[pos++] = (lo & 127) | 128;
        lo = lo >>> 7;
      }
      buf[pos] = lo;
      return pos + 1;
    }
    Writer.prototype.uint64 = function write_uint64(value) {
      var bits = LongBits.from(value);
      this._reserve(10);
      var pos = this.pos;
      this.pos = writeVarint64(bits, this.buf, pos);
      return this;
    };
    Writer.prototype.int64 = Writer.prototype.uint64;
    Writer.prototype.sint64 = function write_sint64(value) {
      var bits = LongBits.from(value).zzEncode();
      this._reserve(10);
      var pos = this.pos;
      this.pos = writeVarint64(bits, this.buf, pos);
      return this;
    };
    Writer.prototype.bool = function write_bool(value) {
      this._reserve(1);
      this.buf[this.pos++] = value ? 1 : 0;
      return this;
    };
    function writeFixed32(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = (val >>> 8) & 255;
      buf[pos + 2] = (val >>> 16) & 255;
      buf[pos + 3] = val >>> 24;
    }
    Writer.prototype.fixed32 = function write_fixed32(value) {
      this._reserve(4);
      writeFixed32(value >>> 0, this.buf, this.pos);
      this.pos += 4;
      return this;
    };
    Writer.prototype.sfixed32 = Writer.prototype.fixed32;
    Writer.prototype.fixed64 = function write_fixed64(value) {
      var bits = LongBits.from(value);
      this._reserve(8);
      writeFixed32(bits.lo, this.buf, this.pos);
      writeFixed32(bits.hi, this.buf, this.pos + 4);
      this.pos += 8;
      return this;
    };
    Writer.prototype.sfixed64 = Writer.prototype.fixed64;
    Writer.prototype.float = function write_float(value) {
      this._reserve(4);
      util.float.writeFloatLE(value, this.buf, this.pos);
      this.pos += 4;
      return this;
    };
    Writer.prototype.double = function write_double(value) {
      this._reserve(8);
      util.float.writeDoubleLE(value, this.buf, this.pos);
      this.pos += 8;
      return this;
    };
    Writer.prototype.bytes = function write_bytes(value) {
      var len = value.length >>> 0;
      if (!len) {
        this._reserve(1);
        this.buf[this.pos++] = 0;
        return this;
      }
      if (util.isString(value)) {
        var buf = Writer.alloc((len = base64.length(value)));
        base64.decode(value, buf, 0);
        value = buf;
      }
      this.uint32(len);
      this._reserve(len);
      this.buf.set(value, this.pos);
      this.pos += len;
      return this;
    };
    Writer.prototype.raw = function write_raw(value) {
      var len = value.length >>> 0;
      if (!len) return this;
      this._reserve(len);
      this.buf.set(value, this.pos);
      this.pos += len;
      return this;
    };
    Writer.prototype._delim = function _delim(pos, len) {
      var n = sizeVarint32(len);
      if (n > 1) this.buf.copyWithin(pos + n, pos + 1, pos + 1 + len);
      writeVarint32(len, this.buf, pos);
      this.pos = pos + n + len;
      return this;
    };
    Writer.prototype.string = function write_string(value) {
      var n = value.length;
      if (!n) {
        this._reserve(1);
        this.buf[this.pos++] = 0;
        return this;
      }
      if (n < 128) {
        this._reserve(n * 3 + 5);
        var lenPos = this.pos;
        return this._delim(lenPos, utf8.write(value, this.buf, lenPos + 1));
      }
      var len = utf8.length(value);
      this.uint32(len);
      this._reserve(len);
      if (len === value.length) writeStringAscii(value, this.buf, this.pos);
      else utf8.write(value, this.buf, this.pos);
      this.pos += len;
      return this;
    };
    Writer.prototype.uint32s = function write_uint32s(value) {
      var n = value.length;
      this._reserve(n * 5 + 5);
      var buf = this.buf,
        lenPos = this.pos,
        p = lenPos + 1;
      for (var i = 0; i < n; ++i) p = writeVarint32(value[i] >>> 0, buf, p);
      return this._delim(lenPos, p - lenPos - 1);
    };
    Writer.prototype.int32s = function write_int32s(value) {
      var n = value.length;
      this._reserve(n * 10 + 5);
      var buf = this.buf,
        lenPos = this.pos,
        pos = lenPos + 1,
        val;
      for (var i = 0; i < n; ++i)
        if ((val = value[i] | 0) < 0) pos = writeVarint64(LongBits.fromNumber(val), buf, pos);
        else pos = writeVarint32(val, buf, pos);
      return this._delim(lenPos, pos - lenPos - 1);
    };
    Writer.prototype.sint32s = function write_sint32s(value) {
      var n = value.length;
      this._reserve(n * 5 + 5);
      var buf = this.buf,
        lenPos = this.pos,
        pos = lenPos + 1;
      for (var i = 0; i < n; ++i)
        pos = writeVarint32(((value[i] << 1) ^ (value[i] >> 31)) >>> 0, buf, pos);
      return this._delim(lenPos, pos - lenPos - 1);
    };
    Writer.prototype.uint64s = function write_uint64s(value) {
      var n = value.length;
      this._reserve(n * 10 + 5);
      var buf = this.buf,
        lenPos = this.pos,
        pos = lenPos + 1;
      for (var i = 0; i < n; ++i) pos = writeVarint64(LongBits.from(value[i]), buf, pos);
      return this._delim(lenPos, pos - lenPos - 1);
    };
    Writer.prototype.int64s = Writer.prototype.uint64s;
    Writer.prototype.sint64s = function write_sint64s(value) {
      var n = value.length;
      this._reserve(n * 10 + 5);
      var buf = this.buf,
        lenPos = this.pos,
        pos = lenPos + 1;
      for (var i = 0; i < n; ++i) pos = writeVarint64(LongBits.from(value[i]).zzEncode(), buf, pos);
      return this._delim(lenPos, pos - lenPos - 1);
    };
    Writer.prototype.bools = function write_bools(value) {
      var n = value.length;
      this.uint32(n);
      this._reserve(n);
      var buf = this.buf,
        p = this.pos;
      for (var i = 0; i < n; ++i) buf[p++] = value[i] ? 1 : 0;
      this.pos += n;
      return this;
    };
    var VIEW_THRESHOLD_FLOAT = 16;
    var VIEW_THRESHOLD_INT = 128;
    function getLazyView(writer, count, threshold) {
      var view = writer.view;
      if (view || count < threshold) return view;
      var buf = writer.buf;
      return (writer.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength));
    }
    Writer.prototype.fixed32s = function write_fixed32s(value) {
      var n = value.length,
        bytes = n * 4;
      this.uint32(bytes);
      this._reserve(bytes);
      var p = this.pos,
        i,
        dv = getLazyView(this, n, VIEW_THRESHOLD_INT);
      if (dv)
        for (i = 0; i < n; ++i) {
          dv.setUint32(p, value[i] >>> 0, true);
          p += 4;
        }
      else {
        var buf = this.buf;
        for (i = 0; i < n; ++i) {
          writeFixed32(value[i] >>> 0, buf, p);
          p += 4;
        }
      }
      this.pos += bytes;
      return this;
    };
    Writer.prototype.sfixed32s = Writer.prototype.fixed32s;
    Writer.prototype.fixed64s = function write_fixed64s(value) {
      var n = value.length,
        bytes = n * 8;
      this.uint32(bytes);
      this._reserve(bytes);
      var p = this.pos,
        i,
        bits,
        dv = getLazyView(this, n, VIEW_THRESHOLD_INT);
      if (dv)
        for (i = 0; i < n; ++i) {
          bits = LongBits.from(value[i]);
          dv.setUint32(p, bits.lo, true);
          dv.setUint32(p + 4, bits.hi, true);
          p += 8;
        }
      else {
        var buf = this.buf;
        for (i = 0; i < n; ++i) {
          bits = LongBits.from(value[i]);
          writeFixed32(bits.lo, buf, p);
          writeFixed32(bits.hi, buf, p + 4);
          p += 8;
        }
      }
      this.pos += bytes;
      return this;
    };
    Writer.prototype.sfixed64s = Writer.prototype.fixed64s;
    Writer.prototype.floats = function write_floats(value) {
      var n = value.length,
        bytes = n * 4;
      this.uint32(bytes);
      this._reserve(bytes);
      var p = this.pos,
        i,
        dv = getLazyView(this, n, VIEW_THRESHOLD_FLOAT);
      if (dv)
        for (i = 0; i < n; ++i) {
          dv.setFloat32(p, value[i], true);
          p += 4;
        }
      else {
        var buf = this.buf;
        for (i = 0; i < n; ++i) {
          util.float.writeFloatLE(value[i], buf, p);
          p += 4;
        }
      }
      this.pos += bytes;
      return this;
    };
    Writer.prototype.doubles = function write_doubles(value) {
      var n = value.length,
        bytes = n * 8;
      this.uint32(bytes);
      this._reserve(bytes);
      var p = this.pos,
        i,
        dv = getLazyView(this, n, VIEW_THRESHOLD_FLOAT);
      if (dv)
        for (i = 0; i < n; ++i) {
          dv.setFloat64(p, value[i], true);
          p += 8;
        }
      else {
        var buf = this.buf;
        for (i = 0; i < n; ++i) {
          util.float.writeDoubleLE(value[i], buf, p);
          p += 8;
        }
      }
      this.pos += bytes;
      return this;
    };
    Writer.prototype.fork = function fork() {
      this._reserve(1);
      (this.states || (this.states = [])).push(this.pos);
      this.pos += 1;
      return this;
    };
    Writer.prototype.reset = function reset() {
      var states = this.states;
      if (states && states.length) this.pos = states.pop();
      else this.pos = 0;
      return this;
    };
    Writer.prototype.ldelim = function ldelim() {
      var states = this.states,
        len,
        vlen;
      if (states && states.length) {
        var lenPos = states.pop();
        len = this.pos - lenPos - 1;
        vlen = sizeVarint32(len);
        if (vlen > 1) {
          this._reserve(vlen - 1);
          this.buf.copyWithin(lenPos + vlen, lenPos + 1, lenPos + 1 + len);
          this.pos += vlen - 1;
          writeVarint32(len, this.buf, lenPos);
        } else this.buf[lenPos] = len;
      } else {
        len = this.pos;
        vlen = sizeVarint32(len);
        this._reserve(vlen);
        this.buf.copyWithin(vlen, 0, len);
        writeVarint32(len, this.buf, 0);
        this.pos += vlen;
      }
      return this;
    };
    Writer.prototype.finish = function finish(shared) {
      if (shared) return this.buf.subarray(0, this.pos);
      var buf = this.constructor.alloc(this.pos);
      buf.set(this.buf.subarray(0, this.pos), 0);
      return buf;
    };
    Writer.prototype.finishInto = function finishInto(buf, offset) {
      if (offset === void 0) offset = 0;
      buf.set(this.buf.subarray(0, this.pos), offset);
      return buf;
    };
    Writer._configure = function (BufferWriter_) {
      BufferWriter = BufferWriter_;
      Writer.create = create();
      BufferWriter._configure();
    };
  });
  var require_writer_buffer = __commonJSMin((exports, module) => {
    module.exports = BufferWriter;
    var Writer = require_writer();
    BufferWriter.prototype = Object.create(Writer.prototype, {
      constructor: {
        value: BufferWriter,
        writable: true,
        enumerable: false,
        configurable: true,
      },
    });
    var util = require_minimal();
    function BufferWriter() {
      Writer.call(this);
    }
    var writeStringBuffer;
    BufferWriter._configure = function () {
      BufferWriter.alloc = util.Buffer && util.Buffer.allocUnsafe;
      writeStringBuffer =
        util.Buffer && util.Buffer.prototype.utf8Write
          ? function writeStringBuffer_utf8Write(val, buf, pos) {
              return buf.utf8Write(val, pos);
            }
          : function writeStringBuffer_write(val, buf, pos) {
              return buf.write(val, pos);
            };
    };
    BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
      if (util.isString(value)) value = util.Buffer.from(value, 'base64');
      var len = value.length >>> 0;
      this.uint32(len);
      if (len) {
        this._reserve(len);
        this.buf.set(value, this.pos);
        this.pos += len;
      }
      return this;
    };
    BufferWriter.prototype.string = function write_string_buffer(value) {
      var n = value.length;
      if (!n) {
        this._reserve(1);
        this.buf[this.pos++] = 0;
        return this;
      }
      if (n < 128) {
        this._reserve(n * 3 + 5);
        var pos = this.pos,
          buf = this.buf;
        return this._delim(
          pos,
          n < 40 ? util.utf8.write(value, buf, pos + 1) : writeStringBuffer(value, buf, pos + 1),
        );
      }
      var len = util.Buffer.byteLength(value);
      this.uint32(len);
      this._reserve(len);
      writeStringBuffer(value, this.buf, this.pos);
      this.pos += len;
      return this;
    };
    BufferWriter._configure();
  });
  var require_reader = __commonJSMin((exports, module) => {
    module.exports = Reader;
    var util = require_minimal();
    var BufferReader;
    var LongBits = util.LongBits;
    var utf8 = util.utf8;
    function indexOutOfRange(reader, writeLength) {
      return RangeError(
        'index out of range: ' + reader.pos + ' + ' + (writeLength || 1) + ' > ' + reader.len,
      );
    }
    function Reader(buffer) {
      this.buf = buffer;
      this.pos = 0;
      this.len = buffer.length;
      this.view = null;
      this.discardUnknown = Reader.discardUnknown;
    }
    function create_array(buffer) {
      if (Array.isArray(buffer)) buffer = new Uint8Array(buffer);
      if (buffer instanceof Uint8Array) return new Reader(buffer);
      throw Error('illegal buffer');
    }
    var create = function create() {
      return util.Buffer
        ? function create_buffer_setup(buffer) {
            return (Reader.create = function create_buffer(buffer) {
              return util.Buffer.isBuffer(buffer) ? new BufferReader(buffer) : create_array(buffer);
            })(buffer);
          }
        : create_array;
    };
    Reader.create = create();
    Reader.prototype.raw = function read_raw(start, end) {
      return this.buf.subarray(start, end);
    };
    function readVarint32NearEnd(reader) {
      var value = 0;
      for (var i = 0; i < 4; ++i) {
        if (reader.pos >= reader.len) throw indexOutOfRange(reader);
        var b = reader.buf[reader.pos++];
        value = (value | ((b & 127) << (i * 7))) >>> 0;
        if (b < 128) return value;
      }
      throw indexOutOfRange(reader);
    }
    Reader.prototype.uint32 = function read_uint32() {
      if (this.len - this.pos < 5) {
        if (this.pos >= this.len) throw indexOutOfRange(this);
        if (this.buf[this.pos] >= 128) return readVarint32NearEnd(this);
      }
      var buf = this.buf,
        pos = this.pos,
        value = (buf[pos] & 127) >>> 0;
      if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
      }
      value = (value | ((buf[pos] & 127) << 7)) >>> 0;
      if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
      }
      value = (value | ((buf[pos] & 127) << 14)) >>> 0;
      if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
      }
      value = (value | ((buf[pos] & 127) << 21)) >>> 0;
      if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
      }
      value = (value | ((buf[pos] & 15) << 28)) >>> 0;
      if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
      }
      for (var i = 0; i < 5; ++i) {
        if (pos >= this.len) {
          this.pos = pos;
          throw indexOutOfRange(this);
        }
        if (buf[pos++] < 128) {
          this.pos = pos;
          return value;
        }
      }
      this.pos = pos;
      throw Error('invalid varint encoding');
    };
    Reader.prototype.tag = function read_tag() {
      if (this.len - this.pos < 5) {
        if (this.pos >= this.len) throw indexOutOfRange(this);
        if (this.buf[this.pos] >= 128) return readVarint32NearEnd(this);
      }
      var buf = this.buf,
        pos = this.pos,
        value = (buf[pos] & 127) >>> 0;
      if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
      }
      value = (value | ((buf[pos] & 127) << 7)) >>> 0;
      if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
      }
      value = (value | ((buf[pos] & 127) << 14)) >>> 0;
      if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
      }
      value = (value | ((buf[pos] & 127) << 21)) >>> 0;
      if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
      }
      value = (value | ((buf[pos] & 15) << 28)) >>> 0;
      if (buf[pos] < 128 && (buf[pos] & 112) === 0) {
        this.pos = pos + 1;
        return value;
      }
      this.pos = pos + 1;
      throw Error('invalid tag encoding');
    };
    Reader.prototype.int32 = function read_int32() {
      return this.uint32() | 0;
    };
    Reader.prototype.sint32 = function read_sint32() {
      var value = this.uint32();
      return ((value >>> 1) ^ -(value & 1)) | 0;
    };
    function readLongVarint() {
      var bits = new LongBits(0, 0);
      var i = 0;
      if (this.len - this.pos > 4) {
        for (; i < 4; ++i) {
          bits.lo = (bits.lo | ((this.buf[this.pos] & 127) << (i * 7))) >>> 0;
          if (this.buf[this.pos++] < 128) return bits;
        }
        bits.lo = (bits.lo | ((this.buf[this.pos] & 127) << 28)) >>> 0;
        bits.hi = (bits.hi | ((this.buf[this.pos] & 127) >> 4)) >>> 0;
        if (this.buf[this.pos++] < 128) return bits;
        i = 0;
      } else {
        for (; i < 4; ++i) {
          if (this.pos >= this.len) throw indexOutOfRange(this);
          bits.lo = (bits.lo | ((this.buf[this.pos] & 127) << (i * 7))) >>> 0;
          if (this.buf[this.pos++] < 128) return bits;
        }
        throw indexOutOfRange(this);
      }
      if (this.len - this.pos > 4)
        for (; i < 5; ++i) {
          bits.hi = (bits.hi | ((this.buf[this.pos] & 127) << (i * 7 + 3))) >>> 0;
          if (this.buf[this.pos++] < 128) return bits;
        }
      else
        for (; i < 5; ++i) {
          if (this.pos >= this.len) throw indexOutOfRange(this);
          bits.hi = (bits.hi | ((this.buf[this.pos] & 127) << (i * 7 + 3))) >>> 0;
          if (this.buf[this.pos++] < 128) return bits;
        }
      throw Error('invalid varint encoding');
    }
    Reader.prototype.bool = function read_bool() {
      var value = false,
        b;
      for (var i = 0; i < 10; ++i) {
        if (this.pos >= this.len) throw indexOutOfRange(this);
        b = this.buf[this.pos++];
        if (b & 127) value = true;
        if (b < 128) return value;
      }
      throw Error('invalid varint encoding');
    };
    function readFixed32_end(buf, end) {
      return (
        (buf[end - 4] | (buf[end - 3] << 8) | (buf[end - 2] << 16) | (buf[end - 1] << 24)) >>> 0
      );
    }
    Reader.prototype.fixed32 = function read_fixed32() {
      if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, (this.pos += 4));
    };
    Reader.prototype.sfixed32 = function read_sfixed32() {
      if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, (this.pos += 4)) | 0;
    };
    function readFixed64() {
      if (this.pos + 8 > this.len) throw indexOutOfRange(this, 8);
      return new LongBits(
        readFixed32_end(this.buf, (this.pos += 4)),
        readFixed32_end(this.buf, (this.pos += 4)),
      );
    }
    Reader.prototype.float = function read_float() {
      if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
      var value = util.float.readFloatLE(this.buf, this.pos);
      this.pos += 4;
      return value;
    };
    Reader.prototype.double = function read_double() {
      if (this.pos + 8 > this.len) throw indexOutOfRange(this, 4);
      var value = util.float.readDoubleLE(this.buf, this.pos);
      this.pos += 8;
      return value;
    };
    Reader.prototype.uint32s = function read_uint32s(array) {
      if (array === void 0) array = [];
      var end = this.uint32() + this.pos,
        len = this.len,
        buf = this.buf,
        pos = this.pos,
        value;
      if (end > len) throw indexOutOfRange(this, end - this.pos);
      this.len = end;
      while (pos < end) {
        value = buf[pos++];
        if (value < 128) array.push(value);
        else {
          this.pos = pos - 1;
          array.push(this.uint32());
          pos = this.pos;
        }
      }
      this.pos = pos;
      if (pos !== end) throw RangeError('index out of range');
      this.len = len;
      return array;
    };
    Reader.prototype.int32s = function read_int32s(array) {
      if (array === void 0) array = [];
      var end = this.uint32() + this.pos,
        len = this.len,
        buf = this.buf,
        pos = this.pos,
        value;
      if (end > len) throw indexOutOfRange(this, end - this.pos);
      this.len = end;
      while (pos < end) {
        value = buf[pos++];
        if (value < 128) array.push(value);
        else {
          this.pos = pos - 1;
          array.push(this.int32());
          pos = this.pos;
        }
      }
      this.pos = pos;
      if (pos !== end) throw RangeError('index out of range');
      this.len = len;
      return array;
    };
    Reader.prototype.sint32s = function read_sint32s(array) {
      if (array === void 0) array = [];
      var end = this.uint32() + this.pos,
        len = this.len;
      if (end > len) throw indexOutOfRange(this, end - this.pos);
      this.len = end;
      while (this.pos < end) array.push(this.sint32());
      if (this.pos !== end) throw RangeError('index out of range');
      this.len = len;
      return array;
    };
    Reader.prototype.bools = function read_bools(array) {
      if (array === void 0) array = [];
      var end = this.uint32() + this.pos,
        len = this.len,
        buf = this.buf,
        pos = this.pos,
        value;
      if (end > len) throw indexOutOfRange(this, end - this.pos);
      this.len = end;
      while (pos < end) {
        value = buf[pos++];
        if (value < 128) array.push(value !== 0);
        else {
          this.pos = pos - 1;
          array.push(this.bool());
          pos = this.pos;
        }
      }
      this.pos = pos;
      if (pos !== end) throw RangeError('index out of range');
      this.len = len;
      return array;
    };
    var VIEW_THRESHOLD_FLOAT = 8;
    var VIEW_THRESHOLD_INT = 128;
    function getLazyView(reader, count, threshold) {
      var view = reader.view;
      if (view || count < threshold) return view;
      var buf = reader.buf;
      return (reader.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength));
    }
    Reader.prototype.fixed32s = function read_fixed32s(array) {
      if (array === void 0) array = [];
      var len = this.uint32(),
        end = this.pos + len;
      if (end > this.len) throw indexOutOfRange(this, len);
      var count = len >>> 2,
        i = array.length,
        pos = this.pos;
      array.length = i + count;
      var dv = getLazyView(this, count, VIEW_THRESHOLD_INT);
      if (dv) for (var k = 0; k < count; ++k, pos += 4) array[i++] = dv.getUint32(pos, true);
      else {
        var buf = this.buf;
        for (var j = 0; j < count; ++j, pos += 4) array[i++] = readFixed32_end(buf, pos + 4);
      }
      this.pos = pos;
      if (pos !== end) throw indexOutOfRange(this, 4);
      return array;
    };
    Reader.prototype.sfixed32s = function read_sfixed32s(array) {
      if (array === void 0) array = [];
      var len = this.uint32(),
        end = this.pos + len;
      if (end > this.len) throw indexOutOfRange(this, len);
      var count = len >>> 2,
        i = array.length,
        pos = this.pos;
      array.length = i + count;
      var dv = getLazyView(this, count, VIEW_THRESHOLD_INT);
      if (dv) for (var k = 0; k < count; ++k, pos += 4) array[i++] = dv.getInt32(pos, true);
      else {
        var buf = this.buf;
        for (var j = 0; j < count; ++j, pos += 4) array[i++] = readFixed32_end(buf, pos + 4) | 0;
      }
      this.pos = pos;
      if (pos !== end) throw indexOutOfRange(this, 4);
      return array;
    };
    Reader.prototype.floats = function read_floats(array) {
      if (array === void 0) array = [];
      var len = this.uint32(),
        end = this.pos + len;
      if (end > this.len) throw indexOutOfRange(this, len);
      var count = len >>> 2,
        i = array.length,
        pos = this.pos;
      array.length = i + count;
      var dv = getLazyView(this, count, VIEW_THRESHOLD_FLOAT);
      if (dv) for (var k = 0; k < count; ++k, pos += 4) array[i++] = dv.getFloat32(pos, true);
      else {
        var buf = this.buf;
        for (var j = 0; j < count; ++j, pos += 4) array[i++] = util.float.readFloatLE(buf, pos);
      }
      this.pos = pos;
      if (pos !== end) throw indexOutOfRange(this, 4);
      return array;
    };
    Reader.prototype.doubles = function read_doubles(array) {
      if (array === void 0) array = [];
      var len = this.uint32(),
        end = this.pos + len;
      if (end > this.len) throw indexOutOfRange(this, len);
      var count = len >>> 3,
        i = array.length,
        pos = this.pos;
      array.length = i + count;
      var dv = getLazyView(this, count, VIEW_THRESHOLD_FLOAT);
      if (dv) for (var k = 0; k < count; ++k, pos += 8) array[i++] = dv.getFloat64(pos, true);
      else {
        var buf = this.buf;
        for (var j = 0; j < count; ++j, pos += 8) array[i++] = util.float.readDoubleLE(buf, pos);
      }
      this.pos = pos;
      if (pos !== end) throw indexOutOfRange(this, 8);
      return array;
    };
    Reader.prototype.uint64s = function read_uint64s(array) {
      if (array === void 0) array = [];
      var end = this.uint32() + this.pos,
        len = this.len;
      if (end > len) throw indexOutOfRange(this, end - this.pos);
      this.len = end;
      while (this.pos < end) array.push(this.uint64());
      if (this.pos !== end) throw RangeError('index out of range');
      this.len = len;
      return array;
    };
    Reader.prototype.int64s = function read_int64s(array) {
      if (array === void 0) array = [];
      var end = this.uint32() + this.pos,
        len = this.len;
      if (end > len) throw indexOutOfRange(this, end - this.pos);
      this.len = end;
      while (this.pos < end) array.push(this.int64());
      if (this.pos !== end) throw RangeError('index out of range');
      this.len = len;
      return array;
    };
    Reader.prototype.sint64s = function read_sint64s(array) {
      if (array === void 0) array = [];
      var end = this.uint32() + this.pos,
        len = this.len;
      if (end > len) throw indexOutOfRange(this, end - this.pos);
      this.len = end;
      while (this.pos < end) array.push(this.sint64());
      if (this.pos !== end) throw RangeError('index out of range');
      this.len = len;
      return array;
    };
    Reader.prototype.fixed64s = function read_fixed64s(array) {
      if (array === void 0) array = [];
      var len = this.uint32(),
        end = this.pos + len,
        i = array.length;
      if (end > this.len) throw indexOutOfRange(this, len);
      var count = len >>> 3;
      array.length = i + count;
      for (var j = 0; j < count; ++j) array[i++] = this.fixed64();
      if (this.pos !== end) throw indexOutOfRange(this, 8);
      return array;
    };
    Reader.prototype.sfixed64s = function read_sfixed64s(array) {
      if (array === void 0) array = [];
      var len = this.uint32(),
        end = this.pos + len,
        i = array.length;
      if (end > this.len) throw indexOutOfRange(this, len);
      var count = len >>> 3;
      array.length = i + count;
      for (var j = 0; j < count; ++j) array[i++] = this.sfixed64();
      if (this.pos !== end) throw indexOutOfRange(this, 8);
      return array;
    };
    Reader.prototype.bytes = function read_bytes() {
      var length = this.uint32(),
        start = this.pos,
        end = this.pos + length;
      if (end > this.len) throw indexOutOfRange(this, length);
      this.pos = end;
      return this.raw(start, end);
    };
    Reader.prototype.string = function read_string() {
      var length = this.uint32(),
        start = this.pos,
        end = this.pos + length;
      if (end > this.len) throw indexOutOfRange(this, length);
      this.pos = end;
      return utf8.read(this.buf, start, end);
    };
    Reader.prototype.stringVerify = function read_string_verify() {
      var length = this.uint32(),
        start = this.pos,
        end = this.pos + length;
      if (end > this.len) throw indexOutOfRange(this, length);
      this.pos = end;
      return utf8.readStrict(this.buf, start, end);
    };
    Reader.prototype.skip = function skip(length) {
      if (typeof length === 'number') {
        if (this.pos + length > this.len) throw indexOutOfRange(this, length);
        this.pos += length;
      } else
        do if (this.pos >= this.len) throw indexOutOfRange(this);
        while (this.buf[this.pos++] & 128);
      return this;
    };
    Reader.recursionLimit = util.recursionLimit;
    Reader.discardUnknown = true;
    Reader.prototype.skipType = function (wireType, depth, fieldNumber) {
      if (depth === void 0) depth = 0;
      if (depth > Reader.recursionLimit) throw Error('max depth exceeded');
      if (fieldNumber === 0) throw Error('illegal tag: field number 0');
      switch (wireType) {
        case 0:
          this.skip();
          break;
        case 1:
          this.skip(8);
          break;
        case 2:
          this.skip(this.uint32());
          break;
        case 3:
          while (true) {
            var tag = this.tag();
            var nestedField = tag >>> 3;
            wireType = tag & 7;
            if (!nestedField) throw Error('illegal tag: field number 0');
            if (wireType === 4) {
              if (fieldNumber !== void 0 && nestedField !== fieldNumber)
                throw Error('invalid end group tag');
              break;
            }
            this.skipType(wireType, depth + 1, nestedField);
          }
          break;
        case 5:
          this.skip(4);
          break;
        default:
          throw Error('invalid wire type ' + wireType + ' at offset ' + this.pos);
      }
      return this;
    };
    Reader._configure = function (BufferReader_) {
      BufferReader = BufferReader_;
      Reader.create = create();
      BufferReader._configure();
      var fn = util.Long ? 'toLong' : 'toNumber';
      util.merge(Reader.prototype, {
        int64: function read_int64() {
          return readLongVarint.call(this)[fn](false);
        },
        uint64: function read_uint64() {
          return readLongVarint.call(this)[fn](true);
        },
        sint64: function read_sint64() {
          return readLongVarint.call(this).zzDecode()[fn](false);
        },
        fixed64: function read_fixed64() {
          return readFixed64.call(this)[fn](true);
        },
        sfixed64: function read_sfixed64() {
          return readFixed64.call(this)[fn](false);
        },
      });
    };
  });
  var require_reader_buffer = __commonJSMin((exports, module) => {
    module.exports = BufferReader;
    var Reader = require_reader();
    BufferReader.prototype = Object.create(Reader.prototype, {
      constructor: {
        value: BufferReader,
        writable: true,
        enumerable: false,
        configurable: true,
      },
    });
    var util = require_minimal();
    function BufferReader(buffer) {
      Reader.call(this, buffer);
    }
    BufferReader._configure = function () {
      if (util.Buffer) BufferReader.prototype._slice = util.Buffer.prototype.slice;
    };
    BufferReader.prototype.raw = function read_raw_buffer(start, end) {
      return this._slice.call(this.buf, start, end);
    };
    BufferReader.prototype.string = function read_string_buffer() {
      var len = this.uint32(),
        start = this.pos,
        end = this.pos + len;
      if (end > this.len)
        throw RangeError('index out of range: ' + this.pos + ' + ' + len + ' > ' + this.len);
      this.pos = end;
      return this.buf.utf8Slice
        ? this.buf.utf8Slice(start, end)
        : this.buf.toString('utf-8', start, end);
    };
    BufferReader._configure();
  });
  var require_service$1 = __commonJSMin((exports, module) => {
    module.exports = Service;
    var util = require_minimal();
    Service.prototype = Object.create(util.EventEmitter.prototype, {
      constructor: {
        value: Service,
        writable: true,
        enumerable: false,
        configurable: true,
      },
    });
    function Service(rpcImpl, requestDelimited, responseDelimited) {
      if (typeof rpcImpl !== 'function') throw TypeError('rpcImpl must be a function');
      util.EventEmitter.call(this);
      this.rpcImpl = rpcImpl;
      this.requestDelimited = Boolean(requestDelimited);
      this.responseDelimited = Boolean(responseDelimited);
    }
    Service.prototype.rpcCall = function rpcCall(
      method,
      requestCtor,
      responseCtor,
      request,
      callback,
    ) {
      if (!request) throw TypeError('request must be specified');
      var self = this;
      if (!callback)
        return util.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);
      if (!self.rpcImpl) {
        setTimeout(function () {
          callback(Error('already ended'));
        }, 0);
        return;
      }
      try {
        return self.rpcImpl(
          method,
          requestCtor[self.requestDelimited ? 'encodeDelimited' : 'encode'](request).finish(),
          function rpcCallback(err, response) {
            if (err) {
              self.emit('error', err, method);
              return callback(err);
            }
            if (response === null) {
              self.end(true);
              return;
            }
            if (!(response instanceof responseCtor))
              try {
                response =
                  responseCtor[self.responseDelimited ? 'decodeDelimited' : 'decode'](response);
              } catch (err) {
                self.emit('error', err, method);
                return callback(err);
              }
            self.emit('data', response, method);
            return callback(null, response);
          },
        );
      } catch (err) {
        self.emit('error', err, method);
        setTimeout(function () {
          callback(err);
        }, 0);
        return;
      }
    };
    Service.prototype.end = function end(endedByRPC) {
      if (this.rpcImpl) {
        if (!endedByRPC) this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit('end').off();
      }
      return this;
    };
  });
  var require_rpc = __commonJSMin((exports) => {
    var rpc = exports;
    rpc.Service = require_service$1();
  });
  var require_roots = __commonJSMin((exports, module) => {
    module.exports = Object.create(null);
  });
  var require_index_minimal = __commonJSMin((exports) => {
    exports.build = 'minimal';
    exports.Writer = require_writer();
    exports.BufferWriter = require_writer_buffer();
    exports.Reader = require_reader();
    exports.BufferReader = require_reader_buffer();
    exports.util = require_minimal();
    exports.rpc = require_rpc();
    exports.roots = require_roots();
    exports.configure = configure;
    function configure() {
      exports.util.LongBits._configure(exports.util.Long);
      exports.Writer._configure(exports.BufferWriter);
      exports.Reader._configure(exports.BufferReader);
    }
    configure();
  });
  var require_patterns = __commonJSMin((exports) => {
    var patterns = exports;
    patterns.numberRe = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/;
    patterns.typeRefRe = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/;
    patterns.reservedRe =
      /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/;
  });
  var require_codegen = __commonJSMin((exports, module) => {
    module.exports = codegen;
    var reservedRe = require_patterns().reservedRe;
    function codegen(functionParams, functionName) {
      if (typeof functionParams === 'string') {
        functionName = functionParams;
        functionParams = void 0;
      }
      var body = [];
      function Codegen(formatStringOrScope) {
        if (typeof formatStringOrScope !== 'string') {
          var source = toString();
          if (codegen.verbose) console.log('codegen: ' + source);
          source = 'return ' + source;
          if (formatStringOrScope) {
            var scopeKeys = Object.keys(formatStringOrScope),
              scopeParams = new Array(scopeKeys.length + 1),
              scopeValues = new Array(scopeKeys.length),
              scopeOffset = 0;
            while (scopeOffset < scopeKeys.length) {
              scopeParams[scopeOffset] = scopeKeys[scopeOffset];
              scopeValues[scopeOffset] = formatStringOrScope[scopeKeys[scopeOffset++]];
            }
            scopeParams[scopeOffset] = source;
            return Function.apply(null, scopeParams).apply(null, scopeValues);
          }
          return Function(source)();
        }
        var formatParams = new Array(arguments.length - 1),
          formatOffset = 0;
        while (formatOffset < formatParams.length)
          formatParams[formatOffset] = arguments[++formatOffset];
        formatOffset = 0;
        formatStringOrScope = formatStringOrScope.replace(/%([%dfijs])/g, function replace($0, $1) {
          var value = formatParams[formatOffset++];
          switch ($1) {
            case 'd':
            case 'f':
              value = Number(value);
              return Object.is(value, -0) ? '-0' : String(value);
            case 'i':
              return String(Math.floor(value));
            case 'j':
              return JSON.stringify(value);
            case 's':
              return String(value);
          }
          return '%';
        });
        if (formatOffset !== formatParams.length) throw Error('parameter count mismatch');
        body.push(formatStringOrScope);
        return Codegen;
      }
      function toString(functionNameOverride) {
        return (
          'function ' +
          safeFunctionName(functionNameOverride || functionName) +
          '(' +
          ((functionParams && functionParams.join(',')) || '') +
          '){\n  ' +
          body.join('\n  ') +
          '\n}'
        );
      }
      Object.defineProperty(Codegen, 'toString', {
        value: toString,
        writable: true,
        enumerable: true,
        configurable: true,
      });
      return Codegen;
    }
    codegen.verbose = false;
    function safeFunctionName(name) {
      if (!name) return '';
      name = String(name).replace(/[^\w$]/g, '');
      if (!name) return '';
      if (/^\d/.test(name)) name = '_' + name;
      return reservedRe.test(name) ? name + '_' : name;
    }
  });
  var require___vite_browser_external = __commonJSMin((exports, module) => {
    module.exports = {};
  });
  var require_fs = __commonJSMin((exports, module) => {
    var fs = null;
    try {
      fs = require___vite_browser_external();
      if (!fs || !fs.readFile || !fs.readFileSync) fs = null;
    } catch (e) {}
    module.exports = fs;
  });
  var require_fetch = __commonJSMin((exports, module) => {
    module.exports = fetch;
    var asPromise = require_aspromise();
    var fs = require_fs();
    function fetch(filename, options, callback) {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      } else if (!options) options = {};
      if (!callback) return asPromise(fetch, this, filename, options);
      if (!options.xhr && fs && fs.readFile)
        return fs.readFile(filename, function fetchReadFileCallback(err, contents) {
          return err && typeof XMLHttpRequest !== 'undefined'
            ? fetch.xhr(filename, options, callback)
            : err
              ? callback(err)
              : callback(null, options.binary ? contents : contents.toString('utf8'));
        });
      return fetch.xhr(filename, options, callback);
    }
    fetch.xhr = function fetch_xhr(filename, options, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function fetchOnReadyStateChange() {
        if (xhr.readyState !== 4) return void 0;
        if (xhr.status !== 0 && xhr.status !== 200) return callback(Error('status ' + xhr.status));
        if (options.binary) {
          var buffer = xhr.response;
          if (!buffer) {
            buffer = [];
            for (var i = 0; i < xhr.responseText.length; ++i)
              buffer.push(xhr.responseText.charCodeAt(i) & 255);
          }
          return callback(
            null,
            typeof Uint8Array !== 'undefined' ? new Uint8Array(buffer) : buffer,
          );
        }
        return callback(null, xhr.responseText);
      };
      if (options.binary) {
        if ('overrideMimeType' in xhr) xhr.overrideMimeType('text/plain; charset=x-user-defined');
        xhr.responseType = 'arraybuffer';
      }
      xhr.open('GET', filename);
      xhr.send();
    };
  });
  var require_path = __commonJSMin((exports) => {
    var path = exports;
    var urlRe = /^[a-zA-Z][a-zA-Z0-9+.-]+:\/\//;
    function normalizeUrl(path) {
      if (typeof URL === 'undefined' || !urlRe.test(path)) return null;
      try {
        return new URL(path).href;
      } catch (e) {
        return null;
      }
    }
    function resolveUrl(originPath, includePath) {
      if (typeof URL === 'undefined' || !urlRe.test(originPath) || urlRe.test(includePath))
        return null;
      try {
        return new URL(includePath, originPath).href;
      } catch (e) {
        return null;
      }
    }
    var isAbsolute = (path.isAbsolute = function isAbsolute(path) {
      return /^(?:\/|\w+:|\\\\\w+)/.test(path);
    });
    var normalize = (path.normalize = function normalize(path) {
      var normalizedUrl = normalizeUrl(path);
      if (normalizedUrl) return normalizedUrl;
      var firstTwoCharacters = path.substring(0, 2);
      var uncPrefix = '';
      if (firstTwoCharacters === '\\\\') {
        uncPrefix = firstTwoCharacters;
        path = path.substring(2);
      }
      path = path.replace(/\\/g, '/').replace(/\/{2,}/g, '/');
      var parts = path.split('/'),
        absolute = isAbsolute(path),
        prefix = '';
      if (absolute) prefix = parts.shift() + '/';
      for (var i = 0; i < parts.length;)
        if (parts[i] === '..') {
          if (i > 0 && parts[i - 1] !== '..') parts.splice(--i, 2);
          else if (absolute) parts.splice(i, 1);
          else ++i;
        } else if (parts[i] === '.') parts.splice(i, 1);
        else ++i;
      return uncPrefix + prefix + parts.join('/');
    });
    path.resolve = function resolve(originPath, includePath, alreadyNormalized) {
      var resolvedUrl = resolveUrl(originPath, includePath);
      if (resolvedUrl) return resolvedUrl;
      if (!alreadyNormalized) includePath = normalize(includePath);
      if (isAbsolute(includePath)) return includePath;
      if (!alreadyNormalized) originPath = normalize(originPath);
      return (originPath = originPath.replace(/(?:\/|^)[^/]+$/, '')).length
        ? normalize(originPath + '/' + includePath)
        : includePath;
    };
  });
  var require_namespace = __commonJSMin((exports, module) => {
    module.exports = Namespace;
    var ReflectionObject = require_object();
    Namespace.prototype = Object.create(ReflectionObject.prototype, {
      constructor: {
        value: Namespace,
        writable: true,
        enumerable: false,
        configurable: true,
      },
    });
    Namespace.className = 'Namespace';
    var Field = require_field();
    var util = require_util();
    var OneOf = require_oneof();
    var Type;
    var Service;
    var Enum;
    Namespace.fromJSON = function fromJSON(name, json, depth) {
      if (depth === void 0) depth = 0;
      if (depth > util.recursionLimit) throw Error('max depth exceeded');
      return new Namespace(name, json.options).addJSON(json.nested, depth);
    };
    function arrayToJSON(array, toJSONOptions) {
      if (!(array && array.length)) return void 0;
      var obj = {};
      for (var i = 0; i < array.length; ++i) obj[array[i].name] = array[i].toJSON(toJSONOptions);
      return obj;
    }
    Namespace.arrayToJSON = arrayToJSON;
    Namespace.isReservedId = function isReservedId(reserved, id) {
      if (reserved) {
        for (var i = 0; i < reserved.length; ++i)
          if (typeof reserved[i] !== 'string' && reserved[i][0] <= id && reserved[i][1] >= id)
            return true;
      }
      return false;
    };
    Namespace.isReservedName = function isReservedName(reserved, name) {
      if (reserved) {
        for (var i = 0; i < reserved.length; ++i) if (reserved[i] === name) return true;
      }
      return false;
    };
    function Namespace(name, options) {
      ReflectionObject.call(this, name, options);
      this.nested = void 0;
      this._nestedArray = null;
      this._lookupCache = Object.create(null);
      this._needsRecursiveFeatureResolution = true;
      this._needsRecursiveResolve = true;
    }
    function clearCache(namespace) {
      namespace._nestedArray = null;
      namespace._lookupCache = Object.create(null);
      var parent = namespace;
      while ((parent = parent.parent)) parent._lookupCache = Object.create(null);
      return namespace;
    }
    Object.defineProperty(Namespace.prototype, 'nestedArray', {
      get: function () {
        return this._nestedArray || (this._nestedArray = util.toArray(this.nested));
      },
    });
    Namespace.prototype.toJSON = function toJSON(toJSONOptions) {
      return util.toObject([
        'options',
        this.options,
        'nested',
        arrayToJSON(this.nestedArray, toJSONOptions),
      ]);
    };
    Namespace.prototype.addJSON = function addJSON(nestedJson, depth) {
      if (depth === void 0) depth = 0;
      if (depth > util.recursionLimit) throw Error('max depth exceeded');
      var ns = this;
      if (nestedJson)
        for (var names = Object.keys(nestedJson), i = 0, nested; i < names.length; ++i) {
          nested = nestedJson[names[i]];
          ns.add(
            (nested.fields !== void 0
              ? Type.fromJSON
              : nested.values !== void 0
                ? Enum.fromJSON
                : nested.methods !== void 0
                  ? Service.fromJSON
                  : nested.id !== void 0
                    ? Field.fromJSON
                    : Namespace.fromJSON)(names[i], nested, depth + 1),
          );
        }
      return this;
    };
    Namespace.prototype.get = function get(name) {
      return this.nested && Object.prototype.hasOwnProperty.call(this.nested, name)
        ? this.nested[name]
        : null;
    };
    Namespace.prototype.getEnum = function getEnum(name) {
      if (
        this.nested &&
        Object.prototype.hasOwnProperty.call(this.nested, name) &&
        this.nested[name] instanceof Enum
      )
        return this.nested[name].values;
      throw Error('no such enum: ' + name);
    };
    Namespace.prototype.add = function add(object) {
      if (!(
        (object instanceof Field && object.extend !== void 0) ||
        object instanceof Type ||
        object instanceof OneOf ||
        object instanceof Enum ||
        object instanceof Service ||
        object instanceof Namespace
      ))
        throw TypeError('object must be a valid nested object');
      if (object.name === '__proto__') return this;
      if (!this.nested) this.nested = {};
      else {
        var prev = this.get(object.name);
        if (prev) {
          if (
            prev instanceof Namespace &&
            object instanceof Namespace &&
            !(prev instanceof Type || prev instanceof Service)
          ) {
            var nested = prev.nestedArray;
            for (var i = 0; i < nested.length; ++i) object.add(nested[i]);
            this.remove(prev);
            if (!this.nested) this.nested = {};
            object.setOptions(prev.options, true);
          } else throw Error("duplicate name '" + object.name + "' in " + this);
        }
      }
      this.nested[object.name] = object;
      if (!(
        this instanceof Type ||
        this instanceof Service ||
        this instanceof Enum ||
        this instanceof Field
      )) {
        if (!object._edition) object._edition = object._defaultEdition;
      }
      this._needsRecursiveFeatureResolution = true;
      this._needsRecursiveResolve = true;
      var parent = this;
      while ((parent = parent.parent)) {
        parent._needsRecursiveFeatureResolution = true;
        parent._needsRecursiveResolve = true;
      }
      object.onAdd(this);
      return clearCache(this);
    };
    Namespace.prototype.remove = function remove(object) {
      if (!(object instanceof ReflectionObject))
        throw TypeError('object must be a ReflectionObject');
      if (object.parent !== this) throw Error(object + ' is not a member of ' + this);
      if (!util.remove(this.nested, object, object.name))
        throw Error(object + ' is not a member of ' + this);
      if (!Object.keys(this.nested).length) this.nested = void 0;
      object.onRemove(this);
      return clearCache(this);
    };
    Namespace.prototype.define = function define(path, json) {
      if (util.isString(path)) path = path.split('.');
      else if (!Array.isArray(path)) throw TypeError('illegal path');
      if (path && path.length && path[0] === '') throw Error('path must be relative');
      if (path.length > util.recursionLimit) throw Error('max depth exceeded');
      var ptr = this;
      while (path.length > 0) {
        var part = path.shift();
        if (ptr.nested && ptr.nested[part]) {
          ptr = ptr.nested[part];
          if (!(ptr instanceof Namespace)) throw Error('path conflicts with non-namespace objects');
        } else ptr.add((ptr = new Namespace(part)));
      }
      if (json) ptr.addJSON(json);
      return ptr;
    };
    Namespace.prototype.resolveAll = function resolveAll() {
      if (!this._needsRecursiveResolve) return this;
      if (this._needsRecursiveFeatureResolution) this._resolveFeaturesRecursive(this._edition);
      var nested = this.nestedArray,
        i = 0;
      this.resolve();
      while (i < nested.length)
        if (nested[i] instanceof Namespace) nested[i++].resolveAll();
        else nested[i++].resolve();
      this._needsRecursiveResolve = false;
      return this;
    };
    Namespace.prototype._resolveFeaturesRecursive = function _resolveFeaturesRecursive(edition) {
      if (!this._needsRecursiveFeatureResolution) return this;
      this._needsRecursiveFeatureResolution = false;
      edition = this._edition || edition;
      ReflectionObject.prototype._resolveFeaturesRecursive.call(this, edition);
      this.nestedArray.forEach((nested) => {
        nested._resolveFeaturesRecursive(edition);
      });
      return this;
    };
    Namespace.prototype.lookup = function lookup(path, filterTypes, parentAlreadyChecked) {
      if (typeof filterTypes === 'boolean') {
        parentAlreadyChecked = filterTypes;
        filterTypes = void 0;
      } else if (filterTypes && !Array.isArray(filterTypes)) filterTypes = [filterTypes];
      if (util.isString(path) && path.length) {
        if (path === '.') return this.root;
        path = path.split('.');
      } else if (!path.length) return this;
      var flatPath = path.join('.');
      if (path[0] === '') return this.root.lookup(path.slice(1), filterTypes);
      var found = this._lookupImpl(path, flatPath);
      if (found && (!filterTypes || filterTypes.indexOf(found.constructor) > -1)) return found;
      found = this.root._fullyQualifiedObjects && this.root._fullyQualifiedObjects['.' + flatPath];
      if (found && (!filterTypes || filterTypes.indexOf(found.constructor) > -1)) return found;
      if (parentAlreadyChecked) return null;
      var current = this;
      while (current.parent) {
        found = current.parent._lookupImpl(path, flatPath);
        if (found && (!filterTypes || filterTypes.indexOf(found.constructor) > -1)) return found;
        current = current.parent;
      }
      return null;
    };
    Namespace.prototype._lookupImpl = function lookup(path, flatPath) {
      if (Object.prototype.hasOwnProperty.call(this._lookupCache, flatPath))
        return this._lookupCache[flatPath];
      var found = this.get(path[0]);
      var exact = null;
      if (found) {
        if (path.length === 1) exact = found;
        else if (found instanceof Namespace) {
          path = path.slice(1);
          exact = found._lookupImpl(path, path.join('.'));
        }
      } else
        for (var i = 0; i < this.nestedArray.length; ++i)
          if (
            this._nestedArray[i] instanceof Namespace &&
            (found = this._nestedArray[i]._lookupImpl(path, flatPath))
          ) {
            exact = found;
            break;
          }
      this._lookupCache[flatPath] = exact;
      return exact;
    };
    Namespace.prototype.lookupType = function lookupType(path) {
      var found = this.lookup(path, [Type]);
      if (!found) throw Error('no such type: ' + path);
      return found;
    };
    Namespace.prototype.lookupEnum = function lookupEnum(path) {
      var found = this.lookup(path, [Enum]);
      if (!found) throw Error("no such Enum '" + path + "' in " + this);
      return found;
    };
    Namespace.prototype.lookupTypeOrEnum = function lookupTypeOrEnum(path) {
      var found = this.lookup(path, [Type, Enum]);
      if (!found) throw Error("no such Type or Enum '" + path + "' in " + this);
      return found;
    };
    Namespace.prototype.lookupService = function lookupService(path) {
      var found = this.lookup(path, [Service]);
      if (!found) throw Error("no such Service '" + path + "' in " + this);
      return found;
    };
    Namespace._configure = function (Type_, Service_, Enum_) {
      Type = Type_;
      Service = Service_;
      Enum = Enum_;
    };
  });
  var require_mapfield = __commonJSMin((exports, module) => {
    module.exports = MapField;
    var Field = require_field();
    MapField.prototype = Object.create(Field.prototype, {
      constructor: {
        value: MapField,
        writable: true,
        enumerable: false,
        configurable: true,
      },
    });
    MapField.className = 'MapField';
    var types = require_types();
    var util = require_util();
    function MapField(name, id, keyType, type, options, comment) {
      Field.call(this, name, id, type, void 0, void 0, options, comment);
      if (!util.isString(keyType)) throw TypeError('keyType must be a string');
      this.keyType = keyType;
      this.resolvedKeyType = null;
      this.map = true;
    }
    MapField.fromJSON = function fromJSON(name, json) {
      var field = new MapField(name, json.id, json.keyType, json.type, json.options, json.comment);
      if (json.protoName) field.protoName = json.protoName;
      if (json.jsonName !== void 0) field.jsonName = json.jsonName;
      else if (json.options && json.options.json_name !== void 0)
        field.jsonName = json.options.json_name;
      return field;
    };
    MapField.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        'keyType',
        this.keyType,
        'type',
        this.type,
        'id',
        this.id,
        'extend',
        this.extend,
        'protoName',
        this.protoName !== this.name ? this.protoName : void 0,
        'jsonName',
        this.jsonName !== util.jsonName(this.protoName || this.name) ? this.jsonName : void 0,
        'options',
        this.options,
        'comment',
        keepComments ? this.comment : void 0,
      ]);
    };
    MapField.prototype.resolve = function resolve() {
      if (this.resolved) return this;
      if (types.mapKey[this.keyType] === void 0) throw Error('invalid key type: ' + this.keyType);
      return Field.prototype.resolve.call(this);
    };
    MapField.d = function decorateMapField(fieldId, fieldKeyType, fieldValueType) {
      if (typeof fieldValueType === 'function')
        fieldValueType = util.decorateType(fieldValueType).name;
      else if (fieldValueType && typeof fieldValueType === 'object')
        fieldValueType = util.decorateEnum(fieldValueType).name;
      return function mapFieldDecorator(prototype, fieldName) {
        util
          .decorateType(prototype.constructor)
          .add(new MapField(fieldName, fieldId, fieldKeyType, fieldValueType));
      };
    };
  });
  var require_method = __commonJSMin((exports, module) => {
    module.exports = Method;
    var ReflectionObject = require_object();
    Method.prototype = Object.create(ReflectionObject.prototype, {
      constructor: {
        value: Method,
        writable: true,
        enumerable: false,
        configurable: true,
      },
    });
    Method.className = 'Method';
    var util = require_util();
    function Method(
      name,
      type,
      requestType,
      responseType,
      requestStream,
      responseStream,
      options,
      comment,
      parsedOptions,
    ) {
      if (util.isObject(requestStream)) {
        options = requestStream;
        requestStream = responseStream = void 0;
      } else if (util.isObject(responseStream)) {
        options = responseStream;
        responseStream = void 0;
      }
      if (!(type === void 0 || util.isString(type))) throw TypeError('type must be a string');
      if (!util.isString(requestType)) throw TypeError('requestType must be a string');
      if (!util.isString(responseType)) throw TypeError('responseType must be a string');
      ReflectionObject.call(this, name, options);
      this.type = type || 'rpc';
      this.requestType = requestType;
      this.requestStream = requestStream ? true : void 0;
      this.responseType = responseType;
      this.responseStream = responseStream ? true : void 0;
      this.path = '/' + this.name;
      this.resolvedRequestType = null;
      this.resolvedResponseType = null;
      this.comment = comment;
      this.parsedOptions = parsedOptions;
    }
    Method.fromJSON = function fromJSON(name, json) {
      return new Method(
        name,
        json.type,
        json.requestType,
        json.responseType,
        json.requestStream,
        json.responseStream,
        json.options,
        json.comment,
        json.parsedOptions,
      );
    };
    Method.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        'type',
        (this.type !== 'rpc' && this.type) || void 0,
        'requestType',
        this.requestType,
        'requestStream',
        this.requestStream,
        'responseType',
        this.responseType,
        'responseStream',
        this.responseStream,
        'options',
        this.options,
        'comment',
        keepComments ? this.comment : void 0,
        'parsedOptions',
        this.parsedOptions,
      ]);
    };
    Method.prototype.resolve = function resolve() {
      if (this.resolved) return this;
      if (this.parent) {
        var serviceName = this.parent.fullName;
        if (serviceName.charAt(0) === '.') serviceName = serviceName.substring(1);
        this.path = '/' + serviceName + '/' + this.name;
      } else this.path = '/' + this.name;
      this.resolvedRequestType = this.parent.lookupType(this.requestType);
      this.resolvedResponseType = this.parent.lookupType(this.responseType);
      return ReflectionObject.prototype.resolve.call(this);
    };
  });
  var require_service = __commonJSMin((exports, module) => {
    module.exports = Service;
    var Namespace = require_namespace();
    Service.prototype = Object.create(Namespace.prototype, {
      constructor: {
        value: Service,
        writable: true,
        enumerable: false,
        configurable: true,
      },
    });
    Service.className = 'Service';
    var Method = require_method();
    var util = require_util();
    var rpc = require_rpc();
    function Service(name, options) {
      Namespace.call(this, name, options);
      this.methods = {};
      this._methodsArray = null;
    }
    Service.fromJSON = function fromJSON(name, json, depth) {
      if (depth === void 0) depth = 0;
      if (depth > util.recursionLimit) throw Error('max depth exceeded');
      var service = new Service(name, json.options);
      if (json.methods)
        for (var names = Object.keys(json.methods), i = 0; i < names.length; ++i)
          service.add(Method.fromJSON(names[i], json.methods[names[i]]));
      if (json.nested) service.addJSON(json.nested, depth);
      if (json.edition) service._edition = json.edition;
      service.comment = json.comment;
      service._defaultEdition = 'proto3';
      return service;
    };
    Service.prototype.toJSON = function toJSON(toJSONOptions) {
      var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        'edition',
        this._editionToJSON(),
        'options',
        (inherited && inherited.options) || void 0,
        'methods',
        Namespace.arrayToJSON(this.methodsArray, toJSONOptions) || {},
        'nested',
        (inherited && inherited.nested) || void 0,
        'comment',
        keepComments ? this.comment : void 0,
      ]);
    };
    Object.defineProperty(Service.prototype, 'methodsArray', {
      get: function () {
        return this._methodsArray || (this._methodsArray = util.toArray(this.methods));
      },
    });
    function clearCache(service) {
      service._methodsArray = null;
      return service;
    }
    Service.prototype.get = function get(name) {
      return Object.prototype.hasOwnProperty.call(this.methods, name)
        ? this.methods[name]
        : Namespace.prototype.get.call(this, name);
    };
    Service.prototype.resolveAll = function resolveAll() {
      if (!this._needsRecursiveResolve) return this;
      Namespace.prototype.resolve.call(this);
      var methods = this.methodsArray;
      for (var i = 0; i < methods.length; ++i) methods[i].resolve();
      return this;
    };
    Service.prototype._resolveFeaturesRecursive = function _resolveFeaturesRecursive(edition) {
      if (!this._needsRecursiveFeatureResolution) return this;
      edition = this._edition || edition;
      Namespace.prototype._resolveFeaturesRecursive.call(this, edition);
      this.methodsArray.forEach((method) => {
        method._resolveFeaturesRecursive(edition);
      });
      return this;
    };
    Service.prototype.add = function add(object) {
      if (this.get(object.name)) throw Error("duplicate name '" + object.name + "' in " + this);
      if (object instanceof Method) {
        if (object.name === '__proto__') return this;
        this.methods[object.name] = object;
        object.parent = this;
        return clearCache(this);
      }
      return Namespace.prototype.add.call(this, object);
    };
    Service.prototype.remove = function remove(object) {
      if (object instanceof Method) {
        if (this.methods[object.name] !== object)
          throw Error(object + ' is not a member of ' + this);
        delete this.methods[object.name];
        object.parent = null;
        return clearCache(this);
      }
      return Namespace.prototype.remove.call(this, object);
    };
    Service.prototype.create = function create(rpcImpl, requestDelimited, responseDelimited) {
      var rpcService = new rpc.Service(rpcImpl, requestDelimited, responseDelimited);
      for (var i = 0, method; i < this.methodsArray.length; ++i) {
        var methodName = util
          .lcFirst((method = this._methodsArray[i]).resolve().name)
          .replace(/[^$\w_]/g, '');
        rpcService[methodName] = (function (method, requestType, responseType) {
          return function rpcMethod(request, callback) {
            return rpc.Service.prototype.rpcCall.call(
              this,
              method,
              requestType,
              responseType,
              request,
              callback,
            );
          };
        })(method, method.resolvedRequestType.ctor, method.resolvedResponseType.ctor);
      }
      return rpcService;
    };
  });
  var require_message = __commonJSMin((exports, module) => {
    module.exports = Message;
    var util = require_minimal();
    function Message(properties) {
      if (properties) {
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null && keys[i] !== '__proto__')
            this[keys[i]] = properties[keys[i]];
      }
    }
    Message.create = function create(properties) {
      return this.$type.create(properties);
    };
    Message.encode = function encode(message, writer) {
      return this.$type.encode(message, writer);
    };
    Message.encodeDelimited = function encodeDelimited(message, writer) {
      return this.$type.encodeDelimited(message, writer);
    };
    Message.decode = function decode(reader) {
      return this.$type.decode(reader);
    };
    Message.decodeDelimited = function decodeDelimited(reader) {
      return this.$type.decodeDelimited(reader);
    };
    Message.verify = function verify(message) {
      return this.$type.verify(message);
    };
    Message.fromObject = function fromObject(object) {
      return this.$type.fromObject(object);
    };
    Message.toObject = function toObject(message, options) {
      return this.$type.toObject(message, options);
    };
    Message.prototype.toJSON = function toJSON() {
      return this.$type.toObject(this, util.toJSONOptions);
    };
  });
  var require_decoder = __commonJSMin((exports, module) => {
    module.exports = decoder;
    var Enum = require_enum();
    var types = require_types();
    var util = require_util();
    function missing(field) {
      return "missing required '" + field.name + "'";
    }
    function stringMethod(field) {
      return field._features.utf8_validation === 'VERIFY' ? 'stringVerify' : 'string';
    }
    function genPreserveUnknown(gen, ref) {
      return gen('if(!r.discardUnknown){')('util.makeProp(m,"$unknowns",false);')(
        '(m.$unknowns||(m.$unknowns=[])).push(%s)',
        ref,
      )('}');
    }
    function decoder(mtype) {
      var hasMapField = false,
        needsValueVar = false,
        i = 0;
      for (; i < mtype.fieldsArray.length; ++i) {
        var pfield = mtype._fieldsArray[i];
        if (pfield.map) hasMapField = true;
        if (
          pfield.resolvedType instanceof Enum ||
          (!pfield.repeated && !pfield.map && !pfield.hasPresence)
        )
          needsValueVar = true;
      }
      var gen = util.codegen(['r', 'l', 'z', 'q', 'g'])('if(!(r instanceof Reader))')(
        'r=Reader.create(r)',
      )('if(q===undefined)q=0')('if(q>Reader.recursionLimit)')('throw Error("max depth exceeded")')(
        'var c,m' + (hasMapField ? ',k,v' : needsValueVar ? ',v' : ''),
      )('if(l===undefined)')('c=r.len')('else{')('c=r.pos+l')('if(c>r.len)')(
        'throw RangeError("index out of range")',
      )('l=r.len')('r.len=c')('}')('m=g||new C')('while(r.pos<c){')('var s=r.pos')('var t=r.tag()')(
        'if(t===z){',
      )('z=undefined')('break')('}');
      if (mtype.fieldsArray.length) gen('var u=t&7')('switch(t>>>=3){');
      for (i = 0; i < mtype.fieldsArray.length; ++i) {
        var field = mtype._fieldsArray[i].resolve(),
          type = field.resolvedType instanceof Enum ? 'int32' : field.type,
          ref = 'm' + util.safeProp(field.name),
          closed =
            field.resolvedType instanceof Enum &&
            field.resolvedType._features.enum_type === 'CLOSED';
        if (field.map) {
          gen('case %i:{', field.id)('if(u!==2)')('break');
          if (!closed) gen('if(%s===util.emptyObject)', ref)('%s={}', ref);
          gen('var c2=r.uint32()+r.pos')('if(c2>r.len)')('throw RangeError("index out of range")')(
            'r.len=c2',
          );
          if (types.defaults[field.keyType] !== void 0) gen('k=%j', types.defaults[field.keyType]);
          else gen('k=null');
          if (types.long[type] !== void 0)
            gen(
              'v=util.Long?util.Long.fromNumber(0,%j):0',
              type === 'uint64' || type === 'fixed64',
            );
          else if (types.defaults[type] !== void 0) gen('v=%j', types.defaults[type]);
          else gen('v=null');
          gen('while(r.pos<c2){')('var t2=r.tag()')('u=t2&7')('switch(t2>>>=3){')('case 1:')(
            'if(u!==%i)',
            types.mapKey[field.keyType],
          )('break')(
            'k=r.%s()',
            field.keyType === 'string' ? stringMethod(field) : field.keyType,
          )('continue')('case 2:')(
            'if(u!==%i)',
            types.basic[type] === void 0 ? 2 : types.basic[type],
          )('break');
          if (types.basic[type] === void 0)
            gen('v=types[%i].decode(r,r.uint32(),undefined,q+1,v)', i);
          else gen('v=r.%s()', type === 'string' ? stringMethod(field) : type);
          gen('continue')('}')('r.skipType(u,q,t2)')('}');
          gen('if(r.pos!==c2)')('throw RangeError("index out of range")')('r.len=c');
          if (closed) {
            gen('if(types[%i].valuesById[v]===undefined){', i);
            genPreserveUnknown(gen, 'r.raw(s,r.pos)')('continue')('}')(
              'if(%s===util.emptyObject)',
              ref,
            )('%s={}', ref);
          }
          var val = types.basic[type] === void 0 ? 'v||new types[' + i + '].ctor' : 'v';
          if (types.long[field.keyType] !== void 0)
            gen('%s[typeof k==="object"?util.longToHash(k):k]=%s', ref, val);
          else {
            if (field.keyType === 'string') gen('if(k==="__proto__")')('util.makeProp(%s,k)', ref);
            gen('%s[k]=%s', ref, val);
          }
        } else if (field.repeated) {
          gen('case %i:', field.id)('{');
          if (types.packed[type] !== void 0) {
            gen('if(u===2){');
            if (closed) {
              gen('var c2=r.uint32()+r.pos')('if(c2>r.len)')(
                'throw RangeError("index out of range")',
              )('r.len=c2')('while(r.pos<c2){')('s=r.pos')('v=r.%s()', type)(
                'if(types[%i].valuesById[v]!==undefined){',
                i,
              )(
                'if(!(%s&&%s.length))',
                ref,
                ref,
              )('%s=[]', ref)(
                '%s.push(v)',
                ref,
              )('}else');
              genPreserveUnknown(gen, 'util.rawField(' + field.id + ',0,r.raw(s,r.pos))')('}');
              gen('if(r.pos!==c2)')('throw RangeError("index out of range")')('r.len=c');
            } else gen('if(!(%s&&%s.length))', ref, ref)('%s=[]', ref)('r.%ss(%s)', type, ref);
            gen('continue')('}');
          }
          gen(
            'if(u!==%i)',
            types.basic[type] === void 0 ? (field.delimited ? 3 : 2) : types.basic[type],
          )('break');
          if (!closed) gen('if(!(%s&&%s.length))', ref, ref)('%s=[]', ref);
          if (types.basic[type] === void 0) {
            if (field.delimited)
              gen('%s.push(types[%i].decode(r,undefined,%i,q+1))', ref, i, field.id * 8 + 4);
            else gen('%s.push(types[%i].decode(r,r.uint32(),undefined,q+1))', ref, i);
          } else if (closed) {
            gen('v=r.%s()', type)('if(types[%i].valuesById[v]!==undefined){', i)(
              'if(!(%s&&%s.length))',
              ref,
              ref,
            )('%s=[]', ref)(
              '%s.push(v)',
              ref,
            )('}else');
            genPreserveUnknown(gen, 'r.raw(s,r.pos)');
          } else gen('%s.push(r.%s())', ref, type === 'string' ? stringMethod(field) : type);
        } else if (types.basic[type] === void 0) {
          gen('case %i:{', field.id)('if(u!==%i)', field.delimited ? 3 : 2)('break');
          if (field.delimited)
            gen('%s=types[%i].decode(r,undefined,%i,q+1,%s)', ref, i, field.id * 8 + 4, ref);
          else gen('%s=types[%i].decode(r,r.uint32(),undefined,q+1,%s)', ref, i, ref);
        } else if (field.hasPresence) {
          gen('case %i:{', field.id)('if(u!==%i)', types.basic[type])('break');
          if (closed) {
            gen('v=r.%s()', type)('if(types[%i].valuesById[v]!==undefined){', i)('%s=v', ref);
            if (field.partOf) gen('m%s=%j', util.safeProp(field.partOf.name), field.name);
            gen('}else');
            genPreserveUnknown(gen, 'r.raw(s,r.pos)');
          } else gen('%s=r.%s()', ref, type === 'string' ? stringMethod(field) : type);
        } else {
          gen('case %i:{', field.id)('if(u!==%i)', types.basic[type])('break');
          if (closed) {
            gen('v=r.%s()', type)('if(types[%i].valuesById[v]!==undefined){', i)(
              'if(v!==%j)',
              field.typeDefault,
            )(
              '%s=v',
              ref,
            )('else')(
              'delete %s',
              ref,
            )('}else{');
            genPreserveUnknown(gen, 'r.raw(s,r.pos)')('}');
          } else {
            if (field.resolvedType instanceof Enum && field.typeDefault !== 0)
              gen('if((v=r.%s())!==%j)', type, field.typeDefault);
            else if (type === 'string') gen('if((v=r.%s()).length)', stringMethod(field));
            else if (type === 'bytes') gen('if((v=r.%s()).length)', type);
            else if (types.long[type] !== void 0)
              gen('if(typeof(v=r.%s())==="object"?v.low||v.high:v!==0)', type);
            else if (type === 'double' || type === 'float') gen('if(!Object.is(v=r.%s(),0))', type);
            else gen('if(v=r.%s())', type);
            gen('%s=v', ref)('else')('delete %s', ref);
          }
        }
        if (field.partOf && !closed) gen('m%s=%j', util.safeProp(field.partOf.name), field.name);
        gen('continue')('}');
      }
      if (i) gen('}');
      gen('r.skipType(%s,q,t)', i ? 'u' : 't&7');
      genPreserveUnknown(gen, 'r.raw(s,r.pos)')('}')('if(l!==undefined){')('if(r.pos!==c)')(
        'throw RangeError("index out of range")',
      )('r.len=l')('}')('if(z!==undefined)')('throw Error("missing end group")');
      for (i = 0; i < mtype._fieldsArray.length; ++i) {
        var rfield = mtype._fieldsArray[i];
        if (rfield.required)
          gen('if(!Object.hasOwnProperty.call(m,%j))', rfield.name)(
            'throw util.ProtocolError(%j,{instance:m})',
            missing(rfield),
          );
      }
      return gen('return m');
    }
  });
  var require_verifier = __commonJSMin((exports, module) => {
    module.exports = verifier;
    var Enum = require_enum();
    var util = require_util();
    function invalid(field, expected) {
      return (
        field.name +
        ': ' +
        expected +
        (field.repeated && expected !== 'array'
          ? '[]'
          : field.map && expected !== 'object'
            ? '{k:' + field.keyType + '}'
            : '') +
        ' expected'
      );
    }
    function genVerifyValue(gen, field, fieldIndex, ref) {
      var resolvedType = field.resolvedType;
      if (resolvedType) {
        if (resolvedType instanceof Enum) {
          if (resolvedType._features.enum_type === 'CLOSED') {
            gen('switch(%s){', ref)('default:')('return%j', invalid(field, 'enum value'));
            for (var keys = Object.keys(resolvedType.values), j = 0; j < keys.length; ++j)
              gen('case %i:', resolvedType.values[keys[j]]);
            gen('break')('}');
          } else
            gen(
              'if(typeof %s!=="number"||(%s|0)!==%s)',
              ref,
              ref,
              ref,
            )('return%j', invalid(field, 'enum value'));
        } else
          gen('{')('var e=types[%i].verify(%s,q+1);', fieldIndex, ref)('if(e)')(
            'return%j+e',
            field.name + '.',
          )('}');
      } else
        switch (field.type) {
          case 'int32':
          case 'uint32':
          case 'sint32':
          case 'fixed32':
          case 'sfixed32':
            gen('if(!util.isInteger(%s))', ref)('return%j', invalid(field, 'integer'));
            break;
          case 'int64':
          case 'uint64':
          case 'sint64':
          case 'fixed64':
          case 'sfixed64':
            gen(
              'if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))',
              ref,
              ref,
              ref,
              ref,
            )('return%j', invalid(field, 'integer|Long'));
            break;
          case 'float':
          case 'double':
            gen('if(typeof %s!=="number")', ref)('return%j', invalid(field, 'number'));
            break;
          case 'bool':
            gen('if(typeof %s!=="boolean")', ref)('return%j', invalid(field, 'boolean'));
            break;
          case 'string':
            gen('if(!util.isString(%s))', ref)('return%j', invalid(field, 'string'));
            break;
          case 'bytes':
            gen(
              'if(!(%s&&typeof %s.length==="number"||util.isString(%s)))',
              ref,
              ref,
              ref,
            )('return%j', invalid(field, 'buffer'));
        }
      return gen;
    }
    function genVerifyKey(gen, field, ref) {
      switch (field.keyType) {
        case 'int32':
        case 'uint32':
        case 'sint32':
        case 'fixed32':
        case 'sfixed32':
          gen('if(!util.key32Re.test(%s))', ref)('return%j', invalid(field, 'integer key'));
          break;
        case 'int64':
        case 'uint64':
        case 'sint64':
        case 'fixed64':
        case 'sfixed64':
          gen('if(!util.key64Re.test(%s))', ref)('return%j', invalid(field, 'integer|Long key'));
          break;
        case 'bool':
          gen('if(!util.key2Re.test(%s))', ref)('return%j', invalid(field, 'boolean key'));
      }
      return gen;
    }
    function verifier(mtype) {
      var gen = util.codegen(['m', 'q'])('if(typeof m!=="object"||m===null)')(
        'return%j',
        'object expected',
      )('if(q===undefined)q=0')('if(q>util.recursionLimit)')('return%j', 'max depth exceeded');
      var oneofs = mtype.oneofsArray,
        seenFirstField = {};
      if (oneofs.length) gen('var p={}');
      for (var i = 0; i < mtype.fieldsArray.length; ++i) {
        var field = mtype._fieldsArray[i].resolve(),
          ref = 'm' + util.safeProp(field.name);
        if (field.optional) gen('if(%s!=null&&Object.hasOwnProperty.call(m,%j)){', ref, field.name);
        if (field.map) {
          gen('if(!util.isObject(%s))', ref)('return%j', invalid(field, 'object'))(
            'var k=Object.keys(%s)',
            ref,
          )('for(var i=0;i<k.length;++i){');
          genVerifyKey(gen, field, 'k[i]');
          genVerifyValue(gen, field, i, ref + '[k[i]]')('}');
        } else if (field.repeated) {
          gen('if(!Array.isArray(%s))', ref)('return%j', invalid(field, 'array'))(
            'for(var i=0;i<%s.length;++i){',
            ref,
          );
          genVerifyValue(gen, field, i, ref + '[i]')('}');
        } else {
          if (field.partOf) {
            var oneofProp = util.safeProp(field.partOf.name);
            if (seenFirstField[field.partOf.name] === 1)
              gen('if(p%s===1)', oneofProp)('return%j', field.partOf.name + ': multiple values');
            seenFirstField[field.partOf.name] = 1;
            gen('p%s=1', oneofProp);
          }
          genVerifyValue(gen, field, i, ref);
        }
        if (field.optional) gen('}');
      }
      return gen('return null');
    }
  });
  var require_converter = __commonJSMin((exports) => {
    var converter = exports;
    var Enum = require_enum();
    var types = require_types();
    var util = require_util();
    function genValuePartial_fromObject(gen, field, fieldIndex, prop, dstProp) {
      if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) {
          var dst = dstProp ? 'm' + dstProp + '[m' + dstProp + '.length]' : 'm' + prop;
          gen('switch(d%s){', prop);
          for (
            var values = field.resolvedType.values, keys = Object.keys(values), i = 0;
            i < keys.length;
            ++i
          )
            gen('case%j:', keys[i])('case %i:', values[keys[i]])('%s=%j', dst, values[keys[i]])(
              'break',
            );
          gen('default:');
          if (field.resolvedType._features.enum_type !== 'CLOSED')
            gen('if(typeof d%s==="number"&&(d%s|0)===d%s)', prop, prop, prop)('%s=d%s', dst, prop);
          gen('}');
        } else
          gen('if(!util.isObject(d%s))', prop)(
            'throw TypeError(%j)',
            field.fullName + ': object expected',
          )('m%s=types[%i].fromObject(d%s,q+1)', prop, fieldIndex, prop);
      } else {
        var isUnsigned = false;
        switch (field.type) {
          case 'double':
          case 'float':
            gen('m%s=Number(d%s)', prop, prop);
            break;
          case 'uint32':
          case 'fixed32':
            gen('m%s=d%s>>>0', prop, prop);
            break;
          case 'int32':
          case 'sint32':
          case 'sfixed32':
            gen('m%s=d%s|0', prop, prop);
            break;
          case 'uint64':
          case 'fixed64':
            isUnsigned = true;
          case 'int64':
          case 'sint64':
          case 'sfixed64':
            gen('if(util.Long)')('m%s=util.Long.fromValue(d%s,%j)', prop, prop, isUnsigned)(
              'else if(typeof d%s==="string")',
              prop,
            )(
              'm%s=parseInt(d%s,10)',
              prop,
              prop,
            )('else if(typeof d%s==="number")', prop)(
              'm%s=d%s',
              prop,
              prop,
            )('else if(typeof d%s==="object")', prop)(
              'm%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)',
              prop,
              prop,
              prop,
              isUnsigned ? 'true' : '',
            );
            break;
          case 'bytes':
            gen('if(typeof d%s==="string")', prop)(
              'util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)',
              prop,
              prop,
              prop,
            )('else if(d%s.length>=0)', prop)('m%s=d%s', prop, prop);
            break;
          case 'string':
            gen('m%s=String(d%s)', prop, prop);
            break;
          case 'bool':
            gen('m%s=Boolean(d%s)', prop, prop);
        }
      }
      return gen;
    }
    converter.fromObject = function fromObject(mtype) {
      var fields = mtype.fieldsArray;
      var gen = util.codegen(['d', 'q'])('if(d instanceof C)')('return d')('if(!util.isObject(d))')(
        'throw TypeError(%j)',
        mtype.fullName + ': object expected',
      )('if(q===undefined)q=0')('if(q>util.recursionLimit)')('throw Error("max depth exceeded")');
      if (!fields.length) return gen('return new C');
      gen('var m=new C');
      for (var i = 0; i < fields.length; ++i) {
        var field = fields[i].resolve(),
          prop = util.safeProp(field.name),
          implicitPresence =
            !field.hasPresence &&
            !field.repeated &&
            !field.map &&
            (field.resolvedType instanceof Enum || types.basic[field.type] !== void 0);
        if (field.map) {
          gen('if(d%s){', prop)('if(!util.isObject(d%s))', prop)(
            'throw TypeError(%j)',
            field.fullName + ': object expected',
          )('m%s={}', prop)('for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){', prop);
          gen('if(ks[i]==="__proto__")')('util.makeProp(m%s,ks[i])', prop);
          genValuePartial_fromObject(gen, field, i, prop + '[ks[i]]')('}')('}');
        } else if (field.repeated) {
          gen('if(d%s){', prop)('if(!Array.isArray(d%s))', prop)(
            'throw TypeError(%j)',
            field.fullName + ': array expected',
          );
          if (field.resolvedType instanceof Enum) gen('m%s=[]', prop);
          else gen('m%s=Array(d%s.length)', prop, prop);
          gen('for(var i=0;i<d%s.length;++i){', prop);
          genValuePartial_fromObject(
            gen,
            field,
            i,
            prop + '[i]',
            field.resolvedType instanceof Enum ? prop : void 0,
          )('}')('}');
        } else {
          if (!(field.resolvedType instanceof Enum)) gen('if(d%s!=null){', prop);
          if (implicitPresence) {
            if (field.resolvedType instanceof Enum)
              gen(
                'if(d%s!==%j&&(typeof d%s!=="string"||types[%i].values[d%s]!==%j)){',
                prop,
                field.typeDefault,
                prop,
                i,
                prop,
                field.typeDefault,
              );
            else if (field.type === 'string')
              gen('if(typeof d%s!=="string"||d%s.length){', prop, prop);
            else if (field.type === 'bytes') gen('if(d%s.length){', prop);
            else if (field.type === 'bool') gen('if(d%s){', prop);
            else if (field.type === 'double' || field.type === 'float')
              gen('if(!Object.is(Number(d%s),0)){', prop);
            else if (types.long[field.type] !== void 0)
              gen(
                'if(typeof d%s==="object"?d%s.low||d%s.high:Number(d%s)!==0){',
                prop,
                prop,
                prop,
                prop,
              );
            else gen('if(Number(d%s)!==0){', prop);
          }
          genValuePartial_fromObject(gen, field, i, prop);
          if (implicitPresence) gen('}');
          if (!(field.resolvedType instanceof Enum)) gen('}');
        }
      }
      return gen('return m');
    };
    function genValuePartial_toObject(gen, field, fieldIndex, dstProp, srcProp) {
      if (!srcProp) srcProp = dstProp;
      if (field.resolvedType) {
        if (field.resolvedType instanceof Enum)
          gen(
            'd%s=o.enums===String?(types[%i].values[m%s]===undefined?m%s:types[%i].values[m%s]):m%s',
            dstProp,
            fieldIndex,
            srcProp,
            srcProp,
            fieldIndex,
            srcProp,
            srcProp,
          );
        else gen('d%s=types[%i].toObject(m%s,o,q+1)', dstProp, fieldIndex, srcProp);
      } else {
        var isUnsigned = false;
        switch (field.type) {
          case 'double':
          case 'float':
            gen('d%s=o.json&&!isFinite(m%s)?String(m%s):m%s', dstProp, srcProp, srcProp, srcProp);
            break;
          case 'uint64':
          case 'fixed64':
            isUnsigned = true;
          case 'int64':
          case 'sint64':
          case 'sfixed64':
            gen('if(typeof BigInt!=="undefined"&&o.longs===BigInt)')(
              'd%s=typeof m%s==="number"?BigInt(m%s):util.Long.fromBits(m%s.low>>>0,m%s.high>>>0,%j).toBigInt()',
              dstProp,
              srcProp,
              srcProp,
              srcProp,
              srcProp,
              isUnsigned,
            )('else if(typeof m%s==="number")', srcProp)(
              'd%s=o.longs===String?String(m%s):m%s',
              dstProp,
              srcProp,
              srcProp,
            )('else')(
              'd%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s',
              dstProp,
              srcProp,
              srcProp,
              srcProp,
              isUnsigned ? 'true' : '',
              srcProp,
            );
            break;
          case 'bytes':
            gen(
              'd%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s',
              dstProp,
              srcProp,
              srcProp,
              srcProp,
              srcProp,
            );
            break;
          default:
            gen('d%s=m%s', dstProp, srcProp);
        }
      }
      return gen;
    }
    converter.toObject = function toObject(mtype) {
      var fields = mtype.fieldsArray.slice().sort(util.compareFieldsById);
      if (!fields.length) return util.codegen()('return {}');
      var gen = util.codegen(['m', 'o', 'q'])('if(!o)')('o={}')('if(q===undefined)q=0')(
        'if(q>util.recursionLimit)',
      )('throw Error("max depth exceeded")')('var d={}');
      var repeatedFields = [],
        mapFields = [],
        normalFields = [],
        i = 0;
      for (; i < fields.length; ++i)
        if (!fields[i].partOf)
          (fields[i].resolve().repeated
            ? repeatedFields
            : fields[i].map
              ? mapFields
              : normalFields
          ).push(fields[i]);
      if (repeatedFields.length) {
        gen('if(o.arrays||o.defaults){');
        for (i = 0; i < repeatedFields.length; ++i)
          gen('d%s=[]', util.safeProp(repeatedFields[i].name));
        gen('}');
      }
      if (mapFields.length) {
        gen('if(o.objects||o.defaults){');
        for (i = 0; i < mapFields.length; ++i) gen('d%s={}', util.safeProp(mapFields[i].name));
        gen('}');
      }
      if (normalFields.length) {
        gen('if(o.defaults){');
        for (i = 0; i < normalFields.length; ++i) {
          var field = normalFields[i],
            prop = util.safeProp(field.name);
          if (field.resolvedType instanceof Enum)
            gen(
              'd%s=o.enums===String?%j:%j',
              prop,
              field.resolvedType.valuesById[field.typeDefault],
              field.typeDefault,
            );
          else if (field.long)
            gen('if(util.Long){')(
              'var n=new util.Long(%i,%i,%j)',
              field.typeDefault.low,
              field.typeDefault.high,
              field.typeDefault.unsigned,
            )(
              'd%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():typeof BigInt!=="undefined"&&o.longs===BigInt?n.toBigInt():n',
              prop,
            )('}else')(
              'd%s=o.longs===String?%j:typeof BigInt!=="undefined"&&o.longs===BigInt?BigInt(%j):%i',
              prop,
              field.typeDefault.toString(),
              field.typeDefault.toString(),
              field.typeDefault.toNumber(),
            );
          else if (field.bytes) {
            var arrayDefault = Array.prototype.slice.call(field.typeDefault);
            gen(
              'if(o.bytes===String)d%s=%j',
              prop,
              util.base64.encode(field.typeDefault, 0, field.typeDefault.length),
            )('else{')('d%s=%j', prop, arrayDefault)(
              'if(o.bytes!==Array)d%s=util.newBuffer(d%s)',
              prop,
              prop,
            )('}');
          } else if (
            (field.type === 'double' || field.type === 'float') &&
            typeof field.typeDefault === 'number' &&
            (!isFinite(field.typeDefault) || Object.is(field.typeDefault, -0))
          )
            gen('d%s=%f', prop, field.typeDefault)(
              'if(o.json&&!isFinite(d%s))d%s=String(d%s)',
              prop,
              prop,
              prop,
            );
          else gen('d%s=%j', prop, field.typeDefault);
        }
        gen('}');
      }
      var hasKs2 = false;
      for (i = 0; i < fields.length; ++i) {
        var field = fields[i],
          index = mtype._fieldsArray.indexOf(field),
          prop = util.safeProp(field.name);
        if (field.map) {
          if (!hasKs2) {
            hasKs2 = true;
            gen('var ks2');
          }
          gen('if(m%s&&(ks2=Object.keys(m%s)).length){', prop, prop)('d%s={}', prop);
          var longKey = types.long[field.keyType] !== void 0,
            srcProp = prop + '[ks2[j]]';
          gen('for(var j=0;j<ks2.length;++j){');
          if (longKey)
            gen(
              'var k2=util.longFromKey(ks2[j],%j).toString()',
              field.keyType === 'uint64' || field.keyType === 'fixed64',
            );
          gen('if(ks2[j]==="__proto__")')('util.makeProp(d%s,ks2[j])', prop);
          genValuePartial_toObject(
            gen,
            field,
            index,
            longKey ? prop + '[k2]' : srcProp,
            srcProp,
          )('}');
        } else if (field.repeated) {
          gen('if(m%s&&m%s.length){', prop, prop)('d%s=Array(m%s.length)', prop, prop)(
            'for(var j=0;j<m%s.length;++j){',
            prop,
          );
          genValuePartial_toObject(gen, field, index, prop + '[j]')('}');
        } else {
          gen('if(m%s!=null&&Object.hasOwnProperty.call(m,%j)){', prop, field.name);
          genValuePartial_toObject(gen, field, index, prop);
          if (field.partOf && !field.partOf.isProto3Optional)
            gen('if(o.oneofs)')('d%s=%j', util.safeProp(field.partOf.name), field.name);
        }
        gen('}');
      }
      return gen('return d');
    };
  });
  var require_wrappers = __commonJSMin((exports) => {
    var wrappers = exports;
    var Message = require_message();
    var util = require_minimal();
    wrappers['.google.protobuf.Any'] = {
      fromObject: function (object, depth) {
        if (depth === void 0) depth = 0;
        if (depth > util.recursionLimit) throw Error('max depth exceeded');
        if (object && object['@type']) {
          var name = object['@type'].substring(object['@type'].lastIndexOf('/') + 1);
          var type = this.lookup(name, [this.constructor]);
          if (type) {
            var type_url =
              object['@type'].charAt(0) === '.' ? object['@type'].slice(1) : object['@type'];
            if (type_url.indexOf('/') === -1) type_url = '/' + type_url;
            return this.create({
              type_url,
              value: type.encode(type.fromObject(object, depth + 1)).finish(),
            });
          }
        }
        return this.fromObject(object, depth);
      },
      toObject: function (message, options, depth) {
        if (depth === void 0) depth = 0;
        if (depth > util.recursionLimit) throw Error('max depth exceeded');
        var googleApi = 'type.googleapis.com/';
        var prefix = '';
        var name = '';
        if (options && options.json && message.type_url && message.value) {
          name = message.type_url.substring(message.type_url.lastIndexOf('/') + 1);
          prefix = message.type_url.substring(0, message.type_url.lastIndexOf('/') + 1);
          var type = this.lookup(name, [this.constructor]);
          if (type) message = type.decode(message.value, void 0, void 0, depth + 1);
        }
        if (!(message instanceof this.ctor) && message instanceof Message) {
          var object = message.$type.toObject(message, options, depth + 1);
          var messageName =
            message.$type.fullName[0] === '.'
              ? message.$type.fullName.slice(1)
              : message.$type.fullName;
          if (prefix === '') prefix = googleApi;
          name = prefix + messageName;
          object['@type'] = name;
          return object;
        }
        return this.toObject(message, options, depth);
      },
    };
  });
  var require_type = __commonJSMin((exports, module) => {
    module.exports = Type;
    var Namespace = require_namespace();
    Type.prototype = Object.create(Namespace.prototype, {
      constructor: {
        value: Type,
        writable: true,
        enumerable: false,
        configurable: true,
      },
    });
    Type.className = 'Type';
    var Enum = require_enum();
    var OneOf = require_oneof();
    var Field = require_field();
    var MapField = require_mapfield();
    var Service = require_service();
    var Message = require_message();
    var Reader = require_reader();
    var Writer = require_writer();
    var util = require_util();
    var encoder = require_encoder();
    var decoder = require_decoder();
    var verifier = require_verifier();
    var converter = require_converter();
    var wrappers = require_wrappers();
    function Type(name, options) {
      name = name.replace(/\W/g, '');
      Namespace.call(this, name, options);
      this.fields = {};
      this.oneofs = void 0;
      this.extensions = void 0;
      this.reserved = void 0;
      this.group = void 0;
      this.visibility = void 0;
      this._fieldsById = null;
      this._fieldsArray = null;
      this._oneofsArray = null;
      this._ctor = null;
      this._fieldsByJsonName = null;
    }
    Object.defineProperties(Type.prototype, {
      fieldsById: {
        get: function () {
          if (this._fieldsById) return this._fieldsById;
          this._fieldsById = {};
          for (var names = Object.keys(this.fields), i = 0; i < names.length; ++i) {
            var field = this.fields[names[i]],
              id = field.id;
            if (this._fieldsById[id]) throw Error('duplicate id ' + id + ' in ' + this);
            this._fieldsById[id] = field;
          }
          return this._fieldsById;
        },
      },
      fieldsArray: {
        get: function () {
          return this._fieldsArray || (this._fieldsArray = util.toArray(this.fields));
        },
      },
      oneofsArray: {
        get: function () {
          return this._oneofsArray || (this._oneofsArray = util.toArray(this.oneofs));
        },
      },
      ctor: {
        get: function () {
          return this._ctor || (this.ctor = Type.generateConstructor(this)());
        },
        set: function (ctor) {
          var prototype = ctor.prototype;
          if (!(prototype instanceof Message)) {
            ctor.prototype = new Message();
            Object.defineProperty(ctor.prototype, 'constructor', {
              value: ctor,
              writable: true,
              enumerable: false,
              configurable: true,
            });
            util.merge(ctor.prototype, prototype);
          }
          ctor.$type = ctor.prototype.$type = this;
          util.merge(ctor, Message, true);
          this._ctor = ctor;
          delete this.decode;
          delete this.fromObject;
          var i = 0;
          for (var field; i < this.fieldsArray.length; ++i) {
            field = this._fieldsArray[i].resolve();
            ctor.prototype[field.name] = field.defaultValue;
          }
          var ctorProperties = {};
          for (i = 0; i < this.oneofsArray.length; ++i)
            ctorProperties[this._oneofsArray[i].resolve().name] = {
              get: util.oneOfGetter(this._oneofsArray[i].oneof),
              set: util.oneOfSetter(this._oneofsArray[i].oneof),
            };
          if (i) Object.defineProperties(ctor.prototype, ctorProperties);
        },
      },
    });
    Type.generateConstructor = function generateConstructor(mtype) {
      var gen = util.codegen(['p']);
      for (var i = 0, field; i < mtype.fieldsArray.length; ++i)
        if ((field = mtype._fieldsArray[i]).map) gen('this%s={}', util.safeProp(field.name));
        else if (field.repeated) gen('this%s=[]', util.safeProp(field.name));
      return gen(
        'if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null&&ks[i]!=="__proto__")',
      )('this[ks[i]]=p[ks[i]]');
    };
    function clearCache(type) {
      type._fieldsById = type._fieldsArray = type._oneofsArray = type._fieldsByJsonName = null;
      delete type.encode;
      delete type.decode;
      delete type.verify;
      return type;
    }
    Type.fromJSON = function fromJSON(name, json, depth) {
      if (depth === void 0) depth = 0;
      if (depth > util.nestingLimit) throw Error('max depth exceeded');
      var type = new Type(name, json.options);
      type.extensions = json.extensions;
      type.reserved = json.reserved;
      var names = Object.keys(json.fields),
        i = 0;
      for (; i < names.length; ++i)
        type.add(
          (typeof json.fields[names[i]].keyType !== 'undefined'
            ? MapField.fromJSON
            : Field.fromJSON)(names[i], json.fields[names[i]]),
        );
      if (json.oneofs)
        for (names = Object.keys(json.oneofs), i = 0; i < names.length; ++i)
          type.add(OneOf.fromJSON(names[i], json.oneofs[names[i]]));
      if (json.nested)
        for (names = Object.keys(json.nested), i = 0; i < names.length; ++i) {
          var nested = json.nested[names[i]];
          type.add(
            (nested.id !== void 0
              ? Field.fromJSON
              : nested.fields !== void 0
                ? Type.fromJSON
                : nested.values !== void 0
                  ? Enum.fromJSON
                  : nested.methods !== void 0
                    ? Service.fromJSON
                    : Namespace.fromJSON)(names[i], nested, depth + 1),
          );
        }
      if (json.extensions && json.extensions.length) type.extensions = json.extensions;
      if (json.reserved && json.reserved.length) type.reserved = json.reserved;
      if (json.group) type.group = true;
      if (json.visibility) type.visibility = json.visibility;
      if (json.comment) type.comment = json.comment;
      if (json.edition) type._edition = json.edition;
      type._defaultEdition = 'proto3';
      return type;
    };
    Type.prototype.toJSON = function toJSON(toJSONOptions) {
      var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        'edition',
        this._editionToJSON(),
        'options',
        (inherited && inherited.options) || void 0,
        'oneofs',
        Namespace.arrayToJSON(this.oneofsArray, toJSONOptions),
        'fields',
        Namespace.arrayToJSON(
          this.fieldsArray.filter(function (obj) {
            return !obj.declaringField;
          }),
          toJSONOptions,
        ) || {},
        'extensions',
        this.extensions && this.extensions.length ? this.extensions : void 0,
        'reserved',
        this.reserved && this.reserved.length ? this.reserved : void 0,
        'group',
        this.group || void 0,
        'visibility',
        this.visibility,
        'nested',
        (inherited && inherited.nested) || void 0,
        'comment',
        keepComments ? this.comment : void 0,
      ]);
    };
    Type.prototype.resolveAll = function resolveAll() {
      if (!this._needsRecursiveResolve) return this;
      Namespace.prototype.resolveAll.call(this);
      var oneofs = this.oneofsArray;
      i = 0;
      while (i < oneofs.length) oneofs[i++].resolve();
      var fields = this.fieldsArray,
        i = 0;
      while (i < fields.length) fields[i++].resolve();
      return this;
    };
    Type.prototype._resolveFeaturesRecursive = function _resolveFeaturesRecursive(edition) {
      if (!this._needsRecursiveFeatureResolution) return this;
      edition = this._edition || edition;
      Namespace.prototype._resolveFeaturesRecursive.call(this, edition);
      this.oneofsArray.forEach((oneof) => {
        oneof._resolveFeatures(edition);
      });
      this.fieldsArray.forEach((field) => {
        field._resolveFeatures(edition);
      });
      return this;
    };
    Type.prototype.get = function get(name) {
      if (Object.prototype.hasOwnProperty.call(this.fields, name)) return this.fields[name];
      if (this.oneofs && Object.prototype.hasOwnProperty.call(this.oneofs, name))
        return this.oneofs[name];
      if (this.nested && Object.prototype.hasOwnProperty.call(this.nested, name))
        return this.nested[name];
      return null;
    };
    Type.prototype.add = function add(object) {
      if (this.get(object.name)) throw Error("duplicate name '" + object.name + "' in " + this);
      if (object instanceof Field && object.extend === void 0) {
        if (this._fieldsById ? this._fieldsById[object.id] : this.fieldsById[object.id])
          throw Error('duplicate id ' + object.id + ' in ' + this);
        if (this.isReservedId(object.id))
          throw Error('id ' + object.id + ' is reserved in ' + this);
        if (this.isReservedName(object.name) || object.name.charAt(0) === '$')
          throw Error("name '" + object.name + "' is reserved in " + this);
        if (object.name === '__proto__') return this;
        if (object.parent) object.parent.remove(object);
        this.fields[object.name] = object;
        object.message = this;
        object.onAdd(this);
        return clearCache(this);
      }
      if (object instanceof OneOf) {
        if (object.name.charAt(0) === '$')
          throw Error("name '" + object.name + "' is reserved in " + this);
        if (object.name === '__proto__') return this;
        if (!this.oneofs) this.oneofs = {};
        this.oneofs[object.name] = object;
        object.onAdd(this);
        return clearCache(this);
      }
      return Namespace.prototype.add.call(this, object);
    };
    Type.prototype.remove = function remove(object) {
      if (object instanceof Field && object.extend === void 0) {
        if (!util.remove(this.fields, object, object.name))
          throw Error(object + ' is not a member of ' + this);
        object.parent = null;
        object.onRemove(this);
        return clearCache(this);
      }
      if (object instanceof OneOf) {
        if (!util.remove(this.oneofs, object, object.name))
          throw Error(object + ' is not a member of ' + this);
        object.parent = null;
        object.onRemove(this);
        return clearCache(this);
      }
      return Namespace.prototype.remove.call(this, object);
    };
    Type.prototype.isReservedId = function isReservedId(id) {
      return Namespace.isReservedId(this.reserved, id);
    };
    Type.prototype.isReservedName = function isReservedName(name) {
      return Namespace.isReservedName(this.reserved, name);
    };
    Type.prototype.create = function create(properties) {
      return new this.ctor(properties);
    };
    Type.prototype.setup = function setup() {
      var root = this.root;
      if (root && root._needsRecursiveFeatureResolution) {
        var edition = root._edition || this._edition;
        if (edition) root._resolveFeaturesRecursive(edition);
      }
      var fullName = this.fullName,
        types = [];
      for (var i = 0; i < this.fieldsArray.length; ++i)
        types.push(this._fieldsArray[i].resolve().resolvedType);
      this.encode = encoder(this)({
        Writer,
        types,
        util,
      });
      this.decode = decoder(this)({
        Reader,
        types,
        util,
        C: this.ctor,
      });
      this.verify = verifier(this)({
        types,
        util,
      });
      this.fromObject = converter.fromObject(this)({
        types,
        util,
        C: this.ctor,
      });
      this.toObject = converter.toObject(this)({
        types,
        util,
      });
      var wrapper = wrappers[fullName];
      if (wrapper) {
        var wrapperThis = Object.create(this);
        wrapperThis._ctor = this.ctor;
        wrapperThis.fromObject = this.fromObject;
        this.fromObject = wrapper.fromObject.bind(wrapperThis);
        wrapperThis.toObject = this.toObject;
        this.toObject = wrapper.toObject.bind(wrapperThis);
      }
      return this;
    };
    Type.prototype.encode = function encode_setup(message, writer) {
      return this.setup().encode.apply(this, arguments);
    };
    Type.prototype.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, (writer || Writer.create()).fork()).ldelim();
    };
    Type.prototype.decode = function decode_setup(reader, length) {
      return this.setup().decode.apply(this, arguments);
    };
    Type.prototype.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof Reader)) reader = Reader.create(reader);
      return this.decode(reader, reader.uint32());
    };
    Type.prototype.verify = function verify_setup(message) {
      return this.setup().verify.apply(this, arguments);
    };
    Type.prototype.fromObject = function fromObject(object) {
      return this.setup().fromObject.apply(this, arguments);
    };
    Type.prototype.toObject = function toObject(message, options) {
      return this.setup().toObject.apply(this, arguments);
    };
    Type.prototype.getTypeUrl = function getTypeUrl(prefix) {
      if (prefix === void 0) prefix = 'type.googleapis.com';
      var fullName = this.fullName;
      return prefix + '/' + (fullName.charAt(0) === '.' ? fullName.substring(1) : fullName);
    };
    Type.d = function decorateType(typeName) {
      return function typeDecorator(target) {
        util.decorateType(target, typeName);
      };
    };
  });
  var require_root = __commonJSMin((exports, module) => {
    module.exports = Root;
    var Namespace = require_namespace();
    Root.prototype = Object.create(Namespace.prototype, {
      constructor: {
        value: Root,
        writable: true,
        enumerable: false,
        configurable: true,
      },
    });
    Root.className = 'Root';
    var Field = require_field();
    var Enum = require_enum();
    var OneOf = require_oneof();
    var util = require_util();
    var Type;
    var parse;
    var common;
    function Root(options) {
      Namespace.call(this, '', options);
      this.deferred = [];
      this.files = [];
      this._edition = 'proto2';
      this._fullyQualifiedObjects = {};
    }
    Root.fromJSON = function fromJSON(json, root, depth) {
      if (depth === void 0) depth = 0;
      if (depth > util.recursionLimit) throw Error('max depth exceeded');
      if (!root) root = new Root();
      if (json.options) root.setOptions(json.options);
      return root.addJSON(json.nested, depth).resolveAll();
    };
    Root.prototype.resolvePath = util.path.resolve;
    Root.prototype.fetch = util.fetch;
    function SYNC() {}
    Root.prototype.load = function load(filename, options, callback) {
      if (typeof options === 'function') {
        callback = options;
        options = void 0;
      }
      var self = this;
      if (!callback) return util.asPromise(load, self, filename, options);
      var sync = callback === SYNC;
      function finish(err, root) {
        if (!callback) return;
        if (sync) throw err;
        if (root) root.resolveAll();
        var cb = callback;
        callback = null;
        cb(err, root);
      }
      function getBundledFileName(filename) {
        var idx = filename.lastIndexOf('google/protobuf/');
        if (idx > -1) {
          var altname = filename.substring(idx);
          if (Object.prototype.hasOwnProperty.call(common, altname)) return altname;
        }
        if (Object.prototype.hasOwnProperty.call(common, filename)) return filename;
        return null;
      }
      function process(filename, source, depth) {
        if (depth === void 0) depth = 0;
        try {
          if (depth > util.recursionLimit) throw Error('max depth exceeded');
          if (util.isString(source) && source.charAt(0) === '{') source = JSON.parse(source);
          if (!util.isString(source)) self.setOptions(source.options).addJSON(source.nested);
          else {
            parse.filename = filename;
            var parsed = parse(source, self, options),
              resolved,
              i = 0;
            if (parsed.imports) {
              for (; i < parsed.imports.length; ++i)
                if (
                  (resolved =
                    getBundledFileName(parsed.imports[i]) ||
                    self.resolvePath(filename, parsed.imports[i]))
                )
                  fetch(resolved, false, depth + 1);
            }
            if (parsed.weakImports) {
              for (i = 0; i < parsed.weakImports.length; ++i)
                if (
                  (resolved =
                    getBundledFileName(parsed.weakImports[i]) ||
                    self.resolvePath(filename, parsed.weakImports[i]))
                )
                  fetch(resolved, true, depth + 1);
            }
          }
        } catch (err) {
          finish(err);
        }
        if (!sync && !queued) finish(null, self);
      }
      function fetch(filename, weak, depth) {
        if (depth === void 0) depth = 0;
        filename = getBundledFileName(filename) || filename;
        if (self.files.indexOf(filename) > -1) return;
        self.files.push(filename);
        if (Object.prototype.hasOwnProperty.call(common, filename)) {
          if (sync) process(filename, common[filename], depth);
          else {
            ++queued;
            setTimeout(function () {
              --queued;
              process(filename, common[filename], depth);
            });
          }
          return;
        }
        if (sync) {
          var source;
          try {
            source = util.fs.readFileSync(filename).toString('utf8');
          } catch (err) {
            if (!weak) finish(err);
            return;
          }
          process(filename, source, depth);
        } else {
          ++queued;
          self.fetch(filename, function (err, source) {
            --queued;
            if (!callback) return;
            if (err) {
              if (!weak) finish(err);
              else if (!queued) finish(null, self);
              return;
            }
            process(filename, source, depth);
          });
        }
      }
      var queued = 0;
      if (util.isString(filename)) filename = [filename];
      for (var i = 0, resolved; i < filename.length; ++i)
        if ((resolved = self.resolvePath('', filename[i]))) fetch(resolved);
      if (sync) {
        self.resolveAll();
        return self;
      }
      if (!queued) finish(null, self);
      return self;
    };
    Root.prototype.loadSync = function loadSync(filename, options) {
      if (!util.isNode) throw Error('not supported');
      return this.load(filename, options, SYNC);
    };
    Root.prototype.resolveAll = function resolveAll() {
      if (!this._needsRecursiveResolve) return this;
      if (this.deferred.length)
        throw Error(
          'unresolvable extensions: ' +
            this.deferred
              .map(function (field) {
                return "'extend " + field.extend + "' in " + field.parent.fullName;
              })
              .join(', '),
        );
      return Namespace.prototype.resolveAll.call(this);
    };
    var exposeRe = /^[A-Z]/;
    function tryHandleExtension(root, field) {
      var extendedType = field.parent.lookup(field.extend);
      if (extendedType) {
        var sisterField = new Field(
          field.fullName,
          field.id,
          field.type,
          field.rule,
          void 0,
          field.options,
        );
        if (extendedType.get(sisterField.name)) return true;
        sisterField.declaringField = field;
        field.extensionField = sisterField;
        extendedType.add(sisterField);
        return true;
      }
      return false;
    }
    Root.prototype._handleAdd = function _handleAdd(object) {
      if (object instanceof Field) {
        if (object.extend !== void 0 && !object.extensionField) {
          if (!tryHandleExtension(this, object)) this.deferred.push(object);
        }
      } else if (object instanceof Enum) {
        if (exposeRe.test(object.name)) object.parent[object.name] = object.values;
      } else if (!(object instanceof OneOf)) {
        if (object instanceof Type)
          for (var i = 0; i < this.deferred.length;)
            if (tryHandleExtension(this, this.deferred[i])) this.deferred.splice(i, 1);
            else ++i;
        for (var j = 0; j < object.nestedArray.length; ++j) this._handleAdd(object._nestedArray[j]);
        if (exposeRe.test(object.name)) object.parent[object.name] = object;
      }
      if (object instanceof Type || object instanceof Enum || object instanceof Field)
        this._fullyQualifiedObjects[object.fullName] = object;
    };
    Root.prototype._handleRemove = function _handleRemove(object) {
      if (object instanceof Field) {
        if (object.extend !== void 0) {
          if (object.extensionField) {
            object.extensionField.parent.remove(object.extensionField);
            object.extensionField = null;
          } else {
            var index = this.deferred.indexOf(object);
            if (index > -1) this.deferred.splice(index, 1);
          }
        }
      } else if (object instanceof Enum) {
        if (exposeRe.test(object.name)) delete object.parent[object.name];
      } else if (object instanceof Namespace) {
        for (var i = 0; i < object.nestedArray.length; ++i)
          this._handleRemove(object._nestedArray[i]);
        if (exposeRe.test(object.name)) delete object.parent[object.name];
      }
      delete this._fullyQualifiedObjects[object.fullName];
    };
    Root._configure = function (Type_, parse_, common_) {
      Type = Type_;
      parse = parse_;
      common = common_;
    };
  });
  var require_util = __commonJSMin((exports, module) => {
    var util = (module.exports = require_minimal());
    var roots = require_roots();
    var Type;
    var Enum;
    util.codegen = require_codegen();
    util.fetch = require_fetch();
    util.path = require_path();
    util.patterns = require_patterns();
    var reservedRe = util.patterns.reservedRe;
    util.fs = require_fs();
    util.toArray = function toArray(object) {
      if (object) {
        var keys = Object.keys(object),
          array = new Array(keys.length),
          index = 0;
        while (index < keys.length) array[index] = object[keys[index++]];
        return array;
      }
      return [];
    };
    util.toObject = function toObject(array) {
      var object = {},
        index = 0;
      while (index < array.length) {
        var key = array[index++],
          val = array[index++];
        if (val !== void 0) object[key] = val;
      }
      return object;
    };
    util.remove = function remove(object, value, key) {
      if (!object) return false;
      if (
        key !== void 0 &&
        Object.prototype.hasOwnProperty.call(object, key) &&
        object[key] === value
      ) {
        delete object[key];
        return true;
      }
      for (var names = Object.keys(object), i = 0; i < names.length; ++i)
        if (object[names[i]] === value) {
          delete object[names[i]];
          return true;
        }
      return false;
    };
    util.isReserved = function isReserved(name) {
      return reservedRe.test(name);
    };
    util.safeProp = function safeProp(prop) {
      if (!/^[$\w_]+$/.test(prop) || reservedRe.test(prop)) return '[' + JSON.stringify(prop) + ']';
      return '.' + prop;
    };
    util.ucFirst = function ucFirst(str) {
      return str.charAt(0).toUpperCase() + str.substring(1);
    };
    var camelCaseRe = /_([a-z])/g;
    util.camelCase = function camelCase(str) {
      return (
        str.substring(0, 1) +
        str.substring(1).replace(camelCaseRe, function ($0, $1) {
          return $1.toUpperCase();
        })
      );
    };
    util.jsonName = function jsonName(str) {
      var result = '',
        upperNext = false,
        i = 0;
      for (; i < str.length; ++i) {
        var ch = str.charAt(i);
        if (ch === '_') upperNext = true;
        else if (upperNext) {
          result += ch.toUpperCase();
          upperNext = false;
        } else result += ch;
      }
      return result;
    };
    util.compareFieldsById = function compareFieldsById(a, b) {
      return a.id - b.id;
    };
    util.decorateType = function decorateType(ctor, typeName) {
      if (ctor.$type) {
        if (typeName && ctor.$type.name !== typeName) {
          util.decorateRoot.remove(ctor.$type);
          ctor.$type.name = typeName;
          util.decorateRoot.add(ctor.$type);
        }
        return ctor.$type;
      }
      if (!Type) Type = require_type();
      var type = new Type(typeName || ctor.name);
      util.decorateRoot.add(type);
      type.ctor = ctor;
      Object.defineProperty(ctor, '$type', {
        value: type,
        enumerable: false,
      });
      Object.defineProperty(ctor.prototype, '$type', {
        value: type,
        enumerable: false,
      });
      return type;
    };
    var decorateEnumIndex = 0;
    util.decorateEnum = function decorateEnum(object) {
      if (object.$type) return object.$type;
      if (!Enum) Enum = require_enum();
      var enm = new Enum('Enum' + decorateEnumIndex++, object);
      util.decorateRoot.add(enm);
      Object.defineProperty(object, '$type', {
        value: enm,
        enumerable: false,
      });
      return enm;
    };
    util.setProperty = function setProperty(dst, path, value, ifNotSet) {
      function setProp(dst, path, value) {
        var part = path.shift();
        if (util.isUnsafeProperty(part)) return dst;
        if (path.length > 0) dst[part] = setProp(dst[part] || {}, path, value);
        else {
          var prevValue = dst[part];
          if (prevValue && ifNotSet) return dst;
          if (prevValue) value = [].concat(prevValue).concat(value);
          dst[part] = value;
        }
        return dst;
      }
      if (typeof dst !== 'object') throw TypeError('dst must be an object');
      if (!path) throw TypeError('path must be specified');
      path = path.split('.');
      if (path.length > util.recursionLimit) throw Error('max depth exceeded');
      return setProp(dst, path, value);
    };
    Object.defineProperty(util, 'decorateRoot', {
      get: function () {
        return roots['decorated'] || (roots['decorated'] = new (require_root())());
      },
    });
  });
  var require_types = __commonJSMin((exports) => {
    var types = exports;
    var util = require_util();
    var s = [
      'double',
      'float',
      'int32',
      'uint32',
      'sint32',
      'fixed32',
      'sfixed32',
      'int64',
      'uint64',
      'sint64',
      'fixed64',
      'sfixed64',
      'bool',
      'string',
      'bytes',
    ];
    function bake(values, offset) {
      var i = 0,
        o = Object.create(null);
      offset |= 0;
      while (i < values.length) o[s[i + offset]] = values[i++];
      return o;
    }
    types.basic = bake([1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0, 2, 2]);
    types.defaults = bake([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, '', util.emptyArray, null]);
    types.long = bake([0, 0, 0, 1, 1], 7);
    types.mapKey = bake([0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0, 2], 2);
    types.packed = bake([1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0]);
  });
  var require_field = __commonJSMin((exports, module) => {
    module.exports = Field;
    var ReflectionObject = require_object();
    Field.prototype = Object.create(ReflectionObject.prototype, {
      constructor: {
        value: Field,
        writable: true,
        enumerable: false,
        configurable: true,
      },
    });
    Field.className = 'Field';
    var Enum = require_enum();
    var types = require_types();
    var util = require_util();
    var Type;
    var ruleRe = /^(?:required|optional|repeated)$/;
    Field.fromJSON = function fromJSON(name, json) {
      var field = new Field(
        name,
        json.id,
        json.type,
        json.rule,
        json.extend,
        json.options,
        json.comment,
      );
      if (json.edition) field._edition = json.edition;
      if (json.protoName) field.protoName = json.protoName;
      if (json.jsonName !== void 0) field.jsonName = json.jsonName;
      else if (json.options && json.options.json_name !== void 0)
        field.jsonName = json.options.json_name;
      field._defaultEdition = 'proto3';
      return field;
    };
    function Field(name, id, type, rule, extend, options, comment) {
      if (util.isObject(rule)) {
        comment = extend;
        options = rule;
        rule = extend = void 0;
      } else if (util.isObject(extend)) {
        comment = options;
        options = extend;
        extend = void 0;
      }
      ReflectionObject.call(this, name, options);
      if (!util.isInteger(id) || id < 0) throw TypeError('id must be a non-negative integer');
      if (!util.isString(type)) throw TypeError('type must be a string');
      if (rule !== void 0 && !ruleRe.test((rule = rule.toString().toLowerCase())))
        throw TypeError('rule must be a string rule');
      if (extend !== void 0 && !util.isString(extend)) throw TypeError('extend must be a string');
      this.rule = rule && rule !== 'optional' ? rule : void 0;
      this.type = type;
      this.id = id;
      this.extend = extend || void 0;
      this.repeated = rule === 'repeated';
      this.map = false;
      this.message = null;
      this.partOf = null;
      this.typeDefault = null;
      this.defaultValue = null;
      this.long = util.Long ? types.long[type] !== void 0 : false;
      this.bytes = type === 'bytes';
      this.resolvedType = null;
      this.extensionField = null;
      this.declaringField = null;
      this.comment = comment;
      this.protoName = void 0;
      this.jsonName = void 0;
    }
    Object.defineProperty(Field.prototype, 'required', {
      get: function () {
        return this._features.field_presence === 'LEGACY_REQUIRED';
      },
    });
    Object.defineProperty(Field.prototype, 'optional', {
      get: function () {
        return !this.required;
      },
    });
    Object.defineProperty(Field.prototype, 'delimited', {
      get: function () {
        return this.resolvedType instanceof Type && this._features.message_encoding === 'DELIMITED';
      },
    });
    Object.defineProperty(Field.prototype, 'packed', {
      get: function () {
        return this._features.repeated_field_encoding === 'PACKED';
      },
    });
    Object.defineProperty(Field.prototype, 'hasPresence', {
      get: function () {
        if (this.repeated || this.map) return false;
        return (
          this.partOf ||
          this.declaringField ||
          this.extensionField ||
          this._features.field_presence !== 'IMPLICIT'
        );
      },
    });
    Field.prototype.setOption = function setOption(name, value, ifNotSet) {
      return ReflectionObject.prototype.setOption.call(this, name, value, ifNotSet);
    };
    Field.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        'edition',
        this._editionToJSON(),
        'rule',
        (this.rule !== 'optional' && this.rule) || void 0,
        'type',
        this.type,
        'id',
        this.id,
        'extend',
        this.extend,
        'protoName',
        this.protoName !== this.name ? this.protoName : void 0,
        'jsonName',
        this.jsonName !== util.jsonName(this.protoName || this.name) ? this.jsonName : void 0,
        'options',
        this.options,
        'comment',
        keepComments ? this.comment : void 0,
      ]);
    };
    Field.prototype.resolve = function resolve() {
      if (this.resolved) return this;
      if ((this.typeDefault = types.defaults[this.type]) === void 0) {
        this.resolvedType = (
          this.declaringField ? this.declaringField.parent : this.parent
        ).lookupTypeOrEnum(this.type);
        if (this.resolvedType instanceof Type) this.typeDefault = null;
        else this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]];
      } else if (this.options && this.options.proto3_optional) this.typeDefault = null;
      if (this.options && this.options['default'] != null) {
        this.typeDefault = this.options['default'];
        if (this.resolvedType instanceof Enum && typeof this.typeDefault === 'string')
          this.typeDefault = this.resolvedType.values[this.typeDefault];
      }
      if (this.options) {
        if (
          this.options.packed !== void 0 &&
          this.resolvedType &&
          !(this.resolvedType instanceof Enum)
        )
          delete this.options.packed;
        if (!Object.keys(this.options).length) this.options = void 0;
      }
      if (this.long) {
        var unsigned = this.type === 'uint64' || this.type === 'fixed64';
        this.typeDefault =
          typeof this.typeDefault === 'string'
            ? util.Long.fromString(this.typeDefault, unsigned)
            : util.Long.fromNumber(this.typeDefault, unsigned);
        if (Object.freeze) Object.freeze(this.typeDefault);
      } else if (types.long[this.type] !== void 0 && typeof this.typeDefault === 'string')
        this.typeDefault = parseInt(this.typeDefault, 10);
      else if (this.bytes && typeof this.typeDefault === 'string') {
        var buf;
        if (util.base64.test(this.typeDefault))
          util.base64.decode(
            this.typeDefault,
            (buf = util.newBuffer(util.base64.length(this.typeDefault))),
            0,
          );
        else
          util.utf8.write(
            this.typeDefault,
            (buf = util.newBuffer(util.utf8.length(this.typeDefault))),
            0,
          );
        this.typeDefault = buf;
      }
      if (this.map) this.defaultValue = util.emptyObject;
      else if (this.repeated) this.defaultValue = util.emptyArray;
      else this.defaultValue = this.typeDefault;
      if (this.parent instanceof Type && this.parent._ctor)
        this.parent._ctor.prototype[this.name] = this.defaultValue;
      if (this.protoName === void 0) this.protoName = this.name;
      if (this.jsonName === void 0) this.jsonName = util.jsonName(this.protoName);
      return ReflectionObject.prototype.resolve.call(this);
    };
    Field.prototype._inferLegacyProtoFeatures = function _inferLegacyProtoFeatures(edition) {
      if (edition !== 'proto2' && edition !== 'proto3') return {};
      var features = {};
      if (this.rule === 'required') features.field_presence = 'LEGACY_REQUIRED';
      if (this.parent && types.defaults[this.type] === void 0) {
        var type = this.parent.get(this.type.split('.').pop());
        if (type && type instanceof Type && type.group) features.message_encoding = 'DELIMITED';
      }
      if (this.getOption('packed') === true) features.repeated_field_encoding = 'PACKED';
      else if (this.getOption('packed') === false) features.repeated_field_encoding = 'EXPANDED';
      return features;
    };
    Field.prototype._resolveFeatures = function _resolveFeatures(edition) {
      return ReflectionObject.prototype._resolveFeatures.call(this, this._edition || edition);
    };
    Field.d = function decorateField(fieldId, fieldType, fieldRule, defaultValue) {
      if (typeof fieldType === 'function') fieldType = util.decorateType(fieldType).name;
      else if (fieldType && typeof fieldType === 'object')
        fieldType = util.decorateEnum(fieldType).name;
      return function fieldDecorator(prototype, fieldName) {
        util
          .decorateType(prototype.constructor)
          .add(new Field(fieldName, fieldId, fieldType, fieldRule, { default: defaultValue }));
      };
    };
    Field._configure = function configure(Type_) {
      Type = Type_;
    };
  });
  var require_oneof = __commonJSMin((exports, module) => {
    module.exports = OneOf;
    var ReflectionObject = require_object();
    OneOf.prototype = Object.create(ReflectionObject.prototype, {
      constructor: {
        value: OneOf,
        writable: true,
        enumerable: false,
        configurable: true,
      },
    });
    OneOf.className = 'OneOf';
    var Field = require_field();
    var util = require_util();
    function OneOf(name, fieldNames, options, comment) {
      if (!Array.isArray(fieldNames)) {
        options = fieldNames;
        fieldNames = void 0;
      }
      ReflectionObject.call(this, name, options);
      if (!(fieldNames === void 0 || Array.isArray(fieldNames)))
        throw TypeError('fieldNames must be an Array');
      this.oneof = fieldNames || [];
      this.fieldsArray = [];
      this.comment = comment;
    }
    OneOf.fromJSON = function fromJSON(name, json) {
      return new OneOf(name, json.oneof, json.options, json.comment);
    };
    OneOf.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        'options',
        this.options,
        'oneof',
        this.oneof,
        'comment',
        keepComments ? this.comment : void 0,
      ]);
    };
    function addFieldsToParent(oneof) {
      if (oneof.parent) {
        for (var i = 0; i < oneof.fieldsArray.length; ++i)
          if (!oneof.fieldsArray[i].parent) oneof.parent.add(oneof.fieldsArray[i]);
      }
    }
    OneOf.prototype.add = function add(field) {
      if (!(field instanceof Field)) throw TypeError('field must be a Field');
      if (field.parent && field.parent !== this.parent) field.parent.remove(field);
      this.oneof.push(field.name);
      this.fieldsArray.push(field);
      field.partOf = this;
      addFieldsToParent(this);
      return this;
    };
    OneOf.prototype.remove = function remove(field) {
      if (!(field instanceof Field)) throw TypeError('field must be a Field');
      var index = this.fieldsArray.indexOf(field);
      if (index < 0) throw Error(field + ' is not a member of ' + this);
      this.fieldsArray.splice(index, 1);
      index = this.oneof.indexOf(field.name);
      if (index > -1) this.oneof.splice(index, 1);
      field.partOf = null;
      return this;
    };
    OneOf.prototype.onAdd = function onAdd(parent) {
      ReflectionObject.prototype.onAdd.call(this, parent);
      var self = this;
      for (var i = 0; i < this.oneof.length; ++i) {
        var field = parent.get(this.oneof[i]);
        if (field && !field.partOf) {
          field.partOf = self;
          self.fieldsArray.push(field);
        }
      }
      addFieldsToParent(this);
    };
    OneOf.prototype.onRemove = function onRemove(parent) {
      for (var i = 0, field; i < this.fieldsArray.length; ++i)
        if ((field = this.fieldsArray[i]).parent) field.parent.remove(field);
      ReflectionObject.prototype.onRemove.call(this, parent);
    };
    Object.defineProperty(OneOf.prototype, 'isProto3Optional', {
      get: function () {
        if (this.fieldsArray == null || this.fieldsArray.length !== 1) return false;
        var field = this.fieldsArray[0];
        return field.options != null && field.options['proto3_optional'] === true;
      },
    });
    OneOf.d = function decorateOneOf() {
      var fieldNames = new Array(arguments.length),
        index = 0;
      while (index < arguments.length) fieldNames[index] = arguments[index++];
      return function oneOfDecorator(prototype, oneofName) {
        util.decorateType(prototype.constructor).add(new OneOf(oneofName, fieldNames));
        Object.defineProperty(prototype, oneofName, {
          get: util.oneOfGetter(fieldNames),
          set: util.oneOfSetter(fieldNames),
        });
      };
    };
  });
  var require_object = __commonJSMin((exports, module) => {
    module.exports = ReflectionObject;
    ReflectionObject.className = 'ReflectionObject';
    var OneOf = require_oneof();
    var util = require_util();
    var Root;
    var proto2Defaults = {
      enum_type: 'CLOSED',
      field_presence: 'EXPLICIT',
      json_format: 'LEGACY_BEST_EFFORT',
      message_encoding: 'LENGTH_PREFIXED',
      repeated_field_encoding: 'EXPANDED',
      utf8_validation: 'NONE',
      enforce_naming_style: 'STYLE_LEGACY',
      default_symbol_visibility: 'EXPORT_ALL',
    };
    var proto3Defaults = {
      enum_type: 'OPEN',
      field_presence: 'IMPLICIT',
      json_format: 'ALLOW',
      message_encoding: 'LENGTH_PREFIXED',
      repeated_field_encoding: 'PACKED',
      utf8_validation: 'VERIFY',
      enforce_naming_style: 'STYLE_LEGACY',
      default_symbol_visibility: 'EXPORT_ALL',
    };
    var editions2023Defaults = {
      enum_type: 'OPEN',
      field_presence: 'EXPLICIT',
      json_format: 'ALLOW',
      message_encoding: 'LENGTH_PREFIXED',
      repeated_field_encoding: 'PACKED',
      utf8_validation: 'VERIFY',
      enforce_naming_style: 'STYLE_LEGACY',
      default_symbol_visibility: 'EXPORT_ALL',
    };
    var editions2024Defaults = {
      enum_type: 'OPEN',
      field_presence: 'EXPLICIT',
      json_format: 'ALLOW',
      message_encoding: 'LENGTH_PREFIXED',
      repeated_field_encoding: 'PACKED',
      utf8_validation: 'VERIFY',
      enforce_naming_style: 'STYLE2024',
      default_symbol_visibility: 'EXPORT_TOP_LEVEL',
    };
    var editions2026Defaults = {
      enum_type: 'OPEN',
      field_presence: 'EXPLICIT',
      json_format: 'ALLOW',
      message_encoding: 'LENGTH_PREFIXED',
      repeated_field_encoding: 'PACKED',
      utf8_validation: 'VERIFY',
      enforce_naming_style: 'STYLE2026',
      default_symbol_visibility: 'STRICT',
      enforce_proto_limits: 'PROTO_LIMITS2026',
    };
    function ReflectionObject(name, options) {
      if (!util.isString(name)) throw TypeError('name must be a string');
      if (options && !util.isObject(options)) throw TypeError('options must be an object');
      this.options = options;
      this.parsedOptions = null;
      this.name = name;
      this._edition = null;
      this._defaultEdition = 'proto2';
      this._features = {};
      this._featuresResolved = false;
      this.parent = null;
      this.resolved = false;
      this.comment = null;
      this.filename = null;
    }
    Object.defineProperties(ReflectionObject.prototype, {
      root: {
        get: function () {
          var ptr = this;
          while (ptr.parent !== null) ptr = ptr.parent;
          return ptr;
        },
      },
      fullName: {
        get: function () {
          var path = [this.name],
            ptr = this.parent;
          while (ptr) {
            path.unshift(ptr.name);
            ptr = ptr.parent;
          }
          return path.join('.');
        },
      },
    });
    ReflectionObject.prototype.toJSON = function toJSON() {
      throw Error();
    };
    ReflectionObject.prototype.onAdd = function onAdd(parent) {
      if (this.parent && this.parent !== parent) this.parent.remove(this);
      this.parent = parent;
      this.resolved = false;
      var root = parent.root;
      if (root instanceof Root) root._handleAdd(this);
    };
    ReflectionObject.prototype.onRemove = function onRemove(parent) {
      var root = parent.root;
      if (root instanceof Root) root._handleRemove(this);
      this.parent = null;
      this.resolved = false;
    };
    ReflectionObject.prototype.resolve = function resolve() {
      if (this.resolved) return this;
      if (this.root instanceof Root) this.resolved = true;
      return this;
    };
    ReflectionObject.prototype._resolveFeaturesRecursive = function _resolveFeaturesRecursive(
      edition,
    ) {
      return this._resolveFeatures(this._edition || edition);
    };
    ReflectionObject.prototype._resolveFeatures = function _resolveFeatures(edition) {
      if (this._featuresResolved) return;
      var defaults = {};
      if (!edition) throw new Error('Unknown edition for ' + this.fullName);
      var protoFeatures = util.merge(
        {},
        this.options && this.options.features,
        this._inferLegacyProtoFeatures(edition),
      );
      if (this._edition) {
        if (edition === 'proto2') defaults = Object.assign({}, proto2Defaults);
        else if (edition === 'proto3') defaults = Object.assign({}, proto3Defaults);
        else if (edition === '2023') defaults = Object.assign({}, editions2023Defaults);
        else if (edition === '2024') defaults = Object.assign({}, editions2024Defaults);
        else if (edition === '2026') defaults = Object.assign({}, editions2026Defaults);
        else throw new Error('Unknown edition: ' + edition);
        this._features = util.merge(defaults, protoFeatures);
      } else if (this.partOf instanceof OneOf) {
        var lexicalParentFeaturesCopy = util.merge({}, this.partOf._features);
        this._features = util.merge(lexicalParentFeaturesCopy, protoFeatures);
      } else if (this.declaringField) {
      } else if (this.parent) {
        var parentFeaturesCopy = util.merge({}, this.parent._features);
        this._features = util.merge(parentFeaturesCopy, protoFeatures);
      } else throw new Error('Unable to find a parent for ' + this.fullName);
      if (this.extensionField) this.extensionField._features = this._features;
      this._featuresResolved = true;
    };
    ReflectionObject.prototype._inferLegacyProtoFeatures = function _inferLegacyProtoFeatures() {
      return {};
    };
    ReflectionObject.prototype.getOption = function getOption(name) {
      if (this.options && Object.prototype.hasOwnProperty.call(this.options, name))
        return this.options[name];
    };
    ReflectionObject.prototype.setOption = function setOption(name, value, ifNotSet) {
      if (name === '__proto__') return this;
      if (!this.options) this.options = {};
      if (/^features\./.test(name)) util.setProperty(this.options, name, value, ifNotSet);
      else {
        var prev = this.getOption(name);
        if (!ifNotSet || prev === void 0) {
          if (prev !== value) this.resolved = false;
          this.options[name] = value;
        }
      }
      return this;
    };
    ReflectionObject.prototype.setParsedOption = function setParsedOption(name, value, propName) {
      if (name === '__proto__') return this;
      if (!this.parsedOptions) this.parsedOptions = [];
      var parsedOptions = this.parsedOptions;
      if (propName) {
        var opt = parsedOptions.find(function (opt) {
          return Object.prototype.hasOwnProperty.call(opt, name);
        });
        if (opt) {
          var newValue = opt[name];
          util.setProperty(newValue, propName, value);
        } else {
          opt = {};
          opt[name] = util.setProperty({}, propName, value);
          parsedOptions.push(opt);
        }
      } else {
        var newOpt = {};
        newOpt[name] = value;
        parsedOptions.push(newOpt);
      }
      return this;
    };
    ReflectionObject.prototype.setOptions = function setOptions(options, ifNotSet) {
      if (options)
        for (var keys = Object.keys(options), i = 0; i < keys.length; ++i)
          this.setOption(keys[i], options[keys[i]], ifNotSet);
      return this;
    };
    Object.defineProperty(ReflectionObject.prototype, 'toString', {
      value: function toString() {
        var className = this.constructor.className,
          fullName = this.fullName;
        if (fullName.length) return className + ' ' + fullName;
        return className;
      },
      writable: true,
      enumerable: false,
      configurable: true,
    });
    ReflectionObject.prototype._editionToJSON = function _editionToJSON() {
      if (!this._edition || this._edition === 'proto3') return;
      return this._edition;
    };
    ReflectionObject._configure = function (Root_) {
      Root = Root_;
    };
  });
  var require_enum = __commonJSMin((exports, module) => {
    module.exports = Enum;
    var ReflectionObject = require_object();
    Enum.prototype = Object.create(ReflectionObject.prototype, {
      constructor: {
        value: Enum,
        writable: true,
        enumerable: false,
        configurable: true,
      },
    });
    Enum.className = 'Enum';
    var Namespace = require_namespace();
    var util = require_util();
    function Enum(name, values, options, comment, comments, valuesOptions) {
      ReflectionObject.call(this, name, options);
      if (values && typeof values !== 'object') throw TypeError('values must be an object');
      this.valuesById = Object.create(null);
      this.values = Object.create(this.valuesById);
      this.comment = comment;
      this.comments = comments || {};
      this.valuesOptions = valuesOptions;
      this._valuesFeatures = {};
      this.reserved = void 0;
      this.visibility = void 0;
      if (values) {
        for (var keys = Object.keys(values), i = 0; i < keys.length; ++i)
          if (keys[i] !== '__proto__' && typeof values[keys[i]] === 'number') {
            this.values[keys[i]] = values[keys[i]];
            if (this.valuesById[values[keys[i]]] === void 0)
              this.valuesById[values[keys[i]]] = keys[i];
          }
      }
    }
    Enum.prototype._resolveFeatures = function _resolveFeatures(edition) {
      edition = this._edition || edition;
      ReflectionObject.prototype._resolveFeatures.call(this, edition);
      Object.keys(this.values).forEach((key) => {
        var parentFeaturesCopy = util.merge({}, this._features);
        this._valuesFeatures[key] = util.merge(
          parentFeaturesCopy,
          (this.valuesOptions && this.valuesOptions[key] && this.valuesOptions[key].features) || {},
        );
      });
      return this;
    };
    Enum.fromJSON = function fromJSON(name, json) {
      var enm = new Enum(
        name,
        json.values,
        json.options,
        json.comment,
        json.comments,
        json.valuesOptions,
      );
      enm.reserved = json.reserved;
      if (json.visibility) enm.visibility = json.visibility;
      if (json.edition) enm._edition = json.edition;
      enm._defaultEdition = 'proto3';
      return enm;
    };
    Enum.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        'edition',
        this._editionToJSON(),
        'options',
        this.options,
        'valuesOptions',
        this.valuesOptions,
        'values',
        this.values,
        'reserved',
        this.reserved && this.reserved.length ? this.reserved : void 0,
        'visibility',
        this.visibility,
        'comment',
        keepComments ? this.comment : void 0,
        'comments',
        keepComments ? this.comments : void 0,
      ]);
    };
    Enum.prototype.add = function add(name, id, comment, options) {
      if (!util.isString(name)) throw TypeError('name must be a string');
      if (!util.isInteger(id)) throw TypeError('id must be an integer');
      if (name === '__proto__') return this;
      if (this.values[name] !== void 0) throw Error("duplicate name '" + name + "' in " + this);
      if (this.isReservedId(id)) throw Error('id ' + id + ' is reserved in ' + this);
      if (this.isReservedName(name)) throw Error("name '" + name + "' is reserved in " + this);
      if (this.valuesById[id] !== void 0) {
        if (!(this.options && this.options.allow_alias))
          throw Error('duplicate id ' + id + ' in ' + this);
        this.values[name] = id;
      } else this.valuesById[(this.values[name] = id)] = name;
      if (options) {
        if (this.valuesOptions === void 0) this.valuesOptions = {};
        this.valuesOptions[name] = options || null;
      }
      this.comments[name] = comment || null;
      return this;
    };
    Enum.prototype.remove = function remove(name) {
      if (!util.isString(name)) throw TypeError('name must be a string');
      var val = this.values[name];
      if (val == null) throw Error("name '" + name + "' does not exist in " + this);
      delete this.valuesById[val];
      delete this.values[name];
      delete this.comments[name];
      if (this.valuesOptions) delete this.valuesOptions[name];
      return this;
    };
    Enum.prototype.isReservedId = function isReservedId(id) {
      return Namespace.isReservedId(this.reserved, id);
    };
    Enum.prototype.isReservedName = function isReservedName(name) {
      return Namespace.isReservedName(this.reserved, name);
    };
  });
  var require_encoder = __commonJSMin((exports, module) => {
    module.exports = encoder;
    var Enum = require_enum();
    var types = require_types();
    var util = require_util();
    function genTypePartial(gen, field, fieldIndex, ref) {
      return field.delimited
        ? gen(
            'types[%i].encode(%s,w.uint32(%i),q+1).uint32(%i)',
            fieldIndex,
            ref,
            ((field.id << 3) | 3) >>> 0,
            ((field.id << 3) | 4) >>> 0,
          )
        : gen(
            'types[%i].encode(%s,w.uint32(%i).fork(),q+1).ldelim()',
            fieldIndex,
            ref,
            ((field.id << 3) | 2) >>> 0,
          );
    }
    function encoder(mtype) {
      var gen = util.codegen(['m', 'w', 'q'])('if(!w)')('w=Writer.create()')(
        'if(q===undefined)q=0',
      )('if(q>util.recursionLimit)')('throw Error("max depth exceeded")');
      var i, ref;
      var fields = mtype.fieldsArray.slice().sort(util.compareFieldsById);
      for (var i = 0; i < fields.length; ++i) {
        var field = fields[i].resolve(),
          index = mtype._fieldsArray.indexOf(field),
          type = field.resolvedType instanceof Enum ? 'int32' : field.type,
          wireType = types.basic[type];
        ref = 'm' + util.safeProp(field.name);
        if (field.map) {
          gen(
            'if(%s!=null&&Object.hasOwnProperty.call(m,%j)){',
            ref,
            field.name,
          )('for(var ks=Object.keys(%s),i=0;i<ks.length;++i){', ref);
          if (field.keyType === 'bool')
            gen(
              'w.uint32(%i).fork().uint32(%i).bool(util.boolFromKey(ks[i]))',
              ((field.id << 3) | 2) >>> 0,
              8 | types.mapKey[field.keyType],
            );
          else if (types.long[field.keyType] !== void 0)
            gen(
              'w.uint32(%i).fork().uint32(%i).%s(util.longFromKey(ks[i],%j))',
              ((field.id << 3) | 2) >>> 0,
              8 | types.mapKey[field.keyType],
              field.keyType,
              field.keyType === 'uint64' || field.keyType === 'fixed64',
            );
          else
            gen(
              'w.uint32(%i).fork().uint32(%i).%s(ks[i])',
              ((field.id << 3) | 2) >>> 0,
              8 | types.mapKey[field.keyType],
              field.keyType,
            );
          if (wireType === void 0)
            gen(
              'types[%i].encode(%s[ks[i]],w.uint32(18).fork(),q+1).ldelim().ldelim()',
              index,
              ref,
            );
          else gen('.uint32(%i).%s(%s[ks[i]]).ldelim()', 16 | wireType, type, ref);
          gen('}')('}');
        } else if (field.repeated) {
          gen('if(%s!=null&&%s.length){', ref, ref);
          if (field.packed && types.packed[type] !== void 0)
            gen('w.uint32(%i).%ss(%s)', ((field.id << 3) | 2) >>> 0, type, ref);
          else {
            gen('for(var i=0;i<%s.length;++i)', ref);
            if (wireType === void 0) genTypePartial(gen, field, index, ref + '[i]');
            else gen('w.uint32(%i).%s(%s[i])', ((field.id << 3) | wireType) >>> 0, type, ref);
          }
          gen('}');
        } else {
          if (!field.required)
            if (
              field.hasPresence ||
              !(field.resolvedType instanceof Enum || types.basic[type] !== void 0)
            )
              gen('if(%s!=null&&Object.hasOwnProperty.call(m,%j))', ref, field.name);
            else if (field.resolvedType instanceof Enum)
              gen(
                'if(%s!=null&&Object.hasOwnProperty.call(m,%j)&&%s!==%j)',
                ref,
                field.name,
                ref,
                field.typeDefault,
              );
            else if (type === 'bool')
              gen(
                'if(%s!=null&&Object.hasOwnProperty.call(m,%j)&&%s!==false)',
                ref,
                field.name,
                ref,
              );
            else if (type === 'string')
              gen('if(%s!=null&&Object.hasOwnProperty.call(m,%j)&&%s!=="")', ref, field.name, ref);
            else if (type === 'bytes')
              gen(
                'if(%s!=null&&Object.hasOwnProperty.call(m,%j)&&%s.length)',
                ref,
                field.name,
                ref,
              );
            else if (type === 'double' || type === 'float')
              gen(
                'if(%s!=null&&Object.hasOwnProperty.call(m,%j)&&!Object.is(%s,0))',
                ref,
                field.name,
                ref,
              );
            else if (types.long[type] !== void 0)
              gen(
                'if(%s!=null&&Object.hasOwnProperty.call(m,%j)&&(typeof %s==="object"?%s.low||%s.high:%s!==0))',
                ref,
                field.name,
                ref,
                ref,
                ref,
                ref,
              );
            else
              gen('if(%s!=null&&Object.hasOwnProperty.call(m,%j)&&%s!==0)', ref, field.name, ref);
          if (wireType === void 0) genTypePartial(gen, field, index, ref);
          else gen('w.uint32(%i).%s(%s)', ((field.id << 3) | wireType) >>> 0, type, ref);
        }
      }
      return gen('if(m.$unknowns!=null&&Object.hasOwnProperty.call(m,"$unknowns"))')(
        'for(var i=0;i<m.$unknowns.length;++i)',
      )('w.raw(m.$unknowns[i])')('return w');
    }
  });
  var require_index_light = __commonJSMin((exports, module) => {
    exports = module.exports = require_index_minimal();
    exports.build = 'light';
    function load(filename, root, callback) {
      if (typeof root === 'function') {
        callback = root;
        root = new exports.Root();
      } else if (!root) root = new exports.Root();
      return root.load(filename, callback);
    }
    exports.load = load;
    function loadSync(filename, root) {
      if (!root) root = new exports.Root();
      return root.loadSync(filename);
    }
    exports.loadSync = loadSync;
    exports.encoder = require_encoder();
    exports.decoder = require_decoder();
    exports.verifier = require_verifier();
    exports.converter = require_converter();
    exports.ReflectionObject = require_object();
    exports.Namespace = require_namespace();
    exports.Root = require_root();
    exports.Enum = require_enum();
    exports.Type = require_type();
    exports.Field = require_field();
    exports.OneOf = require_oneof();
    exports.MapField = require_mapfield();
    exports.Service = require_service();
    exports.Method = require_method();
    exports.Message = require_message();
    exports.wrappers = require_wrappers();
    exports.types = require_types();
    exports.util = require_util();
    exports.ReflectionObject._configure(exports.Root);
    exports.Namespace._configure(exports.Type, exports.Service, exports.Enum);
    exports.Root._configure(exports.Type, void 0, {});
    exports.Field._configure(exports.Type);
  });
  var require_tokenize = __commonJSMin((exports, module) => {
    module.exports = tokenize;
    var delimRe = /[\s{}=;:[\],'"()<>]/g;
    var stringDoubleRe = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g;
    var stringSingleRe = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g;
    var setCommentRe = /^ *[*/]+ */;
    var setCommentAltRe = /^\s*\*?\/*/;
    var setCommentSplitRe = /\n/g;
    var whitespaceRe = /\s/;
    var unescapeRe = /\\(.?)/g;
    var unescapeMap = {
      0: '\0',
      r: '\r',
      n: '\n',
      t: '	',
    };
    function unescape(str) {
      return str.replace(unescapeRe, function ($0, $1) {
        switch ($1) {
          case '\\':
          case '':
            return $1;
          default:
            return unescapeMap[$1] || '';
        }
      });
    }
    tokenize.unescape = unescape;
    function tokenize(source, alternateCommentMode) {
      source = source.toString();
      var offset = 0,
        length = source.length,
        line = 1,
        lastCommentLine = 0,
        comments = {};
      var stack = [];
      var stringDelim = null;
      function illegal(subject) {
        return Error('illegal ' + subject + ' (line ' + line + ')');
      }
      function readString() {
        var re = stringDelim === "'" ? stringSingleRe : stringDoubleRe;
        re.lastIndex = offset - 1;
        var match = re.exec(source);
        if (!match) throw illegal('string');
        offset = re.lastIndex;
        push(stringDelim);
        stringDelim = null;
        return unescape(match[1]);
      }
      function charAt(pos) {
        return source.charAt(pos);
      }
      function setComment(start, end, isLeading) {
        var comment = {
          type: source.charAt(start++),
          lineEmpty: false,
          leading: isLeading,
        };
        var lookback;
        if (alternateCommentMode) lookback = 2;
        else lookback = 3;
        var commentOffset = start - lookback,
          c;
        do
          if (--commentOffset < 0 || (c = source.charAt(commentOffset)) === '\n') {
            comment.lineEmpty = true;
            break;
          }
        while (c === ' ' || c === '	');
        var lines = source.substring(start, end).split(setCommentSplitRe);
        for (var i = 0; i < lines.length; ++i)
          lines[i] = lines[i]
            .replace(alternateCommentMode ? setCommentAltRe : setCommentRe, '')
            .trim();
        comment.text = lines.join('\n').trim();
        comments[line] = comment;
        lastCommentLine = line;
      }
      function isDoubleSlashCommentLine(startOffset) {
        var endOffset = findEndOfLine(startOffset);
        var lineText = source.substring(startOffset, endOffset);
        return /^\s*\/\//.test(lineText);
      }
      function findEndOfLine(cursor) {
        var endOffset = cursor;
        while (endOffset < length && charAt(endOffset) !== '\n') endOffset++;
        return endOffset;
      }
      function next() {
        if (stack.length > 0) return stack.shift();
        if (stringDelim) return readString();
        var repeat,
          prev,
          curr,
          start,
          isDoc,
          nextLineIsComment,
          isLeadingComment = offset === 0;
        do {
          if (offset === length) return null;
          repeat = false;
          while (whitespaceRe.test((curr = charAt(offset)))) {
            if (curr === '\n') {
              isLeadingComment = true;
              ++line;
            }
            if (++offset === length) return null;
          }
          if (charAt(offset) === '/') {
            if (++offset === length) throw illegal('comment');
            if (charAt(offset) === '/') {
              if (!alternateCommentMode) {
                isDoc = charAt((start = offset + 1)) === '/';
                while (charAt(++offset) !== '\n') if (offset === length) return null;
                ++offset;
                if (isDoc) {
                  setComment(start, offset - 1, isLeadingComment);
                  isLeadingComment = true;
                }
                ++line;
                repeat = true;
              } else {
                start = offset;
                isDoc = false;
                if (isDoubleSlashCommentLine(offset - 1)) {
                  isDoc = true;
                  do {
                    offset = findEndOfLine(offset);
                    if (offset === length) break;
                    offset++;
                    if (!isLeadingComment) break;
                    nextLineIsComment = isDoubleSlashCommentLine(offset);
                    if (nextLineIsComment) line++;
                  } while (nextLineIsComment);
                } else offset = Math.min(length, findEndOfLine(offset) + 1);
                if (isDoc) {
                  setComment(start, offset, isLeadingComment);
                  isLeadingComment = true;
                }
                line++;
                repeat = true;
              }
            } else if ((curr = charAt(offset)) === '*') {
              start = offset + 1;
              isDoc = alternateCommentMode || charAt(start) === '*';
              do {
                if (curr === '\n') ++line;
                if (++offset === length) throw illegal('comment');
                prev = curr;
                curr = charAt(offset);
              } while (prev !== '*' || curr !== '/');
              ++offset;
              if (isDoc) {
                setComment(start, offset - 2, isLeadingComment);
                isLeadingComment = true;
              }
              repeat = true;
            } else return '/';
          }
        } while (repeat);
        var end = offset;
        delimRe.lastIndex = 0;
        if (!delimRe.test(charAt(end++))) while (end < length && !delimRe.test(charAt(end))) ++end;
        var token = source.substring(offset, (offset = end));
        if (token === '"' || token === "'") stringDelim = token;
        return token;
      }
      function push(token) {
        stack.push(token);
      }
      function peek() {
        if (!stack.length) {
          var token = next();
          if (token === null) return null;
          push(token);
        }
        return stack[0];
      }
      function skip(expected, optional) {
        var actual = peek();
        if (actual === expected) {
          next();
          return true;
        }
        if (!optional) throw illegal("token '" + actual + "', '" + expected + "' expected");
        return false;
      }
      function cmnt(trailingLine) {
        var ret = null;
        var comment;
        if (trailingLine === void 0) {
          comment = comments[line - 1];
          delete comments[line - 1];
          if (comment && (alternateCommentMode || comment.type === '*' || comment.lineEmpty))
            ret = comment.leading ? comment.text : null;
        } else {
          if (lastCommentLine < trailingLine) peek();
          comment = comments[trailingLine];
          delete comments[trailingLine];
          if (comment && !comment.lineEmpty && (alternateCommentMode || comment.type === '/'))
            ret = comment.leading ? null : comment.text;
        }
        return ret;
      }
      return Object.defineProperty(
        {
          next,
          peek,
          push,
          skip,
          cmnt,
        },
        'line',
        {
          get: function () {
            return line;
          },
        },
      );
    }
  });
  var require_parse = __commonJSMin((exports, module) => {
    module.exports = parse;
    parse.filename = null;
    parse.defaults = { keepCase: false };
    var tokenize = require_tokenize();
    var Root = require_root();
    var Type = require_type();
    var Field = require_field();
    var MapField = require_mapfield();
    var OneOf = require_oneof();
    var Enum = require_enum();
    var Service = require_service();
    var Method = require_method();
    var ReflectionObject = require_object();
    var types = require_types();
    var util = require_util();
    var base10Re = /^[1-9][0-9]*$/;
    var base10NegRe = /^-?[1-9][0-9]*$/;
    var base16Re = /^0[x][0-9a-fA-F]+$/;
    var base16NegRe = /^-?0[x][0-9a-fA-F]+$/;
    var base8Re = /^0[0-7]+$/;
    var base8NegRe = /^-?0[0-7]+$/;
    var integerTypeRe = /^(?:u?int|sint|s?fixed)(?:32|64)$/;
    var unsignedTypeRe = /^(?:uint|fixed)(?:32|64)$/;
    var numberRe = util.patterns.numberRe;
    var nameRe = /^[a-zA-Z_][a-zA-Z_0-9]*$/;
    var typeRefRe = util.patterns.typeRefRe;
    var maxFieldId = 536870911;
    var maxEnumId = 2147483647;
    function parse(source, root, options) {
      if (!(root instanceof Root)) {
        options = root;
        root = new Root();
      }
      if (!options) options = parse.defaults;
      var preferTrailingComment = options.preferTrailingComment || false;
      var tn = tokenize(source, options.alternateCommentMode || false),
        next = tn.next,
        push = tn.push,
        peek = tn.peek,
        skip = tn.skip,
        cmnt = tn.cmnt;
      var head = true,
        pkg,
        imports,
        weakImports,
        edition = 'proto2';
      var ptr = root;
      var topLevelObjects = [];
      var topLevelOptions = {};
      var applyCase = options.keepCase
        ? function (name) {
            return name;
          }
        : util.camelCase;
      function resolveFileFeatures() {
        topLevelObjects.forEach((obj) => {
          obj._edition = edition;
          Object.keys(topLevelOptions).forEach((opt) => {
            if (obj.getOption(opt) !== void 0) return;
            obj.setOption(opt, topLevelOptions[opt], true);
          });
        });
      }
      function illegal(token, name, insideTryCatch) {
        var filename = parse.filename;
        if (!insideTryCatch) parse.filename = null;
        return Error(
          'illegal ' +
            (name || 'token') +
            " '" +
            token +
            "' (" +
            (filename ? filename + ', ' : '') +
            'line ' +
            tn.line +
            ')',
        );
      }
      function readString() {
        var values = [],
          token;
        do {
          if ((token = next()) !== '"' && token !== "'") throw illegal(token);
          values.push(next());
          skip(token);
          token = peek();
        } while (token === '"' || token === "'");
        return values.join('');
      }
      function readValue(acceptTypeRef) {
        var token = next();
        switch (token) {
          case "'":
          case '"':
            push(token);
            return readString();
          case 'true':
          case 'TRUE':
            return true;
          case 'false':
          case 'FALSE':
            return false;
        }
        try {
          return parseNumber(token, true);
        } catch (e) {
          if (acceptTypeRef && typeRefRe.test(token)) return token;
          throw illegal(token, 'value');
        }
      }
      function readRanges(target, acceptStrings, max, acceptNegative) {
        var token, start;
        do
          if (acceptStrings && ((token = peek()) === '"' || token === "'")) {
            var str = readString();
            target.push(str);
            if (edition >= 2023) throw illegal(str, 'id');
          } else
            try {
              target.push([
                (start = parseId(next(), acceptNegative, max)),
                skip('to', true) ? parseId(next(), acceptNegative, max) : start,
              ]);
            } catch (err) {
              if (acceptStrings && typeRefRe.test(token) && edition >= 2023) target.push(token);
              else throw err;
            }
        while (skip(',', true));
        var dummy = { options: void 0 };
        dummy.setOption = function (name, value) {
          if (this.options === void 0) this.options = {};
          this.options[name] = value;
        };
        ifBlock(
          dummy,
          function parseRange_block(token) {
            if (token === 'option') {
              parseOption(dummy, token);
              skip(';');
            } else throw illegal(token);
          },
          function parseRange_line() {
            parseInlineOptions(dummy);
          },
        );
      }
      function parseNumber(token, insideTryCatch) {
        var sign = 1;
        if (token.charAt(0) === '-') {
          sign = -1;
          token = token.substring(1);
        }
        switch (token) {
          case 'inf':
          case 'INF':
          case 'Inf':
            return sign * Infinity;
          case 'nan':
          case 'NAN':
          case 'Nan':
          case 'NaN':
            return NaN;
          case '0':
            return sign * 0;
        }
        if (base10Re.test(token)) return sign * parseInt(token, 10);
        if (base16Re.test(token)) return sign * parseInt(token, 16);
        if (base8Re.test(token)) return sign * parseInt(token, 8);
        if (numberRe.test(token)) return sign * parseFloat(token);
        throw illegal(token, 'number', insideTryCatch);
      }
      function parseInteger(token, acceptNegative, name) {
        if (token === null) throw illegal(token, 'end of input');
        if (!acceptNegative && token.charAt(0) === '-') throw illegal(token, name || 'integer');
        if (token === '0' || token === '-0') return 0;
        var value;
        if (base10NegRe.test(token)) value = parseInt(token, 10);
        else if (base16NegRe.test(token)) value = parseInt(token, 16);
        else if (base8NegRe.test(token)) value = parseInt(token, 8);
        else throw illegal(token, name || 'integer');
        return value || 0;
      }
      function parseId(token, acceptNegative, max) {
        switch (token) {
          case 'max':
          case 'MAX':
          case 'Max':
            return max || maxFieldId;
        }
        return parseInteger(token, acceptNegative, 'id');
      }
      function parsePackage() {
        if (pkg !== void 0) throw illegal('package');
        pkg = next();
        if (pkg === null || !typeRefRe.test(pkg)) throw illegal(pkg, 'name');
        ptr = ptr.define(pkg);
        skip(';');
      }
      function parseImport() {
        var token = peek();
        var whichImports;
        switch (token) {
          case 'option':
            if (edition < '2024') throw illegal('option');
            next();
            readString();
            skip(';');
            return;
          case 'weak':
            whichImports = weakImports || (weakImports = []);
            next();
            break;
          case 'public':
            next();
          default:
            whichImports = imports || (imports = []);
        }
        token = readString();
        skip(';');
        whichImports.push(token);
      }
      function parseSyntax() {
        skip('=');
        edition = readString();
        if (edition < 2023) throw illegal(edition, 'syntax');
        skip(';');
      }
      function parseEdition() {
        skip('=');
        edition = readString();
        if (!['2023', '2024', '2026'].includes(edition)) throw illegal(edition, 'edition');
        skip(';');
      }
      function parseCommon(parent, token, depth) {
        if (depth === void 0) depth = 0;
        switch (token) {
          case 'option':
            parseOption(parent, token);
            skip(';');
            return true;
          case 'message':
            parseType(parent, token, depth + 1);
            return true;
          case 'enum':
            parseEnum(parent, token);
            return true;
          case 'export':
          case 'local':
            if (edition < '2024') return false;
            var visibility = token;
            token = next();
            if (token === 'export' || token === 'local') return false;
            if (token !== 'message' && token !== 'enum') return false;
            (token === 'message'
              ? parseType(parent, token, depth + 1)
              : parseEnum(parent, token)
            ).visibility = visibility;
            return true;
          case 'service':
            parseService(parent, token, depth + 1);
            return true;
          case 'extend':
            parseExtension(parent, token, depth);
            return true;
        }
        return false;
      }
      function ifBlock(obj, fnIf, fnElse) {
        var trailingLine = tn.line;
        if (obj) {
          if (typeof obj.comment !== 'string') obj.comment = cmnt();
          obj.filename = parse.filename;
        }
        if (skip('{', true)) {
          var token;
          while ((token = next()) !== '}') fnIf(token);
          skip(';', true);
        } else {
          if (fnElse) fnElse();
          skip(';');
          if (obj && (typeof obj.comment !== 'string' || preferTrailingComment))
            obj.comment = cmnt(trailingLine) || obj.comment;
        }
      }
      function parseType(parent, token, depth) {
        if (depth === void 0) depth = 0;
        if (depth > util.nestingLimit) throw Error('max depth exceeded');
        if ((token = next()) === null || !nameRe.test(token)) throw illegal(token, 'type name');
        var type = new Type(token);
        ifBlock(type, function parseType_block(token) {
          if (parseCommon(type, token, depth)) return;
          switch (token) {
            case ';':
              break;
            case 'map':
              parseMapField(type, token);
              break;
            case 'required':
              if (edition !== 'proto2') throw illegal(token);
            case 'repeated':
              parseField(type, token, void 0, depth + 1);
              break;
            case 'optional':
              if (edition === 'proto3') parseField(type, 'proto3_optional', void 0, depth + 1);
              else if (edition !== 'proto2') throw illegal(token);
              else parseField(type, 'optional', void 0, depth + 1);
              break;
            case 'oneof':
              parseOneOf(type, token, depth + 1);
              break;
            case 'extensions':
              readRanges(type.extensions || (type.extensions = []));
              break;
            case 'reserved':
              readRanges(type.reserved || (type.reserved = []), true);
              break;
            default:
              if (edition === 'proto2' || !typeRefRe.test(token)) throw illegal(token);
              push(token);
              parseField(type, 'optional', void 0, depth + 1);
          }
        });
        parent.add(type);
        if (parent === ptr) topLevelObjects.push(type);
        return type;
      }
      function parseField(parent, rule, extend, depth) {
        var type = next();
        if (type === null) throw illegal(type, 'end of input');
        if (type === 'group') {
          parseGroup(parent, rule, extend, depth);
          return;
        }
        while (type.endsWith('.') || (peek() || '').startsWith('.')) {
          var part = next();
          if (part === null) throw illegal(part, 'end of input');
          type += part;
        }
        if (!typeRefRe.test(type)) throw illegal(type, 'type');
        var name = next();
        if (name === null) throw illegal(name, 'end of input');
        if (!nameRe.test(name)) throw illegal(name, 'name');
        var protoName = name;
        name = applyCase(name);
        skip('=');
        var field = new Field(
          name,
          parseId(next()),
          type,
          rule === 'proto3_optional' ? 'optional' : rule,
          extend,
        );
        if (protoName !== name) field.protoName = protoName;
        ifBlock(
          field,
          function parseField_block(token) {
            if (token === 'option') {
              parseOption(field, token);
              skip(';');
            } else throw illegal(token);
          },
          function parseField_line() {
            parseInlineOptions(field);
          },
        );
        if (rule === 'proto3_optional') {
          var oneof = new OneOf('_' + name);
          field.setOption('proto3_optional', true);
          oneof.add(field);
          parent.add(oneof);
        } else parent.add(field);
        if (parent === ptr) topLevelObjects.push(field);
      }
      function parseGroup(parent, rule, extend, depth) {
        if (depth === void 0) depth = 0;
        if (depth > util.nestingLimit) throw Error('max depth exceeded');
        if (edition >= 2023) throw illegal('group');
        var name = next();
        if (name === null || !nameRe.test(name)) throw illegal(name, 'name');
        var fieldName = util.lcFirst(name);
        if (name === fieldName) name = util.ucFirst(name);
        skip('=');
        var id = parseId(next());
        var type = new Type(name);
        type.group = true;
        var field = new Field(fieldName, id, name, rule, extend);
        field.filename = parse.filename;
        ifBlock(type, function parseGroup_block(token) {
          switch (token) {
            case ';':
              break;
            case 'map':
              parseMapField(type);
              break;
            case 'option':
              parseOption(type, token);
              skip(';');
              break;
            case 'required':
            case 'repeated':
              parseField(type, token, void 0, depth + 1);
              break;
            case 'optional':
              if (edition === 'proto3') parseField(type, 'proto3_optional', void 0, depth + 1);
              else parseField(type, 'optional', void 0, depth + 1);
              break;
            case 'message':
              parseType(type, token, depth + 1);
              break;
            case 'enum':
              parseEnum(type, token);
              break;
            case 'reserved':
              readRanges(type.reserved || (type.reserved = []), true);
              break;
            case 'export':
            case 'local':
              if (edition < '2024') throw illegal(token);
              token = next();
              switch (token) {
                case 'message':
                  parseType(type, token, depth + 1);
                  break;
                case 'enum':
                  parseType(type, token, depth + 1);
                  break;
                default:
                  throw illegal(token);
              }
              break;
            default:
              throw illegal(token);
          }
        });
        parent.add(type).add(field);
        if (parent === ptr) {
          topLevelObjects.push(type);
          topLevelObjects.push(field);
        }
      }
      function parseMapField(parent) {
        skip('<');
        var keyType = next();
        if (types.mapKey[keyType] === void 0) throw illegal(keyType, 'type');
        skip(',');
        var valueType = next();
        if (!typeRefRe.test(valueType)) throw illegal(valueType, 'type');
        skip('>');
        var name = next();
        if (name === null || !nameRe.test(name)) throw illegal(name, 'name');
        skip('=');
        var protoName = name;
        name = applyCase(name);
        var field = new MapField(name, parseId(next()), keyType, valueType);
        if (protoName !== name) field.protoName = protoName;
        ifBlock(
          field,
          function parseMapField_block(token) {
            if (token === 'option') {
              parseOption(field, token);
              skip(';');
            } else throw illegal(token);
          },
          function parseMapField_line() {
            parseInlineOptions(field);
          },
        );
        parent.add(field);
      }
      function parseOneOf(parent, token, depth) {
        if ((token = next()) === null || !nameRe.test(token)) throw illegal(token, 'name');
        var oneof = new OneOf(applyCase(token));
        ifBlock(oneof, function parseOneOf_block(token) {
          if (token === 'option') {
            parseOption(oneof, token);
            skip(';');
          } else {
            push(token);
            parseField(oneof, 'optional', void 0, depth);
          }
        });
        parent.add(oneof);
      }
      function parseEnum(parent, token) {
        if ((token = next()) === null || !nameRe.test(token)) throw illegal(token, 'name');
        var enm = new Enum(token),
          values = [];
        ifBlock(enm, function parseEnum_block(token) {
          switch (token) {
            case ';':
              break;
            case 'option':
              parseOption(enm, token);
              skip(';');
              break;
            case 'reserved':
              readRanges(enm.reserved || (enm.reserved = []), true, maxEnumId, true);
              if (enm.reserved === void 0) enm.reserved = [];
              break;
            default:
              values.push(parseEnumValue(token));
          }
        });
        for (var i = 0; i < values.length; ++i)
          enm.add(values[i].name, values[i].id, values[i].comment, values[i].options);
        parent.add(enm);
        if (parent === ptr) topLevelObjects.push(enm);
        return enm;
      }
      function parseEnumValue(token) {
        if (!nameRe.test(token)) throw illegal(token, 'name');
        skip('=');
        var value = parseId(next(), true),
          dummy = { options: void 0 };
        dummy.getOption = function (name) {
          return this.options[name];
        };
        dummy.setOption = function (name, value) {
          ReflectionObject.prototype.setOption.call(dummy, name, value);
        };
        dummy.setParsedOption = function () {};
        ifBlock(
          dummy,
          function parseEnumValue_block(token) {
            if (token === 'option') {
              parseOption(dummy, token);
              skip(';');
            } else throw illegal(token);
          },
          function parseEnumValue_line() {
            parseInlineOptions(dummy);
          },
        );
        return {
          name: token,
          id: value,
          comment: dummy.comment,
          options: dummy.parsedOptions || dummy.options,
        };
      }
      function parseOption(parent, token) {
        var option;
        var propName;
        var isOption = true;
        if (token === 'option') token = next();
        while (token !== '=') {
          if (token === null) throw illegal(token, 'end of input');
          if (token === '(') {
            var parensValue = next();
            skip(')');
            token = '(' + parensValue + ')';
          }
          if (isOption) {
            isOption = false;
            if (token.includes('.') && !token.includes('(')) {
              var tokens = token.split('.');
              option = tokens[0] + '.';
              token = tokens[1];
              continue;
            }
            option = token;
          } else propName = propName ? (propName += token) : token;
          token = next();
        }
        var optionValue = parseOptionValue(parent, propName ? option.concat(propName) : option);
        propName = propName && propName[0] === '.' ? propName.slice(1) : propName;
        option = option && option[option.length - 1] === '.' ? option.slice(0, -1) : option;
        setParsedOption(parent, option, optionValue, propName);
      }
      function parseOptionValue(parent, name, depth) {
        if (depth === void 0) depth = 0;
        if (depth > util.recursionLimit) throw Error('max depth exceeded');
        if (skip('{', true)) {
          var objectResult = {};
          while (!skip('}', true)) {
            token = next();
            var propName;
            if (token === null) throw illegal(token, 'end of input');
            if (token === '[') {
              token = next();
              var slash = token === null ? -1 : token.lastIndexOf('/');
              if (token === null || !typeRefRe.test(slash < 0 ? token : token.slice(slash + 1)))
                throw illegal(token, 'name');
              propName = '[' + token + ']';
              skip(']');
            } else {
              if (!nameRe.test(token)) throw illegal(token, 'name');
              propName = token;
            }
            var value;
            skip(':', true);
            if (peek() === '{') value = parseOptionValue(parent, name + '.' + propName, depth + 1);
            else if (peek() === '[') {
              value = [];
              var lastValue, lastValueIsAggregate;
              if (skip('[', true)) {
                if (!skip(']', true)) {
                  do {
                    lastValueIsAggregate = peek() === '{';
                    lastValue = lastValueIsAggregate
                      ? parseOptionValue(parent, name + '.' + propName, depth + 1)
                      : readValue(true);
                    value.push(lastValue);
                  } while (skip(',', true));
                  skip(']');
                  if (typeof lastValue !== 'undefined') {
                    if (!lastValueIsAggregate) setOption(parent, name + '.' + propName, lastValue);
                  }
                }
              }
            } else {
              value = readValue(true);
              setOption(parent, name + '.' + propName, value);
            }
            var prevValue = Object.prototype.hasOwnProperty.call(objectResult, propName)
              ? objectResult[propName]
              : void 0;
            if (prevValue) value = [].concat(prevValue).concat(value);
            if (propName !== '__proto__') objectResult[propName] = value;
            skip(',', true);
            skip(';', true);
          }
          return objectResult;
        }
        var simpleValue =
          name === 'default' && parent instanceof Field && integerTypeRe.test(parent.type)
            ? parseInteger(next(), !unsignedTypeRe.test(parent.type))
            : readValue(true);
        setOption(parent, name, simpleValue);
        return simpleValue;
      }
      function setOption(parent, name, value) {
        if (ptr === parent && /^features\./.test(name)) {
          topLevelOptions[name] = value;
          return;
        }
        if (name === 'json_name' && parent instanceof Field) parent.jsonName = value;
        if (parent.setOption) parent.setOption(name, value);
      }
      function setParsedOption(parent, name, value, propName) {
        if (parent.setParsedOption) parent.setParsedOption(name, value, propName);
      }
      function parseInlineOptions(parent) {
        if (skip('[', true)) {
          do parseOption(parent, 'option');
          while (skip(',', true));
          skip(']');
        }
        return parent;
      }
      function parseService(parent, token, depth) {
        if (depth === void 0) depth = 0;
        if (depth > util.recursionLimit) throw Error('max depth exceeded');
        if ((token = next()) === null || !nameRe.test(token)) throw illegal(token, 'service name');
        var service = new Service(token);
        ifBlock(service, function parseService_block(token) {
          if (parseCommon(service, token, depth)) return;
          if (token === ';') return;
          if (token === 'rpc') parseMethod(service, token);
          else throw illegal(token);
        });
        parent.add(service);
        if (parent === ptr) topLevelObjects.push(service);
      }
      function parseMethod(parent, token) {
        var commentText = cmnt();
        var type = token;
        if (!nameRe.test((token = next()))) throw illegal(token, 'name');
        var name = token,
          requestType,
          requestStream,
          responseType,
          responseStream;
        skip('(');
        if (skip('stream', true)) requestStream = true;
        if (!typeRefRe.test((token = next()))) throw illegal(token);
        requestType = token;
        skip(')');
        skip('returns');
        skip('(');
        if (skip('stream', true)) responseStream = true;
        if (!typeRefRe.test((token = next()))) throw illegal(token);
        responseType = token;
        skip(')');
        var method = new Method(
          name,
          type,
          requestType,
          responseType,
          requestStream,
          responseStream,
        );
        method.comment = commentText;
        ifBlock(method, function parseMethod_block(token) {
          if (token === ';') return;
          if (token === 'option') {
            parseOption(method, token);
            skip(';');
          } else throw illegal(token);
        });
        parent.add(method);
      }
      function parseExtension(parent, token, depth) {
        if ((token = next()) === null || !typeRefRe.test(token)) throw illegal(token, 'reference');
        var reference = token;
        ifBlock(null, function parseExtension_block(token) {
          switch (token) {
            case 'required':
            case 'repeated':
              parseField(parent, token, reference, depth + 1);
              break;
            case 'optional':
              if (edition === 'proto3') parseField(parent, 'proto3_optional', reference, depth + 1);
              else parseField(parent, 'optional', reference, depth + 1);
              break;
            default:
              if (edition === 'proto2' || !typeRefRe.test(token)) throw illegal(token);
              push(token);
              parseField(parent, 'optional', reference, depth + 1);
          }
        });
      }
      var token;
      while ((token = next()) !== null)
        switch (token) {
          case ';':
            break;
          case 'package':
            if (!head) throw illegal(token);
            parsePackage();
            break;
          case 'import':
            parseImport();
            break;
          case 'syntax':
            if (!head) throw illegal(token);
            parseSyntax();
            break;
          case 'edition':
            if (!head) throw illegal(token);
            parseEdition();
            break;
          case 'option':
            parseOption(ptr, token);
            skip(';', true);
            break;
          default:
            if (parseCommon(ptr, token, 0)) {
              head = false;
              continue;
            }
            throw illegal(token);
        }
      resolveFileFeatures();
      parse.filename = null;
      return {
        package: pkg,
        imports: imports,
        weakImports,
        root,
      };
    }
  });
  var require_common = __commonJSMin((exports, module) => {
    module.exports = common;
    var commonRe = /\/|\./;
    function common(name, json) {
      if (!commonRe.test(name)) {
        name = 'google/protobuf/' + name + '.proto';
        json = { nested: { google: { nested: { protobuf: { nested: json } } } } };
      }
      common[name] = json;
    }
    common('any', {
      Any: {
        fields: {
          type_url: {
            type: 'string',
            id: 1,
          },
          value: {
            type: 'bytes',
            id: 2,
          },
        },
      },
    });
    var timeType;
    common('duration', {
      Duration: (timeType = {
        fields: {
          seconds: {
            type: 'int64',
            id: 1,
          },
          nanos: {
            type: 'int32',
            id: 2,
          },
        },
      }),
    });
    common('timestamp', { Timestamp: timeType });
    common('empty', { Empty: { fields: {} } });
    common('struct', {
      Struct: {
        fields: {
          fields: {
            keyType: 'string',
            type: 'Value',
            id: 1,
          },
        },
      },
      Value: {
        oneofs: {
          kind: {
            oneof: [
              'nullValue',
              'numberValue',
              'stringValue',
              'boolValue',
              'structValue',
              'listValue',
            ],
          },
        },
        fields: {
          nullValue: {
            type: 'NullValue',
            id: 1,
            protoName: 'null_value',
          },
          numberValue: {
            type: 'double',
            id: 2,
            protoName: 'number_value',
          },
          stringValue: {
            type: 'string',
            id: 3,
            protoName: 'string_value',
          },
          boolValue: {
            type: 'bool',
            id: 4,
            protoName: 'bool_value',
          },
          structValue: {
            type: 'Struct',
            id: 5,
            protoName: 'struct_value',
          },
          listValue: {
            type: 'ListValue',
            id: 6,
            protoName: 'list_value',
          },
        },
      },
      NullValue: { values: { NULL_VALUE: 0 } },
      ListValue: {
        fields: {
          values: {
            rule: 'repeated',
            type: 'Value',
            id: 1,
          },
        },
      },
    });
    common('wrappers', {
      DoubleValue: {
        fields: {
          value: {
            type: 'double',
            id: 1,
          },
        },
      },
      FloatValue: {
        fields: {
          value: {
            type: 'float',
            id: 1,
          },
        },
      },
      Int64Value: {
        fields: {
          value: {
            type: 'int64',
            id: 1,
          },
        },
      },
      UInt64Value: {
        fields: {
          value: {
            type: 'uint64',
            id: 1,
          },
        },
      },
      Int32Value: {
        fields: {
          value: {
            type: 'int32',
            id: 1,
          },
        },
      },
      UInt32Value: {
        fields: {
          value: {
            type: 'uint32',
            id: 1,
          },
        },
      },
      BoolValue: {
        fields: {
          value: {
            type: 'bool',
            id: 1,
          },
        },
      },
      StringValue: {
        fields: {
          value: {
            type: 'string',
            id: 1,
          },
        },
      },
      BytesValue: {
        fields: {
          value: {
            type: 'bytes',
            id: 1,
          },
        },
      },
    });
    common('field_mask', {
      FieldMask: {
        fields: {
          paths: {
            rule: 'repeated',
            type: 'string',
            id: 1,
          },
        },
      },
    });
    common.get = function get(file) {
      return common[file] || null;
    };
  });
  var require_src = __commonJSMin((exports, module) => {
    exports = module.exports = require_index_light();
    exports.build = 'full';
    exports.tokenize = require_tokenize();
    exports.parse = require_parse();
    exports.common = require_common();
    exports.Root._configure(exports.Type, exports.parse, exports.common);
  });
  var DmSegMobileReply = __toESM(
    __commonJSMin((exports, module) => {
      module.exports = require_src();
    })(),
    1,
  )
    .parse(
      'syntax = "proto3";\r\n\r\nmessage DanmakuElem {\r\n  int64 id = 1;\r\n  int32 progress = 2;\r\n  int32 mode = 3;\r\n  int32 fontsize = 4;\r\n  uint32 color = 5;\r\n  string midHash = 6;\r\n  string content = 7;\r\n  int64 ctime = 8;\r\n  int32 weight = 9;\r\n  string action = 10;\r\n  int32 pool = 11;\r\n  string attr = 12;\r\n}\r\n\r\nmessage DmSegMobileReply {\r\n  repeated DanmakuElem elems = 1;\r\n}\r\n',
    )
    .root.lookupType('DmSegMobileReply');
  function parseProtobuf(buffer) {
    try {
      const uint8Array = new Uint8Array(buffer);
      const elems = DmSegMobileReply.decode(uint8Array).elems;
      if (!elems) return [];
      return isArray(elems) ? elems : [elems];
    } catch (error) {
      console.error('Protobuf 解析失败:', error);
      return [];
    }
  }
  function encodeProtobuf(list) {
    try {
      const message = { elems: list };
      const buffer = DmSegMobileReply.encode(message).finish();
      return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    } catch (error) {
      console.error('Protobuf 编码失败:', error);
      return new ArrayBuffer(0);
    }
  }
  function processDanmaku(list, config = {}) {
    if (!list || list.length === 0) return [];
    const { list: result } = mergeSimilar(
      filterDanmaku(list, config),
      config.mergeThreshold,
      config.mergeWindow,
    );
    console.info(
      `弹幕过滤流水线完成: ${list.length} -> ${result.length} 条 (拦截 ${list.length - result.length} 条)`,
    );
    return result;
  }
  function cleanVideoDanmaku(rawBuffer, config) {
    return encodeProtobuf(processDanmaku(parseProtobuf(rawBuffer), config));
  }
  function startVideoFilter(configGetter) {
    installNetworkInterceptor({
      url: '/wbi/web/seg.so',
      onResponse: (rawBuffer) => {
        const config = configGetter();
        if (!config?.enabled || !(rawBuffer instanceof ArrayBuffer)) return rawBuffer;
        return cleanVideoDanmaku(rawBuffer, config);
      },
    });
  }
  var t$1 = globalThis;
  var e$2 =
    t$1.ShadowRoot &&
    (void 0 === t$1.ShadyCSS || t$1.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype;
  var s$2 = Symbol();
  var o$3 = new WeakMap();
  var n$2 = class {
    constructor(t, e, o) {
      if (((this._$cssResult$ = !0), o !== s$2))
        throw Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
      ((this.cssText = t), (this.t = e));
    }
    get styleSheet() {
      let t = this.o;
      const s = this.t;
      if (e$2 && void 0 === t) {
        const e = void 0 !== s && 1 === s.length;
        (e && (t = o$3.get(s)),
          void 0 === t &&
            ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), e && o$3.set(s, t)));
      }
      return t;
    }
    toString() {
      return this.cssText;
    }
  };
  var r$2 = (t) => new n$2('string' == typeof t ? t : t + '', void 0, s$2);
  var S$1 = (s, o) => {
    if (e$2) s.adoptedStyleSheets = o.map((t) => (t instanceof CSSStyleSheet ? t : t.styleSheet));
    else
      for (const e of o) {
        const o = document.createElement('style'),
          n = t$1.litNonce;
        (void 0 !== n && o.setAttribute('nonce', n), (o.textContent = e.cssText), s.appendChild(o));
      }
  };
  var c$2 = e$2
    ? (t) => t
    : (t) =>
        t instanceof CSSStyleSheet
          ? ((t) => {
              let e = '';
              for (const s of t.cssRules) e += s.cssText;
              return r$2(e);
            })(t)
          : t;
  var {
      is: i$2,
      defineProperty: e$1,
      getOwnPropertyDescriptor: h$1,
      getOwnPropertyNames: r$1,
      getOwnPropertySymbols: o$2,
      getPrototypeOf: n$1,
    } = Object,
    a$1 = globalThis,
    c$1 = a$1.trustedTypes,
    l$1 = c$1 ? c$1.emptyScript : '',
    p$1 = a$1.reactiveElementPolyfillSupport,
    d$1 = (t, s) => t,
    u$1 = {
      toAttribute(t, s) {
        switch (s) {
          case Boolean:
            t = t ? l$1 : null;
            break;
          case Object:
          case Array:
            t = null == t ? t : JSON.stringify(t);
        }
        return t;
      },
      fromAttribute(t, s) {
        let i = t;
        switch (s) {
          case Boolean:
            i = null !== t;
            break;
          case Number:
            i = null === t ? null : Number(t);
            break;
          case Object:
          case Array:
            try {
              i = JSON.parse(t);
            } catch (t) {
              i = null;
            }
        }
        return i;
      },
    },
    f$1 = (t, s) => !i$2(t, s),
    b$1 = {
      attribute: !0,
      type: String,
      converter: u$1,
      reflect: !1,
      useDefault: !1,
      hasChanged: f$1,
    };
  ((Symbol.metadata ??= Symbol('metadata')), (a$1.litPropertyMetadata ??= new WeakMap()));
  var y$1 = class extends HTMLElement {
    static addInitializer(t) {
      (this._$Ei(), (this.l ??= []).push(t));
    }
    static get observedAttributes() {
      return (this.finalize(), this._$Eh && [...this._$Eh.keys()]);
    }
    static createProperty(t, s = b$1) {
      if (
        (s.state && (s.attribute = !1),
        this._$Ei(),
        this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0),
        this.elementProperties.set(t, s),
        !s.noAccessor)
      ) {
        const i = Symbol(),
          h = this.getPropertyDescriptor(t, i, s);
        void 0 !== h && e$1(this.prototype, t, h);
      }
    }
    static getPropertyDescriptor(t, s, i) {
      const { get: e, set: r } = h$1(this.prototype, t) ?? {
        get() {
          return this[s];
        },
        set(t) {
          this[s] = t;
        },
      };
      return {
        get: e,
        set(s) {
          const h = e?.call(this);
          (r?.call(this, s), this.requestUpdate(t, h, i));
        },
        configurable: !0,
        enumerable: !0,
      };
    }
    static getPropertyOptions(t) {
      return this.elementProperties.get(t) ?? b$1;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d$1('elementProperties'))) return;
      const t = n$1(this);
      (t.finalize(),
        void 0 !== t.l && (this.l = [...t.l]),
        (this.elementProperties = new Map(t.elementProperties)));
    }
    static finalize() {
      if (this.hasOwnProperty(d$1('finalized'))) return;
      if (((this.finalized = !0), this._$Ei(), this.hasOwnProperty(d$1('properties')))) {
        const t = this.properties,
          s = [...r$1(t), ...o$2(t)];
        for (const i of s) this.createProperty(i, t[i]);
      }
      const t = this[Symbol.metadata];
      if (null !== t) {
        const s = litPropertyMetadata.get(t);
        if (void 0 !== s) for (const [t, i] of s) this.elementProperties.set(t, i);
      }
      this._$Eh = new Map();
      for (const [t, s] of this.elementProperties) {
        const i = this._$Eu(t, s);
        void 0 !== i && this._$Eh.set(i, t);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s) {
      const i = [];
      if (Array.isArray(s)) {
        const e = new Set(s.flat(1 / 0).reverse());
        for (const s of e) i.unshift(c$2(s));
      } else void 0 !== s && i.push(c$2(s));
      return i;
    }
    static _$Eu(t, s) {
      const i = s.attribute;
      return !1 === i
        ? void 0
        : 'string' == typeof i
          ? i
          : 'string' == typeof t
            ? t.toLowerCase()
            : void 0;
    }
    constructor() {
      (super(),
        (this._$Ep = void 0),
        (this.isUpdatePending = !1),
        (this.hasUpdated = !1),
        (this._$Em = null),
        this._$Ev());
    }
    _$Ev() {
      ((this._$ES = new Promise((t) => (this.enableUpdating = t))),
        (this._$AL = new Map()),
        this._$E_(),
        this.requestUpdate(),
        this.constructor.l?.forEach((t) => t(this)));
    }
    addController(t) {
      ((this._$EO ??= new Set()).add(t),
        void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.());
    }
    removeController(t) {
      this._$EO?.delete(t);
    }
    _$E_() {
      const t = new Map(),
        s = this.constructor.elementProperties;
      for (const i of s.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
      t.size > 0 && (this._$Ep = t);
    }
    createRenderRoot() {
      const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return (S$1(t, this.constructor.elementStyles), t);
    }
    connectedCallback() {
      ((this.renderRoot ??= this.createRenderRoot()),
        this.enableUpdating(!0),
        this._$EO?.forEach((t) => t.hostConnected?.()));
    }
    enableUpdating(t) {}
    disconnectedCallback() {
      this._$EO?.forEach((t) => t.hostDisconnected?.());
    }
    attributeChangedCallback(t, s, i) {
      this._$AK(t, i);
    }
    _$ET(t, s) {
      const i = this.constructor.elementProperties.get(t),
        e = this.constructor._$Eu(t, i);
      if (void 0 !== e && !0 === i.reflect) {
        const h = (void 0 !== i.converter?.toAttribute ? i.converter : u$1).toAttribute(s, i.type);
        ((this._$Em = t),
          null == h ? this.removeAttribute(e) : this.setAttribute(e, h),
          (this._$Em = null));
      }
    }
    _$AK(t, s) {
      const i = this.constructor,
        e = i._$Eh.get(t);
      if (void 0 !== e && this._$Em !== e) {
        const t = i.getPropertyOptions(e),
          h =
            'function' == typeof t.converter
              ? { fromAttribute: t.converter }
              : void 0 !== t.converter?.fromAttribute
                ? t.converter
                : u$1;
        this._$Em = e;
        const r = h.fromAttribute(s, t.type);
        ((this[e] = r ?? this._$Ej?.get(e) ?? r), (this._$Em = null));
      }
    }
    requestUpdate(t, s, i, e = !1, h) {
      if (void 0 !== t) {
        const r = this.constructor;
        if (
          (!1 === e && (h = this[t]),
          (i ??= r.getPropertyOptions(t)),
          !(
            (i.hasChanged ?? f$1)(h, s) ||
            (i.useDefault &&
              i.reflect &&
              h === this._$Ej?.get(t) &&
              !this.hasAttribute(r._$Eu(t, i)))
          ))
        )
          return;
        this.C(t, s, i);
      }
      !1 === this.isUpdatePending && (this._$ES = this._$EP());
    }
    C(t, s, { useDefault: i, reflect: e, wrapped: h }, r) {
      (i &&
        !(this._$Ej ??= new Map()).has(t) &&
        (this._$Ej.set(t, r ?? s ?? this[t]), !0 !== h || void 0 !== r)) ||
        (this._$AL.has(t) || (this.hasUpdated || i || (s = void 0), this._$AL.set(t, s)),
        !0 === e && this._$Em !== t && (this._$Eq ??= new Set()).add(t));
    }
    async _$EP() {
      this.isUpdatePending = !0;
      try {
        await this._$ES;
      } catch (t) {
        Promise.reject(t);
      }
      const t = this.scheduleUpdate();
      return (null != t && (await t), !this.isUpdatePending);
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending) return;
      if (!this.hasUpdated) {
        if (((this.renderRoot ??= this.createRenderRoot()), this._$Ep)) {
          for (const [t, s] of this._$Ep) this[t] = s;
          this._$Ep = void 0;
        }
        const t = this.constructor.elementProperties;
        if (t.size > 0)
          for (const [s, i] of t) {
            const { wrapped: t } = i,
              e = this[s];
            !0 !== t || this._$AL.has(s) || void 0 === e || this.C(s, void 0, i, e);
          }
      }
      let t = !1;
      const s = this._$AL;
      try {
        ((t = this.shouldUpdate(s)),
          t
            ? (this.willUpdate(s), this._$EO?.forEach((t) => t.hostUpdate?.()), this.update(s))
            : this._$EM());
      } catch (s) {
        throw ((t = !1), this._$EM(), s);
      }
      t && this._$AE(s);
    }
    willUpdate(t) {}
    _$AE(t) {
      (this._$EO?.forEach((t) => t.hostUpdated?.()),
        this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
        this.updated(t));
    }
    _$EM() {
      ((this._$AL = new Map()), (this.isUpdatePending = !1));
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t) {
      return !0;
    }
    update(t) {
      ((this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM());
    }
    updated(t) {}
    firstUpdated(t) {}
  };
  ((y$1.elementStyles = []),
    (y$1.shadowRootOptions = { mode: 'open' }),
    (y$1[d$1('elementProperties')] = new Map()),
    (y$1[d$1('finalized')] = new Map()),
    p$1?.({ ReactiveElement: y$1 }),
    (a$1.reactiveElementVersions ??= []).push('2.1.2'));
  var t = globalThis;
  var i$1 = (t) => t;
  var s$1 = t.trustedTypes;
  var e = s$1 ? s$1.createPolicy('lit-html', { createHTML: (t) => t }) : void 0;
  var h = '$lit$';
  var o$1 = `lit$${Math.random().toFixed(9).slice(2)}$`;
  var n = '?' + o$1;
  var r = `<${n}>`;
  var l = document;
  var c = () => l.createComment('');
  var a = (t) => null === t || ('object' != typeof t && 'function' != typeof t);
  var u = Array.isArray;
  var d = (t) => u(t) || 'function' == typeof t?.[Symbol.iterator];
  var f = '[ 	\n\f\r]';
  var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var _ = /-->/g;
  var m = />/g;
  var p = RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, 'g');
  var g = /'/g;
  var $ = /"/g;
  var y = /^(?:script|style|textarea|title)$/i;
  var x =
    (t) =>
    (i, ...s) => ({
      _$litType$: t,
      strings: i,
      values: s,
    });
  var b = x(1);
  var E = Symbol.for('lit-noChange');
  var A = Symbol.for('lit-nothing');
  var C = new WeakMap();
  var P = l.createTreeWalker(l, 129);
  function V(t, i) {
    if (!u(t) || !t.hasOwnProperty('raw')) throw Error('invalid template strings array');
    return void 0 !== e ? e.createHTML(i) : i;
  }
  var N = (t, i) => {
    const s = t.length - 1,
      e = [];
    let n,
      l = 2 === i ? '<svg>' : 3 === i ? '<math>' : '',
      c = v;
    for (let i = 0; i < s; i++) {
      const s = t[i];
      let a,
        u,
        d = -1,
        f = 0;
      for (; f < s.length && ((c.lastIndex = f), (u = c.exec(s)), null !== u);)
        ((f = c.lastIndex),
          c === v
            ? '!--' === u[1]
              ? (c = _)
              : void 0 !== u[1]
                ? (c = m)
                : void 0 !== u[2]
                  ? (y.test(u[2]) && (n = RegExp('</' + u[2], 'g')), (c = p))
                  : void 0 !== u[3] && (c = p)
            : c === p
              ? '>' === u[0]
                ? ((c = n ?? v), (d = -1))
                : void 0 === u[1]
                  ? (d = -2)
                  : ((d = c.lastIndex - u[2].length),
                    (a = u[1]),
                    (c = void 0 === u[3] ? p : '"' === u[3] ? $ : g))
              : c === $ || c === g
                ? (c = p)
                : c === _ || c === m
                  ? (c = v)
                  : ((c = p), (n = void 0)));
      const x = c === p && t[i + 1].startsWith('/>') ? ' ' : '';
      l +=
        c === v
          ? s + r
          : d >= 0
            ? (e.push(a), s.slice(0, d) + h + s.slice(d) + o$1 + x)
            : s + o$1 + (-2 === d ? i : x);
    }
    return [V(t, l + (t[s] || '<?>') + (2 === i ? '</svg>' : 3 === i ? '</math>' : '')), e];
  };
  var S = class S {
    constructor({ strings: t, _$litType$: i }, e) {
      let r;
      this.parts = [];
      let l = 0,
        a = 0;
      const u = t.length - 1,
        d = this.parts,
        [f, v] = N(t, i);
      if (
        ((this.el = S.createElement(f, e)), (P.currentNode = this.el.content), 2 === i || 3 === i)
      ) {
        const t = this.el.content.firstChild;
        t.replaceWith(...t.childNodes);
      }
      for (; null !== (r = P.nextNode()) && d.length < u;) {
        if (1 === r.nodeType) {
          if (r.hasAttributes())
            for (const t of r.getAttributeNames())
              if (t.endsWith(h)) {
                const i = v[a++],
                  s = r.getAttribute(t).split(o$1),
                  e = /([.?@])?(.*)/.exec(i);
                (d.push({
                  type: 1,
                  index: l,
                  name: e[2],
                  strings: s,
                  ctor: '.' === e[1] ? I : '?' === e[1] ? L : '@' === e[1] ? z : H,
                }),
                  r.removeAttribute(t));
              } else
                t.startsWith(o$1) &&
                  (d.push({
                    type: 6,
                    index: l,
                  }),
                  r.removeAttribute(t));
          if (y.test(r.tagName)) {
            const t = r.textContent.split(o$1),
              i = t.length - 1;
            if (i > 0) {
              r.textContent = s$1 ? s$1.emptyScript : '';
              for (let s = 0; s < i; s++)
                (r.append(t[s], c()),
                  P.nextNode(),
                  d.push({
                    type: 2,
                    index: ++l,
                  }));
              r.append(t[i], c());
            }
          }
        } else if (8 === r.nodeType)
          if (r.data === n)
            d.push({
              type: 2,
              index: l,
            });
          else {
            let t = -1;
            for (; -1 !== (t = r.data.indexOf(o$1, t + 1));)
              (d.push({
                type: 7,
                index: l,
              }),
                (t += o$1.length - 1));
          }
        l++;
      }
    }
    static createElement(t, i) {
      const s = l.createElement('template');
      return ((s.innerHTML = t), s);
    }
  };
  function M(t, i, s = t, e) {
    if (i === E) return i;
    let h = void 0 !== e ? s._$Co?.[e] : s._$Cl;
    const o = a(i) ? void 0 : i._$litDirective$;
    return (
      h?.constructor !== o &&
        (h?._$AO?.(!1),
        void 0 === o ? (h = void 0) : ((h = new o(t)), h._$AT(t, s, e)),
        void 0 !== e ? ((s._$Co ??= [])[e] = h) : (s._$Cl = h)),
      void 0 !== h && (i = M(t, h._$AS(t, i.values), h, e)),
      i
    );
  }
  var R = class {
    constructor(t, i) {
      ((this._$AV = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = i));
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t) {
      const {
          el: { content: i },
          parts: s,
        } = this._$AD,
        e = (t?.creationScope ?? l).importNode(i, !0);
      P.currentNode = e;
      let h = P.nextNode(),
        o = 0,
        n = 0,
        r = s[0];
      for (; void 0 !== r;) {
        if (o === r.index) {
          let i;
          (2 === r.type
            ? (i = new k(h, h.nextSibling, this, t))
            : 1 === r.type
              ? (i = new r.ctor(h, r.name, r.strings, this, t))
              : 6 === r.type && (i = new Z(h, this, t)),
            this._$AV.push(i),
            (r = s[++n]));
        }
        o !== r?.index && ((h = P.nextNode()), o++);
      }
      return ((P.currentNode = l), e);
    }
    p(t) {
      let i = 0;
      for (const s of this._$AV)
        (void 0 !== s &&
          (void 0 !== s.strings ? (s._$AI(t, s, i), (i += s.strings.length - 2)) : s._$AI(t[i])),
          i++);
    }
  };
  var k = class k {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t, i, s, e) {
      ((this.type = 2),
        (this._$AH = A),
        (this._$AN = void 0),
        (this._$AA = t),
        (this._$AB = i),
        (this._$AM = s),
        (this.options = e),
        (this._$Cv = e?.isConnected ?? !0));
    }
    get parentNode() {
      let t = this._$AA.parentNode;
      const i = this._$AM;
      return (void 0 !== i && 11 === t?.nodeType && (t = i.parentNode), t);
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t, i = this) {
      ((t = M(this, t, i)),
        a(t)
          ? t === A || null == t || '' === t
            ? (this._$AH !== A && this._$AR(), (this._$AH = A))
            : t !== this._$AH && t !== E && this._(t)
          : void 0 !== t._$litType$
            ? this.$(t)
            : void 0 !== t.nodeType
              ? this.T(t)
              : d(t)
                ? this.k(t)
                : this._(t));
    }
    O(t) {
      return this._$AA.parentNode.insertBefore(t, this._$AB);
    }
    T(t) {
      this._$AH !== t && (this._$AR(), (this._$AH = this.O(t)));
    }
    _(t) {
      (this._$AH !== A && a(this._$AH)
        ? (this._$AA.nextSibling.data = t)
        : this.T(l.createTextNode(t)),
        (this._$AH = t));
    }
    $(t) {
      const { values: i, _$litType$: s } = t,
        e =
          'number' == typeof s
            ? this._$AC(t)
            : (void 0 === s.el && (s.el = S.createElement(V(s.h, s.h[0]), this.options)), s);
      if (this._$AH?._$AD === e) this._$AH.p(i);
      else {
        const t = new R(e, this),
          s = t.u(this.options);
        (t.p(i), this.T(s), (this._$AH = t));
      }
    }
    _$AC(t) {
      let i = C.get(t.strings);
      return (void 0 === i && C.set(t.strings, (i = new S(t))), i);
    }
    k(t) {
      u(this._$AH) || ((this._$AH = []), this._$AR());
      const i = this._$AH;
      let s,
        e = 0;
      for (const h of t)
        (e === i.length
          ? i.push((s = new k(this.O(c()), this.O(c()), this, this.options)))
          : (s = i[e]),
          s._$AI(h),
          e++);
      e < i.length && (this._$AR(s && s._$AB.nextSibling, e), (i.length = e));
    }
    _$AR(t = this._$AA.nextSibling, s) {
      for (this._$AP?.(!1, !0, s); t !== this._$AB;) {
        const s = i$1(t).nextSibling;
        (i$1(t).remove(), (t = s));
      }
    }
    setConnected(t) {
      void 0 === this._$AM && ((this._$Cv = t), this._$AP?.(t));
    }
  };
  var H = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t, i, s, e, h) {
      ((this.type = 1),
        (this._$AH = A),
        (this._$AN = void 0),
        (this.element = t),
        (this.name = i),
        (this._$AM = e),
        (this.options = h),
        s.length > 2 || '' !== s[0] || '' !== s[1]
          ? ((this._$AH = Array(s.length - 1).fill(new String())), (this.strings = s))
          : (this._$AH = A));
    }
    _$AI(t, i = this, s, e) {
      const h = this.strings;
      let o = !1;
      if (void 0 === h)
        ((t = M(this, t, i, 0)), (o = !a(t) || (t !== this._$AH && t !== E)), o && (this._$AH = t));
      else {
        const e = t;
        let n, r;
        for (t = h[0], n = 0; n < h.length - 1; n++)
          ((r = M(this, e[s + n], i, n)),
            r === E && (r = this._$AH[n]),
            (o ||= !a(r) || r !== this._$AH[n]),
            r === A ? (t = A) : t !== A && (t += (r ?? '') + h[n + 1]),
            (this._$AH[n] = r));
      }
      o && !e && this.j(t);
    }
    j(t) {
      t === A
        ? this.element.removeAttribute(this.name)
        : this.element.setAttribute(this.name, t ?? '');
    }
  };
  var I = class extends H {
    constructor() {
      (super(...arguments), (this.type = 3));
    }
    j(t) {
      this.element[this.name] = t === A ? void 0 : t;
    }
  };
  var L = class extends H {
    constructor() {
      (super(...arguments), (this.type = 4));
    }
    j(t) {
      this.element.toggleAttribute(this.name, !!t && t !== A);
    }
  };
  var z = class extends H {
    constructor(t, i, s, e, h) {
      (super(t, i, s, e, h), (this.type = 5));
    }
    _$AI(t, i = this) {
      if ((t = M(this, t, i, 0) ?? A) === E) return;
      const s = this._$AH,
        e =
          (t === A && s !== A) ||
          t.capture !== s.capture ||
          t.once !== s.once ||
          t.passive !== s.passive,
        h = t !== A && (s === A || e);
      (e && this.element.removeEventListener(this.name, this, s),
        h && this.element.addEventListener(this.name, this, t),
        (this._$AH = t));
    }
    handleEvent(t) {
      'function' == typeof this._$AH
        ? this._$AH.call(this.options?.host ?? this.element, t)
        : this._$AH.handleEvent(t);
    }
  };
  var Z = class {
    constructor(t, i, s) {
      ((this.element = t),
        (this.type = 6),
        (this._$AN = void 0),
        (this._$AM = i),
        (this.options = s));
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t) {
      M(this, t);
    }
  };
  var B = t.litHtmlPolyfillSupport;
  (B?.(S, k), (t.litHtmlVersions ??= []).push('3.3.3'));
  var D = (t, i, s) => {
    const e = s?.renderBefore ?? i;
    let h = e._$litPart$;
    if (void 0 === h) {
      const t = s?.renderBefore ?? null;
      e._$litPart$ = h = new k(i.insertBefore(c(), t), t, void 0, s ?? {});
    }
    return (h._$AI(t), h);
  };
  var s = globalThis;
  var i = class extends y$1 {
    constructor() {
      (super(...arguments), (this.renderOptions = { host: this }), (this._$Do = void 0));
    }
    createRenderRoot() {
      const t = super.createRenderRoot();
      return ((this.renderOptions.renderBefore ??= t.firstChild), t);
    }
    update(t) {
      const r = this.render();
      (this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
        super.update(t),
        (this._$Do = D(r, this.renderRoot, this.renderOptions)));
    }
    connectedCallback() {
      (super.connectedCallback(), this._$Do?.setConnected(!0));
    }
    disconnectedCallback() {
      (super.disconnectedCallback(), this._$Do?.setConnected(!1));
    }
    render() {
      return E;
    }
  };
  ((i._$litElement$ = !0), (i['finalized'] = !0), s.litElementHydrateSupport?.({ LitElement: i }));
  var o = s.litElementPolyfillSupport;
  o?.({ LitElement: i });
  (s.litElementVersions ??= []).push('4.2.2');
  var style_default$9 =
    ':host{font-family:inherit;display:block}:host(:not([visible])){display:none!important}@keyframes magic-modal-mask-fade-in{0%{opacity:0}to{opacity:1}}@keyframes magic-modal-mask-fade-out{0%{opacity:1}to{opacity:0}}@keyframes magic-modal-zoom-in{0%{opacity:0;transform:scale(.92)translateY(-20px)}to{opacity:1;transform:scale(1)translateY(0)}}@keyframes magic-modal-zoom-out{0%{opacity:1;transform:scale(1)translateY(0)}to{opacity:0;transform:scale(.92)translateY(-20px)}}.magic-modal-wrapper{z-index:var(--magic-modal-z-index,99999);overscroll-behavior:contain;box-sizing:border-box;text-align:center;pointer-events:auto;position:fixed;inset:0;overflow:hidden auto}.magic-modal-wrapper.is-leaving{pointer-events:none!important}.magic-modal-wrapper:after{content:"";vertical-align:middle;width:0;height:100%;display:inline-block}.magic-modal-wrapper.is-centered{justify-content:center;align-items:center;padding-bottom:16vh;display:flex}.magic-modal-wrapper.is-centered:after{display:none}.magic-modal-wrapper.is-centered .magic-modal{margin:24px auto;top:0!important}.magic-modal-mask{z-index:var(--magic-modal-z-index,99999);background:var(--magic-modal-mask-bg,#000000a6);-webkit-backdrop-filter:blur(4px);animation:.25s forwards magic-modal-mask-fade-in;position:fixed;inset:0}.magic-modal-mask.is-leaving{animation:.2s forwards magic-modal-mask-fade-out;pointer-events:none!important}.magic-modal{vertical-align:middle;text-align:left;box-sizing:border-box;background:var(--magic-modal-bg,#1c1e24f5);border:1px solid var(--magic-modal-border,#ffffff1f);border-radius:var(--magic-modal-radius,12px);width:100%;box-shadow:var(--magic-modal-shadow,0 16px 48px #0009);-webkit-backdrop-filter:blur(16px);color:var(--magic-modal-color,#e5e9ef);pointer-events:auto;flex-direction:column;margin:0 auto;animation:.25s cubic-bezier(.16,1,.3,1) forwards magic-modal-zoom-in;display:inline-flex;position:relative}.magic-modal.is-leaving{animation:.2s cubic-bezier(.4,0,1,1) forwards magic-modal-zoom-out;pointer-events:none!important}.magic-modal__header{border-bottom:1px solid var(--magic-modal-divider,#ffffff14);box-sizing:border-box;justify-content:space-between;align-items:center;padding:16px 20px;display:flex}.magic-modal__title{color:var(--magic-modal-title-color,#fff);font-size:16px;font-weight:600;line-height:1.4}.magic-modal__close{width:28px;height:28px;color:var(--magic-modal-close-color,#9499a0);cursor:pointer;background:0 0;border:none;border-radius:6px;justify-content:center;align-items:center;margin:-4px -6px -4px auto;padding:0;transition:all .2s;display:inline-flex}.magic-modal__close:hover{background:var(--magic-bg-hover,#ffffff1a);color:var(--magic-modal-title-color,var(--magic-text-primary,#fff))}.magic-modal__close svg{width:16px;height:16px;display:block}.magic-modal__body{word-break:break-word;overscroll-behavior:contain;box-sizing:border-box;scrollbar-width:thin;scrollbar-color:var(--magic-bg-hover,#fff3) transparent;max-height:calc(80vh - 140px);padding:20px;font-size:14px;line-height:1.6;overflow-y:auto}.magic-modal__body::-webkit-scrollbar{width:5px}.magic-modal__body::-webkit-scrollbar-thumb{background:var(--magic-bg-hover,#fff3);border-radius:4px}.magic-modal__footer{border-top:1px solid var(--magic-modal-divider,#ffffff14);box-sizing:border-box;justify-content:flex-end;align-items:center;gap:12px;padding:14px 20px;display:flex}';
  var style_default$8 =
    ':host{vertical-align:middle;display:inline-flex}:host([block]){width:100%;display:flex}.magic-button{box-sizing:border-box;white-space:nowrap;text-align:center;cursor:pointer;-webkit-user-select:none;user-select:none;vertical-align:middle;border:1px solid #0000;border-radius:6px;outline:none;justify-content:center;align-items:center;width:100%;font-family:inherit;font-weight:500;line-height:1;transition:all .2s cubic-bezier(.4,0,.2,1);display:inline-flex;position:relative}.magic-button--small{gap:4px;height:28px;padding:0 10px;font-size:12px}.magic-button--medium{gap:6px;height:34px;padding:0 16px;font-size:14px}.magic-button--large{gap:8px;height:40px;padding:0 20px;font-size:16px}.magic-button.is-round{border-radius:9999px}.magic-button.is-circle{border-radius:50%;padding:0}.magic-button.is-circle.magic-button--small{width:28px}.magic-button.is-circle.magic-button--medium{width:34px}.magic-button.is-circle.magic-button--large{width:40px}.magic-button--default{background:var(--magic-btn-default-bg,#ffffff14);color:var(--magic-btn-default-color,#e5e9ef);border-color:var(--magic-btn-default-border,#ffffff26)}.magic-button--default:hover:not(.is-disabled){background:var(--magic-btn-default-hover-bg,#ffffff24);border-color:var(--magic-btn-default-hover-border,#ffffff40)}.magic-button--default:active:not(.is-disabled){background:var(--magic-btn-default-active-bg,#fff3)}.magic-button--primary{background:var(--magic-btn-primary-bg,var(--magic-primary-color));color:#fff;border-color:var(--magic-btn-primary-bg,var(--magic-primary-color))}.magic-button--primary:hover:not(.is-disabled){background:var(--magic-btn-primary-hover-bg,var(--magic-primary-hover-color));border-color:var(--magic-btn-primary-hover-bg,var(--magic-primary-hover-color));box-shadow:0 2px 8px var(--magic-primary-shadow)}.magic-button--primary:active:not(.is-disabled){background:var(--magic-btn-primary-active-bg,var(--magic-primary-active-color));border-color:var(--magic-btn-primary-active-bg,var(--magic-primary-active-color))}.magic-button--success{background:var(--magic-btn-success-bg,#2ac864);color:#fff;border-color:var(--magic-btn-success-bg,#2ac864)}.magic-button--success:hover:not(.is-disabled){background:var(--magic-btn-success-hover-bg,#3ad473);border-color:var(--magic-btn-success-hover-bg,#3ad473);box-shadow:0 2px 8px #2ac86459}.magic-button--success:active:not(.is-disabled){background:var(--magic-btn-success-active-bg,#23b056);border-color:var(--magic-btn-success-active-bg,#23b056)}.magic-button--warning{background:var(--magic-btn-warning-bg,#fa9600);color:#fff;border-color:var(--magic-btn-warning-bg,#fa9600)}.magic-button--warning:hover:not(.is-disabled){background:var(--magic-btn-warning-hover-bg,#ffa624);border-color:var(--magic-btn-warning-hover-bg,#ffa624);box-shadow:0 2px 8px #fa960059}.magic-button--warning:active:not(.is-disabled){background:var(--magic-btn-warning-active-bg,#e08700);border-color:var(--magic-btn-warning-active-bg,#e08700)}.magic-button--danger{background:var(--magic-btn-danger-bg,#ff5c7c);color:#fff;border-color:var(--magic-btn-danger-bg,#ff5c7c)}.magic-button--danger:hover:not(.is-disabled){background:var(--magic-btn-danger-hover-bg,#ff738e);border-color:var(--magic-btn-danger-hover-bg,#ff738e);box-shadow:0 2px 8px #ff5c7c59}.magic-button--danger:active:not(.is-disabled){background:var(--magic-btn-danger-active-bg,#e64b69);border-color:var(--magic-btn-danger-active-bg,#e64b69)}.magic-button--text{color:var(--magic-btn-text-color,var(--magic-primary-color));background:0 0;border-color:#0000;padding-left:4px;padding-right:4px}.magic-button--text:hover:not(.is-disabled){background:var(--magic-btn-text-hover-bg,var(--magic-primary-light-bg))}.magic-button--text:active:not(.is-disabled){background:var(--magic-btn-text-active-bg,var(--magic-primary-light-bg))}.magic-button.is-disabled{cursor:not-allowed;opacity:.5;box-shadow:none!important}.magic-button.is-loading{cursor:default;pointer-events:none}.magic-button .magic-button__loading-icon,.magic-button .magic-button__icon{justify-content:center;align-items:center;display:inline-flex}.magic-button .magic-button__content{align-items:center;display:inline-flex}';
  var style_default$7 =
    ':host{vertical-align:middle;display:inline-flex}@keyframes magic-spinner-rotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.magic-spinner{justify-content:center;align-items:center;gap:10px;display:inline-flex}.magic-spinner.is-vertical{flex-direction:column;gap:12px}.magic-spinner__circle{box-sizing:border-box;width:var(--magic-spinner-size,24px);height:var(--magic-spinner-size,24px);border-style:solid;border-width:var(--magic-spinner-border-width,3px);border-color:var(--magic-spinner-track,#ffffff1a);border-top-color:var(--magic-spinner-color,var(--magic-primary-color));border-radius:50%;flex-shrink:0;animation:.8s linear infinite magic-spinner-rotate}.magic-spinner__text{color:var(--magic-spinner-text-color,#9499a0);-webkit-user-select:none;user-select:none;font-size:13px;line-height:1.4}';
  var theme_default =
    ':root{--magic-primary-color:#e11483;--magic-primary-hover-color:color-mix(in srgb, var(--magic-primary-color) 85%, #fff);--magic-primary-active-color:color-mix(in srgb, var(--magic-primary-color) 85%, #000);--magic-primary-light-bg:color-mix(in srgb, var(--magic-primary-color) 12%, transparent);--magic-primary-shadow:color-mix(in srgb, var(--magic-primary-color) 35%, transparent);--magic-primary-focus-shadow:color-mix(in srgb, var(--magic-primary-color) 20%, transparent);--magic-color-success:#2ac864;--magic-color-success-hover:#3ad473;--magic-color-success-active:#23b056;--magic-color-success-shadow:#2ac86459;--magic-color-warning:#fa9600;--magic-color-warning-hover:#ffaa1a;--magic-color-warning-active:#e08700;--magic-color-warning-shadow:#fa960059;--magic-color-danger:#ff5c7c;--magic-color-danger-hover:#ff7591;--magic-color-danger-active:#e64567;--magic-color-danger-shadow:#ff5c7c59;--magic-text-primary:#fff;--magic-text-secondary:#ffffffb3;--magic-text-tertiary:#9499a0;--magic-text-disabled:#ffffff59;--magic-bg-base:#ffffff0a;--magic-bg-subtle:#ffffff14;--magic-bg-hover:#ffffff24;--magic-bg-active:#fff3;--magic-bg-overlay:#1c1e24f0;--magic-mask-bg:#000000a6;--magic-border-color:#ffffff1f;--magic-border-color-hover:#ffffff40;--magic-radius-sm:4px;--magic-radius-base:6px;--magic-radius-lg:8px;--magic-shadow-dropdown:0 4px 16px #0003;--magic-shadow-modal:0 16px 40px #00000073;--magic-shadow-toast:0 10px 30px #00000073;--magic-z-index-dropdown:1000;--magic-z-index-modal:99999;--magic-z-index-toast:999999;--magic-btn-default-bg:var(--magic-bg-subtle);--magic-btn-default-color:var(--magic-text-primary);--magic-btn-default-border:var(--magic-border-color);--magic-btn-default-hover-bg:var(--magic-bg-hover);--magic-btn-default-hover-border:var(--magic-border-color-hover);--magic-btn-default-active-bg:var(--magic-bg-active);--magic-btn-primary-bg:var(--magic-primary-color);--magic-btn-primary-hover-bg:var(--magic-primary-hover-color);--magic-btn-primary-active-bg:var(--magic-primary-active-color);--magic-btn-success-bg:var(--magic-color-success);--magic-btn-success-hover-bg:var(--magic-color-success-hover);--magic-btn-success-active-bg:var(--magic-color-success-active);--magic-btn-warning-bg:var(--magic-color-warning);--magic-btn-warning-hover-bg:var(--magic-color-warning-hover);--magic-btn-warning-active-bg:var(--magic-color-warning-active);--magic-btn-danger-bg:var(--magic-color-danger);--magic-btn-danger-hover-bg:var(--magic-color-danger-hover);--magic-btn-danger-active-bg:var(--magic-color-danger-active);--magic-btn-text-color:var(--magic-text-secondary);--magic-btn-text-hover-bg:var(--magic-bg-subtle);--magic-btn-text-active-bg:var(--magic-bg-hover);--magic-input-radius:var(--magic-radius-base);--magic-input-bg:var(--magic-bg-subtle);--magic-input-border:var(--magic-border-color);--magic-input-color:var(--magic-text-primary);--magic-input-hover-border:var(--magic-border-color-hover);--magic-input-hover-bg:var(--magic-bg-hover);--magic-input-focus-border:var(--magic-primary-color);--magic-input-focus-bg:var(--magic-bg-subtle);--magic-input-focus-shadow:var(--magic-primary-focus-shadow);--magic-input-prefix-color:var(--magic-text-tertiary);--magic-input-placeholder-color:var(--magic-text-tertiary);--magic-input-suffix-color:var(--magic-text-tertiary);--magic-input-clear-color:var(--magic-text-tertiary);--magic-input-clear-hover-color:var(--magic-text-primary);--magic-select-bg:var(--magic-bg-subtle);--magic-select-color:var(--magic-text-primary);--magic-select-border:var(--magic-border-color);--magic-select-placeholder-color:var(--magic-text-tertiary);--magic-select-suffix-color:var(--magic-text-tertiary);--magic-select-clear-color:var(--magic-text-tertiary);--magic-select-clear-hover-color:var(--magic-text-primary);--magic-select-hover-border:var(--magic-border-color-hover);--magic-select-hover-bg:var(--magic-bg-hover);--magic-select-active-color:var(--magic-primary-color);--magic-select-z-index:var(--magic-z-index-dropdown);--magic-select-dropdown-bg:var(--magic-bg-overlay);--magic-select-dropdown-border:var(--magic-border-color);--magic-select-dropdown-shadow:var(--magic-shadow-dropdown);--magic-select-option-hover-bg:var(--magic-bg-hover);--magic-select-option-active-bg:var(--magic-primary-light-bg);--magic-tabs-capsule-bg:var(--magic-bg-subtle);--magic-tabs-color:var(--magic-text-secondary);--magic-tabs-hover-color:var(--magic-text-primary);--magic-tabs-hover-bg:var(--magic-bg-hover);--magic-tabs-border:transparent;--magic-tabs-active-border:var(--magic-primary-light-bg);--magic-tabs-line-border:var(--magic-border-color);--magic-tabs-mask-bg:var(--magic-mask-bg);--magic-switch-color:var(--magic-text-secondary);--magic-switch-active-label-color:var(--magic-text-primary);--magic-switch-inactive-color:#8c8c8c59;--magic-switch-active-color:var(--magic-primary-color);--magic-spinner-size:24px;--magic-spinner-border-width:3px;--magic-spinner-track:var(--magic-bg-subtle);--magic-spinner-color:var(--magic-primary-color);--magic-spinner-text-color:var(--magic-text-tertiary);--magic-modal-z-index:var(--magic-z-index-modal);--magic-modal-mask-bg:var(--magic-mask-bg);--magic-modal-bg:var(--magic-bg-overlay);--magic-modal-border:var(--magic-border-color);--magic-modal-radius:var(--magic-radius-lg);--magic-modal-shadow:var(--magic-shadow-modal);--magic-modal-color:var(--magic-text-primary);--magic-modal-divider:var(--magic-border-color);--magic-modal-title-color:var(--magic-text-primary);--magic-modal-close-color:var(--magic-text-tertiary);--magic-radio-text-color:var(--magic-text-primary);--magic-radio-border-color:var(--magic-border-color);--magic-radio-bg:var(--magic-bg-subtle);--magic-radio-color:var(--magic-primary-color);--magic-radio-disabled-opacity:.45;--magic-toast-z-index:var(--magic-z-index-toast);--magic-toast-radius:var(--magic-radius-lg);--magic-toast-bg:var(--magic-bg-overlay);--magic-toast-color:var(--magic-text-primary);--magic-toast-border:var(--magic-border-color);--magic-toast-shadow:var(--magic-shadow-toast);--magic-toast-info-color:var(--magic-primary-color);--magic-toast-success-color:var(--magic-color-success);--magic-toast-warning-color:var(--magic-color-warning);--magic-toast-error-color:var(--magic-color-danger);--magic-version-bg:var(--magic-bg-subtle);--magic-version-color:var(--magic-text-secondary);--magic-version-border:var(--magic-border-color);--magic-slider-track-bg:var(--magic-bg-subtle);--magic-slider-track-hover-bg:var(--magic-bg-hover);--magic-slider-bar-bg:var(--magic-primary-color);--magic-slider-thumb-bg:#fff;--magic-slider-thumb-border:var(--magic-primary-color);--magic-slider-thumb-shadow:0 2px 6px #00000040;--magic-slider-thumb-hover-shadow:0 0 0 4px var(--magic-primary-focus-shadow);--magic-slider-thumb-active-shadow:0 0 0 6px var(--magic-primary-shadow);--magic-slider-stop-bg:#fff6;--magic-slider-tooltip-bg:var(--magic-bg-overlay);--magic-slider-tooltip-color:var(--magic-text-primary);--magic-slider-tooltip-border:var(--magic-border-color);--magic-slider-tooltip-shadow:var(--magic-shadow-dropdown);--magic-slider-disabled-opacity:.45}';
  function ensureTheme() {
    if (typeof document === 'undefined') return;
    if (document.getElementById('magic-theme-tokens')) return;
    const styleEl = document.createElement('style');
    styleEl.id = 'magic-theme-tokens';
    styleEl.textContent = theme_default;
    const target = document.head || document.documentElement;
    if (target) target.insertBefore(styleEl, target.firstChild);
  }
  ensureTheme();
  var MagicSpinner = class extends i {
    static properties = {
      size: String,
      color: String,
      text: String,
      vertical: Boolean,
      strokeWidth: {
        type: Number,
        attribute: 'stroke-width',
      },
    };
    static styles = r$2(style_default$7);
    constructor() {
      super();
      this.size = '24';
      this.color = '';
      this.text = '';
      this.vertical = true;
      this.strokeWidth = 3;
    }
    render() {
      const sizeVal =
        isNumber(this.size) || /^\d+$/.test(String(this.size)) ? `${this.size}px` : this.size;
      const dynamicStyle = [
        sizeVal ? `--magic-spinner-size: ${sizeVal}` : '',
        this.color ? `--magic-spinner-color: ${this.color}` : '',
        this.strokeWidth ? `--magic-spinner-border-width: ${this.strokeWidth}px` : '',
      ]
        .filter(Boolean)
        .join('; ');
      return b`
      <div class="magic-spinner ${this.vertical ? 'is-vertical' : ''}" style="${dynamicStyle}">
        <div class="magic-spinner__circle"></div>
        ${this.text ? b`<span class="magic-spinner__text"><slot>${this.text}</slot></span>` : b`<slot></slot>`}
      </div>
    `;
    }
  };
  if (!customElements.get('magic-spinner')) customElements.define('magic-spinner', MagicSpinner);
  var MagicButton = class extends i {
    static properties = {
      type: String,
      size: String,
      disabled: {
        type: Boolean,
        reflect: true,
      },
      loading: {
        type: Boolean,
        reflect: true,
      },
      round: Boolean,
      circle: Boolean,
      block: Boolean,
    };
    static styles = r$2(style_default$8);
    constructor() {
      super();
      this.type = 'default';
      this.size = 'medium';
      this.disabled = false;
      this.loading = false;
      this.round = false;
      this.circle = false;
      this.block = false;
    }
    get spinnerSize() {
      return (
        {
          small: 12,
          medium: 14,
          large: 16,
        }[this.size] || 14
      );
    }
    handleClick(event) {
      if (this.disabled || this.loading) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }
    render() {
      return b`
      <button
        class="${[
          'magic-button',
          `magic-button--${this.type || 'default'}`,
          `magic-button--${this.size || 'medium'}`,
          this.disabled || this.loading ? 'is-disabled' : '',
          this.loading ? 'is-loading' : '',
          this.round ? 'is-round' : '',
          this.circle ? 'is-circle' : '',
          this.block ? 'is-block' : '',
        ]
          .filter(Boolean)
          .join(' ')}"
        ?disabled=${this.disabled || this.loading}
        @click=${this.handleClick}
      >
        ${
          this.loading
            ? b`
                <span class="magic-button__loading-icon">
                  <slot name="loading">
                    <magic-spinner
                      size="${this.spinnerSize}"
                      color="currentColor"
                      stroke-width="2"
                    />
                  </slot>
                </span>
              `
            : b`
                <span class="magic-button__icon">
                  <slot name="icon"></slot>
                </span>
              `
        }
        <span class="magic-button__content">
          <slot></slot>
        </span>
      </button>
    `;
    }
  };
  if (!customElements.get('magic-button')) customElements.define('magic-button', MagicButton);
  var MODAL_ICONS = {
    close: b`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  `,
  };
  var MagicModal = class extends i {
    static properties = {
      title: String,
      visible: {
        type: Boolean,
        reflect: true,
      },
      width: String,
      height: String,
      maxHeight: {
        type: String,
        attribute: 'max-height',
      },
      top: String,
      centered: Boolean,
      mask: Boolean,
      maskClosable: {
        type: Boolean,
        attribute: 'mask-closable',
      },
      showClose: {
        type: Boolean,
        attribute: 'show-close',
      },
      confirmText: {
        type: String,
        attribute: 'confirm-text',
      },
      cancelText: {
        type: String,
        attribute: 'cancel-text',
      },
      showConfirm: {
        type: Boolean,
        attribute: 'show-confirm',
      },
      showCancel: {
        type: Boolean,
        attribute: 'show-cancel',
      },
      confirmLoading: {
        type: Boolean,
        attribute: 'confirm-loading',
      },
      _isLeaving: { state: true },
    };
    static styles = r$2(style_default$9);
    #cleanupKeydown = null;
    constructor() {
      super();
      this.title = '';
      this.visible = false;
      this.width = '480px';
      this.height = '';
      this.maxHeight = '';
      this.top = '15vh';
      this.centered = false;
      this.mask = true;
      this.maskClosable = false;
      this.showClose = true;
      this.confirmText = '确定';
      this.cancelText = '取消';
      this.showConfirm = true;
      this.showCancel = true;
      this.confirmLoading = false;
      this._isLeaving = false;
    }
    static confirm(options = {}) {
      return new Promise((resolve) => {
        const {
          title = '提示',
          content = '',
          confirmText = '确定',
          cancelText = '取消',
          showCancel = true,
          centered = true,
          width = '420px',
          onConfirm,
          onCancel,
        } = options;
        const modal = document.createElement('magic-modal');
        modal.title = title;
        modal.confirmText = confirmText;
        modal.cancelText = cancelText;
        modal.showCancel = showCancel;
        modal.centered = centered;
        modal.width = width;
        modal.innerHTML = isString(content) ? `<div>${content}</div>` : '';
        document.body.appendChild(modal);
        modal.visible = true;
        modal.addEventListener('confirm', async () => {
          if (isFunction(onConfirm)) {
            if ((await onConfirm()) === false) return;
          }
          modal.close();
          resolve(true);
        });
        modal.addEventListener('cancel', () => {
          if (isFunction(onCancel)) onCancel();
          resolve(false);
        });
        once(modal, 'close', () => modal.remove());
      });
    }
    connectedCallback() {
      super.connectedCallback();
      this.#cleanupKeydown = on(window, 'keydown', (event) => this.handleKeydown(event));
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.#cleanupKeydown?.();
    }
    updated(changedProperties) {
      if (changedProperties.has('visible')) {
        if (this.visible) this._isLeaving = false;
      }
    }
    handleKeydown(event) {
      if (this.visible && event.key === 'Escape' && this.showClose) this.close();
    }
    async close() {
      if (!this.visible && !this._isLeaving) return;
      this._isLeaving = true;
      await sleep(200);
      this.visible = false;
      this._isLeaving = false;
      this.dispatchEvent(
        new CustomEvent('close', {
          bubbles: true,
          composed: true,
        }),
      );
    }
    handleMaskClick(event) {
      if (this.maskClosable && event.target === event.currentTarget) this.close();
    }
    handleConfirm() {
      this.dispatchEvent(
        new CustomEvent('confirm', {
          bubbles: true,
          composed: true,
        }),
      );
    }
    handleCancel() {
      this.dispatchEvent(
        new CustomEvent('cancel', {
          bubbles: true,
          composed: true,
        }),
      );
      this.close();
    }
    renderHeader() {
      return b`
      <div class="magic-modal__header">
        <slot name="header">
          <span class="magic-modal__title">${this.title}</span>
        </slot>
        ${
          this.showClose
            ? b`
                <button class="magic-modal__close" @click=${this.close} title="关闭">
                  ${MODAL_ICONS.close}
                </button>
              `
            : b``
        }
      </div>
    `;
    }
    renderFooter() {
      return b`
      <div class="magic-modal__footer">
        <slot name="footer">
          ${
            this.showCancel
              ? b`
                  <magic-button
                    type="default"
                    @click=${this.handleCancel}
                    .disabled=${this.confirmLoading}
                  >
                    ${this.cancelText}
                  </magic-button>
                `
              : b``
          }
          ${
            this.showConfirm
              ? b`
                  <magic-button
                    type="primary"
                    @click=${this.handleConfirm}
                    .loading=${this.confirmLoading}
                  >
                    ${this.confirmText}
                  </magic-button>
                `
              : b``
          }
        </slot>
      </div>
    `;
    }
    render() {
      if (!this.visible && !this._isLeaving) return b``;
      const widthVal =
        isNumber(this.width) || /^\d+$/.test(String(this.width)) ? `${this.width}px` : this.width;
      const heightVal =
        isNumber(this.height) || /^\d+$/.test(String(this.height))
          ? `${this.height}px`
          : this.height;
      const maxHeightVal =
        isNumber(this.maxHeight) || /^\d+$/.test(String(this.maxHeight))
          ? `${this.maxHeight}px`
          : this.maxHeight;
      const modalStyle = [
        widthVal ? `width: ${widthVal}` : '',
        heightVal ? `height: ${heightVal}` : '',
        this.top && !this.centered ? `margin-top: ${this.top}` : '',
      ]
        .filter(Boolean)
        .join('; ');
      const bodyStyle = [
        maxHeightVal ? `max-height: ${maxHeightVal}` : '',
        heightVal ? 'flex: 1' : '',
      ]
        .filter(Boolean)
        .join('; ');
      const wrapperClasses = [
        'magic-modal-wrapper',
        this.centered ? 'is-centered' : '',
        this._isLeaving ? 'is-leaving' : '',
      ]
        .filter(Boolean)
        .join(' ');
      const modalClasses = ['magic-modal', this._isLeaving ? 'is-leaving' : '']
        .filter(Boolean)
        .join(' ');
      return b`
      ${
        this.mask
          ? b`
              <div
                class="magic-modal-mask ${this._isLeaving ? 'is-leaving' : ''}"
                @click=${this.handleMaskClick}
              ></div>
            `
          : b``
      }
      <div class="${wrapperClasses}" @click=${this.handleMaskClick}>
        <div class="${modalClasses}" style="${modalStyle}" role="dialog" aria-modal="true">
          ${this.renderHeader()}
          <div class="magic-modal__body" style="${bodyStyle}">
            <slot></slot>
          </div>
          ${this.renderFooter()}
        </div>
      </div>
    `;
    }
  };
  var modal = {
    confirm: (options) => MagicModal.confirm(options),
    info: (content, title = '提示') =>
      MagicModal.confirm({
        title,
        content,
        showCancel: false,
      }),
  };
  if (!customElements.get('magic-modal')) customElements.define('magic-modal', MagicModal);
  var style_default$6 =
    ':host{box-sizing:border-box;flex:1;width:100%;min-width:0;font-family:inherit;display:block}:host([inline]){width:auto;display:inline-block}.magic-tabs{box-sizing:border-box;align-items:center;width:100%;display:flex;position:relative}.magic-tabs__wrap{flex:1;align-items:center;min-width:0;display:flex;position:relative;overflow:hidden}.magic-tabs__shadow{z-index:2;pointer-events:none;opacity:0;width:24px;transition:opacity .2s;position:absolute;top:0;bottom:0}.magic-tabs__shadow--left{background:linear-gradient(to right, var(--magic-tabs-mask-bg,#000000d9), transparent);left:0}.magic-tabs__shadow--right{background:linear-gradient(to left, var(--magic-tabs-mask-bg,#000000d9), transparent);right:0}.magic-tabs__shadow.is-show{opacity:1}.magic-tabs__nav{white-space:nowrap;scroll-behavior:smooth;box-sizing:border-box;cursor:grab;-webkit-user-select:none;user-select:none;-webkit-overflow-scrolling:touch;scrollbar-width:none;-ms-overflow-style:none;align-items:center;gap:8px;width:100%;padding:4px 2px;display:flex;overflow:auto hidden}.magic-tabs__nav::-webkit-scrollbar{width:0;height:0;display:none}.magic-tabs__item{-webkit-user-select:none;user-select:none;cursor:pointer;white-space:nowrap;box-sizing:border-box;outline:none;flex-shrink:0;justify-content:center;align-items:center;transition:all .2s cubic-bezier(.4,0,.2,1);display:inline-flex;position:relative}.magic-tabs__item.is-disabled{cursor:not-allowed;opacity:.45;pointer-events:none}.magic-tabs--capsule .magic-tabs__item{color:var(--magic-tabs-color,#ffffffb3);background:var(--magic-tabs-capsule-bg,#ffffff14);border:1px solid var(--magic-tabs-border,transparent);border-radius:999px}.magic-tabs--capsule .magic-tabs__item:hover:not(.is-disabled):not(.is-active){color:var(--magic-tabs-hover-color,#fff);background:var(--magic-tabs-hover-bg,#ffffff24)}.magic-tabs--capsule .magic-tabs__item.is-active{color:var(--magic-primary-color);background:var(--magic-primary-light-bg);border-color:var(--magic-tabs-active-border,var(--magic-primary-light-bg));font-weight:500}.magic-tabs--line{border-bottom:1px solid var(--magic-tabs-line-border,#ffffff1f)}.magic-tabs--line .magic-tabs__item{color:var(--magic-tabs-color,#ffffffb3);background:0 0;border-radius:4px}.magic-tabs--line .magic-tabs__item:hover:not(.is-disabled):not(.is-active){color:var(--magic-tabs-hover-color,#fff)}.magic-tabs--line .magic-tabs__item.is-active{color:var(--magic-primary-color);font-weight:500}.magic-tabs--line .magic-tabs__item.is-active:after{content:"";background:var(--magic-primary-color);border-radius:2px;width:80%;height:2px;position:absolute;bottom:-4px;left:10%}.magic-tabs--small .magic-tabs__item{height:24px;padding:0 10px;font-size:12px}.magic-tabs--medium .magic-tabs__item{height:30px;padding:0 14px;font-size:13px}.magic-tabs--large .magic-tabs__item{height:36px;padding:0 18px;font-size:14px}.magic-tabs .magic-tabs__label{font-weight:600}';
  var MagicTabs = class extends i {
    static properties = {
      items: Array,
      value: {
        type: String,
        reflect: true,
      },
      size: String,
      type: String,
      scrollable: {
        type: Boolean,
        reflect: true,
      },
      block: {
        type: Boolean,
        reflect: true,
      },
      _canScrollLeft: { state: true },
      _canScrollRight: { state: true },
    };
    static styles = r$2(style_default$6);
    #cleanups = [];
    constructor() {
      super();
      this.items = [];
      this.value = '';
      this.size = 'medium';
      this.type = 'capsule';
      this.scrollable = true;
      this.block = true;
      this._canScrollLeft = false;
      this._canScrollRight = false;
      this._isDragging = false;
      this._startX = 0;
      this._scrollLeftStart = 0;
      this._hasDragged = false;
      this._onScroll = this._onScroll.bind(this);
      this._onWheel = this._onWheel.bind(this);
      this._onMouseDown = this._onMouseDown.bind(this);
      this._onMouseMove = this._onMouseMove.bind(this);
      this._onMouseUp = this._onMouseUp.bind(this);
    }
    get navElement() {
      return this.renderRoot?.querySelector('.magic-tabs__nav');
    }
    firstUpdated() {
      const nav = this.navElement;
      if (nav)
        this.#cleanups.push(
          on(nav, 'scroll', this._onScroll, { passive: true }),
          on(nav, 'wheel', this._onWheel, { passive: false }),
          on(nav, 'mousedown', this._onMouseDown),
          on(window, 'mousemove', this._onMouseMove),
          on(window, 'mouseup', this._onMouseUp),
        );
      this.updateScrollState();
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.#cleanups.forEach((fn) => fn?.());
      this.#cleanups = [];
    }
    updated(changedProperties) {
      if (changedProperties.has('items') || changedProperties.has('value')) {
        this.updateScrollState();
        const shouldSmooth = !changedProperties.has('items');
        setTimeout(() => {
          this.scrollToActiveItem(shouldSmooth);
        }, 0);
      }
    }
    updateScrollState() {
      const nav = this.navElement;
      if (!nav) return;
      const { scrollLeft, scrollWidth, clientWidth } = nav;
      const maxScrollLeft = Math.max(0, scrollWidth - clientWidth);
      this._canScrollLeft = scrollLeft > 2;
      this._canScrollRight = maxScrollLeft - scrollLeft > 2;
    }
    _onScroll() {
      this.updateScrollState();
    }
    _onWheel(event) {
      if (!this.scrollable) return;
      const nav = this.navElement;
      if (!nav) return;
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        nav.scrollLeft += event.deltaY;
      }
    }
    _onMouseDown(event) {
      if (!this.scrollable || event.button !== 0) return;
      const nav = this.navElement;
      if (!nav) return;
      this._isDragging = true;
      this._hasDragged = false;
      this._startX = event.pageX;
      this._scrollLeftStart = nav.scrollLeft;
      nav.style.scrollBehavior = 'auto';
    }
    _onMouseMove(event) {
      if (!this._isDragging) return;
      const nav = this.navElement;
      if (!nav) return;
      const deltaX = event.pageX - this._startX;
      if (Math.abs(deltaX) > 4) this._hasDragged = true;
      nav.scrollLeft = this._scrollLeftStart - deltaX;
    }
    _onMouseUp() {
      if (!this._isDragging) return;
      this._isDragging = false;
      const nav = this.navElement;
      if (nav) nav.style.scrollBehavior = 'smooth';
    }
    scrollToActiveItem(smooth = true) {
      const nav = this.navElement;
      if (!nav) return;
      const activeItem = nav.querySelector('.magic-tabs__item.is-active');
      if (!activeItem) return;
      const targetLeft = activeItem.offsetLeft - (nav.clientWidth - activeItem.clientWidth) / 2;
      nav.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: smooth ? 'smooth' : 'auto',
      });
      this.updateScrollState();
    }
    handleItemClick(item, index, event) {
      if (this._hasDragged) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      const itemObj = isObject(item) ? item : null;
      if (itemObj ? Boolean(itemObj.disabled) : false) {
        event.preventDefault();
        return;
      }
      const val = itemObj ? (itemObj.value ?? itemObj.label) : item;
      this.value = String(val);
      const detail = {
        value: this.value,
        item,
        index,
      };
      this.dispatchEvent(
        new CustomEvent('change', {
          detail,
          bubbles: true,
          composed: true,
        }),
      );
      this.dispatchEvent(
        new CustomEvent('tab-click', {
          detail,
          bubbles: true,
          composed: true,
        }),
      );
    }
    renderTabItem(item, index) {
      const itemObj = isObject(item) ? item : null;
      const label = itemObj ? (itemObj.label ?? itemObj.value) : item;
      const val = itemObj ? (itemObj.value ?? itemObj.label) : item;
      const isDisabled = itemObj ? Boolean(itemObj.disabled) : false;
      const isActive = String(this.value) === String(val);
      return b`
      <div
        class="${['magic-tabs__item', isActive ? 'is-active' : '', isDisabled ? 'is-disabled' : '']
          .filter(Boolean)
          .join(' ')}"
        role="tab"
        tabindex="${isDisabled ? '-1' : '0'}"
        aria-selected="${isActive ? 'true' : 'false'}"
        @click=${(e) => this.handleItemClick(item, index, e)}
      >
        <span class="magic-tabs__label">${label}</span>
      </div>
    `;
    }
    render() {
      const navClasses = [
        'magic-tabs',
        `magic-tabs--${this.size || 'medium'}`,
        `magic-tabs--${this.type || 'capsule'}`,
        this.block ? 'is-block' : '',
      ]
        .filter(Boolean)
        .join(' ');
      const safeItems = isArray(this.items) ? this.items : [];
      return b`
      <div class="${navClasses}">
        <slot name="prefix"></slot>
        <div class="magic-tabs__wrap">
          <div
            class="magic-tabs__shadow magic-tabs__shadow--left ${this._canScrollLeft ? 'is-show' : ''}"
          ></div>
          <div class="magic-tabs__nav" role="tablist">
            ${safeItems.map((item, index) => this.renderTabItem(item, index))}
          </div>
          <div
            class="magic-tabs__shadow magic-tabs__shadow--right ${this._canScrollRight ? 'is-show' : ''}"
          ></div>
        </div>
        <slot name="suffix"></slot>
      </div>
    `;
    }
  };
  if (!customElements.get('magic-tabs')) customElements.define('magic-tabs', MagicTabs);
  var style_default$5 =
    ':host{vertical-align:middle;-webkit-user-select:none;user-select:none;align-items:center;display:inline-flex}.magic-switch{cursor:pointer;background:0 0;border:none;outline:none;align-items:center;gap:6px;margin:0;padding:0;font-family:inherit;display:inline-flex}.magic-switch--small{--switch-width:30px;--switch-height:16px;--switch-knob:12px;--switch-offset:14px;--switch-font-size:12px}.magic-switch--medium{--switch-width:38px;--switch-height:20px;--switch-knob:16px;--switch-offset:18px;--switch-font-size:13px}.magic-switch--large{--switch-width:46px;--switch-height:24px;--switch-knob:20px;--switch-offset:22px;--switch-font-size:14px}.magic-switch__core{width:var(--switch-width,38px);height:var(--switch-height,20px);background-color:var(--magic-switch-inactive-color,#8c8c8c59);box-sizing:border-box;border-radius:999px;transition:background-color .25s,border-color .25s;display:inline-block;position:relative}.magic-switch__action{width:var(--switch-knob,16px);height:var(--switch-knob,16px);background-color:#fff;border-radius:50%;justify-content:center;align-items:center;transition:transform .25s cubic-bezier(.4,0,.2,1);display:flex;position:absolute;top:2px;left:2px;box-shadow:0 1px 3px #00000040}.magic-switch__label{color:var(--magic-switch-color,#9499a0);font-size:13px;line-height:1;transition:color .2s}.magic-switch.is-checked .magic-switch__core{background-color:var(--magic-switch-active-color,var(--magic-primary-color))}.magic-switch.is-checked .magic-switch__action{transform:translateX(var(--switch-offset,18px))}.magic-switch.is-checked .magic-switch__label{color:var(--magic-switch-active-label-color,#fff)}.magic-switch.is-disabled{cursor:not-allowed;opacity:.55}.magic-switch.is-disabled .magic-switch__core{cursor:not-allowed}.magic-switch.is-loading{cursor:wait;opacity:.8}';
  var MagicSwitch = class extends i {
    static properties = {
      checked: {
        type: Boolean,
        reflect: true,
      },
      disabled: {
        type: Boolean,
        reflect: true,
      },
      size: String,
      activeText: {
        type: String,
        attribute: 'active-text',
      },
      inactiveText: {
        type: String,
        attribute: 'inactive-text',
      },
      loading: {
        type: Boolean,
        reflect: true,
      },
    };
    static styles = r$2(style_default$5);
    constructor() {
      super();
      this.checked = false;
      this.disabled = false;
      this.size = 'medium';
      this.activeText = '';
      this.inactiveText = '';
      this.loading = false;
    }
    handleClick(event) {
      if (this.disabled || this.loading) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
      this.checked = !this.checked;
      const detail = { value: this.checked };
      this.dispatchEvent(
        new CustomEvent('change', {
          detail,
          bubbles: true,
          composed: true,
        }),
      );
      this.dispatchEvent(
        new CustomEvent('input', {
          detail,
          bubbles: true,
          composed: true,
        }),
      );
    }
    renderLabel() {
      const labelText = this.checked ? this.activeText : this.inactiveText || this.activeText;
      if (!labelText) return b`<slot></slot>`;
      return b`
      <span class="magic-switch__label">
        <slot>${labelText}</slot>
      </span>
    `;
    }
    render() {
      return b`
      <div
        class="${[
          'magic-switch',
          `magic-switch--${this.size || 'medium'}`,
          this.checked ? 'is-checked' : '',
          this.disabled ? 'is-disabled' : '',
          this.loading ? 'is-loading' : '',
        ]
          .filter(Boolean)
          .join(' ')}"
        role="switch"
        aria-checked="${this.checked}"
        aria-disabled="${this.disabled}"
        tabindex="${this.disabled ? -1 : 0}"
        @click=${this.handleClick}
      >
        <span class="magic-switch__core">
          <span class="magic-switch__action"></span>
        </span>
        ${this.renderLabel()}
      </div>
    `;
    }
  };
  if (!customElements.get('magic-switch')) customElements.define('magic-switch', MagicSwitch);
  var style_default$4 =
    ':host{vertical-align:middle;-webkit-user-select:none;user-select:none;box-sizing:border-box;align-items:center;width:100%;display:inline-flex}.magic-slider{box-sizing:border-box;align-items:center;width:100%;font-family:inherit;display:inline-flex}.magic-slider--small{--slider-track-height:4px;--slider-thumb-size:12px;--slider-font-size:12px}.magic-slider--medium{--slider-track-height:6px;--slider-thumb-size:16px;--slider-font-size:13px}.magic-slider--large{--slider-track-height:8px;--slider-thumb-size:20px;--slider-font-size:14px}.magic-slider__runway{cursor:pointer;touch-action:none;flex:1;align-items:center;height:28px;display:flex;position:relative}.magic-slider__track{width:100%;height:var(--slider-track-height,6px);background-color:var(--magic-slider-track-bg,#ffffff14);border-radius:999px;transition:background-color .2s;position:relative;overflow:hidden}.magic-slider:hover .magic-slider__track{background-color:var(--magic-slider-track-hover-bg,#ffffff24)}.magic-slider__bar{background-color:var(--magic-slider-bar-bg,var(--magic-primary-color,#e11483));border-radius:999px;height:100%;transition:background-color .2s;position:absolute;top:0;left:0}.magic-slider:hover .magic-slider__bar{background-color:var(--magic-slider-bar-hover-bg,var(--magic-primary-hover-color,#e11483))}.magic-slider__stops{pointer-events:none;position:absolute;inset:0}.magic-slider__stop{background-color:var(--magic-slider-stop-bg,#fff6);pointer-events:none;border-radius:50%;width:4px;height:4px;transition:background-color .2s;position:absolute;top:50%;transform:translate(-50%,-50%)}.magic-slider__stop.is-passed{background-color:#ffffffd9}.magic-slider__thumb{width:var(--slider-thumb-size,16px);height:var(--slider-thumb-size,16px);background-color:var(--magic-slider-thumb-bg,#fff);border:2px solid var(--magic-slider-thumb-border,var(--magic-primary-color,#e11483));box-shadow:var(--magic-slider-thumb-shadow,0 2px 6px #00000040);box-sizing:border-box;cursor:grab;z-index:2;border-radius:50%;outline:none;transition:transform .15s cubic-bezier(.4,0,.2,1),box-shadow .15s cubic-bezier(.4,0,.2,1),border-color .2s;position:absolute;top:50%;transform:translate(-50%,-50%)}.magic-slider__thumb:hover,.magic-slider__thumb:focus-visible{box-shadow:var(--magic-slider-thumb-hover-shadow,0 0 0 4px color-mix(in srgb, var(--magic-primary-color,#e11483) 20%, transparent));transform:translate(-50%,-50%)scale(1.12)}.magic-slider.is-dragging .magic-slider__thumb{cursor:grabbing;box-shadow:var(--magic-slider-thumb-active-shadow,0 0 0 6px color-mix(in srgb, var(--magic-primary-color,#e11483) 35%, transparent));transform:translate(-50%,-50%)scale(1.18)}.magic-slider.is-dragging .magic-slider__runway{cursor:grabbing}.magic-slider__tooltip{border-radius:var(--magic-radius-sm,4px);background-color:var(--magic-slider-tooltip-bg,#1c1e24f0);color:var(--magic-slider-tooltip-color,#fff);border:1px solid var(--magic-slider-tooltip-border,#ffffff1f);box-shadow:var(--magic-slider-tooltip-shadow,0 4px 16px #0003);white-space:nowrap;pointer-events:none;opacity:0;z-index:10;justify-content:center;align-items:center;padding:4px 8px;font-size:11px;font-weight:500;line-height:1;transition:opacity .2s cubic-bezier(.4,0,.2,1),transform .2s cubic-bezier(.4,0,.2,1);display:inline-flex;position:absolute;bottom:calc(100% + 10px);left:50%;transform:translate(-50%)translateY(4px)}.magic-slider__tooltip.is-visible{opacity:1;transform:translate(-50%)translateY(0)}.magic-slider__tooltip-arrow{border-left:4px solid #0000;border-right:4px solid #0000;border-top:4px solid var(--magic-slider-tooltip-bg,#1c1e24f0);width:0;height:0;position:absolute;bottom:-4px;left:50%;transform:translate(-50%)}.magic-slider__value{font-size:var(--slider-font-size,13px);color:var(--magic-text-secondary,#ffffffb3);text-align:right;font-variant-numeric:tabular-nums;min-width:36px;margin-left:12px;line-height:1}.magic-slider.is-disabled{cursor:not-allowed;opacity:var(--magic-slider-disabled-opacity,.45)}.magic-slider.is-disabled .magic-slider__runway{cursor:not-allowed}.magic-slider.is-disabled .magic-slider__thumb{cursor:not-allowed;box-shadow:none;transform:translate(-50%,-50%)}.magic-slider.is-disabled .magic-slider__thumb:hover,.magic-slider.is-disabled .magic-slider__thumb:focus-visible{box-shadow:none;transform:translate(-50%,-50%)}';
  function getValidProps(min, max, step) {
    const numMin = Number(min);
    const numMax = Number(max);
    const numStep = Number(step);
    const safeMin = Number.isFinite(numMin) ? numMin : 0;
    const safeMax = Number.isFinite(numMax) ? numMax : 100;
    const safeStep = Number.isFinite(numStep) && numStep > 0 ? numStep : 1;
    return {
      min: safeMin,
      max: safeMax > safeMin ? safeMax : safeMin + 100,
      step: safeStep,
    };
  }
  function getPrecision(step) {
    const stepStr = String(step);
    const dotIndex = stepStr.indexOf('.');
    return dotIndex === -1 ? 0 : stepStr.length - dotIndex - 1;
  }
  function clampAndStep(val, min, max, step) {
    const { min: sMin, max: sMax, step: sStep } = getValidProps(min, max, step);
    const precision = getPrecision(sStep);
    const stepped = sMin + Math.round((val - sMin) / sStep) * sStep;
    return Number(Math.min(sMax, Math.max(sMin, stepped)).toFixed(precision));
  }
  function calculateValueFromPointer(clientX, rect, min, max, step) {
    const { min: sMin, max: sMax, step: sStep } = getValidProps(min, max, step);
    if (rect.width <= 0) return sMin;
    const rawRatio = (clientX - rect.left) / rect.width;
    return clampAndStep(
      sMin + Math.max(0, Math.min(1, rawRatio)) * (sMax - sMin),
      sMin,
      sMax,
      sStep,
    );
  }
  function getNextValueFromKey(key, value, min, max, step) {
    switch (key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        return value - step;
      case 'ArrowRight':
      case 'ArrowUp':
        return value + step;
      case 'Home':
        return min;
      case 'End':
        return max;
      case 'PageDown':
        return value - step * 10;
      case 'PageUp':
        return value + step * 10;
      default:
        return null;
    }
  }
  function valueToPercent(val, min, max) {
    const { min: sMin, max: sMax } = getValidProps(min, max, 1);
    const percent = ((val - sMin) / (sMax - sMin)) * 100;
    return Math.min(100, Math.max(0, percent));
  }
  var MagicSlider = class extends i {
    static properties = {
      value: {
        type: Number,
        reflect: true,
      },
      min: Number,
      max: Number,
      step: Number,
      disabled: {
        type: Boolean,
        reflect: true,
      },
      size: String,
      showTooltip: {
        type: Boolean,
        attribute: 'show-tooltip',
      },
      alwaysShowTooltip: {
        type: Boolean,
        attribute: 'always-show-tooltip',
      },
      showValue: {
        type: Boolean,
        attribute: 'show-value',
      },
      showStops: {
        type: Boolean,
        attribute: 'show-stops',
      },
      formatTooltip: Function,
      _isDragging: { state: true },
      _isHovered: { state: true },
    };
    static styles = r$2(style_default$4);
    #cleanupMove = null;
    #cleanupUp = null;
    #cleanupCancel = null;
    constructor() {
      super();
      this.value = 0;
      this.min = 0;
      this.max = 100;
      this.step = 1;
      this.disabled = false;
      this.size = 'medium';
      this.showTooltip = true;
      this.alwaysShowTooltip = false;
      this.showValue = false;
      this.showStops = false;
      this.formatTooltip = null;
      this._isDragging = false;
      this._isHovered = false;
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.#clearDragListeners();
    }
    willUpdate(changedProperties) {
      if (
        changedProperties.has('value') ||
        changedProperties.has('min') ||
        changedProperties.has('max') ||
        changedProperties.has('step')
      ) {
        const rawVal = Number(this.value);
        const validVal = Number.isNaN(rawVal) ? this.min : rawVal;
        this.value = clampAndStep(validVal, this.min, this.max, this.step);
      }
    }
    get formattedValue() {
      if (isFunction(this.formatTooltip)) return this.formatTooltip(this.value);
      return this.value;
    }
    #clearDragListeners() {
      this.#cleanupMove?.();
      this.#cleanupUp?.();
      this.#cleanupCancel?.();
      this.#cleanupMove = null;
      this.#cleanupUp = null;
      this.#cleanupCancel = null;
    }
    #dispatchInputEvent() {
      const detail = { value: this.value };
      this.dispatchEvent(
        new CustomEvent('input', {
          detail,
          bubbles: true,
          composed: true,
        }),
      );
    }
    #dispatchChangeEvent() {
      const detail = { value: this.value };
      this.dispatchEvent(
        new CustomEvent('change', {
          detail,
          bubbles: true,
          composed: true,
        }),
      );
    }
    #updatePointerPosition(event) {
      const runway = this.shadowRoot?.querySelector('.magic-slider__runway');
      if (!runway) return;
      const rect = runway.getBoundingClientRect();
      const newValue = calculateValueFromPointer(
        event.clientX,
        rect,
        this.min,
        this.max,
        this.step,
      );
      if (newValue !== this.value) {
        this.value = newValue;
        this.#dispatchInputEvent();
      }
    }
    focusThumb() {
      this.shadowRoot?.querySelector('.magic-slider__thumb')?.focus();
    }
    handlePointerDown(event) {
      if (this.disabled || event.button !== 0) return;
      event.preventDefault();
      this._isDragging = true;
      this.focusThumb();
      this.#updatePointerPosition(event);
      this.#clearDragListeners();
      this.#cleanupMove = on(window, 'pointermove', (e) => this.handlePointerMove(e));
      this.#cleanupUp = on(window, 'pointerup', () => this.handlePointerUp());
      this.#cleanupCancel = on(window, 'pointercancel', () => this.handlePointerUp());
    }
    handlePointerMove(event) {
      if (!this._isDragging) return;
      this.#updatePointerPosition(event);
    }
    handlePointerUp() {
      if (!this._isDragging) return;
      this._isDragging = false;
      this.#clearDragListeners();
      this.#dispatchChangeEvent();
    }
    handleMouseEnter() {
      this._isHovered = true;
    }
    handleMouseLeave() {
      this._isHovered = false;
    }
    handleKeyDown(event) {
      if (this.disabled) return;
      const nextVal = getNextValueFromKey(event.key, this.value, this.min, this.max, this.step);
      if (nextVal === null) return;
      event.preventDefault();
      const clamped = clampAndStep(nextVal, this.min, this.max, this.step);
      if (clamped !== this.value) {
        this.value = clamped;
        this.#dispatchInputEvent();
        this.#dispatchChangeEvent();
      }
    }
    renderStops() {
      if (!this.showStops || this.step <= 0) return null;
      const { min, max, step } = getValidProps(this.min, this.max, this.step);
      const range = max - min;
      const count = Math.floor(range / step);
      if (count <= 1 || count > 50) return null;
      const currentPercent = valueToPercent(this.value, min, max);
      const stops = [];
      for (let i = 1; i < count; i++) {
        const stopPercent = valueToPercent(min + i * step, min, max);
        const isPassed = stopPercent <= currentPercent;
        stops.push(b`
        <span
          class="magic-slider__stop ${isPassed ? 'is-passed' : ''}"
          style="left: ${stopPercent}%;"
        ></span>
      `);
      }
      return b`<div class="magic-slider__stops">${stops}</div>`;
    }
    renderTooltip() {
      if (!this.showTooltip) return null;
      return b`
      <div class="magic-slider__tooltip ${this.alwaysShowTooltip || this._isDragging || this._isHovered ? 'is-visible' : ''}">
        <span class="magic-slider__tooltip-content">${this.formattedValue}</span>
        <span class="magic-slider__tooltip-arrow"></span>
      </div>
    `;
    }
    renderValueText() {
      if (!this.showValue) return null;
      return b`<span class="magic-slider__value">${this.formattedValue}</span>`;
    }
    render() {
      const percent = valueToPercent(this.value, this.min, this.max);
      return b`
      <div
        class="${[
          'magic-slider',
          `magic-slider--${this.size || 'medium'}`,
          this.disabled ? 'is-disabled' : '',
          this._isDragging ? 'is-dragging' : '',
        ]
          .filter(Boolean)
          .join(' ')}"
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <div class="magic-slider__runway" @pointerdown=${this.handlePointerDown}>
          <div class="magic-slider__track">
            <div class="magic-slider__bar" style="width: ${percent}%;"></div>
            ${this.renderStops()}
          </div>
          <div
            class="magic-slider__thumb"
            style="left: ${percent}%;"
            role="slider"
            tabindex="${this.disabled ? -1 : 0}"
            aria-valuemin="${this.min}"
            aria-valuemax="${this.max}"
            aria-valuenow="${this.value}"
            aria-disabled="${this.disabled}"
            @keydown=${this.handleKeyDown}
          >
            ${this.renderTooltip()}
          </div>
        </div>
        ${this.renderValueText()}
      </div>
    `;
    }
  };
  if (!customElements.get('magic-slider')) customElements.define('magic-slider', MagicSlider);
  var style_default$3 =
    ':host{vertical-align:middle;box-sizing:border-box;font-family:inherit;display:inline-block}:host([block]){width:100%;display:block}.magic-input{box-sizing:border-box;border-radius:var(--magic-input-radius,6px);background:var(--magic-input-bg,#ffffff14);border:1px solid var(--magic-input-border,#ffffff26);width:100%;color:var(--magic-input-color,#e5e9ef);align-items:center;transition:all .2s cubic-bezier(.4,0,.2,1);display:inline-flex;position:relative}.magic-input--small{height:28px;padding:0 8px;font-size:12px}.magic-input--medium{height:34px;padding:0 12px;font-size:14px}.magic-input--large{height:40px;padding:0 16px;font-size:16px}.magic-input:hover:not(.is-disabled):not(.is-focused){border-color:var(--magic-input-hover-border,#ffffff40);background:var(--magic-input-hover-bg,#ffffff1f)}.magic-input.is-focused{border-color:var(--magic-input-focus-border,var(--magic-primary-color));background:var(--magic-input-focus-bg,#ffffff1a);box-shadow:var(--magic-input-focus-shadow,var(--magic-primary-focus-shadow))}.magic-input.is-disabled{cursor:not-allowed;opacity:.5;background:#ffffff0a;border-color:#ffffff1a}.magic-input.is-disabled .magic-input__inner{cursor:not-allowed}.magic-input__prefix{color:var(--magic-input-prefix-color,#9499a0);flex-shrink:0;justify-content:center;align-items:center;margin-right:6px;line-height:1;display:inline-flex}.magic-input__prefix svg{width:14px;height:14px;display:block}.magic-input__inner{width:100%;min-width:0;height:100%;color:inherit;font-family:inherit;font-size:inherit;line-height:inherit;box-sizing:border-box;background:0 0;border:none;outline:none;flex:1;margin:0;padding:0}.magic-input__inner::placeholder{color:var(--magic-input-placeholder-color,#9499a0)}.magic-input__suffix{color:var(--magic-input-suffix-color,#9499a0);flex-shrink:0;justify-content:center;align-items:center;margin-left:6px;line-height:1;display:inline-flex}.magic-input__suffix svg{width:14px;height:14px;display:block}.magic-input__clear{cursor:pointer;color:var(--magic-input-clear-color,#9499a0);flex-shrink:0;justify-content:center;align-items:center;margin-left:6px;transition:color .15s;display:inline-flex}.magic-input__clear svg{width:14px;height:14px;display:block}.magic-input__clear:hover{color:var(--magic-input-clear-hover-color,#e5e9ef)}';
  var INPUT_ICONS = {
    clear: b`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  `,
  };
  var MagicInput = class extends i {
    static properties = {
      value: {
        type: String,
        reflect: true,
      },
      placeholder: String,
      type: String,
      size: String,
      disabled: {
        type: Boolean,
        reflect: true,
      },
      readonly: {
        type: Boolean,
        reflect: true,
      },
      clearable: Boolean,
      block: {
        type: Boolean,
        reflect: true,
      },
      maxlength: {
        type: Number,
        attribute: 'maxlength',
      },
      autofocus: Boolean,
      focused: { state: true },
    };
    static styles = r$2(style_default$3);
    constructor() {
      super();
      this.value = '';
      this.placeholder = '';
      this.type = 'text';
      this.size = 'medium';
      this.disabled = false;
      this.readonly = false;
      this.clearable = false;
      this.block = false;
      this.maxlength = void 0;
      this.autofocus = false;
      this.focused = false;
    }
    firstUpdated() {
      if (this.autofocus && !this.disabled && !this.readonly) this.focus();
    }
    get inputElement() {
      return this.shadowRoot?.querySelector('.magic-input__inner') || null;
    }
    focus() {
      this.inputElement?.focus();
    }
    blur() {
      this.inputElement?.blur();
    }
    select() {
      this.inputElement?.select();
    }
    handleInput(event) {
      event.stopPropagation();
      this.value = event.target.value;
      const detail = { value: this.value };
      this.dispatchEvent(
        new CustomEvent('input', {
          detail,
          bubbles: true,
          composed: true,
        }),
      );
    }
    handleChange(event) {
      event.stopPropagation();
      this.value = event.target.value;
      const detail = { value: this.value };
      this.dispatchEvent(
        new CustomEvent('change', {
          detail,
          bubbles: true,
          composed: true,
        }),
      );
    }
    handleFocus(event) {
      this.focused = true;
      this.dispatchEvent(
        new CustomEvent('focus', {
          detail: { event },
          bubbles: true,
          composed: true,
        }),
      );
    }
    handleBlur(event) {
      this.focused = false;
      this.dispatchEvent(
        new CustomEvent('blur', {
          detail: { event },
          bubbles: true,
          composed: true,
        }),
      );
    }
    handleKeyDown(event) {
      event.stopPropagation();
      this.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: event.key,
          code: event.code,
          keyCode: event.keyCode,
          which: event.which,
          shiftKey: event.shiftKey,
          ctrlKey: event.ctrlKey,
          altKey: event.altKey,
          metaKey: event.metaKey,
          repeat: event.repeat,
          isComposing: event.isComposing,
          bubbles: false,
          composed: false,
        }),
      );
    }
    handleKeyUp(event) {
      event.stopPropagation();
      this.dispatchEvent(
        new KeyboardEvent('keyup', {
          key: event.key,
          code: event.code,
          keyCode: event.keyCode,
          which: event.which,
          shiftKey: event.shiftKey,
          ctrlKey: event.ctrlKey,
          altKey: event.altKey,
          metaKey: event.metaKey,
          repeat: event.repeat,
          isComposing: event.isComposing,
          bubbles: false,
          composed: false,
        }),
      );
    }
    handleClear(event) {
      event.stopPropagation();
      event.preventDefault();
      this.value = '';
      this.dispatchEvent(
        new CustomEvent('clear', {
          detail: { value: '' },
          bubbles: true,
          composed: true,
        }),
      );
      this.dispatchEvent(
        new CustomEvent('input', {
          detail: { value: '' },
          bubbles: true,
          composed: true,
        }),
      );
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { value: '' },
          bubbles: true,
          composed: true,
        }),
      );
      this.focus();
    }
    renderClearBtn() {
      if (!this.clearable || !this.value || this.disabled || this.readonly) return null;
      return b`
      <span class="magic-input__clear" title="清空" @click=${this.handleClear}>
        ${INPUT_ICONS.clear}
      </span>
    `;
    }
    render() {
      return b`
      <div class="${[
        'magic-input',
        `magic-input--${this.size || 'medium'}`,
        this.focused ? 'is-focused' : '',
        this.disabled ? 'is-disabled' : '',
        this.readonly ? 'is-readonly' : '',
      ]
        .filter(Boolean)
        .join(' ')}">
        <span class="magic-input__prefix">
          <slot name="prefix"></slot>
        </span>

        <input
          class="magic-input__inner"
          .type=${this.type || 'text'}
          .value=${this.value || ''}
          .placeholder=${this.placeholder || ''}
          .disabled=${this.disabled}
          .readOnly=${this.readonly}
          maxlength=${this.maxlength > 0 ? this.maxlength : A}
          @input=${this.handleInput}
          @change=${this.handleChange}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          @keydown=${this.handleKeyDown}
          @keyup=${this.handleKeyUp}
        />

        ${this.renderClearBtn()}

        <span class="magic-input__suffix">
          <slot name="suffix"></slot>
        </span>
      </div>
    `;
    }
  };
  if (!customElements.get('magic-input')) customElements.define('magic-input', MagicInput);
  var style_default$2 =
    ':host{vertical-align:middle;box-sizing:border-box;font-family:inherit;display:inline-block;position:relative}:host([block]){width:100%;display:block}@keyframes magic-select-dropdown-in{0%{opacity:0;transform:translateY(-8px)scaleY(.95)}to{opacity:1;transform:translateY(0)scaleY(1)}}.magic-select{box-sizing:border-box;-webkit-user-select:none;user-select:none;width:100%;position:relative}.magic-select__trigger{box-sizing:border-box;border:1px solid var(--magic-select-border,#ffffff26);background:var(--magic-select-bg,#ffffff14);width:100%;color:var(--magic-select-color,#e5e9ef);cursor:pointer;border-radius:6px;outline:none;justify-content:space-between;align-items:center;transition:all .2s cubic-bezier(.4,0,.2,1);display:flex}.magic-select__label{text-overflow:ellipsis;white-space:nowrap;text-align:left;flex:1;overflow:hidden}.magic-select__label.is-placeholder{color:var(--magic-select-placeholder-color,#9499a0)}.magic-select__suffix{color:var(--magic-select-suffix-color,#9499a0);flex-shrink:0;justify-content:center;align-items:center;margin-left:6px;transition:transform .2s;display:inline-flex}.magic-select__suffix svg{width:14px;height:14px;transition:transform .2s;display:block}.magic-select__suffix.is-reverse svg{transform:rotate(180deg)}.magic-select__clear{color:var(--magic-select-clear-color,#9499a0);cursor:pointer;flex-shrink:0;justify-content:center;align-items:center;margin-left:6px;transition:color .2s;display:none}.magic-select__clear:hover{color:var(--magic-select-clear-hover-color,#e5e9ef)}.magic-select__clear svg{width:14px;height:14px;display:block}.magic-select--small .magic-select__trigger{height:28px;padding:0 8px;font-size:12px}.magic-select--medium .magic-select__trigger{height:34px;padding:0 12px;font-size:14px}.magic-select--large .magic-select__trigger{height:40px;padding:0 16px;font-size:16px}.magic-select:hover:not(.is-disabled) .magic-select__trigger{border-color:var(--magic-select-hover-border,#ffffff40);background:var(--magic-select-hover-bg,#ffffff1f)}.magic-select:hover:not(.is-disabled).has-value.is-clearable .magic-select__suffix{display:none}.magic-select:hover:not(.is-disabled).has-value.is-clearable .magic-select__clear{display:inline-flex}.magic-select.is-open .magic-select__trigger{border-color:var(--magic-select-active-color,var(--magic-primary-color));box-shadow:0 0 0 2px var(--magic-primary-focus-shadow)}.magic-select.is-disabled .magic-select__trigger{cursor:not-allowed;opacity:.5;background:#ffffff0a;border-color:#ffffff1a}.magic-select__dropdown-container{min-width:100%;z-index:var(--magic-select-z-index,10000);position:absolute;top:calc(100% + 4px);left:0}.magic-select__dropdown{box-sizing:border-box;background:var(--magic-select-dropdown-bg,#1c1e24f5);border:1px solid var(--magic-select-dropdown-border,#ffffff1f);width:100%;min-width:100%;max-height:240px;box-shadow:var(--magic-select-dropdown-shadow,0 10px 30px #00000080);-webkit-backdrop-filter:blur(12px);transform-origin:top;border-radius:6px;padding:4px;animation:.2s cubic-bezier(.16,1,.3,1) forwards magic-select-dropdown-in;overflow-y:auto}.magic-select__dropdown::-webkit-scrollbar{width:5px}.magic-select__dropdown::-webkit-scrollbar-thumb{background:#fff3;border-radius:4px}.magic-select__sub-dropdown{box-sizing:border-box;background:var(--magic-select-dropdown-bg,#1c1e24f5);border:1px solid var(--magic-select-dropdown-border,#ffffff1f);width:max-content;min-width:130px;box-shadow:var(--magic-select-dropdown-shadow,0 10px 30px #00000080);-webkit-backdrop-filter:blur(12px);transform-origin:0 0;border-radius:6px;padding:4px;animation:.18s cubic-bezier(.16,1,.3,1) forwards magic-select-dropdown-in;position:absolute;left:calc(100% + 4px)}.magic-select__sub-dropdown:before{content:"";width:8px;height:100%;position:absolute;top:0;left:-8px}.magic-select__empty{text-align:center;color:var(--magic-select-placeholder-color,#9499a0);padding:12px;font-size:13px}.magic-option{box-sizing:border-box;color:var(--magic-select-color,#e5e9ef);cursor:pointer;-webkit-user-select:none;user-select:none;white-space:nowrap;border-radius:4px;justify-content:space-between;align-items:center;padding:8px 10px;font-size:14px;line-height:1.2;transition:all .15s;display:flex}.magic-option:hover:not(.is-disabled),.magic-option.is-active-parent{background-color:var(--magic-select-option-hover-bg,#ffffff14)}.magic-option.is-selected,.magic-option.has-selected-child{color:var(--magic-select-active-color,var(--magic-primary-color));font-weight:500}.magic-option.is-selected{background-color:var(--magic-select-option-active-bg,var(--magic-primary-light-bg))}.magic-option.is-disabled{cursor:not-allowed;opacity:.4}.magic-option__arrow{color:var(--magic-select-suffix-color,#9499a0);justify-content:center;align-items:center;margin-left:8px;display:inline-flex}.magic-option__arrow svg{width:12px;height:12px;display:block}';
  var SELECT_ICONS = {
    arrowDown: b`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  `,
    chevronRight: b`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  `,
    clear: b`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  `,
  };
  function findLabelInOptions(list, value, parent = null) {
    for (const item of list) {
      if (String(item.value) === String(value))
        return parent
          ? `${parent.label} · ${item.label ?? item.value}`
          : (item.label ?? item.value);
      if (isArray(item.children)) {
        const match = findLabelInOptions(item.children, value, item);
        if (match) return match;
      }
    }
    return null;
  }
  var MagicOption = class extends i {
    static properties = {
      value: String,
      label: String,
      disabled: {
        type: Boolean,
        reflect: true,
      },
      selected: {
        type: Boolean,
        reflect: true,
      },
    };
    static styles = r$2(style_default$2);
    constructor() {
      super();
      this.value = '';
      this.label = '';
      this.disabled = false;
      this.selected = false;
    }
    handleClick(event) {
      if (this.disabled) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }
    render() {
      return b`
      <div class="${[
        'magic-option',
        this.selected ? 'is-selected' : '',
        this.disabled ? 'is-disabled' : '',
      ]
        .filter(Boolean)
        .join(' ')}" @click=${this.handleClick}>
        <slot>${this.label || this.value}</slot>
      </div>
    `;
    }
  };
  var MagicSelect = class extends i {
    static properties = {
      value: String,
      placeholder: String,
      disabled: {
        type: Boolean,
        reflect: true,
      },
      clearable: Boolean,
      size: String,
      block: Boolean,
      open: {
        type: Boolean,
        reflect: true,
      },
      options: Array,
      activeSubmenuValue: { state: true },
      submenuTop: { state: true },
    };
    static styles = r$2(style_default$2);
    #cleanupOutsideClick = null;
    constructor() {
      super();
      this.value = '';
      this.placeholder = '请选择';
      this.disabled = false;
      this.clearable = false;
      this.size = 'medium';
      this.block = false;
      this.open = false;
      this.options = [];
      this.activeSubmenuValue = '';
      this.submenuTop = 0;
    }
    get currentLabel() {
      if (isArray(this.options) && this.options.length > 0) {
        const match = findLabelInOptions(this.options, this.value);
        if (match) return match;
      }
      const slot = this.shadowRoot?.querySelector('slot');
      if (slot) {
        const matchedEl = slot
          .assignedElements({ flatten: true })
          .find((el) => el.value === this.value);
        if (matchedEl) return matchedEl.label || matchedEl.textContent?.trim() || matchedEl.value;
      }
      return this.value || '';
    }
    get activeSubmenuItem() {
      if (!this.activeSubmenuValue || !isArray(this.options)) return null;
      return (
        this.options.find((item) => String(item.value) === String(this.activeSubmenuValue)) || null
      );
    }
    connectedCallback() {
      super.connectedCallback();
      this.#cleanupOutsideClick = on(document, 'pointerdown', (event) =>
        this.handleOutsideClick(event),
      );
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.#cleanupOutsideClick?.();
    }
    handleOutsideClick(event) {
      if (this.open && !event.composedPath().includes(this)) {
        this.open = false;
        this.activeSubmenuValue = '';
      }
    }
    toggleDropdown(event) {
      event.stopPropagation();
      if (this.disabled) return;
      this.open = !this.open;
      if (!this.open) this.activeSubmenuValue = '';
    }
    handleClear(event) {
      event.stopPropagation();
      this.value = '';
      this.open = false;
      this.activeSubmenuValue = '';
      this.dispatchEvent(
        new CustomEvent('clear', {
          bubbles: true,
          composed: true,
        }),
      );
      this.dispatchChangeEvent('');
    }
    handleSelectOption(option, event) {
      event?.stopPropagation();
      if (option.disabled) return;
      this.value = option.value;
      this.open = false;
      this.activeSubmenuValue = '';
      this.dispatchChangeEvent(option.value, option.label);
    }
    dispatchChangeEvent(value, label = '') {
      const detail = {
        value,
        label,
      };
      this.dispatchEvent(
        new CustomEvent('change', {
          detail,
          bubbles: true,
          composed: true,
        }),
      );
      this.dispatchEvent(
        new CustomEvent('input', {
          detail,
          bubbles: true,
          composed: true,
        }),
      );
    }
    handleSlotClick(event) {
      const target = event.target.closest('magic-option');
      if (target && !target.disabled)
        this.handleSelectOption({
          value: target.value,
          label: target.label || target.textContent?.trim(),
        });
    }
    handleOptionMouseEnter(item, event) {
      if (isArray(item.children) && item.children.length > 0) {
        this.activeSubmenuValue = item.value;
        const target = event.currentTarget;
        this.submenuTop = target?.offsetTop || 0;
      } else this.activeSubmenuValue = '';
    }
    handleDropdownMouseLeave() {
      this.activeSubmenuValue = '';
    }
    renderSubOptionList(children) {
      if (!isArray(children) || children.length === 0) return b``;
      return children.map((item) => {
        return b`
        <div class="${[
          'magic-option',
          String(item.value) === String(this.value) ? 'is-selected' : '',
          item.disabled ? 'is-disabled' : '',
        ]
          .filter(Boolean)
          .join(' ')}" @click=${(e) => this.handleSelectOption(item, e)}>
          <span>${item.label ?? item.value}</span>
        </div>
      `;
      });
    }
    renderOptionList() {
      if (!this.options || this.options.length === 0)
        return b`
        <div @click=${this.handleSlotClick}>
          <slot></slot>
        </div>
      `;
      return this.options.map((item) => {
        const hasChildren = isArray(item.children) && item.children.length > 0;
        const isSelected = String(item.value) === String(this.value);
        const hasSelectedChild =
          hasChildren && item.children.some((c) => String(c.value) === String(this.value));
        const isActiveParent = String(item.value) === String(this.activeSubmenuValue);
        return b`
        <div
          class="${[
            'magic-option',
            isSelected ? 'is-selected' : '',
            hasSelectedChild ? 'has-selected-child' : '',
            isActiveParent ? 'is-active-parent' : '',
            item.disabled ? 'is-disabled' : '',
            hasChildren ? 'has-children' : '',
          ]
            .filter(Boolean)
            .join(' ')}"
          @mouseenter=${(e) => this.handleOptionMouseEnter(item, e)}
          @click=${(e) => {
            if (!hasChildren) this.handleSelectOption(item, e);
          }}
        >
          <span>${item.label ?? item.value}</span>
          ${hasChildren ? b`<span class="magic-option__arrow">${SELECT_ICONS.chevronRight}</span>` : b``}
        </div>
      `;
      });
    }
    render() {
      const hasValue = this.value !== void 0 && this.value !== null && this.value !== '';
      const displayLabel = this.currentLabel;
      const subItem = this.activeSubmenuItem;
      return b`
      <div class="${[
        'magic-select',
        `magic-select--${this.size || 'medium'}`,
        this.open ? 'is-open' : '',
        this.disabled ? 'is-disabled' : '',
        hasValue ? 'has-value' : '',
        this.clearable ? 'is-clearable' : '',
      ]
        .filter(Boolean)
        .join(' ')}">
        <div class="magic-select__trigger" @click=${this.toggleDropdown} role="button" tabindex="0">
          <span class="magic-select__label ${hasValue ? '' : 'is-placeholder'}">
            ${hasValue ? displayLabel : this.placeholder}
          </span>
          <span class="magic-select__suffix ${this.open ? 'is-reverse' : ''}">
            ${SELECT_ICONS.arrowDown}
          </span>
          ${
            this.clearable && hasValue && !this.disabled
              ? b`
                  <span
                    class="magic-select__clear"
                    @click=${this.handleClear}
                    title="清空"
                    role="button"
                  >
                    ${SELECT_ICONS.clear}
                  </span>
                `
              : b``
          }
        </div>

        ${
          this.open
            ? b`
                <div
                  class="magic-select__dropdown-container"
                  @mouseleave=${this.handleDropdownMouseLeave}
                >
                  <div class="magic-select__dropdown" role="listbox">
                    ${this.renderOptionList()}
                  </div>
                  ${
                    subItem && isArray(subItem.children)
                      ? b`
                          <div
                            class="magic-select__sub-dropdown"
                            style="top: ${this.submenuTop}px"
                            role="listbox"
                          >
                            ${this.renderSubOptionList(subItem.children)}
                          </div>
                        `
                      : b``
                  }
                </div>
              `
            : b``
        }
      </div>
    `;
    }
  };
  if (!customElements.get('magic-option')) customElements.define('magic-option', MagicOption);
  if (!customElements.get('magic-select')) customElements.define('magic-select', MagicSelect);
  var style_default$1 =
    ':host{vertical-align:middle;display:inline-block}.magic-version{box-sizing:border-box;font-variant-numeric:tabular-nums;background:var(--magic-version-bg,var(--magic-bg-subtle));border:1px solid var(--magic-version-border,var(--magic-border-color));color:var(--magic-version-color,var(--magic-text-secondary));-webkit-user-select:none;user-select:none;border-radius:9999px;justify-content:center;align-items:center;gap:4px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-weight:500;line-height:1;transition:all .2s cubic-bezier(.16,1,.3,1);display:inline-flex}.magic-version--mini{height:18px;padding:0 6px;font-size:11px}.magic-version--small{height:20px;padding:0 8px;font-size:12px}.magic-version--medium{height:24px;padding:0 10px;font-size:13px}.magic-version__content{align-items:center;display:inline-flex}';
  var MagicVersion = class extends i {
    static properties = {
      version: String,
      prefix: String,
      size: String,
    };
    static styles = r$2(style_default$1);
    constructor() {
      super();
      this.version = '';
      this.prefix = 'v';
      this.size = 'small';
    }
    get displayVersion() {
      let ver = (this.version || '').trim();
      if (!ver && typeof GM_info !== 'undefined') ver = (GM_info?.script?.version || '').trim();
      if (!ver) return '';
      const p = this.prefix != null ? this.prefix : 'v';
      if (!p) return ver;
      return `${p}${ver.replace(new RegExp(`^${p}`, 'i'), '')}`;
    }
    render() {
      return b`
      <span class="${['magic-version', `magic-version--${this.size || 'small'}`].filter(Boolean).join(' ')}">
        <slot name="prefix"></slot>
        <span class="magic-version__content">
          <slot>${this.displayVersion}</slot>
        </span>
        <slot name="suffix"></slot>
      </span>
    `;
    }
  };
  if (!customElements.get('magic-version')) customElements.define('magic-version', MagicVersion);
  var style_default =
    ':host{font-family:inherit;display:block}@keyframes magic-toast-in{0%{opacity:0;transform:translateY(-16px)scale(.95)}to{opacity:1;transform:translateY(0)scale(1)}}@keyframes magic-toast-out{0%{opacity:1;transform:translateY(0)scale(1)}to{opacity:0;transform:translateY(-16px)scale(.95)}}.magic-toast-container{z-index:var(--magic-toast-z-index,999999);pointer-events:none;box-sizing:border-box;flex-direction:column;align-items:center;gap:10px;width:max-content;max-width:90vw;display:flex;position:fixed;left:50%;transform:translate(-50%)}.magic-toast-container--top{top:24px}.magic-toast-container--center{top:50%;transform:translate(-50%,-50%)}.magic-toast-container--bottom{bottom:24px}.magic-toast{box-sizing:border-box;border-radius:var(--magic-toast-radius,8px);background:var(--magic-toast-bg,#1c1e24f0);min-height:40px;color:var(--magic-toast-color,#e5e9ef);border:1px solid var(--magic-toast-border,#ffffff1f);box-shadow:var(--magic-toast-shadow,0 10px 30px #00000073);-webkit-backdrop-filter:blur(12px);pointer-events:auto;-webkit-user-select:none;user-select:none;align-items:center;gap:10px;padding:10px 18px;font-size:14px;line-height:1.4;transition:all .25s;animation:.25s cubic-bezier(.16,1,.3,1) forwards magic-toast-in;display:inline-flex}.magic-toast.is-leaving{animation:.2s cubic-bezier(.4,0,1,1) forwards magic-toast-out}.magic-toast__icon{flex-shrink:0;justify-content:center;align-items:center;width:18px;height:18px;display:inline-flex}.magic-toast__icon svg{width:100%;height:100%;display:block}.magic-toast__content{word-break:break-word;align-items:center;display:inline-flex}.magic-toast__close{cursor:pointer;opacity:.6;color:inherit;background:0 0;border:none;border-radius:4px;justify-content:center;align-items:center;margin-left:6px;padding:2px;transition:opacity .2s,background-color .2s;display:inline-flex}.magic-toast__close:hover{opacity:1;background-color:#ffffff1a}.magic-toast__close svg{width:14px;height:14px}.magic-toast--info .magic-toast__icon{color:var(--magic-toast-info-color,var(--magic-primary-color))}.magic-toast--success .magic-toast__icon{color:var(--magic-toast-success-color,#2ac864)}.magic-toast--warning .magic-toast__icon{color:var(--magic-toast-warning-color,#fa9600)}.magic-toast--error .magic-toast__icon{color:var(--magic-toast-error-color,#ff5c7c)}';
  var TOAST_ICONS = {
    info: b`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  `,
    success: b`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  `,
    warning: b`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  `,
    error: b`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  `,
    close: b`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  `,
  };
  var MagicToast = class MagicToast extends i {
    static properties = {
      message: String,
      type: String,
      duration: Number,
      position: String,
      visible: {
        type: Boolean,
        reflect: true,
      },
      closable: Boolean,
      _isLeaving: { state: true },
    };
    static styles = r$2(style_default);
    #timer = null;
    constructor() {
      super();
      this.message = '';
      this.type = 'info';
      this.duration = 2500;
      this.position = 'top';
      this.visible = false;
      this.closable = false;
      this._isLeaving = false;
    }
    connectedCallback() {
      super.connectedCallback();
      if (this.visible) this.startTimer();
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.clearTimer();
    }
    updated(changedProperties) {
      if (changedProperties.has('visible')) {
        if (this.visible) {
          this._isLeaving = false;
          this.startTimer();
        } else {
          this.clearTimer();
          this._isLeaving = false;
        }
      }
    }
    startTimer() {
      this.clearTimer();
      if (this.duration > 0)
        this.#timer = setTimeout(() => {
          this.close();
        }, this.duration);
    }
    clearTimer() {
      if (this.#timer) {
        clearTimeout(this.#timer);
        this.#timer = null;
      }
    }
    async close() {
      if (!this.visible && !this._isLeaving) return;
      this.clearTimer();
      this._isLeaving = true;
      await sleep(200);
      this.visible = false;
      this._isLeaving = false;
      this.dispatchEvent(
        new CustomEvent('close', {
          bubbles: true,
          composed: true,
        }),
      );
    }
    static getOrCreateContainer(position = 'top') {
      const containerId = `magic-toast-root-${position}`;
      let container = document.getElementById(containerId);
      if (!container) {
        container = document.createElement('div');
        container.id = containerId;
        container.className = `magic-toast-container magic-toast-container--${position}`;
        const posStyle =
          position === 'bottom'
            ? 'bottom: 24px; transform: translateX(-50%);'
            : position === 'center'
              ? 'top: 50%; transform: translate(-50%, -50%);'
              : 'top: 24px; transform: translateX(-50%);';
        container.style.cssText = `position: fixed; left: 50%; ${posStyle} z-index: var(--magic-toast-z-index, 999999); display: flex; flex-direction: column; align-items: center; gap: 10px; pointer-events: none; width: max-content; max-width: 90vw; box-sizing: border-box;`;
        document.body.appendChild(container);
      }
      return container;
    }
    static show(options = {}) {
      const {
        message = '',
        type = 'info',
        duration = 2500,
        position = 'top',
        closable = false,
      } = isString(options) ? { message: options } : options;
      const container = MagicToast.getOrCreateContainer(position);
      const toastEl = document.createElement('magic-toast');
      toastEl.message = message;
      toastEl.type = type;
      toastEl.duration = duration;
      toastEl.position = position;
      toastEl.closable = closable;
      container.appendChild(toastEl);
      toastEl.visible = true;
      once(toastEl, 'close', () => {
        toastEl.remove();
        if (!container.children.length) container.remove();
      });
      return { close: () => toastEl.close() };
    }
    static info(message, duration) {
      return MagicToast.show({
        message,
        type: 'info',
        duration,
      });
    }
    static success(message, duration) {
      return MagicToast.show({
        message,
        type: 'success',
        duration,
      });
    }
    static warning(message, duration) {
      return MagicToast.show({
        message,
        type: 'warning',
        duration,
      });
    }
    static error(message, duration) {
      return MagicToast.show({
        message,
        type: 'error',
        duration,
      });
    }
    render() {
      if (!this.visible && !this._isLeaving) return b``;
      return b`
      <div class="${[
        'magic-toast',
        `magic-toast--${this.type || 'info'}`,
        this._isLeaving ? 'is-leaving' : '',
      ]
        .filter(Boolean)
        .join(' ')}" role="alert">
        <span class="magic-toast__icon">
          <slot name="icon">${TOAST_ICONS[this.type] || TOAST_ICONS.info}</slot>
        </span>
        <span class="magic-toast__content">
          <slot>${this.message}</slot>
        </span>
        ${
          this.closable
            ? b`
                <button class="magic-toast__close" @click=${this.close}>
                  ${TOAST_ICONS.close}
                </button>
              `
            : b``
        }
      </div>
    `;
    }
  };
  var toast = {
    show: (options) => MagicToast.show(options),
    info: (msg, dur) => MagicToast.info(msg, dur),
    success: (msg, dur) => MagicToast.success(msg, dur),
    warning: (msg, dur) => MagicToast.warning(msg, dur),
    error: (msg, dur) => MagicToast.error(msg, dur),
  };
  if (!customElements.get('magic-toast')) customElements.define('magic-toast', MagicToast);
  var _plugin_vue_export_helper_default = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) target[key] = val;
    return target;
  };
  var _hoisted_1 = ['visible'];
  var _hoisted_2 = {
    slot: 'header',
    class: 'settings-modal-header',
  };
  var _hoisted_3 = ['version'];
  var _hoisted_4 = { class: 'settings-container' };
  var _hoisted_5 = { class: 'settings-nav' };
  var _hoisted_6 = ['value'];
  var _hoisted_7 = { class: 'settings-content' };
  var _hoisted_8 = { class: 'settings-section' };
  var _hoisted_9 = { class: 'settings-card' };
  var _hoisted_10 = { class: 'settings-item' };
  var _hoisted_11 = { class: 'settings-item__info' };
  var _hoisted_12 = { class: 'settings-item__title' };
  var _hoisted_13 = { class: 'settings-item__action' };
  var _hoisted_14 = ['checked'];
  var _hoisted_15 = { class: 'settings-section' };
  var _hoisted_16 = { class: 'settings-card' };
  var _hoisted_17 = {
    key: 0,
    class: 'settings-item settings-item--slider',
  };
  var _hoisted_18 = { class: 'slider-action' };
  var _hoisted_19 = ['value'];
  var _hoisted_20 = { class: 'settings-item settings-item--slider' };
  var _hoisted_21 = { class: 'slider-action' };
  var _hoisted_22 = ['format-tooltip', 'value'];
  var _hoisted_23 = { class: 'settings-item settings-item--slider' };
  var _hoisted_24 = { class: 'slider-action' };
  var _hoisted_25 = ['format-tooltip', 'value'];
  var _hoisted_26 = { class: 'settings-section' };
  var _hoisted_27 = { class: 'settings-section__title' };
  var _hoisted_28 = { class: 'title-left' };
  var _hoisted_29 = { class: 'rule-count' };
  var _hoisted_30 = { class: 'title-right' };
  var _hoisted_31 = ['title'];
  var _hoisted_32 = { class: 'settings-card blacklist-card' };
  var _hoisted_33 = { class: 'add-rule-form' };
  var _hoisted_34 = { class: 'rule-type-select' };
  var _hoisted_35 = ['options', 'value'];
  var _hoisted_36 = { class: 'rule-input-field' };
  var _hoisted_37 = ['placeholder', 'value'];
  var _hoisted_38 = { class: 'rule-tags-container' };
  var _hoisted_39 = {
    key: 0,
    class: 'empty-rules',
  };
  var _hoisted_40 = { class: 'tag-text' };
  var _hoisted_41 = ['onClick'];
  var SettingsModal_default = _plugin_vue_export_helper_default(
    {
      __name: 'index',
      props: {
        visible: {
          type: Boolean,
          default: false,
        },
        title: {
          type: String,
          default: '',
        },
      },
      emits: ['close', 'update:visible'],
      setup(__props, { emit: __emit }) {
        const TAB_ITEMS = [
          {
            label: '视频弹幕',
            value: 'video',
          },
          {
            label: '直播弹幕',
            value: 'live',
          },
        ];
        function getRuleContent(rule) {
          return rule.type === RULE_TYPE.REGEX ? rule.pattern : rule.keyword;
        }
        function hasDuplicateRule(list, type, content) {
          return list.some((r) => r.type === type && getRuleContent(r) === content);
        }
        function buildRuleItem(type, value) {
          if (type === RULE_TYPE.REGEX) {
            const res = parseAndValidateRegex(value, {
              disallowEmptyMatch: true,
              emptyMatchError: '该正则会匹配空字符，可能导致所有弹幕被屏蔽，请优化表达式',
            });
            if (!res.valid) throw new Error(res.error);
            return {
              type: RULE_TYPE.REGEX,
              pattern: res.pattern,
              ...(res.flags ? { flags: res.flags } : {}),
            };
          }
          return {
            type,
            keyword: value,
          };
        }
        const props = __props;
        const emit = __emit;
        const { config, updateConfig } = useConfig();
        const activeTab = (0, vue.ref)('video');
        const formData = (0, vue.ref)(structuredClone((0, vue.toRaw)(config)));
        const ruleType = (0, vue.ref)(RULE_TYPE.CONTAINS);
        const ruleKeyword = (0, vue.ref)('');
        const currentTabConfig = (0, vue.computed)(() => formData.value?.[activeTab.value] || {});
        const currentBlacklist = (0, vue.computed)(() => {
          return activeTab.value === 'live'
            ? formData.value.live.blacklist
            : formData.value.video.blacklist;
        });
        (0, vue.watch)(
          () => props.visible,
          (val) => {
            if (val) {
              formData.value = structuredClone((0, vue.toRaw)(config));
              ruleKeyword.value = '';
            }
          },
          { immediate: true },
        );
        const handleAddRule = () => {
          const val = ruleKeyword.value.trim();
          if (!val) {
            toast.warning('请输入规则关键词或正则表达式');
            return;
          }
          const list = currentBlacklist.value;
          const type = ruleType.value;
          if (hasDuplicateRule(list, type, val)) {
            toast.warning('该黑名单规则已存在，请勿重复添加');
            return;
          }
          try {
            const newRule = buildRuleItem(type, val);
            list.push(newRule);
            ruleKeyword.value = '';
            toast.success('已添加黑名单规则');
          } catch (err) {
            toast.error(err.message || '输入的正则表达式格式无效，请检查！');
          }
        };
        const handleRemoveRule = (index) => {
          currentBlacklist.value.splice(index, 1);
        };
        const handleExportRules = () => {
          const list = currentBlacklist.value;
          if (!list || list.length === 0) {
            toast.warning('当前黑名单列表为空，无需导出');
            return;
          }
          try {
            const jsonStr = JSON.stringify(list, null, 2);
            const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const label = activeTab.value === 'live' ? '直播' : '视频';
            a.href = url;
            a.download = `bili-danmaku-blacklist-${activeTab.value}-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
            toast.success(`已导出 ${list.length} 条${label}黑名单规则`);
          } catch (err) {
            toast.error('导出失败: ' + err.message);
          }
        };
        function pickJsonFile() {
          return new Promise((resolve) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.addEventListener('cancel', (e) => {
              e.stopPropagation();
              resolve(null);
            });
            input.addEventListener('change', async (event) => {
              const file = event.target?.files?.[0];
              if (!file) {
                resolve(null);
                return;
              }
              try {
                resolve(await file.text());
              } catch {
                resolve(null);
              }
            });
            input.click();
          });
        }
        function parseImportedRules(text, currentScope) {
          let raw;
          try {
            raw = JSON.parse(text);
          } catch {
            return {
              valid: false,
              error: '文件解析失败，请确保是合法的 JSON 格式',
            };
          }
          if (Array.isArray(raw))
            return {
              valid: true,
              rules: raw,
            };
          if (Array.isArray(raw?.rules))
            return {
              valid: true,
              rules: raw.rules,
            };
          if (Array.isArray(raw?.[currentScope]))
            return {
              valid: true,
              rules: raw[currentScope],
            };
          return {
            valid: false,
            error: '格式不符：导入内容应为规则数组',
          };
        }
        function parseImportRuleItem(item) {
          if (!item || typeof item !== 'object') return null;
          const type = item.type;
          const val = type === RULE_TYPE.REGEX ? item.pattern : item.keyword;
          if (!val || typeof val !== 'string' || !val.trim()) return null;
          try {
            if (type === RULE_TYPE.REGEX) {
              const patternInput = item.flags ? `/${item.pattern}/${item.flags}` : item.pattern;
              return buildRuleItem(RULE_TYPE.REGEX, patternInput);
            }
            if (type === RULE_TYPE.CONTAINS || type === RULE_TYPE.EXACT)
              return buildRuleItem(type, val.trim());
          } catch {
            return null;
          }
          return null;
        }
        function mergeImportedRules(rawRules, targetList) {
          let addedCount = 0;
          let skippedCount = 0;
          let invalidCount = 0;
          for (const item of rawRules) {
            const rule = parseImportRuleItem(item);
            if (!rule) {
              invalidCount++;
              continue;
            }
            const content = getRuleContent(rule);
            if (hasDuplicateRule(targetList, rule.type, content)) {
              skippedCount++;
              continue;
            }
            targetList.push(rule);
            addedCount++;
          }
          return {
            addedCount,
            skippedCount,
            invalidCount,
          };
        }
        function notifyImportSummary({ addedCount, skippedCount, invalidCount }, scope) {
          const label = scope === 'live' ? '直播' : '视频';
          if (addedCount > 0) {
            let msg = `成功导入 ${addedCount} 条${label}黑名单规则`;
            if (skippedCount > 0) msg += `（跳过 ${skippedCount} 条重复）`;
            if (invalidCount > 0) msg += `（忽略 ${invalidCount} 条无效）`;
            toast.success(msg);
            return;
          }
          toast.warning(
            `未新增任何规则${skippedCount > 0 ? `（${skippedCount} 条已存在）` : ''}${invalidCount > 0 ? `（${invalidCount} 条无效）` : ''}`,
          );
        }
        const triggerImportRules = async () => {
          const text = await pickJsonFile();
          if (!text) return;
          const res = parseImportedRules(text, activeTab.value);
          if (!res.valid) {
            toast.error(res.error);
            return;
          }
          if (res.rules.length === 0) {
            toast.warning('文件中没有可导入的规则');
            return;
          }
          notifyImportSummary(
            mergeImportedRules(res.rules, currentBlacklist.value),
            activeTab.value,
          );
        };
        const handleSyncToOther = async () => {
          const sourceList = currentBlacklist.value;
          if (!sourceList || sourceList.length === 0) {
            toast.warning('当前黑名单列表为空，无法合并');
            return;
          }
          const isLive = activeTab.value === 'live';
          const targetKey = isLive ? 'video' : 'live';
          const targetList = formData.value[targetKey].blacklist;
          const targetLabel = isLive ? '视频黑名单' : '直播黑名单';
          const sourceLabel = isLive ? '直播黑名单' : '视频黑名单';
          if (
            !(await modal.confirm({
              title: `合并到${targetLabel}`,
              content: `确定要将当前【${sourceLabel}】的 ${sourceList.length} 条规则合并到【${targetLabel}】吗？`,
            }))
          )
            return;
          let addedCount = 0;
          let skippedCount = 0;
          for (const rule of sourceList) {
            const content = getRuleContent(rule);
            if (hasDuplicateRule(targetList, rule.type, content)) skippedCount++;
            else {
              targetList.push(structuredClone((0, vue.toRaw)(rule)));
              addedCount++;
            }
          }
          if (addedCount > 0)
            toast.success(
              `成功合并 ${addedCount} 条规则到【${targetLabel}】${skippedCount > 0 ? `（跳过 ${skippedCount} 条重复）` : ''}`,
            );
          else toast.info(`【${targetLabel}】中已包含全部规则，无需重复合并`);
        };
        const handleResetDefaults = async () => {
          const isLive = activeTab.value === 'live';
          const targetLabel = isLive ? '直播弹幕' : '视频弹幕';
          if (
            await modal.confirm({
              title: '恢复默认配置',
              content: `确定要将当前【${targetLabel}】配置恢复为默认初始状态吗？（黑名单规则将保留）`,
            })
          ) {
            if (isLive) {
              const preservedBlacklist = formData.value.live.blacklist;
              formData.value.live = {
                ...structuredClone(DEFAULT_LIVE_CONFIG),
                blacklist: preservedBlacklist,
              };
            } else {
              const preservedBlacklist = formData.value.video.blacklist;
              formData.value.video = {
                ...structuredClone(DEFAULT_VIDEO_CONFIG),
                blacklist: preservedBlacklist,
              };
            }
            toast.info(`已恢复${targetLabel}配置为默认值`);
          }
        };
        const handleCancel = (e) => {
          if (e && e.target && e.target.tagName === 'INPUT') return;
          formData.value = structuredClone((0, vue.toRaw)(config));
          emit('update:visible', false);
          emit('close');
        };
        const handleConfirm = () => {
          updateConfig(formData.value);
          toast.success('配置已保存');
          emit('update:visible', false);
          emit('close');
        };
        return (_ctx, _cache) => {
          return (
            (0, vue.openBlock)(),
            (0, vue.createBlock)(vue.Teleport, { to: 'body' }, [
              (0, vue.createElementVNode)(
                'magic-modal',
                {
                  visible: __props.visible,
                  centered: '',
                  height: '750px',
                  width: '680px',
                  onCancel: handleCancel,
                  onClose: handleCancel,
                  onConfirm: handleConfirm,
                },
                [
                  (0, vue.createElementVNode)('div', _hoisted_2, [
                    _cache[7] ||
                      (_cache[7] = (0, vue.createElementVNode)(
                        'span',
                        { class: 'settings-modal-title' },
                        'bilibili-danmaku-filter',
                        -1,
                      )),
                    (0, vue.createElementVNode)(
                      'magic-version',
                      { version: (0, vue.unref)(version) },
                      null,
                      8,
                      _hoisted_3,
                    ),
                  ]),
                  (0, vue.createElementVNode)('div', _hoisted_4, [
                    (0, vue.createElementVNode)('div', _hoisted_5, [
                      (0, vue.createElementVNode)(
                        'magic-tabs',
                        {
                          block: false,
                          items: TAB_ITEMS,
                          value: (0, vue.unref)(activeTab),
                          inline: '',
                          onChange:
                            _cache[0] || (_cache[0] = (e) => (activeTab.value = e.detail.value)),
                        },
                        null,
                        40,
                        _hoisted_6,
                      ),
                    ]),
                    (0, vue.createElementVNode)('div', _hoisted_7, [
                      (0, vue.createElementVNode)('div', _hoisted_8, [
                        _cache[9] ||
                          (_cache[9] = (0, vue.createElementVNode)(
                            'div',
                            { class: 'settings-section__title' },
                            [
                              (0, vue.createElementVNode)('div', { class: 'title-left' }, [
                                (0, vue.createElementVNode)('span', null, '基础拦截'),
                              ]),
                            ],
                            -1,
                          )),
                        (0, vue.createElementVNode)('div', _hoisted_9, [
                          (0, vue.createElementVNode)('div', _hoisted_10, [
                            (0, vue.createElementVNode)('div', _hoisted_11, [
                              (0, vue.createElementVNode)(
                                'div',
                                _hoisted_12,
                                (0, vue.toDisplayString)(
                                  (0, vue.unref)(activeTab) === 'video'
                                    ? '启用视频弹幕过滤'
                                    : '启用直播弹幕过滤',
                                ),
                                1,
                              ),
                              _cache[8] ||
                                (_cache[8] = (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__desc' },
                                  '关闭后将直接放行原始分段弹幕数据',
                                  -1,
                                )),
                            ]),
                            (0, vue.createElementVNode)('div', _hoisted_13, [
                              (0, vue.createElementVNode)(
                                'magic-switch',
                                {
                                  checked: (0, vue.unref)(currentTabConfig).enabled,
                                  size: 'small',
                                  onChange:
                                    _cache[1] ||
                                    (_cache[1] = (e) =>
                                      ((0, vue.unref)(currentTabConfig).enabled = e.detail.value)),
                                },
                                null,
                                40,
                                _hoisted_14,
                              ),
                            ]),
                          ]),
                        ]),
                      ]),
                      (0, vue.createElementVNode)('div', _hoisted_15, [
                        _cache[13] ||
                          (_cache[13] = (0, vue.createElementVNode)(
                            'div',
                            { class: 'settings-section__title' },
                            [
                              (0, vue.createElementVNode)('div', { class: 'title-left' }, [
                                (0, vue.createElementVNode)('span', null, '阈值'),
                              ]),
                            ],
                            -1,
                          )),
                        (0, vue.createElementVNode)('div', _hoisted_16, [
                          (0, vue.unref)(activeTab) === 'video'
                            ? ((0, vue.openBlock)(),
                              (0, vue.createElementBlock)('div', _hoisted_17, [
                                _cache[10] ||
                                  (_cache[10] = (0, vue.createElementVNode)(
                                    'div',
                                    { class: 'settings-item__info' },
                                    [
                                      (0, vue.createElementVNode)(
                                        'div',
                                        { class: 'settings-item__title' },
                                        '权重过滤阈值',
                                      ),
                                      (0, vue.createElementVNode)(
                                        'div',
                                        { class: 'settings-item__desc' },
                                        ' 弹幕质量评分，低于该值的低质弹幕将被过滤（1全放行，11最高） ',
                                      ),
                                    ],
                                    -1,
                                  )),
                                (0, vue.createElementVNode)('div', _hoisted_18, [
                                  (0, vue.createElementVNode)(
                                    'magic-slider',
                                    {
                                      max: 11,
                                      min: 1,
                                      step: 1,
                                      value: (0, vue.unref)(formData).video.minWeight,
                                      'show-stops': '',
                                      'show-value': '',
                                      size: 'small',
                                      onChange:
                                        _cache[2] ||
                                        (_cache[2] = (e) =>
                                          ((0, vue.unref)(formData).video.minWeight =
                                            e.detail.value)),
                                    },
                                    null,
                                    40,
                                    _hoisted_19,
                                  ),
                                ]),
                              ]))
                            : (0, vue.createCommentVNode)('', true),
                          (0, vue.createElementVNode)('div', _hoisted_20, [
                            _cache[11] ||
                              (_cache[11] = (0, vue.createElementVNode)(
                                'div',
                                { class: 'settings-item__info' },
                                [
                                  (0, vue.createElementVNode)(
                                    'div',
                                    { class: 'settings-item__title' },
                                    '防刷屏相似度',
                                  ),
                                  (0, vue.createElementVNode)(
                                    'div',
                                    { class: 'settings-item__desc' },
                                    ' 时段内相近弹幕合并的相似度门槛（值越高越严格，1.0 为拦截完全相同） ',
                                  ),
                                ],
                                -1,
                              )),
                            (0, vue.createElementVNode)('div', _hoisted_21, [
                              (0, vue.createElementVNode)(
                                'magic-slider',
                                {
                                  'format-tooltip': (v) => Number(v).toFixed(2),
                                  max: 1,
                                  min: 0.5,
                                  step: 0.05,
                                  value: (0, vue.unref)(currentTabConfig).mergeThreshold,
                                  'show-value': '',
                                  size: 'small',
                                  onChange:
                                    _cache[3] ||
                                    (_cache[3] = (e) =>
                                      ((0, vue.unref)(currentTabConfig).mergeThreshold =
                                        e.detail.value)),
                                },
                                null,
                                40,
                                _hoisted_22,
                              ),
                            ]),
                          ]),
                          (0, vue.createElementVNode)('div', _hoisted_23, [
                            _cache[12] ||
                              (_cache[12] = (0, vue.createElementVNode)(
                                'div',
                                { class: 'settings-item__info' },
                                [
                                  (0, vue.createElementVNode)(
                                    'div',
                                    { class: 'settings-item__title' },
                                    '合并时间窗口',
                                  ),
                                  (0, vue.createElementVNode)(
                                    'div',
                                    { class: 'settings-item__desc' },
                                    ' 指定秒数内出现的相似弹幕合并为 1 条，超过就算作下一批（建议数值不要过大） ',
                                  ),
                                ],
                                -1,
                              )),
                            (0, vue.createElementVNode)('div', _hoisted_24, [
                              (0, vue.createElementVNode)(
                                'magic-slider',
                                {
                                  'format-tooltip': (v) => `${v}s`,
                                  max: 15,
                                  min: 1,
                                  step: 1,
                                  value: (0, vue.unref)(currentTabConfig).mergeWindow,
                                  'show-stops': '',
                                  'show-value': '',
                                  size: 'small',
                                  onChange:
                                    _cache[4] ||
                                    (_cache[4] = (e) =>
                                      ((0, vue.unref)(currentTabConfig).mergeWindow =
                                        e.detail.value)),
                                },
                                null,
                                40,
                                _hoisted_25,
                              ),
                            ]),
                          ]),
                        ]),
                      ]),
                      (0, vue.createElementVNode)('div', _hoisted_26, [
                        (0, vue.createElementVNode)('div', _hoisted_27, [
                          (0, vue.createElementVNode)('div', _hoisted_28, [
                            (0, vue.createElementVNode)(
                              'span',
                              null,
                              (0, vue.toDisplayString)(
                                (0, vue.unref)(activeTab) === 'video' ? '视频黑名单' : '直播黑名单',
                              ),
                              1,
                            ),
                            (0, vue.createElementVNode)(
                              'span',
                              _hoisted_29,
                              '共 ' +
                                (0, vue.toDisplayString)((0, vue.unref)(currentBlacklist).length) +
                                ' 条',
                              1,
                            ),
                          ]),
                          (0, vue.createElementVNode)('div', _hoisted_30, [
                            (0, vue.createElementVNode)(
                              'button',
                              {
                                class: 'action-btn',
                                title: '导出当前黑名单为 JSON 文件',
                                type: 'button',
                                onClick: handleExportRules,
                              },
                              [
                                ...(_cache[14] ||
                                  (_cache[14] = [
                                    (0, vue.createElementVNode)(
                                      'svg',
                                      {
                                        class: 'action-btn__icon',
                                        fill: 'none',
                                        stroke: 'currentColor',
                                        'stroke-width': '2',
                                        viewBox: '0 0 24 24',
                                      },
                                      [
                                        (0, vue.createElementVNode)('path', {
                                          d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4',
                                        }),
                                        (0, vue.createElementVNode)('polyline', {
                                          points: '7 10 12 15 17 10',
                                        }),
                                        (0, vue.createElementVNode)('line', {
                                          x1: '12',
                                          x2: '12',
                                          y1: '15',
                                          y2: '3',
                                        }),
                                      ],
                                      -1,
                                    ),
                                    (0, vue.createElementVNode)('span', null, '导出', -1),
                                  ])),
                              ],
                            ),
                            (0, vue.createElementVNode)(
                              'button',
                              {
                                class: 'action-btn',
                                title: '从 JSON 文件导入黑名单',
                                type: 'button',
                                onClick: triggerImportRules,
                              },
                              [
                                ...(_cache[15] ||
                                  (_cache[15] = [
                                    (0, vue.createElementVNode)(
                                      'svg',
                                      {
                                        class: 'action-btn__icon',
                                        fill: 'none',
                                        stroke: 'currentColor',
                                        'stroke-width': '2',
                                        viewBox: '0 0 24 24',
                                      },
                                      [
                                        (0, vue.createElementVNode)('path', {
                                          d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4',
                                        }),
                                        (0, vue.createElementVNode)('polyline', {
                                          points: '17 8 12 3 7 8',
                                        }),
                                        (0, vue.createElementVNode)('line', {
                                          x1: '12',
                                          x2: '12',
                                          y1: '3',
                                          y2: '15',
                                        }),
                                      ],
                                      -1,
                                    ),
                                    (0, vue.createElementVNode)('span', null, '导入', -1),
                                  ])),
                              ],
                            ),
                            (0, vue.createElementVNode)(
                              'button',
                              {
                                title: `将当前列表规则合并到${(0, vue.unref)(activeTab) === 'video' ? '直播' : '视频'}黑名单`,
                                class: 'action-btn',
                                type: 'button',
                                onClick: handleSyncToOther,
                              },
                              [
                                _cache[16] ||
                                  (_cache[16] = (0, vue.createElementVNode)(
                                    'svg',
                                    {
                                      class: 'action-btn__icon',
                                      fill: 'none',
                                      stroke: 'currentColor',
                                      'stroke-width': '2',
                                      viewBox: '0 0 24 24',
                                    },
                                    [
                                      (0, vue.createElementVNode)('path', {
                                        d: 'M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8',
                                      }),
                                      (0, vue.createElementVNode)('path', { d: 'M3 3v5h5' }),
                                      (0, vue.createElementVNode)('path', {
                                        d: 'M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16',
                                      }),
                                      (0, vue.createElementVNode)('path', { d: 'M16 16h5v5' }),
                                    ],
                                    -1,
                                  )),
                                (0, vue.createElementVNode)(
                                  'span',
                                  null,
                                  (0, vue.toDisplayString)(
                                    (0, vue.unref)(activeTab) === 'video'
                                      ? '合并到直播'
                                      : '合并到视频',
                                  ),
                                  1,
                                ),
                              ],
                              8,
                              _hoisted_31,
                            ),
                          ]),
                        ]),
                        (0, vue.createElementVNode)('div', _hoisted_32, [
                          (0, vue.createElementVNode)('div', _hoisted_33, [
                            (0, vue.createElementVNode)('div', _hoisted_34, [
                              (0, vue.createElementVNode)(
                                'magic-select',
                                {
                                  options: (0, vue.unref)(RULE_TYPE_OPTIONS),
                                  value: (0, vue.unref)(ruleType),
                                  size: 'small',
                                  onChange:
                                    _cache[5] ||
                                    (_cache[5] = (e) => (ruleType.value = e.detail.value)),
                                },
                                null,
                                40,
                                _hoisted_35,
                              ),
                            ]),
                            (0, vue.createElementVNode)('div', _hoisted_36, [
                              (0, vue.createElementVNode)(
                                'magic-input',
                                {
                                  placeholder:
                                    (0, vue.unref)(ruleType) === (0, vue.unref)(RULE_TYPE).REGEX
                                      ? '输入正则表达式，如: ^233+ 或 /关键词/i'
                                      : '输入关键词，回车快速添加...',
                                  value: (0, vue.unref)(ruleKeyword),
                                  block: '',
                                  clearable: '',
                                  size: 'small',
                                  onInput:
                                    _cache[6] ||
                                    (_cache[6] = (e) => (ruleKeyword.value = e.detail.value)),
                                  onKeydown: (0, vue.withKeys)(handleAddRule, ['enter']),
                                },
                                null,
                                40,
                                _hoisted_37,
                              ),
                            ]),
                            (0, vue.createElementVNode)('div', { class: 'add-btn' }, [
                              (0, vue.createElementVNode)(
                                'magic-button',
                                {
                                  size: 'small',
                                  type: 'primary',
                                  onClick: handleAddRule,
                                },
                                ' 添加 ',
                              ),
                            ]),
                          ]),
                          (0, vue.createElementVNode)('div', _hoisted_38, [
                            (0, vue.unref)(currentBlacklist).length === 0
                              ? ((0, vue.openBlock)(),
                                (0, vue.createElementBlock)(
                                  'div',
                                  _hoisted_39,
                                  ' 暂无黑名单规则，可通过上方输入框添加 ',
                                ))
                              : (0, vue.createCommentVNode)('', true),
                            ((0, vue.openBlock)(true),
                            (0, vue.createElementBlock)(
                              vue.Fragment,
                              null,
                              (0, vue.renderList)(
                                (0, vue.unref)(currentBlacklist),
                                (rule, index) => {
                                  return (
                                    (0, vue.openBlock)(),
                                    (0, vue.createElementBlock)(
                                      'div',
                                      {
                                        key: `${rule.type}-${rule.keyword || rule.pattern}-${index}`,
                                        class: 'rule-tag',
                                      },
                                      [
                                        (0, vue.createElementVNode)(
                                          'span',
                                          {
                                            class: (0, vue.normalizeClass)([
                                              `tag-${rule.type}`,
                                              'tag-badge',
                                            ]),
                                          },
                                          (0, vue.toDisplayString)(
                                            (0, vue.unref)(RULE_TYPE_LABELS)[rule.type] || '包含',
                                          ),
                                          3,
                                        ),
                                        (0, vue.createElementVNode)(
                                          'span',
                                          _hoisted_40,
                                          (0, vue.toDisplayString)(
                                            rule.type === (0, vue.unref)(RULE_TYPE).REGEX
                                              ? rule.flags
                                                ? `/${rule.pattern}/${rule.flags}`
                                                : rule.pattern
                                              : rule.keyword,
                                          ),
                                          1,
                                        ),
                                        (0, vue.createElementVNode)(
                                          'span',
                                          {
                                            class: 'tag-remove',
                                            title: '删除规则',
                                            onClick: ($event) => handleRemoveRule(index),
                                          },
                                          '✕',
                                          8,
                                          _hoisted_41,
                                        ),
                                      ],
                                    )
                                  );
                                },
                              ),
                              128,
                            )),
                          ]),
                        ]),
                      ]),
                    ]),
                  ]),
                  (0, vue.createElementVNode)(
                    'div',
                    {
                      slot: 'footer',
                      class: 'settings-modal-footer',
                    },
                    [
                      (0, vue.createElementVNode)(
                        'magic-button',
                        {
                          size: 'medium',
                          type: 'text',
                          onClick: handleResetDefaults,
                        },
                        ' 恢复默认配置 ',
                      ),
                      (0, vue.createElementVNode)('div', { class: 'footer-buttons' }, [
                        (0, vue.createElementVNode)(
                          'magic-button',
                          {
                            size: 'medium',
                            type: 'default',
                            onClick: handleCancel,
                          },
                          ' 取消 ',
                        ),
                        (0, vue.createElementVNode)(
                          'magic-button',
                          {
                            size: 'medium',
                            type: 'primary',
                            onClick: handleConfirm,
                          },
                          ' 保存 ',
                        ),
                      ]),
                    ],
                  ),
                ],
                40,
                _hoisted_1,
              ),
            ])
          );
        };
      },
    },
    [['__scopeId', 'data-v-35d9bb90']],
  );
  var App_default = _plugin_vue_export_helper_default(
    {
      __name: 'App',
      setup(__props) {
        const isSettingsOpen = (0, vue.ref)(false);
        const toggleSettings = () => {
          isSettingsOpen.value = !isSettingsOpen.value;
        };
        (0, vue.onMounted)(() => {
          if (isFunction(globalThis.GM_registerMenuCommand))
            globalThis.GM_registerMenuCommand('⚙️ 弹幕过滤设置', toggleSettings);
        });
        return (_ctx, _cache) => {
          return (
            (0, vue.openBlock)(),
            (0, vue.createBlock)(
              (0, vue.unref)(SettingsModal_default),
              {
                visible: (0, vue.unref)(isSettingsOpen),
                onClose: _cache[0] || (_cache[0] = ($event) => (isSettingsOpen.value = false)),
              },
              null,
              8,
              ['visible'],
            )
          );
        };
      },
    },
    [['__scopeId', 'data-v-42487830']],
  );
  var isLiveRoom =
    location.hostname === 'live.bilibili.com' && /^\/(?:blanc\/)?\d+\/?$/.test(location.pathname);
  var locationStartsWith = (str) => location.pathname.startsWith(str);
  var isVideoPage =
    location.hostname === 'www.bilibili.com' &&
    (locationStartsWith('/video/') ||
      locationStartsWith('/list/') ||
      locationStartsWith('/bangumi/play/') ||
      locationStartsWith('/cheese/play/'));
  var isDanmakuPage = isLiveRoom || isVideoPage;
  if (isVideoPage) startVideoFilter(readVideoConfig);
  if (isLiveRoom) startLiveFilter(readLiveConfig);
  if (isDanmakuPage)
    await bootstrapApp({
      createApp: vue.createApp,
      rootComponent: App_default,
      mountId: 'bilibili-danmaku-filter-root',
    });
})(Vue);
