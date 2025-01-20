import { BasePage } from "#test/pages/BasePage";
import { Page, expect } from "@playwright/test";

export default class WorkShiftsPage extends BasePage {
  constructor(page: Page) {
    super(page); // Pass the page instance to the BasePage constructor
  }
  elements = {
    adminMenu: () => this.getPage().locator('//span[text()="Admin"]'),
    jobMenu: () => this.getPage().locator('//span[text()="Job "]'),
    workShiftMenu: () => this.getPage().locator('//a[text()="Work Shifts"]'),
    workShiftsTitle: () => this.getPage().locator('//h6[text()="Work Shifts"]'),
    addBtn: () => this.getPage().locator('//button[normalize-space()="Add"]'),
    nameColumn: () => this.getPage().locator('//div[text()="Name"]'),
    fromColumn: () => this.getPage().locator('//div[text()="From"]'),
    toColumn: () => this.getPage().locator('//div[text()="To"]'),
    hourPerDayColumn: () => this.getPage().locator('//div[text()="Hours Per Day"]'),
    actionsColumn: () => this.getPage().locator('//div[text()="Actions"]'),
    shiftName: () =>
      this.getPage().locator(
        '//label[text()="Shift Name"]//ancestor::div[contains(@class,"oxd-grid-item--gutters")]//descendant::input'
      ),
    assignedEmployee: () =>
      this.getPage().locator(
        '//label[text()="Assigned Employees"]//ancestor::div[contains(@class,"oxd-grid-item--gutters")]//descendant::input'
      ),
    saveBtn: () => this.getPage().locator('//button[@type="submit"]'),
    successToast: () =>
      this.getPage().locator(
        '//div[@class="oxd-toast-container oxd-toast-container--bottom"]//p[text()="Success"]'
      ),
    workShift: (text: string) => this.getPage().locator(`//div[text()="${text}"]`),
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
    editIcon: (textTrial: string) =>
      this.getPage().locator(
        `//div[text()="${textTrial}"]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-pencil-fill"]`
      ),
    tableLocations: () => this.getPage().locator("div.orangehrm-container"),
  };
  async accessWorkShift() {
    await this.elements.adminMenu().click();
    await this.elements.jobMenu().click();
    await this.elements.workShiftMenu().click();
    await this.getPage().waitForLoadState();
  }
  async verifyUserPageUI() {
    await expect(this.elements.workShiftsTitle()).toBeVisible();
    await expect(this.elements.addBtn()).toBeVisible();
    await expect(this.elements.nameColumn()).toBeVisible();
    await expect(this.elements.fromColumn()).toBeVisible();
    await expect(this.elements.toColumn()).toBeVisible();
    await expect(this.elements.hourPerDayColumn()).toBeVisible();
    await expect(this.elements.actionsColumn()).toBeVisible();
  }
  async clickAddBtn() {
    await this.elements.addBtn().click();
  }
  async addDataWorkShift(shift: string) {
    await this.elements.shiftName().click();
    await this.elements.shiftName().fill(shift);
  }
  async clickSave() {
    await this.elements.saveBtn().click();
  }
  async verifySaveSuccess(text: string) {
    await this.elements
      .successToast()
      .waitFor({ state: "visible", timeout: 4000 });
    await this.elements.tableLocations().nth(0).waitFor();
    await expect(this.elements.workShift(text)).toBeVisible();
  }
  async clickEditIcon(text: string) {
    await this.elements.editIcon(text).click();
  }
  async clickDelete(text: string) {
    await this.elements.tableLocations().nth(0).waitFor();
    await this.elements.deleteIcon(text).click();
    await this.elements.confirmDeleteBtn().click();
  }
  async verifyDeleteSuccess(text: string) {
    await this.elements
      .successToast()
      .waitFor({ state: "visible", timeout: 4000 });
    await this.elements.tableLocations().nth(0).waitFor();
    await expect(this.elements.workShift(text)).toBeHidden();
  }
  async removeMultiShift(text: string) {
    await this.elements.tableLocations().nth(0).waitFor();
    // get all checkbox
    const checkboxes = this.elements.checkBox(text);
    // Click each checkbox
    await checkboxes.first().click(); // or .nth(0)
    await checkboxes.last().click(); // or .nth(1)
    await this.elements.deleteMultiBtn().click();
    await this.elements.confirmDeleteBtn().click();
    await this.elements
      .successToast()
      .waitFor({ state: "visible", timeout: 20000 });
  }
  async verifyRemoveMultiShift(text: string) {
    await this.getPage().route(`${process.env.SEARCH_URL}`, async function (route) {
      const response = await route.fetch();
      expect(response.status()).toBe(200);
    });
    await expect(this.elements.workShift(text)).toBeHidden();
  }
}
