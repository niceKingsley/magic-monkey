import { getPathSegments, observeUrlChange, on, waitElement } from '@shared/utils';

const ATTR = 'data-magic-auto-expand';
const isMatchPath = (type) => ['all', 'video'].some((key) => type.includes(key));

let unbindClick = null;

function setAutoExpand(enable) {
  if (enable) {
    document.documentElement.setAttribute(ATTR, 'true');
  } else {
    document.documentElement.removeAttribute(ATTR);
  }
}

function useAutoExpandFilter(config) {
  const currentType = ref('');

  const onExpandClick = (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    const isExpanded = document.documentElement.getAttribute(ATTR) === 'true';
    document.documentElement.setAttribute(ATTR, isExpanded ? 'false' : 'true');
  };

  const bindButton = async () => {
    const expandEl = await waitElement('.i_button_more');
    if (!unbindClick) unbindClick = on(expandEl, 'click', onExpandClick, true);
  };

  const checkedExpand = () => {
    if (!config.value?.autoExpandMoreFilter) {
      currentType.value = '';
      setAutoExpand(false);
      unbindClick?.();
      unbindClick = null;
      return;
    }

    const [type] = getPathSegments();
    if (!isMatchPath(type)) {
      currentType.value = '';
      setAutoExpand(false);
      unbindClick?.();
      unbindClick = null;
      return;
    }

    if (currentType.value === type) return;

    currentType.value = type;
    setAutoExpand(true);
    void bindButton();
  };

  onMounted(() => observeUrlChange(checkedExpand));
  watch(() => config.value?.autoExpandMoreFilter, checkedExpand, { immediate: true });
}

export default useAutoExpandFilter;
