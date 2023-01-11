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
    .select(
      "article_id",
      "author_name",
      "article_title",
      "article_subtitle",
      "article_cover",
      "label_id",
      "publishTime"
    )
    .then((res) => {
      successCallback(res);
    })
    .catch((err) => {
      failCallback(err);
    });
};

module.exports.getArticleListBykeyword = (
  keyword,
  successCallback,
  failCallback
) => {
  knex(articleTable)
    .select("article_id", "article_title", "article_subtitle")
    .whereLike("article_title", `%${keyword}%`)
    .then((res) => {
      successCallback(res);
    })
    .catch((err) => {
      failCallback(err);
    });
};

module.exports.getHotArticleList = (successCallback, failCallback) => {
  knex(articleTable)
    .select("article_id", "article_title", "readingCount")
    .orderBy("readingCount", "desc")
    .limit(10)
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
    .increment("readingCount", 1)
    .then((res) => {
      if (res > 0) {
        return knex(articleTable).where("article_id", id);
      }
    })
    .then((rows) => {
      successCallback(rows);
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
