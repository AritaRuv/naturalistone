module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    indent: ["error", 2], // 2 espacios
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"], // comillas dobles
    semi: ["error", "always"], // semicolon
  },
};
