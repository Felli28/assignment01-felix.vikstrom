import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { DashboardPage } from './pages/dashboard.page';
import { ClientsPage } from './pages/clients.page';
import { RoomsPage } from './pages/rooms.page';
import { ReservationsPage } from './pages/reservations.page';
 


test.describe.serial('Add and delete client tests', () => {
  test('1.Login and add a new client', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const clientsPage = new ClientsPage(page);

    const username = process.env.TEST_USERNAME || 'defaultUsername';
    const password = process.env.TEST_PASSWORD || 'defaultPassword';

    await loginPage.navigate();
    await loginPage.login(username, password);
    await page.waitForLoadState('networkidle');
    await dashboardPage.goToClients();
    await clientsPage.goToCreateClient();

    await page.fill('label:has-text("Name") + input', 'Adam Strong');
    await page.fill('label:has-text("Email") + input', 'adam@example.com');
    await page.fill('label:has-text("Telephone") + input', '123456789');

    await page.locator('a.btn.blue').click();

    const newClient = page.locator('text=Adam Strong');
    await expect(newClient).toBeVisible();
  });

  test('2.Login and delete Adam Strong', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const clientsPage = new ClientsPage(page);

    const username = process.env.TEST_USERNAME || 'defaultUsername';
    const password = process.env.TEST_PASSWORD || 'defaultPassword';

    await loginPage.navigate();
    await loginPage.login(username, password);
    await page.waitForLoadState('networkidle');
    await dashboardPage.goToClients();

    const client = page.getByText(/Adam Strong/);
    await client.waitFor({ state: 'visible', timeout: 10000 });
    await client.click();

    const menuButton = page.getByRole('img').nth(2);
    await menuButton.waitFor({ state: 'visible', timeout: 10000 });
    await menuButton.click();

    const deleteButton = page.getByText('Delete');
    await deleteButton.waitFor({ state: 'visible', timeout: 10000 });
    await deleteButton.click();

    await expect(page.locator('text=Adam Strong')).not.toBeVisible({ timeout: 10000 });
  });

  test('3. Edit Jonas Hellman and update his name to Jonas Strong', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const clientsPage = new ClientsPage(page);
  
    const username = process.env.TEST_USERNAME || 'defaultUsername';
    const password = process.env.TEST_PASSWORD || 'defaultPassword';
  
    await loginPage.navigate();
    await loginPage.login(username, password);
    await page.waitForLoadState('networkidle');
    
    await dashboardPage.goToClients();
  
    // Hitta Jonas Hellman och klicka på hans klientkort
    const jonasClient = page.getByText('Jonas Hellman');
    await jonasClient.click();
  
    // Använd samma logik som i test 2 för att klicka på menyn med tre prickar
    const menuButton = page.locator('img[src="/ellipsis.svg"]').first();
    await menuButton.waitFor({ state: 'visible', timeout: 10000 });
    await menuButton.click();
  
    // Klicka på "Edit"
    const editButton = page.getByText('Edit');
    await editButton.waitFor({ state: 'visible' });
    await editButton.click();
  
    // Hitta namnfältet specifikt genom att använda "label:has-text('Name')"
    const nameInput = page.locator('label:has-text("Name") + input'); // Välj namnfältet
    await nameInput.fill(''); // Radera det gamla namnet
    await nameInput.fill('Jonas Strong'); // Fyll i det nya namnet
  
    // Klicka på "Save"
    const saveButton = page.getByText('Save');
    await saveButton.waitFor({ state: 'visible', timeout: 10000 });
    await saveButton.click();
    await page.waitForLoadState('networkidle'); // Vänta på att sidan uppdateras efter sparningen
  
    // Verifiera att namnet har uppdaterats
    const updatedClient = page.getByRole('heading', { name: 'Jonas Strong (#1)' });
    await expect(updatedClient).toBeVisible();
  

    await page.click('button:has-text("Logout")');
});


test('4. Change Room 101 price from 1500 to 2000', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const roomsPage = new RoomsPage(page);

  const username = process.env.TEST_USERNAME || 'defaultUsername';
  const password = process.env.TEST_PASSWORD || 'defaultPassword';

  await loginPage.navigate();
  await loginPage.login(username, password);
  await page.waitForLoadState('networkidle');

  await dashboardPage.goToRooms();

  // Välj Room 101 och öppna menyn
  await roomsPage.selectRoom('101');
  await roomsPage.openRoomMenu('101');
  await roomsPage.editRoom();

  // Ändra pris för Room 101 från 1500 till 2000
  const priceInput = page.locator('label:has-text("Price") + input');
  await priceInput.fill('2000');

  // Spara ändringarna
  await roomsPage.saveChanges();
  await page.waitForLoadState('networkidle');

  // Verifiera att priset har ändrats (använd .first() för att välja första matchande elementet)
  const updatedPrice = page.locator('text=Price: 2000kr').first();
  await expect(updatedPrice).toBeVisible();
});


