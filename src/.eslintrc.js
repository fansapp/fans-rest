module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    sourceType: 'module',
  },
};
