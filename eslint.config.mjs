import fs from 'node:fs';
import path from 'node:path';
import { monkeyGlobals } from 'magic-monkey-cli';
import js from '@eslint/js';
import globals from 'globals';
import vuePlugin from 'eslint-plugin-vue';
import prettierConfig from 'eslint-config-prettier';

function loadAutoImportGlobals() {
  const result = {};
  const packagesDir = path.resolve('packages');
  if (fs.existsSync(packagesDir)) {
    for (const pkg of fs.readdirSync(packagesDir)) {
      const jsonPath = path.join(packagesDir, pkg, '.eslintrc-auto-import.json');
      if (fs.existsSync(jsonPath)) {
        try {
          Object.assign(result, JSON.parse(fs.readFileSync(jsonPath, 'utf8')).globals || {});
        } catch (_err) {
          void _err;
        }
      }
    }
  }
  return result;
}

const autoImportGlobals = loadAutoImportGlobals();

export default [
  {
    ignores: ['**/dist/**', 'node_modules/**', '**/auto-imports.d.ts'],
  },

  {
    files: [
      'packages/**/*.{js,mjs,cjs}',
      'shared/**/*.{js,mjs,cjs}',
      'scripts/**/*.{js,mjs,cjs}',
      '*.{js,mjs,cjs}',
    ],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...monkeyGlobals,
        ...globals.browser,
        ...globals.greasemonkey,
        ...globals.node,
        ...autoImportGlobals,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      indent: ['error', 2],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'no-console': 'off',
    },
  },

  ...vuePlugin.configs['flat/recommended'].map((cfg) => ({
    ...cfg,
    files: ['packages/**/*.vue'],
  })),
  {
    files: ['packages/**/*.vue'],
    languageOptions: {
      globals: {
        ...monkeyGlobals,
        ...globals.browser,
        ...globals.greasemonkey,
        ...autoImportGlobals,
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/no-deprecated-slot-attribute': 'off',
    },
  },

  prettierConfig,
];
