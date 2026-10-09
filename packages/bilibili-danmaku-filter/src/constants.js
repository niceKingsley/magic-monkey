export { name as STORAGE_NAMESPACE } from '../package.json';
export { version as SCRIPT_VERSION } from '../package.json';

export const DEFAULT_VIDEO_CONFIG = {
  enabled: true,
  /* 权重评分过滤阈值 */
  minWeight: 3,
  /* 相似弹幕去重严格度 */
  mergeThreshold: 0.75,
  /* 弹幕合并的时间窗口 */
  mergeWindow: 5,
  /* 黑名单规则列表 */
  blacklist: [],
};

export const DEFAULT_LIVE_CONFIG = {
  enabled: true,
  mergeThreshold: 0.75,
  mergeWindow: 5,
  blacklist: [],
};

export const DEFAULT_CONFIG = {
  video: DEFAULT_VIDEO_CONFIG,
  live: DEFAULT_LIVE_CONFIG,
};

export const RULE_TYPE = {
  CONTAINS: 'contains',
  EXACT: 'exact',
  REGEX: 'regex',
};

export const RULE_TYPE_LABELS = {
  [RULE_TYPE.CONTAINS]: '包含',
  [RULE_TYPE.EXACT]: '精确',
  [RULE_TYPE.REGEX]: '正则',
};

export const RULE_TYPE_OPTIONS = Object.entries(RULE_TYPE_LABELS).map(([value, label]) => ({
  label,
  value,
}));
