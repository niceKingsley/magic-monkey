import { POD_TYPE } from '../constants.js';
import { isFunction, on, waitElement } from '@shared/utils';
import { playerState } from '@/helpers/playerBridge.js';

const correctionOffset = 17;

function getPodTargetSelectors(podType) {
  const isSeries = toValue(podType) === POD_TYPE.SERIES;
  return {
    playlistContainerRight: isSeries ? '.playlist-container--right' : '.right-container-inner',
    listBody: isSeries ? '#playlist-video-action-list' : '.video-pod__body',
    actionHeader: isSeries ? '.action-list-header' : '.video-pod__header .right',
    activeActionHeader: isSeries
      ? '.action-list-header.action-list-header-folded'
      : '.video-pod.expanded',
  };
}

/**
 * 计算播放厅模式或普通合集模式下的最大可用高度
 */
function calculateMaxHeight(podType, wrapEl, defaultHeight) {
  if (toValue(podType) !== POD_TYPE.SERIES) {
    return defaultHeight;
  }
  const bodyHeight = wrapEl.querySelector('#playlist-video-action-list-body')?.clientHeight || 0;
  const topHeight = wrapEl.querySelector('.action-list-body-top')?.clientHeight || 0;
  return Math.max(bodyHeight - (topHeight + 24), 0);
}

/**
 * 监听播放厅模式下可能引起侧边栏尺寸变化的关联容器
 */
function observeSeriesContainers(ro, wrapEl) {
  const danmakuBox = wrapEl.querySelector('.danmaku-box');
  const actionListContainer = wrapEl.querySelector('.action-list-container');
  if (danmakuBox) ro.observe(danmakuBox);
  if (actionListContainer) ro.observe(actionListContainer);
}

/**
 * 累加计算目标节点相对于容器顶部的物理距离
 */
function calculateRelativeOffset(targetEl, containerEl) {
  let offset = 0;
  let node = targetEl;
  while (node && node !== containerEl) {
    offset += node.offsetTop;
    node = node.offsetParent;
  }
  return offset;
}

/**
 * 高亮激活项居中滚动
 */
function alignActiveItem(container, smooth) {
  const activeEl =
    container.querySelector('.episode.is-active') || container.querySelector('.header.is-active');
  if (!activeEl?.clientHeight || !container.clientHeight) {
    return false;
  }

  const offsetTop = calculateRelativeOffset(activeEl, container);
  const targetTop = offsetTop - (container.clientHeight - activeEl.clientHeight) / 2;

  container.scrollTo({
    top: Math.max(0, targetTop),
    behavior: smooth ? 'smooth' : 'auto',
  });
  return true;
}

/**
 * 监听容器高度展开并在稳定后自动注销
 */
function observeContainerSettling(container, onSettle) {
  const ro = new ResizeObserver(() => {
    if (onSettle()) {
      ro.disconnect();
    }
  });
  ro.observe(container);
}

/**
 * 滚动到高亮位置居中
 */
export function scrollActiveItem(container, smooth = true) {
  if (!container) return;

  if (smooth) {
    nextTick(() => alignActiveItem(container, true));
    return;
  }

  observeContainerSettling(container, () => alignActiveItem(container, false));
}

export function setBilibiliVideoPodMinHeight() {
  document.querySelector(getPodTargetSelectors(POD_TYPE.COLLECTION).listBody).style.minHeight =
    '250px';
}

/**
 * 计算合集折叠或展开状态下的目标位置
 */
function calculateCollectionToggleTargetLayout(
  podType,
  isExpanded,
  currentTop,
  hasMultipleSections,
) {
  if (podType === POD_TYPE.COLLECTION) {
    const toolbar = document.querySelector('#arc_toolbar_report');
    const card = document.querySelector('.rec-list')?.firstElementChild;
    const aboveModule = document.querySelector('.video-pod-above-modules');
    const podBody = document.querySelector(getPodTargetSelectors(podType).listBody);

    const s = toolbar?.getBoundingClientRect().bottom ?? 0;
    const c = card?.getBoundingClientRect().top ?? 0;
    const l = aboveModule?.getBoundingClientRect().height || aboveModule?.scrollHeight || 0;
    const n = podBody?.clientHeight ?? 0;

    const slideHeight = toValue(hasMultipleSections)
      ? document.querySelector('.video-pod__slide')?.clientHeight || 0
      : 0;

    const totalOffset = correctionOffset + slideHeight;
    const diff = s && c ? s - c : 0;
    const baseHeight = isExpanded ? Math.max(250, Math.floor(n + diff + l)) : 250;
    const targetTop = isExpanded ? currentTop - l : currentTop + l;

    return {
      targetHeight: baseHeight + totalOffset,
      targetTop,
    };
  }

  if (podType === POD_TYPE.SERIES) {
    const listEl = document.querySelector('#playlist-video-action-list');
    let targetTop = listEl
      ? listEl.getBoundingClientRect().top + window.scrollY - correctionOffset
      : currentTop;
    const bodyBottomHeight = document.querySelector('.action-list-body-bottom')?.clientHeight ?? 0;

    const targetHeight = isExpanded ? 0 : bodyBottomHeight + correctionOffset;
    return { targetHeight, targetTop };
  }

  return {
    targetHeight: 250,
    targetTop: currentTop,
  };
}

