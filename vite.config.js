import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative assets work under /dj-sona/ on GitHub Pages and on a custom domain.
  base: './',
});