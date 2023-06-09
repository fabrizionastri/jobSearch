// vite.config.js
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)) // this creates an absolute path pointing to the src directory regardless of where vite.config.js is located
    }
  },
  test: {
    globals: true,
    setupFiles: ['./test/setup.js'] // this is used to set up the testing environment before each test
  }
})
