import Vue from "vue";
import Vuex from "vuex";
import { login, getUserInfo } from "@/api/index.js";
import router from "@/router/index.js";
import { Message } from "element-ui";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    accessToken: localStorage.getItem("accessToken") || "",
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
  },
  mutations: {
    setToken(state, token) {
      state.accessToken = token;
      localStorage.setItem("accessToken", token);
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    },
  },
  actions: {
    async loginHandler({ commit, dispatch }, formData) {
      const res = await login(formData);
      if (res.code === 201) {
        commit("setToken", res.token);
        dispatch("getUserInfo", res.userId);
        router.push("/home");
        Message.success("登录成功！");
      }
    },
    async getUserInfo({ commit }, id) {
      const res = await getUserInfo(id);
      commit("setUserInfo", res.data[0]);
    },
  },
  getters: {},
  modules: {},
});

export default store;
