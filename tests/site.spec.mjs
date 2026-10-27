import { test, expect } from '@playwright/test';

test('página principal permite selecionar as três formas e controlar som', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Sinta a frequência de DJ Sona/i })).toBeVisible();
  for (const title of ['Kinetic', 'Concussive', 'Ethereal']) {
    const card = page.getByRole('button', { name: new RegExp(title) });
    await card.click();
    await expect(card).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.now-playing')).toContainText(title);
  }
  await page.getByRole('button', { name: 'Ativar som' }).click();
  await expect(page.getByRole('button', { name: 'Silenciar' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('slider', { name: 'Volume' }).fill('0.5');
  await expect(page.locator('.volume-value')).toContainText('50%');
});

test('navegação, páginas internas e rota inexistente apresentam conteúdo', async ({ page }) => {
  await page.goto('/');
  const routes = [
    ['História', /Três formas/],
    ['Wallpapers', /Artes das três formas/],
    ['Vídeos', /Vídeos de DJ Sona/],
  ];
  for (const [name, heading] of routes) {
    await page.getByRole('link', { name, exact: true }).click();
    await expect(page.getByRole('heading', { name: heading })).toBeVisible();
  }
  await page.goto('/#/pagina-inexistente');
  await expect(page.getByRole('heading', { name: /não está na playlist/ })).toBeVisible();
});

test('player só carrega vídeo quando selecionado', async ({ page }) => {
  await page.goto('/#/videos');
  await expect(page.locator('.movie-player video')).toHaveCount(0);
  await page.getByRole('button', { name: 'Kinetic' }).click();
  await expect(page.locator('.movie-player video')).toHaveAttribute('controls', '');
  await expect(page.locator('.movie-player video')).toHaveAttribute('src', /Kinetic2.mp4$/);
});

test('redução de movimento pausa a animação do fundo', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByText(/Movimento reduzido está ativo/)).toBeVisible();
  await expect(page.locator('.stage-video')).toHaveClass(/reduce-motion/);
  await expect.poll(() => page.locator('.stage-video').evaluate(video => video.paused)).toBe(true);
});

for (const viewport of [{ width: 375, height: 812 }, { width: 768, height: 1024 }, { width: 1440, height: 900 }]) {
  test('capturas, navegação e sem overflow em ' + viewport.width + 'px', async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const route of ['/', '/#/historia', '/#/wallpapers', '/#/videos']) {
      await page.goto(route);
      await expect(page.locator('main')).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, 'rolagem horizontal em ' + route).toBeLessThanOrEqual(1);
      const slug = route === '/' ? 'inicio' : route.split('/').pop();
      await page.screenshot({ path: 'test-results/dj-sona-' + slug + '-' + viewport.width + '.png', fullPage: true });
    }
    expect(errors).toEqual([]);
    if (viewport.width < 850) {
      await page.goto('/');
      const menu = page.getByRole('button', { name: 'Abrir menu' });
      await menu.click();
      await expect(menu).toHaveAttribute('aria-expanded', 'true');
      await page.getByRole('link', { name: 'História', exact: true }).click();
      await expect(page.getByRole('heading', { name: /Três formas/ })).toBeVisible();
    }
  });
}