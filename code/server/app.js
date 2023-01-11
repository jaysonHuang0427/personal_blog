const express = require("express");
// 验证token的第三方包
const { expressjwt: jwt } = require("express-jwt");
const errorhandler = require("./middleware/errorHandler.js");
const userRouter = require("./routes/user.js");
const articleRouter = require("./routes/article.js");

const app = express();
const port = 3000;
console.log("NODE_ENV", process.env.NODE_ENV);

// 托管静态资源
app.use(express.static("uploads"));

// 接收Content-Type为application/json的数据
app.use(express.json());
// 接受post传参 接收Content-Type为application/x-www-form-urlencoded的数据
app.use(express.urlencoded({ extended: true }));

// 鉴权jsonwebtoken(除了登录接口)
app.use(
  jwt({
    secret: "sui_bian",
    algorithms: ["HS256"],
  }).unless({
    path: ["/blog-api/user/login"],
  })
);

// 为不同路由设置不同前缀
app.use("/blog-api/user", userRouter);
app.use("/blog-api/article", articleRouter);

// 错误处理中间件
app.use((err, req, res, next) => {
  console.log("errCommon", err);
  if (err.status === 401) {
    res.status(401).send({
      code: 401,
      msg: err.inner.message,
    });
  } else {
    res.status(err.status).send({
      code: err.status,
      msg: err,
    });
  }
  next();
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorhandler);
}
