<template>
  <div class="home">
    <header>
      <div class="logo">jayson_ru的个人博客-管理端</div>
    </header>
    <main>
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item
          v-for="item in menuList"
          :key="item.path"
          :index="item.path"
        >
          <i :class="item.meta.icon"></i>
          <span slot="title">{{ item.meta.menuName }}</span>
        </el-menu-item>
      </el-menu>
      <div class="content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import { routes } from "@/router/index.js";

export default {
  data() {
    return {
      isCollapse: false,
      activeMenu: "/home",
    };
  },
  computed: {
    menuList() {
      return routes.filter((item) => {
        if (item.meta) {
          return item.meta.icon;
        }
      });
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  created() {},
};
</script>

<style lang="less" scoped>
.home {
  width: 100vw;
  height: 100vh;
  header {
    padding: 0 10px;
    height: 3%;
    background-color: #545c64;
    .logo {
      line-height: 38px;
      font-size: 18px;
      font-weight: 700;
      color: #fff;
    }
  }
  main {
    display: flex;
    height: 97%;
    .el-menu-vertical-demo {
      width: 10%;
      height: 100%;
    }
    .content {
      width: 90%;
      height: 100%;
      background-color: #fff;
    }
  }
}
</style>
