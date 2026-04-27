import { test, expect } from '@playwright/test';
import { LoginPage }    from '../pages/LoginPage';

test('successful login redirects to products page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('locked out user sees error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');

  await expect(loginPage.errorMessage).toContainText('locked out');
});

test('empty username shows required field error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('', '');

  await expect(loginPage.errorMessage).toContainText('Username is required');
});

const loginScenarios = [
  {
    username: 'standard_user',
    password: 'secret_sauce',
    expectedURL: '/inventory.html',
    description: 'standard user lands on inventory page'
  },
  {
    username: 'problem_user',
    password: 'secret_sauce',
    expectedURL: '/inventory.html',
    description: 'problem user lands on inventory page'
  },
  {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
    expectedURL: '/inventory.html',
    description: 'performance glitch user lands on inventory page'
  },
];

for (const { username, password, expectedURL, description } of loginScenarios) {
  test(`${description}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(username, password);

    await expect(page).toHaveURL(/\/inventory\.html/);
  });
}

const invalidLogins = [
  {
    username: 'locked_out_user',
    password: 'secret_sauce',
    expectedError: 'locked out'
  },
  {
    username: '',
    password: '',
    expectedError: 'Username is required'
  },
  {
    username: 'standard_user',
    password: 'wrong_password',
    expectedError: 'Username and password do not match'
  },
];

for (const { username, password, expectedError } of invalidLogins) {
  test(`login fails for "${username || 'empty'}" with correct error`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(username, password);

    await expect(loginPage.errorMessage).toContainText(expectedError);
  });
}