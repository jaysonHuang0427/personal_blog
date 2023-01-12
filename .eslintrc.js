module.exports = {
  // 解析选项
  parserOptions: {
    ecmaVersion: 6,
    // 一个对Babel解析器的包装，使其能够与 ESLint 兼容
    parser: "@babel/eslint-parser",
    sourceType: "module",
  },
  // 具体的检查规则
  rules: {
    "no-var": "error", // 不能使用 var 定义变量
    "vue/multi-word-component-names": "off",
  },
  // 继承其它规则
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
};
