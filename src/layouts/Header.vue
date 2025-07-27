<template>
  <el-header>
    <div class="logo" />
    <el-menu class="header-menu"  mode="horizontal">
      <el-menu-item key="1">首页</el-menu-item>
      <el-menu-item key="2">项目</el-menu-item>
      <el-menu-item class="header-menu-item3" key="3">我的</el-menu-item>
    </el-menu>
  </el-header>
</template>

<script lang="ts" setup>
// import { ref } from 'vue'
// // const selectedKeys = ref<string[]>(['2'])
</script>
<style scoped>

.header-menu {
  justify-content: flex-end; 
  /* margin-right: 3%; */
  background: linear-gradient(to right, #7042a9, #336df3);
  width: 100%;
  padding-right: 5%;
  padding-left: 0; 
}
.el-header {
  padding: 0; 
}

</style>
