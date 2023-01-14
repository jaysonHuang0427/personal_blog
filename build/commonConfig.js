const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const postcssPresetEnv = require("postcss-preset-env");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const webpack = require("webpack");
// const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");

// nodejs核心模块
// const os = require("os");
// cpu核数
// const threads = os.cpus().length;

// 是否是生产环境
const isProd = process.env.NODE_ENV === "production";
// 是否是管理端
const isAdmin = process.env.APP_TYPE === "admin";
console.log("NODE_ENV", process.env.NODE_ENV);
console.log("APP_TYPE", process.env.APP_TYPE);

const resolve = (dir) => {
  return path.resolve(__dirname, "..", dir);
};

module.exports = {
  // 入口文件
  entry: isAdmin
    ? resolve("code/admin/src/main.js")
    : resolve("code/client/src/main.js"),
  // loader配置
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 只在生产环境下使用 CSS 提取，这将便于你在开发环境下进行热重载。
          !isProd ? { loader: "style-loader" } : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [postcssPresetEnv(/* pluginOptions */)], // 能解决大多数样式兼容性问题
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          !isProd ? { loader: "style-loader" } : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        include: isAdmin
          ? resolve("code/admin/src")
          : resolve("code/client/src"),
      },
      {
        test: /\.js$/,
        use: [
          // {
          //   loader: "thread-loader", // 开启多进程
          //   options: {
          //     workers: threads, // 数量
          //   },
          // },
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true, // 开启babel编译缓存
              cacheCompression: false, // 缓存文件不要压缩
              plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
            },
          },
        ],
        include: isAdmin
          ? resolve("code/admin/src")
          : resolve("code/client/src"),
      },
      // 处理其他资源（字体，音视频等）
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: "asset/resource",
        // generator: {
        //   filename: "static/[hash:8][ext]",
        // },
      },
      // 处理图片资源，(webpack4之前用url-loader和file-loader)
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb  优点：减少请求数量,缺点：体积变得更大
          },
        },
        // generator: {
        //   filename: "static/[hash:8][ext]",
        // },
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         limit: 10 * 1024, // 限制10kb以下的图片用base64格式输出
      //         // 若不关掉esModule(es6模块化解析),html中的img标签src属性会变成【object Module】
      //         esModule: false,
      //         name: "imgs/[hash:8].[ext]",
      //       },
      //     },
      //   ],
      //   // 关掉webpack5中asset模块,避免重复打包图片资源
      //   type: "javascript/auto",
      // },
      {
        test: /\.html/,
        use: ["html-loader"],
        include: isAdmin
          ? resolve("code/admin/src")
          : resolve("code/client/src"),
      },
    ],
  },
  plugins: [
    // 将vue-loader作为插件使用
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: isAdmin
        ? resolve("code/admin/src/index.html")
        : resolve("code/client/src/index.html"),
    }),
    // 提取css成单独文件(以link的方式导入css)
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].chunk.css",
    }),
    // 友好提示错误信息
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          isProd
            ? "Build Successfully!"
            : `You application is running here http://localhost:${
                isAdmin ? "3777" : "3888"
              }`,
        ],
        notes: ["hhhhhhhhhhhhh"],
      },
      // should the console be cleared between each compilation?
      // default is true
      clearConsole: true,

      // add formatters and transformers (see below)
      additionalFormatters: [],
      additionalTransformers: [],
    }),
    // preload:告诉浏览器立刻加载当前页面的资源  prefetch：在浏览器空闲时加载即将用到的页面的资源，它们都会缓存资源
    // new PreloadWebpackPlugin({
    //   rel: "preload", // preload兼容性更好
    //   // rel:'prefetch', // prefetch兼容性更差
    //   as: "script",
    // }),
    new ESLintPlugin({
      // 指定eslint指定检查文件的根目录
      context: path.resolve(
        __dirname,
        isAdmin ? resolve("code/admin/src") : resolve("code/client/src")
      ),
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: resolve("node_modules/.cache/.eslintcache"),
    }),
    // 定义全局变量，用来处理我们开发环境和生产环境的不同
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  resolve: {
    alias: {
      "@": isAdmin ? resolve("code/admin/src") : resolve("code/client/src"),
    },
    // 可省略后缀
    extensions: [".js", ".css", ".less", ".vue"],
  },
  // 源码映射(方便调试)
  devtool: isProd ? "source-map" : "cheap-module-source-map",
  // 不输出错误信息或警告信息等
  stats: "none",
  optimization: {
    // 开发环境下启用 CSS 优化
    minimize: true,
    minimizer: [
      // css压缩
      new CssMinimizerPlugin(),
      // js压缩,当生产模式会默认开启TerserPlugin(多进程打包)
      // 特别耗时的操作中使用
      // new TerserPlugin({
      //   parallel: threads, // 开启多进程
      // }),
    ],
    splitChunks: {
      // include all types of chunks
      chunks: "all",
    },
  },
  performance: {
    // 此选项根据单个资源体积(单位: bytes)，控制 webpack 何时生成性能提示
    maxAssetSize: 30000000,
    // 根据入口起点的最大体积，控制 webpack 何时生成性能提示
    maxEntrypointSize: 30000000,
  },
};
