import { assign, createStorage, isObject } from '@shared/utils';
import {
  DEFAULT_CONFIG,
  DEFAULT_LIVE_CONFIG,
  DEFAULT_VIDEO_CONFIG,
  STORAGE_NAMESPACE,
} from '../constants';

const storage = createStorage(STORAGE_NAMESPACE);

export function readPersistedConfig() {
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

export function readVideoConfig() {
  return readPersistedConfig().video;
}

export function readLiveConfig() {
  return readPersistedConfig().live;
}

export function persistConfig(targetConfig) {
  try {
    storage.set('user_config', targetConfig);
  } catch (error) {
    console.error('保存持久化配置失败:', error);
  }
}

const currentConfig = reactive(readPersistedConfig());

export function useConfig() {
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
