import { name } from '../package.json';

export const STORAGE_NAMESPACE = name;

export const POD_MODE = {
  LIST: 'LIST',
  CARD: 'CARD',
};

export const POD_TYPE = {
  EPISODE: 'EPISODE',
  COLLECTION: 'COLLECTION',
  SERIES: 'SERIES',
};

export const SORT_MODE = {
  DEFAULT: 'DEFAULT_ASC',
  DEFAULT_ASC: 'DEFAULT_ASC',
  DEFAULT_DESC: 'DEFAULT_DESC',
  TIME_DESC: 'TIME_DESC',
  TIME_ASC: 'TIME_ASC',
  VIEWS_DESC: 'VIEWS_DESC',
  VIEWS_ASC: 'VIEWS_ASC',
  DANMAKUS_DESC: 'DANMAKUS_DESC',
  DANMAKUS_ASC: 'DANMAKUS_ASC',
};

export const CTRL_ACTION = {
  PREV: 'PREV',
  NEXT: 'NEXT',
};

export const SHUFFLE_SCOPE = {
  ALL: 'ALL',
  GROUP: 'GROUP',
};

export const DEFAULT_SETTINGS = {
  /* 自动切集开关 */
  autoPlayNext: true,
  /* 随机播放开关 */
  shuffle: false,
  /* 随机播放范围 */
  shuffleScope: SHUFFLE_SCOPE.ALL,
  /* 当前视频分 P 播完即停止 */
  stopOnGroupEnd: true,
  /* 切集自动定位高亮位置 */
  scrollActiveOnClick: true,
  /* 排序切换自动定位高亮位置（关闭则回到顶部） */
  scrollToActiveOnSort: true,
  /* 上一集快捷键 */
  hotkeyPrev: '[',
  /* 下一集快捷键 */
  hotkeyNext: ']',
  /* 列表排序规则 */
  sortMode: SORT_MODE.TIME_DESC,
};

export const SORT_OPTIONS = [
  {
    label: '官方排序',
    value: 'GROUP_DEFAULT',
    children: [
      { label: '升序', value: SORT_MODE.DEFAULT_ASC },
      { label: '降序', value: SORT_MODE.DEFAULT_DESC },
    ],
  },
  {
    label: '发布时间',
    value: 'GROUP_TIME',
    children: [
      { label: '最新发布', value: SORT_MODE.TIME_DESC },
      { label: '最早发布', value: SORT_MODE.TIME_ASC },
    ],
  },
  {
    label: '播放热度',
    value: 'GROUP_VIEWS',
    children: [
      { label: '最多播放', value: SORT_MODE.VIEWS_DESC },
      { label: '最少播放', value: SORT_MODE.VIEWS_ASC },
    ],
  },
  {
    label: '弹幕互动',
    value: 'GROUP_DANMAKUS',
    children: [
      { label: '最多弹幕', value: SORT_MODE.DANMAKUS_DESC },
      { label: '最少弹幕', value: SORT_MODE.DANMAKUS_ASC },
    ],
  },
];

export const SHUFFLE_SCOPE_OPTIONS = [
  { label: '全合集随机', value: SHUFFLE_SCOPE.ALL },
  { label: '仅当前分组', value: SHUFFLE_SCOPE.GROUP },
];
