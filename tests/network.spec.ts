import { test, expect } from '@playwright/test';
import { LoginPage }    from '../pages/LoginPage';

test.describe('Network Interception', () => {

  test('blocking images does not break the inventory page', async ({ page }) => {
    let blockedCount = 0;

    await page.route('**/*.jpg', route => {
      blockedCount++;
      route.abort();
    });

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Page still loads correctly even with images blocked
    await expect(page.locator('.inventory_item')).toHaveCount(6);
    expect(blockedCount).toBeGreaterThan(0);
  });

  test('saucedemo homepage returns HTTP 200', async ({ page }) => {
    const [response] = await Promise.all([
      page.waitForResponse('https://www.saucedemo.com/'),
      page.goto('https://www.saucedemo.com/'),
    ]);

    expect(response.status()).toBe(200);
  });

  test('direct HTTP request to saucedemo returns 200', async ({ request }) => {
    const response = await request.get('https://www.saucedemo.com');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/html');
  });

});