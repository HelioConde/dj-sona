import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'

const base = process.env.QA_URL || 'http://127.0.0.1:4173/dj-sona/'
const captures = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
]
await mkdir('qa-screenshots', { recursive: true })
const errors = []
const results = []
const browser = await chromium.launch({ headless: true })
try {
  for (const viewport of captures) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: 'reduce',
    })
    page.on('pageerror', (error) => errors.push(`${viewport.name}: ${error.message}`))
    const response = await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 30000 })
    assert.equal(response?.status(), 200, 'Página inicial deve responder com HTTP 200')
    await page.getByRole('heading', { name: /FEEL THE/i }).waitFor({ timeout: 15000 })
    await page.screenshot({ path: `qa-screenshots/${viewport.name}.png`, fullPage: true })
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    assert.ok(overflow <= 2, `Overflow horizontal em ${viewport.name}: ${overflow}px`)
    await page.getByRole('button', { name: /Kinetic/i }).click()
    assert.equal(await page.getByRole('button', { name: /Kinetic/i }).getAttribute('aria-pressed'), 'true')
    await page.getByRole('button', { name: /Ativar som/i }).click()
    assert.equal(await page.getByRole('button', { name: /Silenciar/i }).getAttribute('aria-pressed'), 'true')
    if (viewport.name === 'desktop') {
      for (const route of [
        { label: 'História', heading: /TRÊS FORMAS/i },
        { label: 'Artes', heading: /ARTES DAS FORMAS/i },
        { label: 'Vídeos', heading: /ASSISTA ÀS FORMAS/i },
      ]) {
        await page.getByRole('link', { name: route.label, exact: true }).click()
        await page.getByRole('heading', { name: route.heading }).waitFor()
        await page.screenshot({ path: `qa-screenshots/${route.label.toLowerCase()}.png`, fullPage: true })
      }
    }
    results.push({ viewport: viewport.name, width: viewport.width, height: viewport.height, overflow, passed: true })
    await page.close()
  }
} finally {
  await browser.close()
}
await writeFile('qa-screenshots/report.json', JSON.stringify({ results, errors }, null, 2))
console.log(JSON.stringify({ results, errors }, null, 2))
assert.deepEqual(errors, [], 'Não deve haver exceções JavaScript durante a navegação')
