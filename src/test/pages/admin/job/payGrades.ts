import { Page, Locator, expect } from '@playwright/test'
import dotenv from 'dotenv'
dotenv.config()

export default class PayGradePage {
  readonly page: Page
  constructor(page: Page) {
    this.page = page
  }
        // //label[text()="Name"]/ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//input[@class="oxd-input oxd-input--active"]
        // //label[text()='Name']/ancestor::div[contains(@class,'oxd-input-group')]//input[@class='oxd-input oxd-input--active']
        // '//*[@id="app"]/div[1]/div[2]/div[2]/div[1]/div/form/div[1]/div/div/div/div[2]/input'
  element = {
    adminMenu: () => this.page.locator('//span[text()="Admin"]'),
    jobMenu: () => this.page.locator('//span[text()="Job "]'),
    payGradeMenu: () => this.page.locator('//a[text()="Pay Grades"]'),
    addPayGradeBtn: () => this.page.locator('//button[text()=" Add "]'),
    nameInput: () =>
      this.page.locator(
        '//*[@id="app"]/div[1]/div[2]/div[2]/div[1]/div/form/div[1]/div/div/div/div[2]/input'
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
    deleteIcon: (payGradeName: string) =>
      this.page.locator(
        `//div[text()="${payGradeName}"]//ancestor::div[@role="row"]//button[i[contains(@class, "bi-trash")]]/i`
      ),
    confirmDeleteBtn: () =>
      this.page.locator('//button[text()=" Yes, Delete "]'),
  }

  async accessToPayGradePage(payGradeName: string) {
    await this.element.adminMenu().click({ timeout: 30000 })
    await this.element.jobMenu().click()
    await this.element.payGradeMenu().click()
    await this.element.addPayGradeBtn().click()
    await this.element.nameInput().fill(payGradeName)
    await this.element.saveBtn().click()
  }
  async verifyCreatePayGradeSuccessfully() {
    //await expect(this.page).toHaveURL(`${process.env.PAY_GRADE_URL}`,{timeout: 35000})
    await expect(this.element.editTitlePage()).toBeVisible()
  }
  async editPayGrade(payGradeName: string, newPayGrade: string) {
    await this.element.jobMenu().click()
    await this.element.payGradeMenu().click()
    await this.element.editIcon(payGradeName).click()
    await this.page.waitForSelector(
      '//label[text()="Name"]/ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//input[@class="oxd-input oxd-input--active"]',
      {
        state: 'visible',
        timeout: 30000,
      }
    )

    const currentValue = await this.element.nameInput().inputValue()
    console.log('currentValue', currentValue)

    const newValue = await this.element.nameInput().fill(newPayGrade)

    console.log('newValue', newValue);
    console.log('Goes here', newPayGrade)

    await this.element.saveBtn().click()
  }
  async verifyUpdatePayGradeSuccessfully(newName: string) {
    await expect(this.element.messageSuccess()).toBeVisible()
    await this.element.jobMenu().click()
    await this.element.payGradeMenu().click()
    await expect(this.element.nameColumn(newName)).toBeVisible()
  }
  async deletePayGrade(payGradeName: string) {
    await this.element.jobMenu().click()
    await this.element.payGradeMenu().click()
    await this.element.deleteIcon(payGradeName).click()
    await this.element.confirmDeleteBtn().click()
  }
  async verifyDeletePayGradeSuccessfully(payGradeName: string) {
    await expect(this.element.nameColumn(payGradeName)).not.toBeVisible()
  }
}
