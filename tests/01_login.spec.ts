import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';

test('Login to the page successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Gå till inloggningssidan
  await page.goto('http://localhost:3000/login');

  // Vänta på att inloggningsfälten är tillgängliga
  await page.waitForSelector('input[type="text"]');

  // Logga in
  await loginPage.login('tester01', 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c');

  // Verifiera att inloggningen lyckades genom att kontrollera URL
  await expect(page).toHaveURL('http://localhost:3000/');
});




