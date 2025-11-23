<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="login-title">登录</h2>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-width="80px"
        class="login-form"
      >
        <el-form-item label="用户名" prop="user_name">
          <el-input
            v-model="loginForm.user_name"
            placeholder="请输入用户名"
            clearable
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
            clearable
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            class="login-button"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { authAPI } from '../api';
import { setToken } from '../utils/auth';
import type { LoginParams } from '../api/modules/auth';

const router = useRouter();
const route = useRoute();
const loginFormRef = ref<FormInstance>();
const loading = ref(false);

// 登录表单数据
const loginForm = reactive<LoginParams>({
  user_name: '',
  password: '',
});

// 表单验证规则
const loginRules: FormRules = {
  user_name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度为3-20个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度为6-20个字符', trigger: 'blur' },
  ],
};

// 处理登录
const handleLogin = async () => {
  if (!loginFormRef.value) return;

  // 表单验证
  await loginFormRef.value.validate((valid) => {
    if (!valid) {
      return false;
    }
  });

  loading.value = true;
  try {
    // 调用登录接口
    const response = await authAPI.login(loginForm);
    
    // 保存token
    setToken(response.token);
    
    ElMessage.success('登录成功');
    
    // 跳转到目标页面或首页
    const redirect = (route.query.redirect as string) || '/';
    router.push(redirect);
  } catch (error: any) {
    console.error('登录失败:', error);
    ElMessage.error(error.msg || error.message || '登录失败，请检查用户名和密码');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="less">
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #7042a9, #336df3);
}

.login-box {
  width: 400px;
  padding: 40px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.login-form {
  margin-top: 20px;
}

.login-button {
  width: 100%;
  margin-top: 10px;
}
</style>

