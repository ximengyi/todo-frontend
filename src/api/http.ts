import axios from 'axios';
import type {InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ElMessage } from 'element-plus';
import { getToken, removeToken } from '../utils/auth';
import router from '../router';

// 创建axios实例
const service = axios.create({
  baseURL: '/api', // 直接设置为/api
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
// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    // 假设后端统一响应格式为 { code: number, msg: string, data: any }
    if (data.code !== 0) {
      // 业务错误处理
      ElMessage.error(data.msg || '操作失败');
      // 处理401未授权
      if (data.code === 401) {
        removeToken();
        router.push('/login');
      }
      return Promise.reject(data);
    }
    return data.data; // 只返回data字段
  },
  (error: AxiosError) => {
    // 网络错误处理
    const status = error.response?.status;
    switch (status) {
      case 401:
        // HTTP 401未授权
        removeToken();
        router.push('/login');
        ElMessage.error('登录已过期，请重新登录');
        break;
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