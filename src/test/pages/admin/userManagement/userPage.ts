import { Page, expect } from "@playwright/test";
import dotenv from "dotenv";
import { BasePage } from "#test/pages/BasePage";
dotenv.config();

export default class UserPage extends BasePage {
  constructor(page: Page) {
    super(page); // Pass the page instance to the BasePage constructor
  }
  elements = {
    updatedAccount: (userName: string) =>
      this.getPage().locator(`//div[text()="${userName}"]`),
    newUser: (userName: string) =>
      this.getPage().locator(`//div[text()="${userName}"]`),
    editIcon: (userName: string) =>
      this.getPage().locator(
        `//div[text()="${userName}"]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-pencil-fill"]`
      ),
    loginBtn: () => this.getPage().locator('//button[@type="submit"]'),
    adminMenu: () => this.getPage().locator('//span[text()="Admin"]'),
    addBtn: () => this.getPage().locator('//button[normalize-space()="Add"]'),
    enableStatus: () => this.getPage().getByRole("option", { name: "Enabled" }),
    disabledStatus: () =>
      this.getPage().getByRole("option", { name: "Disabled" }),
    userRole: () => this.getPage().getByText("User Role-- Select --"),
    userRoleAdmin: () => this.getPage().getByRole("option", { name: "Admin" }),
    userRoleESS: () => this.getPage().getByRole("option", { name: "ESS" }),
    status: () => this.getPage().getByText("Status-- Select --"),
    employeeName: () =>
      this.getPage().locator('//input[@placeholder="Type for hints..."]'),
    usernameFieldSearch: () => this.getPage().getByRole("textbox").nth(1),
    usernameField: () => this.getPage().getByRole("textbox").nth(2),
    passwordField: () =>
      this.getPage().locator(
        '//div[contains(@class,"user-password-cell")]//descendant::input[@type="password"]'
      ),
    confirmPassword: () =>
      this.getPage().locator(
        '//label[normalize-space()="Confirm Password"]//ancestor::div[@class="oxd-grid-item oxd-grid-item--gutters"]//descendant::input[@type="password"]'
      ),
    submitBtn: () => this.getPage().locator('//button[@type="submit"]'),
    statusOption: () => this.getPage().getByRole("option", { name: "Enabled" }),
    employeeOption: () =>
      this.getPage().getByRole("option", { name: "tina thi Nguyen" }),
    messageSuccess: () =>
      this.getPage().locator(
        '//div[@class="oxd-toast-container oxd-toast-container--bottom"]//p[text()="Success"]'
      ),

    toastSpinner: () =>
      this.getPage().locator('//div[@class="oxd-loading-spinner"]'),
    userManagement: () =>
      this.getPage().locator('//span[normalize-space()="User Management"]'),
    titlePage: () => this.getPage().locator('//h5[text()="System Users"]'),
    usernameLabel: () => this.getPage().locator('//label[text()="Username"]'),
    userRoleLabel: () => this.getPage().locator('//label[text()="User Role"]'),
    employeeNameLabel: () =>
      this.getPage().locator('//label[text()="Employee Name"]'),
    statusLabel: () => this.getPage().locator('//label[text()="Status"]'),
    resetBtn: () =>
      this.getPage().locator('//button[normalize-space()="Reset"]'),
    searchBtn: () => this.getPage().locator('//button[@type="submit"]'),
    addUserBtn: () =>
      this.getPage().locator('//button[normalize-space()="Add"]'),
    userRoleColumn: () => this.getPage().locator('//div[text()="Username"]'),
    usernameColumn: () => this.getPage().locator('//div[text()="User Role"]'),
    employeeNameColumn: () =>
      this.getPage().locator('//div[text()="Employee Name"]'),
    statusColumn: () => this.getPage().locator('//div[text()="Status"]'),
    actionColumn: () => this.getPage().locator('//div[text()="Actions"]'),
    recordText: () =>
      this.getPage().getByText("/(d+) Records Found|1 Record Found/)"),
    userResult: () =>
      this.getPage().locator(
        "//div[@class='oxd-table-row oxd-table-row--with-border']//parent::div[@class='oxd-table-card']"
      ),
    deleteIcon: (text: string) =>
      this.getPage().locator(
        `//div[text()="${text}"]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-trash"]`
      ),
    confirmDeleteBtn: () =>
      this.getPage().locator("//button[normalize-space()='Yes, Delete']"),
    checkBox: (text: string) =>
      this.getPage().locator(
        `//div[contains(text(), "${text}")]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-check oxd-checkbox-input-icon"]`
      ),
    deleteMultiBtn: () =>
      this.getPage().locator("//button[normalize-space()='Delete Selected']"),
    successToast: () =>
      this.getPage().locator(
        '//div[@class="oxd-toast-container oxd-toast-container--bottom"]//p[text()="Success"]'
      ),
    resultsRowLocator: () =>
      this.getPage().locator(
        "//div[@class='oxd-table-row oxd-table-row--with-border']//parent::div[@class='oxd-table-card']"
      ),
    roleColumnLocator: () =>
      this.getPage().locator(
        "//div[@class='oxd-table-row oxd-table-row--with-border']//parent::div[@class='oxd-table-card']//child::div[@class='oxd-table-cell oxd-padding-cell'][3]"
      ),
    employeeNameLocator: () =>
      this.getPage().locator(
        "//div[@class='oxd-table-row oxd-table-row--with-border']//parent::div[@class='oxd-table-card']//child::div[@class='oxd-table-cell oxd-padding-cell'][4]"
      ),
    statusLocator: () =>
      this.getPage().locator(
        "//div[@class='oxd-table-row oxd-table-row--with-border']//parent::div[@class='oxd-table-card']//child::div[@class='oxd-table-cell oxd-padding-cell'][5]"
      ),
    noRecordText: (text: string) =>
      this.getPage().locator(`//span[text()="${text}"]`),
    validationMessage: (validation: string) =>
      this.getPage().locator(
        `//label[text()="${validation}"]//ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//descendant::span`
      ),
    inputField: (validation: string) =>
      this.getPage().locator(
        `//label[text()="${validation}"]//ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//descendant::input`
      ),
  };

