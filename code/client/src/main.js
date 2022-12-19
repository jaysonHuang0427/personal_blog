import Vue from "vue";
import App from "./App";
// 导入路由
import router from "@/router/index.js";
// 导入全局样式
import "@/style/index";
// 自动导入组件
import autoImport from "@/utils/autoImport.js";
// 导入vuex
import store from "@/store/index.js";
// 全局导入element-ui
import ElementUI from "element-ui";
// 导入element-ui的样式
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
Vue.use(autoImport);

new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  store,
});
