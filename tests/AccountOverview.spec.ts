import { test } from "@playwright/test";
import { AccountOverviewPage } from "../pages/AccountOverviewPage";

test("Verify display of all user accounts with details", async ({ page }) => {
  const verifyDisplayOfAllUserAccountsWithDetailsPage = new AccountOverviewPage(page);
  await verifyDisplayOfAllUserAccountsWithDetailsPage.goto();
  await verifyDisplayOfAllUserAccountsWithDetailsPage.verifyDisplayOfAllUserAccountsWithDetails();
});

test("Verify display of total balance", async ({ page }) => {
  const verifyDisplayOfTotalBalancePage = new AccountOverviewPage(page);
  await verifyDisplayOfTotalBalancePage.goto();
  await verifyDisplayOfTotalBalancePage.verifyDisplayOfTotalBalance();
});

test("Verify navigation to Account Activity on clicking account number", async ({ page }) => {
  const verifyNavigationToAccountActivityOnClickingAccountNumberPage = new AccountOverviewPage(page);
  await verifyNavigationToAccountActivityOnClickingAccountNumberPage.goto();
  await verifyNavigationToAccountActivityOnClickingAccountNumberPage.verifyNavigationToAccountActivityOnClickingAccountNumber();
});

test("Verify Account Overview page access for unauthenticated users", async ({ page }) => {
  const verifyAccountOverviewPageAccessForUnauthenticatedUsersPage = new AccountOverviewPage(page);
  await verifyAccountOverviewPageAccessForUnauthenticatedUsersPage.goto();
  await verifyAccountOverviewPageAccessForUnauthenticatedUsersPage.verifyAccountOverviewPageAccessForUnauthenticatedUsers();
});