  async visit() {
    await this.getPage().goto(`${process.env.WEB_URL}`);
  }
  async accessUserPage() {
    await this.elements.adminMenu().click();
    await this.elements.userManagement().click();
  }
  async verifyUserPageUI() {
    await expect(this.elements.titlePage()).toBeVisible();
    await expect(this.elements.usernameLabel()).toBeVisible();
    await expect(this.elements.usernameFieldSearch()).toBeEditable();
    await expect(this.elements.userRoleLabel()).toBeVisible();
    await expect(this.elements.userRole()).toBeVisible();
    await expect(this.elements.employeeNameLabel()).toBeVisible();
    await expect(this.elements.employeeName()).toBeEditable();
    await expect(this.elements.statusLabel()).toBeVisible();
    await expect(this.elements.status()).toBeVisible();
    await expect(this.elements.resetBtn()).toBeVisible();
    await expect(this.elements.searchBtn()).toBeVisible();
    await expect(this.elements.addUserBtn()).toBeVisible();
    await expect(this.elements.usernameColumn()).toBeVisible();
    await expect(this.elements.userRoleColumn()).toBeVisible();
    await expect(this.elements.employeeNameColumn()).toBeVisible();
    await expect(this.elements.statusColumn()).toBeVisible();
    await expect(this.elements.actionColumn()).toBeVisible();
  }
  async createUser(
    role: string,
    employee: string,
    username: string,
    pass: string,
    confirm: string
  ) {
    await this.elements.adminMenu().click();
    await this.elements.addBtn().click();
    await this.elements.userRole().click();
    await this.getPage().getByRole("option", { name: role }).click();
    await this.elements.status().click();
    await this.elements.statusOption().click();
    await this.elements.employeeName().fill(employee);
    await this.elements.employeeOption().click();
    await this.elements.usernameField().fill(username);
    await this.elements.passwordField().fill(pass);
    await this.elements.confirmPassword().fill(confirm);
    await this.elements.submitBtn().click();
    await this.elements
      .successToast()
      .waitFor({ state: "visible", timeout: 4000 });
  }

  async verifyCreatedUser(userName: string) {
    await expect(this.elements.newUser(userName)).toBeVisible();
  }

  async searchUserName(userName: string) {
    await this.elements.adminMenu().click();
    await this.elements.usernameFieldSearch().fill(userName);
    await this.elements.searchBtn().click();
    await expect(this.elements.actionColumn()).toBeVisible();
  }
  async verifySearchUserName(checkUser = false, text: string) {
    await this.getPage().route(
      `${process.env.SEARCH_URL}`,
      async function (route) {
        const response = await route.fetch();
        expect(response.status()).toBe(200);
      }
    );
    //checkUser = true
    if (checkUser) {
      await expect(this.elements.userResult()).toHaveCount(1);
      await expect(this.elements.newUser(text)).toBeVisible();
    }
    //checkUser = false
    else {
      await expect(this.elements.noRecordText(text)).toBeVisible({
        timeout: 5000,
      });
    }
  }
  async searchUserRole(role: string) {
    await this.elements.adminMenu().click();
    await this.getPage().locator(".oxd-select-text").first().click();
    if (role === "Admin") {
      await this.getPage().getByRole("option", { name: "Admin" }).click();
    } else if (role === "ESS") {
      await this.getPage().getByRole("option", { name: "ESS" }).click();
    }
    await this.getPage().waitForTimeout(500);
    await this.elements.searchBtn().click();
    await this.getPage().waitForTimeout(3000);
    //await this.searchWithQueryParams({ userRoleId: role === "Admin" ? "1" : "2" });
  }

