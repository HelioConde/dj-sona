import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';

const origin = process.env.PAGES_PREVIEW_URL || 'http://127.0.0.1:4173/dj-sona/';
const sizes = [
  { width: 360, height: 740 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 }
];
mkdirSync('artifacts/screenshots', { recursive: true });
const browser = await chromium.launch({ headless: true });
let checks = 0;

try {
  for (const size of sizes) {
    const page = await browser.newPage({ viewport: size, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error' && !/media|mp4|net::ERR_/i.test(message.text())) errors.push(message.text()); });
    const response = await page.goto(origin, { waitUntil: 'domcontentloaded', timeout: 30000 });
    assert.equal(response?.status(), 200, 'Status HTTP da home');
    await page.getByRole('heading', { name: /Sinta a energia/i }).waitFor();
    assert.equal(await page.getByRole('button', { name: 'Selecionar Concussive' }).getAttribute('aria-pressed'), 'true');
    await page.getByRole('button', { name: 'Selecionar Kinetic' }).click();
    assert.equal(await page.getByRole('button', { name: 'Selecionar Kinetic' }).getAttribute('aria-pressed'), 'true');
    await page.getByRole('button', { name: 'Selecionar Ethereal' }).click();
    assert.equal(await page.getByRole('button', { name: 'Selecionar Ethereal' }).getAttribute('aria-pressed'), 'true');
    assert.equal(await page.getByText(/Movimento reduzido ativado/i).count(), 1);
    assert.equal(await page.locator('html').evaluate((element) => element.scrollWidth <= window.innerWidth + 1), true, 'Sem overflow horizontal');
    await page.screenshot({ path: 'artifacts/screenshots/home-' + size.width + '.png', fullPage: true });
    checks += 6;

    if (size.width < 820) {
      await page.getByRole('button', { name: 'Abrir menu' }).click();
      await page.getByRole('link', { name: 'História' }).click();
    } else {
      await page.getByRole('link', { name: 'História' }).click();
    }
    await page.getByRole('heading', { name: /A história/i }).waitFor();
    await page.screenshot({ path: 'artifacts/screenshots/historia-' + size.width + '.png', fullPage: true });
    await page.getByRole('link', { name: 'Wallpapers' }).click();
    await page.getByRole('heading', { name: /Artes das formas/i }).waitFor();
    await page.screenshot({ path: 'artifacts/screenshots/wallpapers-' + size.width + '.png', fullPage: true });
    await page.getByRole('link', { name: 'Vídeos' }).click();
    await page.getByRole('heading', { name: /Vídeos das formas/i }).waitFor();
    await page.screenshot({ path: 'artifacts/screenshots/videos-' + size.width + '.png', fullPage: true });
    assert.equal(await page.locator('html').evaluate((element) => element.scrollWidth <= window.innerWidth + 1), true, 'Sem overflow nas rotas');
    assert.deepEqual(errors, [], 'Erros JS e console');
    checks += 5;
    await page.close();
  }
  console.log('DJ Sona: ' + checks + ' verificações aprovadas; ' + (sizes.length * 4) + ' capturas.');
} finally {
  await browser.close();
}
