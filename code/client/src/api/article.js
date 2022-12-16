import request from "@/utils/request.js";

export function getArticleList() {
  return request({
    url: "/article/list",
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
