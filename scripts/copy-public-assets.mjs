import { copyFile, mkdir, stat } from 'node:fs/promises'
import path from 'node:path'

export const selectedVideos = ['DJ-Sona-Kinetic2.mp4', 'DJ-Sona-Concussive2.mp4', 'DJ-Sona-Ethereal2.mp4']
export const publicAssets = ['icon-dj-sona.png', 'icon1.jpg', 'icon2.jpg', 'icon3.jpg', 'font/BebasNeue-Regular.woff2', '.nojekyll']

/** Copia apenas imagens e fontes usadas; não varre 400 MB de mídias legadas. */
export async function copyPublicAssets(root = process.cwd()) {
  const original = path.join(root, 'public')
  const target = path.join(root, 'dist')
  for (const relative of publicAssets) {
    const dest = path.join(target, relative)
    await mkdir(path.dirname(dest), { recursive: true })
    if (relative === '.nojekyll') {
      await copyFile(path.join(original, relative), dest)
      continue
    }
    const src = path.join(original, relative)
    const info = await stat(src)
    if (!info.isFile()) throw new Error(`Arquivo público não encontrado: ${src}`)
    await copyFile(src, dest)
  }
}
