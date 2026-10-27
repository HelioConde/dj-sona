/**
 * Prepara um build pequeno para GitHub Pages sem alterar vídeos originais.
 * Uso: npm run build && npm run media:optimize
 * Requer FFmpeg e FFprobe disponíveis no PATH.
 */
import { spawnSync } from 'node:child_process'
import { copyFile, mkdir, readdir, rename, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const files = [
  'DJ-Sona-Kinetic2.mp4',
  'DJ-Sona-Concussive2.mp4',
  'DJ-Sona-Ethereal2.mp4',
]
const root = process.cwd()
const originalDir = path.join(root, 'public', 'movie')
const outputDir = path.join(root, 'dist', 'movie')
const tempDir = path.join(root, 'dist', '_optimized_movie')

function command(program, args, timeout = 8 * 60 * 1000) {
  const output = spawnSync(program, args, { encoding: 'utf8', timeout, maxBuffer: 2 * 1024 * 1024 })
  if (output.error || output.status !== 0) {
    throw new Error(`${program} falhou: ${output.error?.message || output.stderr || output.stdout}`)
  }
  return output.stdout.trim()
}

function duration(file) {
  const output = command('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', file])
  const seconds = Number(output)
  if (!Number.isFinite(seconds) || seconds <= 0) throw new Error(`Duração inválida: ${file}`)
  return seconds
}

await mkdir(tempDir, { recursive: true })
const stats = []
try {
  for (const filename of files) {
    const original = path.join(originalDir, filename)
    const optimized = path.join(tempDir, filename)
    const before = await stat(original)
    const sourceDuration = duration(original)
    console.log(`Otimizando ${filename} (${(before.size / 1e6).toFixed(1)} MB)...`)
    command('ffmpeg', [
      '-hide_banner', '-loglevel', 'error', '-y', '-i', original,
      '-map', '0:v:0', '-map', '0:a:0?',
      '-vf', "scale='min(iw,1280)':'min(ih,720)':force_original_aspect_ratio=decrease:force_divisible_by=2",
      '-c:v', 'libx264', '-preset', 'fast', '-crf', '30',
      '-maxrate', '1100k', '-bufsize', '2200k',
      '-pix_fmt', 'yuv420p', '-r', '24',
      '-c:a', 'aac', '-b:a', '96k', '-ac', '2',
      '-movflags', '+faststart',
      optimized,
    ])
    const after = await stat(optimized)
    const outputDuration = duration(optimized)
    if (after.size > before.size || after.size <= 1024) {
      throw new Error(`O vídeo ${filename} não foi compactado adequadamente`)
    }
    if (outputDuration < sourceDuration * 0.98) {
      throw new Error(`O vídeo ${filename} perdeu conteúdo durante a conversão`)
    }
    stats.push({ filename, originalBytes: before.size, publishedBytes: after.size, durationSeconds: Math.round(outputDuration), savingPercent: Math.round((1 - after.size / before.size) * 100) })
  }
  // O Vite copia public/ inteiro; trocar apenas após a validação de TODOS os vídeos.
  await rm(outputDir, { recursive: true, force: true })
  await mkdir(outputDir, { recursive: true })
  for (const filename of files) await rename(path.join(tempDir, filename), path.join(outputDir, filename))
  const total = stats.reduce((acc, item) => ({ before: acc.before + item.originalBytes, after: acc.after + item.publishedBytes }), { before: 0, after: 0 })
  await writeFile(path.join(root, 'dist', 'media-report.json'), JSON.stringify({ files: stats, originalBytes: total.before, publishedBytes: total.after, savingPercent: Math.round((1 - total.after / total.before) * 100) }, null, 2))
  const published = await readdir(outputDir)
  if (published.length !== files.length || !files.every((file) => published.includes(file))) {
    throw new Error('O build deve conter apenas as três faixas realmente utilizadas.')
  }
  console.log(`Mídia publicada: ${(total.after / 1e6).toFixed(1)} MB de ${(total.before / 1e6).toFixed(1)} MB (${Math.round((1 - total.after / total.before) * 100)}% menos)`)
} finally {
  await rm(tempDir, { recursive: true, force: true })
}
