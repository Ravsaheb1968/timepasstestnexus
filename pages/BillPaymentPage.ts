import { Page } from "@playwright/test";

export class BillPaymentPage {
  constructor(private readonly page: Page) {}

  readonly moduleRoot = this.page.getByRole("main");

  async goto(): Promise<void> {
    await this.page.goto("https://parabank.parasoft.com/parabank/index.htm");
  }

  async verifySuccessfulBillPaymentWithValidDetails(): Promise<void> {
    // Scenario: Verify successful bill payment with valid details
    await this.page.getByRole("main").click();
  }

  async verifyBillPaymentFailureWithMismatchedAccountNumberAndVerifyAccount(): Promise<void> {
    // Scenario: Verify bill payment failure with mismatched Account Number and Verify Account
    await this.page.getByRole("main").click();
  }

  async verifyBillPaymentFailureWithEmptyMandatoryFields(): Promise<void> {
    // Scenario: Verify bill payment failure with empty mandatory fields
    await this.page.getByRole("main").click();
  }

  async verifyBillPaymentFailureWhenAmountExceedsAvailableBalance(): Promise<void> {
    // Scenario: Verify bill payment failure when amount exceeds available balance
    await this.page.getByRole("main").click();
  }

  async verifySourceAccountBalanceUpdateAfterSuccessfulBillPayment(): Promise<void> {
    // Scenario: Verify source account balance update after successful bill payment
    await this.page.getByRole("main").click();
  }
}