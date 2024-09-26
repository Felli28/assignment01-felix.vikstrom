import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async login(username: string, password: string) {
    await this.page.fill('input[type="text"]', username);
    await this.page.fill('input[type="password"]', password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}

