import { test } from "@playwright/test";
import { FundTransferPage } from "../pages/FundTransferPage";

test("Verify successful fund transfer between accounts", async ({ page }) => {
  const verifySuccessfulFundTransferBetweenAccountsPage = new FundTransferPage(page);
  await verifySuccessfulFundTransferBetweenAccountsPage.goto();
  await verifySuccessfulFundTransferBetweenAccountsPage.verifySuccessfulFundTransferBetweenAccounts();
});

test("Verify fund transfer failure when amount exceeds available balance", async ({ page }) => {
  const verifyFundTransferFailureWhenAmountExceedsAvailableBalancePage = new FundTransferPage(page);
  await verifyFundTransferFailureWhenAmountExceedsAvailableBalancePage.goto();
  await verifyFundTransferFailureWhenAmountExceedsAvailableBalancePage.verifyFundTransferFailureWhenAmountExceedsAvailableBalance();
});

test("Verify fund transfer failure with zero amount", async ({ page }) => {
  const verifyFundTransferFailureWithZeroAmountPage = new FundTransferPage(page);
  await verifyFundTransferFailureWithZeroAmountPage.goto();
  await verifyFundTransferFailureWithZeroAmountPage.verifyFundTransferFailureWithZeroAmount();
});

test("Verify fund transfer failure with negative amount", async ({ page }) => {
  const verifyFundTransferFailureWithNegativeAmountPage = new FundTransferPage(page);
  await verifyFundTransferFailureWithNegativeAmountPage.goto();
  await verifyFundTransferFailureWithNegativeAmountPage.verifyFundTransferFailureWithNegativeAmount();
});

test("Verify fund transfer failure with empty amount field", async ({ page }) => {
  const verifyFundTransferFailureWithEmptyAmountFieldPage = new FundTransferPage(page);
  await verifyFundTransferFailureWithEmptyAmountFieldPage.goto();
  await verifyFundTransferFailureWithEmptyAmountFieldPage.verifyFundTransferFailureWithEmptyAmountField();
});

test("Verify account balances update after successful transfer", async ({ page }) => {
  const verifyAccountBalancesUpdateAfterSuccessfulTransferPage = new FundTransferPage(page);
  await verifyAccountBalancesUpdateAfterSuccessfulTransferPage.goto();
  await verifyAccountBalancesUpdateAfterSuccessfulTransferPage.verifyAccountBalancesUpdateAfterSuccessfulTransfer();
});