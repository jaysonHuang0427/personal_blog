const knex = require("./index.js");
const userTable = "blog_user";

module.exports.queryUserList = (successCallback, failCallback) => {
  knex(userTable)
    .select()
    .then((res) => {
      successCallback(res);
    })
    .catch((err) => {
      failCallback(err);
    });
};

module.exports.insertUser = (insertUserInfo, successCallback, failCallback) => {
  knex(userTable)
    .select("name", "accountName")
    .where("name", insertUserInfo.name)
    .orWhere("accountName", insertUserInfo.accountName)
    .then((res) => {
      if (res.length === 0) {
        return knex(userTable).insert(insertUserInfo);
      } else {
        return false;
      }
    })
    .then((res) => {
      successCallback(res);
    })
    .catch((err) => {
      failCallback(err);
    });
};

module.exports.deleteUser = (id, successCallback, failCallback) => {
  knex(userTable)
    .where("id", id)
    .del()
    .then((res) => {
      successCallback(res);
    })
    .catch((err) => {
      failCallback(err);
    });
};

module.exports.getUserDetail = (id, successCallback, failCallback) => {
  knex(userTable)
    .where("id", id)
    .then((res) => {
      successCallback(res);
    })
    .catch((err) => {
      failCallback(err);
    });
};

module.exports.login = (loginInfo, successCallback, failCallback) => {
  knex(userTable)
    .where(loginInfo)
    .then((res) => {
      successCallback(res);
    })
    .catch((err) => {
      failCallback(err);
    });
};
