import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Os caminhos do GitHub Pages precisam incluir o nome do repositório.
  base: process.env.GITHUB_PAGES === 'true' ? '/dj-sona/' : '/',
});
