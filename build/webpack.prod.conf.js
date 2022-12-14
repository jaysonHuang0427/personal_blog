// 生产环境配置文件
const commonConfig = require("./commonConfig");
const { merge } = require("webpack-merge");
const path = require("path");

module.exports = merge(commonConfig, {
  // 生产模式
  mode: "production",
  // 出口
  output: {
    // 将 js 文件输出到 js/ 目录中
    filename: "js/bundle.js",
    path: path.resolve(__dirname, "dist"),
    // 只适用于webpack5中asset资源的输出位置
    // assetModuleFilename: "images/[hash:8][ext]",
    clean: true,
  },
});
