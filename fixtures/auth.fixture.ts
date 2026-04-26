import { test as base, Page } from '@playwright/test';
import { LoginPage }          from '../pages/LoginPage';
import { ProductsPage }       from '../pages/ProductsPage';

type AuthFixtures = {
  authenticatedPage: Page;
  productsPage:      ProductsPage;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL('**/inventory.html');
    await use(page);
  },

  productsPage: async ({ authenticatedPage }, use) => {
    await use(new ProductsPage(authenticatedPage));
  },
});

export { expect } from '@playwright/test';