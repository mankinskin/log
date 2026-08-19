import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

const isStatic = !!process.env.VITE_STATIC_MODE;

export default defineConfig({
  plugins: [preact()],
  define: {
    'import.meta.env.VITE_STATIC_MODE': JSON.stringify(isStatic ? 'true' : ''),
  },
  base: process.env.VITE_BASE_URL || '/',
  build: {
    outDir: isStatic ? 'dist' : '../static',
    emptyOutDir: true,
  },
  resolve: {
    dedupe: ['preact', '@preact/signals', '@preact/signals-core'],
    preserveSymlinks: true,
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
  optimizeDeps: {
    exclude: ['@context-engine/viewer-api-frontend'],
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
});
