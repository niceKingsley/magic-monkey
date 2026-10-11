function splitZhEn(text) {
  if (!text) return [];
  return text.match(/[a-zA-Z0-9]+|[\u4e00-\u9fa5]+/g) || [];
}

/**
 * 只要目标字符串包含任意分词片段即判定为命中
 */
export function fuzzyIncludes(str, keyword) {
  if (!str || !keyword) return false;
  const s = str.replace(/\s/g, '').toLowerCase();
  const parts = splitZhEn(keyword.replace(/\s/g, ''));
  return parts.some((w) => s.includes(w.toLowerCase()));
}

/**
 * 校验搜索词是否命中免过滤白名单
 */
export function isKeywordWhitelisted(keyword, whitelist) {
  if (!keyword || whitelist.length === 0) {
    return false;
  }
  return whitelist.some((w) => w && (keyword.includes(w) || fuzzyIncludes(keyword, w)));
}
