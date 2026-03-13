// customerLoginPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class CustomerLoginPage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly loginErrorMessage: Locator; // General error for invalid credentials
    readonly usernameInlineError: Locator; // Specific inline error for empty username
    readonly passwordInlineError: Locator; // Specific inline error for empty password
    readonly forgotLoginInfoLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.locator('input[name="username"]');
        this.passwordField = page.locator('input[name="password"]');
        this.loginButton = page.locator('input[value="Log In"]');
        
        // This is the common error message displayed by ParaBank for invalid credentials.
        this.loginErrorMessage = page.locator('p.error');

        // The following two locators are designed to match the specific "inline validation error messages"
        // as described in the test requirements. ParaBank's default behavior for empty fields
        // upon submission is typically to show the general 'loginErrorMessage' or rely on browser
        // HTML5 validation which doesn't expose a specific element easily.
        // For the purpose of fulfilling the prompt's exact text expectations for inline errors,
        // we use `page.getByText()` to locate any element displaying these specific messages.
        this.usernameInlineError = page.getByText('Please enter a username.', { exact: true });
        this.passwordInlineError = page.getByText('Please enter a password.', { exact: true });

        this.forgotLoginInfoLink = page.locator('text="Forgot login info?"');
    }

    async fillUsername(username: string) {
        await this.usernameField.fill(username);
    }

    async fillPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async clickForgotLoginInfoLink() {
        await this.forgotLoginInfoLink.click();
    }
}

// customerLogin.spec.ts
import { test, expect } from '@playwright/test';
import { CustomerLoginPage } from './customerLoginPage'; // Assuming customerLoginPage.ts is in the same directory

const BASE_URL = 'https://parabank.parasoft.com/parabank/index.htm'; 

test.describe('Customer Login Functionality', () => {
    let customerLoginPage: CustomerLoginPage;

    test.beforeEach(async ({ page }) => {
        customerLoginPage = new CustomerLoginPage(page);
        await page.goto(BASE_URL); // Navigate to the login page before each test
    });

    test('1. Verify successful login with valid credentials', async ({ page }) => {
        // Steps: Navigate to the ParaBank home page. > Enter a valid 'Username' (e.g., 'john').
        // > Enter a valid 'Password' (e.g., 'demo'). > Click the 'Log In' button.
        await customerLoginPage.fillUsername('john');
        await customerLoginPage.fillPassword('demo');
        await customerLoginPage.clickLoginButton();

        // Expected: User is successfully logged in and redirected to the Account Overview page.
        await expect(page).toHaveURL(/overview\.htm/);
        await expect(page.locator('h1.title')).toHaveText('Accounts Overview');
    });

    test('2. Verify login failure with invalid username', async ({ page }) => {
        // Steps: Navigate to the ParaBank home page. > Enter an invalid 'Username' (e.g., 'invaliduser').
        // > Enter a valid 'Password' (e.g., 'demo'). > Click the 'Log In' button.
        await customerLoginPage.fillUsername('invaliduser');
        await customerLoginPage.fillPassword('demo');
        await customerLoginPage.clickLoginButton();

        // Expected: An error message 'The username and password could not be verified.' is displayed.
        // User remains on the login page.
        await expect(customerLoginPage.loginErrorMessage).toBeVisible();
        await expect(customerLoginPage.loginErrorMessage).toHaveText('The username and password could not be verified.');
        await expect(page).toHaveURL(BASE_URL); // User remains on the login page
    });

    test('3. Verify login failure with invalid password', async ({ page }) => {
        // Steps: Navigate to the ParaBank home page. > Enter a valid 'Username' (e.g., 'john').
        // > Enter an invalid 'Password' (e.g., 'wrongpass'). > Click the 'Log In' button.
        await customerLoginPage.fillUsername('john');
        await customerLoginPage.fillPassword('wrongpass');
        await customerLoginPage.clickLoginButton();

        // Expected: An error message 'The username and password could not be verified.' is displayed.
        // User remains on the login page.
        await expect(customerLoginPage.loginErrorMessage).toBeVisible();
        await expect(customerLoginPage.loginErrorMessage).toHaveText('The username and password could not be verified.');
        await expect(page).toHaveURL(BASE_URL); // User remains on the login page
    });

    test('4. Verify login failure with empty username field', async ({ page }) => {
        // Steps: Navigate to the ParaBank home page. > Leave 'Username' field empty.
        // > Enter a valid 'Password' (e.g., 'demo'). > Click the 'Log In' button.
        await customerLoginPage.fillUsername(''); // Leave username field empty
        await customerLoginPage.fillPassword('demo');
        await customerLoginPage.clickLoginButton();

        // Expected: An inline validation error message 'Please enter a username.' is displayed.
        // User remains on the login page.
        // IMPORTANT: This test adheres strictly to the prompt's expected 'inline validation error message'.
        // In ParaBank's actual implementation, submitting with an empty username typically results in
        // the general 'The username and password could not be verified.' message, or browser-specific
        // HTML5 validation if input fields had a 'required' attribute (which they don't).
        await expect(customerLoginPage.usernameInlineError).toBeVisible();
        await expect(customerLoginPage.usernameInlineError).toHaveText('Please enter a username.');
        await expect(page).toHaveURL(BASE_URL); // User remains on the login page
    });

    test('5. Verify login failure with empty password field', async ({ page }) => {
        // Steps: Navigate to the ParaBank home page. > Enter a valid 'Username' (e.g., 'john').
        // > Leave 'Password' field empty. > Click the 'Log In' button.
        await customerLoginPage.fillUsername('john');
        await customerLoginPage.fillPassword(''); // Leave password field empty
        await customerLoginPage.clickLoginButton();

        // Expected: An inline validation error message 'Please enter a password.' is displayed.
        // User remains on the login page.
        // IMPORTANT: Similar to the empty username test, this adheres strictly to the prompt's
        // expected 'inline validation error message', which might deviate from ParaBank's actual behavior.
        await expect(customerLoginPage.passwordInlineError).toBeVisible();
        await expect(customerLoginPage.passwordInlineError).toHaveText('Please enter a password.');
        await expect(page).toHaveURL(BASE_URL); // User remains on the login page
    });

    test('6. Verify "Forgot login info" link navigation', async ({ page }) => {
        // Steps: Navigate to the ParaBank home page. > Click the 'Forgot login info?' link.
        await customerLoginPage.clickForgotLoginInfoLink();

        // Expected: User is navigated to the 'Lookup' page (e.g., 'https://parabank.parasoft.com/parabank/lookup.htm').
        await expect(page).toHaveURL(/lookup\.htm/);
        await expect(page.locator('h1.title')).toHaveText('Customer Lookup');
    });
});