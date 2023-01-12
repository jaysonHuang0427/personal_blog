<template>
  <div class="search">
    <el-input
      v-model="input"
      prefix-icon="el-icon-search"
      placeholder="请输入文章标题"
    ></el-input>
    <el-button type="primary" @click="searchEvent">搜索</el-button>
  </div>
</template>

<script>
import { getArticleList } from "@/api/article.js";
export default {
  name: "Search",
  data() {
    return {
      input: "",
    };
  },
  methods: {
    async searchEvent() {
      const res = await getArticleList(this.input);
      if (res && res.code === 200) {
        this.$store.commit("setArticleList", res.data);
        this.input = "";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  position: relative;
  display: flex;
  .el-button {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
