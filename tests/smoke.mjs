import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const get = (file) => readFileSync(new URL('../' + file, import.meta.url), 'utf8');
test('todas as rotas possuem conteúdo real', () => {
  for (const route of ['History', 'Wallpapers', 'Movies']) {
    assert.match(get('src/' + route + '.jsx'), /<main id="conteudo"/);
  }
});
test('formas e vídeos originais estão disponíveis', () => {
  for (const name of ['Kinetic2', 'Concussive2', 'Ethereal2']) {
    assert.ok(existsSync(new URL('../public/movie/DJ-Sona-' + name + '.mp4', import.meta.url)));
  }
});
test('deploy de Pages e movimento reduzido configurados', () => {
  assert.match(get('vite.config.js'), /GITHUB_PAGES/);
  assert.match(get('src/Home.jsx'), /prefers-reduced-motion/);
  assert.match(get('src/App.jsx'), /HashRouter/);
});
