import { isCompactSimilar, normalizeDanmaku } from '@/core/similarity';

/**
 * 聚合相似弹幕的权重与文本信息
 */
function absorbDanmaku(cluster, candidate) {
  cluster.count++;
  cluster.totalProgress += candidate.progress || 0;

  const candidateContent = candidate.content;

  // 如果下一个相似弹幕信息长度比当前弹幕长度大，优先显示长度大的。
  if (candidateContent.length > cluster.item.content.length) {
    cluster.item.content = candidateContent;
    cluster.compactText = candidate.compactText;
  }

  cluster.item.weight = Math.max(cluster.item.weight, candidate.weight);
}

/**
 * 在时间窗口内收集并聚合所有相似弹幕
 */
function collectCluster(sorted, startIndex, used, windowMs, threshold) {
  const baseItem = sorted[startIndex];
  const baseProgress = baseItem.progress || 0;

  const cluster = {
    item: { ...baseItem },
    compactText: baseItem.compactText,
    totalProgress: baseProgress,
    count: 1,
  };

  for (let j = startIndex + 1; j < sorted.length; j++) {
    if (used[j]) continue;

    const candidate = sorted[j];
    const candidateProgress = candidate.progress || 0;

    if (candidateProgress - baseProgress > windowMs) {
      break;
    }

    if (isCompactSimilar(cluster.compactText, candidate.compactText, threshold)) {
      used[j] = 1;
      absorbDanmaku(cluster, candidate);
    }
  }

  cluster.item.progress = Math.round(cluster.totalProgress / cluster.count);
  return {
    mergedItem: cluster.item,
    mergedCount: cluster.count - 1,
  };
}

/**
 * 开始合并相似弹幕
 */
export function mergeSimilar(list, threshold, windowSec) {
  if (!list || list.length < 2) {
    return { list: list || [], mergedCount: 0 };
  }
  const windowMs = windowSec * 1000;
  const sorted = [...list].sort((a, b) => a.progress - b.progress);

  for (const element of sorted) {
    element.compactText = normalizeDanmaku(element.content);
  }

  const result = [];
  const used = new Uint8Array(sorted.length); // 用来防止已经被合并弹幕重复过滤
  let totalMergedCount = 0;
  for (let i = 0; i < sorted.length; i++) {
    if (used[i]) continue;

    const { mergedItem, mergedCount } = collectCluster(sorted, i, used, windowMs, threshold);
    delete mergedItem.compactText;
    result.push(mergedItem);
    totalMergedCount += mergedCount;
  }

  console.info(
    `相似弹幕合并完成: ${list.length} -> ${result.length} 条 (合并 ${totalMergedCount} 条)`,
  );
  return { list: result, mergedCount: totalMergedCount };
}