/**
 * 监听并同步原生侧边栏的绝对对齐位置
 */
export async function watchPositionSync(podType, hostEl, onPositionUpdate, hasMultipleSections) {
  const currentType = toValue(podType);
  const selectors = getPodTargetSelectors(currentType);
  const wrapEl = await waitElement(selectors.playlistContainerRight);
  const targetEl = await waitElement(selectors.listBody, { el: wrapEl });
  let isAnimating = false;
  const getHost = () => (isFunction(hostEl) ? hostEl() : toValue(hostEl));

  const updatePosition = (force = false) => {
    if (isAnimating && !force) return;
    const host = getHost();
    if (!targetEl.isConnected || (host && !host.isConnected)) return;

    const {
      top: targetTop,
      left: targetLeft,
      width,
      height: targetHeight,
    } = targetEl.getBoundingClientRect();
    const slideEl = toValue(hasMultipleSections)
      ? document.querySelector('.video-pod__slide')
      : null;

    const slideHeight = slideEl?.clientHeight || 0;
    let height = calculateMaxHeight(currentType, wrapEl, targetHeight) + slideHeight;
    height = height ? height + correctionOffset : 0;

    const top =
      targetTop +
      window.scrollY -
      slideHeight -
      (currentType === POD_TYPE.EPISODE ? 0 : correctionOffset);
    const left = targetLeft + window.scrollX;

    onPositionUpdate({
      top,
      left,
      width,
      height,
    });
  };

  let isDestroyed = false;
  const ro = new ResizeObserver(() => updatePosition(false));
  ro.observe(wrapEl);

  waitElement('#bilibili-player, .player-wrap, .left-container', { timeout: 5000 })
    .then((playerEl) => {
      if (!isDestroyed && playerEl) {
        ro.observe(playerEl);
      }
    })
    .catch(() => {});

  if (currentType === POD_TYPE.SERIES) {
    observeSeriesContainers(ro, wrapEl);
  }

  const offResize = on(window, 'resize', () => updatePosition(false));

  const cleanup = () => {
    isDestroyed = true;
    ro.disconnect();
    offResize();
  };

  cleanup.setAnimating = (val) => {
    isAnimating = val;
  };
  cleanup.updatePosition = updatePosition;
  cleanup.destroy = cleanup;
  cleanup.wrapEl = wrapEl;
  cleanup.targetEl = targetEl;

  return cleanup;
}

/**
 * 监听原生顶部的折叠/展开按钮
 */
export async function listenNativeToggle(podType, onToggle) {
  const currentType = toValue(podType);
  if (currentType === POD_TYPE.EPISODE) return;
  const actionHeader = getPodTargetSelectors(currentType).actionHeader;

  const nativeToggleBtn = await waitElement(actionHeader);
  if (!nativeToggleBtn) return;

  const handler = () => {
    // 合集宽屏模式下禁止点击
    const { isWide } = playerState();
    if (isWide && currentType === POD_TYPE.COLLECTION) return;

    requestAnimationFrame(() => {
      const expanded = document.querySelector(
        getPodTargetSelectors(currentType).activeActionHeader,
      );
      onToggle?.(!!expanded);
    });
  };

  return on(nativeToggleBtn, 'click', handler, { capture: true });
}

/**
 * 面板位置与尺寸和原生同步浮动
 */
export function usePositionSync(podType, rootRef, onModeChange, hasMultipleSections) {
  const position = ref({ top: 0, left: 0, width: 0, height: 0 });
  const isAnimating = ref(false);
  let cleanupTracker = null;
  let cleanupResize = null;

  const containerStyle = computed(() => ({
    top: `${position.value.top}px`,
    left: `${position.value.left}px`,
    width: `${position.value.width}px`,
    height: `${position.value.height}px`,
  }));

  const videoBodyStyle = computed(() => ({
    width: `${position.value.width}px`,
  }));

  const stopSync = () => {
    cleanupTracker?.destroy?.();
    cleanupResize?.();
    cleanupTracker = null;
    cleanupResize = null;
    isAnimating.value = false;
  };

  const startSync = async (type) => {
    stopSync();
    const resolvedType = toValue(type);
    if (!resolvedType) return;

    cleanupTracker = await watchPositionSync(
      resolvedType,
      rootRef,
      (newPos) => {
        position.value = newPos;
      },
      hasMultipleSections,
    );

    cleanupResize = await listenNativeToggle(resolvedType, (isExpanded) => {
      isAnimating.value = true;
      cleanupTracker.setAnimating(true);

      if (podType.value === POD_TYPE.COLLECTION && !isExpanded) setBilibiliVideoPodMinHeight();

      const { targetHeight, targetTop } = calculateCollectionToggleTargetLayout(
        resolvedType,
        isExpanded,
        position.value.top,
        hasMultipleSections,
      );

      position.value = {
        ...position.value,
        top: targetTop,
        height: targetHeight,
      };
      onModeChange?.(isExpanded);

      setTimeout(() => {
        cleanupTracker?.setAnimating(false);
        isAnimating.value = false;
      }, 300);
    });
  };

  return {
    isAnimating,
    containerStyle,
    videoBodyStyle,
    startSync,
  };
}
