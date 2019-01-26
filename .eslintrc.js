module.exports = {
  parser: 'babel-eslint',
  rules: {
    strict: 0,
    'react/prop-types': 0,
  },
  extends: [
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  env: {
    browser: true,
  },
  settings: {
    react: {
      version: '16.2',
    },
  },
};
