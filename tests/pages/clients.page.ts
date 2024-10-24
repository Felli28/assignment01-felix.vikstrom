import { Page } from '@playwright/test';

export class ClientsPage {
  constructor(private page: Page) {}

  async goToCreateClient() {
    await this.page.click('a.btn.blue'); // Assuming the "Create Client" button has the class .btn.blue
  }

  async deleteClient(clientName: string) {
    const client = this.page.getByText(clientName);
    await client.click();

    const menuButton = this.page.getByRole('img').nth(2);
    await menuButton.waitFor({ state: 'visible' });
    await menuButton.click();

    const deleteButton = this.page.getByText('Delete');
    await deleteButton.waitFor({ state: 'visible' });
    await deleteButton.click();
  }
}






