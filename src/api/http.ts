import axios from 'axios';
import type {InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ElMessage } from 'element-plus';
// 由于找不到 '@/utils/auth' 模块，当前仅为占位导入，实际使用时需要创建该文件
// 请在项目的 '@/utils/auth' 路径下创建 auth.ts 文件并实现 getToken 和 removeToken 函数
// 由于找不到 '@/utils/auth' 模块，暂时使用空函数作为占位
import { getToken, removeToken } from '../utils/auth';
// const getToken = () => '';
// const removeToken = () => {};

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 添加认证token
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // 请求错误处理
    ElMessage.error('请求参数错误');
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    // 假设后端统一响应格式为 { code: number, data: any, message: string }
    if (data.code !== 200) {
      // 业务错误处理
      ElMessage.error(data.message || '操作失败');
      // 处理401未授权
      if (data.code === 401) {
        removeToken();
        window.location.href = '/login';
      }
      return Promise.reject(data);
    }
    return data.data; // 只返回data字段
  },
  (error: AxiosError) => {
    // 网络错误处理
    const status = error.response?.status;
    switch (status) {
      case 404:
        ElMessage.error('接口不存在');
        break;
      case 500:
        ElMessage.error('服务器内部错误');
        break;
      default:
        ElMessage.error('网络连接错误');
    }
    return Promise.reject(error);
  }
);

export default service;