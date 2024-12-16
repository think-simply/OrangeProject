import { Page, Locator, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export default class OrganizationAdminPage {
  readonly page: Page;
  readonly adminSection: Locator;
  readonly organizationItem: Locator;
  readonly generalInformationOption: Locator;
  readonly GITitle: Locator;
  readonly checkLabel: Locator;
  readonly editToggle: Locator;
  readonly inputOrganizationName: Locator;
  readonly btnSave: Locator;
  readonly successfullMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.adminSection = page.locator('//span[text()="Admin"]');
    this.organizationItem = page.locator('//span[text()="Organization "]');
    this.generalInformationOption = page.locator('//a[text()="General Information"]');
    this.GITitle = page.locator('//h6[text()="General Information"]');
    this.checkLabel = page.locator('//label[text()="Number of Employees"]');
    this.editToggle = page.locator('input[type="checkbox"]');
    this.inputOrganizationName = page.locator("div.organization-name-container input.oxd-input--active");
    this.btnSave = page.locator('//button[@type="submit"]');
    this.successfullMessage = page.locator("div.oxd-toast-content--success");
  }

  async visit() {
    await this.page.goto(`${process.env.WEB_URL}`);
  }
  async accessOrganization() {
    await this.adminSection.click();
    await this.organizationItem.click();
  }
  async accessGI() {
    await this.generalInformationOption.click();
  }
  async checkUIGI() {
    await expect(
      this.GITitle,
      "General Information is not showing"
    ).toBeVisible();
    await expect(this.checkLabel, "Label is not showing").toBeVisible();
  }
  async turnOnEditMode() {
    await this.editToggle.click();
  }
  async updateData() {
    const organizationName = this.inputOrganizationName.inputValue();
    const newOrganizationName = organizationName + "test";
    await this.inputOrganizationName.fill(newOrganizationName);
  }
  async saveUpdates() {
    await this.btnSave.click();
  }
  async saveSuccessfully() {
    await expect(this.successfullMessage, "Save unsuccessfully!").toBeVisible();
    //expect(this.editToggle.isChecked(), "Date has not been disable yet.").toBe(false);
  }
}
