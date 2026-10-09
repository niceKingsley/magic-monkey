import { isCompactSimilar, normalizeDanmaku } from '@/core/similarity';
import { isNumber } from '@shared/utils';

const MAX_WINDOW_CAPACITY = 60;

const slidingQueue = [];
const exactTimeMap = new Map();

/**
 * 清除已超出时间窗口的历史记录
 */
function evictExpiredRecords(currentTime, windowMs) {
  while (slidingQueue.length > 0 && currentTime - slidingQueue[0].time > windowMs) {
    const expired = slidingQueue.shift();
    if (exactTimeMap.get(expired.compactText) === expired.time) {
      exactTimeMap.delete(expired.compactText);
    }
  }
}

/**
 * 相同文本的哈希比对
 */
function isExactDuplicate(compactText, currentTime, windowMs) {
  const lastTime = exactTimeMap.get(compactText);
  return isNumber(lastTime) && currentTime - lastTime <= windowMs;
}

/**
 * 基于长度剪枝的模糊相似度检索
 */
function isFuzzyDuplicate(compactText, threshold) {
  for (let i = slidingQueue.length - 1; i >= 0; i--) {
    if (isCompactSimilar(compactText, slidingQueue[i].compactText, threshold)) {
      return true;
    }
  }

  return false;
}

/**
 * 记录通过放行的弹幕到滑动窗口中
 */
function recordAllowedDanmaku(compactText, currentTime) {
  if (slidingQueue.length >= MAX_WINDOW_CAPACITY) {
    const evicted = slidingQueue.shift();
    if (exactTimeMap.get(evicted.compactText) === evicted.time) {
      exactTimeMap.delete(evicted.compactText);
    }
  }

  slidingQueue.push({ compactText, time: currentTime });
  exactTimeMap.set(compactText, currentTime);
}

/**
 * 检测当前弹幕是否为窗口期内重复刷屏内容
 */
export function checkLiveDuplicate(text, options = {}) {
  const windowSeconds = options.windowSeconds;
  if (windowSeconds <= 0 || !text) return false;

  const compactText = normalizeDanmaku(text);
  if (!compactText) return false;

  const now = performance.now();
  const windowMs = windowSeconds * 1000;
  const threshold = options.threshold ?? 0.8;

  evictExpiredRecords(now, windowMs);

  if (isExactDuplicate(compactText, now, windowMs)) {
    return true;
  }

  if (threshold < 1 && isFuzzyDuplicate(compactText, threshold)) {
    return true;
  }

  recordAllowedDanmaku(compactText, now);
  return false;
}
