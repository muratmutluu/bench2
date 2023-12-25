import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000' || 'https://bench-yf02.onrender.com',
        secure: true,
      },
    },
  },
  plugins: [react()],
});
