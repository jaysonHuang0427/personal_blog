<template>
  <div class="article_item">
    <div class="info">
      <h1 class="title">
        {{ title }}
      </h1>
      <h3 class="subtitle">
        {{ subtitle }}
      </h3>
      <button class="btn" @click="$router.push(`/article?id=${article_id}`)">
        了解更多
      </button>
    </div>
    <div class="cover">
      <img :src="require('@/assets/defaultCover.jpg')" :data-url="imgUrl" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  directives: {
    img: {
      bind: function (el, binding) {
        if (!binding.value) {
          el.src = require("@/assets/defaultCover.jpg");
        }
      },
    },
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    imgUrl: {
      type: String,
      default: "",
    },
    article_id: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style lang="less" scoped>
.article_item {
  position: relative;
  width: 700px;
  height: 300px;
  border-radius: 25px;
  box-shadow: 8px 11px 89px 25px #d8d8d8;
  margin-bottom: 50px;
  transition: all 0.3s;
  &:hover {
    box-shadow: 8px 11px 70px 40px #d8d8d8;
  }
  .info {
    float: right;
    width: 400px;
    margin-top: 30px;
    .title {
      margin-bottom: 20px;
    }
    .subtitle {
      margin-bottom: 40px;
    }
    .btn {
      width: 100px;
      height: 40px;
      border-radius: 20px;
      font-size: 16px;
      text-align: center;
      line-height: 40px;
      background-color: #05814e;
      color: #fff;
      cursor: pointer;
    }
  }

  .cover {
    position: absolute;
    top: -25px;
    left: -55px;
    width: 300px;
    height: 300px;
    // background: linear-gradient(to bottom right, #e78746, #f66353);
    // background-image: url("@/assets/defaultCover.jpg");
    background-size: cover;
    border-radius: 30px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border: 2px solid #000;
    }
  }
}
</style>
