import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base ('./') guarantees all JS, CSS, image, poster, and video assets resolve
// accurately both at domain root and under any GitHub Pages repository subpath
// (e.g., https://zarif5193.github.io/zarifhasann.github.io/).
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: true,
  },
  build: {
    outDir: 'gh-pages-site',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['motion'],
        },
      },
    },
  },
});
