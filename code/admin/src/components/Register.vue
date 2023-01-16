<template>
  <div class="register">
    <el-dialog
      title="提示"
      :visible="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="accountName">
          <el-input v-model="ruleForm.accountName"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEvent">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { register } from "@/api";
import md5 from "md5";
export default {
  name: "Register",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        accountName: "",
        password: "",
        checkPass: "",
        name: "",
      },
      rules: {
        password: [
          { required: true, message: "密码不能为空！", trigger: "change" },
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        accountName: [
          { required: true, message: "账号不能为空！", trigger: "change" },
        ],
        name: [
          { required: true, message: "姓名不能为空！", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？").then(() => {
        this.closeEvent();
        done();
      });
    },
    resetFields() {
      this.$refs.ruleForm.resetFields();
      this.ruleForm = {
        accountName: "",
        password: "",
        checkPass: "",
      };
    },
    closeEvent() {
      this.resetFields();
      this.$emit("changeDialogVisible", false);
    },
    submit() {
      this.$refs.ruleForm.validate(async (bol) => {
        if (bol) {
          this.ruleForm.password = md5(this.ruleForm.password);
          const res = await register(this.ruleForm);
          if (res.code === 200) {
            this.$message.success(res.msg);
            this.closeEvent();
          } else {
            this.resetFields();
          }
        } else {
          this.resetFields();
        }
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
