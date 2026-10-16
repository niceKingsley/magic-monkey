import { toast } from '@shared/components/toast';
import { registerHotkeys } from '@shared/utils';

function switchPage(direction) {
  const label = direction === 'prev' ? '上一页' : '下一页';
  const target = document.querySelector(`.vui_pagenation--btn-side[aria-label*="${label}"]`);

  if (!target) return false;
  if (target.disabled) {
    toast.info(`已经是${label}了`);
    return false;
  }

  target.click();
  return true;
}

/**
 * 监听搜索页翻页快捷键
 */
export function usePaginationHotkeys(config) {
  onMounted(() => {
    const cleanup = registerHotkeys([
      {
        key: () => config.value?.hotkeyPrevPage,
        handler: () => switchPage('prev'),
      },
      {
        key: () => config.value?.hotkeyNextPage,
        handler: () => switchPage('next'),
      },
    ]);

    onUnmounted(() => cleanup?.());
  });
}
