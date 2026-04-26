import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page:           Page;
  readonly checkoutButton: Locator;
  readonly itemNames:      Locator;

  constructor(page: Page) {
    this.page           = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.itemNames      = page.locator('[data-test="inventory-item-name"]');
  }

  async goto() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }

  async getItemNames(): Promise<string[]> {
    return await this.itemNames.allInnerTexts();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}