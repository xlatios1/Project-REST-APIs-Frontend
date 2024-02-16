import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 3002,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
  base: 'http://localhost:3002/',
  resolve:{
    alias: {
      '@slices': path.resolve(__dirname, './src/slices'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@store': path.resolve(__dirname, './src/store'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@customhooks': path.resolve(__dirname, './src/customhooks'),
      '@authentications': path.resolve(__dirname, './src/authentications'),
      '@root': path.resolve(__dirname, './src'),
    }
  },
})
