import { test, expect } from '../fixtures/auth.fixture';

test.describe('Product Catalogue', () => {

  test('inventory page shows 6 products', async ({ productsPage }) => {
    await expect(productsPage.items).toHaveCount(6);
  });

  test('sort low to high reorders list', async ({ productsPage, authenticatedPage }) => {
    await productsPage.sortBy('lohi');

    const prices = authenticatedPage.locator('.inventory_item_price');
    const texts  = await prices.allInnerTexts();
    const nums   = texts.map(t => parseFloat(t.replace('$', '')));

    expect(nums).toEqual([...nums].sort((a, b) => a - b));
  });

  test('each product has a name, price and button', async ({ authenticatedPage }) => {
    const firstItem = authenticatedPage.locator('.inventory_item').first();

    await expect.soft(firstItem.locator('.inventory_item_name')).toBeVisible();
    await expect.soft(firstItem.locator('.inventory_item_price')).toBeVisible();
    await expect.soft(
      firstItem.getByRole('button', { name: 'Add to cart' })
    ).toBeEnabled();

    expect(test.info().errors).toHaveLength(0);
  });

});