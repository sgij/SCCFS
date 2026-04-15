import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        window: 'readonly',
        document: 'readonly',
      },
    },
    plugins: {
      react: reactPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: ['electron', 'fs', 'crypto', 'better-sqlite3'],
        },
      ],
    },
  },
  {
    files: ['src/main/**/*.{js,mjs}', 'src/preload/**/*.{js,mjs}'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
];
