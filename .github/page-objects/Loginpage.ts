import { Page } from '@playwright/test';

export class Loginpage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login'); // Navigerar till inloggningssidan
  }

  async login(username: string, password: string) {
    // Fyller i användarnamn och lösenord
    await this.page.fill('input[name="username"]', username); // Justera selektorn om det behövs
    await this.page.fill('input[name="password"]', password); // Justera selektorn om det behövs
    await this.page.click('button[type="submit"]'); // Klickar på inloggningsknappen
  }
}














