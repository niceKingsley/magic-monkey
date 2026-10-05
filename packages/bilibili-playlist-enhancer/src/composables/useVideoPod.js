import { scrollActiveItem } from '../helpers/syncPosition.js';
import {
  interceptPlayerControls,
  interceptPlayerEnding,
  playerState,
} from '../helpers/playerBridge.js';
import { useSettings } from './useSettings.js';
import { findCurrentPlaying, flattenEpisodes } from '../helpers/podHelper.js';
import { useAccordion } from './useAccordion.js';
import { usePodSort } from './usePodSort.js';
import { usePodPlayback } from './usePodPlayback.js';
import { usePodLoader } from './usePodLoader.js';
import { usePodHotkeys } from './usePodHotkeys.js';
import { useShuffle } from './useShuffle.js';
import { CTRL_ACTION } from '../constants.js';

export function useVideoPod() {
  const rootRef = ref(null);
  const scrollContainerRef = ref(null);
  const podType = ref(null);
  const rawGroups = ref([]);
  const activeBvid = ref('');
  const activePage = ref(1);

  const { settings } = useSettings();
  const { isExpanded, toggleAccordion, setExpanded } = useAccordion();
  const { sortMode, groups, setSortMode } = usePodSort(rawGroups, settings);

  const flatEpisodes = computed(() => flattenEpisodes(groups.value));
  const currentPlaying = computed(() =>
    findCurrentPlaying(flatEpisodes.value, activeBvid.value, activePage.value),
  );

  const { getNextShuffleTarget, getPrevShuffleTarget, recordManualPlay, toggleShuffle } =
    useShuffle({ settings, flatEpisodes, currentPlaying });

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

  const {
    isAnimating,
    isLoading,
    podMode,
    seasonSections,
    hasMultipleSections,
    currentSectionId,
    containerStyle,
    videoBodyStyle,
    loadPod,
    switchSection,
  } = usePodLoader({
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

  watch(
    () => settings.sortMode,
    () => {
      if (settings.scrollToActiveOnSort) {
        scrollActiveItem(scrollContainerRef.value, true);
      } else {
        scrollContainerRef.value?.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    { flush: 'post' },
  );

  /**
   * 确保原生连播开关保持关闭，由脚本统一精准控制切集
   */
  watch(
    () => settings.autoPlayNext,
    () => {
      playerState().autoPlayNext?.(false);
    },
    { immediate: true },
  );

  /**
   * 处理视频播放完毕
   */
  const handleVideoEnded = () => {
    if (!settings.autoPlayNext) return;

    // 非随机模式下的边界判定（到达合集末尾或当前分 P 播完即停止）
    if (!settings.shuffle) {
      const isEnding =
        currentPlaying.value?.isLast ||
        (settings.stopOnGroupEnd && currentPlaying.value?.isGroupLast);
      if (isEnding) return;
    }

    handlePlayerCtrl(CTRL_ACTION.NEXT);
  };

  onMounted(() => {
    loadPod().then();
    const cleanups = [
      interceptPlayerControls(handlePlayerCtrl),
      interceptPlayerEnding(handleVideoEnded),
      usePodHotkeys({ settings, handlePlayerCtrl }),
    ];
    onUnmounted(() => cleanups.forEach((fn) => fn?.()));
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
    seasonSections,
    hasMultipleSections,
    currentSectionId,
    switchSection,
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
