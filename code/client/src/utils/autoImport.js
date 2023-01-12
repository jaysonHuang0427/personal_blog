export default {
  install(Vue) {
    // 返回值req是一个函数
    const req = require.context("@/components", false, /\.vue$/);
    req.keys().forEach((item) => {
      // 组件：req(item)
      const temp = req(item).default;
      Vue.component(temp.name, temp);
    });
  },
};
