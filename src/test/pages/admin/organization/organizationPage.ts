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
  readonly userName: Locator;
  readonly passWord: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.locator('//input[@placeholder="Username"]');
    this.passWord = page.locator('//input[@placeholder="Password"]');
    this.loginBtn = page.locator('//button[@type="submit"]');
    this.adminSection = page.locator('//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[1]/a');
    this.organizationItem = page.locator('//span[text()="Organization "]');
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
  async login() {
    await this.userName.fill("Admin");
    await this.passWord.fill("admin123");
    await this.loginBtn.click();
  }
  async accessOrganization() {
    //await pageFixture.adminPage.goto(`${process.env.WEB_URL}`);
    //const adminSection = pageFixture.adminPage.locator('//span[text()="Admin"]');
    await this.adminSection.click();
    // await this.organizationItem.click();
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
    expect(this.editToggle.isChecked(), "Date has not been disable yet.").toBe(
      false
    );
  }
}
