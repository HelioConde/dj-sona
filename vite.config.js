import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/dj-sona/',
  plugins: [react()],
  // O build copia somente as imagens, fontes e os 3 vídeos realmente utilizados.
  publicDir: false,
})
