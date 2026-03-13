import { Page } from "@playwright/test";

export class OpenNewAccountPage {
  constructor(private readonly page: Page) {}

  readonly moduleRoot = this.page.getByRole("main");

  async goto(): Promise<void> {
    await this.page.goto("https://parabank.parasoft.com/parabank/index.htm");
  }

  async verifySuccessfulCreationOfANewCheckingAccount(): Promise<void> {
    // Scenario: Verify successful creation of a new Checking account
    await this.page.getByRole("main").click();
  }

  async verifySuccessfulCreationOfANewSavingsAccount(): Promise<void> {
    // Scenario: Verify successful creation of a new Savings account
    await this.page.getByRole("main").click();
  }

  async verifyErrorWhenOpeningAccountWithoutSelectingType(): Promise<void> {
    // Scenario: Verify error when opening account without selecting type
    await this.page.getByRole("main").click();
  }

  async verifyErrorWhenOpeningAccountWithoutSelectingSourceAccount(): Promise<void> {
    // Scenario: Verify error when opening account without selecting source account
    await this.page.getByRole("main").click();
  }

  async verifyNewAccountDetailsAppearInAccountOverview(): Promise<void> {
    // Scenario: Verify new account details appear in Account Overview
    await this.page.getByRole("main").click();
  }
}