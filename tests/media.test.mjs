import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('originais permanecem intactos e três vídeos alimentam a experiência', () => {
  const data = read('src/data.js')
  for (const mode of ['Kinetic', 'Concussive', 'Ethereal']) {
    const name = `DJ-Sona-${mode}2.mp4`
    assert.ok(data.includes(name))
    assert.ok(existsSync(new URL(`../public/movie/${name}`, import.meta.url)))
  }
})
test('o workflow sempre publica mídia compactada, e não MP4s originais', () => {
  const deployment = read('.github/workflows/pages.yml')
  assert.match(deployment, /npm run build:pages/)
  assert.match(deployment, /npm run media:check/)
  // Capturas usam build rápido; a publicação real continua validando os vídeos.
  assert.match(read('.github/workflows/ci.yml'), /npm run build/)
  assert.match(read('vite.config.js'), /publicDir:\s*false/)
  const script = read('scripts/optimize-media.mjs')
  assert.match(script, /ffmpeg/)
  assert.match(script, /ffprobe/)
  assert.match(script, /movflags/)
  assert.match(script, /sourceDuration \* 0\.98/)
})
test('arquivos compilados ficam ignorados no versionamento', () => {
  const ignored = read('.gitignore')
  assert.ok(ignored.includes('dist/'))
  assert.ok(ignored.includes('qa-screenshots/'))
})
