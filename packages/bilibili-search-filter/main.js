import { bootstrapApp } from '@shared/utils';
import App from './src/App';

const isSearchPage = location.hostname === 'search.bilibili.com';

if (isSearchPage) {
  await bootstrapApp({
    createApp,
    rootComponent: App,
    mountId: 'bilibili-search-filter-root',
  });
}
