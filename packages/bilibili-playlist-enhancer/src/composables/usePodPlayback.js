import { CTRL_ACTION } from '@/constants';
import { executeVideoSwitch } from '@/helpers/playerBridge';
import { findActiveAccordionBvid, getAdjacentVideo, updateGroupActive } from '@/helpers/podHelper';
import { scrollActiveItem } from '@/helpers/syncPosition';
import { toast } from '@shared/components/toast';
import { throttle } from '@shared/utils';

/**
 * 选集切换与高亮联动管理
 */
export function usePodPlayback({
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
  shuffleActions,
}) {
  /**
   * 刷新当前列表各组与子集的激活态，并自适应展开手风琴与平滑居中滚动
   */
  const refreshActiveStates = (isManualClick = false) => {
    // 批量更新全部视频组与子分 P 的激活状态列表
    rawGroups.value = rawGroups.value.map((g) =>
      updateGroupActive(g, podType.value, activeBvid.value, activePage.value),
    );

    setExpanded(findActiveAccordionBvid(currentPlaying.value));

    // 若关闭了“切集自动定位高亮位置” 就跳过滚动
    if (isManualClick && settings && !settings.scrollActiveOnClick) {
      return;
    }
    scrollActiveItem(scrollContainerRef.value, true);
  };

  /**
   * 点击切集或展开/折叠多 P 手风琴
   */
  const switchActiveVideo = (type, data, index, isManual = true) => {
    const { bvid, aid, episodes } = data;
    const { page, cid, isActive } = episodes[index];

    if (isActive) return;

    if (isManual) {
      shuffleActions?.recordManualPlay?.({ bvid, page });
    }

    activeBvid.value = bvid;
    activePage.value = page;
    executeVideoSwitch(podType.value, { aid, bvid, cid, p: page });
    refreshActiveStates(isManual);
  };

  /**
   * 点击视频分组头部
   * - 若已处于高亮激活态：多 P 则仅展开/收起手风琴，单 P 则不重复重载
   * - 若未处于激活态：切换播放该视频第 1 P。
   */
  const handleHeaderClick = (group) => {
    if (group.isActive && group.isMultiPage) {
      toggleAccordion(group.bvid);
      return;
    }

    switchActiveVideo(podType.value, group, 0, true);
  };

  /**
   * 获取 上/下 个播放目标（随机与顺序）
   */
  const getNextTarget = (action) => {
    if (settings?.shuffle) {
      const shuffleTarget =
        action === CTRL_ACTION.PREV
          ? shuffleActions?.getPrevShuffleTarget?.()
          : shuffleActions?.getNextShuffleTarget?.();

      if (shuffleTarget) return shuffleTarget;
    }
    const currentIndex = currentPlaying.value?.flatIndex;
    return getAdjacentVideo(flatEpisodes.value, currentIndex, action);
  };

  /**
   * 执行播放器控制栏上一集/下一集动作
   */
  const handlePlayerCtrl = throttle((action) => {
    const target = getNextTarget(action);
    if (target) {
      switchActiveVideo(podType.value, target.group, target.epIndex, false);
      return;
    }
    toast.info(action === CTRL_ACTION.PREV ? '已经是第一集了' : '已经是最后一集了');
  }, 300);

  const setActiveTarget = (bvid, page) => {
    activeBvid.value = bvid;
    activePage.value = page;
  };

  return {
    refreshActiveStates,
    switchActiveVideo,
    handleHeaderClick,
    handlePlayerCtrl,
    setActiveTarget,
  };
}
