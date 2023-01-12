// 生产环境配置文件
const commonConfig = require("./commonConfig");
const { merge } = require("webpack-merge");
const path = require("path");

module.exports = merge(commonConfig, {
  // 生产模式
  mode: "production",
  // 出口
  output: {
    // 入口js文件打包输出命名方式
    filename: "static/js/[name].[contenthash:8].js",
    // 动态导入输出资源命名方式
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
    // 只适用于webpack5中asset资源的输出位置
    assetModuleFilename: "static/media/[name].[hash:8][ext]",
    path: path.resolve(__dirname, "..", "dist"),
    clean: true,
  },
});
