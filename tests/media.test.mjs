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
  for (const file of ['.github/workflows/pages.yml', '.github/workflows/ci.yml']) {
    const workflow = read(file)
    assert.match(workflow, /npm run build:pages/)
    assert.match(workflow, /npm run media:check/)
  }
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
