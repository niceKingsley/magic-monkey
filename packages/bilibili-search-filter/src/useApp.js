import { isFunction } from '@shared/utils';
import useAutoExpandFilter from './composables/useAutoExpandFilter';
import { useCardFilter } from './composables/useCardFilter';
import { useFilterConfig } from './composables/useFilterConfig';
import { usePaginationHotkeys } from './composables/usePaginationHotkeys';

export function useApp() {
  const isSettingsOpen = ref(false);
  const { config, saveConfig } = useFilterConfig();
  const { teleportTarget, isShowingAll, filteredCards, matchedCards, toggleRestore } =
    useCardFilter(config);
  useAutoExpandFilter(config);
  usePaginationHotkeys(config);

  function openSettings() {
    isSettingsOpen.value = true;
  }

  function closeSettings() {
    isSettingsOpen.value = false;
  }

  function handleSaveSettings(newSettings) {
    saveConfig(newSettings);
  }

  onMounted(() => {
    if (isFunction(globalThis.GM_registerMenuCommand)) {
      try {
        globalThis.GM_registerMenuCommand('⚙️ 搜索卡片过滤设置', openSettings);
      } catch {
        // ignore
      }
    }
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
