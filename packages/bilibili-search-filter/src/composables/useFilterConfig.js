import { DEFAULT_CONFIG, SCRIPT_VERSION, STORAGE_NAMESPACE } from '@/constants';
import { createStorage, isArray, isObject, isString } from '@shared/utils';

const storage = createStorage(STORAGE_NAMESPACE);

function normalizeFilterFields(fields) {
  if (!isArray(fields) || fields.length === 0) {
    return DEFAULT_CONFIG.filterFields;
  }
  const valid = fields.map((f) => String(f).trim()).filter((f) => f === 'title' || f === 'author');
  return valid.length > 0 ? valid : DEFAULT_CONFIG.filterFields;
}

function normalizeWhitelist(whitelist) {
  if (isArray(whitelist)) {
    return Array.from(new Set(whitelist.map((k) => String(k).trim()).filter(Boolean)));
  }
  if (isString(whitelist)) {
    return whitelist
      .split('\n')
      .map((k) => k.trim())
      .filter(Boolean);
  }
  return DEFAULT_CONFIG.whitelistKeywords;
}

function readStoredConfig() {
  try {
    const raw = storage.get(SCRIPT_VERSION, null);
    if (!isObject(raw)) {
      return { ...DEFAULT_CONFIG };
    }

    return {
      ...DEFAULT_CONFIG,
      ...raw,
      filterFields: normalizeFilterFields(raw.filterFields),
      whitelistKeywords: normalizeWhitelist(raw.whitelistKeywords),
      hotkeyPrevPage:
        isString(raw.hotkeyPrevPage) && raw.hotkeyPrevPage !== '['
          ? raw.hotkeyPrevPage
          : DEFAULT_CONFIG.hotkeyPrevPage,
      hotkeyNextPage:
        isString(raw.hotkeyNextPage) && raw.hotkeyNextPage !== ']'
          ? raw.hotkeyNextPage
          : DEFAULT_CONFIG.hotkeyNextPage,
    };
  } catch (err) {
    console.warn('[bilibili-search-filter] 读取配置失败，采用默认值:', err);
    return { ...DEFAULT_CONFIG };
  }
}

const configState = ref(readStoredConfig());

export function useFilterConfig() {
  function saveConfig(newSettings) {
    const merged = {
      ...configState.value,
      ...newSettings,
      filterFields: normalizeFilterFields(newSettings.filterFields),
      whitelistKeywords: normalizeWhitelist(newSettings.whitelistKeywords),
    };

    try {
      storage.set(SCRIPT_VERSION, merged);
    } catch (err) {
      console.error('[bilibili-search-filter] 保存配置失败:', err);
    }

    configState.value = merged;
    return merged;
  }

  function resetConfig() {
    const defaults = structuredClone(DEFAULT_CONFIG);
    try {
      storage.set(SCRIPT_VERSION, defaults);
    } catch (err) {
      console.error('[bilibili-search-filter] 重置配置失败:', err);
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
