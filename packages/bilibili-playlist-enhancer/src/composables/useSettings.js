import { assign, createStorage } from '@shared/utils';
import { DEFAULT_SETTINGS, STORAGE_NAMESPACE } from '../constants.js';
import { playerState } from '../helpers/playerBridge.js';

const storage = createStorage(STORAGE_NAMESPACE);

const settingsState = reactive({
  ...DEFAULT_SETTINGS,
});

let isInitialized = false;

function setupSettingsWatchers() {
  watch(
    settingsState,
    (newVal) => {
      storage.set('user_settings', { ...newVal });
    },
    { deep: true },
  );
}

/**
 * 初始化配置中心
 */
export function initSettings() {
  if (isInitialized) return settingsState;
  isInitialized = true;

  const savedSettings = storage.get('user_settings', null);

  if (savedSettings) {
    assign(settingsState, savedSettings);
  }

  playerState().autoPlayNext?.(false);

  setupSettingsWatchers();
  return settingsState;
}

export function useSettings() {
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
