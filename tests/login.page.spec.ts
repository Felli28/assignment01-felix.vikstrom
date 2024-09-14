import { test, expect } from '@playwright/test';

test('should login successfully with valid credentials', async ({ page }) => {
  try {
    // Gå till inloggningssidan
    await page.goto('http://localhost:3000/login');

    // Ta en skärmdump av inloggningssidan för att verifiera att vi är på rätt sida
    await page.screenshot({ path: 'login-page.png' });

    // Ange användarnamn och lösenord
    await page.fill('input[autocomplete="username"]', 'tester01'); // Anpassa till rätt selektor
    await page.fill('input[autocomplete="current-password"]', 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c'); // Använd det korrekta lösenordet

    // Klicka på inloggningsknappen och vänta på navigation
    await Promise.all([
      page.waitForNavigation(),
      page.click('button.btn.blue') // Justera selektorn om knappen har en annan identifierare
    ]);

    // Kontrollera URL:en
    await expect(page).toHaveURL('http://localhost:3000/');

    // Ta en skärmdump av sidan efter inloggning för att verifiera inloggningen
    await page.screenshot({ path: 'post-login-page.png' });
  } catch (error) {
    console.error('Test failed:', error);
    await page.screenshot({ path: 'error.png' });
  }
});
