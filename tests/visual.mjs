import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'

const base = process.env.QA_URL || 'http://127.0.0.1:4173/dj-sona/'
const routes = [
  { hash: '#/', name: 'inicio', heading: 'ESCOLHA SUA' },
  { hash: '#/historia', name: 'historia', heading: 'Três formas' },
  { hash: '#/wallpapers', name: 'wallpapers', heading: 'Wallpapers' },
  { hash: '#/videos', name: 'videos', heading: 'O espetáculo' },
]
const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
]
const failures = []
const details = []
await mkdir('artifacts/screenshots', { recursive: true })
const browser = await chromium.launch({ headless: true })
try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, reducedMotion: 'reduce' })
    page.on('pageerror', (error) => failures.push(viewport.name + ': ' + error.message))
    page.on('console', (message) => {
      if (message.type() === 'error') failures.push(viewport.name + ': console: ' + message.text())
    })
    for (const route of routes) {
      const url = base + route.hash
      const response = await page.goto(url, { waitUntil: 'domcontentloaded' })
      await page.locator('h1').waitFor()
      const heading = await page.locator('h1').innerText()
      if (!response || response.status() !== 200) failures.push(url + ': HTTP não é 200')
      if (!heading.includes(route.heading)) failures.push(url + ': título inesperado: ' + heading)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      if (overflow > 2) failures.push(url + ': overflow horizontal ' + overflow + 'px')
      if (route.name === 'inicio') {
        await page.getByRole('button', { name: 'Selecionar Kinetic' }).click()
        if (await page.getByRole('button', { name: 'Selecionar Kinetic' }).getAttribute('aria-pressed') !== 'true') failures.push(url + ': seleção Kinetic falhou')
        if (viewport.name === 'mobile') {
          const prefersReduce = await page.locator('.home-video').count()
          if (prefersReduce) failures.push(url + ': vídeo iniciou com movimento reduzido')
        }
      }
      if (route.name === 'wallpapers' && await page.locator('.gallery-card').count() !== 3) failures.push(url + ': galeria incompleta')
      if (route.name === 'videos') {
        await page.getByRole('button', { name: 'Concussive', exact: true }).click()
        if (await page.getByRole('button', { name: 'Concussive', exact: true }).getAttribute('aria-pressed') !== 'true') failures.push(url + ': seletor de vídeo falhou')
      }
      const file = 'artifacts/screenshots/' + viewport.name + '-' + route.name + '.png'
      await page.screenshot({ path: file, fullPage: true, animations: 'disabled' })
      details.push({ viewport: viewport.name, route: route.name, url, screenshot: file, heading, overflow })
    }
    await page.close()
  }
} finally {
  await browser.close()
}
const report = { time: new Date().toISOString(), scenarios: details.length, failures, details }
await writeFile('artifacts/qa-report.json', JSON.stringify(report, null, 2))
console.log(JSON.stringify({ scenarios: details.length, failures }, null, 2))
if (failures.length) process.exitCode = 1
