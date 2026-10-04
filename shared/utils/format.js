import { isDate, isNil, isNumber, isString } from './types.js';

const pad2 = (n) => String(n).padStart(2, '0');
const DATE_FORMAT_REGEX = /\[([^\]]+)]|YYYY|YY|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|SSS|A|a/g;

const UNITS_MAP = {
  zh: [
    { value: 1e8, suffix: '亿' },
    { value: 1e4, suffix: '万' },
  ],
  en: [
    { value: 1e9, suffix: 'B' },
    { value: 1e6, suffix: 'M' },
    { value: 1e3, suffix: 'K' },
  ],
};

/**
 * 格式化秒数为时间字符串 (例如: 03:25 或 01:12:45)
 * @param {number|string} sec - 秒数
 * @returns {string}
 */
export function formatDuration(sec = 0) {
  const total = Math.max(0, Math.floor(Number(sec) || 0));
  const h = Math.floor(total / 3600);
  const m = pad2(Math.floor((total % 3600) / 60));
  const s = pad2(total % 60);

  if (h > 0) {
    return `${pad2(h)}:${m}:${s}`;
  }
  return `${m}:${s}`;
}

/**
 * 格式化数值字符串并可选去除无意义的末尾零
 * @param {number} num
 * @param {number} precision
 * @param {boolean} trimZero
 * @returns {string}
 */
function formatNumberString(num, precision, trimZero) {
  const fixed = num.toFixed(precision);
  if (!trimZero) return fixed;
  return fixed.replace(/\.?0+$/, '');
}

/**
 * 为数值字符串添加千分位逗号
 * @param {string} numStr
 * @returns {string}
 */
function addCommas(numStr) {
  const [integer, decimal] = numStr.split('.');
  const formattedInt = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decimal !== undefined ? `${formattedInt}.${decimal}` : formattedInt;
}

/**
 * 根据阶梯单位表进行缩写格式化
 * @param {number} absVal
 * @param {number} precision
 * @param {boolean} trimZero
 * @param {'zh'|'en'} unitType
 * @returns {string|null}
 */
function formatWithScale(absVal, precision, trimZero, unitType) {
  const scales = UNITS_MAP[unitType] || [];
  for (const scale of scales) {
    if (absVal >= scale.value) {
      const scaledVal = absVal / scale.value;
      return `${formatNumberString(scaledVal, precision, trimZero)}${scale.suffix}`;
    }
  }
  return null;
}

/**
 * 格式化大数值为简明计数文本 (支持中英文单位缩写、千分位及精度控制)
 * @param {number|string} num - 原始计数值
 * @param {object} [options] - 格式化配置
 * @param {number} [options.precision=1] - 保留小数位数
 * @param {boolean} [options.trimZero=true] - 是否自动去除末尾无意义的 0 (例如 1.0万 -> 1万)
 * @param {'zh'|'en'|'none'} [options.unit='zh'] - 单位制
 * @param {boolean} [options.comma=false] - 是否使用千分位逗号
 * @param {string} [options.fallback='0'] - 空值/非法值回退文本
 * @returns {string}
 * @example
 * formatCount(10000) // "1万"
 * formatCount(1234567) // "123.5万"
 * formatCount(1500, { unit: 'en' }) // "1.5K"
 * formatCount(1234567, { unit: 'none', comma: true }) // "1,234,567"
 */
export function formatCount(num, options = {}) {
  const { precision = 1, trimZero = true, unit = 'zh', comma = false, fallback = '0' } = options;

  if (isNil(num) || num === '') return fallback;
  const val = Number(num);
  if (Number.isNaN(val)) return fallback;
  if (val === 0) return '0';

  const sign = val < 0 ? '-' : '';
  const absVal = Math.abs(val);

  if (unit !== 'none') {
    const scaledResult = formatWithScale(absVal, precision, trimZero, unit);
    if (scaledResult) {
      return `${sign}${scaledResult}`;
    }
  }

  const rawFormatted = formatNumberString(absVal, precision, trimZero);
  const result = comma ? addCommas(rawFormatted) : rawFormatted;
  return `${sign}${result}`;
}

/**
 * 解析数值型时间戳为合法 Date
 * @param {number} val
 * @returns {Date|null}
 */
function parseTimestamp(val) {
  const timestamp = val < 1e11 ? val * 1000 : val;
  const date = new Date(timestamp);
  return isDate(date) ? date : null;
}

/**
 * 解析字符串为合法 Date
 * @param {string} str
 * @returns {Date|null}
 */
function parseStringDate(str) {
  const trimmed = str.trim();
  if (!trimmed) return null;
  if (/^\d+$/.test(trimmed)) {
    return parseTimestamp(Number(trimmed));
  }
  const date = new Date(trimmed);
  return isDate(date) ? date : null;
}

/**
 * 安全解析各种格式输入为标准 Date 实例
 * @param {Date|number|string} input - 日期对象 / 10位秒级时间戳 / 13位毫秒时间戳 / 日期字符串
 * @returns {Date|null}
 */
export function normalizeDate(input) {
  if (isNil(input) || input === '') return null;
  if (isDate(input)) return input;
  if (isNumber(input)) return parseTimestamp(input);
  if (isString(input)) return parseStringDate(input);
  return null;
}

/**
 * 生成日期格式化 Token 映射表
 * @param {Date} date
 * @returns {Record<string, string>}
 */
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

/**
 * 日期格式化函数
 * @param {Date|number|string} dateInput - 待格式化的日期或时间戳
 * @param {string} [template='YYYY-MM-DD'] - 格式化模板，如 'YYYY-MM-DD HH:mm:ss'、'MM-DD' 等，方括号内可转义字符如 '[at]'
 * @returns {string} 格式化结果字符串，解析失败返回空字符串
 * @example
 * formatDate(1716900000) // "2024-05-28"
 * formatDate(1716900000, 'YYYY-MM-DD HH:mm:ss') // "2024-05-28 20:40:00"
 * formatDate('2026-09-27T15:30:00', 'MM月DD日 HH:mm') // "09月27日 15:30"
 * formatDate(new Date(), 'YYYY-MM-DD [at] HH:mm') // "2026-09-27 at 23:16"
 */
export function formatDate(dateInput, template = 'YYYY-MM-DD') {
  const date = normalizeDate(dateInput);
  if (!date) return '';
  const tokens = createTokenMap(date);
  return template.replace(DATE_FORMAT_REGEX, (match, escaped) => escaped || tokens[match] || match);
}
