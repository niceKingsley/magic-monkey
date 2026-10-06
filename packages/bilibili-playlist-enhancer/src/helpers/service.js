import {
  formatCount,
  formatDate,
  formatDuration,
  getUrlParams,
  http,
  isArray,
} from '@shared/utils';
import { POD_MODE, POD_TYPE } from '../constants.js';

/**
 * 从当前 URL 中提取视频的 BV 号
 */
export function getCurrentBvid() {
  const { pathname, search } = window.location;

  // 匹配标准 /video/BVxxxx
  const pathMatch = pathname.match(/\/video\/(BV[a-zA-Z0-9]+)/i);
  if (pathMatch) {
    return pathMatch[1];
  }

  // 匹配播放厅模式下的 /list/?bvid=BVxxxx
  const urlParams = new URLSearchParams(search);
  const paramBvid = urlParams.get('bvid');
  if (paramBvid && /^BV[a-zA-Z0-9]+$/i.test(paramBvid)) {
    return paramBvid;
  }

  return null;
}

/**
 * 获取当前播放的分 P 序号
 */
export function getCurrentPage() {
  const { p } = getUrlParams();
  return parseInt(p || '1', 10);
}

/**
 * 分页拉取播放厅系列或 UP 主空间全部视频
 */
async function fetchMedialistEpisodes(type, bizId) {
  const rawList = [];
  const seenIds = new Set();
  let hasMore = true;
  let lastOid;
  let safetyCounter = 30;

  while (hasMore && safetyCounter > 0) {
    safetyCounter -= 1;
    const params = {
      type,
      biz_id: bizId,
      ps: 100,
      otype: 2,
      mobi_app: 'web',
      ...(lastOid ? { oid: lastOid } : {}),
    };

    const res = await http({
      url: 'https://api.bilibili.com/x/v2/medialist/resource/list',
      params,
    });

    const mediaList = res?.data?.media_list;
    if (!mediaList || res?.code !== 0) break;

    for (const item of mediaList) {
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        rawList.push(item);
      }
    }

    hasMore = !!(res.data.has_more && mediaList.length > 0);
    lastOid = mediaList[mediaList.length - 1]?.id;
  }

  if (!rawList.length) return null;

  return {
    sections: rawList,
    seasonSections: [],
    hasMultipleSections: false,
    currentSectionId: '',
    mode: POD_MODE.CARD,
    type: POD_TYPE.SERIES,
  };
}

/**
 * 拉取普通播放页的视频详情与合集数据
 */
async function fetchVideoEpisodes(bvid) {
  const res = await http({
    url: 'https://api.bilibili.com/x/web-interface/view',
    params: { bvid },
  });

  if (res?.code !== 0 || !res?.data) {
    return null;
  }

  const { data } = res;
  const rawSections = data.ugc_season?.sections || [];
  if (rawSections.length > 0) {
    const seasonSections = rawSections.map((s) => {
      const sectionId = String(s.id || s.season_id || '');
      const title = s.title || '';
      return {
        id: sectionId,
        title,
        label: title,
        value: sectionId,
        episodes: s.episodes || [],
      };
    });

    const currentSection =
      seasonSections.find((s) => s.episodes.some((ep) => ep.bvid === bvid)) || seasonSections[0];

    return {
      sections: currentSection?.episodes || [],
      seasonSections,
      hasMultipleSections: seasonSections.length > 1,
      currentSectionId: currentSection?.value || '',
      mode: POD_MODE.LIST,
      type: POD_TYPE.COLLECTION,
    };
  }

  const pages = data.pages || [];
  if (pages.length <= 1) return null;

  return {
    sections: pages,
    seasonSections: [],
    hasMultipleSections: false,
    currentSectionId: '',
    mode: POD_MODE.LIST,
    type: POD_TYPE.EPISODE,
  };
}

/**
 * 从 /list/{mid} 中提取 UP 主 UID
 */
