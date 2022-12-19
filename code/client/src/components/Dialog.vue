<template>
  <div class="dialog">
    <el-dialog
      title="提示"
      :visible="dialogVisible"
      width="30%"
      @close="handleClose"
    >
      <div>
        <img src="@/assets/wx_qrcode.jpg" alt="" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleClose() {
      this.$emit("update:dialogVisible", false);
    },
  },
};
</script>

<style lang="less" scoped>
.dialog {
  img {
    width: 400px;
    object-fit: contain;
  }
}
</style>
