import { RULE_TYPE } from '@/constants';
import { isArray } from '@shared/utils';

let cachedBlacklistRef = null;
let compiledBlacklist = {
  exactSet: new Set(),
  containsKeywords: [],
  regexList: [],
};

function parseRegex(pattern, flags = '') {
  try {
    return new RegExp(pattern, flags);
  } catch {
    return null;
  }
}

/**
 * 追加单条黑名单规则到对应分类集合
 */
function addBlacklistRule(rule, target) {
  if (!rule?.type) return;

  const { type, keyword, pattern, flags } = rule;
  if (type === RULE_TYPE.EXACT && keyword) {
    target.exactSet.add(keyword);
    return;
  }
  if (type === RULE_TYPE.CONTAINS && keyword) {
    target.containsKeywords.push(keyword);
    return;
  }
  if (type === RULE_TYPE.REGEX && pattern) {
    const reg = parseRegex(pattern, flags);
    if (reg) target.regexList.push(reg);
  }
}

/**
 * 黑名单列表格式化编译
 */
export function compileBlacklist(blacklist) {
  const result = {
    exactSet: new Set(),
    containsKeywords: [],
    regexList: [],
  };

  if (!isArray(blacklist)) return result;

  for (const rule of blacklist) {
    addBlacklistRule(rule, result);
  }

  return result;
}

/**
 * 获取或复用已编译的黑名单缓存
 */
export function getOrCompileBlacklist(blacklist) {
  if (cachedBlacklistRef === blacklist) {
    return compiledBlacklist;
  }

  cachedBlacklistRef = blacklist;
  compiledBlacklist = compileBlacklist(blacklist);
  return compiledBlacklist;
}

/**
 * 检测单条文本是否命中规则
 */
export function matchesBlacklist(content, engine) {
  if (!content || !engine) return false;

  if (engine.exactSet.has(content)) {
    return true;
  }

  for (const kw of engine.containsKeywords) {
    if (content.includes(kw)) {
      return true;
    }
  }

  for (const reg of engine.regexList) {
    if (reg.test(content)) {
      return true;
    }
  }

  return false;
}

/**
 * 判断单条文本是否命中黑名单列表
 */
export function isBlocked(text, blacklist) {
  if (!text || !isArray(blacklist) || blacklist.length === 0) {
    return false;
  }
  const engine = getOrCompileBlacklist(blacklist);
  return matchesBlacklist(text, engine);
}
