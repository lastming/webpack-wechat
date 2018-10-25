// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  globals: {wx: true},
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'node': true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  'extends': 'eslint:recommended',
  // required to lint *.vue files
  plugins: ['html'],
  // add your custom rules here
  'rules': {
    'no-unused-vars': 0,
    'no-console': 'off',
    'indent': [
      'error',
      2,
      {'SwitchCase': 1}
    ],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': ['error', {'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always'}],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ]
  }
}
