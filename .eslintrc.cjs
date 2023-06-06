/* eslint-env node */
// .eslintrc.cjs
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:prettier/recommended',
    'plugin:vitest-gloabls/recommended'
    /*  'plugin:tailwindcss/recommended' */
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['tailwindcss'],
  env: {
    "vitest-globals/env": true
  }
}
