export function injectNativeHidingStyles() {
  GM_addStyle(`
    .view-mode,
    #slide_ad,
    .list-playorder-btn,
    .bpx-player-ctrl-setting-handoff {
      display: none !important;
    }
    #playlist-video-action-list,
    .action-list-item-wrap,
    .video-pod__body {
      overflow: hidden !important;
    }
    .action-list-item-wrap,
    .pod-slide,
    .video-pod__body .pod-item {
      visibility: hidden !important;
    }
  `);
}
