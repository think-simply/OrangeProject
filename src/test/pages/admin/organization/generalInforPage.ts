import { Page, Locator, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export default class OrganizationAdminPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  elements = {
    adminSection: () => this.page.locator('//span[text()="Admin"]'),
    organizationItem: () => this.page.locator('//span[text()="Organization "]'),
    generalInformationOption: () => this.page.locator('//a[text()="General Information"]'),
    GITitle: () => this.page.locator('//h6[text()="General Information"]'),
    checkLabel: () => this.page.locator('//label[text()="Number of Employees"]'),
    editToggle: () => this.page.locator('input[type="checkbox"]'),
    inputOrganizationName: () => this.page.locator("div.organization-name-container input.oxd-input--active"),
    btnSave: () => this.page.locator('//button[@type="submit"]'),
    successfullMessage: () => this.page.locator("div.oxd-toast-content--success"),
  };
  async accessGI() {
    await this.page.goto(`${process.env.WEB_URL}`);
    await this.elements.adminSection().click();
    await this.elements.organizationItem().click();
    await this.elements.generalInformationOption().click();
  }
  async checkUIGI() {
    await expect(this.elements.GITitle(),"General Information is not showing").toBeVisible();
    await expect(this.elements.checkLabel(), "Label is not showing").toBeVisible();
  }
  async turnOnEditMode() {
    await this.elements.editToggle().click();
  }
  async updateData() {
    const organizationName = await this.elements.inputOrganizationName().inputValue();
    const newOrganizationName = organizationName + "test";
    await this.elements.inputOrganizationName().fill(newOrganizationName);
  }
  async saveUpdates() {
    await this.elements.btnSave().click();
  }
  async saveSuccessfully() {
    await expect(this.elements.successfullMessage(), "Save unsuccessfully!").toBeVisible();
  }
}
