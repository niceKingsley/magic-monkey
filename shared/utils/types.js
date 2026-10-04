/**
 * 类型判断与类型守卫工具
 */

export const isArray = Array.isArray;

export const isFunction = (val) => typeof val === 'function';

export const isString = (val) => typeof val === 'string';

export const isNumber = (val) => typeof val === 'number' && !Number.isNaN(val);

export const isDate = (val) => val instanceof Date && !Number.isNaN(val.getTime());

export const isNil = (val) => val === null || val === undefined;

export const isSymbol = (val) => typeof val === 'symbol';

export const isObject = (val) => val !== null && typeof val === 'object';

const hasOwnProperty = Object.prototype.hasOwnProperty;

export const hasOwn = (val, key) => (isObject(val) ? hasOwnProperty.call(val, key) : false);

export const hasLocationHref = (path) => location.href.includes(path);

export const assign = Object.assign;
