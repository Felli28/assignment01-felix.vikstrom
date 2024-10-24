import { Page } from '@playwright/test';

export class BillsPage {
  constructor(private page: Page) {}

  
  async goToBills() {
    await this.page.goto('http://localhost:3000/bills'); // Anpassa URL om nödvändigt
  }

  
  async selectBill(billId: string) {
    const bill = this.page.getByText(`ID: ${billId}`);
    await bill.click();
  }

  // Öppna menyn (ellipsis) för en specifik bill
  async openBillMenu(billId: string) {
    const billCard = this.page.locator(`h3:has-text("ID: ${billId}")`).locator('..');
    const menuButton = billCard.locator('img[src="/ellipsis.svg"]');
    await menuButton.waitFor({ state: 'visible', timeout: 10000 });
    await menuButton.click();
  }

  // Klicka på "Edit" i menyn
  async editBill() {
    const editButton = this.page.getByText('Edit');
    await editButton.waitFor({ state: 'visible' });
    await editButton.click();
  }

  // Uppdatera betalstatus för fakturan
  async updateBillStatus(isPaid: boolean) {
    const paidToggle = this.page.locator('label:has-text("Paid") + input');
    if (isPaid) {
      await paidToggle.check();
    } else {
      await paidToggle.uncheck();
    }
  }

  // Klicka på "Save"
  async saveChanges() {
    const saveButton = this.page.getByText('Save');
    await saveButton.waitFor({ state: 'visible', timeout: 10000 });
    await saveButton.click();
  }

  // Verifiera att fakturans status har uppdaterats
  async verifyBillStatus(billId: string, isPaid: boolean) {
    const statusText = this.page.getByText(`ID: ${billId}`);
    await expect(statusText).toContainText(`Paid: ${isPaid ? 'Yes' : 'No'}`);
  }
}
