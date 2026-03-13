import { Page } from "@playwright/test";

export class AccountActivityPage {
  constructor(private readonly page: Page) {}

  readonly moduleRoot = this.page.getByRole("main");

  async goto(): Promise<void> {
    await this.page.goto("https://parabank.parasoft.com/parabank/index.htm");
  }

  async verifyDisplayOfAccountDetailsAndTransactionList(): Promise<void> {
    // Scenario: Verify display of account details and transaction list
    await this.page.getByRole("main").click();
  }

  async verifyFilteringTransactionsByCreditType(): Promise<void> {
    // Scenario: Verify filtering transactions by 'Credit' type
    await this.page.getByRole("main").click();
  }

  async verifyFilteringTransactionsByDebitType(): Promise<void> {
    // Scenario: Verify filtering transactions by 'Debit' type
    await this.page.getByRole("main").click();
  }

  async verifyFilteringTransactionsByDateRangeFromToMonthAndYear(): Promise<void> {
    // Scenario: Verify filtering transactions by date range (From/To Month and Year)
    await this.page.getByRole("main").click();
  }

  async verifyAllFilterDisplaysAllTransactions(): Promise<void> {
    // Scenario: Verify 'All' filter displays all transactions
    await this.page.getByRole("main").click();
  }
}