const { Given, When, Then } = require('cucumber');
const path = require('path');

Given('I navigate to the application', async () => {
  const filePath = path.resolve(__dirname, '../src/index.html');
  await page.goto(`file://${filePath}`);
});

When('I type {string} into the username field', async (username) => {
  await page.type('#username', username);
});

Then('the username field should have a red border', async () => {
  await page.waitForSelector('#username[style*="border-color: red"]');
});

Then('a screenshot should be taken', async () => {
  await page.screenshot({ path: path.join(__dirname, 'screenshots', 'error-corto.png') });
});
