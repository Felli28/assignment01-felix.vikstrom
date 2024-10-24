import { Page } from '@playwright/test';

export class ReservationsPage {
  constructor(private page: Page) {}

  async goToCreateReservation() {
    await this.page.click('a[href="/reservation/new"]');
  }

  async selectReservation(reservationName: string) {
    await this.page.getByText(reservationName).click();
  }

  async openReservationMenu() {
    await this.page.locator('div:nth-child(2) > .action').click();
  }

  async editReservation() {
    await this.page.getByText('Edit').click();
  }

  async updateDates(startDate: string, endDate: string) {
    await this.page.locator('input[placeholder="YYYY-MM-DD"]').first().fill(startDate);
    await this.page.locator('input[placeholder="YYYY-MM-DD"]').nth(1).fill(endDate);
  }

  async saveChanges() {
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async verifyUpdatedReservation(reservationName: string, startDate: string, endDate: string) {
    const updatedReservation = this.page.getByRole('heading', { name: `${reservationName}: ${startDate} - ${endDate}` });
    await expect(updatedReservation).toBeVisible();
  }
}



  

      

    

