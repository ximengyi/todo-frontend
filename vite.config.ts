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
  //添加服务器代理配置
  server: {
    proxy: {
      '/api': {
        target: 'http://basic.dev:8787',
        changeOrigin: true,
        // 尝试移除rewrite规则，有些后端API可能需要保留/api前缀
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
