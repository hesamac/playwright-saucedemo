import { test, expect } from '@playwright/test';
import { LoginPage }    from '../pages/LoginPage';

test.describe('Visual Regression', () => {

  test('login page matches baseline', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await expect(page).toHaveScreenshot('login-page.png', {
      maxDiffPixels: 100
    });
  });

  test('inventory page matches baseline', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveScreenshot('inventory-page.png', {
    maxDiffPixels: 100
  });
});

  test('login button matches baseline', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    const button = page.locator('[data-test="login-button"]');

    await expect(button).toHaveScreenshot('login-button.png');
  });

});