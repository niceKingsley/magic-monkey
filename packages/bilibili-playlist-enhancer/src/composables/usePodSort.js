import { SORT_MODE } from '../constants.js';
import { SORT_STRATEGIES } from '../helpers/podHelper.js';

/**
 * 列表排序管理组
 */
export function usePodSort(rawGroups, settings) {
  const sortMode = computed({
    get: () => settings.sortMode,
    set: (val) => {
      settings.sortMode = val;
    },
  });

  const groups = computed(() =>
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
