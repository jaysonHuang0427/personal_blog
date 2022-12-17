import VueRouter from "vue-router";
import Vue from "vue";
import Layout from "@/layout/index.vue";

Vue.use(VueRouter);
export const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Layout,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/home/index.vue"),
      },
    ],
  },
  {
    path: "/article",
    component: Layout,
    children: [
      {
        path: "",
        name: "article",
        component: () => import("@/views/article/index.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
