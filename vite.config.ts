import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

const BACKEND_ADDRESS = 'https://82d8e4b1dc44.ngrok-free.app';

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: BACKEND_ADDRESS,
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('Origin', BACKEND_ADDRESS);
          });
        },
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@dtos': path.resolve(__dirname, 'scr/services/dtos'),
      '@services': path.resolve(__dirname, 'src/services'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@styles/_variables" as *;
          @use "@styles/_mixins" as *;
        `,
      },
    },
  },
});
