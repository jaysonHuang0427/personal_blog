const knex = require("./index.js");
const articleTable = "blog_article";
const labelTable = "article_label";

module.exports.insertArticle = (articleInfo, successCallback, failCallback) => {
  knex(articleTable)
    .insert(articleInfo)
    .then((res) => {
      successCallback(res);
    })
    .catch((err) => {
      failCallback(err);
    });
};

module.exports.getArticleList = (successCallback, failCallback) => {
  knex(articleTable)
    .select()
    .then((res) => {
      successCallback(res);
    })
    .catch((err) => {
      failCallback(err);
    });
};

module.exports.getArticle = (id, successCallback, failCallback) => {
  knex(articleTable)
    .where("article_id", id)
    .then((res) => {
      successCallback(res);
    })
    .catch((err) => {
      failCallback(err);
    });
};

module.exports.deleteArticle = (id, successCallback, failCallback) => {
  knex(articleTable)
    .where("article_id", id)
    .del()
    .then((res) => {
      successCallback(res);
    })
    .catch((err) => {
      failCallback(err);
    });
};

module.exports.getLabelList = (successCallback, failCallback) => {
  knex(labelTable)
    .select()
    .then((res) => {
      successCallback(res);
    })
    .catch((err) => {
      failCallback(err);
    });
};

module.exports.getLabel = (id, successCallback, failCallback) => {
  knex(labelTable)
    .where("label_id", id)
    .then((res) => {
      successCallback(res);
    })
    .catch((err) => {
      failCallback(err);
    });
};

module.exports.delLabel = (id, successCallback, failCallback) => {
  knex(labelTable)
    .where("label_id", id)
    .del()
    .then((res) => {
      successCallback(res);
    })
    .catch((err) => {
      failCallback(err);
    });
};

module.exports.insertLabel = (labelInfo, successCallback, failCallback) => {
  knex(labelTable)
    .insert(labelInfo)
    .then((res) => {
      successCallback(res);
    })
    .catch((err) => {
      failCallback(err);
    });
};

module.exports.updateLabel = (labelInfo, successCallback, failCallback) => {
  knex(labelTable)
    .where("label_id", labelInfo.id)
    .update("label_name", labelInfo.name)
    .then((res) => {
      successCallback(res);
    })
    .catch((err) => {
      failCallback(err);
    });
};
