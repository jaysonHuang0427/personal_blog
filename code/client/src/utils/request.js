import axios from "axios";
import store from "../store";
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
const request = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "/api" : "/blog-api",
  timeout: 5000,
});

request.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${store.state.accessToken}`;
    return config;
  },
  (err) => {
    console.log(err);
  }
);

request.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    console.log("err", err);
    // token过期
    if (err.response.status === 401) {
      store.commit("setToken", "");
      store.commit("setUserId", null);
    }
  }
);

export default request;
