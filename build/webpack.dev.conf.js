// 开发环境配置文件
const commonConfig = require("./commonConfig");
const { merge } = require("webpack-merge");

const isAdmin = process.env.APP_TYPE === "admin";

module.exports = merge(commonConfig, {
  mode: "development",
  // 出口
  output: {
    // 入口js文件打包输出命名方式
    filename: "js/[name]-[hash:8].js",
    path: undefined, // 开发模式没有输入，不需要指定输出目录
  },
  devServer: {
    port: isAdmin ? 3777 : 3888,
    compress: true,
    static: false,
    proxy: {
      "/api": {
        target: "http://localhost:3000/blog-api/",
        pathRewrite: { "^/api": "" },
      },
    },
  },
});
