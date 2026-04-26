import { test, expect }  from '@playwright/test';
import { LoginPage }     from '../pages/LoginPage';
import { ProductsPage }  from '../pages/ProductsPage';
import { CartPage }      from '../pages/CartPage';
import { CheckoutPage }  from '../pages/CheckoutPage';

test('complete end-to-end purchase', async ({ page }) => {

  await test.step('Login', async () => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  await test.step('Add two items to cart', async () => {
    const productsPage = new ProductsPage(page);
    await productsPage.addItemToCartByName('Sauce Labs Backpack');
    await productsPage.addItemToCartByName('Sauce Labs Bike Light');
    expect(await productsPage.getCartCount()).toBe(2);
  });

  await test.step('Go to cart and verify items', async () => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    const names = await cartPage.getItemNames();
    expect(names).toContain('Sauce Labs Backpack');
    expect(names).toContain('Sauce Labs Bike Light');
  });

  await test.step('Proceed to checkout and fill shipping', async () => {
    const cartPage     = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await cartPage.proceedToCheckout();
    await checkoutPage.fillShippingInfo('Hesam', 'Jannesar', '99418');
  });

  await test.step('Finish order and verify confirmation', async () => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.finishButton.click();
    await expect(checkoutPage.confirmationHeader)
      .toHaveText('Thank you for your order!');
  });
});