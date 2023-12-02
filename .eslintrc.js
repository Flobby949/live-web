module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential', // Vue 3 规则
    'eslint:recommended',
    '@vue/typescript/recommended', // TypeScript 规则
    'prettier'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue']
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off',
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'eslint-disable-next-line': 'off',
    'no-undef': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
}
