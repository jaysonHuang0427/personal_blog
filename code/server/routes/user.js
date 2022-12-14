const express = require("express");
const upload = require("../middleware/upload.js");
const userRouter = express.Router();
const {
  getHAHA,
  getUserListHandler,
  insertUserHandler,
  deleteUserHandler,
  getUserInfoHandler,
  loginHandler,
  registerHandler,
} = require("../handlers/user");

userRouter.get("/", getHAHA);
// 获得用户列表
userRouter.get("/getList", getUserListHandler);
// 获得用户详细信息
userRouter.get("/get/:id", getUserInfoHandler);
// 添加用户
userRouter.post("/insert", insertUserHandler);
// 删除用户
userRouter.delete("/delete", deleteUserHandler);
// 登录接口
userRouter.post("/login", upload.none(), loginHandler);
// 注册接口
userRouter.post("/register", registerHandler);
// 模拟错误接口
userRouter.get("/error", (req, res) => {
  throw new Error("new Error!!!");
});

module.exports = userRouter;
