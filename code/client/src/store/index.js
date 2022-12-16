import Vue from "vue";
import Vuex from "vuex";
import { login } from "@/api/index.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    accessToken: localStorage.getItem("accessToken") || "",
  },
  mutations: {
    setToken(state, token) {
      state.accessToken = token;
      localStorage.setItem("accessToken", token);
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
  },
  getters: {},
  modules: {},
});

export default store;