function getMediaListMid() {
  const { pathname } = window.location;
  const match = pathname.match(/\/list\/(?:ml)?(\d+)/i);
  return match ? match[1] : null;
}

/**
 * 统一获取选集、合集、系列数据
 */
export async function fetchSeasonInfo(bvid, sid) {
  try {
    if (sid) {
      return await fetchMedialistEpisodes(5, sid);
    }

    const upMid = getMediaListMid();
    if (upMid) {
      return await fetchMedialistEpisodes(1, upMid);
    }

    return await fetchVideoEpisodes(bvid);
  } catch (err) {
    console.error('[bilibili-playlist-enhancer] 获取合集信息失败:', err);
    return null;
  }
}

/**
 * 构造视频分集列表（自动兼容单 P 与多 P）
 */
function buildEpisodes({
  pages,
  title,
  duration,
  isGroupActive,
  currentPage,
  fallbackCid,
  fallbackPage = 1,
}) {
  const defaultPage = fallbackPage || 1;
  // 若分集情况，兜底用自身数据生成单集项
  const list =
    isArray(pages) && pages.length > 0
      ? pages
      : [{ cid: fallbackCid, page: defaultPage, part: title, duration }];
  return list.map((pageItem, pIdx) => {
    const pageNum = pageItem.page || defaultPage || pIdx + 1;
    return {
      cid: pageItem.cid || pageItem.id,
      page: pageNum,
      rawEpIndex: pIdx,
      title: pageItem.part || pageItem.title || title,
      duration: formatDuration(pageItem.duration || duration),
      isActive: isGroupActive && Number(pageNum) === Number(currentPage || 1),
    };
  });
}

/**
 * 提取原始数据标准化
 */
function extractRawItem(item, currentBvid, index) {
  return {
    aid: item.aid || item.id,
    type: item.type,
    bvid: item.bvid || item.bv_id || currentBvid,
    title: item.title || item.part,
    cover: item.cover || item.pic || item.arc?.pic || '',
    // cover: (item.cover || item.pic || item.arc?.pic) + '@320w_200h_1c.webp' || '',
    pubdate: formatDate(item.arc?.pubdate || item.pubtime || item.pubdate || 0),
    duration: item.arc?.duration || item.duration || 0,
    views: formatCount(item.arc?.stat?.view ?? item.stat?.view ?? item.cnt_info?.play ?? 0),
    danmakus: formatCount(
      item.arc?.stat?.danmaku ?? item.stat?.danmaku ?? item.cnt_info?.danmaku ?? 0,
    ),
    rawViews: Number(item.arc?.stat?.view ?? item.stat?.view ?? item.cnt_info?.play ?? 0),
    rawDanmakus: Number(
      item.arc?.stat?.danmaku ?? item.stat?.danmaku ?? item.cnt_info?.danmaku ?? 0,
    ),
    pubTimestamp: item.pubdate || item.arc?.pubdate || item.pubtime || 0,
    page: item.page,
    rawIndex: index,
  };
}

/**
 * 统一数据序列化：抹平接口的字段结构差异
 */
export function processSeasonData(podType, rawList = [], currentBvid = '', currentPage = 1) {
  const isEpisode = podType === POD_TYPE.EPISODE;
  return rawList.map((item, idx) => {
    const raw = extractRawItem(item, currentBvid, idx);
    const isGroupActive = raw.bvid === currentBvid;
    const hasPages = isArray(item.pages) && item.pages.length > 1;

    const episodes = buildEpisodes({
      pages: hasPages ? item.pages : null,
      title: raw.title,
      duration: raw.duration,
      isGroupActive,
      currentPage,
      fallbackCid: raw.cid || item.cid,
      fallbackPage: raw.page,
    });
    const isActive = isEpisode
      ? isGroupActive && Number(raw.page) === Number(currentPage)
      : isGroupActive;

    return {
      ...raw,
      isActive,
      isMultiPage: hasPages,
      episodes,
    };
  });
}
