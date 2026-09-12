/** @type {import('stylelint').Config} */
module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss',
  ],

  rules: {
    // можешь добавлять свои правила позже
  },

  ignoreFiles: [
    '**/*.js',
    '**/*.ts',
    '**/*.tsx',
    '**/*.json',
  ],
}
