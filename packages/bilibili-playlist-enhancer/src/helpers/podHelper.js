import { getUrlParams } from '@shared/utils';
import { CTRL_ACTION, POD_TYPE, SORT_MODE } from '../constants.js';
import { fetchSeasonInfo, processSeasonData } from './service.js';

/**
 * 排序策略映射表
 */
export const SORT_STRATEGIES = {
  [SORT_MODE.TIME_ASC]: (list) =>
    [...list].sort((a, b) => (a.pubTimestamp || 0) - (b.pubTimestamp || 0)),
  [SORT_MODE.TIME_DESC]: (list) =>
    [...list].sort((a, b) => (b.pubTimestamp || 0) - (a.pubTimestamp || 0)),
  [SORT_MODE.DEFAULT]: (list) => [...list].sort((a, b) => (a.rawIndex || 0) - (b.rawIndex || 0)),
};

/**
 * 查找当前默认展开的手风琴
 */
export const findActiveAccordionBvid = (current) =>
  current?.group?.isMultiPage ? current.group.bvid : '';

/**
 * 批量更新单组视频与子分 P 的激活状态
 */
export function updateGroupActive(group, podType, activeBvid, activePage) {
  const currentP = Number(activePage) || 1;
  const isGroupActive = group.bvid === activeBvid;
  const isEpisodeMatch = Number(group.page || 1) === currentP;
  const isActive = podType === POD_TYPE.EPISODE ? isGroupActive && isEpisodeMatch : isGroupActive;

  const episodes = (group.episodes || []).map((ep) => ({
    ...ep,
    isActive: isGroupActive && Number(ep.page || 1) === currentP,
  }));

  return { ...group, isActive, episodes };
}

/**
 * 拉取并清洗远端合集数据
 */
export async function fetchPodPayload(bvid, page) {
  const { sid } = getUrlParams();
  const podData = await fetchSeasonInfo(bvid, sid);
  if (!podData) return null;

  return {
    type: podData.type,
    mode: podData.mode,
    seasonSections: podData.seasonSections || [],
    hasMultipleSections: !!podData.hasMultipleSections,
    currentSectionId: podData.currentSectionId || '',
    groups: processSeasonData(podData.type, podData.sections, bvid, page),
  };
}

/**
 * 判断是否为当前正在播放的目标视频
 */
export const isSameVideoTarget = (currentBvid, currentPage, nextBvid, nextPage) =>
  currentBvid === nextBvid && Number(currentPage || 1) === Number(nextPage || 1);

/**
 * 判断目标视频是否存在于合集列表中
 */
export const hasSeasonBvid = (groups, bvid) => groups.some((g) => g.bvid === bvid);

/**
 * 根据 bvid 在合集分卷列表中查找所属分卷
 */
export const findSectionByBvid = (seasonSections = [], bvid = '') =>
  seasonSections.find((s) => (s.episodes || []).some((ep) => ep.bvid === bvid));

/**
 * 将多组视频与子分 P 拍平为线性列表
 */
export const flattenEpisodes = (groups) =>
  groups.flatMap((group, groupIndex) =>
    (group.episodes || []).map((ep, epIndex) => ({
      group,
      groupIndex,
      epIndex,
      episode: ep,
      bvid: group.bvid,
      page: Number(ep.page || 1),
    })),
  );

/**
 * 当前播放项完整信息
 */
export function findCurrentPlaying(flatList, activeBvid, activePage) {
  const currentP = Number(activePage) || 1;
  const flatIndex = flatList.findIndex(
    (item) => item.bvid === activeBvid && item.page === currentP,
  );
  if (flatIndex === -1) return null;

  const currentItem = flatList[flatIndex];
  const totalEpisodes = flatList.length;
  const groupEpisodes = currentItem.group?.episodes || [];

  return {
    /* 视频组在列表中的索引 */
    groupIndex: currentItem.groupIndex,
    /* 视频组对象 */
    group: currentItem.group,
    /* 当前分 P 在所属组内的子集序号 */
    epIndex: currentItem.epIndex,
    /* 当前分 P 数据对象 */
    episode: currentItem.episode,
    /* 当前分 P 在全局线性播放列表中的绝对索引 */
    flatIndex,
    /* 全量分 P 总集数 */
    totalEpisodes,
    /* 是否处于第一集 */
    isFirst: flatIndex === 0,
    /* 是否处于最后一集 */
    isLast: flatIndex === totalEpisodes - 1,
    /* 是否处于当前视频组的第一小节 */
    isGroupFirst: currentItem.epIndex === 0,
    /* 是否处于当前视频组的最后小节 */
    isGroupLast: currentItem.epIndex === groupEpisodes.length - 1,
  };
}

/**
 * 计算相邻的目标视频项（上一集/下一集）
 */
export function getAdjacentVideo(flatList, currentFlatIndex, action) {
  if (currentFlatIndex === -1 || currentFlatIndex == null) return null;
  const offset = action === CTRL_ACTION.PREV ? -1 : 1;
  return flatList[currentFlatIndex + offset] || null;
}
