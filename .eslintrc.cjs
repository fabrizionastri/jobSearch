/* eslint-env node */
// .eslintrc.cjs
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:prettier/recommended',
    'plugin:vitest-globals/recommended',
    'plugin:tailwindcss/recommended',
    "prettier",
    "typescript"
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: [
    'tailwindcss',
    'prettier',
    'simple-import-sort',
    "@typescript-eslint",
  ],
  env: {
    'vitest-globals/env': true
  },
  rules: {
    "indent": "off",
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "never"],
    "@typescript-eslint/no-explicit-any": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "prettier/prettier": ["error", {}, { "usePrettierrc": true }]
  }
}
