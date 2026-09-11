import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'

const backendEnv = dotenv.config({ path: './backend/.env' })
const backendTarget = backendEnv.parsed?.BACKEND_PUBLIC_URL || 'https://fonovital-1.onrender.com'

export default defineConfig(({ mode }) => ({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: mode === 'development'
          ? (backendEnv.parsed?.LOCAL_BACKEND_URL || 'http://localhost:3001')
          : backendTarget,
        changeOrigin: true,
      },
    },
  },
}))
