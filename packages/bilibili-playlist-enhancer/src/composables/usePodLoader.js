import { POD_MODE } from '../constants.js';
import { getCurrentBvid, getCurrentPage } from '../helpers/service.js';
import { scrollActiveItem, usePositionSync } from '../helpers/syncPosition.js';
import {
  fetchPodPayload,
  findActiveAccordionBvid,
  hasSeasonBvid,
  isSameVideoTarget,
} from '../helpers/podHelper.js';

/**
 * 合集数据加载与位置同步调度管理
 */
export function usePodLoader({
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
}) {
  const isLoading = ref(false);
  const podMode = ref(POD_MODE.LIST);

  const onModeChange = (isExpandedMode) => {
    podMode.value = isExpandedMode ? POD_MODE.CARD : POD_MODE.LIST;

    setTimeout(() => {
      scrollActiveItem(scrollContainerRef.value, true);
    }, 300);
  };

  const { isAnimating, containerStyle, videoBodyStyle, startSync } = usePositionSync(
    podType,
    rootRef,
    onModeChange,
  );

  /**
   * 尝试在当前合集内快速切集（命中当前合集则直接刷新高亮并平滑定位）
   */
  const trySwitchSameSeason = (nextBvid, nextPage) => {
    if (!hasSeasonBvid(rawGroups.value, nextBvid)) return false;
    if (isSameVideoTarget(activeBvid.value, activePage.value, nextBvid, nextPage)) {
      return true;
    }

    setActiveTarget(nextBvid, nextPage);
    refreshActiveStates();
    return true;
  };

  /**
   * 初始化合集数据，并初始化视图、对齐监听与激活项
   */
  const initPodState = async (payload, bvid, page) => {
    if (!payload) {
      rawGroups.value = [];
      setExpanded('');
      podType.value = null;
      return;
    }

    podType.value = payload.type;
    podMode.value = payload.mode;
    rawGroups.value = payload.groups;
    setActiveTarget(bvid, page);

    setExpanded(findActiveAccordionBvid(currentPlaying.value));
    await startSync(podType.value);
    scrollActiveItem(scrollContainerRef.value, false);
  };

  /**
   * 初始化所有数据
   */
  const loadPod = async () => {
    const nextBvid = getCurrentBvid();
    const nextPage = getCurrentPage();
    if (!nextBvid) return;

    if (isSameVideoTarget(activeBvid.value, activePage.value, nextBvid, nextPage)) {
      return;
    }

    // 如果是当前合集内切集，直接切高亮
    if (trySwitchSameSeason(nextBvid, nextPage)) return;

    // 切外部视频情况
    setActiveTarget(nextBvid, nextPage);
    rawGroups.value = [];
    podType.value = null;
    isLoading.value = true;

    try {
      const payload = await fetchPodPayload(nextBvid, nextPage);
      await initPodState(payload, nextBvid, nextPage);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isAnimating,
    isLoading,
    podMode,
    containerStyle,
    videoBodyStyle,
    initPodState,
    loadPod,
    trySwitchSameSeason,
  };
}
