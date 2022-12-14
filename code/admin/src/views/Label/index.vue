<template>
  <div class="label">
    <el-button type="primary" round @click="addLabel">增加标签</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="label_id" label="标签id"> </el-table-column>
      <el-table-column prop="label_name" label="标签名"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small" @click="edit">编辑</el-button>
          <el-button
            type="text"
            size="small"
            @click="delLabel(scope.row.label_id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Add
      :dialogFormVisible="dialogShow"
      @changeDialogVisible="dialogShow = $event"
      @getData="getData"
    ></Add>
  </div>
</template>

<script>
import Add from "./components/Add.vue";
import { getLabelList, delLabel } from "@/api/article.js";

export default {
  data() {
    return {
      tableData: [],
      dialogShow: false,
    };
  },
  components: { Add },
  methods: {
    handleClick(row) {},
    addLabel() {
      this.dialogShow = true;
    },
    edit() {
      this.dialogShow = true;
    },
    delLabel(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await delLabel({ id });
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
    async getData() {
      const res = await getLabelList();
      if (res && res.code === 200) {
        this.tableData = res.data;
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.label {
  width: 100%;
  height: 100%;
  padding: 10px;
}
</style>
