/**
 * 已播视频轨迹状态管理
 */
export function usePlayedHistory({ activeBvid, activePage }) {
  /* 会话内已播放视频键名集合*/
  const playedKeys = ref(new Set());

  /**
   * 记录已播放视频
   */
  const recordPlayedVideo = (bvid, page) => {
    if (!bvid) return;
    const key = `${bvid}_${page || 1}`;
    if (!playedKeys.value.has(key)) {
      playedKeys.value = new Set(playedKeys.value.add(key));
    }
  };

  /**
   * 判断单个分集是否已被播放过
   */
  const isEpisodePlayed = (bvid, ep) => {
    if (!bvid || !ep) return false;
    const page = ep.page ?? ep.cid ?? 1;
    return playedKeys.value.has(`${bvid}_${page}`);
  };

  /**
   * 判断视频分组是否已全部播放完毕
   */
  const isGroupPlayed = (group) => {
    if (!group || !group.episodes?.length) return false;
    return group.episodes.every((ep) => isEpisodePlayed(group.bvid, ep));
  };

  watch(
    [activeBvid, activePage],
    ([bvid, page]) => {
      if (bvid) {
        recordPlayedVideo(bvid, page);
      }
    },
    { immediate: true },
  );

  return {
    isEpisodePlayed,
    isGroupPlayed,
  };
}
