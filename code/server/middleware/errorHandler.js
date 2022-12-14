// 错误提示中间件
const errorhandler = require("errorhandler");
// node-notifier
const notifier = require("node-notifier");

function errorNotification(err, str, req) {
  var title = "Error in " + req.method + " " + req.url;
  console.log("errorNotification", err);
  notifier.notify({
    title: title,
    message: str,
  });
}

module.exports = errorhandler({ log: errorNotification });
