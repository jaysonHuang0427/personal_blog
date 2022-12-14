const fs = require("fs");
const {
  insertArticle,
  getArticleList,
  getArticle,
  deleteArticle,
  getLabelList,
  getLabel,
  delLabel,
  insertLabel,
  updateLabel,
} = require("../database/article.js");

module.exports.addArticleHandler = (req, res) => {
  console.log("addArticleHandler", req.body);
  console.log("file", req.file);
  if (req.body) {
    const articleInfo = req.body;
    if (req.file) {
      // 异步重写
      fs.rename(
        req.file.path,
        req.file.destination + req.file.originalname,
        (err) => {
          if (err) throw err;
          console.log("Rename complete!");
          const fileNewPath = req.file.destination + req.file.originalname;
          Object.assign(articleInfo, { article_cover: fileNewPath });
          console.log("changeArticleInfo", articleInfo);
          insertArticle(
            articleInfo,
            (result) => {
              if (result.length > 0) {
                res.send({
                  code: 200,
                  msg: "添加文章成功",
                });
              } else {
                res.status(400).send({
                  code: 400,
                  msg: "添加文章失败",
                });
              }
            },
            (error) => {
              res.status(500).send({
                code: 500,
                msg: error,
              });
            }
          );
        }
      );
    }
  } else {
    res.status(400).send({
      code: 400,
      msg: "文章信息为空",
    });
  }
};

module.exports.getArticleListHandler = (req, res) => {
  getArticleList(
    (result) => {
      res.send({
        code: 200,
        data: result,
      });
    },
    (error) => {
      res.status(500).send({
        code: 500,
        msg: error,
      });
    }
  );
};

module.exports.deleteArticleHandler = (req, res) => {
  const id = req.body.id;
  if (id) {
    deleteArticle(
      id,
      (result) => {
        console.log("deleteRes", result);
        if (result > 0) {
          res.send({
            code: 200,
            msg: "删除文章成功！",
          });
        } else {
          res.send({
            code: 400,
            msg: "删除文章失败！",
          });
        }
      },
      (error) => {
        res.status(500).send({
          code: 500,
          msg: error,
        });
      }
    );
  } else {
    res.status(400).send({
      code: 400,
      msg: "id不能为空！",
    });
  }
};

module.exports.getArticleHandler = (req, res) => {
  const id = req.params.id;
  if (id) {
    getArticle(
      id,
      (result) => {
        if (result.length > 0) {
          res.send({
            code: 200,
            data: result[0],
          });
        } else {
          res.send({
            code: 400,
            msg: "查找不到该文章！",
          });
        }
      },
      (error) => {
        res.status(500).send({
          code: 500,
          msg: error,
        });
      }
    );
  } else {
    res.status(400).send({
      code: 400,
      msg: "id不能为空！",
    });
  }
};

module.exports.getLabelListHandler = (req, res) => {
  getLabelList(
    (result) => {
      if (result.length > 0) {
        res.send({
          code: 200,
          data: result,
        });
      } else {
        res.status(400).send({
          code: 400,
          msg: "error search",
        });
      }
    },
    (error) => {
      res.status(500).send({
        code: 500,
        msg: error,
      });
    }
  );
};

module.exports.getLabelHandler = (req, res) => {};

module.exports.delLabelHandler = (req, res) => {
  const id = req.body.id;
  if (id) {
    delLabel(
      id,
      (result) => {
        if (result > 0) {
          res.send({
            code: 200,
            msg: "删除成功！",
          });
        } else {
          res.status(400).send({
            code: 400,
            msg: "删除失败！",
          });
        }
      },
      (error) => {
        res.status(500).send({
          code: 500,
          msg: error,
        });
      }
    );
  } else {
    res.status(400).send({
      code: 400,
      msg: "id不能为空!",
    });
  }
};

module.exports.insertLabelHandler = (req, res) => {
  const labelInfo = req.body;
  if (labelInfo) {
    insertLabel(
      labelInfo,
      (result) => {
        if (result.length > 0) {
          res.send({
            code: 200,
            msg: "添加成功！",
          });
        } else {
          res.status(400).send({
            code: 400,
            msg: "添加失败！",
          });
        }
      },
      (error) => {
        res.status(500).send({
          code: 500,
          msg: error,
        });
      }
    );
  } else {
    res.status(400).send({
      code: 400,
      msg: "信息不能为空",
    });
  }
};

module.exports.updateLabelHandler = (req, res) => {
  const labelInfo = req.body;
  if (labelInfo) {
    updateLabel(
      labelInfo,
      (result) => {
        console.log("updateLabel", result);
        if (result.length > 0) {
          res.send({
            code: 200,
            msg: "更新成功！",
          });
        } else {
          res.status(400).send({
            code: 400,
            msg: "更新失败！",
          });
        }
      },
      (error) => {
        res.status(500).send({
          code: 500,
          msg: error,
        });
      }
    );
  } else {
    res.status(400).send({
      code: 400,
      msg: "信息不能为空",
    });
  }
};
