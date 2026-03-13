import { test } from "@playwright/test";
import { AccountActivityPage } from "../pages/AccountActivityPage";

test("Verify display of account details and transaction list", async ({ page }) => {
  const verifyDisplayOfAccountDetailsAndTransactionListPage = new AccountActivityPage(page);
  await verifyDisplayOfAccountDetailsAndTransactionListPage.goto();
  await verifyDisplayOfAccountDetailsAndTransactionListPage.verifyDisplayOfAccountDetailsAndTransactionList();
});

test("Verify filtering transactions by 'Credit' type", async ({ page }) => {
  const verifyFilteringTransactionsByCreditTypePage = new AccountActivityPage(page);
  await verifyFilteringTransactionsByCreditTypePage.goto();
  await verifyFilteringTransactionsByCreditTypePage.verifyFilteringTransactionsByCreditType();
});

test("Verify filtering transactions by 'Debit' type", async ({ page }) => {
  const verifyFilteringTransactionsByDebitTypePage = new AccountActivityPage(page);
  await verifyFilteringTransactionsByDebitTypePage.goto();
  await verifyFilteringTransactionsByDebitTypePage.verifyFilteringTransactionsByDebitType();
});

test("Verify filtering transactions by date range (From/To Month and Year)", async ({ page }) => {
  const verifyFilteringTransactionsByDateRangeFromToMonthAndYearPage = new AccountActivityPage(page);
  await verifyFilteringTransactionsByDateRangeFromToMonthAndYearPage.goto();
  await verifyFilteringTransactionsByDateRangeFromToMonthAndYearPage.verifyFilteringTransactionsByDateRangeFromToMonthAndYear();
});

test("Verify 'All' filter displays all transactions", async ({ page }) => {
  const verifyAllFilterDisplaysAllTransactionsPage = new AccountActivityPage(page);
  await verifyAllFilterDisplaysAllTransactionsPage.goto();
  await verifyAllFilterDisplaysAllTransactionsPage.verifyAllFilterDisplaysAllTransactions();
});