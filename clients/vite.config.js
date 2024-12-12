import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://backend-autoexpertease-production-5fd2.up.railway.app', // Update to your deployed backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Remove '/api' prefix if needed
      }
    }
  }
})
