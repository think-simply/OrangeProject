// step-definitions/login-security.steps.ts
import { Given, When, Then, BeforeStep } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../../hooks/pageFixture';
import LoginPage from "#test/pages/securityPage/loginPage";

let guestPage:LoginPage;
BeforeStep(async function () {
    guestPage = new LoginPage(pageFixture.page);
  });
Given('I am on the login page', async function () {
    await guestPage.visit();
});

When('I try to login with SQL injection credentials', async function (dataTable) {
    const credentials = dataTable.hashes()[0];
    await pageFixture.page.fill('input[name="username"]', credentials.username);
    await pageFixture.page.fill('input[name="password"]', credentials.password);
    await pageFixture.page.click('button[type="submit"]');
});

When('I try to login with XSS payload', async function (dataTable) {
    const credentials = dataTable.hashes()[0];
    await pageFixture.page.fill('input[name="username"]', credentials.username);
    await pageFixture.page.fill('input[name="password"]', credentials.password);
    await pageFixture.page.click('button[type="submit"]');
});

// When('I attempt to login with {string} and {string} {int} times', async function (username, password, attempts) {
//     for (let i = 0; i < attempts; i++) {
//         await pageFixture.page.fill('input[name="username"]', username);
//         await pageFixture.page.fill('input[name="password"]', password);
//         await pageFixture.page.click('button[type="submit"]');
//         // Short delay between attempts
//         await pageFixture.page.waitForTimeout(1000);
//     }
// });

// When('I enter {string} in the password field', async function (password) {
//     await pageFixture.page.fill('input[name="password"]', password);
// });

Then('I should see an error message', async function () {
    const errorMessage = await pageFixture.page.locator('//p[text()="Invalid credentials"]');
        await expect(errorMessage).toBeVisible();
        // Verify error message doesn't contain technical details
        const messageText = await errorMessage.textContent();
        expect(messageText).not.toContain('SQL');
        expect(messageText).not.toContain('syntax');     
});

Then('I should not be logged in', async function () {
    // Verify we're still on login page
    expect(pageFixture.page.url()).toContain('/login');
    // Verify no auth token is set
    const cookies = await pageFixture.page.context().cookies();
    const authCookie = cookies.find(cookie => cookie.name === 'auth_token');
    expect(authCookie).toBeUndefined();
});

Then('the payload should be sanitized', async function () {
    // Check if the XSS payload is properly encoded in the DOM
    const source = await pageFixture.page.content();
    expect(source).not.toContain('<script>alert');
    expect(source).toContain('&lt;script&gt;');
});

Then('I should be temporarily blocked after {int} failed attempts', async function (maxAttempts) {
    // Verify login button is disabled
    const submitButton = await pageFixture.page.locator('button[type="submit"]');
    await expect(submitButton).toBeDisabled();

    // Verify rate limit message is shown
    const lockoutMessage = await pageFixture.page.locator('.lockout-message');
    await expect(lockoutMessage).toBeVisible();
});

Then('I should see a lockout message', async function () {
    const lockoutMessage = await pageFixture.page.locator('.lockout-message');
    await expect(lockoutMessage).toBeVisible();
    const messageText = await lockoutMessage.textContent();
    expect(messageText).toContain('temporarily locked');
});

Then('the password should be masked', async function () {
    const passwordField = await pageFixture.page.locator('input[name="password"]');
    const inputType = await passwordField.getAttribute('type');
    expect(inputType).toBe('password');
});

Then('the password should not be visible in page source', async function () {
    const source = await pageFixture.page.content();
    expect(source).not.toContain('password123');
});

Then('the connection should be secure', async function () {
    expect(pageFixture.page.url()).toMatch(/^https:/);
});

Then('the form should submit to HTTPS endpoint', async function () {
    const form = await pageFixture.page.locator('form');
    const action = await form.getAttribute('action');
    expect(action).toMatch(/^https:/);
});
