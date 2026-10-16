import { CTRL_ACTION } from '@/constants';
import { registerHotkeys } from '@shared/utils';

export { formatKeyboardKey } from '@shared/utils';

/**
 * 监听全局键盘事件实现默认常驻的自定义快捷键切集
 */
export function usePodHotkeys({ settings, handlePlayerCtrl }) {
  return registerHotkeys([
    {
      key: () => settings.hotkeyPrev,
      handler: () => handlePlayerCtrl?.(CTRL_ACTION.PREV),
    },
    {
      key: () => settings.hotkeyNext,
      handler: () => handlePlayerCtrl?.(CTRL_ACTION.NEXT),
    },
  ]);
}
