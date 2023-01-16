<template>
  <div class="box">
    <div class="content">
      <div class="login-wrapper">
        <h1>管理端登录</h1>
        <div class="login-form">
          <div class="username form-item">
            <span>用户名</span>
            <input v-model="form.accountName" type="text" class="input-item" />
          </div>
          <div class="password form-item">
            <span>密码</span>
            <input v-model="form.password" type="password" class="input-item" />
          </div>
          <button class="login-btn" @click="loginEvent">登 录</button>
        </div>
        <div class="divider">
          <span class="line"></span>
          <el-link
            class="divider-text"
            type="primary"
            :underline="false"
            @click="toRegister"
            >注册账号</el-link
          >
          <span class="line"></span>
        </div>
      </div>
    </div>
    <Register
      :dialog-visible="showRegister"
      @changeDialogVisible="showRegister = $event"
    ></Register>
  </div>
</template>

<script>
import Register from "@/components/Register.vue";
import md5 from "md5";

export default {
  name: "LoginVue",
  components: { Register },
  data: function () {
    return {
      form: {
        accountName: "qqq",
        password: "qqq",
      },
      showRegister: false,
    };
  },
  methods: {
    async loginEvent() {
      const fd = new FormData();
      fd.set("accountName", this.form.accountName);
      fd.set("password", md5(this.form.password));
      await this.$store.dispatch("loginHandler", fd);
      this.form = {
        accountName: "",
        password: "",
      };
    },
    toRegister() {
      this.showRegister = true;
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 100vw;
  height: 100vh;
  background-color: rgb(29, 67, 89);
  .content {
    .login-wrapper {
      .login-form {
        .form-item {
          margin: 20px 0;
          span {
            display: block;
            margin: 5px 20px;
            font-weight: 100;
          }
          .input-item {
            width: 100%;
            border-radius: 40px;
            padding: 20px;
            box-sizing: border-box;
            font-size: 20px;
            font-weight: 200;
            &:focus {
              outline: none;
            }
          }
        }
        .login-btn {
          width: 100%;
          border-radius: 40px;
          color: #fff;
          border: 0;
          font-weight: 100;
          margin-top: 10px;
          cursor: pointer;
        }
      }
      h1 {
        text-align: center;
      }
      .divider {
        width: 100%;
        margin: 20px 0;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          &:nth-child(1) {
            flex: 1;
          }
          &:nth-child(3) {
            flex: 1;
          }
        }
        .line {
          display: inline-block;
          max-width: 30%;
          width: 30%;
        }
        .divider-text {
          vertical-align: middle;
          margin: 0px 20px;
          line-height: 0px;
          display: inline-block;
          width: 100px;
        }
      }
    }
  }
}

/*一般大于手机的尺寸CSS*/
@media (min-width: 767px) {
  .box {
    background-color: rgb(29, 67, 89);
  }
  .box .content {
    width: 85vw;
    height: 90vh;
    background: url("@/assets/login_two.jpg") no-repeat;
    background-size: 90% 100%;
    position: absolute;
    right: 15%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    background-color: #fff;
  }
  .box .content .login-wrapper {
    width: 25vw;
    position: absolute;
    right: 15%;
    top: 50%;
    transform: translateY(-50%);
  }
  .box .content .login-wrapper h1 {
    text-align: center;
    font-size: 45px;
    color: rgb(81, 100, 115);
    margin-bottom: 40px;
  }
  .box .content .login-wrapper .login-form {
    margin: 10px 0;
  }
  .box .content .login-wrapper .login-form .form-item span {
    color: rgb(81, 100, 115);
  }
  .box .content .login-wrapper .login-form .form-item .input-item {
    height: 60px;
    border: 1px solid rgb(214, 222, 228);
  }
  .box .content .login-wrapper .login-form .login-btn {
    height: 50px;
    background-color: rgb(59, 72, 89);
    font-size: 20px;
  }
  .box .content .login-wrapper .divider .line {
    border-bottom: 1px solid rgb(214, 222, 228);
  }
  .box .content .login-wrapper .other-login-item {
    border-radius: 20px;
  }
  .box .content .login-wrapper .other-login-item img {
    width: 40px;
    height: 40px;
  }
}
/*手机端CSS*/
@media (max-width: 768px) {
  .box .content {
    width: 100vw;
    height: 100vh;
    background: url("@/assets/login_bg_phone.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  .box .content .login-wrapper {
    width: 70%;
    height: 60%;
    padding-top: 15%;
  }
  .box .content .login-wrapper h1 {
    font-size: 30px;
    color: #fff;
  }
  .box .content .login-wrapper .login-form .form-item {
    margin: 10px 0;
  }
  .box .content .login-wrapper .login-form .form-item span {
    color: rgb(113, 129, 141);
  }
  .box .content .login-wrapper .login-form .form-item .input-item {
    height: 30px;
    border: 1px solid rgb(113, 129, 141);
    background-color: transparent;
    color: #fff;
  }
  .box .content .login-wrapper .login-form .login-btn {
    height: 40px;
    background-color: rgb(235, 95, 93);
    font-size: 16px;
  }
  .box .content .login-wrapper .divider .line {
    border-bottom: 1px solid #fff;
  }
  .box .content .login-wrapper .divider .divider-text {
    color: #fff;
  }
  .box .content .login-wrapper .other-login-item {
    border-radius: 15px;
  }
  .box .content .login-wrapper .other-login-item img {
    width: 35px;
    height: 35px;
  }
}
</style>
