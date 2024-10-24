import { Page } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  async goToClients() {
    await this.page.click('a[href="/clients"]');
  }

  async goToRooms() {
    await this.page.click('a[href="/rooms"]');
  }

  async goToReservations() {
    await this.page.click('a[href="/reservations"]');
  }
}

