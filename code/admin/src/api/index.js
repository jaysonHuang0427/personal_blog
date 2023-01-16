import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}

export function getHAHA() {
  return request({
    url: "/",
  });
}

export function getUserInfo(id) {
  return request({
    url: `/user/get/${id}`,
  });
}

export function register(data) {
  return request({
    url: "/user/register",
    method: "post",
    data,
  });
}
