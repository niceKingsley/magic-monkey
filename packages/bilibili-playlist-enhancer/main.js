import { isWatchLaterRoute } from '@/helpers/router';
import { injectNativeHidingStyles } from '@/helpers/styles';
import { bootstrapApp, observeUrlChange } from '@shared/utils';
import App from './src/App';

if (!isWatchLaterRoute()) {
  injectNativeHidingStyles();

  await bootstrapApp({
    createApp,
    rootComponent: App,
    mountId: 'bilibili-playlist-enhancer-app',
    onMounted(vm) {
      observeUrlChange(() => {
        vm.loadPod();
      });
    },
  });
}
