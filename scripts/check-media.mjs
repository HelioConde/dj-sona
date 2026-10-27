import { readdir, readFile, stat } from 'node:fs/promises'
import assert from 'node:assert/strict'
import path from 'node:path'

const dir = path.join(process.cwd(), 'dist', 'movie')
const expected = ['DJ-Sona-Kinetic2.mp4', 'DJ-Sona-Concussive2.mp4', 'DJ-Sona-Ethereal2.mp4'].sort()
const files = (await readdir(dir)).sort()
assert.deepEqual(files, expected, 'Publicar somente os três vídeos necessários.')
const report = JSON.parse(await readFile('dist/media-report.json', 'utf8'))
assert.ok(report.savingPercent > 20, 'A mídia publicada deve ser pelo menos 20% mais leve.')
for (const name of files) {
  const { size } = await stat(path.join(dir, name))
  assert.ok(size > 1024 && size < 50 * 1024 * 1024, `Arquivo inválido ou excessivo: ${name}`)
}
console.log(`Mídia verificada: 3 vídeos, economia de ${report.savingPercent}%`)
