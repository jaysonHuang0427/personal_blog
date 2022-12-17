import Vue from "vue";
import Vuex from "vuex";
import { login } from "@/api/index.js";
import { getArticleList, getLabelList } from "@/api/article.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    accessToken: localStorage.getItem("accessToken") || "",
    articleList: [],
    labelList: [],
  },
  mutations: {
    setToken(state, token) {
      state.accessToken = token;
      localStorage.setItem("accessToken", token);
    },
    setArticleList(state, articleList) {
      state.articleList = articleList;
    },
    setLabelList(state, labelList) {
      state.labelList = labelList;
    },
  },
  actions: {
    async loginHandler({ commit }) {
      const fd = new FormData();
      fd.set("accountName", "test2");
      fd.set("password", "123456");
      const res = await login(fd);
      if (res.code === 201) {
        commit("setToken", res.token);
      }
    },
    async getList({ commit }) {
      const res = await getArticleList();
      const res2 = await getLabelList();
      if (res && res.code === 200) commit("setArticleList", res.data);
      if (res2 && res2.code === 200) commit("setLabelList", res2.data);
      console.log("getList");
    },
  },
  getters: {},
  modules: {},
});

export default store;
