<template>
  <div class="article">
    <h1 class="title">{{ articleInfo.article_title }}</h1>
    <h3 class="subtitle">{{ articleInfo.article_subtitle }}</h3>
    <div class="content" v-html="articleInfo.article_content"></div>
    <div class="author">{{ articleInfo.author_name }}</div>
  </div>
</template>

<script>
import { getArticle } from "@/api/article.js";
export default {
  data() {
    return {
      articleInfo: {},
    };
  },
  async created() {
    const id = this.$route.query.id;
    const res = await getArticle(id);
    if (res && res.code === 200) {
      this.articleInfo = res.data;
    }
  },
};
</script>

<style lang="less" scoped>
.article {
}
</style>
