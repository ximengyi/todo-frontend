<template>
  <el-header>
    <div class="logo" />
    <el-menu class="header-menu" mode="horizontal">
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">项目</el-menu-item>
      <el-menu-item class="header-menu-item3" index="3">我的</el-menu-item>
      <el-menu-item index="4" @click="handleLogout">
        <el-button type="danger" size="small" text>登出</el-button>
      </el-menu-item>
    </el-menu>
  </el-header>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { authAPI } from '../api';
import { removeToken } from '../utils/auth';

const router = useRouter();

// 处理登出
const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });

    // 调用登出接口
    try {
      await authAPI.logout();
    } catch (error) {
      // 即使接口失败也清除本地token
      console.error('登出接口调用失败:', error);
    }

    // 清除本地token
    removeToken();
    
    ElMessage.success('已退出登录');
    
    // 跳转到登录页
    router.push('/login');
  } catch (error) {
    // 用户取消操作
    if (error !== 'cancel') {
      console.error('登出失败:', error);
    }
  }
};
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
