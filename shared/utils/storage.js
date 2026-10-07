import { isNil, isString } from './types';

const getEnvPrefix = () => {
  try {
    return import.meta.env.DEV ? '__dev__' : '';
  } catch {
    return '';
  }
};

const formatKey = (key, namespace = '') => {
  const envPrefix = getEnvPrefix();
  const nsPrefix = namespace ? `${namespace}:` : '';
  return `${envPrefix}${nsPrefix}${key}`;
};

export const getStorage = (key, defaultValue = null, namespace = '') => {
  if (!isString(key) || !key) return defaultValue;
  const finalKey = formatKey(key, namespace);
  const val = GM_getValue(finalKey, defaultValue);
  return isNil(val) ? defaultValue : val;
};

export const setStorage = (key, value, namespace = '') => {
  if (!isString(key) || !key) return;
  const finalKey = formatKey(key, namespace);
  GM_setValue(finalKey, value);
};

export const removeStorage = (key, namespace = '') => {
  if (!isString(key) || !key) return;
  const finalKey = formatKey(key, namespace);
  GM_deleteValue(finalKey);
};

export const clearStorage = (namespace = '') => {
  const prefix = formatKey('', namespace);
  const allKeys = GM_listValues();
  for (const k of allKeys) {
    if (k.startsWith(prefix)) {
      GM_deleteValue(k);
    }
  }
};

export const createStorage = (namespace = '') => ({
  get: (key, defaultValue) => getStorage(key, defaultValue, namespace),
  set: (key, value) => setStorage(key, value, namespace),
  remove: (key) => removeStorage(key, namespace),
  clear: () => clearStorage(namespace),
});

export const storage = createStorage();
