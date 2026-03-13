import { test } from "@playwright/test";
import { OpenNewAccountPage } from "../pages/OpenNewAccountPage";

test("Verify successful creation of a new Checking account", async ({ page }) => {
  const verifySuccessfulCreationOfANewCheckingAccountPage = new OpenNewAccountPage(page);
  await verifySuccessfulCreationOfANewCheckingAccountPage.goto();
  await verifySuccessfulCreationOfANewCheckingAccountPage.verifySuccessfulCreationOfANewCheckingAccount();
});

test("Verify successful creation of a new Savings account", async ({ page }) => {
  const verifySuccessfulCreationOfANewSavingsAccountPage = new OpenNewAccountPage(page);
  await verifySuccessfulCreationOfANewSavingsAccountPage.goto();
  await verifySuccessfulCreationOfANewSavingsAccountPage.verifySuccessfulCreationOfANewSavingsAccount();
});

test("Verify error when opening account without selecting type", async ({ page }) => {
  const verifyErrorWhenOpeningAccountWithoutSelectingTypePage = new OpenNewAccountPage(page);
  await verifyErrorWhenOpeningAccountWithoutSelectingTypePage.goto();
  await verifyErrorWhenOpeningAccountWithoutSelectingTypePage.verifyErrorWhenOpeningAccountWithoutSelectingType();
});

test("Verify error when opening account without selecting source account", async ({ page }) => {
  const verifyErrorWhenOpeningAccountWithoutSelectingSourceAccountPage = new OpenNewAccountPage(page);
  await verifyErrorWhenOpeningAccountWithoutSelectingSourceAccountPage.goto();
  await verifyErrorWhenOpeningAccountWithoutSelectingSourceAccountPage.verifyErrorWhenOpeningAccountWithoutSelectingSourceAccount();
});

test("Verify new account details appear in Account Overview", async ({ page }) => {
  const verifyNewAccountDetailsAppearInAccountOverviewPage = new OpenNewAccountPage(page);
  await verifyNewAccountDetailsAppearInAccountOverviewPage.goto();
  await verifyNewAccountDetailsAppearInAccountOverviewPage.verifyNewAccountDetailsAppearInAccountOverview();
});