import { Page } from '@playwright/test';

export class ClientsPage {
  constructor(private page: Page) {}

  // Navigerar till klientsidan
  async goToClients() {
    await this.page.locator('div').filter({ hasText: /^Clients/ }).getByRole('link').click();
  }

  // Lägger till en ny klient
  async addClient(name: string, email: string, telephone: string) {
    // Klicka på "Create Client"-länken
    await this.page.getByRole('link', { name: 'Create Client' }).click();
    await this.page.waitForURL('http://localhost:3000/client/new'); // Vänta på att sidan för att skapa en ny klient visas

    // Fyll i klientinformationen
    await this.page.locator('label:text("Name")').locator('..').locator('input').fill(name);
    await this.page.locator('label:text("Email")').locator('..').locator('input').fill(email);
    await this.page.locator('label:text("Telephone")').locator('..').locator('input').fill(telephone);

    // Vänta tills "Save"-knappen är synlig och klickbar
    const saveButton = this.page.getByRole('button', { name: 'Save' });
    await saveButton.click();
  }

  // Tar bort en klient baserat på namnet
  async deleteClientByName(clientName: string) {
    const clientElement = this.page.locator(`text=${clientName}`);
    const deleteButton = clientElement.locator('..').locator('button', { hasText: 'Delete' });

    // Kontrollera om klienten finns innan borttagning
    if (await clientElement.isVisible()) {
      await deleteButton.click();
    } else {
      console.log(`${clientName} finns inte, ingen borttagning behövs`);
    }
  }
}





