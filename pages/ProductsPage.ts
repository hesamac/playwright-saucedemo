import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page:         Page;
  readonly items:        Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page         = page;
    this.items        = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(value);
  }

  async addItemToCartByName(name: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: name });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async getCartCount(): Promise<number> {
    const badge = this.page.locator('.shopping_cart_badge');
    const text  = await badge.innerText();
    return parseInt(text);
  }
}