const webpack = require("webpack");
const prodConf = require("./webpack.prod.conf.js");

const compiler = webpack(prodConf);

// ora不支持cjs方式引入,但可以使用import()方式在cjs文件中导入支持esm导入的第三方库
import("ora").then((res) => {
  const spinner = res.default({
    spinner: {
      interval: 80, // Optional
      frames: ["-", "+", "-"],
    },
  });
  // node控制台转圈圈
  spinner.start("Loading...");
  compiler.run((err, stats) => {
    // 致命的 wepback 错误（配置出错等）
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }
    // 编译过程中有警告
    if (stats.hasWarnings()) console.log("Warning!");
    // 编译过程中有错误
    if (stats.hasErrors()) {
      console.log("Build failed with errors.");
      // 退出进程
      process.exit(1);
    }
    compiler.close((closeErr) => {
      if (closeErr) throw closeErr;
      spinner.succeed("Complete packing!");
    });
  });
});
