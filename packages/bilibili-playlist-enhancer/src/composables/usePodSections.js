import { processSeasonData } from '../helpers/service.js';
import { findSectionByBvid } from '../helpers/podHelper.js';

/**
 * 合集多分卷状态与切换调度管理
 */
export function usePodSections({
  rawGroups,
  podType,
  activeBvid,
  activePage,
  setExpanded,
  setActiveTarget,
  refreshActiveStates,
}) {
  const seasonSections = ref([]);
  const hasMultipleSections = ref(false);
  const currentSectionId = ref('');

  const initSections = (payload) => {
    seasonSections.value = payload?.seasonSections || [];
    hasMultipleSections.value = !!payload?.hasMultipleSections;
    currentSectionId.value = payload?.currentSectionId || '';
  };

  const resetSections = () => {
    seasonSections.value = [];
    hasMultipleSections.value = false;
    currentSectionId.value = '';
  };

  const applySectionEpisodes = (section, targetBvid, targetPage) => {
    currentSectionId.value = String(section.value);
    setExpanded('');
    rawGroups.value = processSeasonData(podType.value, section.episodes, targetBvid, targetPage);
  };

  /**
   * 切换当前展示的分卷
   */
  const switchSection = (sectionId) => {
    const targetId = String(sectionId);
    if (targetId === String(currentSectionId.value)) return;
    const targetSection = seasonSections.value.find((s) => String(s.value) === targetId);
    if (!targetSection) return;

    applySectionEpisodes(targetSection, activeBvid.value, activePage.value);
    refreshActiveStates();
  };

  /**
   * 尝试跨分卷切集（目标视频若属于合集内其他分卷则自动切换）
   */
  const trySwitchSectionByBvid = (nextBvid, nextPage) => {
    if (!toValue(hasMultipleSections)) return false;
    const targetSection = findSectionByBvid(seasonSections.value, nextBvid);
    if (!targetSection) return false;

    applySectionEpisodes(targetSection, nextBvid, nextPage);
    setActiveTarget(nextBvid, nextPage);
    refreshActiveStates();
    return true;
  };

  return {
    seasonSections,
    hasMultipleSections,
    currentSectionId,
    initSections,
    resetSections,
    switchSection,
    trySwitchSectionByBvid,
  };
}
