<template>
  <div class="home">
    <Upload></Upload>
  </div>
</template>

<script>
import Upload from "@/components/Upload.vue";

export default {
  components: { Upload },
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>
