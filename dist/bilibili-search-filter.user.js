// ==UserScript==
// @name         bilibili-search-filter
// @namespace    https://github.com/niceKingsley/magic-monkey
// @version      1.0.0
// @author       kingsley
// @description  B站 视频搜索结果过滤
// @icon         https://static.hdslb.com/images/favicon.ico
// @homepageURL  https://github.com/niceKingsley/magic-monkey
// @supportURL   https://github.com/niceKingsley/magic-monkey/issues
// @match        *://search.bilibili.com/*
// @require      https://cdn.jsdelivr.net/npm/vue@3.5.43/dist/vue.global.prod.js
// @grant        GM_addStyle
// @grant        GM_deleteValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
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
    ' .bili-search-filter-bar[data-v-68c495a2]{box-sizing:border-box;background:var(--magic-filter-bar-bg,var(--magic-bg-subtle,#0000000a));-webkit-backdrop-filter:blur(14px);border:1px solid var(--magic-border-color,#00000014);width:100%;min-height:38px;color:var(--magic-text-primary,#18191c);-webkit-user-select:none;user-select:none;border-radius:8px;justify-content:space-between;align-items:center;margin:8px 0 12px;padding:6px 14px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;font-size:12px;transition:background .2s,border-color .2s,box-shadow .2s;animation:.24s cubic-bezier(.16,1,.3,1) forwards filterBarSlideDown-68c495a2;display:flex;box-shadow:0 2px 10px #0000000a}.bili-search-filter-bar[data-v-68c495a2]:hover{background:var(--magic-filter-bar-hover-bg,var(--magic-bg-hover,#0000000f));border-color:var(--magic-primary-light-bg,#00aeec4d);box-shadow:0 4px 14px #00000014}.bili-search-filter-bar.no-filtered .btn-toggle-restore[data-v-68c495a2]{opacity:.45;pointer-events:none}.bili-search-filter-bar .filter-bar-left[data-v-68c495a2]{align-items:center;gap:8px;display:flex}.bili-search-filter-bar .filter-bar-left .filter-bar-stats[data-v-68c495a2]{align-items:center;gap:6px;font-size:12px;line-height:1;display:flex}.bili-search-filter-bar .filter-bar-left .filter-bar-stats .stats-item[data-v-68c495a2]{color:var(--magic-text-secondary,#9ca3af);align-items:center;gap:4px;display:inline-flex}.bili-search-filter-bar .filter-bar-left .filter-bar-stats .stats-item.filtered .stats-num[data-v-68c495a2]{color:#f69;background:#ff66991f;border:1px solid #ff669947}.bili-search-filter-bar .filter-bar-left .filter-bar-stats .stats-item.matched .stats-num[data-v-68c495a2]{color:var(--magic-primary-color,#00aeec);background:var(--magic-primary-light-bg,#00aeec1f);border:1px solid #00aeec47}.bili-search-filter-bar .filter-bar-left .filter-bar-stats .stats-item .stats-num[data-v-68c495a2]{border-radius:8px;justify-content:center;align-items:center;min-width:16px;height:16px;padding:0 5px;font-size:11px;font-weight:600;display:inline-flex}.bili-search-filter-bar .filter-bar-left .filter-bar-stats .stats-divider[data-v-68c495a2]{color:var(--magic-border-color,#00000026);font-size:11px}.bili-search-filter-bar .filter-bar-right[data-v-68c495a2]{align-items:center;gap:8px;display:flex}.bili-search-filter-bar .filter-bar-right .btn-toggle-restore[data-v-68c495a2]{background:var(--magic-bg-subtle,#0000000a);border:1px solid var(--magic-border-color,#00000014);color:var(--magic-text-primary,#18191c);cursor:pointer;border-radius:6px;outline:none;align-items:center;gap:5px;padding:4px 10px;font-size:12px;font-weight:500;transition:all .2s cubic-bezier(.4,0,.2,1);display:inline-flex}.bili-search-filter-bar .filter-bar-right .btn-toggle-restore[data-v-68c495a2]:hover{background:var(--magic-primary-light-bg,#00aeec1f);border-color:var(--magic-primary-color,#00aeec);color:var(--magic-primary-color,#00aeec)}.bili-search-filter-bar .filter-bar-right .btn-toggle-restore[data-v-68c495a2]:active{transform:scale(.97)}.bili-search-filter-bar .filter-bar-right .btn-toggle-restore.is-restored[data-v-68c495a2]{color:#f69;background:#ff66991f;border-color:#ff669959}.bili-search-filter-bar .filter-bar-right .btn-toggle-restore.is-restored[data-v-68c495a2]:hover{background:#f693;border-color:#f69}.bili-search-filter-bar .filter-bar-right .btn-open-settings[data-v-68c495a2]{color:var(--magic-text-secondary,#9ca3af);cursor:pointer;background:0 0;border:1px solid #0000;border-radius:6px;outline:none;align-items:center;gap:4px;padding:4px 8px;font-size:12px;transition:all .2s;display:inline-flex}.bili-search-filter-bar .filter-bar-right .btn-open-settings[data-v-68c495a2]:hover{background:var(--magic-bg-hover,#0000000d);border-color:var(--magic-border-color,#00000014);color:var(--magic-text-primary,#18191c)}.bili-search-filter-bar .filter-bar-right .btn-open-settings[data-v-68c495a2]:active{transform:scale(.96)}@keyframes filterBarSlideDown-68c495a2{0%{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}.settings-modal-header[data-v-557d6017]{align-items:center;gap:10px;display:flex}.settings-modal-header .settings-modal-title[data-v-557d6017]{color:var(--magic-text-primary,#f3f4f6);font-size:15px;font-weight:600}.settings-container[data-v-557d6017]{box-sizing:border-box;flex-direction:column;gap:16px;max-height:560px;padding:4px 6px;display:flex;overflow-y:auto}.settings-container[data-v-557d6017]::-webkit-scrollbar{width:6px}.settings-container[data-v-557d6017]::-webkit-scrollbar-thumb{background:var(--magic-border-color,#00000026);border-radius:3px}.settings-section[data-v-557d6017]{flex-direction:column;gap:8px;display:flex}.settings-section__title[data-v-557d6017]{color:var(--magic-text-primary,#e5e7eb);justify-content:space-between;align-items:center;padding-left:2px;font-size:13px;font-weight:600;transition:color .25s;display:flex}.settings-section:hover .settings-section__title[data-v-557d6017]{color:var(--magic-primary-color,#00aeec)}.settings-card[data-v-557d6017]{background:var(--magic-bg-subtle,#00000008);border:1px solid var(--magic-border-color,#00000014);border-radius:8px;flex-direction:column;gap:10px;padding:10px 14px;transition:all .25s cubic-bezier(.16,1,.3,1);display:flex}.settings-card[data-v-557d6017]:hover{background:var(--magic-bg-hover,#0000000d);border-color:var(--magic-border-color-hover,#00aeec59);box-shadow:0 4px 14px #0000000f}.settings-item[data-v-557d6017]{justify-content:space-between;align-items:center;gap:12px;display:flex}.settings-item__info[data-v-557d6017]{flex-direction:column;gap:3px;display:flex}.settings-item__title[data-v-557d6017]{color:var(--magic-text-primary,#e5e7eb);font-size:13px;font-weight:500}.settings-item__desc[data-v-557d6017]{color:var(--magic-text-secondary,#9ca3af);font-size:12px;line-height:1.4}.field-switches[data-v-557d6017]{border-top:1px solid var(--magic-border-color,#00000014);align-items:center;gap:16px;padding-top:4px;display:flex}.field-switches .field-switch-item[data-v-557d6017]{color:var(--magic-text-primary,#d1d5db);align-items:center;gap:8px;font-size:12px;display:flex}.field-switches .field-switch-item.is-disabled[data-v-557d6017]{cursor:not-allowed;opacity:.6}.whitelist-header[data-v-557d6017]{justify-content:space-between;align-items:center;display:flex}.whitelist-title-wrap[data-v-557d6017]{color:var(--magic-text-primary,#e5e7eb);align-items:center;gap:6px;font-size:13px;font-weight:500;display:flex}.whitelist-title-wrap .whitelist-count[data-v-557d6017]{background:var(--magic-primary-light-bg,#00aeec26);min-width:18px;height:18px;color:var(--magic-primary-color,#00aeec);border-radius:9px;justify-content:center;align-items:center;padding:0 5px;font-size:11px;font-weight:600;display:inline-flex}.btn-link[data-v-557d6017]{color:var(--magic-primary-color,#00aeec);cursor:pointer;background:0 0;border:none;padding:2px 4px;font-size:12px;transition:opacity .2s}.btn-link[data-v-557d6017]:hover{opacity:.8}.whitelist-tags-wrap[data-v-557d6017]{background:var(--magic-bg-subtle,#0000000a);border:1px dashed var(--magic-border-color,#0000001f);border-radius:6px;flex-wrap:wrap;gap:6px;min-height:38px;max-height:140px;padding:6px;display:flex;overflow-y:auto}.whitelist-tags-wrap .empty-tip[data-v-557d6017]{color:var(--magic-text-secondary,#6b7280);padding:4px;font-size:12px}.whitelist-tag[data-v-557d6017]{background:var(--magic-primary-light-bg,#00aeec26);color:var(--magic-text-primary,#e5e7eb);border:1px solid #00aeec4d;border-radius:4px;align-items:center;gap:5px;padding:2px 8px;font-size:12px;display:inline-flex}.whitelist-tag .tag-remove[data-v-557d6017]{cursor:pointer;color:var(--magic-text-secondary,#9ca3af);font-size:11px;transition:color .2s}.whitelist-tag .tag-remove[data-v-557d6017]:hover{color:#f69}.whitelist-input-row[data-v-557d6017]{align-items:center;gap:8px;display:flex}.whitelist-input-row magic-input[data-v-557d6017]{flex:1}.whitelist-bulk-wrap[data-v-557d6017]{flex-direction:column;gap:8px;display:flex}.whitelist-bulk-actions[data-v-557d6017]{justify-content:space-between;align-items:center;display:flex}.whitelist-bulk-actions .whitelist-bulk-tip[data-v-557d6017]{color:var(--magic-text-secondary,#9ca3af);font-size:12px}.settings-modal-footer[data-v-557d6017]{justify-content:space-between;align-items:center;width:100%;display:flex}.settings-modal-footer .footer-right[data-v-557d6017]{align-items:center;gap:8px;display:flex}:root{--magic-primary-color:var(--brand_blue,#00aeec);--magic-primary-hover-color:var(--brand_blue_hover,color-mix(in srgb, var(--magic-primary-color) 85%, #fff));--magic-primary-active-color:var(--brand_blue_active,color-mix(in srgb, var(--magic-primary-color) 85%, #000));--magic-primary-light-bg:var(--brand_blue_thin,color-mix(in srgb, var(--magic-primary-color) 12%, transparent));--magic-text-primary:var(--text1,#18191c);--magic-text-secondary:var(--text2,#61666d);--magic-text-tertiary:var(--text3,#9499a0);--magic-text-muted:var(--text3,#9499a0);--magic-bg-base:var(--bg1,#fff);--magic-bg-container:var(--bg1,#fff);--magic-bg-component:var(--bg2,#f6f7f8);--magic-bg-subtle:var(--graph_bg_thin,var(--bg2,#f6f7f8));--magic-bg-hover:var(--line_regular,var(--bg3,#f1f2f3));--magic-bg-active:var(--line_bold,var(--bg3,#e5e6e8));--magic-border-color:var(--line_regular,#e3e5e7);--magic-border-color-hover:var(--line_bold,var(--line_regular,#c9ccd0));--magic-bg-overlay:var(--bg1_float,var(--graph_bg_regular,var(--bg1,#fff)));--magic-filter-bar-bg:var(--bg1_float,var(--graph_bg_regular,var(--bg2,#f6f7f8)));--magic-filter-bar-hover-bg:var(--bg3,#f1f2f3);--magic-modal-bg:var(--bg1_float,var(--graph_bg_regular,var(--bg1,#fff)));--magic-modal-border:var(--line_regular,#e3e5e7);--magic-modal-divider:var(--line_regular,#e3e5e7);--magic-modal-title-color:var(--text1,#18191c);--magic-modal-color:var(--text1,#18191c);--magic-modal-close-color:var(--text3,#9499a0)}.bili-magic-restored-card{opacity:.5!important;transition:opacity .2s!important;position:relative!important}.bili-magic-restored-card:hover{opacity:1!important}.more-conditions{height:0;transition:height .2s;overflow:hidden;display:block!important}\n/*$vite$:1*/ ',
  );
  var isArray = Array.isArray;
  var isFunction = (val) => typeof val === 'function';
  var isString = (val) => typeof val === 'string';
  var isNumber = (val) => typeof val === 'number' && !Number.isNaN(val);
  var isNil = (val) => val === null || val === void 0;
  var isObject = (val) => val !== null && typeof val === 'object';
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
  function debounce(fn, delay = 300) {
    let timer = null;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
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
  function getUrlParams() {
    let queryString = window.location.search;
    if (!queryString && window.location.hash.includes('?'))
      queryString = window.location.hash.slice(window.location.hash.indexOf('?'));
    return Object.fromEntries(new URLSearchParams(queryString));
  }
  function getPathSegments(url) {
    let pathname = '';
    if (isString(url))
      try {
        const base = typeof window !== 'undefined' ? window.location.origin : void 0;
        pathname = new URL(url, base).pathname;
      } catch {
        pathname = '';
      }
    else if (typeof window !== 'undefined') pathname = window.location.pathname;
    return pathname.split('/').filter(Boolean);
  }
  var urlChangeListeners = new Set();
  var isListening = false;
  var lastHref = typeof window !== 'undefined' ? window.location.href : '';
  function notifyUrlChange() {
    const currentHref = window.location.href;
    if (currentHref !== lastHref) {
      lastHref = currentHref;
      for (const listener of urlChangeListeners)
        try {
          listener(currentHref);
        } catch (err) {
          console.error('[observeUrlChange] 回调执行异常:', err);
        }
    }
  }
  function observeUrlChange(onChange) {
    if (typeof window === 'undefined' || !isFunction(onChange)) return () => {};
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
  var ICONS = {
    expand: {
      viewBox: '0 0 24 24',
      d: 'M2.68934 7.68934C3.27513 7.10356 4.22487 7.10356 4.81066 7.68934L12 14.8787L19.18935 7.68934C19.7751 7.10356 20.7249 7.10356 21.31065 7.68934C21.89645 8.27512 21.89645 9.22488 21.31065 9.81066L13.41425 17.70715C12.6332 18.48815 11.3668 18.48815 10.58575 17.70715L2.68934 9.81066C2.10356 9.22488 2.10356 8.27513 2.68934 7.68934z',
    },
    collapse: {
      viewBox: '0 0 24 24',
      d: 'M21.3107 16.3107C20.7249 16.8964 19.7751 16.8964 19.1893 16.3107L12 9.12132L4.81066 16.3107C4.22487 16.8964 3.27513 16.8964 2.68934 16.3107C2.10355 15.7249 2.10355 14.7751 2.68934 14.1893L10.5858 6.29289C11.3668 5.51185 12.6332 5.51185 13.4142 6.29289L21.3107 14.1893C21.8964 14.7751 21.8964 15.7249 21.3107 16.3107Z',
    },
    views: {
      viewBox: '0 0 18 18',
      d: 'M2.728 5.419C2.803 4.586 3.454 3.945 4.293 3.877 5.458 3.782 7.11 3.686 9 3.686s3.542.096 4.707.191c.839.068 1.49.709 1.565 1.542.086.951.166 2.207.166 3.58s-.08 2.628-.166 3.58c-.075.832-.726 1.473-1.565 1.541-1.165.095-2.817.191-4.707.191s-3.542-.096-4.707-.191c-.839-.068-1.49-.709-1.565-1.541C2.642 11.627 2.563 10.371 2.563 8.999s.08-2.629.165-3.58zm5.616 1.458c-.574-.331-1.292.083-1.292.746v2.755c0 .663.718 1.077 1.292.746l2.385-1.378c.574-.331.574-1.16 0-1.491L8.344 6.877z',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
    },
    danmaku: {
      viewBox: '0 0 18 18',
      d: 'M2.728 5.419C2.803 4.586 3.454 3.945 4.293 3.877 5.458 3.782 7.11 3.686 9 3.686s3.542.096 4.707.191c.839.068 1.49.709 1.565 1.542.086.951.166 2.207.166 3.58s-.08 2.628-.166 3.58c-.075.832-.726 1.473-1.565 1.541-1.165.095-2.817.191-4.707.191s-3.542-.096-4.707-.191c-.839-.068-1.49-.709-1.565-1.541C2.642 11.627 2.563 10.371 2.563 8.999s.08-2.629.165-3.58zm4.647 1.581a.5.5 0 0 0 0 1h4.563a.5.5 0 0 0 0-1H7.375zm1.125 3a.5.5 0 0 0 0 1h4.563a.5.5 0 0 0 0-1H8.5z',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
    },
    pubdate: {
      viewBox: '0 0 18 18',
      d: 'M9 2C5.134 2 2 5.134 2 9s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 1.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zm.75 2.25a.75.75 0 0 0-1.5 0v3.5c0 .204.083.4.23.543l2.25 2.186a.75.75 0 1 0 1.04-1.078l-2.02-1.963V5.75z',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
    },
    settings: {
      viewBox: '0 0 24 24',
      d: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
    },
    play: {
      viewBox: '0 0 24 24',
      d: 'M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86a1 1 0 0 0-1.5.86z',
    },
    block: {
      viewBox: '0 0 24 24',
      d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z',
    },
    list: {
      viewBox: '0 0 24 24',
      d: 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z',
    },
    shuffle: {
      viewBox: '0 0 24 24',
      d: 'M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z',
    },
    search: {
      viewBox: '0 0 24 24',
      d: 'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
    },
    close: {
      viewBox: '0 0 24 24',
      d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z',
    },
    eye: {
      viewBox: '0 0 24 24',
      d: 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z',
    },
    'eye-off': {
      viewBox: '0 0 24 24',
      d: 'M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z',
    },
    export: {
      viewBox: '0 0 24 24',
      stroke: 2,
      d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    import: {
      viewBox: '0 0 24 24',
      stroke: 2,
      d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    sync: {
      viewBox: '0 0 24 24',
      stroke: 2,
      d: 'M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8 M3 3v5h5 M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16 M16 16h5v5',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    check: {
      viewBox: '0 0 24 24',
      stroke: 2,
      d: 'M20 6L9 17l-5-5',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
  };
  var style_default$8 =
    ':host{vertical-align:-.15em;color:inherit;width:var(--magic-icon-size,1em);height:var(--magic-icon-size,1em);justify-content:center;align-items:center;line-height:1;display:inline-flex}.magic-icon{width:100%;height:100%;color:var(--magic-icon-color,currentColor);justify-content:center;align-items:center;transition:transform .2s;display:inline-flex}.magic-icon svg{pointer-events:none;width:100%;height:100%;display:block}.magic-icon.is-spin svg{animation:1s linear infinite magic-icon-spin}@keyframes magic-icon-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}';
  var theme_default =
    ':root{--magic-primary-color:#e11483;--magic-primary-hover-color:color-mix(in srgb, var(--magic-primary-color) 85%, #fff);--magic-primary-active-color:color-mix(in srgb, var(--magic-primary-color) 85%, #000);--magic-primary-light-bg:color-mix(in srgb, var(--magic-primary-color) 12%, transparent);--magic-primary-shadow:color-mix(in srgb, var(--magic-primary-color) 35%, transparent);--magic-primary-focus-shadow:color-mix(in srgb, var(--magic-primary-color) 20%, transparent);--magic-color-success:#2ac864;--magic-color-success-hover:#3ad473;--magic-color-success-active:#23b056;--magic-color-success-shadow:#2ac86459;--magic-color-warning:#fa9600;--magic-color-warning-hover:#ffaa1a;--magic-color-warning-active:#e08700;--magic-color-warning-shadow:#fa960059;--magic-color-danger:#ff5c7c;--magic-color-danger-hover:#ff7591;--magic-color-danger-active:#e64567;--magic-color-danger-shadow:#ff5c7c59;--magic-text-primary:#fff;--magic-text-secondary:#ffffffb3;--magic-text-tertiary:#9499a0;--magic-text-disabled:#ffffff59;--magic-bg-base:#ffffff0a;--magic-bg-subtle:#ffffff14;--magic-bg-hover:#ffffff24;--magic-bg-active:#fff3;--magic-bg-overlay:#1c1e24f0;--magic-mask-bg:#000000a6;--magic-border-color:#ffffff1f;--magic-border-color-hover:#ffffff40;--magic-radius-sm:4px;--magic-radius-base:6px;--magic-radius-lg:8px;--magic-shadow-dropdown:0 4px 16px #0003;--magic-shadow-modal:0 16px 40px #00000073;--magic-shadow-toast:0 10px 30px #00000073;--magic-z-index-dropdown:1000;--magic-z-index-modal:99999;--magic-z-index-toast:999999;--magic-btn-default-bg:var(--magic-bg-subtle);--magic-btn-default-color:var(--magic-text-primary);--magic-btn-default-border:var(--magic-border-color);--magic-btn-default-hover-bg:var(--magic-bg-hover);--magic-btn-default-hover-border:var(--magic-border-color-hover);--magic-btn-default-active-bg:var(--magic-bg-active);--magic-btn-primary-bg:var(--magic-primary-color);--magic-btn-primary-hover-bg:var(--magic-primary-hover-color);--magic-btn-primary-active-bg:var(--magic-primary-active-color);--magic-btn-success-bg:var(--magic-color-success);--magic-btn-success-hover-bg:var(--magic-color-success-hover);--magic-btn-success-active-bg:var(--magic-color-success-active);--magic-btn-warning-bg:var(--magic-color-warning);--magic-btn-warning-hover-bg:var(--magic-color-warning-hover);--magic-btn-warning-active-bg:var(--magic-color-warning-active);--magic-btn-danger-bg:var(--magic-color-danger);--magic-btn-danger-hover-bg:var(--magic-color-danger-hover);--magic-btn-danger-active-bg:var(--magic-color-danger-active);--magic-btn-text-color:var(--magic-text-secondary);--magic-btn-text-hover-bg:var(--magic-bg-subtle);--magic-btn-text-active-bg:var(--magic-bg-hover);--magic-input-radius:var(--magic-radius-base);--magic-input-bg:var(--magic-bg-subtle);--magic-input-border:var(--magic-border-color);--magic-input-color:var(--magic-text-primary);--magic-input-hover-border:var(--magic-border-color-hover);--magic-input-hover-bg:var(--magic-bg-hover);--magic-input-focus-border:var(--magic-primary-color);--magic-input-focus-bg:var(--magic-bg-subtle);--magic-input-focus-shadow:var(--magic-primary-focus-shadow);--magic-input-prefix-color:var(--magic-text-tertiary);--magic-input-placeholder-color:var(--magic-text-tertiary);--magic-input-suffix-color:var(--magic-text-tertiary);--magic-input-clear-color:var(--magic-text-tertiary);--magic-input-clear-hover-color:var(--magic-text-primary);--magic-textarea-radius:var(--magic-radius-base);--magic-textarea-bg:var(--magic-bg-subtle);--magic-textarea-border:var(--magic-border-color);--magic-textarea-color:var(--magic-text-primary);--magic-textarea-hover-border:var(--magic-border-color-hover);--magic-textarea-hover-bg:var(--magic-bg-hover);--magic-textarea-focus-border:var(--magic-primary-color);--magic-textarea-focus-bg:var(--magic-bg-subtle);--magic-textarea-focus-shadow:var(--magic-primary-focus-shadow);--magic-textarea-placeholder-color:var(--magic-text-tertiary);--magic-textarea-count-color:var(--magic-text-tertiary);--magic-select-bg:var(--magic-bg-subtle);--magic-select-color:var(--magic-text-primary);--magic-select-border:var(--magic-border-color);--magic-select-placeholder-color:var(--magic-text-tertiary);--magic-select-suffix-color:var(--magic-text-tertiary);--magic-select-clear-color:var(--magic-text-tertiary);--magic-select-clear-hover-color:var(--magic-text-primary);--magic-select-hover-border:var(--magic-border-color-hover);--magic-select-hover-bg:var(--magic-bg-hover);--magic-select-active-color:var(--magic-primary-color);--magic-select-z-index:var(--magic-z-index-dropdown);--magic-select-dropdown-bg:var(--magic-bg-overlay);--magic-select-dropdown-border:var(--magic-border-color);--magic-select-dropdown-shadow:var(--magic-shadow-dropdown);--magic-select-option-hover-bg:var(--magic-bg-hover);--magic-select-option-active-bg:var(--magic-primary-light-bg);--magic-tabs-capsule-bg:var(--magic-bg-subtle);--magic-tabs-color:var(--magic-text-secondary);--magic-tabs-hover-color:var(--magic-text-primary);--magic-tabs-hover-bg:var(--magic-bg-hover);--magic-tabs-border:transparent;--magic-tabs-active-border:var(--magic-primary-light-bg);--magic-tabs-line-border:var(--magic-border-color);--magic-tabs-mask-bg:var(--magic-mask-bg);--magic-switch-color:var(--magic-text-secondary);--magic-switch-active-label-color:var(--magic-text-primary);--magic-switch-inactive-color:#8c8c8c59;--magic-switch-active-color:var(--magic-primary-color);--magic-spinner-size:24px;--magic-spinner-border-width:3px;--magic-spinner-track:var(--magic-bg-subtle);--magic-spinner-color:var(--magic-primary-color);--magic-spinner-text-color:var(--magic-text-tertiary);--magic-modal-z-index:var(--magic-z-index-modal);--magic-modal-mask-bg:var(--magic-mask-bg);--magic-modal-bg:var(--magic-bg-overlay);--magic-modal-border:var(--magic-border-color);--magic-modal-radius:var(--magic-radius-lg);--magic-modal-shadow:var(--magic-shadow-modal);--magic-modal-color:var(--magic-text-primary);--magic-modal-divider:var(--magic-border-color);--magic-modal-title-color:var(--magic-text-primary);--magic-modal-close-color:var(--magic-text-tertiary);--magic-radio-text-color:var(--magic-text-primary);--magic-radio-border-color:var(--magic-border-color);--magic-radio-bg:var(--magic-bg-subtle);--magic-radio-color:var(--magic-primary-color);--magic-radio-disabled-opacity:.45;--magic-toast-z-index:var(--magic-z-index-toast);--magic-toast-radius:var(--magic-radius-lg);--magic-toast-bg:var(--magic-bg-overlay);--magic-toast-color:var(--magic-text-primary);--magic-toast-border:var(--magic-border-color);--magic-toast-shadow:var(--magic-shadow-toast);--magic-toast-info-color:var(--magic-primary-color);--magic-toast-success-color:var(--magic-color-success);--magic-toast-warning-color:var(--magic-color-warning);--magic-toast-error-color:var(--magic-color-danger);--magic-version-bg:var(--magic-bg-subtle);--magic-version-color:var(--magic-text-secondary);--magic-version-border:var(--magic-border-color);--magic-slider-track-bg:var(--magic-bg-subtle);--magic-slider-track-hover-bg:var(--magic-bg-hover);--magic-slider-bar-bg:var(--magic-primary-color);--magic-slider-thumb-bg:#fff;--magic-slider-thumb-border:var(--magic-primary-color);--magic-slider-thumb-shadow:0 2px 6px #00000040;--magic-slider-thumb-hover-shadow:0 0 0 4px var(--magic-primary-focus-shadow);--magic-slider-thumb-active-shadow:0 0 0 6px var(--magic-primary-shadow);--magic-slider-stop-bg:#fff6;--magic-slider-tooltip-bg:var(--magic-bg-overlay);--magic-slider-tooltip-color:var(--magic-text-primary);--magic-slider-tooltip-border:var(--magic-border-color);--magic-slider-tooltip-shadow:var(--magic-shadow-dropdown);--magic-slider-disabled-opacity:.45;--magic-icon-color:currentColor}';
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
  var MagicIcon = class extends i {
    static properties = {
      name: String,
      size: String,
      color: String,
      rotate: Number,
      spin: Boolean,
    };
    static styles = r$2(style_default$8);
    constructor() {
      super();
      this.name = '';
      this.size = '';
      this.color = '';
      this.rotate = 0;
      this.spin = false;
    }
    render() {
      const icon = ICONS[this.name];
      const sizeVal =
        isNumber(this.size) || /^\d+$/.test(String(this.size)) ? `${this.size}px` : this.size;
      const dynamicStyle = [
        sizeVal ? `--magic-icon-size: ${sizeVal}` : '',
        this.color ? `--magic-icon-color: ${this.color}` : '',
        this.rotate ? `transform: rotate(${this.rotate}deg)` : '',
      ]
        .filter(Boolean)
        .join('; ');
      if (!icon)
        return b`
        <span class="magic-icon ${this.spin ? 'is-spin' : ''}" style="${dynamicStyle}">
          <slot></slot>
        </span>
      `;
      const isStroke = Boolean(icon.stroke);
      const strokeWidth = icon.stroke === true ? 2 : icon.stroke || 2;
      return b`
      <span class="magic-icon ${this.spin ? 'is-spin' : ''}" style="${dynamicStyle}">
        <svg
          viewBox="${icon.viewBox || '0 0 24 24'}"
          fill="${isStroke ? 'none' : 'currentColor'}"
          stroke="${isStroke ? 'currentColor' : 'none'}"
          stroke-width="${isStroke ? strokeWidth : '0'}"
          stroke-linecap="${icon.strokeLinecap || 'round'}"
          stroke-linejoin="${icon.strokeLinejoin || 'round'}"
          aria-hidden="true"
        >
          <path
            d="${icon.d}"
            clip-rule="${icon.clipRule || ''}"
            fill-rule="${icon.fillRule || ''}"
          />
        </svg>
      </span>
    `;
    }
  };
  if (!customElements.get('magic-icon')) customElements.define('magic-icon', MagicIcon);
  var _plugin_vue_export_helper_default = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) target[key] = val;
    return target;
  };
  var _hoisted_1$1 = { class: 'filter-bar-left' };
  var _hoisted_2$1 = { class: 'filter-bar-stats' };
  var _hoisted_3$1 = { class: 'stats-item filtered' };
  var _hoisted_4$1 = { class: 'stats-num filtered-num' };
  var _hoisted_5$1 = { class: 'stats-item matched' };
  var _hoisted_6$1 = { class: 'stats-num matched-num' };
  var _hoisted_7$1 = { class: 'filter-bar-right' };
  var _hoisted_8$1 = ['name'];
  var _hoisted_9$1 = { class: 'toggle-text' };
  var FilterBar_default = _plugin_vue_export_helper_default(
    {
      __name: 'index',
      props: {
        filteredCount: {
          type: Number,
          default: 0,
        },
        matchedCount: {
          type: Number,
          default: 0,
        },
        isShowingAll: {
          type: Boolean,
          default: false,
        },
      },
      emits: ['toggle-restore', 'open-settings'],
      setup(__props) {
        return (_ctx, _cache) => {
          return (
            (0, vue.openBlock)(),
            (0, vue.createElementBlock)(
              'div',
              {
                class: (0, vue.normalizeClass)([
                  'bili-search-filter-bar',
                  { 'no-filtered': __props.filteredCount === 0 },
                ]),
              },
              [
                (0, vue.createElementVNode)('div', _hoisted_1$1, [
                  (0, vue.createElementVNode)('div', _hoisted_2$1, [
                    (0, vue.createElementVNode)('span', _hoisted_3$1, [
                      _cache[2] || (_cache[2] = (0, vue.createTextVNode)(' 已过滤 ', -1)),
                      (0, vue.createElementVNode)(
                        'strong',
                        _hoisted_4$1,
                        (0, vue.toDisplayString)(__props.filteredCount),
                        1,
                      ),
                      _cache[3] || (_cache[3] = (0, vue.createTextVNode)(' 条无关卡片 ', -1)),
                    ]),
                    _cache[6] ||
                      (_cache[6] = (0, vue.createElementVNode)(
                        'span',
                        { class: 'stats-divider' },
                        '/',
                        -1,
                      )),
                    (0, vue.createElementVNode)('span', _hoisted_5$1, [
                      _cache[4] || (_cache[4] = (0, vue.createTextVNode)(' 保留 ', -1)),
                      (0, vue.createElementVNode)(
                        'strong',
                        _hoisted_6$1,
                        (0, vue.toDisplayString)(__props.matchedCount),
                        1,
                      ),
                      _cache[5] || (_cache[5] = (0, vue.createTextVNode)(' 条 ', -1)),
                    ]),
                  ]),
                ]),
                (0, vue.createElementVNode)('div', _hoisted_7$1, [
                  (0, vue.createElementVNode)(
                    'button',
                    {
                      class: (0, vue.normalizeClass)([
                        'btn-toggle-restore',
                        { 'is-restored': __props.isShowingAll },
                      ]),
                      title: '点击切换过滤卡片的显示与隐藏状态',
                      type: 'button',
                      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit('toggle-restore')),
                    },
                    [
                      (0, vue.createElementVNode)(
                        'magic-icon',
                        {
                          class: 'icon-toggle',
                          name: __props.isShowingAll ? 'eye-off' : 'eye',
                          size: '13',
                        },
                        null,
                        8,
                        _hoisted_8$1,
                      ),
                      (0, vue.createElementVNode)(
                        'span',
                        _hoisted_9$1,
                        (0, vue.toDisplayString)(
                          __props.isShowingAll ? '恢复过滤状态' : '查看已过滤卡片',
                        ),
                        1,
                      ),
                    ],
                    2,
                  ),
                  (0, vue.createElementVNode)(
                    'button',
                    {
                      class: 'btn-open-settings',
                      title: '打开卡片过滤设置',
                      type: 'button',
                      onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit('open-settings')),
                    },
                    [
                      ...(_cache[7] ||
                        (_cache[7] = [
                          (0, vue.createElementVNode)(
                            'magic-icon',
                            {
                              name: 'settings',
                              size: '13',
                            },
                            null,
                            -1,
                          ),
                          (0, vue.createElementVNode)('span', null, '设置', -1),
                        ])),
                    ],
                  ),
                ]),
              ],
              2,
            )
          );
        };
      },
    },
    [['__scopeId', 'data-v-68c495a2']],
  );
  var style_default$7 =
    ':host{vertical-align:middle;display:inline-flex}:host([block]){width:100%;display:flex}.magic-button{box-sizing:border-box;white-space:nowrap;text-align:center;cursor:pointer;-webkit-user-select:none;user-select:none;vertical-align:middle;border:1px solid #0000;border-radius:6px;outline:none;justify-content:center;align-items:center;width:100%;font-family:inherit;font-weight:500;line-height:1;transition:all .2s cubic-bezier(.4,0,.2,1);display:inline-flex;position:relative}.magic-button--small{gap:4px;height:28px;padding:0 10px;font-size:12px}.magic-button--medium{gap:6px;height:34px;padding:0 16px;font-size:14px}.magic-button--large{gap:8px;height:40px;padding:0 20px;font-size:16px}.magic-button.is-round{border-radius:9999px}.magic-button.is-circle{border-radius:50%;padding:0}.magic-button.is-circle.magic-button--small{width:28px}.magic-button.is-circle.magic-button--medium{width:34px}.magic-button.is-circle.magic-button--large{width:40px}.magic-button--default{background:var(--magic-btn-default-bg,#ffffff14);color:var(--magic-btn-default-color,#e5e9ef);border-color:var(--magic-btn-default-border,#ffffff26)}.magic-button--default:hover:not(.is-disabled){background:var(--magic-btn-default-hover-bg,#ffffff24);border-color:var(--magic-btn-default-hover-border,#ffffff40)}.magic-button--default:active:not(.is-disabled){background:var(--magic-btn-default-active-bg,#fff3)}.magic-button--primary{background:var(--magic-btn-primary-bg,var(--magic-primary-color));color:#fff;border-color:var(--magic-btn-primary-bg,var(--magic-primary-color))}.magic-button--primary:hover:not(.is-disabled){background:var(--magic-btn-primary-hover-bg,var(--magic-primary-hover-color));border-color:var(--magic-btn-primary-hover-bg,var(--magic-primary-hover-color));box-shadow:0 2px 8px var(--magic-primary-shadow)}.magic-button--primary:active:not(.is-disabled){background:var(--magic-btn-primary-active-bg,var(--magic-primary-active-color));border-color:var(--magic-btn-primary-active-bg,var(--magic-primary-active-color))}.magic-button--success{background:var(--magic-btn-success-bg,#2ac864);color:#fff;border-color:var(--magic-btn-success-bg,#2ac864)}.magic-button--success:hover:not(.is-disabled){background:var(--magic-btn-success-hover-bg,#3ad473);border-color:var(--magic-btn-success-hover-bg,#3ad473);box-shadow:0 2px 8px #2ac86459}.magic-button--success:active:not(.is-disabled){background:var(--magic-btn-success-active-bg,#23b056);border-color:var(--magic-btn-success-active-bg,#23b056)}.magic-button--warning{background:var(--magic-btn-warning-bg,#fa9600);color:#fff;border-color:var(--magic-btn-warning-bg,#fa9600)}.magic-button--warning:hover:not(.is-disabled){background:var(--magic-btn-warning-hover-bg,#ffa624);border-color:var(--magic-btn-warning-hover-bg,#ffa624);box-shadow:0 2px 8px #fa960059}.magic-button--warning:active:not(.is-disabled){background:var(--magic-btn-warning-active-bg,#e08700);border-color:var(--magic-btn-warning-active-bg,#e08700)}.magic-button--danger{background:var(--magic-btn-danger-bg,#ff5c7c);color:#fff;border-color:var(--magic-btn-danger-bg,#ff5c7c)}.magic-button--danger:hover:not(.is-disabled){background:var(--magic-btn-danger-hover-bg,#ff738e);border-color:var(--magic-btn-danger-hover-bg,#ff738e);box-shadow:0 2px 8px #ff5c7c59}.magic-button--danger:active:not(.is-disabled){background:var(--magic-btn-danger-active-bg,#e64b69);border-color:var(--magic-btn-danger-active-bg,#e64b69)}.magic-button--text{color:var(--magic-btn-text-color,var(--magic-primary-color));background:0 0;border-color:#0000;padding-left:4px;padding-right:4px}.magic-button--text:hover:not(.is-disabled){background:var(--magic-btn-text-hover-bg,var(--magic-primary-light-bg))}.magic-button--text:active:not(.is-disabled){background:var(--magic-btn-text-active-bg,var(--magic-primary-light-bg))}.magic-button.is-disabled{cursor:not-allowed;opacity:.5;box-shadow:none!important}.magic-button.is-loading{cursor:default;pointer-events:none}.magic-button .magic-button__loading-icon,.magic-button .magic-button__icon{justify-content:center;align-items:center;display:inline-flex}.magic-button .magic-button__content{align-items:center;display:inline-flex}';
  var style_default$6 =
    ':host{vertical-align:middle;display:inline-flex}@keyframes magic-spinner-rotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.magic-spinner{justify-content:center;align-items:center;gap:10px;display:inline-flex}.magic-spinner.is-vertical{flex-direction:column;gap:12px}.magic-spinner__circle{box-sizing:border-box;width:var(--magic-spinner-size,24px);height:var(--magic-spinner-size,24px);border-style:solid;border-width:var(--magic-spinner-border-width,3px);border-color:var(--magic-spinner-track,#ffffff1a);border-top-color:var(--magic-spinner-color,var(--magic-primary-color));border-radius:50%;flex-shrink:0;animation:.8s linear infinite magic-spinner-rotate}.magic-spinner__text{color:var(--magic-spinner-text-color,#9499a0);-webkit-user-select:none;user-select:none;font-size:13px;line-height:1.4}';
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
    static styles = r$2(style_default$6);
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
    static styles = r$2(style_default$7);
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
  var style_default$5 =
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
    static styles = r$2(style_default$5);
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
  var style_default$4 =
    ':host{font-family:inherit;display:block}:host(:not([visible])){display:none!important}@keyframes magic-modal-mask-fade-in{0%{opacity:0}to{opacity:1}}@keyframes magic-modal-mask-fade-out{0%{opacity:1}to{opacity:0}}@keyframes magic-modal-zoom-in{0%{opacity:0;transform:scale(.92)translateY(-20px)}to{opacity:1;transform:scale(1)translateY(0)}}@keyframes magic-modal-zoom-out{0%{opacity:1;transform:scale(1)translateY(0)}to{opacity:0;transform:scale(.92)translateY(-20px)}}.magic-modal-wrapper{z-index:var(--magic-modal-z-index,99999);overscroll-behavior:contain;box-sizing:border-box;text-align:center;pointer-events:auto;position:fixed;inset:0;overflow:hidden auto}.magic-modal-wrapper.is-leaving{pointer-events:none!important}.magic-modal-wrapper:after{content:"";vertical-align:middle;width:0;height:100%;display:inline-block}.magic-modal-wrapper.is-centered{justify-content:center;align-items:center;padding-bottom:16vh;display:flex}.magic-modal-wrapper.is-centered:after{display:none}.magic-modal-wrapper.is-centered .magic-modal{margin:24px auto;top:0!important}.magic-modal-mask{z-index:var(--magic-modal-z-index,99999);background:var(--magic-modal-mask-bg,#000000a6);-webkit-backdrop-filter:blur(4px);animation:.25s forwards magic-modal-mask-fade-in;position:fixed;inset:0}.magic-modal-mask.is-leaving{animation:.2s forwards magic-modal-mask-fade-out;pointer-events:none!important}.magic-modal{vertical-align:middle;text-align:left;box-sizing:border-box;background:var(--magic-modal-bg,#1c1e24f5);border:1px solid var(--magic-modal-border,#ffffff1f);border-radius:var(--magic-modal-radius,12px);width:100%;box-shadow:var(--magic-modal-shadow,0 16px 48px #0009);-webkit-backdrop-filter:blur(16px);color:var(--magic-modal-color,#e5e9ef);pointer-events:auto;flex-direction:column;margin:0 auto;animation:.25s cubic-bezier(.16,1,.3,1) forwards magic-modal-zoom-in;display:inline-flex;position:relative}.magic-modal.is-leaving{animation:.2s cubic-bezier(.4,0,1,1) forwards magic-modal-zoom-out;pointer-events:none!important}.magic-modal__header{border-bottom:1px solid var(--magic-modal-divider,#ffffff14);box-sizing:border-box;justify-content:space-between;align-items:center;padding:16px 20px;display:flex}.magic-modal__title{color:var(--magic-modal-title-color,#fff);font-size:16px;font-weight:600;line-height:1.4}.magic-modal__close{width:28px;height:28px;color:var(--magic-modal-close-color,#9499a0);cursor:pointer;background:0 0;border:none;border-radius:6px;justify-content:center;align-items:center;margin:-4px -6px -4px auto;padding:0;transition:all .2s;display:inline-flex}.magic-modal__close:hover{background:var(--magic-bg-hover,#ffffff1a);color:var(--magic-modal-title-color,var(--magic-text-primary,#fff))}.magic-modal__close svg{width:16px;height:16px;display:block}.magic-modal__body{word-break:break-word;overscroll-behavior:contain;box-sizing:border-box;scrollbar-width:thin;scrollbar-color:var(--magic-bg-hover,#fff3) transparent;max-height:calc(80vh - 140px);padding:20px;font-size:14px;line-height:1.6;overflow-y:auto}.magic-modal__body::-webkit-scrollbar{width:5px}.magic-modal__body::-webkit-scrollbar-thumb{background:var(--magic-bg-hover,#fff3);border-radius:4px}.magic-modal__footer{border-top:1px solid var(--magic-modal-divider,#ffffff14);box-sizing:border-box;justify-content:flex-end;align-items:center;gap:12px;padding:14px 20px;display:flex}';
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
    static styles = r$2(style_default$4);
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
  var style_default$3 =
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
    static styles = r$2(style_default$3);
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
  var style_default$2 =
    ':host{vertical-align:middle;box-sizing:border-box;width:100%;font-family:inherit;display:inline-block}:host([block]){width:100%;display:block}.magic-textarea{box-sizing:border-box;vertical-align:bottom;width:100%;font-size:14px;display:block;position:relative}.magic-textarea--small{font-size:12px}.magic-textarea--small .magic-textarea__inner{padding:6px 10px;font-size:12px}.magic-textarea--medium{font-size:14px}.magic-textarea--medium .magic-textarea__inner{padding:8px 12px;font-size:14px}.magic-textarea--large{font-size:16px}.magic-textarea--large .magic-textarea__inner{padding:10px 16px;font-size:16px}.magic-textarea__inner{box-sizing:border-box;border-radius:var(--magic-textarea-radius,6px);background:var(--magic-textarea-bg,#ffffff14);border:1px solid var(--magic-textarea-border,#ffffff26);width:100%;color:var(--magic-textarea-color,#e5e9ef);outline:none;font-family:inherit;line-height:1.5;transition:border-color .2s cubic-bezier(.4,0,.2,1),background .2s cubic-bezier(.4,0,.2,1),box-shadow .2s cubic-bezier(.4,0,.2,1);display:block}.magic-textarea__inner::placeholder{color:var(--magic-textarea-placeholder-color,#9499a0)}.magic-textarea__inner:hover:not(:disabled):not([readonly]){border-color:var(--magic-textarea-hover-border,#ffffff40);background:var(--magic-textarea-hover-bg,#ffffff1f)}.magic-textarea__inner:focus{border-color:var(--magic-textarea-focus-border,var(--magic-primary-color));background:var(--magic-textarea-focus-bg,#ffffff1a);box-shadow:var(--magic-textarea-focus-shadow,var(--magic-primary-focus-shadow))}.magic-textarea__inner:disabled{cursor:not-allowed;opacity:.5;background:#ffffff0a;border-color:#ffffff1a}.magic-textarea__inner::-webkit-scrollbar{width:6px;height:6px}.magic-textarea__inner::-webkit-scrollbar-thumb{background:#fff3;border-radius:3px}.magic-textarea__inner::-webkit-scrollbar-thumb:hover{background:#ffffff59}.magic-textarea__count{color:var(--magic-textarea-count-color,#9499a0);-webkit-user-select:none;user-select:none;justify-content:flex-end;margin-top:4px;font-size:12px;line-height:1.4;display:flex}';
  var MagicTextarea = class extends i {
    static properties = {
      value: {
        type: String,
        reflect: true,
      },
      placeholder: String,
      size: String,
      rows: {
        type: Number,
        attribute: 'rows',
      },
      cols: {
        type: Number,
        attribute: 'cols',
      },
      maxlength: {
        type: Number,
        attribute: 'maxlength',
      },
      minlength: {
        type: Number,
        attribute: 'minlength',
      },
      resize: String,
      disabled: {
        type: Boolean,
        reflect: true,
      },
      readonly: {
        type: Boolean,
        reflect: true,
      },
      block: {
        type: Boolean,
        reflect: true,
      },
      autofocus: Boolean,
      showWordLimit: {
        type: Boolean,
        attribute: 'show-word-limit',
      },
      focused: { state: true },
    };
    static styles = r$2(style_default$2);
    constructor() {
      super();
      this.value = '';
      this.placeholder = '';
      this.size = 'medium';
      this.rows = 4;
      this.cols = void 0;
      this.maxlength = void 0;
      this.minlength = void 0;
      this.resize = 'none';
      this.disabled = false;
      this.readonly = false;
      this.block = false;
      this.autofocus = false;
      this.showWordLimit = false;
      this.focused = false;
    }
    get textareaElement() {
      return this.shadowRoot?.querySelector('.magic-textarea__inner') || null;
    }
    firstUpdated() {
      if (this.autofocus && !this.disabled && !this.readonly) this.focus();
    }
    focus() {
      this.textareaElement?.focus();
    }
    blur() {
      this.textareaElement?.blur();
    }
    select() {
      this.textareaElement?.select();
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
    renderWordLimit() {
      if (!this.showWordLimit) return null;
      const currentLength = (this.value || '').length;
      return b`<div class="magic-textarea__count">${this.maxlength > 0 ? `${currentLength}/${this.maxlength}` : `${currentLength}`}</div>`;
    }
    render() {
      return b`
      <div class="${[
        'magic-textarea',
        `magic-textarea--${this.size || 'medium'}`,
        this.focused ? 'is-focused' : '',
        this.disabled ? 'is-disabled' : '',
        this.readonly ? 'is-readonly' : '',
      ]
        .filter(Boolean)
        .join(' ')}">
        <textarea
          class="magic-textarea__inner"
          style="${this.resize ? `resize: ${this.resize};` : ''}"
          .value=${this.value ?? ''}
          .placeholder=${this.placeholder || ''}
          .disabled=${this.disabled}
          .readOnly=${this.readonly}
          rows=${this.rows > 0 ? this.rows : 4}
          cols=${this.cols > 0 ? this.cols : A}
          maxlength=${this.maxlength > 0 ? this.maxlength : A}
          minlength=${this.minlength > 0 ? this.minlength : A}
          @input=${this.handleInput}
          @change=${this.handleChange}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          @keydown=${this.handleKeyDown}
          @keyup=${this.handleKeyUp}
        ></textarea>
        ${this.renderWordLimit()}
      </div>
    `;
    }
  };
  if (!customElements.get('magic-textarea')) customElements.define('magic-textarea', MagicTextarea);
  var style_default$1 =
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
    static styles = r$2(style_default$1);
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
  var style_default =
    ':host{vertical-align:middle;display:inline-block}.magic-version{box-sizing:border-box;font-variant-numeric:tabular-nums;background:var(--magic-version-bg,var(--magic-bg-subtle));border:1px solid var(--magic-version-border,var(--magic-border-color));color:var(--magic-version-color,var(--magic-text-secondary));-webkit-user-select:none;user-select:none;border-radius:9999px;justify-content:center;align-items:center;gap:4px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-weight:500;line-height:1;transition:all .2s cubic-bezier(.16,1,.3,1);display:inline-flex}.magic-version--mini{height:18px;padding:0 6px;font-size:11px}.magic-version--small{height:20px;padding:0 8px;font-size:12px}.magic-version--medium{height:24px;padding:0 10px;font-size:13px}.magic-version__content{align-items:center;display:inline-flex}';
  var MagicVersion = class extends i {
    static properties = {
      version: String,
      prefix: String,
      size: String,
    };
    static styles = r$2(style_default);
    constructor() {
      super();
      this.version = '';
      this.prefix = 'v';
      this.size = 'small';
    }
    get displayVersion() {
      const ver = (this.version || '').trim();
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
  var name = 'bilibili-search-filter';
  var version = '1.0.0';
  var DEFAULT_CONFIG = {
    enableListFilter: true,
    enableRestoredCardOpacity: true,
    showFilterBar: true,
    autoExpandMoreFilter: false,
    filterFields: ['title', 'author'],
    whitelistKeywords: [],
  };
  var FILTER_FIELD_SELECTORS = {
    title: '.bili-video-card__info--tit',
    author: '.bili-video-card__info--author',
  };
  var _hoisted_1 = ['visible'];
  var _hoisted_2 = {
    slot: 'header',
    class: 'settings-modal-header',
  };
  var _hoisted_3 = ['version'];
  var _hoisted_4 = { class: 'settings-container' };
  var _hoisted_5 = { class: 'settings-section' };
  var _hoisted_6 = { class: 'settings-card' };
  var _hoisted_7 = { class: 'settings-item' };
  var _hoisted_8 = ['checked'];
  var _hoisted_9 = { class: 'field-switches' };
  var _hoisted_10 = ['checked', 'disabled'];
  var _hoisted_11 = ['checked', 'disabled'];
  var _hoisted_12 = { class: 'settings-card' };
  var _hoisted_13 = { class: 'settings-item' };
  var _hoisted_14 = ['checked'];
  var _hoisted_15 = { class: 'settings-card' };
  var _hoisted_16 = { class: 'settings-item' };
  var _hoisted_17 = ['checked'];
  var _hoisted_18 = { class: 'settings-card' };
  var _hoisted_19 = { class: 'settings-item' };
  var _hoisted_20 = ['checked'];
  var _hoisted_21 = { class: 'settings-section' };
  var _hoisted_22 = { class: 'settings-card' };
  var _hoisted_23 = { class: 'whitelist-header' };
  var _hoisted_24 = { class: 'whitelist-title-wrap' };
  var _hoisted_25 = { class: 'whitelist-count' };
  var _hoisted_26 = {
    key: 0,
    class: 'whitelist-tags-wrap',
  };
  var _hoisted_27 = {
    key: 0,
    class: 'empty-tip',
  };
  var _hoisted_28 = ['onClick'];
  var _hoisted_29 = {
    key: 1,
    class: 'whitelist-input-row',
  };
  var _hoisted_30 = ['value'];
  var _hoisted_31 = {
    key: 2,
    class: 'whitelist-bulk-wrap',
  };
  var _hoisted_32 = ['value'];
  var SettingsModal_default = _plugin_vue_export_helper_default(
    {
      __name: 'index',
      props: {
        visible: {
          type: Boolean,
          default: false,
        },
        config: {
          type: Object,
          default: () => ({ ...DEFAULT_CONFIG }),
        },
      },
      emits: ['close', 'update:visible', 'saved'],
      setup(__props, { emit: __emit }) {
        const props = __props;
        const emit = __emit;
        const formData = (0, vue.ref)(structuredClone((0, vue.toRaw)(props.config)));
        const isBulkMode = (0, vue.ref)(false);
        const bulkText = (0, vue.ref)('');
        const newKeyword = (0, vue.ref)('');
        function isFieldActive(field) {
          return formData.value.filterFields.includes(field);
        }
        function isFieldDisabled(field) {
          return isFieldActive(field) && formData.value.filterFields.length <= 1;
        }
        function handleLabelClick(field) {
          if (isFieldDisabled(field)) return;
          toggleField(field, !isFieldActive(field));
        }
        function toggleField(field, enabled) {
          if (!enabled && isFieldDisabled(field)) return;
          const set = new Set(formData.value.filterFields);
          if (enabled) set.add(field);
          else set.delete(field);
          if (set.size > 0) formData.value.filterFields = Array.from(set);
        }
        function parseBulkKeywords(text) {
          return Array.from(
            new Set(
              text
                .split(/[;；\n]+/)
                .map((k) => k.trim())
                .filter(Boolean),
            ),
          );
        }
        function addKeyword() {
          const keywords = parseBulkKeywords(newKeyword.value);
          if (keywords.length === 0) return;
          const existing = new Set(formData.value.whitelistKeywords);
          let addedCount = 0;
          for (const kw of keywords)
            if (!existing.has(kw)) {
              formData.value.whitelistKeywords.push(kw);
              existing.add(kw);
              addedCount += 1;
            }
          if (addedCount === 0) {
            toast.warning('关键词已存在于白名单中');
            return;
          }
          newKeyword.value = '';
        }
        function removeKeyword(index) {
          formData.value.whitelistKeywords.splice(index, 1);
        }
        function toggleBulkMode() {
          if (isBulkMode.value) isBulkMode.value = false;
          else {
            bulkText.value = formData.value.whitelistKeywords.join('; ');
            isBulkMode.value = true;
          }
        }
        function confirmBulkMode() {
          const parsed = parseBulkKeywords(bulkText.value);
          formData.value.whitelistKeywords = parsed;
          isBulkMode.value = false;
          toast.success(`已更新白名单，共 ${parsed.length} 个关键词`);
        }
        async function handleReset() {
          if (
            !(await modal.confirm({
              title: '恢复默认设置',
              content: '确定要将表单恢复为默认设置吗？',
            }))
          )
            return;
          formData.value = structuredClone(DEFAULT_CONFIG);
          isBulkMode.value = false;
          newKeyword.value = '';
          toast.success('已恢复为默认配置，点击保存后生效');
        }
        function handleCancel() {
          formData.value = structuredClone((0, vue.toRaw)(props.config));
          isBulkMode.value = false;
          newKeyword.value = '';
          emit('update:visible', false);
          emit('close');
        }
        function handleSave() {
          if (!formData.value.filterFields || formData.value.filterFields.length === 0) {
            toast.warning('至少需要选择一个匹配范围');
            return;
          }
          if (isBulkMode.value) {
            formData.value.whitelistKeywords = parseBulkKeywords(bulkText.value);
            isBulkMode.value = false;
          }
          emit('saved', formData.value);
          toast.success('配置已保存');
          emit('update:visible', false);
          emit('close');
        }
        (0, vue.watch)(
          () => props.visible,
          (val) => {
            if (val) {
              formData.value = structuredClone((0, vue.toRaw)(props.config));
              isBulkMode.value = false;
              newKeyword.value = '';
            }
          },
        );
        return (_ctx, _cache) => {
          return (
            (0, vue.openBlock)(),
            (0, vue.createBlock)(vue.Teleport, { to: 'body' }, [
              (0, vue.createElementVNode)(
                'magic-modal',
                {
                  visible: __props.visible,
                  centered: '',
                  width: '560px',
                  onCancel: handleCancel,
                  onClose: handleCancel,
                  onConfirm: handleSave,
                },
                [
                  (0, vue.createElementVNode)('div', _hoisted_2, [
                    _cache[10] ||
                      (_cache[10] = (0, vue.createElementVNode)(
                        'span',
                        { class: 'settings-modal-title' },
                        'B站搜索结果过滤设置',
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
                      _cache[16] ||
                        (_cache[16] = (0, vue.createElementVNode)(
                          'div',
                          { class: 'settings-section__title' },
                          [(0, vue.createElementVNode)('span', null, '基础过滤设置')],
                          -1,
                        )),
                      (0, vue.createElementVNode)('div', _hoisted_6, [
                        (0, vue.createElementVNode)('div', _hoisted_7, [
                          _cache[11] ||
                            (_cache[11] = (0, vue.createElementVNode)(
                              'div',
                              { class: 'settings-item__info' },
                              [
                                (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__title' },
                                  '启用搜索卡片过滤',
                                ),
                                (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__desc' },
                                  '过滤搜索结果中不匹配关键词的内容',
                                ),
                              ],
                              -1,
                            )),
                          (0, vue.createElementVNode)(
                            'magic-switch',
                            {
                              checked: (0, vue.unref)(formData).enableListFilter,
                              size: 'small',
                              onChange:
                                _cache[0] ||
                                (_cache[0] = (e) =>
                                  ((0, vue.unref)(formData).enableListFilter = e.detail.value)),
                            },
                            null,
                            40,
                            _hoisted_8,
                          ),
                        ]),
                        (0, vue.createElementVNode)('div', _hoisted_9, [
                          _cache[12] ||
                            (_cache[12] = (0, vue.createElementVNode)(
                              'span',
                              { class: 'field-label' },
                              '匹配范围：',
                              -1,
                            )),
                          (0, vue.createElementVNode)(
                            'label',
                            {
                              class: (0, vue.normalizeClass)([
                                'field-switch-item',
                                { 'is-disabled': isFieldDisabled('title') },
                              ]),
                            },
                            [
                              (0, vue.createElementVNode)(
                                'magic-switch',
                                {
                                  checked: isFieldActive('title'),
                                  disabled: isFieldDisabled('title'),
                                  size: 'small',
                                  onChange:
                                    _cache[1] ||
                                    (_cache[1] = (e) => toggleField('title', e.detail.value)),
                                },
                                null,
                                40,
                                _hoisted_10,
                              ),
                              (0, vue.createElementVNode)(
                                'span',
                                {
                                  onClick:
                                    _cache[2] ||
                                    (_cache[2] = ($event) => handleLabelClick('title')),
                                },
                                '标题',
                              ),
                            ],
                            2,
                          ),
                          (0, vue.createElementVNode)(
                            'label',
                            {
                              class: (0, vue.normalizeClass)([
                                'field-switch-item',
                                { 'is-disabled': isFieldDisabled('author') },
                              ]),
                            },
                            [
                              (0, vue.createElementVNode)(
                                'magic-switch',
                                {
                                  checked: isFieldActive('author'),
                                  disabled: isFieldDisabled('author'),
                                  size: 'small',
                                  onChange:
                                    _cache[3] ||
                                    (_cache[3] = (e) => toggleField('author', e.detail.value)),
                                },
                                null,
                                40,
                                _hoisted_11,
                              ),
                              (0, vue.createElementVNode)(
                                'span',
                                {
                                  onClick:
                                    _cache[4] ||
                                    (_cache[4] = ($event) => handleLabelClick('author')),
                                },
                                'UP主',
                              ),
                            ],
                            2,
                          ),
                        ]),
                      ]),
                      (0, vue.createElementVNode)('div', _hoisted_12, [
                        (0, vue.createElementVNode)('div', _hoisted_13, [
                          _cache[13] ||
                            (_cache[13] = (0, vue.createElementVNode)(
                              'div',
                              { class: 'settings-item__info' },
                              [
                                (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__title' },
                                  '已过滤卡片半透明',
                                ),
                                (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__desc' },
                                  ' 展开查看已过滤卡片时，将其以半透明效果展示以作区分 ',
                                ),
                              ],
                              -1,
                            )),
                          (0, vue.createElementVNode)(
                            'magic-switch',
                            {
                              checked: (0, vue.unref)(formData).enableRestoredCardOpacity,
                              size: 'small',
                              onChange:
                                _cache[5] ||
                                (_cache[5] = (e) =>
                                  ((0, vue.unref)(formData).enableRestoredCardOpacity =
                                    e.detail.value)),
                            },
                            null,
                            40,
                            _hoisted_14,
                          ),
                        ]),
                      ]),
                      (0, vue.createElementVNode)('div', _hoisted_15, [
                        (0, vue.createElementVNode)('div', _hoisted_16, [
                          _cache[14] ||
                            (_cache[14] = (0, vue.createElementVNode)(
                              'div',
                              { class: 'settings-item__info' },
                              [
                                (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__title' },
                                  '显示过滤状态栏',
                                ),
                                (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__desc' },
                                  '在搜索结果列表上方展示过滤卡片统计设置',
                                ),
                              ],
                              -1,
                            )),
                          (0, vue.createElementVNode)(
                            'magic-switch',
                            {
                              checked: (0, vue.unref)(formData).showFilterBar,
                              size: 'small',
                              onChange:
                                _cache[6] ||
                                (_cache[6] = (e) =>
                                  ((0, vue.unref)(formData).showFilterBar = e.detail.value)),
                            },
                            null,
                            40,
                            _hoisted_17,
                          ),
                        ]),
                      ]),
                      (0, vue.createElementVNode)('div', _hoisted_18, [
                        (0, vue.createElementVNode)('div', _hoisted_19, [
                          _cache[15] ||
                            (_cache[15] = (0, vue.createElementVNode)(
                              'div',
                              { class: 'settings-item__info' },
                              [
                                (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__title' },
                                  '自动展开更多筛选',
                                ),
                                (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__desc' },
                                  '页面进来自动打开筛选面板',
                                ),
                              ],
                              -1,
                            )),
                          (0, vue.createElementVNode)(
                            'magic-switch',
                            {
                              checked: (0, vue.unref)(formData).autoExpandMoreFilter,
                              size: 'small',
                              onChange:
                                _cache[7] ||
                                (_cache[7] = (e) =>
                                  ((0, vue.unref)(formData).autoExpandMoreFilter = e.detail.value)),
                            },
                            null,
                            40,
                            _hoisted_20,
                          ),
                        ]),
                      ]),
                    ]),
                    (0, vue.createElementVNode)('div', _hoisted_21, [
                      _cache[19] ||
                        (_cache[19] = (0, vue.createElementVNode)(
                          'div',
                          { class: 'settings-section__title' },
                          [(0, vue.createElementVNode)('span', null, '关键词白名单')],
                          -1,
                        )),
                      (0, vue.createElementVNode)('div', _hoisted_22, [
                        (0, vue.createElementVNode)('div', _hoisted_23, [
                          (0, vue.createElementVNode)('div', _hoisted_24, [
                            _cache[17] ||
                              (_cache[17] = (0, vue.createElementVNode)(
                                'span',
                                null,
                                '放行白名单',
                                -1,
                              )),
                            (0, vue.createElementVNode)(
                              'span',
                              _hoisted_25,
                              (0, vue.toDisplayString)(
                                (0, vue.unref)(formData).whitelistKeywords.length,
                              ),
                              1,
                            ),
                          ]),
                          (0, vue.createElementVNode)(
                            'button',
                            {
                              class: 'btn-link',
                              type: 'button',
                              onClick: toggleBulkMode,
                            },
                            (0, vue.toDisplayString)(
                              (0, vue.unref)(isBulkMode) ? '返回标签' : '批量编辑',
                            ),
                            1,
                          ),
                        ]),
                        !(0, vue.unref)(isBulkMode)
                          ? ((0, vue.openBlock)(),
                            (0, vue.createElementBlock)('div', _hoisted_26, [
                              (0, vue.unref)(formData).whitelistKeywords.length === 0
                                ? ((0, vue.openBlock)(),
                                  (0, vue.createElementBlock)(
                                    'div',
                                    _hoisted_27,
                                    ' 暂无白名单关键词，当搜索词命中白名单时将直接放行全部卡片 ',
                                  ))
                                : (0, vue.createCommentVNode)('', true),
                              ((0, vue.openBlock)(true),
                              (0, vue.createElementBlock)(
                                vue.Fragment,
                                null,
                                (0, vue.renderList)(
                                  (0, vue.unref)(formData).whitelistKeywords,
                                  (kw, idx) => {
                                    return (
                                      (0, vue.openBlock)(),
                                      (0, vue.createElementBlock)(
                                        'div',
                                        {
                                          key: `${kw}-${idx}`,
                                          class: 'whitelist-tag',
                                        },
                                        [
                                          (0, vue.createElementVNode)(
                                            'span',
                                            null,
                                            (0, vue.toDisplayString)(kw),
                                            1,
                                          ),
                                          (0, vue.createElementVNode)(
                                            'span',
                                            {
                                              class: 'tag-remove',
                                              title: '删除',
                                              onClick: ($event) => removeKeyword(idx),
                                            },
                                            '✕',
                                            8,
                                            _hoisted_28,
                                          ),
                                        ],
                                      )
                                    );
                                  },
                                ),
                                128,
                              )),
                            ]))
                          : (0, vue.createCommentVNode)('', true),
                        !(0, vue.unref)(isBulkMode)
                          ? ((0, vue.openBlock)(),
                            (0, vue.createElementBlock)('div', _hoisted_29, [
                              (0, vue.createElementVNode)(
                                'magic-input',
                                {
                                  value: (0, vue.unref)(newKeyword),
                                  block: '',
                                  clearable: '',
                                  placeholder: '输入白名单关键词，按回车添加...',
                                  size: 'small',
                                  onInput:
                                    _cache[8] ||
                                    (_cache[8] = (e) => (newKeyword.value = e.detail.value)),
                                  onKeydown: (0, vue.withKeys)(addKeyword, ['enter']),
                                },
                                null,
                                40,
                                _hoisted_30,
                              ),
                              (0, vue.createElementVNode)(
                                'magic-button',
                                {
                                  size: 'small',
                                  type: 'primary',
                                  onClick: addKeyword,
                                },
                                ' 添加 ',
                              ),
                            ]))
                          : ((0, vue.openBlock)(),
                            (0, vue.createElementBlock)('div', _hoisted_31, [
                              (0, vue.createElementVNode)(
                                'magic-textarea',
                                {
                                  value: (0, vue.unref)(bulkText),
                                  block: '',
                                  placeholder: '输入关键词，使用分号(;)分隔...',
                                  rows: '4',
                                  size: 'small',
                                  onInput:
                                    _cache[9] ||
                                    (_cache[9] = (e) => (bulkText.value = e.detail.value)),
                                },
                                null,
                                40,
                                _hoisted_32,
                              ),
                              (0, vue.createElementVNode)(
                                'div',
                                { class: 'whitelist-bulk-actions' },
                                [
                                  _cache[18] ||
                                    (_cache[18] = (0, vue.createElementVNode)(
                                      'span',
                                      { class: 'whitelist-bulk-tip' },
                                      '使用分号 (;) 分隔关键词',
                                      -1,
                                    )),
                                  (0, vue.createElementVNode)(
                                    'magic-button',
                                    {
                                      size: 'small',
                                      type: 'primary',
                                      onClick: confirmBulkMode,
                                    },
                                    ' 确认转换 ',
                                  ),
                                ],
                              ),
                            ])),
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
                          onClick: handleReset,
                        },
                        ' 恢复默认 ',
                      ),
                      (0, vue.createElementVNode)('div', { class: 'footer-right' }, [
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
                            onClick: handleSave,
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
    [['__scopeId', 'data-v-557d6017']],
  );
  var unbindClick = null;
  function reflow(element) {
    return element?.offsetHeight;
  }
  function useAutoExpandFilter(config) {
    const currentType = (0, vue.ref)('');
    const currentExpand = (0, vue.ref)(false);
    const toggleActive = () => {
      const svgEL = document.querySelector('.search-conditions svg');
      const conditions = document.querySelector('.more-conditions');
      if (!conditions) return;
      if (currentExpand.value) {
        svgEL?.classList.remove('rotate_n90');
        conditions.style.height = `${conditions.scrollHeight}px`;
        reflow(conditions);
        conditions.style.height = '0';
        currentExpand.value = false;
      } else {
        svgEL?.classList.add('rotate_n90');
        conditions.style.height = `${conditions.scrollHeight}px`;
        currentExpand.value = true;
        once(conditions, 'transitionend', () => {
          if (currentExpand.value) conditions.style.height = 'auto';
        });
      }
    };
    const onExpandClick = (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      toggleActive();
    };
    const checkedExpand = () => {
      if (!config.value?.autoExpandMoreFilter) {
        currentType.value = '';
        unbindClick?.();
        unbindClick = null;
        return;
      }
      const [type] = getPathSegments();
      if (!['all', 'video'].some((item) => type.includes(item))) {
        unbindClick?.();
        unbindClick = null;
        currentType.value = '';
        return;
      }
      if (currentType.value === type) return;
      else currentType.value = type;
      currentExpand.value = false;
      autoExpand();
    };
    const autoExpand = async () => {
      const expandEl = await waitElement('.i_button_more');
      if (!unbindClick) unbindClick = on(expandEl, 'click', onExpandClick, true);
      toggleActive();
    };
    (0, vue.onMounted)(() => observeUrlChange(checkedExpand));
    (0, vue.watch)(
      () => config.value?.autoExpandMoreFilter,
      () => {
        checkedExpand();
      },
      { immediate: true },
    );
  }
  function splitZhEn(text) {
    if (!text) return [];
    return text.match(/[a-zA-Z0-9]+|[\u4e00-\u9fa5]+/g) || [];
  }
  function fuzzyIncludes(str, keyword) {
    if (!str || !keyword) return false;
    const s = str.replace(/\s/g, '').toLowerCase();
    return splitZhEn(keyword.replace(/\s/g, '')).some((w) => s.includes(w.toLowerCase()));
  }
  function isKeywordWhitelisted(keyword, whitelist) {
    if (!keyword || whitelist.length === 0) return false;
    return whitelist.some((w) => w && (keyword.includes(w) || fuzzyIncludes(keyword, w)));
  }
  function getSearchKeyword() {
    const { keyword = '' } = getUrlParams();
    return keyword.trim();
  }
  var CARD_CONTAINER_SELECTOR =
    '.search-page-video .video-list, .video.i_wrapper.search-all-list .video-list';
  function getOrCreateAnchor(container) {
    const ANCHOR_ID = 'bili-search-filter-anchor';
    let anchor = document.getElementById(ANCHOR_ID);
    if (!anchor) {
      anchor = document.createElement('div');
      anchor.id = ANCHOR_ID;
    }
    if (anchor.nextElementSibling !== container) container.before(anchor);
    return anchor;
  }
  function highlightAuthor(el, rawText, keyword) {
    if (!el || !keyword || el.dataset.highlighted) return;
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const reg = new RegExp(`(${escaped})`, 'gi');
    el.innerHTML = rawText.replace(reg, '<em class="keyword">$1</em>');
    el.dataset.highlighted = 'true';
  }
  function checkCardMatch(card, keyword, filterFields) {
    if (!card || !keyword) return false;
    let isMatch = false;
    for (const fieldKey of filterFields) {
      const selector = FILTER_FIELD_SELECTORS[fieldKey];
      if (!selector) continue;
      const el = card.querySelector(selector);
      if (!el) continue;
      if (fieldKey === 'title' && el.querySelector('em')) {
        isMatch = true;
        continue;
      }
      const text = el.textContent || '';
      if (fuzzyIncludes(text, keyword)) {
        fieldKey === 'author' && highlightAuthor(el, text, keyword);
        isMatch = true;
      }
    }
    return isMatch;
  }
  function partitionCards(cards, keyword, filterFields) {
    const filtered = [];
    const matched = [];
    for (const card of cards)
      if (checkCardMatch(card, keyword, filterFields)) {
        card.style.display = '';
        matched.push(card);
      } else {
        card.style.display = 'none';
        filtered.push(card);
      }
    return {
      filtered,
      matched,
    };
  }
  function isCardMutation(mutation) {
    if (mutation.addedNodes.length === 0) return false;
    for (const node of mutation.addedNodes) {
      if (node.nodeType !== 1) continue;
      if (node.querySelector?.('.bili-video-card, .video-list')) return true;
    }
    return false;
  }
  function useCardFilter(config) {
    const teleportTarget = (0, vue.shallowRef)(null);
    const isShowingAll = (0, vue.ref)(false);
    const filteredCards = (0, vue.shallowRef)([]);
    const matchedCards = (0, vue.shallowRef)([]);
    function restoreFilteredCards(show = true) {
      const targetDisplay = show ? '' : 'none';
      const useOpacity = show && (config.value?.enableRestoredCardOpacity ?? true);
      filteredCards.value.forEach((card) => {
        card.style.display = targetDisplay;
        card.classList.toggle('bili-magic-restored-card', useOpacity);
      });
    }
    function resetCards(cards) {
      filteredCards.value.forEach((card) => {
        card.style.display = '';
        card.classList.remove('bili-magic-restored-card');
      });
      filteredCards.value = [];
      matchedCards.value = cards;
      isShowingAll.value = false;
    }
    let observer = null;
    async function startObserver() {
      if (observer) return;
      const target = await waitElement('.search-content');
      if (!target) return;
      observer = new MutationObserver((mutations) => {
        if (mutations.some(isCardMutation)) debouncedScan();
      });
      observer.observe(target, {
        childList: true,
        subtree: true,
      });
    }
    function toggleRestore() {
      isShowingAll.value = !isShowingAll.value;
      restoreFilteredCards(isShowingAll.value);
    }
    function scanCards() {
      const container = document.querySelector(CARD_CONTAINER_SELECTOR);
      if (!container) return;
      const cards = Array.from(container.children);
      if (cards.length === 0) return;
      teleportTarget.value = getOrCreateAnchor(container);
      const keyword = getSearchKeyword();
      const isWhitelisted = isKeywordWhitelisted(keyword, config.value.whitelistKeywords);
      if (!config.value?.enableListFilter || !keyword || isWhitelisted) {
        resetCards(cards);
        return;
      }
      isShowingAll.value = false;
      const res = partitionCards(cards, keyword, config.value?.filterFields);
      filteredCards.value = res.filtered;
      matchedCards.value = res.matched;
    }
    const debouncedScan = debounce(scanCards, 150);
    (0, vue.watch)(() => config.value, scanCards, { deep: true });
    const init = () => {
      startObserver().then();
      scanCards();
    };
    (0, vue.onMounted)(() => {
      if (document.readyState === 'complete') init();
      else window.addEventListener('load', init, { once: true });
    });
    return {
      teleportTarget,
      isShowingAll,
      filteredCards,
      matchedCards,
      toggleRestore,
    };
  }
  var storage = createStorage(name);
  function normalizeFilterFields(fields) {
    if (!isArray(fields) || fields.length === 0) return DEFAULT_CONFIG.filterFields;
    const valid = fields
      .map((f) => String(f).trim())
      .filter((f) => f === 'title' || f === 'author');
    return valid.length > 0 ? valid : DEFAULT_CONFIG.filterFields;
  }
  function normalizeWhitelist(whitelist) {
    if (isArray(whitelist))
      return Array.from(new Set(whitelist.map((k) => String(k).trim()).filter(Boolean)));
    if (isString(whitelist))
      return whitelist
        .split('\n')
        .map((k) => k.trim())
        .filter(Boolean);
    return DEFAULT_CONFIG.whitelistKeywords;
  }
  function readStoredConfig() {
    try {
      const raw = storage.get(version, null);
      if (!isObject(raw)) return { ...DEFAULT_CONFIG };
      return {
        ...DEFAULT_CONFIG,
        ...raw,
        filterFields: normalizeFilterFields(raw.filterFields),
        whitelistKeywords: normalizeWhitelist(raw.whitelistKeywords),
      };
    } catch (err) {
      console.warn('[bilibili-search-filter] 读取配置失败，采用默认值:', err);
      return { ...DEFAULT_CONFIG };
    }
  }
  var configState = (0, vue.ref)(readStoredConfig());
  function useFilterConfig() {
    function saveConfig(newSettings) {
      const merged = {
        ...configState.value,
        ...newSettings,
        filterFields: normalizeFilterFields(newSettings.filterFields),
        whitelistKeywords: normalizeWhitelist(newSettings.whitelistKeywords),
      };
      try {
        storage.set(version, merged);
      } catch (err) {
        console.warn('[bilibili-search-filter] 保存配置失败:', err);
      }
      configState.value = merged;
      return merged;
    }
    function resetConfig() {
      const defaults = structuredClone(DEFAULT_CONFIG);
      try {
        storage.set(version, defaults);
      } catch (err) {
        console.warn('[bilibili-search-filter] 重置配置失败:', err);
      }
      configState.value = defaults;
      return defaults;
    }
    return {
      config: configState,
      saveConfig,
      resetConfig,
    };
  }
  function useApp() {
    const isSettingsOpen = (0, vue.ref)(false);
    const { config, saveConfig } = useFilterConfig();
    const { teleportTarget, isShowingAll, filteredCards, matchedCards, toggleRestore } =
      useCardFilter(config);
    useAutoExpandFilter(config);
    function openSettings() {
      isSettingsOpen.value = true;
    }
    function closeSettings() {
      isSettingsOpen.value = false;
    }
    function handleSaveSettings(newSettings) {
      saveConfig(newSettings);
    }
    (0, vue.onMounted)(() => {
      if (isFunction(globalThis.GM_registerMenuCommand))
        try {
          globalThis.GM_registerMenuCommand('⚙️ 搜索卡片过滤设置', openSettings);
        } catch {}
    });
    return {
      isSettingsOpen,
      config,
      teleportTarget,
      isShowingAll,
      filteredCards,
      matchedCards,
      openSettings,
      closeSettings,
      toggleRestore,
      handleSaveSettings,
    };
  }
  var _sfc_main = {
    __name: 'App',
    setup(__props) {
      const {
        isSettingsOpen,
        config,
        teleportTarget,
        isShowingAll,
        filteredCards,
        matchedCards,
        openSettings,
        closeSettings,
        toggleRestore,
        handleSaveSettings,
      } = useApp();
      return (_ctx, _cache) => {
        return (
          (0, vue.openBlock)(),
          (0, vue.createElementBlock)(
            vue.Fragment,
            null,
            [
              (0, vue.unref)(teleportTarget) && (0, vue.unref)(config).showFilterBar
                ? ((0, vue.openBlock)(),
                  (0, vue.createBlock)(
                    vue.Teleport,
                    {
                      key: 0,
                      to: (0, vue.unref)(teleportTarget),
                    },
                    [
                      (0, vue.createVNode)(
                        (0, vue.unref)(FilterBar_default),
                        {
                          'filtered-count': (0, vue.unref)(filteredCards).length,
                          'is-showing-all': (0, vue.unref)(isShowingAll),
                          'matched-count': (0, vue.unref)(matchedCards).length,
                          onOpenSettings: (0, vue.unref)(openSettings),
                          onToggleRestore: (0, vue.unref)(toggleRestore),
                        },
                        null,
                        8,
                        [
                          'filtered-count',
                          'is-showing-all',
                          'matched-count',
                          'onOpenSettings',
                          'onToggleRestore',
                        ],
                      ),
                    ],
                    8,
                    ['to'],
                  ))
                : (0, vue.createCommentVNode)('', true),
              (0, vue.createVNode)(
                (0, vue.unref)(SettingsModal_default),
                {
                  config: (0, vue.unref)(config),
                  visible: (0, vue.unref)(isSettingsOpen),
                  onClose: (0, vue.unref)(closeSettings),
                  onSaved: (0, vue.unref)(handleSaveSettings),
                },
                null,
                8,
                ['config', 'visible', 'onClose', 'onSaved'],
              ),
            ],
            64,
          )
        );
      };
    },
  };
  if (location.hostname === 'search.bilibili.com')
    await bootstrapApp({
      createApp: vue.createApp,
      rootComponent: _sfc_main,
      mountId: 'bilibili-search-filter-root',
    });
})(Vue);
