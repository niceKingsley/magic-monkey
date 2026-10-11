import { FILTER_FIELD_SELECTORS } from '@/constants';
import { fuzzyIncludes, isKeywordWhitelisted } from '@/helpers/match';
import { debounce, getUrlParams, waitElement } from '@shared/utils';

function getSearchKeyword() {
  const { keyword = '' } = getUrlParams();
  return keyword.trim();
}

const CARD_CONTAINER_SELECTOR =
  '.search-page-video .video-list, .video.i_wrapper.search-all-list .video-list';

function getOrCreateAnchor(container) {
  const ANCHOR_ID = 'bili-search-filter-anchor';
  let anchor = document.getElementById(ANCHOR_ID);
  if (!anchor) {
    anchor = document.createElement('div');
    anchor.id = ANCHOR_ID;
  }
  if (anchor.nextElementSibling !== container) {
    container.before(anchor);
  }
  return anchor;
}

/**
 * 高亮作者关键字
 */
function highlightAuthor(el, rawText, keyword) {
  if (!el || !keyword || el.dataset.highlighted) return;

  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const reg = new RegExp(`(${escaped})`, 'gi');

  el.innerHTML = rawText.replace(reg, '<em class="keyword">$1</em>');
  el.dataset.highlighted = 'true';
}

/**
 * 判断单张卡片是否命中关键词
 */
function checkCardMatch(card, keyword, filterFields) {
  if (!card || !keyword) return false;

  let isMatch = false;

  for (const fieldKey of filterFields) {
    const selector = FILTER_FIELD_SELECTORS[fieldKey];
    if (!selector) continue;

    const el = card.querySelector(selector);
    if (!el) continue;

    if (fieldKey === 'title' && el.querySelector('em')) {
      isMatch = true;
      continue;
    }

    const text = el.textContent || '';
    if (fuzzyIncludes(text, keyword)) {
      fieldKey === 'author' && highlightAuthor(el, text, keyword);
      isMatch = true;
    }
  }

  return isMatch;
}

/**
 * 隐藏未命中的卡片并收集匹配与过滤结果
 */
function partitionCards(cards, keyword, filterFields) {
  const filtered = [];
  const matched = [];

  for (const card of cards) {
    const isMatch = checkCardMatch(card, keyword, filterFields);
    if (isMatch) {
      card.style.display = '';
      matched.push(card);
    } else {
      card.style.display = 'none';
      filtered.push(card);
    }
  }

  return { filtered, matched };
}

/**
 * 检查变动节点中是否包含视频列表或卡片元素
 */
function isCardMutation(mutation) {
  if (mutation.addedNodes.length === 0) return false;

  for (const node of mutation.addedNodes) {
    if (node.nodeType !== 1) continue;
    if (node.querySelector?.('.bili-video-card, .video-list')) {
      return true;
    }
  }

  return false;
}

/**
 * 视频卡片过滤
 */
export function useCardFilter(config) {
  const teleportTarget = shallowRef(null);
  const isShowingAll = ref(false);
  const filteredCards = shallowRef([]);
  const matchedCards = shallowRef([]);

  /**
   * 还原所有被隐藏卡片的可见性
   */
  function restoreFilteredCards(show = true) {
    const targetDisplay = show ? '' : 'none';
    const useOpacity = show && (config.value?.enableRestoredCardOpacity ?? true);
    filteredCards.value.forEach((card) => {
      card.style.display = targetDisplay;
      card.classList.toggle('bili-magic-restored-card', useOpacity);
    });
  }

  /**
   * 彻底重置为无过滤状态
   */
  function resetCards(cards) {
    filteredCards.value.forEach((card) => {
      card.style.display = '';
      card.classList.remove('bili-magic-restored-card');
    });
    filteredCards.value = [];
    matchedCards.value = cards;
    isShowingAll.value = false;
  }

  let observer = null;

  async function startObserver() {
    if (observer) return;

    const target = await waitElement('.search-content');
    if (!target) return;

    observer = new MutationObserver((mutations) => {
      if (mutations.some(isCardMutation)) {
        debouncedScan();
      }
    });

    observer.observe(target, {
      childList: true,
      subtree: true,
    });
  }

  /**
   * 切换临时查看全部已过滤卡片
   */
  function toggleRestore() {
    isShowingAll.value = !isShowingAll.value;
    restoreFilteredCards(isShowingAll.value);
  }

  /**
   * 执行卡片扫描
   */
  function scanCards() {
    const container = document.querySelector(CARD_CONTAINER_SELECTOR);
    if (!container) return;

    const cards = Array.from(container.children);
    if (cards.length === 0) return;

    teleportTarget.value = getOrCreateAnchor(container);

    const keyword = getSearchKeyword();
    const isWhitelisted = isKeywordWhitelisted(keyword, config.value.whitelistKeywords);

    if (!config.value?.enableListFilter || !keyword || isWhitelisted) {
      resetCards(cards);
      return;
    }

    isShowingAll.value = false;

    const res = partitionCards(cards, keyword, config.value?.filterFields);

    filteredCards.value = res.filtered;
    matchedCards.value = res.matched;
  }

  const debouncedScan = debounce(scanCards, 150);

  watch(() => config.value, scanCards, { deep: true });

  const init = () => {
    startObserver().then();
    scanCards();
  };

  onMounted(() => {
    if (document.readyState === 'complete') {
      init();
    } else {
      window.addEventListener('load', init, { once: true });
    }
  });

  return {
    teleportTarget,
    isShowingAll,
    filteredCards,
    matchedCards,
    toggleRestore,
  };
}
