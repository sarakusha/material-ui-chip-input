const js = require('@eslint/js')
const globals = require('globals')
const prettier = require('eslint-config-prettier')

module.exports = [
  {
    ignores: ['lib/**', 'coverage/**', 'node_modules/**', 'storybook/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'comma-dangle': ['warn', 'always-multiline'],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-fallthrough': 'off',
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^React$', ignoreRestSiblings: true },
      ],
      quotes: ['warn', 'single'],
      semi: ['error', 'never'],
    },
  },
  prettier,
]
