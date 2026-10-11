export { name as STORAGE_NAMESPACE, version as SCRIPT_VERSION } from '../package.json';

export const DEFAULT_CONFIG = {
  enableListFilter: true,
  enableRestoredCardOpacity: true,
  showFilterBar: true,
  autoExpandMoreFilter: false,
  filterFields: ['title', 'author'],
  whitelistKeywords: [],
};

export const FILTER_FIELD_SELECTORS = {
  title: '.bili-video-card__info--tit',
  author: '.bili-video-card__info--author',
};
