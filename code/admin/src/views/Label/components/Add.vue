<template>
  <div class="add">
    <el-dialog title="新增标签" :visible="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标签名称">
          <el-input v-model="form.label_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { insertLabel } from "@/api/article.js";
export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        label_name: "",
      },
    };
  },
  methods: {
    closeDialog() {
      this.$emit("changeDialogVisible", false);
      this.form = { label_name: "" };
    },
    async submit() {
      const res = await insertLabel(this.form);
      if (res && res.code === 200) {
        this.closeDialog();
        this.$emit("getData");
        this.$message.success(res.msg);
      }
    },
  },
};
</script>
