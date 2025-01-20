import { BasePage } from "#test/pages/BasePage";
import { Page, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export default class OrganizationPage extends BasePage {
  constructor(page: Page) {
    super(page); // Pass the page instance to the BasePage constructor
  }
  elements = {
    adminSection: () => this.getPage().locator('//span[text()="Admin"]'),
    organizationItem: () => this.getPage().locator('//span[text()="Organization "]'),
    generalInformationOption: () => this.getPage().locator('//a[text()="General Information"]'),
    GITitle: () => this.getPage().locator('//h6[text()="General Information"]'),
    checkLabel: () => this.getPage().locator('//label[text()="Number of Employees"]'),
    editToggle: () => this.getPage().locator('input[type="checkbox"]'),
    inputOrganizationName: () => this.getPage().locator("div.organization-name-container input.oxd-input--active"),
    btnSave: () => this.getPage().locator('//button[@type="submit"]'),
    successfullMessage: () => this.getPage().locator("div.oxd-toast-content--success"),
  };
  async accessGI() {
    await this.getPage().goto(`${process.env.WEB_URL}`);
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
