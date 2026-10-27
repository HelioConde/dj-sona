import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Vite configura o subdiretório do GitHub Pages', () => {
  assert.match(read('vite.config.js'), /base:\s*['"]\/dj-sona\/['"]/)
})

test('Navegação e roteamento usam hashes para funcionar em hospedagem estática', () => {
  assert.match(read('src/App.jsx'), /HashRouter/)
  for (const route of ['/historia', '/wallpapers', '/videos']) {
    assert.ok(read('src/App.jsx').includes(route))
    assert.ok(read('src/Nav.jsx').includes(route))
  }
})

test('Formas mantêm os três temas e mídias locais', () => {
  const data = read('src/data.js')
  for (const mode of ['Kinetic', 'Concussive', 'Ethereal']) {
    assert.ok(data.includes(mode))
    assert.ok(data.includes(`DJ-Sona-${mode}2.mp4`))
  }
  for (const image of ['icon1.jpg', 'icon2.jpg', 'icon3.jpg']) {
    assert.ok(existsSync(new URL(`../public/${image}`, import.meta.url)))
  }
})

test('Vídeo tem política de áudio e alternativa para movimento reduzido', () => {
  const home = read('src/Home.jsx')
  assert.match(home, /setSoundOn/)
  assert.match(home, /prefers-reduced-motion/)
  assert.match(home, /aria-pressed/)
  assert.match(home, /playbackError/)
})

test('Publicação em Pages compila e usa ações oficiais', () => {
  const workflow = read('.github/workflows/pages.yml')
  assert.match(workflow, /npm ci/)
  assert.match(workflow, /npm run build/)
  assert.match(workflow, /actions\/deploy-pages@v4/)
})
