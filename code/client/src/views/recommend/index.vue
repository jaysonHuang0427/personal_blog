<template>
  <div class="abc">
    <video src="" controls></video>
    <div class="btnGroup">
      <el-button type="primary" @click="startRecord">录制</el-button>
      <el-button type="danger" @click="stopRecord">停止</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
      <el-button type="primary" @click="download">下载</el-button>
    </div>
  </div>
</template>

<script>
import getUserMedia from "@/utils/media.js";
export default {
  data() {
    return {
      recorder: null,
    };
  },
  mounted() {
    getUserMedia({ audio: true, video: true })
      .then((mediaRecorder) => {
        console.log("mediaRecorder", mediaRecorder);
        this.recorder = mediaRecorder;
      })
      .catch((err) => {
        console.log(err.name + ": " + err.message);
      });
  },
  methods: {
    startRecord() {
      this.recorder.start();
    },
    stopRecord() {
      this.recorder.stop();
    },
    reset() {},
    download() {},
  },
};
</script>

<style lang="less" scoped>
.abc {
  display: flex;
  flex-direction: column;
  .btnGroup {
    display: flex;
    margin-top: 50px;
  }
}
</style>
