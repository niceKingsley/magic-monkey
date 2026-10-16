import { getPathSegments, observeUrlChange, on, once, waitElement } from '@shared/utils';

let unbindClick = null;

const isMatchPath = (type) => ['all', 'video'].some((key) => type.includes(key));
const reflow = (el) => el?.offsetHeight;

function animateHeight(el, expanded) {
  el.style.height = `${el.scrollHeight}px`;
  if (expanded) {
    once(el, 'transitionend', () => {
      el.classList.add('is-expanded');
      el.style.height = '';
    });
  } else {
    el.classList.remove('is-expanded');
    reflow(el);
    el.style.height = '0';
  }
}

function useAutoExpandFilter(config) {
  const currentType = ref('');
  const currentExpand = ref(false);

  const cleanup = () => {
    currentType.value = '';
    unbindClick?.();
    unbindClick = null;
  };

  const setExpanded = (expanded, animated = false) => {
    const conditions = document.querySelector('.more-conditions');
    if (!conditions) return;

    currentExpand.value = expanded;
    document.querySelector('.search-conditions svg')?.classList.toggle('rotate_n90', expanded);

    if (animated) {
      animateHeight(conditions, expanded);
      return;
    }

    conditions.classList.toggle('is-expanded', expanded);
    conditions.style.height = expanded ? '' : '0';
  };

  const onExpandClick = (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    setExpanded(!currentExpand.value, true);
  };

  const autoExpand = async () => {
    const expandEl = await waitElement('.i_button_more');
    if (!unbindClick) unbindClick = on(expandEl, 'click', onExpandClick, true);
    setExpanded(true, false);
  };

  const checkedExpand = () => {
    if (!config.value?.autoExpandMoreFilter) {
      cleanup();
      if (currentExpand.value) setExpanded(false, true);
      return;
    }

    const [type] = getPathSegments();
    if (!isMatchPath(type)) {
      cleanup();
      return;
    }

    if (currentType.value === type && currentExpand.value) return;

    currentType.value = type;
    void autoExpand();
  };

  onMounted(() => observeUrlChange(checkedExpand));
  onUnmounted(cleanup);
  watch(() => config.value?.autoExpandMoreFilter, checkedExpand, { immediate: true });
}

export default useAutoExpandFilter;
