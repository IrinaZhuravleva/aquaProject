// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login-page');
const { StartSessionPage } = require('../pages/start-session-page');
const { NewConversationPage } = require('../pages/new-conversation-page');


test('Login as Agent', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.logIn();
  await expect(page.locator('button[id="spanNewConversation"]')).toBeVisible();
  await expect(page.locator('i.fa.fa-bars')).toBeVisible();
  await page.locator('i.fa.fa-bars').click();
  await expect(page.getByText('Help Center')).toBeVisible();
  await expect(page.getByText('Logout')).toBeVisible();
});

test('Open Last Sessions & verify “My History” title exists', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const startSessionPage = new StartSessionPage(page);

  await loginPage.goto();
  await loginPage.logIn();
  await startSessionPage.checkMyHistoryBlock();
});

test('Create new conversation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const startSessionPage = new StartSessionPage(page);
  const newConversationPage = new NewConversationPage(page);

  await loginPage.goto();
  await loginPage.logIn();
  await startSessionPage.startNewConversation();
  await newConversationPage.fillInForm(); // вообще-то это не страница, а модалка на переходе на страницу
});

test('Upload document from Assets and send to customer', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const startSessionPage = new StartSessionPage(page);
  const newConversationPage = new NewConversationPage(page);

  await loginPage.goto();
  await loginPage.logIn();
  await startSessionPage.startNewConversation();
  await newConversationPage.fillInForm();

  await newConversationPage.sendDocuments();
});
