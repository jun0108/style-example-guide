import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import globals from 'globals';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '*.d.ts', '**/public/**'],
  },
  ...pluginVue.configs['flat/recommended'],
  ...vueTsEslintConfig(),
  {
    name: 'app/custom-rules',
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-var': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      'vue/no-unused-components': 'warn',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/valid-template-root': 'warn',
    },
  },
  {
    name: 'app/globals',
    languageOptions: {
      globals: {
        ...globals.browser,
        // google: 'readonly',
      },
    },
  },
  skipFormatting,
];
