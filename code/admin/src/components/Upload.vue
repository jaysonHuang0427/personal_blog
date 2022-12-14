<template>
  <div class="uploadImg">
    <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="changeEvent"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "Upload",
  data() {
    return {
      imageUrl: "",
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log("handleAvatarSuccess", res, file);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    changeEvent(file) {
      console.log("changeEvent", file);
      this.$emit("changeImg", file.raw);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    httpRequest(a, b) {
      console.log("---", a, b);
    },
  },
};
</script>

<style lang="less" scoped>
.uploadImg {
  width: 100%;
  height: 100%;
  padding: 10px;
  .avatar-uploader {
    ::v-deep.el-upload {
      border: 1px dashed #000;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #409eff;
      }
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
