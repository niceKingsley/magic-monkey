import { SHUFFLE_SCOPE } from '@/constants';
import { toast } from '@shared/components/toast';

/**
 * 最大历史回溯深度
 */
const MAX_HISTORY_LENGTH = 50;

/**
 * 生成单集唯一标识符
 */
export const getEpisodeKey = (bvid, page) => `${bvid}_${Number(page || 1)}`;

/**
 * 获取当前播放项的唯一标识
 */
export const extractCurrentKey = (current) => {
  if (!current?.group?.bvid) return '';
  const page = current.episode?.page || current.page || 1;
  return getEpisodeKey(current.group.bvid, page);
};

/**
 * 根据随机范围筛选候选集
 */
export function filterCandidatesByScope(flatList, scope, activeBvid) {
  if (scope === SHUFFLE_SCOPE.GROUP && activeBvid) {
    return flatList.filter((item) => item.bvid === activeBvid);
  }
  return [...flatList];
}

/**
 * 构建可播放的候选 Key 列表（自动排除当前播放项）
 */
export function buildCandidateKeys(flatList, scope, curBvid, curKey) {
  const candidates = filterCandidatesByScope(flatList, scope, curBvid);
  return candidates.map((item) => getEpisodeKey(item.bvid, item.page)).filter((k) => k !== curKey);
}

/**
 * 从列表中随机挑选一项并返回选中项与剩余列表
 */
export function pickRandomKey(keys) {
  if (keys.length === 0) {
    return { selectedKey: null, remainingKeys: [] };
  }
  const randomIndex = Math.floor(Math.random() * keys.length);
  const selectedKey = keys[randomIndex];
  const remainingKeys = keys.filter((k) => k !== selectedKey);
  return { selectedKey, remainingKeys };
}

/**
 * 历史栈入栈（控制最大容量）
 */
export function pushHistoryStack(stack, key, max = MAX_HISTORY_LENGTH) {
  if (!key) return;
  stack.push(key);
  if (stack.length > max) {
    stack.shift();
  }
}

/**
 * 根据唯一 Key 检索对应视频分集对象
 */
export const findEpisodeByKey = (flatList, key) =>
  key ? flatList.find((ep) => getEpisodeKey(ep.bvid, ep.page) === key) || null : null;

/**
 * 解析并保障可用候选池
 */
function resolveCandidateKeys(unplayedPool, flatEpisodes, settings, curBvid, curKey) {
  const remainingKeys = unplayedPool.filter((k) => k !== curKey);
  if (remainingKeys.length > 0) {
    return remainingKeys;
  }

  const refreshedKeys = buildCandidateKeys(flatEpisodes, settings.shuffleScope, curBvid, curKey);

  if (refreshedKeys.length === 0 && settings.shuffleScope === SHUFFLE_SCOPE.GROUP) {
    toast.info('当前分 P 仅有 1 集，无法在分组内随机播放');
  }

  return refreshedKeys;
}

/**
 * 随机播放与未播候选池管理
 */
export function useShuffle({ settings, flatEpisodes, currentPlaying }) {
  /* 待播放候选池 */
  const unplayedPool = ref([]);
  /* 历史播放记录栈（用于精准回退上一首） */
  const historyStack = ref([]);

  const getCurrentBvid = () => currentPlaying.value?.group?.bvid || '';
  const getCurrentKey = () => extractCurrentKey(currentPlaying.value);

  const rebuildPool = () => {
    unplayedPool.value = buildCandidateKeys(
      flatEpisodes.value,
      settings.shuffleScope,
      getCurrentBvid(),
      getCurrentKey(),
    );
  };

  /**
   * 抽取下一个随机播放目标
   */
  const getNextShuffleTarget = () => {
    const curKey = getCurrentKey();
    const validKeys = resolveCandidateKeys(
      unplayedPool.value,
      flatEpisodes.value,
      settings,
      getCurrentBvid(),
      curKey,
    );

    const { selectedKey, remainingKeys } = pickRandomKey(validKeys);
    if (!selectedKey) return null;

    unplayedPool.value = remainingKeys;
    pushHistoryStack(historyStack.value, curKey);

    return findEpisodeByKey(flatEpisodes.value, selectedKey);
  };

  /**
   * 回溯上一首播放过的历史视频
   */
  const getPrevShuffleTarget = () => {
    const prevKey = historyStack.value.pop();
    return findEpisodeByKey(flatEpisodes.value, prevKey);
  };

  /**
   * 用户手动切集时的池子同步（从未播池中移除已被手动播放的视频）
   */
  const recordManualPlay = (target) => {
    if (!target) return;
    const curKey = getCurrentKey();
    const targetKey = getEpisodeKey(target.bvid, target.page || target.episode?.page);

    if (curKey && curKey !== targetKey) {
      pushHistoryStack(historyStack.value, curKey);
    }
    unplayedPool.value = unplayedPool.value.filter((k) => k !== targetKey);
  };

  /**
   * 快捷切换随机模式
   */
  const toggleShuffle = () => {
    settings.shuffle = !settings.shuffle;
    return settings.shuffle;
  };

  /**
   * 监听范围切换或合集数据变更，自动重建未播池
   */
  watch(
    () => [settings.shuffle, settings.shuffleScope, flatEpisodes.value.length],
    () => {
      if (settings.shuffle) {
        rebuildPool();
      }
    },
    { immediate: true },
  );

  /**
   * 当处于仅当前分组随机时，若切换至不同的分组视频，重新填充该组的分 P 池
   */
  watch(
    () => currentPlaying.value?.group?.bvid,
    (newBvid, oldBvid) => {
      const isGroupScope = settings.shuffleScope === SHUFFLE_SCOPE.GROUP;
      if (settings.shuffle && isGroupScope && newBvid !== oldBvid) {
        rebuildPool();
      }
    },
  );

  return {
    unplayedPool,
    historyStack,
    rebuildPool,
    getNextShuffleTarget,
    getPrevShuffleTarget,
    recordManualPlay,
    toggleShuffle,
  };
}
