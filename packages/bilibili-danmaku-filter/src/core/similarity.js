let dpBuffer = new Int32Array(128);

/**
 * 获取距离计算缓冲区
 */
function getRowBuffer(size) {
  // 防止古老弹幕可能会存在超长长度，做个扩容保险
  if (dpBuffer.length < size) {
    dpBuffer = new Int32Array(Math.max(dpBuffer.length * 2, size));
  }
  return dpBuffer;
}

/**
 * 文本压缩
 */
export function normalizeDanmaku(text) {
  if (!text) return '';
  return text
    .trim()
    .toLowerCase()
    .replace(/(.)\1+/g, '$1$1');
}

/**
 * 计算两个文本的编辑距离（Levenshtein Distance）
 */
export function computeLevenshteinFast(a, b) {
  let start = 0;
  const lenA = a.length;
  const lenB = b.length;

  while (start < lenA && start < lenB && a.codePointAt(start) === b.codePointAt(start)) {
    start++;
  }

  let endA = lenA - 1;
  let endB = lenB - 1;
  while (endA >= start && endB >= start && a.codePointAt(endA) === b.codePointAt(endB)) {
    endA--;
    endB--;
  }

  const subLenA = endA - start + 1;
  const subLenB = endB - start + 1;

  if (subLenA <= 0) return subLenB;
  if (subLenB <= 0) return subLenA;

  // 保证短字符串位于内层列以最小化缓冲区
  const [s1, s1Start, s1Len, s2, s2Start, s2Len] =
    subLenB > subLenA
      ? [b, start, subLenB, a, start, subLenA]
      : [a, start, subLenA, b, start, subLenB];

  const row = getRowBuffer(s2Len + 1);
  for (let j = 0; j <= s2Len; j++) {
    row[j] = j;
  }

  for (let i = 1; i <= s1Len; i++) {
    const charA = s1.codePointAt(s1Start + i - 1);
    let prevDiag = row[0];
    row[0] = i;

    for (let j = 1; j <= s2Len; j++) {
      const temp = row[j];
      const cost = charA === s2.codePointAt(s2Start + j - 1) ? 0 : 1;
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prevDiag + cost);
      prevDiag = temp;
    }
  }

  return row[s2Len];
}

/**
 * 校验两个已归一化的文本是否满足相似度阈值
 */
export function isCompactSimilar(compactA, compactB, threshold = 0.8) {
  if (!compactA || !compactB) return false;
  if (compactA === compactB) return true;

  const lenA = compactA.length;
  const lenB = compactB.length;
  const maxLen = Math.max(lenA, lenB);
  const minLen = Math.min(lenA, lenB);
  if (maxLen === 0 || minLen / maxLen < threshold) return false;

  const distance = computeLevenshteinFast(compactA, compactB);
  return 1 - distance / maxLen >= threshold;
}
