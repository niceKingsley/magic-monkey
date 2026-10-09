import { POD_TYPE, SORT_MODE } from '@/constants';
import { SORT_STRATEGIES } from '@/helpers/podHelper';

/**
 * 列表排序管理组
 */

export function usePodSort(rawGroups, settings, podType) {
  const sortMode = computed({
    get: () => settings.sortMode,
    set: (val) => {
      settings.sortMode = val;
    },
  });
  const groups = computed(() => {
    if (podType?.value === POD_TYPE.EPISODE) {
      return rawGroups.value;
    }
    return (SORT_STRATEGIES[sortMode.value] || SORT_STRATEGIES[SORT_MODE.DEFAULT])(rawGroups.value);
  });
  return { sortMode, groups, setSortMode: (mode) => (settings.sortMode = mode) };
}
