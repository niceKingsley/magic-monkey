import vue from '@vitejs/plugin-vue';
import { cdn, defineConfig, monkey } from 'magic-monkey-cli';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig(({ command }) => {
  const isDev = command === 'serve';

  return {
    resolve: {
      extensions: ['.mjs', '.js', '.jsx', '.json', '.vue'],
    },
    server: {
      open: false,
    },
    plugins: [
      AutoImport({
        imports: ['vue'],
        dts: 'src/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
        },
      }),
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.startsWith('magic-'),
          },
        },
      }),
      monkey({
        server: { mountGmApi: true },
        build: {
          externalGlobals: isDev
            ? false
            : {
                vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
              },
        },
        userscript: {
          namespace: 'https://github.com/niceKingsley/magic-monkey',
          homepageURL: 'https://github.com/niceKingsley/magic-monkey',
          supportURL: 'https://github.com/niceKingsley/magic-monkey/issues',
          icon: 'https://static.hdslb.com/images/favicon.ico',
          match: ['*://www.bilibili.com/video/*', '*://www.bilibili.com/list/*'],
          grant: [
            'unsafeWindow',
            'GM_xmlhttpRequest',
            'GM_addStyle',
            'GM_getValue',
            'GM_setValue',
            'GM_deleteValue',
          ],
          connect: ['api.bilibili.com'],
          'run-at': 'document-start',
        },
      }),
    ],
  };
});
