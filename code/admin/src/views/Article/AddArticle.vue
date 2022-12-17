<template>
  <div class="addArticle">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item prop="cover" label="文章封面">
        <Upload @changeImg="form.cover = $event"></Upload>
      </el-form-item>
      <el-form-item prop="label" label="文章标签">
        <el-checkbox-group v-model="form.labelList">
          <el-checkbox
            v-for="item in tags"
            :key="item.label_id"
            :label="item.label_id"
            border
            >{{ item.label_name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item prop="title" label="文章标题">
        <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item prop="subtitle" label="文章副标题">
        <el-input
          v-model="form.subtitle"
          placeholder="请输入文章副标题"
        ></el-input>
      </el-form-item>
      <el-form-item prop="html" label="文章内容">
        <Toolbar :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
        <Editor
          style="height: 500px; overflow-y: hidden; border: 1px solid #ccc"
          v-model="form.html"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="onCreated"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish">发布</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from "vue";
import Upload from "@/components/Upload.vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { addArticle, getLabelList } from "@/api/article.js";

export default Vue.extend({
  components: { Editor, Toolbar, Upload },
  data() {
    return {
      editor: null,
      toolbarConfig: {
        excludeKeys: ["blockquote", "todo", "insertVideo", "fullScreen"],
      },
      editorConfig: { placeholder: "请输入内容..." },
      mode: "simple", // or 'simple'
      form: {
        title: "",
        subtitle: "",
        html: "",
        cover: "",
        labelList: [],
      },
      rules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "change" },
        ],
        html: [
          { required: true, message: "请输入文章标题", trigger: "change" },
        ],
      },
      tags: [],
    };
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
      console.log("onCreated", editor);
    },
    publish() {
      console.log("html", this.form.html);
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const fd = new FormData();
          fd.set("author_id", this.$store.state.userInfo.id);
          fd.set("author_name", this.$store.state.userInfo.name);
          fd.set("article_title", this.form.title);
          fd.set("article_subtitle", this.form.subtitle);
          fd.set("article_content", this.form.html);
          fd.set("article_cover", this.form.cover);
          fd.set("label_id", this.form.labelList);
          fd.set("publishTime", new Date().toLocaleString());
          const res = await addArticle(fd);
          if (res && res.code === 200) {
            this.$message.success(res.msg);
            this.resetForm();
            this.html = "";
            this.$router.push("/article");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    async getTags() {
      const res = await getLabelList();
      if (res && res.code === 200) {
        this.tags = res.data;
      }
    },
    clickTag() {},
  },
  created() {
    this.getTags();
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
});
</script>

<style lang="less" scoped>
.addArticle {
  padding: 10px;
  .tag {
    margin-right: 10px;
  }
}
</style>
<style src="@wangeditor/editor/dist/css/style.css"></style>
