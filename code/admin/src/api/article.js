import request from "@/utils/request.js";

export function addArticle(data) {
  return request({
    url: "/article/insert",
    method: "post",
    data,
  });
}

export function getArticleList() {
  return request({
    url: "/article/list",
  });
}

export function delArticle(data) {
  return request({
    url: "/article/delete",
    method: "post",
    data,
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

export function insertLabel(data) {
  return request({
    url: "/article/labelInsert",
    method: "post",
    data,
  });
}

export function delLabel(data) {
  return request({
    url: "/article/labelDel",
    method: "post",
    data,
  });
}

export function updateLabel(data) {
  return request({
    url: "/article/labelUpdate",
    method: "post",
    data,
  });
}
