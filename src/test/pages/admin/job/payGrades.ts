import { BasePage } from '#test/pages/BasePage';
import { Page, expect } from '@playwright/test'
import dotenv from 'dotenv'
dotenv.config()

export default class PayGradePage extends BasePage {
  constructor(page: Page) {
    super(page); // Pass the page instance to the BasePage constructor
  }
  element = {
    adminMenu: () => this.getPage().locator('//span[text()="Admin"]'),
    jobMenu: () => this.getPage().locator('//span[text()="Job "]'),
    payGradeMenu: () => this.getPage().locator('//a[text()="Pay Grades"]'),
    addPayGradeBtn: () => this.getPage().locator('//button[text()=" Add "]'),
    nameInput: () =>
      this.getPage().locator(
        '//label[text()="Name"]/ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//descendant::input'
      ),      
    saveBtn: () => this.getPage().locator('//button[text()=" Save "]'),
    messageSuccess: () => this.getPage().locator('//p[text()="Success"]'),
    editTitlePage: () => this.getPage().locator('//h6[text()="Edit Pay Grade"]'),
    editIcon: (payGradeName: string) =>
      this.getPage().locator(
        `//div[text()="${payGradeName}"]//ancestor::div[@role="row"]//button[i[contains(@class, "bi-pencil-fill")]]/i`
      ),
    nameColumn: (existName: string) =>
      this.getPage().locator(`//div[text()="${existName}"]`),
    updatedNameColumn: (newName: string) =>
      this.getPage().locator(`//div[text()="${newName}"]`),
    deleteIcon: (payGradeName: string) =>
      this.getPage().locator(
        `//div[text()="${payGradeName}"]//ancestor::div[@role="row"]//button[i[contains(@class, "bi-trash")]]/i`
      ),
    confirmDeleteBtn: () =>
      //this.getPage().locator('//button[text()=" Yes, Delete "]'),
      this.getPage().locator('//*[@id="app"]/div[3]/div/div/div/div[3]/button[2]')
  }
  async goToPayGradePage(){
    await this.element.jobMenu().click()
    await this.element.payGradeMenu().click()
  }
  async userCreateNewPayGradePage(payGradeName: string) {
    await this.element.adminMenu().click()
    await this.element.jobMenu().click()
    await this.element.payGradeMenu().click()
    await this.element.addPayGradeBtn().click()
    await this.element.nameInput().fill(payGradeName)
    await this.element.saveBtn().click()
    await expect(this.element.editTitlePage()).toBeVisible()
  }
  async verifyCreatePayGradeSuccessfully(payGradeName: string) {
    await expect(this.element.nameColumn(payGradeName)).toBeVisible()
  }
  async editPayGrade(payGradeName: string, newPayGrade: string) {
    await this.element.jobMenu().click()
    await this.element.payGradeMenu().click()
    await this.element.editIcon(payGradeName).click()
    await this.element.nameInput().click()
    await this.element.nameInput().fill(newPayGrade)
    await this.element.saveBtn().click()
  }
  async verifyUpdatePayGradeSuccessfully(newName: string) {
    await expect(this.element.editTitlePage()).toBeVisible()
    await expect(this.element.messageSuccess()).toBeVisible()
    await this.element.jobMenu().click()
    await this.element.payGradeMenu().click()
    await expect(this.element.updatedNameColumn(newName)).toBeVisible()
  }
  
  async deletePayGrade(payGradeName: string) {
    await this.element.deleteIcon(payGradeName).click()
    await this.element.confirmDeleteBtn().click()
    await this.getPage().waitForSelector('.oxd-loading-spinner', { state: 'detached' });
  }
  async verifyDeletePayGradeSuccessfully(payGradeName: string) {
    //await expect(this.element.editTitlePage()).toBeVisible()
    await expect(this.element.nameColumn(payGradeName)).toBeHidden()
  }
}
