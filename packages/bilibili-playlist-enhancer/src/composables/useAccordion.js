/**
 * 手风琴展开与收起状态管理
 */
export function useAccordion() {
  const expandedBvid = ref('');
  const isExpanded = (bvid) => expandedBvid.value === bvid;
  const toggleAccordion = (bvid) => {
    expandedBvid.value = expandedBvid.value === bvid ? '' : bvid;
  };
  const setExpanded = (bvid) => {
    expandedBvid.value = bvid;
  };

  return {
    expandedBvid,
    isExpanded,
    toggleAccordion,
    setExpanded,
  };
}
