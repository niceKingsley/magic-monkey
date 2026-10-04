import { isFunction, on } from '@shared/utils';
import { CTRL_ACTION, POD_TYPE } from '../constants.js';

/**
 * 向上遍历获取原生播放列表挂载的 Vue 实例
 */
function getNativeInnerVm() {
  let vm = document.querySelector('.multip-list-item-inner')?.__vue__;

  let switchVideoVm = null;
  let playlistRouteVm = null;

  while (vm) {
    if (!switchVideoVm && isFunction(vm.switchVideo)) {
      switchVideoVm = vm;
    }

    if (!playlistRouteVm && isFunction(vm.handlePlaylistRoute)) {
      playlistRouteVm = vm;
    }

    if (switchVideoVm && playlistRouteVm) {
      break;
    }

    vm = vm.$parent;
  }

  return {
    switchVideoVm,
    playlistRouteVm,
  };
}

export const playerState = () => {
  const player = unsafeWindow?.player;
  if (!player) return {};

  return {
    pause: () => player.pause?.(),
    reload: (payload) => player.reload(payload),
    autoPlayNext: (flag = true) => player.setHandoff(flag ? 0 : 2),
    isAutoPlayNext: () => player.getHandoff() === 0,
    isWide: unsafeWindow?.isWide,
  };
};

/**
 * 集数切换
 */
export function executeVideoSwitch(podType, payload) {
  if (podType === POD_TYPE.SERIES) {
    const { switchVideoVm, playlistRouteVm } = getNativeInnerVm();
    if (switchVideoVm) {
      switchVideoVm.switchVideo({
        ...payload,
        type: 2,
      });

      // 当前视频不在原来已加载的分页数据中时，手动同步 URL 刷新数据
      if (!playlistRouteVm.curResourceListItem) {
        playlistRouteVm.$router.push({
          query: {
            ...playlistRouteVm.$route.query,
            oid: payload.aid,
            bvid: payload.bvid,
            p: payload.p,
          },
        });
      }
      return;
    }
  }

  playerState().reload(payload);
}

/**
 * 监听播放器控制器上下集按钮
 */
export function interceptPlayerControls(callback) {
  return on(
    document,
    'click',
    (event) => {
      const bottomLeft = event.target?.closest?.('.bpx-player-control-bottom-left');
      if (!bottomLeft) return;

      const btn = event.target?.closest?.('.bpx-player-ctrl-prev, .bpx-player-ctrl-next');
      if (!btn) return;

      event.stopImmediatePropagation();
      event.preventDefault();

      const action = btn.classList.contains('bpx-player-ctrl-prev')
        ? CTRL_ACTION.PREV
        : CTRL_ACTION.NEXT;

      callback?.(action, event);
    },
    { capture: true },
  );
}

/**
 * 监听播放器视频播放结束
 */
export function interceptPlayerEnding(onEndedHandler) {
  return on(
    document,
    'ended',
    (event) => {
      if (event.target?.tagName !== 'VIDEO') return;
      onEndedHandler?.(event);
    },
    { capture: true },
  );
}
