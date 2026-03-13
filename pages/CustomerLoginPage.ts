import { Page, expect, Locator } from '@playwright/test';

export class CustomerLoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly forgotLoginInfoLink: Locator;
    readonly loginErrorMessage: Locator;
    readonly usernameInlineErrorMessage: Locator;
    readonly passwordInlineErrorMessage: Locator;
    readonly accountOverviewHeader: Locator;
    readonly lookupPageHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('input[value="Log In"]');
        this.forgotLoginInfoLink = page.locator('a[href*="lookup"]');
        this.loginErrorMessage = page.locator('p.error'); // For general login errors
        this.usernameInlineErrorMessage = page.locator('#loginPanel p.error'); // For inline username error
        this.passwordInlineErrorMessage = page.locator('#loginPanel p.error'); // For inline password error (might be same locator as username, need to verify contextually)
        this.accountOverviewHeader = page.locator('#accountOverview h1.title');
        this.lookupPageHeader = page.locator('#lookupPanel h1.title');
    }

    async navigateToLoginPage(url: string = 'https://parabank.parasoft.com/parabank/index.htm'): Promise<void> {
        await this.page.goto(url);
    }

    async login(username: string, password_input: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password_input);
        await this.loginButton.click();
    }

    async verifySuccessfulLogin(username: string, password_input: string): Promise<void> {
        await this.navigateToLoginPage();
        await this.login(username, password_input);
        await expect(this.accountOverviewHeader).toBeVisible();
        await expect(this.accountOverviewHeader).toHaveText('Accounts Overview');
        await expect(this.page).toHaveURL(/overview\.htm/);
    }

    async verifyLoginFailureWithInvalidUsername(invalidUsername: string, password_input: string): Promise<void> {
        await this.navigateToLoginPage();
        await this.login(invalidUsername, password_input);
        await expect(this.loginErrorMessage).toBeVisible();
        await expect(this.loginErrorMessage).toHaveText('The username and password could not be verified.');
        await expect(this.page).toHaveURL(/index\.htm/); // User remains on the login page
    }

    async verifyLoginFailureWithInvalidPassword(username: string, invalidPassword: string): Promise<void> {
        await this.navigateToLoginPage();
        await this.login(username, invalidPassword);
        await expect(this.loginErrorMessage).toBeVisible();
        await expect(this.loginErrorMessage).toHaveText('The username and password could not be verified.');
        await expect(this.page).toHaveURL(/index\.htm/); // User remains on the login page
    }

    async verifyLoginFailureWithEmptyUsernameField(password_input: string): Promise<void> {
        await this.navigateToLoginPage();
        await this.passwordInput.fill(password_input);
        await this.loginButton.click();
        await expect(this.usernameInlineErrorMessage).toBeVisible();
        await expect(this.usernameInlineErrorMessage).toHaveText('Please enter a username.');
        await expect(this.page).toHaveURL(/index\.htm/); // User remains on the login page
    }

    async verifyLoginFailureWithEmptyPasswordField(username: string): Promise<void> {
        await this.navigateToLoginPage();
        await this.usernameInput.fill(username);
        await this.loginButton.click();
        await expect(this.passwordInlineErrorMessage).toBeVisible();
        await expect(this.passwordInlineErrorMessage).toHaveText('Please enter a password.');
        await expect(this.page).toHaveURL(/index\.htm/); // User remains on the login page
    }

    async verifyForgotLoginInfoLinkNavigation(): Promise<void> {
        await this.navigateToLoginPage();
        await this.forgotLoginInfoLink.click();
        await expect(this.lookupPageHeader).toBeVisible();
        await expect(this.lookupPageHeader).toHaveText('Customer Lookup'); // Assuming this is the header on the lookup page
        await expect(this.page).toHaveURL(/lookup\.htm/);
    }
}