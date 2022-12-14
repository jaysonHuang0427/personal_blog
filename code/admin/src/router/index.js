import VueRouter from "vue-router";
import Vue from "vue";
import Layout from "@/layout/index.vue";

Vue.use(VueRouter);
export const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/Login.vue"),
  },
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
  },
  {
    path: "/home",
    component: Layout,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/Home/index.vue"),
      },
    ],
    meta: { menuName: "主页", icon: "el-icon-menu" },
  },
  {
    path: "/article",
    component: Layout,
    children: [
      {
        path: "",
        name: "article",
        component: () => import("@/views/Article/index.vue"),
      },
      // 不能加“/”！！！！！
      {
        path: "add",
        name: "addArticle",
        component: () => import("@/views/Article/AddArticle.vue"),
      },
      {
        path: "detail",
        name: "articleDetail",
        component: () => import("@/views/Article/ArticleDetail.vue"),
      },
    ],
    meta: { menuName: "文章管理", icon: "el-icon-menu" },
  },
  {
    path: "/label",
    component: Layout,
    children: [
      {
        path: "",
        name: "label",
        component: () => import("@/views/Label/index.vue"),
      },
    ],
    meta: { menuName: "标签管理", icon: "el-icon-menu" },
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
