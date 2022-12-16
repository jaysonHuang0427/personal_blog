<template>
  <div class="home">
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
    <div class="articleList">
      <ArticleItem
        v-for="item in articleList"
        :key="item.article_id"
        :title="item.article_title"
        :subtitle="item.article_subtitle"
      ></ArticleItem>
    </div>
    <div class="right">
      <div class="labelGroup">
        <h1>热门标签</h1>
        <el-tag effect="plain" v-for="item in labelList" :key="item.label_id">{{
          item.label_name
        }}</el-tag>
      </div>
      <div class="articleHot">
        <h1>热门文章</h1>
        <div class="item" v-for="item in articleList" :key="item.article_id">
          {{ item.article_title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleItem from "@/components/ArticleItem.vue";
import Avator from "@/components/Avator.vue";
import { getArticleList, getLabelList } from "@/api/article.js";
export default {
  components: { ArticleItem, Avator },
  data() {
    return {
      articleList: [],
      labelList: [],
    };
  },
  created() {
    this.$store.dispatch("loginHandler").then(async () => {
      const res = await getArticleList();
      const res2 = await getLabelList();
      if (res && res.code === 200) {
        this.articleList = res.data;
        this.labelList = res2.data;
      }
    });
  },
};
</script>

<style lang="less" scoped>
.home {
  display: flex;
  justify-content: space-around;
  .left {
    width: 400px;
    // background-color: #90f;
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
        }
        .el-icon-message {
          font-size: 30px;
          cursor: pointer;
        }
      }
    }
  }
  .articleList {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
  .right {
    width: 400px;
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
</style>
