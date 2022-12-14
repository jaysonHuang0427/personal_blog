// 开发环境配置文件
const commonConfig = require("./commonConfig");
const { merge } = require("webpack-merge");

const isAdmin = process.env.APP_TYPE === "admin";

module.exports = merge(commonConfig, {
  mode: "development",
  // 出口
  output: {
    // 将 js 文件输出到 js/ 目录中
    filename: "js/bundle.js",
    path: undefined, // 开发模式没有输入，不需要指定输出目录
  },
  devServer: {
    port: isAdmin ? 3777 : 3888,
    compress: true,
    static: "./dist",
    proxy: {
      "/api": {
        target: "http://localhost:3000/blog-api/",
        pathRewrite: { "^/api": "" },
      },
    },
  },
});
