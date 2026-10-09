import { readLiveConfig, readVideoConfig } from '@/composables/useConfig';
import { startLiveFilter } from '@/live';
import { startVideoFilter } from '@/video';
import { bootstrapApp } from '@shared/utils';
import App from './src/App';

const isLiveRoom =
  location.hostname === 'live.bilibili.com' && /^\/(?:blanc\/)?\d+\/?$/.test(location.pathname);

const locationStartsWith = (str) => location.pathname.startsWith(str);

const isVideoPage =
  location.hostname === 'www.bilibili.com' &&
  (locationStartsWith('/video/') ||
    locationStartsWith('/list/') ||
    locationStartsWith('/bangumi/play/') ||
    locationStartsWith('/cheese/play/'));

const isDanmakuPage = isLiveRoom || isVideoPage;

if (isVideoPage) {
  startVideoFilter(readVideoConfig);
}

if (isLiveRoom) {
  startLiveFilter(readLiveConfig);
}

if (isDanmakuPage) {
  await bootstrapApp({
    createApp,
    rootComponent: App,
    mountId: 'bilibili-danmaku-filter-root',
  });
}
