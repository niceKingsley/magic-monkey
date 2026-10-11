import { getPathSegments, observeUrlChange, on, once, waitElement } from '@shared/utils';

let unbindClick = null;

function reflow(element) {
  return element?.offsetHeight;
}

function useAutoExpandFilter(config) {
  const currentType = ref('');
  const currentExpand = ref(false);

  const toggleActive = () => {
    const svgEL = document.querySelector('.search-conditions svg');
    const conditions = document.querySelector('.more-conditions');
    if (!conditions) return;

    if (currentExpand.value) {
      svgEL?.classList.remove('rotate_n90');
      conditions.style.height = `${conditions.scrollHeight}px`;
      reflow(conditions);
      conditions.style.height = '0';
      currentExpand.value = false;
    } else {
      svgEL?.classList.add('rotate_n90');
      conditions.style.height = `${conditions.scrollHeight}px`;
      currentExpand.value = true;

      once(conditions, 'transitionend', () => {
        if (currentExpand.value) {
          conditions.style.height = 'auto';
        }
      });
    }
  };

  const onExpandClick = (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    toggleActive();
  };

  const checkedExpand = () => {
    if (!config.value?.autoExpandMoreFilter) {
      currentType.value = '';
      unbindClick?.();
      unbindClick = null;
      return;
    }

    const [type] = getPathSegments();
    const flag = ['all', 'video'].some((item) => type.includes(item));
    if (!flag) {
      unbindClick?.();
      unbindClick = null;
      currentType.value = '';
      return;
    }

    if (currentType.value === type) {
      return;
    } else {
      currentType.value = type;
    }
    currentExpand.value = false;
    void autoExpand();
  };

  const autoExpand = async () => {
    const expandEl = await waitElement('.i_button_more');
    if (!unbindClick) unbindClick = on(expandEl, 'click', onExpandClick, true);
    toggleActive();
  };

  onMounted(() => observeUrlChange(checkedExpand));
  watch(
    () => config.value?.autoExpandMoreFilter,
    () => {
      checkedExpand();
    },
    {
      immediate: true,
    },
  );
}

export default useAutoExpandFilter;
