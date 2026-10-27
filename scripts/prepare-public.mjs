import { copyFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { copyPublicAssets, selectedVideos } from './copy-public-assets.mjs'

// O modo local pode rodar sem FFmpeg; a publicação utiliza build:pages.
await copyPublicAssets()
const target = path.join('dist', 'movie')
await mkdir(target, { recursive: true })
for (const name of selectedVideos) {
  await copyFile(path.join('public', 'movie', name), path.join(target, name))
}
console.log('Build local pronto: 3 vídeos originais copiados; use build:pages para publicar versões compactadas.')
