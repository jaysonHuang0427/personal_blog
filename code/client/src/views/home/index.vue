<template>
  <div class="home">
    <div class="articleList">
      <ArticleItem
        v-for="item in articleList"
        :key="item.article_id"
        :title="item.article_title"
        :subtitle="item.article_subtitle"
        :imgUrl="item.article_cover"
        :article_id="item.article_id"
      ></ArticleItem>
    </div>
    <div v-if="!articleList.length">
      <el-empty description="暂无结果"></el-empty>
    </div>
  </div>
</template>

<script>
import ArticleItem from "@/components/ArticleItem.vue";

export default {
  components: { ArticleItem },
  data() {
    return {
      imgs: [],
    };
  },
  computed: {
    articleList() {
      return this.$store.state.articleList;
    },
  },
  mounted() {
    this.imgs = document
      .querySelector(".articleList")
      .getElementsByTagName("img");
    // console.log("imgs", this.imgs);
    setTimeout(() => {
      this.scrollEvent();
    }, 300);
    window.onscroll = this.scrollEvent;
  },
  methods: {
    scrollEvent() {
      const innerHeight = window.innerHeight;
      // console.log("innerHeight", innerHeight);
      Array.from(this.imgs).forEach((item) => {
        const ele = item.getBoundingClientRect();
        // console.log("ele", ele.top);
        // 图片懒加载
        if (
          ele.top > 0 &&
          ele.top < innerHeight &&
          item.getAttribute("data-url")
        ) {
          // console.log("setAttribute", item);
          item.setAttribute("src", item.getAttribute("data-url"));
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  .articleList {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
}
</style>
