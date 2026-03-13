import { test } from "@playwright/test";
import { BillPaymentPage } from "../pages/BillPaymentPage";

test("Verify successful bill payment with valid details", async ({ page }) => {
  const verifySuccessfulBillPaymentWithValidDetailsPage = new BillPaymentPage(page);
  await verifySuccessfulBillPaymentWithValidDetailsPage.goto();
  await verifySuccessfulBillPaymentWithValidDetailsPage.verifySuccessfulBillPaymentWithValidDetails();
});

test("Verify bill payment failure with mismatched Account Number and Verify Account", async ({ page }) => {
  const verifyBillPaymentFailureWithMismatchedAccountNumberAndVerifyAccountPage = new BillPaymentPage(page);
  await verifyBillPaymentFailureWithMismatchedAccountNumberAndVerifyAccountPage.goto();
  await verifyBillPaymentFailureWithMismatchedAccountNumberAndVerifyAccountPage.verifyBillPaymentFailureWithMismatchedAccountNumberAndVerifyAccount();
});

test("Verify bill payment failure with empty mandatory fields", async ({ page }) => {
  const verifyBillPaymentFailureWithEmptyMandatoryFieldsPage = new BillPaymentPage(page);
  await verifyBillPaymentFailureWithEmptyMandatoryFieldsPage.goto();
  await verifyBillPaymentFailureWithEmptyMandatoryFieldsPage.verifyBillPaymentFailureWithEmptyMandatoryFields();
});

test("Verify bill payment failure when amount exceeds available balance", async ({ page }) => {
  const verifyBillPaymentFailureWhenAmountExceedsAvailableBalancePage = new BillPaymentPage(page);
  await verifyBillPaymentFailureWhenAmountExceedsAvailableBalancePage.goto();
  await verifyBillPaymentFailureWhenAmountExceedsAvailableBalancePage.verifyBillPaymentFailureWhenAmountExceedsAvailableBalance();
});

test("Verify source account balance update after successful bill payment", async ({ page }) => {
  const verifySourceAccountBalanceUpdateAfterSuccessfulBillPaymentPage = new BillPaymentPage(page);
  await verifySourceAccountBalanceUpdateAfterSuccessfulBillPaymentPage.goto();
  await verifySourceAccountBalanceUpdateAfterSuccessfulBillPaymentPage.verifySourceAccountBalanceUpdateAfterSuccessfulBillPayment();
});