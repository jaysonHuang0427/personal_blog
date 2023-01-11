import request from "@/utils/request.js";

export function getArticleList(keyword) {
  return request({
    url: `/article/list${keyword ? "?keyword=" + keyword : ""}`,
  });
}

export function getArticle(id) {
  return request({
    url: `/article/get/${id}`,
  });
}

export function getLabelList() {
  return request({
    url: "/article/labelList",
  });
}

export function getArticleByLabel(id) {
  return request({
    url: `/article/listByLabel/${id}`,
  });
}

export function getHotList() {
  return request({
    url: "/article/hotList",
  });
}
