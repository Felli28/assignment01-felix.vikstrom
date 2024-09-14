// tests/example.spec.ts
import { test, expect } from '@playwright/test';

test('should login successfully with valid credentials', async ({ page }) => {
  // Gå till inloggningssidan
  await page.goto('http://localhost:3000/login');

  // Ange användarnamn och lösenord
  await page.fill('input[autocomplete="username"]', 'tester01'); // Anpassa till rätt selektor
  await page.fill('input[autocomplete="current-password"]', 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c'); // Använd det korrekta lösenordet

  // Klicka på inloggningsknappen
  await page.click('button.btn.blue'); // Justera selektorn om knappen har en annan identifierare

  // Vänta på att sidan ska ladda om och kontrollera att vi är på dashboard-sidan
  await page.waitForNavigation();
  await expect(page).toHaveURL('http://localhost:3000/');
});
