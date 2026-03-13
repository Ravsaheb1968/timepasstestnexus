import { Page, Locator, expect } from '@playwright/test';

export class AccountOverviewPage {
    readonly page: Page;

    // Login page locators
    readonly _usernameInput: Locator;
    readonly _passwordInput: Locator;
    readonly _loginButton: Locator;

    // Navigation locators
    readonly _accountOverviewLink: Locator;
    readonly _logoutLink: Locator; // Used to verify logged-in status

    // Account Overview page locators
    readonly _accountsTable: Locator;
    readonly _accountRows: Locator; // Represents all <tr> elements in the table body
    readonly _totalBalanceDisplayed: Locator; // The element displaying the total balance text, e.g., "Total Balance: $XXXX.XX"

    // Account Activity page locators (for verification after clicking an account number)
    readonly _accountActivityTitle: Locator; // The title on the Account Activity page, e.g., "Account Activity"

    constructor(page: Page) {
        this.page = page;

        // Login locators
        this._usernameInput = page.getByLabel('Username');
        this._passwordInput = page.getByLabel('Password');
        this._loginButton = page.getByRole('button', { name: 'Log In' });

        // Navigation locators
        this._accountOverviewLink = page.getByRole('link', { name: 'Accounts Overview' });
        this._logoutLink = page.getByRole('link', { name: 'Log Out' });

        // Account Overview locators
        this._accountsTable = page.locator('#accountTable');
        this._accountRows = page.locator('#accountTable tbody tr');
        this._totalBalanceDisplayed = page.locator('p.ng-scope b'); // This locator captures "Total Balance: $XXXX.XX" text

        // Account Activity locators
        this._accountActivityTitle = page.locator('#activityContent h1.title');
    }

    /**
     * Navigates to the base URL (login page).
     * @param baseURL The base URL of the application.
     */
    async gotoLoginPage(baseURL: string) {
        await this.page.goto(baseURL);
    }

    /**
     * Logs in a user with the given credentials.
     * @param baseURL The base URL to start login from.
     * @param username The username to use for login.
     * @param password The password to use for login.
     */
    async login(baseURL: string, username: string, password: string) {
        await this.gotoLoginPage(baseURL);
        await this._usernameInput.fill(username);
        await this._passwordInput.fill(password);
        await this._loginButton.click();
        await expect(this._logoutLink).toBeVisible(); // Verify login success by checking for Logout link
        await expect(this.page).not.toHaveURL(/.*index.htm/); // Ensure page has navigated away from login
    }

    /**
     * Navigates to the Account Overview page via the sidebar link.
     */
    async navigateToAccountOverview() {
        await this._accountOverviewLink.click();
        await expect(this.page).toHaveURL(/.*overview.htm/); // Verify navigation to overview page
        await expect(this._accountsTable).toBeVisible(); // Ensure table is visible
    }

    /**
     * Retrieves details of all displayed accounts from the Account Overview table.
     * @returns An array of objects, each containing accountNumber, type, and balance.
     */
    async getDisplayedAccountsDetails(): Promise<{ accountNumber: string, type: string, balance: string }[]> {
        await this._accountsTable.waitFor({ state: 'visible' });
        const rows = await this._accountRows.all();
        const accounts: { accountNumber: string, type: string, balance: string }[] = [];

        for (const row of rows) {
            // Locators relative to the current row
            const accountNumberLink = row.locator('td:first-child a');
            const typeLocator = row.locator('td:nth-child(2)');
            const balanceLocator = row.locator('td:nth-child(3)');

            const accNum = await accountNumberLink.textContent();
            const accType = await typeLocator.textContent();
            const accBalance = await balanceLocator.textContent();

            if (accNum && accType && accBalance) {
                accounts.push({
                    accountNumber: accNum.trim(),
                    type: accType.trim(),
                    balance: accBalance.trim(),
                });
            }
        }
        return accounts;
    }

    /**
     * Retrieves the total balance displayed on the Account Overview page.
     * @returns The total balance as a string (e.g., "$1234.56"), or null if not found.
     */
    async getDisplayedTotalBalance(): Promise<string | null> {
        await this._totalBalanceDisplayed.waitFor({ state: 'visible' });
        const totalBalanceText = await this._totalBalanceDisplayed.textContent();
        // The text is typically "Total Balance: $XXXX.XX", extract just the balance part
        const balanceMatch = totalBalanceText ? totalBalanceText.match(/\$([\d.,]+)/) : null;
        return balanceMatch ? balanceMatch[0] : null;
    }

    /**
     * Clicks on a specific account number link in the Account Overview table.
     * @param accountNumber The account number string to click.
     */
    async clickAccountLink(accountNumber: string) {
        const accountLink = this.page.locator(`#accountTable tbody tr td:first-child a:has-text("${accountNumber}")`);
        await accountLink.click();
        await expect(this.page).toHaveURL(/.*activity.htm\?id=\d+/); // Verify navigation to Account Activity page
        await expect(this._accountActivityTitle).toBeVisible(); // Ensure Account Activity title is visible
    }

    /**
     * Retrieves the title of the Account Activity page.
     * @returns The text content of the Account Activity page title, or null if not found.
     */
    async getAccountActivityTitle(): Promise<string | null> {
        await this._accountActivityTitle.waitFor({ state: 'visible' });
        return this._accountActivityTitle.textContent();
    }

    /**
     * Attempts to navigate directly to the Account Overview page URL without logging in.
     * @param baseURL The base URL of the application.
     */
    async navigateDirectlyToAccountOverview(baseURL: string) {
        const overviewURL = new URL(baseURL);
        overviewURL.pathname = '/parabank/overview.htm'; // Adjust path based on ParaBank's structure
        await this.page.goto(overviewURL.toString());
    }

    /**
     * Checks if the login page elements are currently visible.
     * @returns True if login page elements are visible, false otherwise.
     */
    async isLoginPageVisible(): Promise<boolean> {
        return this._loginButton.isVisible();
    }

    /**
     * Gets the current URL of the page.
     * @returns The current URL as a string.
     */
    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    /**
     * Gets the title of the current page.
     * @returns The page title as a string.
     */
    async getPageTitle(): Promise<string> {
        return this.page.title();
    }

    /**
     * Checks if a user appears to be logged in by verifying the presence of the logout link.
     * @returns True if the logout link is visible, indicating a logged-in state.
     */
    async isUserLoggedIn(): Promise<boolean> {
        return this._logoutLink.isVisible();
    }
}