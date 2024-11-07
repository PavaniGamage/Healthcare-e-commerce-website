import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all requests starting with '/formattedProducts' to the backend
      '/formattedProducts': 'http://localhost:4000',  // formattedProducts - for fetch data from backend
    }
  }
})

