<template>
  <div class="layout">
    <header>
      <div class="top">
        <div class="blog_name">jayson_blog</div>
        <ul class="nav">
          <li @click="$router.push('/home')">主页</li>
          <li>友链</li>
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
            <span class="iconfont icon-wechat"></span>
            <span class="iconfont icon-github"></span>
            <span class="el-icon-message"></span>
          </div>
        </div>
      </div>
      <div class="view">
        <router-view></router-view>
      </div>
      <div class="right">
        <div class="labelGroup">
          <h1>热门标签</h1>
          <el-tag
            effect="plain"
            v-for="item in labelList"
            :key="item.label_id"
            @click="tagClick(item.label_id)"
            >{{ item.label_name }}</el-tag
          >
        </div>
        <div class="articleHot">
          <h1>热门文章</h1>
          <div class="item" v-for="item in articleList" :key="item.article_id">
            {{ item.article_title }}
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { getArticleByLabel } from "@/api/article.js";
import Avator from "@/components/Avator.vue";

export default {
  components: { Avator },
  data() {
    return {};
  },
  computed: {
    articleList() {
      return this.$store.state.articleList;
    },
    labelList() {
      return this.$store.state.labelList;
    },
  },
  async created() {
    if (!localStorage.getItem("accessToken")) {
      await this.$store.dispatch("loginHandler");
    }
    await this.$store.dispatch("getList");
  },
  methods: {
    async tagClick(id) {
      const res = await getArticleByLabel(id);
      if (res && res.code === 200) {
        this.$store.commit("setArticleList", res.data);
      }
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
    }
    .view {
      width: 800px;
    }
    .right {
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
          margin-bottom: 3px;
        }
      }
    }
  }
}
</style>
