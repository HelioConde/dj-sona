import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages: https://helioconde.github.io/dj-sona/
  base: '/dj-sona/',
  plugins: [react()],
  // Publicação enxuta: o pós-build copia somente os arquivos utilizados.
  publicDir: false,
})
