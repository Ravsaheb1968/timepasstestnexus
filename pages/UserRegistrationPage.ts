import { Page, Locator } from '@playwright/test';

interface UserData {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber?: string; // Optional field
    ssn: string;
    username: string;
    passwordPlain: string; // Use 'passwordPlain' to avoid conflict with 'password' locator name
    confirmPasswordPlain: string; // Use 'confirmPasswordPlain'
}

export class UserRegistrationPage {
    readonly page: Page;

    // Locators
    readonly registerLink: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly addressInput: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly zipCodeInput: Locator;
    readonly phoneNumberInput: Locator;
    readonly ssnInput: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly registerButton: Locator;

    // Error message locators
    readonly usernameExistsError: Locator;
    readonly passwordMismatchError: Locator;
    readonly firstNameError: Locator;
    readonly lastNameError: Locator;
    readonly addressError: Locator;
    readonly cityError: Locator;
    readonly stateError: Locator;
    readonly zipCodeError: Locator;
    readonly ssnError: Locator;
    readonly usernameError: Locator;
    readonly passwordError: Locator;
    readonly confirmPasswordError: Locator;

    // Success / Account Overview locators
    readonly accountOverviewHeader: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Locators
        this.registerLink = page.locator('a:has-text("Register")');
        this.firstNameInput = page.locator('#customer\\.firstName');
        this.lastNameInput = page.locator('#customer\\.lastName');
        this.addressInput = page.locator('#customer\\.address\\.street');
        this.cityInput = page.locator('#customer\\.address\\.city');
        this.stateInput = page.locator('#customer\\.address\\.state');
        this.zipCodeInput = page.locator('#customer\\.address\\.zipCode');
        this.phoneNumberInput = page.locator('#customer\\.phoneNumber');
        this.ssnInput = page.locator('#customer\\.ssn');
        this.usernameInput = page.locator('#customer\\.username');
        this.passwordInput = page.locator('#customer\\.password');
        this.confirmPasswordInput = page.locator('#repeatedPassword');
        this.registerButton = page.locator('input[value="Register"]');

        // Error message locators (assuming span.error is common for all)
        this.usernameExistsError = page.locator('span.error'); // This locator might need refinement based on exact message location for 'username already exists'
        this.passwordMismatchError = page.locator('#repeatedPassword + span.error'); // For password mismatch, specific to confirm password field
        this.firstNameError = page.locator('#customer\\.firstName + span.error');
        this.lastNameError = page.locator('#customer\\.lastName + span.error');
        this.addressError = page.locator('#customer\\.address\\.street + span.error');
        this.cityError = page.locator('#customer\\.address\\.city + span.error');
        this.stateError = page.locator('#customer\\.address\\.state + span.error');
        this.zipCodeError = page.locator('#customer\\.address\\.zipCode + span.error');
        this.ssnError = page.locator('#customer\\.ssn + span.error');
        this.usernameError = page.locator('#customer\\.username + span.error');
        this.passwordError = page.locator('#customer\\.password + span.error');
        this.confirmPasswordError = page.locator('#repeatedPassword + span.error');


        // Success / Account Overview locators
        this.accountOverviewHeader = page.locator('h1.title:has-text("Accounts Overview")');
        this.logoutLink = page.locator('a:has-text("Log Out")');
    }

    async navigateToRegistrationPage(): Promise<void> {
        await this.page.goto('https://parabank.parasoft.com/parabank/register.htm');
    }

    async fillRegistrationForm(userData: UserData): Promise<void> {
        await this.firstNameInput.fill(userData.firstName);
        await this.lastNameInput.fill(userData.lastName);
        await this.addressInput.fill(userData.address);
        await this.cityInput.fill(userData.city);
        await this.stateInput.fill(userData.state);
        await this.zipCodeInput.fill(userData.zipCode);
        if (userData.phoneNumber) {
            await this.phoneNumberInput.fill(userData.phoneNumber);
        }
        await this.ssnInput.fill(userData.ssn);
        await this.usernameInput.fill(userData.username);
        await this.passwordInput.fill(userData.passwordPlain);
        await this.confirmPasswordInput.fill(userData.confirmPasswordPlain);
    }

    async clickRegisterButton(): Promise<void> {
        await this.registerButton.click();
    }

    async registerUser(userData: UserData): Promise<void> {
        await this.navigateToRegistrationPage();
        await this.fillRegistrationForm(userData);
        await this.clickRegisterButton();
    }

    async isAccountOverviewPageDisplayed(): Promise<boolean> {
        return await this.accountOverviewHeader.isVisible();
    }

    async getDisplayedErrorMessage(messagePart: string): Promise<Locator> {
        return this.page.locator(`span.error:has-text("${messagePart}")`);
    }

    async getInlineValidationErrorMessage(fieldLocator: Locator): Promise<Locator> {
        return fieldLocator.locator('+ span.error');
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async getPageUrl(): Promise<string> {
        return this.page.url();
    }
}