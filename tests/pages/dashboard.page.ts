import { Page } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  async goToClients() {
    await this.page.locator('div').filter({ hasText: /^Clients/ }).getByRole('link').click();
  }

  async createClient() {
    await this.page.getByRole('link', { name: 'Create Client' }).click();
  }

  async goBack() {
    await this.page.getByRole('link', { name: 'Back' }).click();
  }
}


