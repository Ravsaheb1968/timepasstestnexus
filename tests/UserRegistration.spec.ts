import { test, expect } from '@playwright/test';
import { UserRegistrationPage } from '../pages/UserRegistrationPage'; // Adjust path as necessary

test.describe('User Registration Module', () => {
    let userRegistrationPage: UserRegistrationPage;

    test.beforeEach(async ({ page }) => {
        userRegistrationPage = new UserRegistrationPage(page);
        await userRegistrationPage.navigateToRegistrationPage();
    });

    test('1. Verify successful user registration with valid and unique data', async ({ page }) => {
        const userData = userRegistrationPage.generateUniqueUserData();

        await userRegistrationPage.fillRegistrationForm(userData);
        await userRegistrationPage.clickRegisterButton();

        // Expected: User is successfully registered, automatically logged in, and redirected to the Account Overview page.
        await expect(page).toHaveURL(/.*overview\.htm/);
        await expect(page).toHaveTitle(/ParaBank | Accounts Overview/);
        await expect(userRegistrationPage.registrationSuccessMessage).toHaveText('Accounts Overview'); // Assuming this element confirms login
    });

    test('2. Verify registration failure with an already existing username', async ({ page }) => {
        // For this test, we assume 'john' is an existing username.
        const existingUsername = 'john'; // As per the prompt's example
        const userData = userRegistrationPage.generateUniqueUserData(); // Get valid data
        userData.username = existingUsername; // Override with existing username

        await userRegistrationPage.fillRegistrationForm(userData);
        await userRegistrationPage.clickRegisterButton();

        // Expected: An error message indicating that the username is already taken is displayed.
        await expect(userRegistrationPage.usernameExistsError).toBeVisible();
        await expect(userRegistrationPage.usernameExistsError).toHaveText('This username already exists.');
        // Ensure user is not redirected, implies still on registration page or error page
        await expect(page).toHaveURL(/.*register\.htm/);
    });

    test('3. Verify registration failure with mismatched passwords', async ({ page }) => {
        const userData = userRegistrationPage.generateUniqueUserData();
        userData.password = 'Password123!';
        userData.confirmPassword = 'DifferentPassword456!'; // Mismatched passwords

        await userRegistrationPage.fillRegistrationForm(userData);
        await userRegistrationPage.clickRegisterButton();

        // Expected: An inline validation error message is displayed indicating that 'Password' and 'Confirm Password' do not match.
        await expect(userRegistrationPage.passwordMismatchError).toBeVisible();
        await expect(userRegistrationPage.passwordMismatchError).toHaveText('Passwords did not match.'); // Adjust text based on actual error message
        // Ensure user is not redirected, implies still on registration page
        await expect(page).toHaveURL(/.*register\.htm/);
    });

    test('4. Verify registration failure with empty mandatory fields', async ({ page }) => {
        // Attempt to submit with all fields empty
        await userRegistrationPage.clickRegisterButton();

        // Expected: Inline validation error messages are displayed for all empty mandatory fields.
        await expect(userRegistrationPage.firstNameError).toBeVisible();
        await expect(userRegistrationPage.firstNameError).toHaveText('First name is required.'); // Adjust text as per application
        // Add assertions for other mandatory fields as well
        await expect(userRegistrationPage.lastNameError).toBeVisible();
        await expect(userRegistrationPage.addressError).toBeVisible();
        await expect(userRegistrationPage.cityError).toBeVisible();
        await expect(userRegistrationPage.stateError).toBeVisible();
        await expect(userRegistrationPage.zipCodeError).toBeVisible();
        await expect(userRegistrationPage.ssnError).toBeVisible();
        await expect(userRegistrationPage.usernameError).toBeVisible();
        await expect(userRegistrationPage.passwordError).toBeVisible();
        await expect(userRegistrationPage.confirmPasswordError).toBeVisible();
        
        // Ensure user is not redirected, implies still on registration page
        await expect(page).toHaveURL(/.*register\.htm/);
    });

    test('5. Verify redirection to Account Overview after successful registration', async ({ page }) => {
        const userData = userRegistrationPage.generateUniqueUserData();

        await userRegistrationPage.fillRegistrationForm(userData);
        await userRegistrationPage.clickRegisterButton();

        // Expected: The user is automatically redirected to the 'Account Overview' page, and the page title/URL reflects this.
        await expect(page).toHaveURL(/.*overview\.htm/);
        await expect(page).toHaveTitle(/ParaBank | Accounts Overview/);
        await expect(userRegistrationPage.registrationSuccessMessage).toHaveText('Accounts Overview'); // Confirm heading
    });
});