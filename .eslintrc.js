const resolver = require('eslint-config-jave/resolver');

require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: 'eslint-config-jave',
  parserOptions: {
    project: ['{entries,packages}/*/tsconfig.json', './tsconfig.eslint.json'],
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      [resolver]: {
        project: '{entries,packages}/*/tsconfig.json',
      },
    },
  },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
};
