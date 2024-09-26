import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { DashboardPage } from './pages/dashboard.page';

test('Login and navigate to Clients from dashboard', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  // Gå till inloggningssidan
  await page.goto('http://localhost:3000/login');

  // Vänta på att inloggningsfälten är tillgängliga
  await page.waitForSelector('input[type="text"]');
  
  // Logga in
  await loginPage.login('tester01', 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c');

  // Verifiera att inloggningen lyckades
  await expect(page).toHaveURL('http://localhost:3000/');

  // Navigera till klientsidan
  await dashboardPage.goToClients();

  // Verifiera att vi är på klientsidan
  await expect(page).toHaveURL('http://localhost:3000/clients');
});
