
<template>
  <div class="common-layout">
    <el-container direction="vertical">
      <Header />
      <Content class="basic-layout"/>
      <Footer />
    </el-container>
  </div>
</template>


<script lang="ts" setup>
import Header from './Header.vue'
import Footer from './Footer.vue'
import Content from './Content.vue'
</script>

<style scoped>


.common-layout {
  width: 100vw;
  min-height: 100vh;
  display: flex; /* 添加flex布局 */
  flex-direction: column; /* 垂直排列 */
}

.basic-layout {
  min-height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to right, #7042a9, #336df3);
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.common-layout {
  width: 100vw; /* 视窗宽度 */
  min-height: 100vh; /* 视窗高度 */
}

.el-container {
  height: 100vh; /* 容器高度占满 */
  border: none;
}
</style>
