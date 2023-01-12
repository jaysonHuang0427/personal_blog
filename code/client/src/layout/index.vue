<template>
  <div class="layout">
    <DialogComponent
      :dialog-visible="dialogVisible"
      @update:dialogVisible="dialogVisible = $event"
    ></DialogComponent>
    <header>
      <div class="top">
        <div class="blog_name">jayson_blog</div>
        <ul class="nav">
          <li :class="{ active: $route.path === '/home' }" @click="toHome">
            主页
          </li>
          <li
            :class="{ active: $route.path === '/abc' }"
            @click="$router.push('/abc')"
          >
            友链
          </li>
          <li>关于我</li>
        </ul>
      </div>
    </header>
    <main>
      <div class="left">
        <div class="my_info">
          <div class="avator">
            <Avator></Avator>
          </div>
          <div class="name">RRRRRu</div>
          <div class="contact">
            <span
              class="iconfont icon-wechat"
              @click="dialogVisible = true"
            ></span>
            <span class="iconfont icon-github" @click="toGithub"></span>
            <el-popover
              placement="bottom"
              width="250"
              trigger="hover"
              content="hzr15220152020@163.com"
            >
              <span slot="reference" class="el-icon-message"></span>
            </el-popover>
          </div>
        </div>
        <div class="siteInfo">
          <h1>网站信息</h1>
          <div class="item">
            <p>文章数目：</p>
            <p>{{ articleList.length }}篇</p>
          </div>
          <div class="item">
            <p>运行时间：</p>
            <p>天</p>
          </div>
          <div class="item">
            <p>上次更新：</p>
            <p>{{ new Date().toLocaleString() }}</p>
          </div>
        </div>
      </div>
      <div class="view">
        <router-view></router-view>
      </div>
      <div class="right">
        <Search></Search>
        <div class="labelGroup">
          <h1>热门标签</h1>
          <el-tag
            v-for="item in labelList"
            :key="item.label_id"
            effect="plain"
            @click="tagClick(item.label_id)"
            >{{ item.label_name }}</el-tag
          >
        </div>
        <div class="articleHot">
          <h1>热门文章</h1>
          <div
            v-for="(item, index) in hotList"
            :key="item.article_title"
            class="item"
            @click="toDetail(item.article_id)"
          >
            <p>{{ item.article_title }}</p>
            <p>
              <span
                :class="index === 0 ? 'el-icon-medal-1' : 'el-icon-medal'"
              ></span
              >{{ item.readingCount }}
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { getArticleByLabel, getArticleList } from "@/api/article.js";

export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
  computed: {
    articleList() {
      return this.$store.state.articleList;
    },
    labelList() {
      return this.$store.state.labelList;
    },
    hotList() {
      return this.$store.state.articleHotList;
    },
  },
  async created() {
    if (!localStorage.getItem("accessToken")) {
      await this.$store.dispatch("loginHandler");
    } else if (this.$route.path === "/home") {
      await this.$store.dispatch("getList");
    }
  },
  methods: {
    async tagClick(id) {
      const res = await getArticleByLabel(id);
      if (res && res.code === 200) {
        this.$store.commit("setArticleList", res.data);
      }
    },
    toDetail(id) {
      this.$router.push(`/article?id=${id}`);
    },
    async toHome() {
      this.$route.path === "/home" ? "" : this.$router.push("/home");
      const res = await getArticleList();
      if (res && res.code === 200) {
        this.$store.commit("setArticleList", res.data);
      }
    },
    toGithub() {
      window.open("https://github.com/jaysonHuang0427");
    },
  },
};
</script>

<style lang="less" scoped>
.layout {
  background-color: #f9f9f9;
  header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 5vh;
    padding: 10px 10px;
    background-color: #fff;
    box-shadow: 2px 2px 10px 1px #d8d8d8;
    .top {
      height: 100%;
      display: flex;
      justify-content: space-between;
      color: #000;
      font-size: 24px;
      font-weight: 700;
      .nav {
        width: 20vw;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .active {
          color: #05814e;
        }
        li {
          cursor: pointer;
          &:hover {
            color: #05814e;
          }
        }
      }
    }
  }
  main {
    display: flex;
    justify-content: space-around;
    margin-top: 5vh;
    .left {
      position: fixed;
      top: 90px;
      left: 150px;
      width: 400px;
      .my_info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin-top: 30px;
        width: 100%;
        height: 350px;
        box-shadow: 5px 5px 71px 30px #d8d8d8;
        .name {
          font-size: 26px;
          font-weight: 700;
        }
        .contact {
          width: 200px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          .iconfont {
            font-size: 30px;
            cursor: pointer;
            &:hover {
              color: #05814e;
            }
          }
          .el-icon-message {
            font-size: 30px;
            cursor: pointer;
            &:hover {
              color: #05814e;
            }
          }
        }
      }
      .siteInfo {
        padding: 0 10px;
        margin-top: 30px;
        width: 100%;
        height: 180px;
        box-shadow: 5px 5px 71px 30px #d8d8d8;
        h1 {
          margin-bottom: 20px;
        }
        .item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 18px;
        }
      }
    }
    .view {
      width: 800px;
    }
    .right {
      position: fixed;
      top: 90px;
      right: 150px;
      width: 400px;
      .el-tag {
        cursor: pointer;
        margin-right: 10px;
        margin-bottom: 10px;
      }
      .labelGroup,
      .articleHot {
        width: 100%;
        height: 350px;
        padding: 10px;
        box-shadow: 5px 5px 71px 30px #d8d8d8;
        margin-top: 30px;
        h1 {
          margin-bottom: 10px;
        }
        .item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          font-size: 20px;
          cursor: pointer;
          &:hover {
            color: #05814e;
          }
        }
      }
    }
  }
}
</style>
