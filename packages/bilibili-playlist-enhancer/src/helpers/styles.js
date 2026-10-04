export function injectNativeHidingStyles() {
  GM_addStyle(`
    .view-mode,
    #slide_ad,
    .bpx-player-ctrl-setting-handoff {
      display: none !important;
    }
    .list-playorder-btn.list-tool-btn,
    #playlist-video-action-list,
    .action-list-item-wrap,
    .video-pod__body {
      overflow: hidden !important;
    }
    .action-list-item-wrap,
    .video-pod__body .pod-item {
      visibility: hidden !important;
    }
  `);
}
