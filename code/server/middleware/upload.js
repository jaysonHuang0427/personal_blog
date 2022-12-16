const multer = require("multer");
const path = require("path");
const upload = multer({
  dest: path.resolve("..", "uploads/"),
  fileFilter(req, file, callback) {
    // 解决中文乱码问题
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf-8"
    );
    callback(null, true);
  },
});

module.exports = upload;
