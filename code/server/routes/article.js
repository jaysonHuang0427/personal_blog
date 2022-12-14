const express = require("express");
const fs = require("fs");
const upload = require("../middleware/upload.js");
const {
  addArticleHandler,
  getArticleListHandler,
  deleteArticleHandler,
  getArticleHandler,
  delLabelHandler,
  getLabelHandler,
  getLabelListHandler,
  insertLabelHandler,
  updateLabelHandler,
} = require("../handlers/article");

const articleRouter = express.Router();

// 增加文章
articleRouter.post(
  "/insert",
  upload.single("article_cover"),
  addArticleHandler
);
// 查询文章列表
articleRouter.get("/list", getArticleListHandler);
// 删除文章
articleRouter.post("/delete", deleteArticleHandler);
// 查看文章详细信息
articleRouter.get("/get/:id", getArticleHandler);
// 查看标签列表
articleRouter.get("/labelList", getLabelListHandler);
// 查看标签
articleRouter.get("/label", getLabelHandler);
// 删除标签
articleRouter.post("/labelDel", delLabelHandler);
// 添加标签
articleRouter.post("/labelInsert", insertLabelHandler);
// 更新标签
articleRouter.post("/labelUpdate", updateLabelHandler);

// 测试上传图片
articleRouter.post("/uploadImg", upload.single("cover"), (req, res) => {
  console.log("file", req.file);
  if (req.file) {
    fs.rename(
      req.file.path,
      req.file.destination + req.file.originalname,
      (err) => {
        if (err) throw err;
        console.log("Rename complete!");
      }
    );
    res.send({
      code: 200,
      msg: "上传成功！",
    });
  }
});

module.exports = articleRouter;
