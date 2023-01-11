const {
  queryUserList,
  insertUser,
  deleteUser,
  getUserDetail,
  login,
} = require("../database/user");
const jwt = require("jsonwebtoken");

module.exports = {
  getHAHA(req, res) {
    res.send("HAHA");
    return;
  },

  getUserListHandler(req, res) {
    queryUserList(
      (result) => {
        res.send({
          code: 200,
          totalCount: result.length,
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
    return;
  },

  insertUserHandler(req, res) {
    const userInfo = req.body;
    console.log("userInfo", typeof userInfo);
    if (JSON.stringify(userInfo) !== "{}") {
      insertUser(
        userInfo,
        (result) => {
          if (result.length > 0) {
            res.send({
              code: 200,
              msg: "添加成功！",
            });
          } else {
            res.send({
              code: 400,
              msg: "用户名或用户账号重复！",
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
        msg: "用户信息为空",
      });
    }
    return;
  },

  deleteUserHandler(req, res) {
    deleteUser(req.body.id, (result) => {
      if (req.body) {
        if (result === 1) {
          res.send({
            code: 200,
            msg: "删除成功！",
          });
        } else if (result === 0) {
          res.status(400).send({
            code: 400,
            msg: "删除失败！",
          });
        }
      }
    });
    return;
  },

  getUserInfoHandler(req, res) {
    console.log("id", req.params.id);
    if (req.params.id) {
      getUserDetail(
        req.params.id,
        (result) => {
          res.send({
            code: 200,
            data: result,
            msg: "查询成功！",
          });
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
        data: null,
      });
    }
    return;
  },

  loginHandler(req, res) {
    const { accountName, password } = req.body;
    console.log("loginHandler", req.body);
    if (!accountName || !password) {
      res.status(400).send({
        code: 400,
        msg: "账户或密码为空！",
      });
      return;
    }
    login(
      req.body,
      (result) => {
        if (result.length > 0) {
          // 生成登录的凭证
          const token = jwt.sign(
            {
              accountName,
            },
            "sui_bian",
            { expiresIn: "8h" }
          );
          res.send({
            code: 201,
            msg: "登录成功",
            token,
            userId: result[0].id,
          });
        } else {
          res.send({
            code: 400,
            msg: "登录失败",
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
    return;
  },

  registerHandler(req, res) {
    const { accountName, password } = req.body;
    if (!accountName || !password) {
      res.status(400).send({
        code: 400,
        msg: "账户或密码为空！",
      });
      return;
    }
    insertUser(
      req.body,
      (result) => {
        if (result.length > 0) {
          res.send({
            code: 200,
            msg: "注册成功！",
          });
        } else {
          res.send({
            code: 400,
            msg: "用户名或用户账号重复！",
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
    return;
  },
};
