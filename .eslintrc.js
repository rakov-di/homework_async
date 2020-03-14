module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "standard"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "linebreak-style": "off",
    "operator-linebreak": ["error", "before"],
    "semi": ["error", "always"],
    "no-var": "error",
    "space-before-function-paren": ["error", "never"],
    "arrow-parens": ["error", "as-needed"],
    "brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
    "no-new": "off",
    "no-case-declarations": "off",
    "no-prototype-builtins": "off",
    "no-return-assign": "off",
    "prefer-promise-reject-errors": "off"
  }
};
