import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default {
  server: {
    port: 8081
  },
  plugins: [
    react(),
    WindiCSS()
  ]
}
