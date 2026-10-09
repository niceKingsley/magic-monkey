import { isBlocked } from '@/core/matcher';
import { checkLiveDuplicate } from './duplication-shield';

const DANMAKU_CONTAINER_SELECTOR = '.danmaku-item-container';

/**
 * 向上定位真正的弹幕主体元素
 */
function findDanmakuElement(node) {
  if (!node) return null;
  if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('bili-danmaku-x-dm')) {
    return node;
  }
  return node.parentElement ? node.parentElement.closest('.bili-danmaku-x-dm') : null;
}

/**
 * 处理单个弹幕 DOM 节点的过滤
 */
function handleDanmakuNode(node, configGetter) {
  const dmNode = findDanmakuElement(node);
  if (!dmNode || dmNode.hasAttribute('data-dm-blocked')) return;

  const config = configGetter();
  if (!config?.enabled) return;

  const text = dmNode.textContent?.trim();
  if (!text || dmNode.dataset.dmHandledText === text) return;

  dmNode.dataset.dmHandledText = text;

  if (isBlocked(text, config.blacklist)) {
    console.log('%c[黑名单拦截]', 'color: #ff4d4f; font-weight: bold;', text);
    dmNode.setAttribute('data-dm-blocked', 'true');
    return;
  }

  if (
    checkLiveDuplicate(text, {
      threshold: config.mergeThreshold,
      windowSeconds: config.mergeWindow,
    })
  ) {
    console.log('%c[防刷屏拦截]', 'color: #faad14; font-weight: bold;', text);
    dmNode.setAttribute('data-dm-blocked', 'true');
  }
}

/**
 * 分发并处理单条 DOM 变更记录
 */
function processMutation(mutation, configGetter) {
  if (mutation.type === 'childList') {
    for (const added of mutation.addedNodes) {
      handleDanmakuNode(added, configGetter);
    }
    return;
  }
  if (mutation.type === 'characterData') {
    handleDanmakuNode(mutation.target, configGetter);
    return;
  }
  if (
    mutation.type === 'attributes' &&
    mutation.target.classList?.contains('bili-danmaku-x-show')
  ) {
    handleDanmakuNode(mutation.target, configGetter);
  }
}

/**
 * 监听弹幕容器变化
 */
function mountObserver(container, state, configGetter) {
  if (state.activeContainer === container) return;
  if (state.observer) state.observer.disconnect();

  state.activeContainer = container;

  state.observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      processMutation(m, configGetter);
    }
  });

  state.observer.observe(container, {
    childList: true,
    characterData: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class'],
  });

  console.info('直播间弹幕屏蔽监听已挂载至容器');
}

let isStyleInjected = false;

/**
 * 启动直播间弹幕屏蔽
 */
export function startLiveFilter(configGetter) {
  if (!isStyleInjected) {
    GM_addStyle(`
      .bili-danmaku-x-dm[data-dm-blocked="true"] {
        display: none !important;
      }
    `);
    isStyleInjected = true;
  }

  const state = {
    activeContainer: null,
    observer: null,
  };

  const syncContainer = () => {
    if (state.activeContainer?.isConnected) {
      return;
    }

    const container = document.querySelector(DANMAKU_CONTAINER_SELECTOR);
    if (container && container !== state.activeContainer) {
      console.info('检测到弹幕容器就绪/重置，正在重新绑定...');
      mountObserver(container, state, configGetter);
    }
  };

  setInterval(syncContainer, 1000);
}
