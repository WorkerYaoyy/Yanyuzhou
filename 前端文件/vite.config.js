import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 研宇宙前端开发配置
export default defineConfig({
  plugins: [react()],
  build: {
    // 当前沙箱拦截了 dist 目录的删除操作，关闭自动清空以避免 trash 报错；
    // 产物使用哈希文件名，index.html 始终引用最新资源，旧文件无副作用。
    emptyOutDir: false
  },
  server: {
    port: 5173,
    host: true,
    open: false
  }
})
