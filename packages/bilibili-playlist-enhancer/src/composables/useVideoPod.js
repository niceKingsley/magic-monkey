import { CTRL_ACTION, POD_TYPE } from '@/constants';
import {
  interceptPlayerControls,
  interceptPlayerEnding,
  playerState,
} from '@/helpers/playerBridge';
import { findCurrentPlaying, flattenEpisodes } from '@/helpers/podHelper';
import { scrollActiveItem, setBilibiliVideoPodMinHeight } from '@/helpers/syncPosition';
import { useAccordion } from './useAccordion';
import { usePlayedHistory } from './usePlayedHistory';
import { usePodHotkeys } from './usePodHotkeys';
import { usePodLoader } from './usePodLoader';
import { usePodPlayback } from './usePodPlayback';
import { usePodSort } from './usePodSort';
import { useSettings } from './useSettings';
import { useShuffle } from './useShuffle';

export function useVideoPod() {
  const rootRef = ref(null);
  const scrollContainerRef = ref(null);
  const podType = ref(null);
  const rawGroups = ref([]);
  const activeBvid = ref('');
  const activePage = ref(1);

  const { settings } = useSettings();
  const { isExpanded, toggleAccordion, setExpanded } = useAccordion();
  const { sortMode, groups, setSortMode } = usePodSort(rawGroups, settings, podType);

  const flatEpisodes = computed(() => flattenEpisodes(groups.value));
  const currentPlaying = computed(() =>
    findCurrentPlaying(flatEpisodes.value, activeBvid.value, activePage.value),
  );

  const { getNextShuffleTarget, getPrevShuffleTarget, recordManualPlay, toggleShuffle } =
    useShuffle({ settings, flatEpisodes, currentPlaying });

  const { isEpisodePlayed, isGroupPlayed } = usePlayedHistory({
    activeBvid,
    activePage,
  });

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
        return;
      }
      scrollContainerRef.value?.scrollTo({ top: 0, behavior: 'smooth' });
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
   * 判定非随机模式下是否已到达当前分 P 或列表播放终点
   */
  const isPlaybackEndReached = () => {
    if (settings.shuffle) return false;
    return (
      currentPlaying.value?.isLast || (settings.stopOnGroupEnd && currentPlaying.value?.isGroupLast)
    );
  };

  /**
   * 处理视频播放完毕
   */
  const handleVideoEnded = () => {
    if (!settings.autoPlayNext || isPlaybackEndReached()) return;
    handlePlayerCtrl(CTRL_ACTION.NEXT);
  };

  onMounted(() => {
    loadPod().then(() => {
      if (toValue(podType) !== POD_TYPE.SERIES) setBilibiliVideoPodMinHeight();
    });

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
    isGroupPlayed,
    isEpisodePlayed,
  };
}
