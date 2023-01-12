<template>
  <div class="article">
    <div class="btn-group">
      <el-button type="primary" round @click="$router.push('/article/add')"
        >写文章</el-button
      >
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="publishTime" label="日期"> </el-table-column>
      <el-table-column prop="author_name" label="作者"> </el-table-column>
      <el-table-column prop="article_title" label="标题"> </el-table-column>
      <el-table-column prop="article_subtitle" label="副标题">
      </el-table-column>
      <el-table-column prop="label_id" label="标签"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
          <el-button
            type="text"
            size="small"
            @click="delArticle(scope.row.article_id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getArticleList, delArticle } from "@/api/article.js";

export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleClick(row) {
      this.$router.push(`/article/detail?id=${row.article_id}`);
    },
    async getData() {
      const res = await getArticleList();
      if (res && res.code === 200) {
        this.tableData = res.data;
      }
    },
    delArticle(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await delArticle({ id });
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getData();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.article {
  width: 100%;
  height: 100%;
  padding: 10px;
}
</style>
