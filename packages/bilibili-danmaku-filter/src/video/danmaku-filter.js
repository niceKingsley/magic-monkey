import { getOrCompileBlacklist, matchesBlacklist } from '@/core/matcher';

/**
 * 校验单条弹幕是否放行
 */
export function isDanmakuAllowed(item, ctx) {
  if (ctx.minWeight > 1 && (item.weight || 0) < ctx.minWeight) {
    return false;
  }
  return !(ctx.blacklistEngine && matchesBlacklist(item.content, ctx.blacklistEngine));
}

/**
 * 弹幕开始过滤
 */
export function filterDanmaku(list, config = {}) {
  if (!list || list.length === 0) return [];

  const ctx = {
    minWeight: config.minWeight || 1,
    blacklistEngine: config.blacklist?.length ? getOrCompileBlacklist(config.blacklist) : null,
  };

  const result = list.filter((item) => isDanmakuAllowed(item, ctx));
  console.info(
    `基础规则过滤完成: ${list.length} -> ${result.length} 条 (过滤 ${list.length - result.length} 条)`,
  );

  return result;
}
