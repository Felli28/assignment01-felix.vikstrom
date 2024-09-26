import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { DashboardPage } from './pages/dashboard.page';

test('Add client on the clients page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  // Gå till inloggningssidan och logga in
  await page.goto('http://localhost:3000/login');
  await loginPage.login('tester01', 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c');

  // Verifiera att inloggningen lyckades och vi är på dashboard-sidan
  await expect(page).toHaveURL('http://localhost:3000/');

  // Navigera till klientsidan
  await dashboardPage.goToClients();
  await expect(page).toHaveURL('http://localhost:3000/clients');

  // Klicka på "Create Client"
  await page.getByRole('link', { name: 'Create Client' }).click();

  // Vänta tills vi är på sidan för att skapa en ny klient
  await page.waitForURL('http://localhost:3000/client/new');

  // Fyll i namn, e-post och telefonnummer
  await page.locator('input[type="text"]').nth(0).fill('Adam Jalla');
  await page.locator('input[type="email"]').fill('adam.jalla@example.com');
  await page.locator('input[type="text"]').nth(1).fill('070 123 4567');

  // Vänta tills "Save"-knappen är synlig och klickbar
  const saveButton = page.locator('a.btn.blue:has-text("Save")');
  await expect(saveButton).toBeVisible({ timeout: 10000 });
  await expect(saveButton).toBeEnabled({ timeout: 10000 });

  // Klicka på "Save"
  await saveButton.click();

  // Verifiera att klienten har lagts till och är synlig på klientsidan
  await page.waitForURL('http://localhost:3000/clients');
  await expect(page.locator('text=Adam Jalla')).toBeVisible();
});












