<template>
  <div class="layout">
    <header>
      <div class="top">
        <div class="blog_name">jayson_blog</div>
        <ul class="nav">
          <li @click="$router.push('/home')">主页</li>
          <li>友链</li>
          <li>关于我</li>
        </ul>
      </div>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.layout {
  background-color: #f9f9f9;
  header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 5vh;
    padding: 10px 10px;
    background-color: #fff;
    box-shadow: 2px 2px 10px 1px #d8d8d8;
    .top {
      height: 100%;
      display: flex;
      justify-content: space-between;
      color: #000;
      font-size: 24px;
      font-weight: 700;
      .nav {
        width: 20vw;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        li {
          cursor: pointer;
          &:hover {
            color: #05814e;
          }
        }
      }
    }
  }
  main {
    margin-top: 5vh;
  }
}
</style>