test('5. Delete 102', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const roomsPage = new RoomsPage(page);

  const username = process.env.TEST_USERNAME || 'defaultUsername';
  const password = process.env.TEST_PASSWORD || 'defaultPassword';

  await loginPage.navigate();
  await loginPage.login(username, password);
  await page.waitForLoadState('networkidle');

  await dashboardPage.goToRooms();

  await roomsPage.selectRoom('102');
  await roomsPage.openRoomMenu('102');
  await roomsPage.editRoom();

  const deleteButton = page.getByText('Delete');
    await deleteButton.waitFor({ state: 'visible', timeout: 10000 });
    await deleteButton.click();

    await expect(page.locator('text=Floor 1, Room 102')).not.toBeVisible({ timeout: 10000 });

  });

  test('6. Add a new room', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const roomsPage = new RoomsPage(page);

    const username = process.env.TEST_USERNAME || 'defaultUsername';
    const password = process.env.TEST_PASSWORD || 'defaultPassword';

    await loginPage.navigate();
    await loginPage.login(username, password);
    await page.waitForLoadState('networkidle');

    await dashboardPage.goToRooms();
    await roomsPage.goToCreateRooms();

  await page.locator('div').filter({ hasText: /^Number$/ }).getByRole('spinbutton').click();
  await page.locator('div').filter({ hasText: /^Number$/ }).getByRole('spinbutton').fill('4');
  await page.locator('div').filter({ hasText: /^Floor$/ }).getByRole('spinbutton').click();
  await page.locator('div').filter({ hasText: /^Floor$/ }).getByRole('spinbutton').fill('5');
  await page.locator('div').filter({ hasText: /^Price$/ }).getByRole('spinbutton').click();
  await page.locator('div').filter({ hasText: /^Price$/ }).getByRole('spinbutton').fill('3500');
  await page.getByRole('listbox').selectOption('balcony');
  await page.getByText('Save').click();
  await page.getByText('4 Floor 5, Room 4Category:').click();

});

test('7. Make a new reservation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const reservationsPage = new ReservationsPage(page);

  const username = process.env.TEST_USERNAME || 'defaultUsername';
  const password = process.env.TEST_PASSWORD || 'defaultPassword';

  await loginPage.navigate();
  await loginPage.login(username, password);
  await page.waitForLoadState('networkidle');

  await dashboardPage.goToReservations();
  await page.getByRole('link', { name: 'Create Reservation' }).click();
  await page.waitForLoadState('networkidle');

  await page.locator('input[placeholder="YYYY-MM-DD"]').first().fill('2025-02-07');
  await page.locator('input[placeholder="YYYY-MM-DD"]').nth(1).fill('2025-02-09');
  await page.locator('select').first().selectOption({ value: '2' });
  await page.locator('select').nth(1).selectOption({ value: '1' });
  await page.locator('select').nth(2).selectOption({ value: '1' });

  const saveButton = page.locator('a.btn.blue');
  await saveButton.click();

  const reservation = page.getByText('Mikael Eriksson: 2025-02-07 - 2025-02-09');
  await expect(reservation).toBeVisible();
});

test('8. Delete an existing reservation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const reservationsPage = new ReservationsPage(page);

  const username = process.env.TEST_USERNAME || 'defaultUsername';
  const password = process.env.TEST_PASSWORD || 'defaultPassword';

  await loginPage.navigate();
  await loginPage.login(username, password);
  await page.waitForLoadState('networkidle');

  await dashboardPage.goToReservations();

  await page.getByRole('heading', { name: 'Mikael Eriksson: 2025-02-07' }).click();
  await page.locator('div:nth-child(2) > .action').click();
  await page.getByText('Delete').click();

  // Kontrollera om "Confirm"-knappen finns och klicka på den om den är synlig
  const confirmButton = page.getByRole('button', { name: 'Confirm' });
  if (await confirmButton.isVisible()) {
    await confirmButton.click();
  }

  await page.waitForLoadState('networkidle');

  await expect(page.getByText('Mikael Eriksson: 2025-02-07')).not.toBeVisible({ timeout: 5000 });
});

test('9. Edit an existing reservation for Jonas Strong', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const reservationsPage = new ReservationsPage(page);

  const username = process.env.TEST_USERNAME || 'defaultUsername';
  const password = process.env.TEST_PASSWORD || 'defaultPassword';

  await loginPage.navigate();
  await loginPage.login(username, password);
  await page.waitForLoadState('networkidle');

  // Navigera till reservationssidan
  await dashboardPage.goToReservations();

  // Hitta reservationen för Jonas Strong och hovra över den
  const reservationCard = page.locator('h3:has-text("Jonas Strong: 2020-04-01 - 2020-04-04")').locator('..');
  await reservationCard.hover(); // Hovra över reservationen

  // Hitta och klicka på ellipsis-knappen (tre prickar)
  const menuButton = reservationCard.locator('div.action img[src="/ellipsis.svg"]');
  await menuButton.waitFor({ state: 'visible', timeout: 10000 });
  await menuButton.click();

  // Klicka på Edit
  await page.getByText('Edit').click();

  // Ändra start- och slutdatum
  await page.locator('input[placeholder="YYYY-MM-DD"]').first().fill('2020-10-05');
  await page.locator('input[placeholder="YYYY-MM-DD"]').nth(1).fill('2020-10-10');

  // Klicka på "Save"
  await page.getByText('Save').click();
  await page.waitForLoadState('networkidle');

  // Verifiera att uppdateringen lyckades
  await page.getByRole('heading', { name: 'Jonas Strong: 2020-10-05 - 2020-10-10' }).waitFor();
});















});







  


  























