import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'

const base = process.env.QA_URL || 'http://127.0.0.1:4173/dj-sona/'
const views = [
  { name: 'desktop-short', width: 1366, height: 640, fit: true },
  { name: 'desktop', width: 1600, height: 900, fit: true },
  { name: 'laptop', width: 1024, height: 700, fit: true },
  { name: 'tablet', width: 768, height: 1024, fit: false },
  { name: 'mobile', width: 390, height: 844, fit: false },
  { name: 'mobile-short', width: 390, height: 700, fit: false },
]
const routes = [
  { name: 'historia', link: 'História', heading: /TRÊS FORMAS/i },
  { name: 'artes', link: 'Artes', heading: /ARTES DAS FORMAS/i },
  { name: 'videos', link: 'Vídeos', heading: /ASSISTA ÀS FORMAS/i },
]
await mkdir('qa-screenshots', { recursive: true })
const errors = []
const results = []
const browser = await chromium.launch({ headless: true })

async function checkNoHorizontalOverflow(page, name) {
  const metrics = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
    pageHeight: document.documentElement.scrollHeight,
    viewportHeight: window.innerHeight,
  }))
  assert.ok(metrics.documentWidth - metrics.viewportWidth <= 2,
    `${name}: overflow horizontal de ${metrics.documentWidth - metrics.viewportWidth}px`)
  return metrics
}

async function checkVisible(page, locator, name) {
  const bounds = await locator.boundingBox()
  assert.ok(bounds, `${name}: elemento invisível`)
  const height = await page.evaluate(() => window.innerHeight)
  assert.ok(bounds.y >= -2 && bounds.y + bounds.height <= height + 2,
    `${name}: ultrapassou viewport de ${height}px (y=${bounds.y}, h=${bounds.height})`)
}

try {
  for (const view of views) {
    const page = await browser.newPage({
      viewport: { width: view.width, height: view.height },
      reducedMotion: 'reduce',
    })
    page.on('pageerror', (error) => errors.push(`${view.name}: ${error.message}`))
    const response = await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 30000 })
    assert.equal(response?.status(), 200)
    await page.getByRole('heading', { name: /FEEL THE/i }).waitFor()
    await page.screenshot({ path: `qa-screenshots/${view.name}-home.png`, fullPage: true })
    const metrics = await checkNoHorizontalOverflow(page, view.name)

    if (view.fit) {
      await checkVisible(page, page.locator('.experience-controls'), `${view.name} controles`)
      await checkVisible(page, page.locator('.media-note'), `${view.name} nota do áudio`)
      await checkVisible(page, page.locator('.site-footer'), `${view.name} rodapé`)
      assert.ok(metrics.pageHeight - metrics.viewportHeight <= 2,
        `${view.name}: home tem scroll vertical inesperado`)
    }
    await page.getByRole('button', { name: /Kinetic/i }).click()
    assert.equal(await page.getByRole('button', { name: /Kinetic/i }).getAttribute('aria-pressed'), 'true')
    // Teclado: a seleção muda com as setas sem exigir mouse.
    const kinetic = page.getByRole('button', { name: /Kinetic/i })
    await kinetic.focus()
    await page.keyboard.press('ArrowRight')
    assert.equal(await page.getByRole('button', { name: /Concussive/i }).getAttribute('aria-pressed'), 'true')
    await page.keyboard.press('ArrowLeft')
    assert.equal(await kinetic.getAttribute('aria-pressed'), 'true')
    await page.getByRole('button', { name: /Ativar som/i }).click()
    assert.equal(await page.getByRole('button', { name: /Silenciar/i }).getAttribute('aria-pressed'), 'true')

    for (const route of routes) {
      await page.getByRole('link', { name: route.link, exact: true }).click()
      await page.getByRole('heading', { name: route.heading }).waitFor()
      await checkNoHorizontalOverflow(page, `${view.name}/${route.name}`)
      if (view.fit) {
        await checkVisible(page, page.locator('.page-grid'), `${view.name}/${route.name} cards`)
        await checkVisible(page, page.locator('.back-link'), `${view.name}/${route.name} link final`)
      }
      await page.screenshot({ path: `qa-screenshots/${view.name}-${route.name}.png`, fullPage: !view.fit })
    }
    results.push({ ...view, overflow: metrics.documentWidth - metrics.viewportWidth, passed: true })
    await page.close()
  }

  // Regressão de acessibilidade: ligar áudio NÃO deve reativar vídeo pausado.
  const mediaPage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    reducedMotion: 'no-preference',
  })
  mediaPage.on('pageerror', (error) => errors.push(`mobile-playback: ${error.message}`))
  await mediaPage.goto(base, { waitUntil: 'domcontentloaded', timeout: 30000 })
  await mediaPage.getByRole('heading', { name: /FEEL THE/i }).waitFor()
  const pauseButton = mediaPage.getByRole('button', { name: 'Pausar movimento do palco' })
  await pauseButton.click()
  assert.equal(await mediaPage.getByRole('button', { name: 'Retomar movimento do palco' }).getAttribute('aria-pressed'), 'true')
  await mediaPage.getByRole('button', { name: /Ativar som/i }).click()
  assert.equal(await mediaPage.getByRole('button', { name: /Silenciar/i }).getAttribute('aria-pressed'), 'true')
  await mediaPage.waitForTimeout(250)
  assert.equal(await mediaPage.locator('.scene-background video').evaluate((video) => video.paused), true,
    'Ativar som nao deve retomar o video de fundo pausado')
  await mediaPage.screenshot({ path: 'qa-screenshots/mobile-video-paused-and-sound-on.png', fullPage: true })
  await mediaPage.getByRole('button', { name: 'Retomar movimento do palco' }).click()
  assert.equal(await mediaPage.getByRole('button', { name: 'Pausar movimento do palco' }).getAttribute('aria-pressed'), 'false')
  await checkNoHorizontalOverflow(mediaPage, 'mobile-playback')
  results.push({ name: 'mobile-playback', width: 390, height: 844, passed: true })
  await mediaPage.close()
} finally {
  await browser.close()
}
await writeFile('qa-screenshots/report.json', JSON.stringify({ results, errors }, null, 2))
console.log(JSON.stringify({ results, errors }, null, 2))
assert.deepEqual(errors, [])
