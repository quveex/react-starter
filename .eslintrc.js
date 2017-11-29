module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  parser: "babel-eslint",
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  plugins: [
    "react",
  ],
  rules: {},
}
