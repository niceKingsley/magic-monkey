import { createApp } from 'vue';
import App from './src/App.vue';
import { waitElement } from '@shared/utils';
import { isWatchLaterRoute, observeUrlChange } from './src/helpers/router.js';
import { injectNativeHidingStyles } from './src/helpers/styles.js';

let appInstance = null;

/**
 * 初始化入口
 */
async function bootstrap() {
  if (isWatchLaterRoute()) {
    return;
  }

  injectNativeHidingStyles();

  const body = await waitElement('body');

  let mountNode = document.getElementById('bilibili-playlist-enhancer-app');
  if (!mountNode) {
    mountNode = document.createElement('div');
    mountNode.id = 'bilibili-playlist-enhancer-app';
    body.appendChild(mountNode);
  }

  if (appInstance) {
    appInstance.unmount();
  }

  appInstance = createApp(App);
  const vm = appInstance.mount(mountNode);

  // 监听切集自动触发重载
  observeUrlChange(() => {
    vm.loadPod();
  });
}

bootstrap();
