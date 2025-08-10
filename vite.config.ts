import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // 添加服务器代理配置
  server: {
    proxy: {
      '/api': {
        target: 'http://basic.dev:8787', // 后端服务器地址
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, '') // 重写路径，移除/api前缀
      }
    }
  }
})
