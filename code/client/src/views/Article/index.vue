<template>
  <div class="article">
    <div class="titleGroup">
      <h1 class="title">{{ articleInfo.article_title }}</h1>
      <h3 class="subtitle">--{{ articleInfo.article_subtitle }}</h3>
    </div>
    <div class="content" v-html="articleInfo.article_content"></div>
    <div class="labelList">
      <el-tag
        effect="plain"
        class="labelItem"
        v-for="item in labelList"
        :key="item"
      >
        {{ item }}
      </el-tag>
    </div>
    <div class="author">{{ articleInfo.author_name }}</div>
  </div>
</template>

<script>
import { getArticle } from "@/api/article.js";
export default {
  data() {
    return {
      articleInfo: {},
      labelList: [],
    };
  },
  computed: {},
  async created() {
    const id = this.$route.query.id;
    const res = await getArticle(id);
    if (res && res.code === 200) {
      this.articleInfo = res.data;
      this.labelList = res.data.label_id.split(",");
    }
  },
};
</script>

<style lang="less" scoped>
.article {
  padding: 10px 0;
  .titleGroup {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      margin-bottom: 10px;
    }
    .subtitle {
      color: #ccc;
    }
  }
  .content {
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .labelList {
  }
}
</style>
