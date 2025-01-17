import { Page, expect } from '@playwright/test'
import dotenv from 'dotenv'
dotenv.config()

export default class PayGradePage {
  readonly page: Page
  constructor(page: Page) {
    this.page = page
  }
  element = {
    adminMenu: () => this.page.locator('//span[text()="Admin"]'),
    jobMenu: () => this.page.locator('//span[text()="Job "]'),
    payGradeMenu: () => this.page.locator('//a[text()="Pay Grades"]'),
    addPayGradeBtn: () => this.page.locator('//button[text()=" Add "]'),
    nameInput: () =>
      this.page.locator(
        '//label[text()="Name"]/ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//descendant::input'
      ),      
    saveBtn: () => this.page.locator('//button[text()=" Save "]'),
    messageSuccess: () => this.page.locator('//p[text()="Success"]'),
    editTitlePage: () => this.page.locator('//h6[text()="Edit Pay Grade"]'),
    editIcon: (payGradeName: string) =>
      this.page.locator(
        `//div[text()="${payGradeName}"]//ancestor::div[@role="row"]//button[i[contains(@class, "bi-pencil-fill")]]/i`
      ),
    nameColumn: (existName: string) =>
      this.page.locator(`//div[text()="${existName}"]`),
    updatedNameColumn: (newName: string) =>
      this.page.locator(`//div[text()="${newName}"]`),
    deleteIcon: (payGradeName: string) =>
      this.page.locator(
        `//div[text()="${payGradeName}"]//ancestor::div[@role="row"]//button[i[contains(@class, "bi-trash")]]/i`
      ),
    confirmDeleteBtn: () =>
      //this.page.locator('//button[text()=" Yes, Delete "]'),
      this.page.locator('//*[@id="app"]/div[3]/div/div/div/div[3]/button[2]')
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
    await this.page.waitForSelector('.oxd-loading-spinner', { state: 'detached' });
  }
  async verifyDeletePayGradeSuccessfully(payGradeName: string) {
    //await expect(this.element.editTitlePage()).toBeVisible()
    await expect(this.element.nameColumn(payGradeName)).toBeHidden()
  }
}
