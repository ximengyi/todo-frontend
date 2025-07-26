<template>
 <el-footer class="footer"> 版权所有 ©{{ year }} 梦中繁星 </el-footer>

</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: linear-gradient(to right, #7042a9, #336df3);
  text-align: center;
  width: 100%;
}
</style>
