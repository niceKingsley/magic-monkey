/**
 * 格式化搜索关键词
 */
export const normalizeQuery = (str) => (str || '').trim().toLowerCase();

/**
 * 判断文本是否匹配关键词
 */
export const isTextMatched = (text, query) => text.toLowerCase().includes(query);

/**
 * 单组视频项过滤
 */
export function filterGroupItem(group, query) {
  if (!query) return group;

  if (isTextMatched(group.title, query)) {
    return { ...group, isAutoExpanded: true };
  }
  const matchedEpisodes = (group.episodes || []).filter((ep) => isTextMatched(ep.title, query));

  if (matchedEpisodes.length > 0) {
    return { ...group, episodes: matchedEpisodes, isAutoExpanded: true };
  }

  return null;
}

/**
 * 批量过滤视频列表
 */
export function filterGroupList(groups, keyword) {
  const query = normalizeQuery(keyword);
  if (!query) return groups || [];

  return (groups || []).map((g) => filterGroupItem(g, query)).filter(Boolean);
}

/**
 * 统计匹配到的分集总数
 */
export function countTotalMatches(filteredGroups) {
  return (filteredGroups || []).reduce((acc, g) => acc + (g.episodes?.length || 1), 0);
}

/**
 * 列表内快速搜索与过滤
 */
export function usePodSearch(groups) {
  /* 搜索输入内容 */
  const keyword = ref('');
  /* 搜索栏展开状态 */
  const isSearchOpen = ref(false);
  /* 搜索输入框 DOM 引用 */
  const searchInputRef = ref(null);

  /* 过滤后的视频分组列表 */
  const filteredGroups = computed(() => filterGroupList(groups.value, keyword.value));
  /* 命中的分集总数 */
  const matchCount = computed(() => countTotalMatches(filteredGroups.value));
  /* 当前是否存在有效查询词 */
  const hasSearchQuery = computed(() => !!(keyword.value || '').trim());

  /**
   * 展开搜索栏并自动聚焦
   */
  const openSearch = () => {
    isSearchOpen.value = true;
    nextTick(() => searchInputRef.value?.focus());
  };

  /**
   * 关闭搜索栏并清空内容
   */
  const closeSearch = () => {
    keyword.value = '';
    isSearchOpen.value = false;
  };

  /**
   * 一键清空关键词
   */
  const clearKeyword = () => {
    keyword.value = '';
    searchInputRef.value?.focus();
  };

  /**
   * 切换搜索栏展开/收起
   */
  const toggleSearch = () => {
    if (isSearchOpen.value) {
      closeSearch();
      return;
    }
    openSearch();
  };

  return {
    keyword,
    isSearchOpen,
    searchInputRef,
    filteredGroups,
    matchCount,
    hasSearchQuery,
    openSearch,
    closeSearch,
    clearKeyword,
    toggleSearch,
  };
}
