import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        blog: resolve(import.meta.dirname, 'blog.html'),
        contact: resolve(import.meta.dirname, 'contact.html'),
      },
    },
  },
});
