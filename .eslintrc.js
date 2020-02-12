module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    // 'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    // 'react-app'
  ],
  globals: {
    __DEV__: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
  //   'react-native',
  //   'jest'
  ],
  rules: {
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'linebreak-style': ['error', 'unix'],
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],
    'no-unused-vars': [
      'error',
      {
        args: 'after-used',
        vars: 'all',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],
    quotes: ['error', 'single'],
    // 'react-native/no-unused-styles': 1,
    // 'react-native/split-platform-components': 2,
    // 'react-native/no-inline-styles': 0,
    // 'react-native/no-color-literals': 0,
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    semi: ['error', 'always'],
    'comma-dangle': ['error', {
      'objects': 'always-multiline',
      'arrays': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
    }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};