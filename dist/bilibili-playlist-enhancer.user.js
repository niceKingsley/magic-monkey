// ==UserScript==
// @name         bilibili-playlist-enhancer
// @namespace    https://github.com/niceKingsley/magic-monkey
// @version      1.0.0
// @author       kingsley
// @description  bilibili 全场景播放列表/选集/合集增强助手
// @license      GPL-3.0-or-later
// @icon         https://static.hdslb.com/images/favicon.ico
// @homepageURL  https://github.com/niceKingsley/magic-monkey
// @supportURL   https://github.com/niceKingsley/magic-monkey/issues
// @match        *://www.bilibili.com/video/*
// @match        *://www.bilibili.com/list/*
// @require      https://cdn.jsdelivr.net/npm/vue@3.5.43/dist/vue.global.prod.js
// @connect      api.bilibili.com
// @grant        GM_addStyle
// @grant        GM_deleteValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function (vue) {
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
    ' .settings-container[data-v-e52d7f12]{-webkit-user-select:none;user-select:none;overscroll-behavior:contain;flex-direction:column;gap:18px;display:flex}.settings-section[data-v-e52d7f12]{flex-direction:column;gap:8px;display:flex}.settings-section__title[data-v-e52d7f12]{color:var(--magic-primary-color,#00aeec);letter-spacing:.3px;align-items:center;gap:6px;font-size:13px;font-weight:600;display:flex}.settings-section__title .section-icon[data-v-e52d7f12]{opacity:.9;width:14px;height:14px}.settings-card[data-v-e52d7f12]{background:#ffffff0a;border:1px solid #ffffff14;border-radius:10px;flex-direction:column;padding:4px 16px;transition:all .25s cubic-bezier(.16,1,.3,1);display:flex}.settings-card[data-v-e52d7f12]:hover{background:#ffffff0f;border-color:#ffffff24}.settings-item[data-v-e52d7f12]{justify-content:space-between;align-items:center;gap:16px;padding:12px 0;transition:opacity .2s;display:flex}.settings-item[data-v-e52d7f12]:not(:last-child){border-bottom:1px solid #ffffff0f}.settings-item.is-disabled[data-v-e52d7f12]{opacity:.38;pointer-events:none}.settings-item__info[data-v-e52d7f12]{flex-direction:column;flex:1;gap:3px;min-width:0;display:flex}.settings-item__title[data-v-e52d7f12]{color:#e5e9ef;font-size:13.5px;font-weight:500;line-height:1.4}.settings-item__desc[data-v-e52d7f12]{color:#9499a0;font-size:12px;line-height:1.45}.settings-item__action[data-v-e52d7f12]{flex-shrink:0;align-items:center;display:flex}.settings-item__action .hotkey-badge[data-v-e52d7f12]{min-width:80px;height:28px;color:var(--magic-primary-color,#00aeec);cursor:pointer;-webkit-user-select:none;user-select:none;background:#ffffff0f;border:1px solid #ffffff26;border-radius:6px;outline:none;justify-content:center;align-items:center;padding:0 10px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:12px;font-weight:600;transition:all .2s cubic-bezier(.16,1,.3,1);display:inline-flex}.settings-item__action .hotkey-badge[data-v-e52d7f12]:hover{background:var(--magic-primary-light-bg,#00aeec1f);border-color:var(--magic-primary-color,#00aeec)}.settings-item__action .hotkey-badge.is-recording[data-v-e52d7f12]{background:var(--magic-primary-color,#00aeec);border-color:var(--magic-primary-color,#00aeec);color:#fff;box-shadow:0 0 0 3px var(--magic-primary-focus-shadow,#00aeec40);animation:1.2s ease-in-out infinite tk-hotkey-pulse-e52d7f12}@keyframes tk-hotkey-pulse-e52d7f12{0%,to{opacity:1}50%{opacity:.6}}.settings-modal-footer[data-v-e52d7f12]{justify-content:space-between;align-items:center;width:100%;display:flex}.settings-modal-footer .footer-buttons[data-v-e52d7f12]{align-items:center;gap:10px;display:flex}@keyframes tk-spin-81fdaee1{0%{transform:rotate(0)}to{transform:rotate(360deg)}}:root{--magic-primary-color:var(--brand_blue,#00aeec);--magic-primary-hover-color:var(--brand_blue_hover,color-mix(in srgb, var(--magic-primary-color) 85%, #fff));--magic-primary-active-color:var(--brand_blue_active,color-mix(in srgb, var(--magic-primary-color) 85%, #000));--magic-primary-light-bg:var(--brand_blue_thin,color-mix(in srgb, var(--magic-primary-color) 12%, transparent))}.tk-reaction[data-v-81fdaee1]{z-index:10;background-color:var(--graph_bg_regular);box-sizing:border-box;flex-direction:column;display:flex;position:absolute;left:4321px;overflow:hidden}.tk-reaction.is-animating[data-v-81fdaee1]{transition:max-height .3s ease-in-out,top .29s ease-in-out}.tk-reaction .tk-reaction-header[data-v-81fdaee1]{border-bottom:1px solid var(--line_regular);box-sizing:border-box;flex-shrink:0;justify-content:space-between;align-items:center;margin-bottom:6px;padding:6px 12px;display:flex}.tk-reaction .tk-reaction-header .header-left[data-v-81fdaee1]{align-items:center;gap:12px;display:flex}.tk-reaction .tk-reaction-header .header-left .sort-select[data-v-81fdaee1]{--magic-select-bg:var(--bg2);--magic-select-border:var(--line_regular);--magic-select-color:var(--text1);--magic-select-placeholder-color:var(--text3);--magic-select-suffix-color:var(--text3);--magic-select-hover-bg:var(--bg2_hover,var(--bg3));--magic-select-hover-border:var(--magic-primary-color,var(--brand_blue));--magic-select-active-color:var(--magic-primary-color,var(--brand_blue));--magic-select-dropdown-bg:var(--graph_bg_thick,var(--bg1));--magic-select-dropdown-border:var(--line_regular);--magic-select-dropdown-shadow:0 4px 16px #0003;--magic-select-option-hover-bg:var(--bg2);--magic-select-option-active-bg:var(--magic-primary-light-bg,var(--brand_blue_thin));width:104px}.tk-reaction .tk-reaction-header .header-left magic-switch[data-v-81fdaee1]{--magic-switch-active-color:var(--magic-primary-color,var(--brand_blue));--magic-switch-inactive-color:var(--text4)}.tk-reaction .tk-reaction-header .header-right[data-v-81fdaee1]{align-items:center;gap:6px;display:flex}.tk-reaction .tk-reaction-header .header-right .shuffle-btn[data-v-81fdaee1],.tk-reaction .tk-reaction-header .header-right .search-btn[data-v-81fdaee1]{cursor:pointer;width:24px;height:24px;color:var(--text3);background:0 0;border-radius:4px;justify-content:center;align-items:center;padding:0;transition:color .2s,background-color .2s,transform .15s;display:inline-flex}.tk-reaction .tk-reaction-header .header-right .shuffle-btn .icon[data-v-81fdaee1],.tk-reaction .tk-reaction-header .header-right .search-btn .icon[data-v-81fdaee1]{fill:currentColor;width:15px;height:15px}.tk-reaction .tk-reaction-header .header-right .shuffle-btn[data-v-81fdaee1]:hover,.tk-reaction .tk-reaction-header .header-right .search-btn[data-v-81fdaee1]:hover{color:var(--magic-primary-color,var(--brand_blue));background-color:var(--bg2)}.tk-reaction .tk-reaction-header .header-right .shuffle-btn.is-active[data-v-81fdaee1],.tk-reaction .tk-reaction-header .header-right .search-btn.is-active[data-v-81fdaee1]{color:var(--magic-primary-color,var(--brand_blue));background-color:var(--magic-primary-light-bg,var(--brand_blue_thin))}.tk-reaction .tk-reaction-header .header-right .shuffle-btn[data-v-81fdaee1]:active,.tk-reaction .tk-reaction-header .header-right .search-btn[data-v-81fdaee1]:active{transform:scale(.92)}.tk-reaction .tk-reaction-header .header-right .settings-btn[data-v-81fdaee1]{cursor:pointer;width:24px;height:24px;color:var(--text3);background:0 0;border:none;outline:none;justify-content:center;align-items:center;padding:0;transition:color .2s,transform .2s;display:inline-flex}.tk-reaction .tk-reaction-header .header-right .settings-btn .icon[data-v-81fdaee1]{width:16px;height:16px;color:inherit;fill:currentColor;transition:transform .3s}.tk-reaction .tk-reaction-header .header-right .settings-btn[data-v-81fdaee1]:hover{color:var(--magic-primary-color,var(--brand_blue));background:0 0}.tk-reaction .tk-reaction-header .header-right .settings-btn:hover .icon[data-v-81fdaee1]{transform:rotate(60deg)}.tk-reaction .tk-reaction-header .header-right .settings-btn[data-v-81fdaee1]:active{transform:scale(.92)}.tk-reaction .tk-reaction-search[data-v-81fdaee1]{flex-shrink:0;padding:0 12px 6px}.tk-reaction .tk-reaction-search .search-input[data-v-81fdaee1]{--magic-input-bg:var(--bg2);--magic-input-border:var(--line_regular);--magic-input-color:var(--text1);--magic-input-placeholder-color:var(--text3);--magic-input-hover-border:var(--magic-primary-color,var(--brand_blue));--magic-input-focus-border:var(--magic-primary-color,var(--brand_blue));--magic-input-focus-bg:var(--graph_bg_regular);--magic-input-prefix-color:var(--text3);--magic-input-suffix-color:var(--text3);--magic-input-clear-color:var(--text3)}.tk-reaction .tk-reaction-search .search-input .search-prefix-icon[data-v-81fdaee1]{width:14px;height:14px;color:var(--text3)}.tk-reaction .tk-reaction-search .search-input .match-badge[data-v-81fdaee1]{color:var(--text3);white-space:nowrap;font-size:11px}.tk-reaction .tk-reaction-video[data-v-81fdaee1]{overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:#78787880 transparent;flex:1;min-height:0;position:relative;overflow:auto}.tk-reaction .tk-reaction-video.is-loading[data-v-81fdaee1]{overflow:hidden!important}.tk-reaction .tk-reaction-video[data-v-81fdaee1]::-webkit-scrollbar{width:8px;height:8px}.tk-reaction .tk-reaction-video[data-v-81fdaee1]::-webkit-scrollbar-thumb{background:#78787880;border-radius:8px}.tk-reaction .tk-reaction-video[data-v-81fdaee1]::-webkit-scrollbar-thumb:hover{background:#787878}.tk-reaction .tk-reaction-video .empty-state[data-v-81fdaee1]{min-height:160px;color:var(--text3);text-align:center;justify-content:center;align-items:center;padding:48px 16px;font-size:13px;display:flex}.tk-reaction .tk-reaction-video .loading-state[data-v-81fdaee1]{justify-content:center;align-items:center;min-height:160px;padding:48px 0;display:flex}.tk-reaction .tk-reaction-video .list[data-v-81fdaee1]{box-sizing:border-box;width:calc(100% - 12px);margin:0 auto;position:relative}.tk-reaction .tk-reaction-video .list .item[data-v-81fdaee1]{content-visibility:auto;contain-intrinsic-size:auto 36px;margin-bottom:4px}.tk-reaction .tk-reaction-video .list .item .header[data-v-81fdaee1]{cursor:pointer;border-radius:2px;align-items:center;padding:0 10px;transition:background-color .2s;display:flex}.tk-reaction .tk-reaction-video .list .item .header[data-v-81fdaee1]:hover{background-color:var(--bg2,#ffffff0d)}.tk-reaction .tk-reaction-video .list .item .header.is-active[data-v-81fdaee1]{background-color:var(--bg2,#ffffff14)}.tk-reaction .tk-reaction-video .list .item .header.is-active .mode-list .title[data-v-81fdaee1],.tk-reaction .tk-reaction-video .list .item .header.is-active .mode-card .info .title[data-v-81fdaee1]{color:var(--magic-primary-color,var(--brand_blue))!important}.tk-reaction .tk-reaction-video .list .item .header.is-active .mode-list .title .playing-gif[data-v-81fdaee1],.tk-reaction .tk-reaction-video .list .item .header.is-active .mode-card .info .title .playing-gif[data-v-81fdaee1]{display:block!important}.tk-reaction .tk-reaction-video .list .item .header .mode-list[data-v-81fdaee1]{justify-content:space-between;align-items:center;width:100%;display:flex}.tk-reaction .tk-reaction-video .list .item .header .mode-list .title[data-v-81fdaee1]{color:var(--text1);flex:1;align-items:center;height:31px;font-size:15px;transition:color .2s;display:flex}.tk-reaction .tk-reaction-video .list .item .header .mode-list .title[data-v-81fdaee1]:hover{color:var(--magic-primary-color,var(--brand_blue))}.tk-reaction .tk-reaction-video .list .item .header .mode-list .title .playing-gif[data-v-81fdaee1]{background-image:url(https://i0.hdslb.com/bfs/static/jinkela/playlist-video/asserts/playing.gif);background-position:50%;background-repeat:no-repeat;background-size:12px 12px;flex-shrink:0;width:12px;height:12px;margin-right:5px;display:none}.tk-reaction .tk-reaction-video .list .item .header .mode-list .title .title-text[data-v-81fdaee1]{-webkit-line-clamp:1;text-overflow:ellipsis;word-break:break-all;line-break:anywhere;-webkit-box-orient:vertical;line-height:31px;display:-webkit-box;overflow:hidden}.tk-reaction .tk-reaction-video .list .item .header .mode-list .actions[data-v-81fdaee1]{color:var(--text3);flex-shrink:0;align-items:center;gap:8px;margin-left:10px;font-size:14px;display:flex}.tk-reaction .tk-reaction-video .list .item .header .mode-list .actions .expand[data-v-81fdaee1]{cursor:pointer;align-items:center;display:flex}.tk-reaction .tk-reaction-video .list .item .header .mode-list .actions .expand .icon[data-v-81fdaee1]{color:var(--text3);width:14px;height:14px;transition:transform .3s;transform:rotate(180deg)}.tk-reaction .tk-reaction-video .list .item .header .mode-list .actions .expand.is-expanded .icon[data-v-81fdaee1]{transform:rotate(0)}.tk-reaction .tk-reaction-video .list .item .header .mode-card[data-v-81fdaee1]{align-items:stretch;gap:10px;width:100%;padding:6px 0;display:none}.tk-reaction .tk-reaction-video .list .item .header .mode-card .cover[data-v-81fdaee1]{background-color:var(--bg2,#0000001a);border-radius:4px;flex-shrink:0;width:114px;height:64px;overflow:hidden}.tk-reaction .tk-reaction-video .list .item .header .mode-card .cover .cover-img[data-v-81fdaee1]{object-fit:cover;width:100%;height:100%;display:block}.tk-reaction .tk-reaction-video .list .item .header .mode-card .info[data-v-81fdaee1]{flex-direction:column;flex:1;justify-content:space-between;min-width:0;display:flex}.tk-reaction .tk-reaction-video .list .item .header .mode-card .info .title[data-v-81fdaee1]{color:var(--text1);align-items:flex-start;max-height:36px;font-size:13px;line-height:18px;transition:color .2s;display:flex;overflow:hidden}.tk-reaction .tk-reaction-video .list .item .header .mode-card .info .title[data-v-81fdaee1]:hover{color:var(--magic-primary-color,var(--brand_blue))}.tk-reaction .tk-reaction-video .list .item .header .mode-card .info .title .playing-gif[data-v-81fdaee1]{background-image:url(https://i0.hdslb.com/bfs/static/jinkela/playlist-video/asserts/playing.gif);background-position:50%;background-repeat:no-repeat;background-size:12px 12px;flex-shrink:0;width:12px;height:12px;margin-top:3px;margin-right:5px;display:none}.tk-reaction .tk-reaction-video .list .item .header .mode-card .info .title .title-text[data-v-81fdaee1]{-webkit-line-clamp:2;text-overflow:ellipsis;word-break:break-all;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tk-reaction .tk-reaction-video .list .item .header .mode-card .info .stats[data-v-81fdaee1]{color:var(--text3);align-items:center;gap:8px;min-width:0;font-size:12px;display:flex;overflow:hidden}.tk-reaction .tk-reaction-video .list .item .header .mode-card .info .stats .stat-item[data-v-81fdaee1]{flex-shrink:1;align-items:center;gap:3px;min-width:0;display:inline-flex}.tk-reaction .tk-reaction-video .list .item .header .mode-card .info .stats .stat-item .icon[data-v-81fdaee1]{fill:currentColor;flex-shrink:0;width:14px;height:14px}.tk-reaction .tk-reaction-video .list .item .header .mode-card .info .stats .stat-item .count-text[data-v-81fdaee1]{white-space:nowrap;text-overflow:ellipsis;line-height:14px;overflow:hidden}.tk-reaction .tk-reaction-video .list .item .header .mode-card .info .stats .stat-item.views[data-v-81fdaee1],.tk-reaction .tk-reaction-video .list .item .header .mode-card .info .stats .stat-item.danmaku[data-v-81fdaee1]{flex-shrink:0}.tk-reaction .tk-reaction-video .list .item .header .mode-card .info .stats .expand-btn[data-v-81fdaee1]{cursor:pointer;flex-shrink:0;margin-left:auto}.tk-reaction .tk-reaction-video .list .item .header .mode-card .info .stats .expand-btn .icon[data-v-81fdaee1]{width:14px;height:14px;color:var(--text3);transition:transform .3s;transform:rotate(180deg)}.tk-reaction .tk-reaction-video .list .item .header .mode-card .info .stats .expand-btn.is-expanded .icon[data-v-81fdaee1]{transform:rotate(0)}.tk-reaction .tk-reaction-video .list .item .episodes[data-v-81fdaee1]{margin-top:4px}.tk-reaction .tk-reaction-video .list .item .episodes .episode[data-v-81fdaee1]{content-visibility:auto;contain-intrinsic-size:auto 31px;background:var(--bg1);cursor:pointer;border-radius:2px;justify-content:space-between;align-items:center;padding:0 10px 0 24px;transition:background-color .2s;display:flex}.tk-reaction .tk-reaction-video .list .item .episodes .episode[data-v-81fdaee1]:hover{background-color:var(--bg2,#ffffff0d)}.tk-reaction .tk-reaction-video .list .item .episodes .episode.is-active .episode-title[data-v-81fdaee1]{color:var(--magic-primary-color,var(--brand_blue))}.tk-reaction .tk-reaction-video .list .item .episodes .episode.is-active .episode-title .playing-gif[data-v-81fdaee1]{display:block}.tk-reaction .tk-reaction-video .list .item .episodes .episode .episode-title[data-v-81fdaee1]{color:var(--text1);flex:1;align-items:center;height:31px;font-size:15px;transition:color .2s;display:flex}.tk-reaction .tk-reaction-video .list .item .episodes .episode .episode-title[data-v-81fdaee1]:hover{color:var(--magic-primary-color,var(--brand_blue))}.tk-reaction .tk-reaction-video .list .item .episodes .episode .episode-title .playing-gif[data-v-81fdaee1]{background-image:url(https://i0.hdslb.com/bfs/static/jinkela/playlist-video/asserts/playing.gif);background-position:50%;background-repeat:no-repeat;background-size:12px 12px;flex-shrink:0;width:12px;height:12px;margin-right:5px;display:none}.tk-reaction .tk-reaction-video .list .item .episodes .episode .episode-title .title-txt[data-v-81fdaee1]{-webkit-line-clamp:1;text-overflow:ellipsis;word-break:break-all;line-break:anywhere;-webkit-box-orient:vertical;line-height:31px;display:-webkit-box;overflow:hidden}.tk-reaction .tk-reaction-video .list .item .episodes .episode .episode-meta[data-v-81fdaee1]{color:var(--text3);flex-shrink:0;margin-left:10px;font-size:14px}.tk-reaction.is-card-mode .item[data-v-81fdaee1]{contain-intrinsic-size:auto 80px!important}.tk-reaction.is-card-mode .header .mode-list[data-v-81fdaee1]{display:none!important}.tk-reaction.is-card-mode .header .mode-card[data-v-81fdaee1]{display:flex!important}\n/*$vite$:1*/ ',
  );
  var STORAGE_NAMESPACE = 'bilibili-playlist-enhancer';
  var POD_MODE = {
    LIST: 'LIST',
    CARD: 'CARD',
  };
  var POD_TYPE = {
    EPISODE: 'EPISODE',
    COLLECTION: 'COLLECTION',
    SERIES: 'SERIES',
  };
  var SORT_MODE = {
    DEFAULT: 'DEFAULT',
    TIME_DESC: 'TIME_DESC',
    TIME_ASC: 'TIME_ASC',
  };
  var CTRL_ACTION = {
    PREV: 'PREV',
    NEXT: 'NEXT',
  };
  var SHUFFLE_SCOPE = {
    ALL: 'ALL',
    GROUP: 'GROUP',
  };
  var DEFAULT_SETTINGS = {
    autoPlayNext: true,
    shuffle: false,
    shuffleScope: SHUFFLE_SCOPE.ALL,
    stopOnGroupEnd: false,
    scrollActiveOnClick: true,
    scrollToActiveOnSort: true,
    hotkeyPrev: '[',
    hotkeyNext: ']',
    sortMode: SORT_MODE.TIME_DESC,
  };
  var SORT_OPTIONS = [
    {
      label: '官方排序',
      value: SORT_MODE.DEFAULT,
    },
    {
      label: '最新发布',
      value: SORT_MODE.TIME_DESC,
    },
    {
      label: '最早发布',
      value: SORT_MODE.TIME_ASC,
    },
  ];
  var SHUFFLE_SCOPE_OPTIONS = [
    {
      label: '全合集随机',
      value: SHUFFLE_SCOPE.ALL,
    },
    {
      label: '仅当前分组',
      value: SHUFFLE_SCOPE.GROUP,
    },
  ];
  var isArray = Array.isArray;
  var isFunction = (val) => typeof val === 'function';
  var isString = (val) => typeof val === 'string';
  var isNumber = (val) => typeof val === 'number' && !Number.isNaN(val);
  var isDate = (val) => val instanceof Date && !Number.isNaN(val.getTime());
  var isNil = (val) => val === null || val === void 0;
  var isObject = (val) => val !== null && typeof val === 'object';
  var assign = Object.assign;
  var pad2 = (n) => String(n).padStart(2, '0');
  var DATE_FORMAT_REGEX = /\[([^\]]+)]|YYYY|YY|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|SSS|A|a/g;
  var UNITS_MAP = {
    zh: [
      {
        value: 1e8,
        suffix: '亿',
      },
      {
        value: 1e4,
        suffix: '万',
      },
    ],
    en: [
      {
        value: 1e9,
        suffix: 'B',
      },
      {
        value: 1e6,
        suffix: 'M',
      },
      {
        value: 1e3,
        suffix: 'K',
      },
    ],
  };
  function formatDuration(sec = 0) {
    const total = Math.max(0, Math.floor(Number(sec) || 0));
    const h = Math.floor(total / 3600);
    const m = pad2(Math.floor((total % 3600) / 60));
    const s = pad2(total % 60);
    if (h > 0) return `${pad2(h)}:${m}:${s}`;
    return `${m}:${s}`;
  }
  function formatNumberString(num, precision, trimZero) {
    const fixed = num.toFixed(precision);
    if (!trimZero) return fixed;
    return fixed.replace(/\.?0+$/, '');
  }
  function addCommas(numStr) {
    const [integer, decimal] = numStr.split('.');
    const formattedInt = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return decimal !== void 0 ? `${formattedInt}.${decimal}` : formattedInt;
  }
  function formatWithScale(absVal, precision, trimZero, unitType) {
    const scales = UNITS_MAP[unitType] || [];
    for (const scale of scales)
      if (absVal >= scale.value)
        return `${formatNumberString(absVal / scale.value, precision, trimZero)}${scale.suffix}`;
    return null;
  }
  function formatCount(num, options = {}) {
    const { precision = 1, trimZero = true, unit = 'zh', comma = false, fallback = '0' } = options;
    if (isNil(num) || num === '') return fallback;
    const val = Number(num);
    if (Number.isNaN(val)) return fallback;
    if (val === 0) return '0';
    const sign = val < 0 ? '-' : '';
    const absVal = Math.abs(val);
    if (unit !== 'none') {
      const scaledResult = formatWithScale(absVal, precision, trimZero, unit);
      if (scaledResult) return `${sign}${scaledResult}`;
    }
    const rawFormatted = formatNumberString(absVal, precision, trimZero);
    return `${sign}${comma ? addCommas(rawFormatted) : rawFormatted}`;
  }
  function parseTimestamp(val) {
    const timestamp = val < 1e11 ? val * 1e3 : val;
    const date = new Date(timestamp);
    return isDate(date) ? date : null;
  }
  function parseStringDate(str) {
    const trimmed = str.trim();
    if (!trimmed) return null;
    if (/^\d+$/.test(trimmed)) return parseTimestamp(Number(trimmed));
    const date = new Date(trimmed);
    return isDate(date) ? date : null;
  }
  function normalizeDate(input) {
    if (isNil(input) || input === '') return null;
    if (isDate(input)) return input;
    if (isNumber(input)) return parseTimestamp(input);
    if (isString(input)) return parseStringDate(input);
    return null;
  }
  function createTokenMap(date) {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const H = date.getHours();
    const h = H % 12 || 12;
    const i = date.getMinutes();
    const s = date.getSeconds();
    const ms = date.getMilliseconds();
    return {
      YYYY: String(y),
      YY: String(y).slice(-2),
      MM: pad2(m),
      M: String(m),
      DD: pad2(d),
      D: String(d),
      HH: pad2(H),
      H: String(H),
      hh: pad2(h),
      h: String(h),
      mm: pad2(i),
      m: String(i),
      ss: pad2(s),
      s: String(s),
      SSS: String(ms).padStart(3, '0'),
      A: H >= 12 ? 'PM' : 'AM',
      a: H >= 12 ? 'pm' : 'am',
    };
  }
  function formatDate(dateInput, template = 'YYYY-MM-DD') {
    const date = normalizeDate(dateInput);
    if (!date) return '';
    const tokens = createTokenMap(date);
    return template.replace(
      DATE_FORMAT_REGEX,
      (match, escaped) => escaped || tokens[match] || match,
    );
  }
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
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
  function getUrlParams() {
    let queryString = window.location.search;
    if (!queryString && window.location.hash.includes('?'))
      queryString = window.location.hash.slice(window.location.hash.indexOf('?'));
    return Object.fromEntries(new URLSearchParams(queryString));
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
  function getNativeInnerVm() {
    let vm = document.querySelector('.multip-list-item-inner')?.__vue__;
    let switchVideoVm = null;
    let playlistRouteVm = null;
    while (vm) {
      if (!switchVideoVm && isFunction(vm.switchVideo)) switchVideoVm = vm;
      if (!playlistRouteVm && isFunction(vm.handlePlaylistRoute)) playlistRouteVm = vm;
      if (switchVideoVm && playlistRouteVm) break;
      vm = vm.$parent;
    }
    return {
      switchVideoVm,
      playlistRouteVm,
    };
  }
  var playerState = () => {
    const player = unsafeWindow?.player;
    if (!player) return {};
    return {
      pause: () => player.pause?.(),
      reload: (payload) => player.reload(payload),
      autoPlayNext: (flag = true) => player.setHandoff(flag ? 0 : 2),
      isAutoPlayNext: () => player.getHandoff() === 0,
      isWide: unsafeWindow?.isWide,
    };
  };
  function executeVideoSwitch(podType, payload) {
    if (podType === POD_TYPE.SERIES) {
      const { switchVideoVm, playlistRouteVm } = getNativeInnerVm();
      if (switchVideoVm) {
        switchVideoVm.switchVideo({
          ...payload,
          type: 2,
        });
        if (!playlistRouteVm.curResourceListItem)
          playlistRouteVm.$router.push({
            query: {
              ...playlistRouteVm.$route.query,
              oid: payload.aid,
              bvid: payload.bvid,
              p: payload.p,
            },
          });
        return;
      }
    }
    playerState().reload(payload);
  }
  function interceptPlayerControls(callback) {
    return on(
      document,
      'click',
      (event) => {
        if (!event.target?.closest?.('.bpx-player-control-bottom-left')) return;
        const btn = event.target?.closest?.('.bpx-player-ctrl-prev, .bpx-player-ctrl-next');
        if (!btn) return;
        event.stopImmediatePropagation();
        event.preventDefault();
        const action = btn.classList.contains('bpx-player-ctrl-prev')
          ? CTRL_ACTION.PREV
          : CTRL_ACTION.NEXT;
        callback?.(action, event);
      },
      { capture: true },
    );
  }
  function interceptPlayerEnding(onEndedHandler) {
    return on(
      document,
      'ended',
      (event) => {
        if (event.target?.tagName !== 'VIDEO') return;
        onEndedHandler?.(event);
      },
      { capture: true },
    );
  }
  function getPodTargetSelectors(podType) {
    const isSeries = (0, vue.toValue)(podType) === POD_TYPE.SERIES;
    return {
      playlistContainerRight: isSeries ? '.playlist-container--right' : '.right-container-inner',
      listBody: isSeries ? '#playlist-video-action-list' : '.video-pod__body',
      actionHeader: isSeries ? '.action-list-header' : '.video-pod__header .right',
      activeActionHeader: isSeries
        ? '.action-list-header.action-list-header-folded'
        : '.video-pod.expanded',
    };
  }
  function calculateMaxHeight(podType, wrapEl, defaultHeight) {
    if ((0, vue.toValue)(podType) !== POD_TYPE.SERIES) return defaultHeight;
    const bodyHeight = wrapEl.querySelector('#playlist-video-action-list-body')?.clientHeight || 0;
    const topHeight = wrapEl.querySelector('.action-list-body-top')?.clientHeight || 0;
    return Math.max(bodyHeight - (topHeight + 24), 0);
  }
  function observeSeriesContainers(ro, wrapEl) {
    const danmakuBox = wrapEl.querySelector('.danmaku-box');
    const actionListContainer = wrapEl.querySelector('.action-list-container');
    if (danmakuBox) ro.observe(danmakuBox);
    if (actionListContainer) ro.observe(actionListContainer);
  }
  function calculateRelativeOffset(targetEl, containerEl) {
    let offset = 0;
    let node = targetEl;
    while (node && node !== containerEl) {
      offset += node.offsetTop;
      node = node.offsetParent;
    }
    return offset;
  }
  function alignActiveItem(container, smooth) {
    const activeEl =
      container.querySelector('.episode.is-active') || container.querySelector('.header.is-active');
    if (!activeEl?.clientHeight || !container.clientHeight) return false;
    const targetTop =
      calculateRelativeOffset(activeEl, container) -
      (container.clientHeight - activeEl.clientHeight) / 2;
    container.scrollTo({
      top: Math.max(0, targetTop),
      behavior: smooth ? 'smooth' : 'auto',
    });
    return true;
  }
  function observeContainerSettling(container, onSettle) {
    const ro = new ResizeObserver(() => {
      if (onSettle()) ro.disconnect();
    });
    ro.observe(container);
  }
  function scrollActiveItem(container, smooth = true) {
    if (!container) return;
    if (smooth) {
      (0, vue.nextTick)(() => alignActiveItem(container, true));
      return;
    }
    observeContainerSettling(container, () => alignActiveItem(container, false));
  }
  function calculateCollectionToggleTargetLayout(podType, isExpanded, currentTop) {
    if (podType === POD_TYPE.COLLECTION) {
      const toolbar = document.querySelector('#arc_toolbar_report');
      const card = document.querySelector(
        '.video-page-card-small, .video-page-special-card-small, .video-page-operator-card-small, .video-page-game-card-small',
      );
      const aboveModule = document.querySelector(
        '.video-pod-above-modules.collapsed, .video-pod-above-modules',
      );
      const podBody = document.querySelector('.video-pod__body');
      const s = toolbar?.getBoundingClientRect().bottom ?? 0;
      const c = card?.getBoundingClientRect().top ?? 0;
      const l = aboveModule?.getBoundingClientRect().height || aboveModule?.scrollHeight || 0;
      const n = podBody?.clientHeight ?? 0;
      if (isExpanded) {
        const diff = s && c ? s - c : 0;
        return {
          targetHeight: Math.max(250, Math.floor(n + diff + l)),
          targetTop: currentTop - l,
        };
      }
      return {
        targetHeight: 250,
        targetTop: currentTop + l,
      };
    }
    if (podType === POD_TYPE.SERIES) {
      const listEl = document.querySelector('#playlist-video-action-list');
      const targetTop = listEl ? listEl.getBoundingClientRect().top + window.scrollY : currentTop;
      return {
        targetHeight: isExpanded
          ? 0
          : (document.querySelector('.action-list-body-bottom')?.clientHeight ?? 0),
        targetTop,
      };
    }
    return {
      targetHeight: 250,
      targetTop: currentTop,
    };
  }
  async function watchPositionSync(podType, hostEl, onPositionUpdate) {
    const currentType = (0, vue.toValue)(podType);
    const selectors = getPodTargetSelectors(currentType);
    const wrapEl = await waitElement(selectors.playlistContainerRight);
    const targetEl = await waitElement(selectors.listBody, { el: wrapEl });
    let isAnimating = false;
    const getHost = () => (isFunction(hostEl) ? hostEl() : (0, vue.toValue)(hostEl));
    const updatePosition = (force = false) => {
      if (isAnimating && !force) return;
      const host = getHost();
      if (!targetEl.isConnected || (host && !host.isConnected)) return;
      const { top, left, width, height } = targetEl.getBoundingClientRect();
      const maxHeight = calculateMaxHeight(currentType, wrapEl, height);
      onPositionUpdate({
        top: top + window.scrollY,
        left: left + window.scrollX,
        width,
        maxHeight,
      });
    };
    let isDestroyed = false;
    const ro = new ResizeObserver(() => updatePosition(false));
    ro.observe(wrapEl);
    waitElement('#bilibili-player, .player-wrap, .left-container', { timeout: 5e3 })
      .then((playerEl) => {
        if (!isDestroyed && playerEl) ro.observe(playerEl);
      })
      .catch(() => {});
    if (currentType === POD_TYPE.SERIES) observeSeriesContainers(ro, wrapEl);
    const offResize = on(window, 'resize', () => updatePosition(false));
    const cleanup = () => {
      isDestroyed = true;
      ro.disconnect();
      offResize();
    };
    cleanup.setAnimating = (val) => {
      isAnimating = val;
    };
    cleanup.updatePosition = updatePosition;
    cleanup.destroy = cleanup;
    cleanup.wrapEl = wrapEl;
    cleanup.targetEl = targetEl;
    return cleanup;
  }
  async function listenNativeToggle(podType, onToggle) {
    const currentType = (0, vue.toValue)(podType);
    if (currentType === POD_TYPE.EPISODE) return;
    const actionHeader = getPodTargetSelectors(currentType).actionHeader;
    const nativeToggleBtn = await waitElement(actionHeader);
    if (!nativeToggleBtn) return;
    const handler = () => {
      const { isWide } = playerState();
      if (isWide && currentType === POD_TYPE.COLLECTION) return;
      requestAnimationFrame(() => {
        const expanded = document.querySelector(
          getPodTargetSelectors(currentType).activeActionHeader,
        );
        onToggle?.(!!expanded);
      });
    };
    return on(nativeToggleBtn, 'click', handler, { capture: true });
  }
  function usePositionSync(podType, rootRef, onModeChange) {
    const position = (0, vue.ref)({
      top: 0,
      left: 0,
      width: 0,
      maxHeight: 0,
    });
    const isAnimating = (0, vue.ref)(false);
    let cleanupTracker = null;
    let cleanupResize = null;
    const containerStyle = (0, vue.computed)(() => ({
      top: `${position.value.top}px`,
      left: `${position.value.left}px`,
      width: `${position.value.width}px`,
      maxHeight: `${position.value.maxHeight}px`,
    }));
    const videoBodyStyle = (0, vue.computed)(() => ({ width: `${position.value.width}px` }));
    const stopSync = () => {
      cleanupTracker?.destroy?.();
      cleanupResize?.();
      cleanupTracker = null;
      cleanupResize = null;
      isAnimating.value = false;
    };
    const startSync = async (type) => {
      stopSync();
      const resolvedType = (0, vue.toValue)(type);
      if (!resolvedType) return;
      cleanupTracker = await watchPositionSync(resolvedType, rootRef, (newPos) => {
        position.value = newPos;
      });
      cleanupResize = await listenNativeToggle(resolvedType, (isExpanded) => {
        isAnimating.value = true;
        cleanupTracker.setAnimating(true);
        const { targetHeight, targetTop } = calculateCollectionToggleTargetLayout(
          resolvedType,
          isExpanded,
          position.value.top,
        );
        position.value = {
          ...position.value,
          top: targetTop,
          maxHeight: targetHeight,
        };
        onModeChange?.(isExpanded);
        setTimeout(() => {
          cleanupTracker?.setAnimating(false);
          isAnimating.value = false;
        }, 300);
      });
    };
    return {
      isAnimating,
      containerStyle,
      videoBodyStyle,
      startSync,
    };
  }
  var storage = createStorage(STORAGE_NAMESPACE);
  var settingsState = (0, vue.reactive)({ ...DEFAULT_SETTINGS });
  var isInitialized = false;
  function setupSettingsWatchers() {
    (0, vue.watch)(
      settingsState,
      (newVal) => {
        storage.set('user_settings', { ...newVal });
      },
      { deep: true },
    );
  }
  function initSettings() {
    if (isInitialized) return settingsState;
    isInitialized = true;
    const savedSettings = storage.get('user_settings', null);
    if (savedSettings) assign(settingsState, savedSettings);
    playerState().autoPlayNext?.(false);
    setupSettingsWatchers();
    return settingsState;
  }
  function useSettings() {
    const updateSettings = (patch) => {
      assign(settingsState, patch);
    };
    const resetSettings = () => {
      assign(settingsState, DEFAULT_SETTINGS);
    };
    return {
      settings: settingsState,
      updateSettings,
      resetSettings,
    };
  }
  function getCurrentBvid() {
    const { pathname, search } = window.location;
    const pathMatch = pathname.match(/\/video\/(BV[a-zA-Z0-9]+)/i);
    if (pathMatch) return pathMatch[1];
    const paramBvid = new URLSearchParams(search).get('bvid');
    if (paramBvid && /^BV[a-zA-Z0-9]+$/i.test(paramBvid)) return paramBvid;
    return null;
  }
  function getCurrentPage() {
    const { p } = getUrlParams();
    return parseInt(p || '1', 10);
  }
  async function fetchMedialistEpisodes(type, bizId) {
    const rawList = [];
    const seenIds = new Set();
    let hasMore = true;
    let lastOid;
    let safetyCounter = 30;
    while (hasMore && safetyCounter > 0) {
      safetyCounter -= 1;
      const res = await http({
        url: 'https://api.bilibili.com/x/v2/medialist/resource/list',
        params: {
          type,
          biz_id: bizId,
          ps: 100,
          otype: 2,
          mobi_app: 'web',
          ...(lastOid ? { oid: lastOid } : {}),
        },
      });
      const mediaList = res?.data?.media_list;
      if (!mediaList || res?.code !== 0) break;
      for (const item of mediaList)
        if (!seenIds.has(item.id)) {
          seenIds.add(item.id);
          rawList.push(item);
        }
      hasMore = !!(res.data.has_more && mediaList.length > 0);
      lastOid = mediaList[mediaList.length - 1]?.id;
    }
    if (!rawList.length) return null;
    return {
      sections: rawList,
      mode: POD_MODE.CARD,
      type: POD_TYPE.SERIES,
    };
  }
  async function fetchVideoEpisodes(bvid) {
    const res = await http({
      url: 'https://api.bilibili.com/x/web-interface/view',
      params: { bvid },
    });
    if (res?.code !== 0 || !res?.data) return null;
    const { data } = res;
    const seasonEpisodes = data.ugc_season?.sections?.flatMap((s) => s.episodes || []) || [];
    if (seasonEpisodes.length > 0)
      return {
        sections: seasonEpisodes,
        mode: POD_MODE.LIST,
        type: POD_TYPE.COLLECTION,
      };
    const pages = data.pages || [];
    if (pages.length <= 1) return null;
    return {
      sections: pages,
      mode: POD_MODE.LIST,
      type: POD_TYPE.EPISODE,
    };
  }
  function getMediaListMid() {
    const { pathname } = window.location;
    const match = pathname.match(/\/list\/(?:ml)?(\d+)/i);
    return match ? match[1] : null;
  }
  async function fetchSeasonInfo(bvid, sid) {
    try {
      if (sid) return await fetchMedialistEpisodes(5, sid);
      const upMid = getMediaListMid();
      if (upMid) return await fetchMedialistEpisodes(1, upMid);
      return await fetchVideoEpisodes(bvid);
    } catch (err) {
      console.error('[bilibili-playlist-enhancer] 获取合集信息失败:', err);
      return null;
    }
  }
  function buildEpisodes({
    pages,
    title,
    duration,
    isGroupActive,
    currentPage,
    fallbackCid,
    fallbackPage = 1,
  }) {
    const defaultPage = fallbackPage || 1;
    return (
      isArray(pages) && pages.length > 0
        ? pages
        : [
            {
              cid: fallbackCid,
              page: defaultPage,
              part: title,
              duration,
            },
          ]
    ).map((pageItem, pIdx) => {
      const pageNum = pageItem.page || defaultPage || pIdx + 1;
      return {
        cid: pageItem.cid || pageItem.id,
        page: pageNum,
        rawEpIndex: pIdx,
        title: pageItem.part || pageItem.title || title,
        duration: formatDuration(pageItem.duration || duration),
        isActive: isGroupActive && Number(pageNum) === Number(currentPage || 1),
      };
    });
  }
  function extractRawItem(item, currentBvid, index) {
    return {
      aid: item.aid || item.id,
      type: item.type,
      bvid: item.bvid || item.bv_id || currentBvid,
      title: item.title || item.part,
      cover: item.cover || item.pic || item.arc?.pic || '',
      pubdate: formatDate(item.arc?.pubdate || item.pubtime || item.pubdate || 0),
      duration: item.arc?.duration || item.duration || 0,
      views: formatCount(item.arc?.stat?.view ?? item.stat?.view ?? item.cnt_info?.play ?? 0),
      danmakus: formatCount(
        item.arc?.stat?.danmaku ?? item.stat?.danmaku ?? item.cnt_info?.danmaku ?? 0,
      ),
      pubTimestamp: item.pubdate || item.arc?.pubdate || item.pubtime || 0,
      page: item.page,
      rawIndex: index,
    };
  }
  function processSeasonData(podType, rawList = [], currentBvid = '', currentPage = 1) {
    const isEpisode = podType === POD_TYPE.EPISODE;
    return rawList.map((item, idx) => {
      const raw = extractRawItem(item, currentBvid, idx);
      const isGroupActive = raw.bvid === currentBvid;
      const hasPages = isArray(item.pages) && item.pages.length > 1;
      const episodes = buildEpisodes({
        pages: item.pages,
        title: raw.title,
        duration: raw.duration,
        isGroupActive,
        currentPage,
        fallbackCid: raw.cid || item.cid,
        fallbackPage: raw.page,
      });
      const isActive = isEpisode
        ? isGroupActive && Number(raw.page) === Number(currentPage)
        : isGroupActive;
      return {
        ...raw,
        isActive,
        isMultiPage: hasPages,
        episodes,
      };
    });
  }
  var SORT_STRATEGIES = {
    [SORT_MODE.TIME_ASC]: (list) =>
      [...list].sort((a, b) => (a.pubTimestamp || 0) - (b.pubTimestamp || 0)),
    [SORT_MODE.TIME_DESC]: (list) =>
      [...list].sort((a, b) => (b.pubTimestamp || 0) - (a.pubTimestamp || 0)),
    [SORT_MODE.DEFAULT]: (list) => [...list].sort((a, b) => (a.rawIndex || 0) - (b.rawIndex || 0)),
  };
  var findActiveAccordionBvid = (current) =>
    current?.group?.isMultiPage ? current.group.bvid : '';
  function updateGroupActive(group, podType, activeBvid, activePage) {
    const currentP = Number(activePage) || 1;
    const isGroupActive = group.bvid === activeBvid;
    const isEpisodeMatch = Number(group.page || 1) === currentP;
    const isActive = podType === POD_TYPE.EPISODE ? isGroupActive && isEpisodeMatch : isGroupActive;
    const episodes = (group.episodes || []).map((ep) => ({
      ...ep,
      isActive: isGroupActive && Number(ep.page || 1) === currentP,
    }));
    return {
      ...group,
      isActive,
      episodes,
    };
  }
  async function fetchPodPayload(bvid, page) {
    const { sid } = getUrlParams();
    const podData = await fetchSeasonInfo(bvid, sid);
    if (!podData) return null;
    return {
      type: podData.type,
      mode: podData.mode,
      groups: processSeasonData(podData.type, podData.sections, bvid, page),
    };
  }
  var isSameVideoTarget = (currentBvid, currentPage, nextBvid, nextPage) =>
    currentBvid === nextBvid && Number(currentPage || 1) === Number(nextPage || 1);
  var hasSeasonBvid = (groups, bvid) => groups.some((g) => g.bvid === bvid);
  var flattenEpisodes = (groups) =>
    groups.flatMap((group, groupIndex) =>
      (group.episodes || []).map((ep, epIndex) => ({
        group,
        groupIndex,
        epIndex,
        episode: ep,
        bvid: group.bvid,
        page: Number(ep.page || 1),
      })),
    );
  function findCurrentPlaying(flatList, activeBvid, activePage) {
    const currentP = Number(activePage) || 1;
    const flatIndex = flatList.findIndex(
      (item) => item.bvid === activeBvid && item.page === currentP,
    );
    if (flatIndex === -1) return null;
    const currentItem = flatList[flatIndex];
    const totalEpisodes = flatList.length;
    const groupEpisodes = currentItem.group?.episodes || [];
    return {
      groupIndex: currentItem.groupIndex,
      group: currentItem.group,
      epIndex: currentItem.epIndex,
      episode: currentItem.episode,
      flatIndex,
      totalEpisodes,
      isFirst: flatIndex === 0,
      isLast: flatIndex === totalEpisodes - 1,
      isGroupFirst: currentItem.epIndex === 0,
      isGroupLast: currentItem.epIndex === groupEpisodes.length - 1,
    };
  }
  function getAdjacentVideo(flatList, currentFlatIndex, action) {
    if (currentFlatIndex === -1 || currentFlatIndex == null) return null;
    return flatList[currentFlatIndex + (action === CTRL_ACTION.PREV ? -1 : 1)] || null;
  }
  function useAccordion() {
    const expandedBvid = (0, vue.ref)('');
    const isExpanded = (bvid) => expandedBvid.value === bvid;
    const toggleAccordion = (bvid) => {
      expandedBvid.value = expandedBvid.value === bvid ? '' : bvid;
    };
    const setExpanded = (bvid) => {
      expandedBvid.value = bvid;
    };
    return {
      expandedBvid,
      isExpanded,
      toggleAccordion,
      setExpanded,
    };
  }
  function usePodSort(rawGroups, settings) {
    const sortMode = (0, vue.computed)({
      get: () => settings.sortMode,
      set: (val) => {
        settings.sortMode = val;
      },
    });
    const groups = (0, vue.computed)(() =>
      (SORT_STRATEGIES[sortMode.value] || SORT_STRATEGIES[SORT_MODE.DEFAULT])(rawGroups.value),
    );
    const setSortMode = (mode) => {
      settings.sortMode = mode;
    };
    return {
      sortMode,
      groups,
      setSortMode,
    };
  }
  function usePodPlayback({
    rawGroups,
    podType,
    activeBvid,
    activePage,
    flatEpisodes,
    currentPlaying,
    scrollContainerRef,
    setExpanded,
    toggleAccordion,
    settings,
    shuffleActions,
  }) {
    const refreshActiveStates = (isManualClick = false) => {
      rawGroups.value = rawGroups.value.map((g) =>
        updateGroupActive(g, podType.value, activeBvid.value, activePage.value),
      );
      setExpanded(findActiveAccordionBvid(currentPlaying.value));
      if (isManualClick && settings && !settings.scrollActiveOnClick) return;
      scrollActiveItem(scrollContainerRef.value, true);
    };
    const switchActiveVideo = (type, data, index, isManual = true) => {
      const { bvid, aid, episodes } = data;
      const { page, cid, isActive } = episodes[index];
      if (isActive) return;
      if (isManual)
        shuffleActions?.recordManualPlay?.({
          bvid,
          page,
        });
      activeBvid.value = bvid;
      activePage.value = page;
      executeVideoSwitch(podType.value, {
        aid,
        bvid,
        cid,
        p: page,
      });
      refreshActiveStates(isManual);
    };
    const handleHeaderClick = (group) => {
      if (group.isActive && group.isMultiPage) {
        toggleAccordion(group.bvid);
        return;
      }
      switchActiveVideo(podType.value, group, 0, true);
    };
    const getNextTarget = (action) => {
      if (settings?.shuffle) {
        const shuffleTarget =
          action === CTRL_ACTION.PREV
            ? shuffleActions?.getPrevShuffleTarget?.()
            : shuffleActions?.getNextShuffleTarget?.();
        if (shuffleTarget) return shuffleTarget;
      }
      const currentIndex = currentPlaying.value?.flatIndex;
      return getAdjacentVideo(flatEpisodes.value, currentIndex, action);
    };
    const handlePlayerCtrl = (action) => {
      const target = getNextTarget(action);
      if (target) switchActiveVideo(podType.value, target.group, target.epIndex, false);
    };
    const setActiveTarget = (bvid, page) => {
      activeBvid.value = bvid;
      activePage.value = page;
    };
    return {
      refreshActiveStates,
      switchActiveVideo,
      handleHeaderClick,
      handlePlayerCtrl,
      setActiveTarget,
    };
  }
  function usePodLoader({
    rawGroups,
    podType,
    activeBvid,
    activePage,
    rootRef,
    scrollContainerRef,
    setExpanded,
    currentPlaying,
    setActiveTarget,
    refreshActiveStates,
  }) {
    const isLoading = (0, vue.ref)(false);
    const podMode = (0, vue.ref)(POD_MODE.LIST);
    const onModeChange = (isExpandedMode) => {
      podMode.value = isExpandedMode ? POD_MODE.CARD : POD_MODE.LIST;
      setTimeout(() => {
        scrollActiveItem(scrollContainerRef.value, true);
      }, 300);
    };
    const { isAnimating, containerStyle, videoBodyStyle, startSync } = usePositionSync(
      podType,
      rootRef,
      onModeChange,
    );
    const trySwitchSameSeason = (nextBvid, nextPage) => {
      if (!hasSeasonBvid(rawGroups.value, nextBvid)) return false;
      if (isSameVideoTarget(activeBvid.value, activePage.value, nextBvid, nextPage)) return true;
      setActiveTarget(nextBvid, nextPage);
      refreshActiveStates();
      return true;
    };
    const initPodState = async (payload, bvid, page) => {
      if (!payload) {
        rawGroups.value = [];
        setExpanded('');
        podType.value = null;
        return;
      }
      podType.value = payload.type;
      podMode.value = payload.mode;
      rawGroups.value = payload.groups;
      setActiveTarget(bvid, page);
      setExpanded(findActiveAccordionBvid(currentPlaying.value));
      await startSync(podType.value);
      scrollActiveItem(scrollContainerRef.value, false);
    };
    const loadPod = async () => {
      const nextBvid = getCurrentBvid();
      const nextPage = getCurrentPage();
      if (!nextBvid) return;
      if (isSameVideoTarget(activeBvid.value, activePage.value, nextBvid, nextPage)) return;
      if (trySwitchSameSeason(nextBvid, nextPage)) return;
      setActiveTarget(nextBvid, nextPage);
      rawGroups.value = [];
      podType.value = null;
      isLoading.value = true;
      try {
        const payload = await fetchPodPayload(nextBvid, nextPage);
        await initPodState(payload, nextBvid, nextPage);
      } finally {
        isLoading.value = false;
      }
    };
    return {
      isAnimating,
      isLoading,
      podMode,
      containerStyle,
      videoBodyStyle,
      initPodState,
      loadPod,
      trySwitchSameSeason,
    };
  }
  function isInputElement(event) {
    return (event.composedPath ? event.composedPath() : [event.target]).some((el) => {
      const tag = el?.tagName?.toLowerCase();
      return (
        tag === 'input' || tag === 'textarea' || tag === 'magic-input' || el?.isContentEditable
      );
    });
  }
  function formatKeyboardKey(event) {
    if (['Control', 'Shift', 'Alt', 'Meta'].includes(event.key)) return '';
    const parts = [];
    if (event.ctrlKey) parts.push('Ctrl');
    if (event.altKey) parts.push('Alt');
    if (event.shiftKey) parts.push('Shift');
    if (event.metaKey) parts.push('Meta');
    let key = event.key;
    if (key === ' ') key = 'Space';
    else if (key.length === 1) key = key.toUpperCase();
    parts.push(key);
    return parts.join('+');
  }
  function matchesHotkey(event, targetHotkey) {
    if (!targetHotkey) return false;
    const currentKey = formatKeyboardKey(event);
    if (!currentKey) return false;
    return currentKey.toLowerCase() === targetHotkey.trim().toLowerCase();
  }
  function usePodHotkeys({ settings, handlePlayerCtrl }) {
    const onKeyDown = (event) => {
      if (isInputElement(event.target)) return;
      if (matchesHotkey(event, settings.hotkeyPrev)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        handlePlayerCtrl?.(CTRL_ACTION.PREV);
        return;
      }
      if (matchesHotkey(event, settings.hotkeyNext)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        handlePlayerCtrl?.(CTRL_ACTION.NEXT);
      }
    };
    return on(window, 'keydown', onKeyDown, { capture: true });
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
  var style_default$7 =
    ':host{font-family:inherit;display:block}@keyframes magic-toast-in{0%{opacity:0;transform:translateY(-16px)scale(.95)}to{opacity:1;transform:translateY(0)scale(1)}}@keyframes magic-toast-out{0%{opacity:1;transform:translateY(0)scale(1)}to{opacity:0;transform:translateY(-16px)scale(.95)}}.magic-toast-container{z-index:var(--magic-toast-z-index,999999);pointer-events:none;box-sizing:border-box;flex-direction:column;align-items:center;gap:10px;width:max-content;max-width:90vw;display:flex;position:fixed;left:50%;transform:translate(-50%)}.magic-toast-container--top{top:24px}.magic-toast-container--center{top:50%;transform:translate(-50%,-50%)}.magic-toast-container--bottom{bottom:24px}.magic-toast{box-sizing:border-box;border-radius:var(--magic-toast-radius,8px);background:var(--magic-toast-bg,#1c1e24f0);min-height:40px;color:var(--magic-toast-color,#e5e9ef);border:1px solid var(--magic-toast-border,#ffffff1f);box-shadow:var(--magic-toast-shadow,0 10px 30px #00000073);-webkit-backdrop-filter:blur(12px);pointer-events:auto;-webkit-user-select:none;user-select:none;align-items:center;gap:10px;padding:10px 18px;font-size:14px;line-height:1.4;transition:all .25s;animation:.25s cubic-bezier(.16,1,.3,1) forwards magic-toast-in;display:inline-flex}.magic-toast.is-leaving{animation:.2s cubic-bezier(.4,0,1,1) forwards magic-toast-out}.magic-toast__icon{flex-shrink:0;justify-content:center;align-items:center;width:18px;height:18px;display:inline-flex}.magic-toast__icon svg{width:100%;height:100%;display:block}.magic-toast__content{word-break:break-word;align-items:center;display:inline-flex}.magic-toast__close{cursor:pointer;opacity:.6;color:inherit;background:0 0;border:none;border-radius:4px;justify-content:center;align-items:center;margin-left:6px;padding:2px;transition:opacity .2s,background-color .2s;display:inline-flex}.magic-toast__close:hover{opacity:1;background-color:#ffffff1a}.magic-toast__close svg{width:14px;height:14px}.magic-toast--info .magic-toast__icon{color:var(--magic-toast-info-color,var(--magic-primary-color))}.magic-toast--success .magic-toast__icon{color:var(--magic-toast-success-color,#2ac864)}.magic-toast--warning .magic-toast__icon{color:var(--magic-toast-warning-color,#fa9600)}.magic-toast--error .magic-toast__icon{color:var(--magic-toast-error-color,#ff5c7c)}';
  var theme_default =
    ':root{--magic-primary-color:#e11483;--magic-primary-hover-color:color-mix(in srgb, var(--magic-primary-color) 85%, #fff);--magic-primary-active-color:color-mix(in srgb, var(--magic-primary-color) 85%, #000);--magic-primary-light-bg:color-mix(in srgb, var(--magic-primary-color) 12%, transparent);--magic-primary-shadow:color-mix(in srgb, var(--magic-primary-color) 35%, transparent);--magic-primary-focus-shadow:color-mix(in srgb, var(--magic-primary-color) 20%, transparent)}';
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
    static styles = r$2(style_default$7);
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
  var MAX_HISTORY_LENGTH = 50;
  var getEpisodeKey = (bvid, page) => `${bvid}_${Number(page || 1)}`;
  var extractCurrentKey = (current) => {
    if (!current?.group?.bvid) return '';
    const page = current.episode?.page || current.page || 1;
    return getEpisodeKey(current.group.bvid, page);
  };
  function filterCandidatesByScope(flatList, scope, activeBvid) {
    if (scope === SHUFFLE_SCOPE.GROUP && activeBvid)
      return flatList.filter((item) => item.bvid === activeBvid);
    return [...flatList];
  }
  function buildCandidateKeys(flatList, scope, curBvid, curKey) {
    return filterCandidatesByScope(flatList, scope, curBvid)
      .map((item) => getEpisodeKey(item.bvid, item.page))
      .filter((k) => k !== curKey);
  }
  function pickRandomKey(keys) {
    if (keys.length === 0)
      return {
        selectedKey: null,
        remainingKeys: [],
      };
    const selectedKey = keys[Math.floor(Math.random() * keys.length)];
    return {
      selectedKey,
      remainingKeys: keys.filter((k) => k !== selectedKey),
    };
  }
  function pushHistoryStack(stack, key, max = MAX_HISTORY_LENGTH) {
    if (!key) return;
    stack.push(key);
    if (stack.length > max) stack.shift();
  }
  var findEpisodeByKey = (flatList, key) =>
    key ? flatList.find((ep) => getEpisodeKey(ep.bvid, ep.page) === key) || null : null;
  function resolveCandidateKeys(unplayedPool, flatEpisodes, settings, curBvid, curKey) {
    const remainingKeys = unplayedPool.filter((k) => k !== curKey);
    if (remainingKeys.length > 0) return remainingKeys;
    const refreshedKeys = buildCandidateKeys(flatEpisodes, settings.shuffleScope, curBvid, curKey);
    if (refreshedKeys.length === 0 && settings.shuffleScope === SHUFFLE_SCOPE.GROUP)
      toast.info('当前分 P 仅有 1 集，无法在分组内随机播放');
    return refreshedKeys;
  }
  function useShuffle({ settings, flatEpisodes, currentPlaying }) {
    const unplayedPool = (0, vue.ref)([]);
    const historyStack = (0, vue.ref)([]);
    const getCurrentBvid = () => currentPlaying.value?.group?.bvid || '';
    const getCurrentKey = () => extractCurrentKey(currentPlaying.value);
    const rebuildPool = () => {
      unplayedPool.value = buildCandidateKeys(
        flatEpisodes.value,
        settings.shuffleScope,
        getCurrentBvid(),
        getCurrentKey(),
      );
    };
    const getNextShuffleTarget = () => {
      const curKey = getCurrentKey();
      const { selectedKey, remainingKeys } = pickRandomKey(
        resolveCandidateKeys(
          unplayedPool.value,
          flatEpisodes.value,
          settings,
          getCurrentBvid(),
          curKey,
        ),
      );
      if (!selectedKey) return null;
      unplayedPool.value = remainingKeys;
      pushHistoryStack(historyStack.value, curKey);
      return findEpisodeByKey(flatEpisodes.value, selectedKey);
    };
    const getPrevShuffleTarget = () => {
      const prevKey = historyStack.value.pop();
      return findEpisodeByKey(flatEpisodes.value, prevKey);
    };
    const recordManualPlay = (target) => {
      if (!target) return;
      const curKey = getCurrentKey();
      const targetKey = getEpisodeKey(target.bvid, target.page || target.episode?.page);
      if (curKey && curKey !== targetKey) pushHistoryStack(historyStack.value, curKey);
      unplayedPool.value = unplayedPool.value.filter((k) => k !== targetKey);
    };
    const toggleShuffle = () => {
      settings.shuffle = !settings.shuffle;
      return settings.shuffle;
    };
    (0, vue.watch)(
      () => [settings.shuffle, settings.shuffleScope, flatEpisodes.value.length],
      () => {
        if (settings.shuffle) rebuildPool();
      },
      { immediate: true },
    );
    (0, vue.watch)(
      () => currentPlaying.value?.group?.bvid,
      (newBvid, oldBvid) => {
        const isGroupScope = settings.shuffleScope === SHUFFLE_SCOPE.GROUP;
        if (settings.shuffle && isGroupScope && newBvid !== oldBvid) rebuildPool();
      },
    );
    return {
      unplayedPool,
      historyStack,
      rebuildPool,
      getNextShuffleTarget,
      getPrevShuffleTarget,
      recordManualPlay,
      toggleShuffle,
    };
  }
  function useVideoPod() {
    const rootRef = (0, vue.ref)(null);
    const scrollContainerRef = (0, vue.ref)(null);
    const podType = (0, vue.ref)(null);
    const rawGroups = (0, vue.ref)([]);
    const activeBvid = (0, vue.ref)('');
    const activePage = (0, vue.ref)(1);
    const { settings } = useSettings();
    const { isExpanded, toggleAccordion, setExpanded } = useAccordion();
    const { sortMode, groups, setSortMode } = usePodSort(rawGroups, settings);
    const flatEpisodes = (0, vue.computed)(() => flattenEpisodes(groups.value));
    const currentPlaying = (0, vue.computed)(() =>
      findCurrentPlaying(flatEpisodes.value, activeBvid.value, activePage.value),
    );
    const { getNextShuffleTarget, getPrevShuffleTarget, recordManualPlay, toggleShuffle } =
      useShuffle({
        settings,
        flatEpisodes,
        currentPlaying,
      });
    const {
      refreshActiveStates,
      switchActiveVideo,
      handleHeaderClick,
      handlePlayerCtrl,
      setActiveTarget,
    } = usePodPlayback({
      rawGroups,
      podType,
      activeBvid,
      activePage,
      flatEpisodes,
      currentPlaying,
      scrollContainerRef,
      setExpanded,
      toggleAccordion,
      settings,
      shuffleActions: {
        getNextShuffleTarget,
        getPrevShuffleTarget,
        recordManualPlay,
      },
    });
    const { isAnimating, isLoading, podMode, containerStyle, videoBodyStyle, loadPod } =
      usePodLoader({
        rawGroups,
        podType,
        activeBvid,
        activePage,
        rootRef,
        scrollContainerRef,
        setExpanded,
        currentPlaying,
        setActiveTarget,
        refreshActiveStates,
      });
    (0, vue.watch)(
      () => settings.sortMode,
      () => {
        if (settings.scrollToActiveOnSort) scrollActiveItem(scrollContainerRef.value, true);
        else
          scrollContainerRef.value?.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
      },
      { flush: 'post' },
    );
    (0, vue.watch)(
      () => settings.autoPlayNext,
      () => {
        playerState().autoPlayNext?.(false);
      },
      { immediate: true },
    );
    const handleVideoEnded = () => {
      if (!settings.autoPlayNext) return;
      if (!settings.shuffle) {
        if (
          currentPlaying.value?.isLast ||
          (settings.stopOnGroupEnd && currentPlaying.value?.isGroupLast)
        )
          return;
      }
      handlePlayerCtrl(CTRL_ACTION.NEXT);
    };
    (0, vue.onMounted)(() => {
      loadPod().then();
      const cleanups = [
        interceptPlayerControls(handlePlayerCtrl),
        interceptPlayerEnding(handleVideoEnded),
        usePodHotkeys({
          settings,
          handlePlayerCtrl,
        }),
      ];
      (0, vue.onUnmounted)(() => cleanups.forEach((fn) => fn?.()));
    });
    return {
      isAnimating,
      isLoading,
      podType,
      rootRef,
      scrollContainerRef,
      podMode,
      sortMode,
      setSortMode,
      groups,
      flatEpisodes,
      currentPlaying,
      containerStyle,
      videoBodyStyle,
      isExpanded,
      toggleAccordion,
      handleHeaderClick,
      switchActiveVideo,
      toggleShuffle,
      loadPod,
    };
  }
  var normalizeQuery = (str) => (str || '').trim().toLowerCase();
  var isTextMatched = (text, query) =>
    String(text || '')
      .toLowerCase()
      .includes(query);
  function filterGroupItem(group, query) {
    if (!query) return group;
    if (isTextMatched(group.title, query))
      return {
        ...group,
        isAutoExpanded: true,
      };
    const matchedEpisodes = (group.episodes || []).filter(
      (ep) => isTextMatched(ep.title, query) || isTextMatched(`p${ep.page}`, query),
    );
    if (matchedEpisodes.length > 0)
      return {
        ...group,
        episodes: matchedEpisodes,
        isAutoExpanded: true,
      };
    return null;
  }
  function filterGroupList(groups, keyword) {
    const query = normalizeQuery(keyword);
    if (!query) return groups || [];
    return (groups || []).map((g) => filterGroupItem(g, query)).filter(Boolean);
  }
  function countTotalMatches(filteredGroups) {
    return (filteredGroups || []).reduce((acc, g) => acc + (g.episodes?.length || 1), 0);
  }
  function usePodSearch(groups) {
    const keyword = (0, vue.ref)('');
    const isSearchOpen = (0, vue.ref)(false);
    const searchInputRef = (0, vue.ref)(null);
    const filteredGroups = (0, vue.computed)(() => filterGroupList(groups.value, keyword.value));
    const matchCount = (0, vue.computed)(() => countTotalMatches(filteredGroups.value));
    const hasSearchQuery = (0, vue.computed)(() => !!(keyword.value || '').trim());
    const openSearch = () => {
      isSearchOpen.value = true;
      (0, vue.nextTick)(() => searchInputRef.value?.focus());
    };
    const closeSearch = () => {
      keyword.value = '';
      isSearchOpen.value = false;
    };
    const clearKeyword = () => {
      keyword.value = '';
      searchInputRef.value?.focus();
    };
    const toggleSearch = () => {
      if (isSearchOpen.value) {
        closeSearch();
        return;
      }
      openSearch();
    };
    return {
      keyword,
      isSearchOpen,
      searchInputRef,
      filteredGroups,
      matchCount,
      hasSearchQuery,
      openSearch,
      closeSearch,
      clearKeyword,
      toggleSearch,
    };
  }
  var style_default$6 =
    ':host{vertical-align:middle;display:inline-flex}@keyframes magic-spinner-rotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.magic-spinner{justify-content:center;align-items:center;gap:10px;display:inline-flex}.magic-spinner.is-vertical{flex-direction:column;gap:12px}.magic-spinner__circle{box-sizing:border-box;width:var(--magic-spinner-size,24px);height:var(--magic-spinner-size,24px);border-style:solid;border-width:var(--magic-spinner-border-width,3px);border-color:var(--magic-spinner-track,var(--bg2,#ffffff1a));border-top-color:var(--magic-spinner-color,var(--magic-primary-color));border-radius:50%;flex-shrink:0;animation:.8s linear infinite magic-spinner-rotate}.magic-spinner__text{color:var(--magic-spinner-text-color,var(--text3,#9499a0));-webkit-user-select:none;user-select:none;font-size:13px;line-height:1.4}';
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
  var style_default$5 =
    ':host{vertical-align:middle;-webkit-user-select:none;user-select:none;align-items:center;display:inline-flex}.magic-switch{cursor:pointer;background:0 0;border:none;outline:none;align-items:center;gap:6px;margin:0;padding:0;font-family:inherit;display:inline-flex}.magic-switch--small{--switch-width:30px;--switch-height:16px;--switch-knob:12px;--switch-offset:14px;--switch-font-size:12px}.magic-switch--medium{--switch-width:38px;--switch-height:20px;--switch-knob:16px;--switch-offset:18px;--switch-font-size:13px}.magic-switch--large{--switch-width:46px;--switch-height:24px;--switch-knob:20px;--switch-offset:22px;--switch-font-size:14px}.magic-switch__core{width:var(--switch-width,38px);height:var(--switch-height,20px);background-color:var(--magic-switch-inactive-color,#8c8c8c59);box-sizing:border-box;border-radius:999px;transition:background-color .25s,border-color .25s;display:inline-block;position:relative}.magic-switch__action{width:var(--switch-knob,16px);height:var(--switch-knob,16px);background-color:#fff;border-radius:50%;justify-content:center;align-items:center;transition:transform .25s cubic-bezier(.4,0,.2,1);display:flex;position:absolute;top:2px;left:2px;box-shadow:0 1px 3px #00000040}.magic-switch__label{color:var(--text2,#61666d);font-size:13px;line-height:1;transition:color .2s}.magic-switch.is-checked .magic-switch__core{background-color:var(--magic-switch-active-color,var(--magic-primary-color))}.magic-switch.is-checked .magic-switch__action{transform:translateX(var(--switch-offset,18px))}.magic-switch.is-checked .magic-switch__label{color:var(--text1,#18191c)}.magic-switch.is-disabled{cursor:not-allowed;opacity:.55}.magic-switch.is-disabled .magic-switch__core{cursor:not-allowed}.magic-switch.is-loading{cursor:wait;opacity:.8}';
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
    ':host{vertical-align:middle;box-sizing:border-box;font-family:inherit;display:inline-block;position:relative}:host([block]){width:100%;display:block}@keyframes magic-select-dropdown-in{0%{opacity:0;transform:translateY(-8px)scaleY(.95)}to{opacity:1;transform:translateY(0)scaleY(1)}}.magic-select{box-sizing:border-box;-webkit-user-select:none;user-select:none;width:100%;position:relative}.magic-select__trigger{box-sizing:border-box;border:1px solid var(--magic-select-border,#ffffff26);background:var(--magic-select-bg,#ffffff14);width:100%;color:var(--magic-select-color,#e5e9ef);cursor:pointer;border-radius:6px;outline:none;justify-content:space-between;align-items:center;transition:all .2s cubic-bezier(.4,0,.2,1);display:flex}.magic-select__label{text-overflow:ellipsis;white-space:nowrap;text-align:left;flex:1;overflow:hidden}.magic-select__label.is-placeholder{color:var(--magic-select-placeholder-color,#9499a0)}.magic-select__suffix{color:var(--magic-select-suffix-color,#9499a0);flex-shrink:0;justify-content:center;align-items:center;margin-left:6px;transition:transform .2s;display:inline-flex}.magic-select__suffix svg{width:14px;height:14px;transition:transform .2s;display:block}.magic-select__suffix.is-reverse svg{transform:rotate(180deg)}.magic-select__clear{color:var(--magic-select-clear-color,#9499a0);cursor:pointer;flex-shrink:0;justify-content:center;align-items:center;margin-left:6px;transition:color .2s;display:none}.magic-select__clear:hover{color:var(--magic-select-clear-hover-color,#e5e9ef)}.magic-select__clear svg{width:14px;height:14px;display:block}.magic-select--small .magic-select__trigger{height:28px;padding:0 8px;font-size:12px}.magic-select--medium .magic-select__trigger{height:34px;padding:0 12px;font-size:14px}.magic-select--large .magic-select__trigger{height:40px;padding:0 16px;font-size:16px}.magic-select:hover:not(.is-disabled) .magic-select__trigger{border-color:var(--magic-select-hover-border,#ffffff40);background:var(--magic-select-hover-bg,#ffffff1f)}.magic-select:hover:not(.is-disabled).has-value.is-clearable .magic-select__suffix{display:none}.magic-select:hover:not(.is-disabled).has-value.is-clearable .magic-select__clear{display:inline-flex}.magic-select.is-open .magic-select__trigger{border-color:var(--magic-select-active-color,var(--magic-primary-color));box-shadow:0 0 0 2px var(--magic-primary-focus-shadow)}.magic-select.is-disabled .magic-select__trigger{cursor:not-allowed;opacity:.5;background:#ffffff0a;border-color:#ffffff1a}.magic-select__dropdown{box-sizing:border-box;width:100%;min-width:100%;max-height:220px;z-index:var(--magic-select-z-index,10000);background:var(--magic-select-dropdown-bg,#1c1e24f5);border:1px solid var(--magic-select-dropdown-border,#ffffff1f);box-shadow:var(--magic-select-dropdown-shadow,0 10px 30px #00000080);-webkit-backdrop-filter:blur(12px);transform-origin:top;border-radius:6px;padding:4px;animation:.2s cubic-bezier(.16,1,.3,1) forwards magic-select-dropdown-in;position:absolute;top:calc(100% + 4px);left:0;overflow-y:auto}.magic-select__dropdown::-webkit-scrollbar{width:5px}.magic-select__dropdown::-webkit-scrollbar-thumb{background:#fff3;border-radius:4px}.magic-select__empty{text-align:center;color:var(--magic-select-placeholder-color,#9499a0);padding:12px;font-size:13px}.magic-option{box-sizing:border-box;color:var(--magic-select-color,#e5e9ef);cursor:pointer;-webkit-user-select:none;user-select:none;border-radius:4px;justify-content:space-between;align-items:center;padding:8px 10px;font-size:14px;line-height:1.2;transition:all .15s;display:flex}.magic-option:hover:not(.is-disabled){background-color:var(--magic-select-option-hover-bg,#ffffff14)}.magic-option.is-selected{color:var(--magic-select-active-color,var(--magic-primary-color));background-color:var(--magic-select-option-active-bg,var(--magic-primary-light-bg));font-weight:500}.magic-option.is-disabled{cursor:not-allowed;opacity:.4}';
  var SELECT_ICONS = {
    arrowDown: b`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9" />
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
    static styles = r$2(style_default$4);
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
    };
    static styles = r$2(style_default$4);
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
      if (this.open && !event.composedPath().includes(this)) this.open = false;
    }
    toggleDropdown(event) {
      event.stopPropagation();
      if (this.disabled) return;
      this.open = !this.open;
    }
    handleClear(event) {
      event.stopPropagation();
      this.value = '';
      this.open = false;
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
    get currentLabel() {
      if (isArray(this.options) && this.options.length > 0) {
        const match = this.options.find((item) => String(item.value) === String(this.value));
        if (match) return match.label ?? match.value;
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
    handleSlotClick(event) {
      const target = event.target.closest('magic-option');
      if (target && !target.disabled)
        this.handleSelectOption({
          value: target.value,
          label: target.label || target.textContent?.trim(),
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
        return b`
        <div class="${[
          'magic-option',
          String(item.value) === String(this.value) ? 'is-selected' : '',
          item.disabled ? 'is-disabled' : '',
        ]
          .filter(Boolean)
          .join(' ')}" @click=${(e) => this.handleSelectOption(item, e)}>
          ${item.label ?? item.value}
        </div>
      `;
      });
    }
    render() {
      const hasValue = this.value !== void 0 && this.value !== null && this.value !== '';
      const displayLabel = this.currentLabel;
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
                <div class="magic-select__dropdown" role="listbox">${this.renderOptionList()}</div>
              `
            : b``
        }
      </div>
    `;
    }
  };
  if (!customElements.get('magic-option')) customElements.define('magic-option', MagicOption);
  if (!customElements.get('magic-select')) customElements.define('magic-select', MagicSelect);
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
          .maxLength=${this.maxlength ?? -1}
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
  var ICONS = {
    expand: {
      viewBox: '0 0 24 24',
      d: 'M12 15.375L6 9.375L7.4 7.975L12 12.575L16.6 7.975L18 9.375L12 15.375Z',
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
  };
  var _hoisted_1$2 = ['viewBox'];
  var _hoisted_2$2 = ['d', 'fill-rule', 'clip-rule'];
  var _sfc_main$2 = {
    __name: 'index',
    props: {
      name: {
        type: String,
        required: true,
      },
    },
    setup(__props) {
      const props = __props;
      const icon = (0, vue.computed)(() => ICONS[props.name]);
      return (_ctx, _cache) => {
        return (0, vue.unref)(icon)
          ? ((0, vue.openBlock)(),
            (0, vue.createElementBlock)(
              'svg',
              {
                key: 0,
                viewBox: (0, vue.unref)(icon).viewBox || '0 0 24 24',
                'aria-hidden': 'true',
                class: 'icon',
              },
              [
                (0, vue.createElementVNode)(
                  'path',
                  {
                    d: (0, vue.unref)(icon).d,
                    'fill-rule': (0, vue.unref)(icon).fillRule,
                    'clip-rule': (0, vue.unref)(icon).clipRule,
                    fill: 'currentColor',
                  },
                  null,
                  8,
                  _hoisted_2$2,
                ),
              ],
              8,
              _hoisted_1$2,
            ))
          : (0, vue.createCommentVNode)('', true);
      };
    },
  };
  var style_default$2 =
    ':host{font-family:inherit;display:block}:host(:not([visible])){display:none!important}@keyframes magic-modal-mask-fade-in{0%{opacity:0}to{opacity:1}}@keyframes magic-modal-mask-fade-out{0%{opacity:1}to{opacity:0}}@keyframes magic-modal-zoom-in{0%{opacity:0;transform:scale(.92)translateY(-20px)}to{opacity:1;transform:scale(1)translateY(0)}}@keyframes magic-modal-zoom-out{0%{opacity:1;transform:scale(1)translateY(0)}to{opacity:0;transform:scale(.92)translateY(-20px)}}.magic-modal-wrapper{z-index:var(--magic-modal-z-index,99999);overscroll-behavior:contain;box-sizing:border-box;text-align:center;pointer-events:auto;position:fixed;inset:0;overflow:hidden auto}.magic-modal-wrapper.is-leaving{pointer-events:none!important}.magic-modal-wrapper:after{content:"";vertical-align:middle;width:0;height:100%;display:inline-block}.magic-modal-wrapper.is-centered{justify-content:center;align-items:center;padding-bottom:16vh;display:flex}.magic-modal-wrapper.is-centered:after{display:none}.magic-modal-wrapper.is-centered .magic-modal{margin:24px auto;top:0!important}.magic-modal-mask{z-index:var(--magic-modal-z-index,99999);background:var(--magic-modal-mask-bg,#000000a6);-webkit-backdrop-filter:blur(4px);animation:.25s forwards magic-modal-mask-fade-in;position:fixed;inset:0}.magic-modal-mask.is-leaving{animation:.2s forwards magic-modal-mask-fade-out;pointer-events:none!important}.magic-modal{vertical-align:middle;text-align:left;box-sizing:border-box;background:var(--magic-modal-bg,#1c1e24f5);border:1px solid var(--magic-modal-border,#ffffff1f);border-radius:var(--magic-modal-radius,12px);width:100%;box-shadow:var(--magic-modal-shadow,0 16px 48px #0009);-webkit-backdrop-filter:blur(16px);color:var(--magic-modal-color,#e5e9ef);pointer-events:auto;flex-direction:column;margin:0 auto;animation:.25s cubic-bezier(.16,1,.3,1) forwards magic-modal-zoom-in;display:inline-flex;position:relative}.magic-modal.is-leaving{animation:.2s cubic-bezier(.4,0,1,1) forwards magic-modal-zoom-out;pointer-events:none!important}.magic-modal__header{border-bottom:1px solid var(--magic-modal-divider,#ffffff14);box-sizing:border-box;justify-content:space-between;align-items:center;padding:16px 20px;display:flex}.magic-modal__title{color:var(--magic-modal-title-color,#fff);font-size:16px;font-weight:600;line-height:1.4}.magic-modal__close{width:28px;height:28px;color:var(--magic-modal-close-color,#9499a0);cursor:pointer;background:0 0;border:none;border-radius:6px;justify-content:center;align-items:center;margin:-4px -6px -4px auto;padding:0;transition:all .2s;display:inline-flex}.magic-modal__close:hover{color:#fff;background:#ffffff1a}.magic-modal__close svg{width:16px;height:16px;display:block}.magic-modal__body{word-break:break-word;overscroll-behavior:contain;box-sizing:border-box;scrollbar-width:thin;scrollbar-color:#fff3 transparent;max-height:calc(80vh - 140px);padding:20px;font-size:14px;line-height:1.6;overflow-y:auto}.magic-modal__body::-webkit-scrollbar{width:5px}.magic-modal__body::-webkit-scrollbar-thumb{background:#fff3;border-radius:4px}.magic-modal__footer{border-top:1px solid var(--magic-modal-divider,#ffffff14);box-sizing:border-box;justify-content:flex-end;align-items:center;gap:12px;padding:14px 20px;display:flex}';
  var style_default$1 =
    ':host{vertical-align:middle;display:inline-flex}:host([block]){width:100%;display:flex}.magic-button{box-sizing:border-box;white-space:nowrap;text-align:center;cursor:pointer;-webkit-user-select:none;user-select:none;vertical-align:middle;border:1px solid #0000;border-radius:6px;outline:none;justify-content:center;align-items:center;width:100%;font-family:inherit;font-weight:500;line-height:1;transition:all .2s cubic-bezier(.4,0,.2,1);display:inline-flex;position:relative}.magic-button--small{gap:4px;height:28px;padding:0 10px;font-size:12px}.magic-button--medium{gap:6px;height:34px;padding:0 16px;font-size:14px}.magic-button--large{gap:8px;height:40px;padding:0 20px;font-size:16px}.magic-button.is-round{border-radius:9999px}.magic-button.is-circle{border-radius:50%;padding:0}.magic-button.is-circle.magic-button--small{width:28px}.magic-button.is-circle.magic-button--medium{width:34px}.magic-button.is-circle.magic-button--large{width:40px}.magic-button--default{background:var(--magic-btn-default-bg,#ffffff14);color:var(--magic-btn-default-color,#e5e9ef);border-color:var(--magic-btn-default-border,#ffffff26)}.magic-button--default:hover:not(.is-disabled){background:var(--magic-btn-default-hover-bg,#ffffff24);border-color:var(--magic-btn-default-hover-border,#ffffff40)}.magic-button--default:active:not(.is-disabled){background:var(--magic-btn-default-active-bg,#fff3)}.magic-button--primary{background:var(--magic-btn-primary-bg,var(--magic-primary-color));color:#fff;border-color:var(--magic-btn-primary-bg,var(--magic-primary-color))}.magic-button--primary:hover:not(.is-disabled){background:var(--magic-btn-primary-hover-bg,var(--magic-primary-hover-color));border-color:var(--magic-btn-primary-hover-bg,var(--magic-primary-hover-color));box-shadow:0 2px 8px var(--magic-primary-shadow)}.magic-button--primary:active:not(.is-disabled){background:var(--magic-btn-primary-active-bg,var(--magic-primary-active-color));border-color:var(--magic-btn-primary-active-bg,var(--magic-primary-active-color))}.magic-button--success{background:var(--magic-btn-success-bg,#2ac864);color:#fff;border-color:var(--magic-btn-success-bg,#2ac864)}.magic-button--success:hover:not(.is-disabled){background:var(--magic-btn-success-hover-bg,#3ad473);border-color:var(--magic-btn-success-hover-bg,#3ad473);box-shadow:0 2px 8px #2ac86459}.magic-button--success:active:not(.is-disabled){background:var(--magic-btn-success-active-bg,#23b056);border-color:var(--magic-btn-success-active-bg,#23b056)}.magic-button--warning{background:var(--magic-btn-warning-bg,#fa9600);color:#fff;border-color:var(--magic-btn-warning-bg,#fa9600)}.magic-button--warning:hover:not(.is-disabled){background:var(--magic-btn-warning-hover-bg,#ffa624);border-color:var(--magic-btn-warning-hover-bg,#ffa624);box-shadow:0 2px 8px #fa960059}.magic-button--warning:active:not(.is-disabled){background:var(--magic-btn-warning-active-bg,#e08700);border-color:var(--magic-btn-warning-active-bg,#e08700)}.magic-button--danger{background:var(--magic-btn-danger-bg,#ff5c7c);color:#fff;border-color:var(--magic-btn-danger-bg,#ff5c7c)}.magic-button--danger:hover:not(.is-disabled){background:var(--magic-btn-danger-hover-bg,#ff738e);border-color:var(--magic-btn-danger-hover-bg,#ff738e);box-shadow:0 2px 8px #ff5c7c59}.magic-button--danger:active:not(.is-disabled){background:var(--magic-btn-danger-active-bg,#e64b69);border-color:var(--magic-btn-danger-active-bg,#e64b69)}.magic-button--text{color:var(--magic-btn-text-color,var(--magic-primary-color));background:0 0;border-color:#0000;padding-left:4px;padding-right:4px}.magic-button--text:hover:not(.is-disabled){background:var(--magic-btn-text-hover-bg,var(--magic-primary-light-bg))}.magic-button--text:active:not(.is-disabled){background:var(--magic-btn-text-active-bg,var(--magic-primary-light-bg))}.magic-button.is-disabled{cursor:not-allowed;opacity:.5;box-shadow:none!important}.magic-button.is-loading{cursor:default;pointer-events:none}.magic-button .magic-button__loading-icon,.magic-button .magic-button__icon{justify-content:center;align-items:center;display:inline-flex}.magic-button .magic-button__content{align-items:center;display:inline-flex}';
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
    static styles = r$2(style_default$1);
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
    static styles = r$2(style_default$2);
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
  if (!customElements.get('magic-modal')) customElements.define('magic-modal', MagicModal);
  var style_default =
    ':host{vertical-align:middle;display:inline-flex}:host([direction=vertical]){display:flex}.magic-radio{cursor:pointer;-webkit-user-select:none;user-select:none;color:var(--magic-radio-text-color,#e5e9ef);align-items:center;font-family:inherit;font-size:14px;line-height:1;transition:opacity .2s;display:inline-flex;position:relative}.magic-radio__input{flex-shrink:0;justify-content:center;align-items:center;display:inline-flex;position:relative}.magic-radio__original{opacity:0;z-index:-1;pointer-events:none;outline:none;margin:0;position:absolute;inset:0}.magic-radio__inner{box-sizing:border-box;border:1.5px solid var(--magic-radio-border-color,#ffffff40);background:var(--magic-radio-bg,#ffffff0d);border-radius:50%;transition:all .2s cubic-bezier(.4,0,.2,1);display:inline-block;position:relative}.magic-radio__inner:after{content:"";background-color:#fff;border-radius:50%;transition:transform .2s cubic-bezier(.175,.885,.32,1.275);position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)scale(0)}.magic-radio__label{align-items:center;line-height:1.2;display:inline-flex}.magic-radio--small{gap:6px;font-size:12px}.magic-radio--small .magic-radio__inner{width:14px;height:14px}.magic-radio--small .magic-radio__inner:after{width:6px;height:6px}.magic-radio--medium{gap:8px;font-size:14px}.magic-radio--medium .magic-radio__inner{width:16px;height:16px}.magic-radio--medium .magic-radio__inner:after{width:7px;height:7px}.magic-radio--large{gap:10px;font-size:16px}.magic-radio--large .magic-radio__inner{width:18px;height:18px}.magic-radio--large .magic-radio__inner:after{width:8px;height:8px}.magic-radio:hover:not(.is-disabled) .magic-radio__inner{border-color:var(--magic-radio-color,var(--magic-primary-color))}.magic-radio.is-checked .magic-radio__inner{border-color:var(--magic-radio-color,var(--magic-primary-color));background-color:var(--magic-radio-color,var(--magic-primary-color))}.magic-radio.is-checked .magic-radio__inner:after{transform:translate(-50%,-50%)scale(1)}.magic-radio.is-disabled{cursor:not-allowed;opacity:var(--magic-radio-disabled-opacity,.5)}.magic-radio.is-disabled .magic-radio__inner{background-color:#ffffff05;border-color:#ffffff26}.magic-radio-group{flex-wrap:wrap;align-items:center;gap:16px;display:inline-flex}.magic-radio-group--vertical{flex-direction:column;align-items:flex-start;gap:10px;display:flex}';
  var MagicRadio = class extends i {
    static properties = {
      value: String,
      name: String,
      label: String,
      checked: {
        type: Boolean,
        reflect: true,
      },
      disabled: {
        type: Boolean,
        reflect: true,
      },
      size: String,
    };
    static styles = r$2(style_default);
    constructor() {
      super();
      this.value = '';
      this.name = '';
      this.label = '';
      this.checked = false;
      this.disabled = false;
      this.size = 'medium';
    }
    handleClick(event) {
      if (this.disabled) {
        event.preventDefault();
        return;
      }
      if (!this.checked) {
        this.checked = true;
        const detail = {
          value: this.value,
          checked: true,
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
    }
    render() {
      return b`
      <label class="${[
        'magic-radio',
        `magic-radio--${this.size || 'medium'}`,
        this.checked ? 'is-checked' : '',
        this.disabled ? 'is-disabled' : '',
      ]
        .filter(Boolean)
        .join(' ')}" @click=${this.handleClick}>
        <span class="magic-radio__input">
          <span class="magic-radio__inner"></span>
          <input
            type="radio"
            class="magic-radio__original"
            .name=${this.name}
            .value=${this.value}
            .checked=${this.checked}
            .disabled=${this.disabled}
            tabindex="-1"
            aria-hidden="true"
          />
        </span>
        <span class="magic-radio__label">
          <slot>${this.label}</slot>
        </span>
      </label>
    `;
    }
  };
  var MagicRadioGroup = class extends i {
    static properties = {
      value: String,
      disabled: {
        type: Boolean,
        reflect: true,
      },
      direction: String,
      size: String,
    };
    static styles = r$2(style_default);
    #cleanupChange = null;
    constructor() {
      super();
      this.value = '';
      this.disabled = false;
      this.direction = 'horizontal';
      this.size = 'medium';
    }
    get radios() {
      const slot = this.shadowRoot?.querySelector('slot');
      if (!slot) return [];
      return slot.assignedElements({ flatten: true }).filter((el) => el.tagName === 'MAGIC-RADIO');
    }
    connectedCallback() {
      super.connectedCallback();
      this.#cleanupChange = on(this, 'change', (event) => this.handleChildChange(event));
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.#cleanupChange?.();
    }
    firstUpdated() {
      this.syncRadios();
    }
    updated(changedProperties) {
      if (
        changedProperties.has('value') ||
        changedProperties.has('disabled') ||
        changedProperties.has('size')
      )
        this.syncRadios();
    }
    handleSlotChange() {
      this.syncRadios();
    }
    handleChildChange(event) {
      if (event.target === this) return;
      const childVal = event.detail?.value ?? event.target.value;
      if (!isNil(childVal) && this.value !== childVal) {
        this.value = childVal;
        this.syncRadios();
        this.dispatchEvent(
          new CustomEvent('change', {
            detail: { value: this.value },
            bubbles: true,
            composed: true,
          }),
        );
      }
    }
    syncRadios() {
      this.radios.forEach((radio) => {
        radio.checked = String(radio.value) === String(this.value);
        radio.disabled = !!this.disabled;
        if (this.size) radio.size = this.size;
      });
    }
    render() {
      return b`
      <div class="${['magic-radio-group', this.direction === 'vertical' ? 'magic-radio-group--vertical' : ''].filter(Boolean).join(' ')}" role="radiogroup">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
    }
  };
  if (!customElements.get('magic-radio')) customElements.define('magic-radio', MagicRadio);
  if (!customElements.get('magic-radio-group'))
    customElements.define('magic-radio-group', MagicRadioGroup);
  var _plugin_vue_export_helper_default = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) target[key] = val;
    return target;
  };
  var _hoisted_1$1 = ['visible'];
  var _hoisted_2$1 = { class: 'settings-container' };
  var _hoisted_3$1 = { class: 'settings-section' };
  var _hoisted_4$1 = { class: 'settings-section__title' };
  var _hoisted_5$1 = { class: 'settings-card' };
  var _hoisted_6$1 = { class: 'settings-item' };
  var _hoisted_7$1 = { class: 'settings-item__action' };
  var _hoisted_8$1 = ['checked'];
  var _hoisted_9$1 = { class: 'settings-item' };
  var _hoisted_10$1 = { class: 'settings-item__action' };
  var _hoisted_11$1 = ['checked'];
  var _hoisted_12$1 = { class: 'settings-item' };
  var _hoisted_13$1 = { class: 'settings-item__action' };
  var _hoisted_14$1 = ['value'];
  var _hoisted_15$1 = ['label', 'value'];
  var _hoisted_16$1 = { class: 'settings-item' };
  var _hoisted_17$1 = { class: 'settings-item__action' };
  var _hoisted_18$1 = ['checked'];
  var _hoisted_19$1 = { class: 'settings-item' };
  var _hoisted_20$1 = { class: 'settings-item__action' };
  var _hoisted_21$1 = { class: 'settings-item' };
  var _hoisted_22$1 = { class: 'settings-item__action' };
  var _hoisted_23$1 = { class: 'settings-section' };
  var _hoisted_24$1 = { class: 'settings-section__title' };
  var _hoisted_25$1 = { class: 'settings-card' };
  var _hoisted_26$1 = { class: 'settings-item' };
  var _hoisted_27$1 = { class: 'settings-item__action' };
  var _hoisted_28$1 = ['checked'];
  var _hoisted_29$1 = { class: 'settings-item' };
  var _hoisted_30$1 = { class: 'settings-item__action' };
  var _hoisted_31$1 = ['checked'];
  var SettingsModal_default = _plugin_vue_export_helper_default(
    {
      __name: 'index',
      props: {
        visible: {
          type: Boolean,
          default: false,
        },
      },
      emits: ['close', 'update:visible'],
      setup(__props, { emit: __emit }) {
        const props = __props;
        const emit = __emit;
        const { settings, updateSettings } = useSettings();
        const formData = (0, vue.ref)({ ...settings });
        const recordingField = (0, vue.ref)('');
        (0, vue.watch)(
          () => props.visible,
          (val) => {
            if (val) {
              formData.value = { ...settings };
              recordingField.value = '';
            }
          },
          { immediate: true },
        );
        const startRecording = (field) => {
          recordingField.value = field;
        };
        const handleRecordKey = (field, event) => {
          if (event.key === 'Escape') {
            recordingField.value = '';
            return;
          }
          const keyString = formatKeyboardKey(event);
          if (!keyString) return;
          formData.value[field] = keyString;
          recordingField.value = '';
          toast.success(`已设置快捷键为: ${keyString}`);
        };
        const handleChange = (key, event) => {
          formData.value[key] = event.detail.value;
        };
        const handleResetDefaults = () => {
          formData.value = { ...DEFAULT_SETTINGS };
          recordingField.value = '';
          toast.info('已恢复为默认设置');
        };
        const handleCancel = () => {
          formData.value = { ...settings };
          recordingField.value = '';
          emit('update:visible', false);
          emit('close');
        };
        const handleConfirm = () => {
          updateSettings(formData.value);
          toast.success('设置保存成功');
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
                  title: '设置',
                  width: '640px',
                  onCancel: handleCancel,
                  onClose: handleCancel,
                  onConfirm: handleConfirm,
                },
                [
                  (0, vue.createElementVNode)('div', _hoisted_2$1, [
                    (0, vue.createElementVNode)('div', _hoisted_3$1, [
                      (0, vue.createElementVNode)('div', _hoisted_4$1, [
                        (0, vue.createVNode)((0, vue.unref)(_sfc_main$2), {
                          class: 'section-icon',
                          name: 'play',
                        }),
                        _cache[10] ||
                          (_cache[10] = (0, vue.createElementVNode)('span', null, '自动切集', -1)),
                      ]),
                      (0, vue.createElementVNode)('div', _hoisted_5$1, [
                        (0, vue.createElementVNode)('div', _hoisted_6$1, [
                          _cache[11] ||
                            (_cache[11] = (0, vue.createElementVNode)(
                              'div',
                              { class: 'settings-item__info' },
                              [
                                (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__title' },
                                  '自动连播下一个视频',
                                ),
                                (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__desc' },
                                  '当前视频或分 P 播放完毕后，自动连播下一个视频',
                                ),
                              ],
                              -1,
                            )),
                          (0, vue.createElementVNode)('div', _hoisted_7$1, [
                            (0, vue.createElementVNode)(
                              'magic-switch',
                              {
                                checked: (0, vue.unref)(formData).autoPlayNext,
                                size: 'small',
                                onChange:
                                  _cache[0] || (_cache[0] = (e) => handleChange('autoPlayNext', e)),
                              },
                              null,
                              40,
                              _hoisted_8$1,
                            ),
                          ]),
                        ]),
                        (0, vue.createElementVNode)('div', _hoisted_9$1, [
                          _cache[12] ||
                            (_cache[12] = (0, vue.createElementVNode)(
                              'div',
                              { class: 'settings-item__info' },
                              [
                                (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__title' },
                                  '随机播放模式',
                                ),
                                (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__desc' },
                                  ' 切集与自动连播时随机抽取未播放视频播放（音乐爱好者） ',
                                ),
                              ],
                              -1,
                            )),
                          (0, vue.createElementVNode)('div', _hoisted_10$1, [
                            (0, vue.createElementVNode)(
                              'magic-switch',
                              {
                                checked: (0, vue.unref)(formData).shuffle,
                                size: 'small',
                                onChange:
                                  _cache[1] || (_cache[1] = (e) => handleChange('shuffle', e)),
                              },
                              null,
                              40,
                              _hoisted_11$1,
                            ),
                          ]),
                        ]),
                        (0, vue.createElementVNode)('div', _hoisted_12$1, [
                          _cache[13] ||
                            (_cache[13] = (0, vue.createElementVNode)(
                              'div',
                              { class: 'settings-item__info' },
                              [
                                (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__title' },
                                  '随机播放范围',
                                ),
                                (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__desc' },
                                  '选择随机抽取的视频范围',
                                ),
                              ],
                              -1,
                            )),
                          (0, vue.createElementVNode)('div', _hoisted_13$1, [
                            (0, vue.createElementVNode)(
                              'magic-radio-group',
                              {
                                value: (0, vue.unref)(formData).shuffleScope,
                                size: 'small',
                                onChange:
                                  _cache[2] || (_cache[2] = (e) => handleChange('shuffleScope', e)),
                              },
                              [
                                ((0, vue.openBlock)(true),
                                (0, vue.createElementBlock)(
                                  vue.Fragment,
                                  null,
                                  (0, vue.renderList)(
                                    (0, vue.unref)(SHUFFLE_SCOPE_OPTIONS),
                                    (opt) => {
                                      return (
                                        (0, vue.openBlock)(),
                                        (0, vue.createElementBlock)(
                                          'magic-radio',
                                          {
                                            key: opt.value,
                                            label: opt.label,
                                            value: opt.value,
                                          },
                                          null,
                                          8,
                                          _hoisted_15$1,
                                        )
                                      );
                                    },
                                  ),
                                  128,
                                )),
                              ],
                              40,
                              _hoisted_14$1,
                            ),
                          ]),
                        ]),
                        (0, vue.createElementVNode)('div', _hoisted_16$1, [
                          _cache[14] ||
                            (_cache[14] = (0, vue.createElementVNode)(
                              'div',
                              { class: 'settings-item__info' },
                              [
                                (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__title' },
                                  '当前视频分 P 播完即停止',
                                ),
                                (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__desc' },
                                  ' 多 P 视频播完最后一个分 P 后，停止连播至合集的下一个视频 ',
                                ),
                              ],
                              -1,
                            )),
                          (0, vue.createElementVNode)('div', _hoisted_17$1, [
                            (0, vue.createElementVNode)(
                              'magic-switch',
                              {
                                checked: (0, vue.unref)(formData).stopOnGroupEnd,
                                size: 'small',
                                onChange:
                                  _cache[3] ||
                                  (_cache[3] = (e) => handleChange('stopOnGroupEnd', e)),
                              },
                              null,
                              40,
                              _hoisted_18$1,
                            ),
                          ]),
                        ]),
                        (0, vue.createElementVNode)('div', _hoisted_19$1, [
                          _cache[15] ||
                            (_cache[15] = (0, vue.createElementVNode)(
                              'div',
                              { class: 'settings-item__info' },
                              [
                                (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__title' },
                                  '上一集快捷键',
                                ),
                                (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__desc' },
                                  '点击按键录制自定义键位',
                                ),
                              ],
                              -1,
                            )),
                          (0, vue.createElementVNode)('div', _hoisted_20$1, [
                            (0, vue.createElementVNode)(
                              'button',
                              {
                                class: (0, vue.normalizeClass)([
                                  {
                                    'is-recording': (0, vue.unref)(recordingField) === 'hotkeyPrev',
                                  },
                                  'hotkey-badge',
                                ]),
                                type: 'button',
                                onClick:
                                  _cache[4] ||
                                  (_cache[4] = ($event) => startRecording('hotkeyPrev')),
                                onKeydown:
                                  _cache[5] ||
                                  (_cache[5] = (0, vue.withModifiers)(
                                    (e) => handleRecordKey('hotkeyPrev', e),
                                    ['stop', 'prevent'],
                                  )),
                              },
                              (0, vue.toDisplayString)(
                                (0, vue.unref)(recordingField) === 'hotkeyPrev'
                                  ? '请按按键...'
                                  : (0, vue.unref)(formData).hotkeyPrev || '未设置',
                              ),
                              35,
                            ),
                          ]),
                        ]),
                        (0, vue.createElementVNode)('div', _hoisted_21$1, [
                          _cache[16] ||
                            (_cache[16] = (0, vue.createElementVNode)(
                              'div',
                              { class: 'settings-item__info' },
                              [
                                (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__title' },
                                  '下一集快捷键',
                                ),
                                (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__desc' },
                                  '点击按键录制自定义键位',
                                ),
                              ],
                              -1,
                            )),
                          (0, vue.createElementVNode)('div', _hoisted_22$1, [
                            (0, vue.createElementVNode)(
                              'button',
                              {
                                class: (0, vue.normalizeClass)([
                                  {
                                    'is-recording': (0, vue.unref)(recordingField) === 'hotkeyNext',
                                  },
                                  'hotkey-badge',
                                ]),
                                type: 'button',
                                onClick:
                                  _cache[6] ||
                                  (_cache[6] = ($event) => startRecording('hotkeyNext')),
                                onKeydown:
                                  _cache[7] ||
                                  (_cache[7] = (0, vue.withModifiers)(
                                    (e) => handleRecordKey('hotkeyNext', e),
                                    ['stop', 'prevent'],
                                  )),
                              },
                              (0, vue.toDisplayString)(
                                (0, vue.unref)(recordingField) === 'hotkeyNext'
                                  ? '请按按键...'
                                  : (0, vue.unref)(formData).hotkeyNext || '未设置',
                              ),
                              35,
                            ),
                          ]),
                        ]),
                      ]),
                    ]),
                    (0, vue.createElementVNode)('div', _hoisted_23$1, [
                      (0, vue.createElementVNode)('div', _hoisted_24$1, [
                        (0, vue.createVNode)((0, vue.unref)(_sfc_main$2), {
                          class: 'section-icon',
                          name: 'list',
                        }),
                        _cache[17] ||
                          (_cache[17] = (0, vue.createElementVNode)('span', null, '界面交互', -1)),
                      ]),
                      (0, vue.createElementVNode)('div', _hoisted_25$1, [
                        (0, vue.createElementVNode)('div', _hoisted_26$1, [
                          _cache[18] ||
                            (_cache[18] = (0, vue.createElementVNode)(
                              'div',
                              { class: 'settings-item__info' },
                              [
                                (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__title' },
                                  '切集自动定位高亮位置',
                                ),
                                (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__desc' },
                                  ' 手动点击切集时，自动平滑滚动列表并将当前播放项居中 ',
                                ),
                              ],
                              -1,
                            )),
                          (0, vue.createElementVNode)('div', _hoisted_27$1, [
                            (0, vue.createElementVNode)(
                              'magic-switch',
                              {
                                checked: (0, vue.unref)(formData).scrollActiveOnClick,
                                size: 'small',
                                onChange:
                                  _cache[8] ||
                                  (_cache[8] = (e) => handleChange('scrollActiveOnClick', e)),
                              },
                              null,
                              40,
                              _hoisted_28$1,
                            ),
                          ]),
                        ]),
                        (0, vue.createElementVNode)('div', _hoisted_29$1, [
                          _cache[19] ||
                            (_cache[19] = (0, vue.createElementVNode)(
                              'div',
                              { class: 'settings-item__info' },
                              [
                                (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__title' },
                                  '排序切换自动定位高亮位置',
                                ),
                                (0, vue.createElementVNode)(
                                  'div',
                                  { class: 'settings-item__desc' },
                                  ' 切换排序方式时自动定位到当前播放项；关闭时自动回到顶部 ',
                                ),
                              ],
                              -1,
                            )),
                          (0, vue.createElementVNode)('div', _hoisted_30$1, [
                            (0, vue.createElementVNode)(
                              'magic-switch',
                              {
                                checked: (0, vue.unref)(formData).scrollToActiveOnSort,
                                size: 'small',
                                onChange:
                                  _cache[9] ||
                                  (_cache[9] = (e) => handleChange('scrollToActiveOnSort', e)),
                              },
                              null,
                              40,
                              _hoisted_31$1,
                            ),
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
                        ' 恢复默认设置 ',
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
                _hoisted_1$1,
              ),
            ])
          );
        };
      },
    },
    [['__scopeId', 'data-v-e52d7f12']],
  );
  var _hoisted_1 = { class: 'tk-reaction-header' };
  var _hoisted_2 = { class: 'header-left' };
  var _hoisted_3 = ['options', 'value'];
  var _hoisted_4 = ['checked'];
  var _hoisted_5 = { class: 'header-right' };
  var _hoisted_6 = ['title'];
  var _hoisted_7 = ['value'];
  var _hoisted_8 = {
    key: 0,
    slot: 'suffix',
    class: 'match-badge',
  };
  var _hoisted_9 = {
    key: 0,
    class: 'loading-state',
  };
  var _hoisted_10 = {
    key: 1,
    class: 'empty-state',
  };
  var _hoisted_11 = { class: 'empty-text' };
  var _hoisted_12 = {
    key: 2,
    class: 'list',
  };
  var _hoisted_13 = ['data-bvid'];
  var _hoisted_14 = ['data-bvid', 'data-page', 'onClick'];
  var _hoisted_15 = { class: 'mode-list' };
  var _hoisted_16 = { class: 'title' };
  var _hoisted_17 = ['title'];
  var _hoisted_18 = { class: 'actions' };
  var _hoisted_19 = ['onClick'];
  var _hoisted_20 = {
    key: 1,
    class: 'expand-duration',
  };
  var _hoisted_21 = { class: 'mode-card' };
  var _hoisted_22 = { class: 'cover' };
  var _hoisted_23 = ['alt', 'src'];
  var _hoisted_24 = { class: 'info' };
  var _hoisted_25 = { class: 'title' };
  var _hoisted_26 = ['title'];
  var _hoisted_27 = { class: 'stats' };
  var _hoisted_28 = { class: 'stat-item views' };
  var _hoisted_29 = { class: 'count-text views-text' };
  var _hoisted_30 = { class: 'stat-item danmaku' };
  var _hoisted_31 = { class: 'count-text danmaku-text' };
  var _hoisted_32 = { class: 'stat-item pubdate' };
  var _hoisted_33 = ['title'];
  var _hoisted_34 = ['onClick'];
  var _hoisted_35 = {
    key: 0,
    class: 'episodes',
  };
  var _hoisted_36 = ['onClick'];
  var _hoisted_37 = { class: 'episode-title' };
  var _hoisted_38 = ['title'];
  var _hoisted_39 = { class: 'episode-meta' };
  var _hoisted_40 = { class: 'episode-duration' };
  var App_default = _plugin_vue_export_helper_default(
    {
      __name: 'App',
      setup(__props, { expose: __expose }) {
        const {
          isAnimating,
          isLoading,
          podType,
          rootRef,
          scrollContainerRef,
          podMode,
          groups,
          containerStyle,
          videoBodyStyle,
          isExpanded,
          toggleAccordion,
          handleHeaderClick,
          switchActiveVideo,
          toggleShuffle,
          loadPod,
        } = useVideoPod();
        const {
          keyword,
          isSearchOpen,
          searchInputRef,
          filteredGroups,
          matchCount,
          hasSearchQuery,
          closeSearch,
          clearKeyword,
          toggleSearch,
        } = usePodSearch(groups);
        const { settings } = useSettings();
        const isSettingsOpen = (0, vue.ref)(false);
        const handleKeywordInput = (event) => {
          keyword.value = event.detail?.value ?? event.target?.value ?? '';
        };
        const shuffleTooltip = (0, vue.computed)(() => {
          if (!settings.shuffle) return '随机播放 (已关闭)';
          return settings.shuffleScope === SHUFFLE_SCOPE.GROUP
            ? '随机播放 (仅当前分组)'
            : '随机播放 (全合集)';
        });
        const handleShuffleClick = () => {
          const nextVal = toggleShuffle();
          const scopeText = settings.shuffleScope === SHUFFLE_SCOPE.GROUP ? '仅当前分组' : '全合集';
          toast.success(nextVal ? `已开启随机播放 (${scopeText})` : '已关闭随机播放');
        };
        const handleAutoPlayChange = (event) => {
          const nextVal = event.detail.value;
          settings.autoPlayNext = nextVal;
          toast.success(nextVal ? '已开启自动切集' : '已关闭自动切集');
        };
        const handleSortChange = (event) => {
          settings.sortMode = event.detail.value;
        };
        const handleOpenSettings = () => {
          isSettingsOpen.value = true;
        };
        (0, vue.onMounted)(() => {
          initSettings();
        });
        __expose({ loadPod });
        return (_ctx, _cache) => {
          return (0, vue.unref)(groups).length > 0
            ? ((0, vue.openBlock)(),
              (0, vue.createElementBlock)(
                'div',
                {
                  key: 0,
                  ref_key: 'rootRef',
                  ref: rootRef,
                  class: (0, vue.normalizeClass)([
                    {
                      'is-card-mode': (0, vue.unref)(podMode) === (0, vue.unref)(POD_MODE).CARD,
                      'is-animating': (0, vue.unref)(isAnimating),
                    },
                    'tk-reaction',
                  ]),
                  style: (0, vue.normalizeStyle)((0, vue.unref)(containerStyle)),
                },
                [
                  (0, vue.createElementVNode)('div', _hoisted_1, [
                    (0, vue.createElementVNode)('div', _hoisted_2, [
                      (0, vue.unref)(podType) !== (0, vue.unref)(POD_TYPE).EPISODE
                        ? ((0, vue.openBlock)(),
                          (0, vue.createElementBlock)(
                            'magic-select',
                            {
                              key: 0,
                              options: (0, vue.unref)(SORT_OPTIONS),
                              value: (0, vue.unref)(settings).sortMode,
                              class: 'sort-select',
                              size: 'small',
                              onChange: handleSortChange,
                            },
                            null,
                            40,
                            _hoisted_3,
                          ))
                        : (0, vue.createCommentVNode)('', true),
                      (0, vue.createElementVNode)(
                        'magic-switch',
                        {
                          checked: (0, vue.unref)(settings).autoPlayNext,
                          'active-text': '自动切集',
                          size: 'small',
                          onChange: handleAutoPlayChange,
                        },
                        null,
                        40,
                        _hoisted_4,
                      ),
                    ]),
                    (0, vue.createElementVNode)('div', _hoisted_5, [
                      (0, vue.createElementVNode)(
                        'div',
                        {
                          class: (0, vue.normalizeClass)([
                            { 'is-active': (0, vue.unref)(settings).shuffle },
                            'shuffle-btn',
                          ]),
                          title: (0, vue.unref)(shuffleTooltip),
                          onClick: (0, vue.withModifiers)(handleShuffleClick, ['stop']),
                        },
                        [(0, vue.createVNode)((0, vue.unref)(_sfc_main$2), { name: 'shuffle' })],
                        10,
                        _hoisted_6,
                      ),
                      (0, vue.createElementVNode)(
                        'div',
                        {
                          class: (0, vue.normalizeClass)([
                            { 'is-active': (0, vue.unref)(isSearchOpen) },
                            'search-btn',
                          ]),
                          title: '搜索视频',
                          onClick:
                            _cache[0] ||
                            (_cache[0] = (0, vue.withModifiers)(
                              (...args) =>
                                (0, vue.unref)(toggleSearch) &&
                                (0, vue.unref)(toggleSearch)(...args),
                              ['stop'],
                            )),
                        },
                        [(0, vue.createVNode)((0, vue.unref)(_sfc_main$2), { name: 'search' })],
                        2,
                      ),
                      (0, vue.createElementVNode)(
                        'div',
                        {
                          class: 'settings-btn',
                          title: '设置',
                          onClick: (0, vue.withModifiers)(handleOpenSettings, ['stop']),
                        },
                        [(0, vue.createVNode)((0, vue.unref)(_sfc_main$2), { name: 'settings' })],
                      ),
                    ]),
                  ]),
                  (0, vue.withDirectives)(
                    (0, vue.createElementVNode)(
                      'div',
                      {
                        class: 'tk-reaction-search',
                        onKeydown:
                          _cache[3] || (_cache[3] = (0, vue.withModifiers)(() => {}, ['stop'])),
                        onKeyup:
                          _cache[4] || (_cache[4] = (0, vue.withModifiers)(() => {}, ['stop'])),
                      },
                      [
                        (0, vue.createElementVNode)(
                          'magic-input',
                          {
                            ref_key: 'searchInputRef',
                            ref: searchInputRef,
                            maxlength: 50,
                            value: (0, vue.unref)(keyword),
                            block: '',
                            class: 'search-input',
                            clearable: '',
                            placeholder: '搜索视频的标题',
                            size: 'small',
                            onClear:
                              _cache[1] ||
                              (_cache[1] = (...args) =>
                                (0, vue.unref)(clearKeyword) &&
                                (0, vue.unref)(clearKeyword)(...args)),
                            onInput: handleKeywordInput,
                            onKeydown:
                              _cache[2] ||
                              (_cache[2] = (0, vue.withKeys)(
                                (0, vue.withModifiers)(
                                  (...args) =>
                                    (0, vue.unref)(closeSearch) &&
                                    (0, vue.unref)(closeSearch)(...args),
                                  ['stop'],
                                ),
                                ['esc'],
                              )),
                          },
                          [
                            (0, vue.createVNode)((0, vue.unref)(_sfc_main$2), {
                              slot: 'prefix',
                              class: 'search-prefix-icon',
                              name: 'search',
                            }),
                            (0, vue.unref)(hasSearchQuery)
                              ? ((0, vue.openBlock)(),
                                (0, vue.createElementBlock)(
                                  'span',
                                  _hoisted_8,
                                  (0, vue.toDisplayString)(
                                    (0, vue.unref)(matchCount) > 0
                                      ? `${(0, vue.unref)(matchCount)} 个结果`
                                      : '无结果',
                                  ),
                                  1,
                                ))
                              : (0, vue.createCommentVNode)('', true),
                          ],
                          40,
                          _hoisted_7,
                        ),
                      ],
                      544,
                    ),
                    [[vue.vShow, (0, vue.unref)(isSearchOpen)]],
                  ),
                  (0, vue.createElementVNode)(
                    'div',
                    {
                      ref_key: 'scrollContainerRef',
                      ref: scrollContainerRef,
                      class: (0, vue.normalizeClass)([
                        { 'is-loading': (0, vue.unref)(isLoading) },
                        'tk-reaction-video',
                      ]),
                      style: (0, vue.normalizeStyle)((0, vue.unref)(videoBodyStyle)),
                    },
                    [
                      (0, vue.unref)(isLoading)
                        ? ((0, vue.openBlock)(),
                          (0, vue.createElementBlock)('div', _hoisted_9, [
                            ...(_cache[6] ||
                              (_cache[6] = [
                                (0, vue.createElementVNode)(
                                  'magic-spinner',
                                  {
                                    size: '28',
                                    text: '加载中...',
                                  },
                                  null,
                                  -1,
                                ),
                              ])),
                          ]))
                        : (0, vue.unref)(filteredGroups).length === 0
                          ? ((0, vue.openBlock)(),
                            (0, vue.createElementBlock)('div', _hoisted_10, [
                              (0, vue.createElementVNode)(
                                'div',
                                _hoisted_11,
                                '未找到与“' +
                                  (0, vue.toDisplayString)((0, vue.unref)(keyword)) +
                                  '”相关的视频',
                                1,
                              ),
                            ]))
                          : ((0, vue.openBlock)(),
                            (0, vue.createElementBlock)('div', _hoisted_12, [
                              ((0, vue.openBlock)(true),
                              (0, vue.createElementBlock)(
                                vue.Fragment,
                                null,
                                (0, vue.renderList)(
                                  (0, vue.unref)(filteredGroups),
                                  (group, gIdx) => {
                                    return (
                                      (0, vue.openBlock)(),
                                      (0, vue.createElementBlock)(
                                        'div',
                                        {
                                          key: group.cid || `${group.bvid}_${group.page ?? gIdx}`,
                                          'data-bvid': group.bvid,
                                          class: 'item',
                                        },
                                        [
                                          (0, vue.createElementVNode)(
                                            'div',
                                            {
                                              class: (0, vue.normalizeClass)([
                                                { 'is-active': group.isActive },
                                                'header',
                                              ]),
                                              'data-bvid': group.bvid,
                                              'data-page': group.page,
                                              onClick: ($event) =>
                                                (0, vue.unref)(handleHeaderClick)(group),
                                            },
                                            [
                                              (0, vue.createElementVNode)('div', _hoisted_15, [
                                                (0, vue.createElementVNode)('div', _hoisted_16, [
                                                  _cache[7] ||
                                                    (_cache[7] = (0, vue.createElementVNode)(
                                                      'div',
                                                      { class: 'playing-gif' },
                                                      null,
                                                      -1,
                                                    )),
                                                  (0, vue.createElementVNode)(
                                                    'div',
                                                    {
                                                      title: group.title,
                                                      class: 'title-text',
                                                    },
                                                    (0, vue.toDisplayString)(group.title),
                                                    9,
                                                    _hoisted_17,
                                                  ),
                                                ]),
                                                (0, vue.createElementVNode)('div', _hoisted_18, [
                                                  group.isMultiPage
                                                    ? ((0, vue.openBlock)(),
                                                      (0, vue.createElementBlock)(
                                                        'div',
                                                        {
                                                          key: 0,
                                                          class: (0, vue.normalizeClass)([
                                                            {
                                                              'is-expanded':
                                                                (0, vue.unref)(isExpanded)(
                                                                  group.bvid,
                                                                ) ||
                                                                ((0, vue.unref)(hasSearchQuery) &&
                                                                  group.isAutoExpanded),
                                                            },
                                                            'expand',
                                                          ]),
                                                          onClick: (0, vue.withModifiers)(
                                                            ($event) =>
                                                              (0, vue.unref)(toggleAccordion)(
                                                                group.bvid,
                                                              ),
                                                            ['stop'],
                                                          ),
                                                        },
                                                        [
                                                          (0, vue.createVNode)(
                                                            (0, vue.unref)(_sfc_main$2),
                                                            { name: 'expand' },
                                                          ),
                                                        ],
                                                        10,
                                                        _hoisted_19,
                                                      ))
                                                    : group.episodes?.[0]?.duration
                                                      ? ((0, vue.openBlock)(),
                                                        (0, vue.createElementBlock)(
                                                          'div',
                                                          _hoisted_20,
                                                          (0, vue.toDisplayString)(
                                                            group.episodes[0].duration,
                                                          ),
                                                          1,
                                                        ))
                                                      : (0, vue.createCommentVNode)('', true),
                                                ]),
                                              ]),
                                              (0, vue.createElementVNode)('div', _hoisted_21, [
                                                (0, vue.createElementVNode)('div', _hoisted_22, [
                                                  (0, vue.createElementVNode)(
                                                    'img',
                                                    {
                                                      alt: group.title,
                                                      src: group.cover,
                                                      class: 'cover-img',
                                                      loading: 'lazy',
                                                    },
                                                    null,
                                                    8,
                                                    _hoisted_23,
                                                  ),
                                                ]),
                                                (0, vue.createElementVNode)('div', _hoisted_24, [
                                                  (0, vue.createElementVNode)('div', _hoisted_25, [
                                                    _cache[8] ||
                                                      (_cache[8] = (0, vue.createElementVNode)(
                                                        'div',
                                                        { class: 'playing-gif' },
                                                        null,
                                                        -1,
                                                      )),
                                                    (0, vue.createElementVNode)(
                                                      'div',
                                                      {
                                                        title: group.title,
                                                        class: 'title-text',
                                                      },
                                                      (0, vue.toDisplayString)(group.title),
                                                      9,
                                                      _hoisted_26,
                                                    ),
                                                  ]),
                                                  (0, vue.createElementVNode)('div', _hoisted_27, [
                                                    (0, vue.createElementVNode)(
                                                      'div',
                                                      _hoisted_28,
                                                      [
                                                        (0, vue.createVNode)(
                                                          (0, vue.unref)(_sfc_main$2),
                                                          { name: 'views' },
                                                        ),
                                                        (0, vue.createElementVNode)(
                                                          'span',
                                                          _hoisted_29,
                                                          (0, vue.toDisplayString)(group.views),
                                                          1,
                                                        ),
                                                      ],
                                                    ),
                                                    (0, vue.createElementVNode)(
                                                      'div',
                                                      _hoisted_30,
                                                      [
                                                        (0, vue.createVNode)(
                                                          (0, vue.unref)(_sfc_main$2),
                                                          { name: 'danmaku' },
                                                        ),
                                                        (0, vue.createElementVNode)(
                                                          'span',
                                                          _hoisted_31,
                                                          (0, vue.toDisplayString)(group.danmakus),
                                                          1,
                                                        ),
                                                      ],
                                                    ),
                                                    (0, vue.createElementVNode)(
                                                      'div',
                                                      _hoisted_32,
                                                      [
                                                        (0, vue.createVNode)(
                                                          (0, vue.unref)(_sfc_main$2),
                                                          { name: 'pubdate' },
                                                        ),
                                                        (0, vue.createElementVNode)(
                                                          'span',
                                                          {
                                                            title: group.pubdate,
                                                            class: 'count-text pubdate-text',
                                                          },
                                                          (0, vue.toDisplayString)(group.pubdate),
                                                          9,
                                                          _hoisted_33,
                                                        ),
                                                      ],
                                                    ),
                                                    group.isMultiPage
                                                      ? ((0, vue.openBlock)(),
                                                        (0, vue.createElementBlock)(
                                                          'div',
                                                          {
                                                            key: 0,
                                                            class: (0, vue.normalizeClass)([
                                                              {
                                                                'is-expanded':
                                                                  (0, vue.unref)(isExpanded)(
                                                                    group.bvid,
                                                                  ) ||
                                                                  ((0, vue.unref)(hasSearchQuery) &&
                                                                    group.isAutoExpanded),
                                                              },
                                                              'stat-item expand-btn expand',
                                                            ]),
                                                            onClick: (0, vue.withModifiers)(
                                                              ($event) =>
                                                                (0, vue.unref)(toggleAccordion)(
                                                                  group.bvid,
                                                                ),
                                                              ['stop'],
                                                            ),
                                                          },
                                                          [
                                                            (0, vue.createVNode)(
                                                              (0, vue.unref)(_sfc_main$2),
                                                              { name: 'expand' },
                                                            ),
                                                          ],
                                                          10,
                                                          _hoisted_34,
                                                        ))
                                                      : (0, vue.createCommentVNode)('', true),
                                                  ]),
                                                ]),
                                              ]),
                                            ],
                                            10,
                                            _hoisted_14,
                                          ),
                                          group.isMultiPage
                                            ? (0, vue.withDirectives)(
                                                ((0, vue.openBlock)(),
                                                (0, vue.createElementBlock)(
                                                  'div',
                                                  _hoisted_35,
                                                  [
                                                    ((0, vue.openBlock)(true),
                                                    (0, vue.createElementBlock)(
                                                      vue.Fragment,
                                                      null,
                                                      (0, vue.renderList)(
                                                        group.episodes,
                                                        (ep, index) => {
                                                          return (
                                                            (0, vue.openBlock)(),
                                                            (0, vue.createElementBlock)(
                                                              'div',
                                                              {
                                                                key:
                                                                  ep.cid ||
                                                                  `${group.bvid}_${ep.page || index}`,
                                                                class: (0, vue.normalizeClass)([
                                                                  { 'is-active': ep.isActive },
                                                                  'episode',
                                                                ]),
                                                                onClick: (0, vue.withModifiers)(
                                                                  ($event) =>
                                                                    (0, vue.unref)(
                                                                      switchActiveVideo,
                                                                    )(
                                                                      (0, vue.unref)(podType),
                                                                      group,
                                                                      index,
                                                                    ),
                                                                  ['stop'],
                                                                ),
                                                              },
                                                              [
                                                                (0, vue.createElementVNode)(
                                                                  'div',
                                                                  _hoisted_37,
                                                                  [
                                                                    _cache[9] ||
                                                                      (_cache[9] = (0,
                                                                      vue.createElementVNode)(
                                                                        'div',
                                                                        { class: 'playing-gif' },
                                                                        null,
                                                                        -1,
                                                                      )),
                                                                    (0, vue.createElementVNode)(
                                                                      'div',
                                                                      {
                                                                        title: ep.title,
                                                                        class: 'title-txt',
                                                                      },
                                                                      (0, vue.toDisplayString)(
                                                                        ep.title,
                                                                      ),
                                                                      9,
                                                                      _hoisted_38,
                                                                    ),
                                                                  ],
                                                                ),
                                                                (0, vue.createElementVNode)(
                                                                  'div',
                                                                  _hoisted_39,
                                                                  [
                                                                    (0, vue.createElementVNode)(
                                                                      'span',
                                                                      _hoisted_40,
                                                                      (0, vue.toDisplayString)(
                                                                        ep.duration,
                                                                      ),
                                                                      1,
                                                                    ),
                                                                  ],
                                                                ),
                                                              ],
                                                              10,
                                                              _hoisted_36,
                                                            )
                                                          );
                                                        },
                                                      ),
                                                      128,
                                                    )),
                                                  ],
                                                  512,
                                                )),
                                                [
                                                  [
                                                    vue.vShow,
                                                    (0, vue.unref)(isExpanded)(group.bvid) ||
                                                      ((0, vue.unref)(hasSearchQuery) &&
                                                        group.isAutoExpanded),
                                                  ],
                                                ],
                                              )
                                            : (0, vue.createCommentVNode)('', true),
                                        ],
                                        8,
                                        _hoisted_13,
                                      )
                                    );
                                  },
                                ),
                                128,
                              )),
                            ])),
                    ],
                    6,
                  ),
                  (0, vue.createVNode)(
                    (0, vue.unref)(SettingsModal_default),
                    {
                      visible: (0, vue.unref)(isSettingsOpen),
                      onClose:
                        _cache[5] || (_cache[5] = ($event) => (isSettingsOpen.value = false)),
                    },
                    null,
                    8,
                    ['visible'],
                  ),
                ],
                6,
              ))
            : (0, vue.createCommentVNode)('', true);
        };
      },
    },
    [['__scopeId', 'data-v-81fdaee1']],
  );
  function isWatchLaterRoute() {
    return window.location.pathname.startsWith('/list/watchlater');
  }
  function observeUrlChange(onChange) {
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
  function injectNativeHidingStyles() {
    GM_addStyle(`
    .view-mode,
    #slide_ad,
    .bpx-player-ctrl-setting-handoff {
      display: none !important;
    }
    .list-playorder-btn.list-tool-btn,
    #playlist-video-action-list,
    .action-list-item-wrap,
    .video-pod__body {
      overflow: hidden !important;
    }
    .action-list-item-wrap,
    .video-pod__body .pod-item {
      visibility: hidden !important;
    }
  `);
  }
  var appInstance = null;
  async function bootstrap() {
    if (isWatchLaterRoute()) return;
    injectNativeHidingStyles();
    const body = await waitElement('body');
    let mountNode = document.getElementById('bilibili-playlist-enhancer-app');
    if (!mountNode) {
      mountNode = document.createElement('div');
      mountNode.id = 'bilibili-playlist-enhancer-app';
      body.appendChild(mountNode);
    }
    if (appInstance) appInstance.unmount();
    appInstance = (0, vue.createApp)(App_default);
    const vm = appInstance.mount(mountNode);
    observeUrlChange(() => {
      vm.loadPod();
    });
  }
  bootstrap();
})(Vue);
