'use strict'
const { chromium } = require('playwright')
const { spawn } = require('node:child_process')
const { mkdirSync, writeFileSync } = require('node:fs')
const { setTimeout: delay } = require('node:timers/promises')

const BASE = 'http://127.0.0.1:4173/dj-sona/'
const DIR = 'visual-qa'
const SIZES = [{ width: 320, height: 700 }, { width: 390, height: 844 }, { width: 1366, height: 768 }, { width: 1600, height: 900 }]
const PAGES = [['home', '#/'], ['historia', '#/historia'], ['artes', '#/wallpapers'], ['videos', '#/videos']]
mkdirSync(DIR, { recursive: true })
const server = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], { stdio: 'inherit', shell: process.platform === 'win32' })
const results = []
let browser

async function waitForServer() {
  for (let attempt = 0; attempt < 45; attempt++) {
    if (server.exitCode !== null) throw new Error('Servidor Vite encerrou antes do QA')
    try { const response = await fetch(BASE); if (response.ok) return }
    catch { /* server not ready */ }
    await delay(600)
  }
  throw new Error('Servidor Vite não respondeu no endereço do GitHub Pages')
}

async function main() {
  await waitForServer()
  browser = await chromium.launch({ headless: true })
  for (const viewport of SIZES) {
    const page = await browser.newPage({ viewport, reducedMotion: 'reduce', deviceScaleFactor: 1 })
    const errors = []
    page.on('pageerror', error => errors.push('JS: ' + error.message))
    page.on('response', response => {
      if (response.status() >= 400 && response.url().startsWith('http://127.0.0.1:4173/')) {
        errors.push('HTTP ' + response.status() + ' ' + response.url())
      }
    })
    page.on('console', message => {
      if (message.type() === 'error' && !message.text().includes('favicon')) errors.push('Console: ' + message.text())
    })

    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 20000 })
    await page.locator('h1').waitFor({ state: 'visible' })
    if (!(await page.locator('video').count() === 0)) errors.push('Movimento reduzido não desativou vídeo')
    const kinetic = page.getByRole('button', { name: /kinetic/i })
    await kinetic.click()
    if (await kinetic.getAttribute('aria-pressed') !== 'true') errors.push('Kinetic não ficou selecionado')
    await page.reload({ waitUntil: 'domcontentloaded' })
    if (await page.getByRole('button', { name: /kinetic/i }).getAttribute('aria-pressed') !== 'true') errors.push('Seleção local não persistiu')
    for (const [name, hash] of PAGES) {
      await page.goto(BASE + hash, { waitUntil: 'domcontentloaded', timeout: 20000 })
      await page.locator('main').waitFor({ state: 'visible', timeout: 10000 })
      await page.screenshot({ path: `${DIR}/${viewport.width}x${viewport.height}-${name}.png`, fullPage: true, animations: 'disabled' })
      const layout = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: innerWidth,
        title: document.title,
        main: !!document.querySelector('main'),
        nav: !!document.querySelector('nav[aria-label="Navegação principal"]')
      }))
      const overflow = layout.documentWidth > layout.viewportWidth + 2
      results.push({ viewport, page: name, passed: !overflow && layout.main && layout.nav, horizontalOverflow: overflow, ...layout })
      if (overflow) errors.push(`${name}: overflow horizontal ${layout.documentWidth} > ${layout.viewportWidth}`)
      if (!layout.main || !layout.nav) errors.push(`${name}: navegação ou main ausente`)
    }
    results.push({ viewport, interaction: 'form selection, persistence, reduced motion', passed: errors.length === 0, errors })
    console.log(`${viewport.width}x${viewport.height}: ${errors.length ? 'FAIL' : 'PASS'} - ${errors.join('; ')}`)
    await page.close()
  }
  const failed = results.some(item => !item.passed)
  writeFileSync(`${DIR}/diagnostics.json`, JSON.stringify(results, null, 2))
  const md = ['# DJ Sona — QA visual e funcional', '', '| Resolução | Página | Resultado | Overflow horizontal |', '|---|---|---|---|',
    ...results.filter(r => r.page).map(r => `| ${r.viewport.width}×${r.viewport.height} | ${r.page} | ${r.passed ? 'PASS' : 'FAIL'} | ${r.horizontalOverflow ? 'Sim' : 'Não'} |`),
    '', 'Modo de movimento reduzido habilitado durante as capturas para evitar downloads automáticos de vídeos pesados.',
    'Os arquivos PNG e diagnostics.json acompanham este relatório.'].join('\n')
  writeFileSync(`${DIR}/report.md`, md)
  if (process.env.GITHUB_STEP_SUMMARY) require('node:fs').appendFileSync(process.env.GITHUB_STEP_SUMMARY, md)
  if (failed) process.exitCode = 1
}
main().catch(err => {
  console.error(err)
  writeFileSync(`${DIR}/failure.txt`, String(err.stack || err))
  process.exitCode = 1
}).finally(async () => {
  if (browser) await browser.close()
  server.kill()
})
