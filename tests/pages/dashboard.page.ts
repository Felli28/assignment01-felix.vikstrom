import { Page } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  // Navigera till clients-sidan
  async goToClients() {
    await this.page.locator('a[href="/clients"]').click(); 
  }

  // Navigera till rooms-sidan
  async goToRooms() {
    await this.page.locator('a[href="/rooms"]').click();
  }

  // Navigera till bills-sidan
  async goToBills() {
    await this.page.locator('a[href="/bills"]').click();
  }

  // Navigera till reservations-sidan
  async goToReservations() {
    await this.page.locator('a[href="/reservations"]').click();
  }
}
