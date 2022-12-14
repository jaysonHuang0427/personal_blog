<template>
  <div class="detail">
    <div class="content" v-html="articleInfo.article_content"></div>
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
    const res = await getArticle(+this.$route.query.id);
    this.articleInfo = res.data;
  },
};
</script>

<style lang="less" scoped>
.detail {
}
</style>
