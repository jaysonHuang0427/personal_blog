module.exports = function tokenExpiration(err, req, res, next) {
  if (err.status === 401) {
    res.status(401).send({
      code: 401,
      msg: "token异常",
    });
  } else {
    res.status(err.status).send({
      code: err.status,
      msg: err,
    });
  }
  next();
};
