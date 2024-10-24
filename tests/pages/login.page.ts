import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // Navigera till inloggningssidan
  async navigate() {
    await this.page.goto('http://localhost:3000/login');
  }

  
  async login(username: string, password: string) {
    await this.page.fill('input[type="text"]', username); 
    await this.page.fill('input[type="password"]', password); 
    await this.page.getByRole('button', { name: 'Login' }).click(); 
  }
}


