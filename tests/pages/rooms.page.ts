import { Page } from '@playwright/test';

export class RoomsPage {
  constructor(private page: Page) {}

  async goToCreateRooms() {
    await this.page.click('a[href="/room/new"]'); // Assuming the "Create Room" button has the correct href
  }

  async selectRoom(roomNumber: string) {
    await this.page.getByText(`Floor 1, Room ${roomNumber}`).click();
  }

  async openRoomMenu(roomNumber: string) {
    const roomMenu = this.page.locator('img[src="/ellipsis.svg"]').nth(roomNumber === '101' ? 0 : 1);
    await roomMenu.waitFor({ state: 'visible' });
    await roomMenu.click();
  }

  async editRoom() {
    await this.page.getByText('Edit').click();
  }

  async changeAvailability(isAvailable: boolean) {
    const availabilityToggle = this.page.locator('label:has-text("Available") + input');
    if (isAvailable) {
      await availabilityToggle.check();
    } else {
      await availabilityToggle.uncheck();
    }
  }

  async saveChanges() {
    const saveButton = this.page.getByText('Save');
    await saveButton.click();
  }
}


  
