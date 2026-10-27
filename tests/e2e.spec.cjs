const { test, expect } = require('@playwright/test');

test('troca de formas, som e rotas sem erros JavaScript', async ({ page }, testInfo) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Três formas/ })).toBeVisible();
  await page.getByRole('button', { name: /Cinética/ }).click();
  await expect(page.getByText('Agora:')).toContainText('Cinética');
  await expect(page.getByRole('button', { name: /Cinética/ })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Ativar áudio' }).click();
  await expect(page.getByRole('button', { name: 'Silenciar áudio' })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('home.png'), fullPage: true });
  await page.getByRole('link', { name: 'História' }).click();
  await expect(page.getByRole('heading', { name: 'História da DJ Sona' })).toBeVisible();
  await page.getByRole('link', { name: 'Wallpapers' }).click();
  await expect(page.getByRole('heading', { name: 'Artes das formas' })).toBeVisible();
  await page.getByRole('link', { name: 'Vídeos' }).click();
  await expect(page.getByRole('heading', { name: 'Vídeos' })).toBeVisible();
  expect(errors).toEqual([]);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(overflow).toBe(false);
});

test('redução de movimento não inicia vídeo decorativo', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByText(/Vídeo desativado pela preferência/)).toBeVisible();
  await expect(page.locator('.video-backdrop')).toHaveCount(0);
});