  async verifySearchUserRole(checkUserRole = true, role: string) {
    if (checkUserRole) {
      const results = await this.elements.roleColumnLocator().all();
      expect(results.length).toBeGreaterThan(0);
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        await expect(result).toBeVisible({ timeout: 5000 });
        const statusText = await result.textContent();
        expect(statusText).toBe(role);
      }
    }
  }
  async searchEmployeeName(text: string) {
    await this.elements.adminMenu().click();
    await this.elements.employeeName().fill(text);
    await this.elements.employeeOption().click();
    await this.elements.searchBtn().click();
    await expect(this.elements.actionColumn()).toBeVisible();
    await this.getPage().route(
      `${process.env.SEARCH_URL}`,
      async function (route) {
        const response = await route.fetch();
        expect(response.status()).toBe(200);
      }
    );
  }
  async verifySearchEmployeeName(searchResult: string) {
    const results = await this.elements.employeeNameLocator().all();
    expect(results.length).toBeGreaterThan(0);
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      await expect(result).toBeVisible({ timeout: 5000 });
      const statusText = await result.textContent();
      expect(statusText).toBe(searchResult);
    }
  }
  async searchStatus(status: string) {
    await this.elements.adminMenu().click();
    await this.elements.status().click();
    await this.getPage()
      .getByRole("option", { name: status })
      .locator("span")
      .click();
    await this.elements.searchBtn().click();
    await expect(this.elements.actionColumn()).toBeVisible();
  }
  async verifySearchStatus(status: string) {
    if (status === "Enabled") {
      expect(this.elements.enableStatus()).toBeVisible();
    } else {
      expect(this.elements.disabledStatus()).toBeVisible();
    }
    // const statusLocators = await this.elements.statusLocator().all();
    // for (let i = 0; i < statusLocators.length; i++) {
    //   const statusLocator = statusLocators[i];
    //   await expect(statusLocator).toBeVisible({
    //     timeout: 5000,
    //   });
    //   const statusText = await statusLocator.textContent();
    //   expect(statusText).toBe(status);
    // }
  }
  async inputDataForFields(
    username: string,
    role: string,
    text: string,
    status: string
  ) {
    await this.elements.adminMenu().click();
    await this.elements.usernameField().fill(username);
    await this.elements.userRole().click();
    await this.getPage().getByRole("option", { name: role }).click();
    await this.elements.employeeName().fill(text);
    await this.elements.employeeOption().click();
    await this.elements.status().click();
    await this.getPage().getByRole("option", { name: status }).click();
  }
  async pressReset() {
    await this.elements.resetBtn().click();
  }
  async verifyFieldsAfterReset() {
    const usernameValue = await this.elements.usernameField().textContent();
    expect(usernameValue).toBe("");
    const role = await this.elements.userRole().textContent();
    expect(role).toBe("-- Select --");
    const employee = await this.elements.employeeName().textContent();
    expect(employee).toBe("");
    const status = await this.elements.status().textContent();
    expect(status).toBe("-- Select --");
  }
  async updateAccount(textTrial: string, newname: string) {
    await this.elements.adminMenu().click();
    await this.elements.editIcon(textTrial).click();
    await this.elements.usernameField().click();
    await this.elements.usernameField().fill(newname);
    await this.elements.submitBtn().click();
    await this.elements.successToast().waitFor({ state: "visible" });
  }
  async verifyUpdatedAccount(userName: string) {
    await expect(this.elements.updatedAccount(userName)).toBeVisible();
  }
  async removeAccount(userName: string) {
    await this.elements.adminMenu().click();
    await this.elements.deleteIcon(userName).click();
    await this.elements.confirmDeleteBtn().click();
    await this.elements.successToast().waitFor({ state: "visible" });
  }
  async verifyRemovedAccount(userName: string) {
    await expect(this.elements.updatedAccount(userName)).toBeHidden();
  }
  async removeMultiAccount(text: string) {
    await this.elements.adminMenu().click();
    // get all checkbox
    const checkboxes = this.elements.checkBox(text);
    // Click each checkbox
    await checkboxes.first().click(); // or .nth(0)()
    await checkboxes.last().click(); // or .nth(1)
    await this.elements.deleteMultiBtn().click();
    await this.elements.confirmDeleteBtn().click();
    await this.elements
      .successToast()
      .waitFor({ state: "visible", timeout: 20000 });
  }
  async verifyRemoveMultiAccount(text: string) {
    await this.getPage().route(
      `${process.env.SEARCH_URL}`,
      async function (route) {
        const response = await route.fetch();
        expect(response.status()).toBe(200);
      }
    );
    await expect(this.elements.newUser(text)).toBeHidden();
  }
  async enterValueOnFields(validation: string, text: string) {
    await this.elements.adminMenu().click();
    await this.elements.addBtn().click();
    await this.elements.inputField(validation).fill(text);
    await this.elements.submitBtn().click();
  }
  async verifyValidationMessage(validation: string, text: string) {
    await expect(this.elements.validationMessage(validation)).toHaveText(text);
  }
  async enterValueOnDropdownFields() {
    await this.elements.adminMenu().click();
    await this.elements.addBtn().click();
    await this.elements.submitBtn().click();
  }
  async enterValueOnConfirmPass(text1: string, text2: string) {
    await this.elements.adminMenu().click();
    await this.elements.addBtn().click();
    await this.elements.passwordField().fill(text1);
    await this.elements.confirmPassword().fill(text2);
    await this.elements.submitBtn().click();
  }
}
