import { Locator, Page, expect } from "@playwright/test";

export class QualificationsLicensesPage {
    readonly page: Page
    readonly adminSection: Locator
    readonly qualificationsItem: Locator
    readonly qualificationsLicensesItem: Locator
    readonly addBtn: Locator
    readonly licenseTitle: Locator
    readonly addLicenseTitle: Locator
    readonly licenseNameInput: Locator
    readonly cancelBtn: Locator
    readonly saveBtn: Locator
    readonly errorRequired: Locator
    readonly recordItemNameLast: Locator
    readonly deleteBtn: Locator
    readonly editBtn: Locator
    readonly dialog: Locator
    readonly dialogTitle: Locator
    readonly dialogMsg: Locator
    readonly dialogCancelBtn: Locator
    readonly dialogYesBtn: Locator
    readonly dialogDismissBtn: Locator
    readonly licenseNamePrefix: string
    readonly licenseNameUpdateSuffix: string
    readonly randomNum: string
    readonly licenseName: string
    readonly licenseNameUpdate: string
    readonly recordNumText: Locator
    recordNum: number
    readonly recordItems: Locator

    constructor(page: Page) {
        this.page = page
        this.adminSection = page.locator('//span[text()="Admin"]')
        this.qualificationsItem = page.locator('//span[text()="Qualifications"]')
        this.qualificationsLicensesItem = page.locator('a', { hasText: 'Licenses' })
        this.addBtn = page.locator('button', { hasText: 'Add' })
        this.licenseTitle = page.locator('//h6[text()="Licenses"]')
        this.addLicenseTitle = page.locator('//h6[text()="Add License"]')
        this.licenseNameInput = page.locator('//label[text()="Name"]/following::input')
        this.cancelBtn = page.locator('button', { hasText: 'Cancel' })
        this.saveBtn = page.locator('button[type="submit"]')
        this.errorRequired = page.locator('span', { hasText: 'Required' })
        this.deleteBtn = page.locator('(//div[@role="row"])[last()]/descendant::button[1]')
        this.editBtn = page.locator('(//div[@role="row"])[last()]/descendant::button[2]')
        this.recordItemNameLast = page.locator('(//div[@role="row"])[last()]/div[2]')
        this.dialog = page.locator('//div[@role="document"]')
        this.dialogTitle = page.locator('//div[@role="document"]/descendant::p[1]')
        this.dialogMsg = page.locator('//div[@role="document"]/descendant::p[2]')
        this.dialogDismissBtn = page.locator('button', { hasText: 'x' })
        this.dialogCancelBtn = page.locator('//div[@role="document"]/descendant::button[2]')
        this.dialogYesBtn = page.locator('//div[@role="document"]/descendant::button[3]')
        this.licenseNamePrefix = 'Demo License '
        this.licenseNameUpdateSuffix = ' Update'
        this.randomNum = this.generateRandomNumber(5)
        this.licenseName = this.generateLicenseName()
        this.recordNumText = page.locator('//hr[@role="separator"]/following-sibling::div/span')
        this.licenseNameUpdate = this.generateLicenseNameUpdate()
        this.recordItems = page.locator('(//div[@role="rowgroup"])[2]/div')
        this.recordItems.count().then(count => {
            this.recordNum = count;
        })
    }

    generateRandomNumber(length: number): string {
        const digits = "0123456789"; // Only contains number is 0-9
        let randomNum = ""
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * digits.length)
          randomNum += digits[randomIndex]
        }
        return randomNum
    }

    generateLicenseName() {
        let licenseName = this.licenseNamePrefix + this.randomNum
        return licenseName
    }

    generateLicenseNameUpdate() {
        let licenseNameUpdate = this.licenseName + this.licenseNameUpdateSuffix
        return licenseNameUpdate
    }

    getRecordNumText() {
        const text = this.recordNumText.innerText()
        return text
    }

    async accessLicenses(){
        await this.page.goto(`${process.env.WEB_URL}`);
        await this.qualificationsItem.click()
        await this.qualificationsLicensesItem.click()
    }

    async visitQualificationsLicenses() {
        await this.qualificationsItem.click()
        await this.qualificationsLicensesItem.click()
    }

    async clickAddBtn() {
        await this.addBtn.click()
    }

    async clickCancelBtn() {
        await this.cancelBtn.click()
    }

    async clickSaveBtn() {
        await this.saveBtn.click()
    }

    async verifyLicensesPage() {
        await expect(this.licenseTitle).toBeVisible()
        await expect(this.addBtn).toBeVisible()
    }

    async verifyAddLicensePage() {
        await expect(this.licenseNameInput).toBeVisible()
        await expect(this.cancelBtn).toBeVisible()
        await expect(this.saveBtn).toBeVisible()
    }

    async addLicense() {
        await this.licenseNameInput.fill(this.licenseName)
    }

    async updateLicense() {
        await this.licenseNameInput.clear()
        await this.licenseNameInput.fill(this.licenseNameUpdate)
    }

    async verifyErrorRequired() {
        await expect(this.errorRequired).toBeVisible()
    }

    async verifyRecordAdded() {
        await expect(this.recordItemNameLast).toHaveText(this.licenseName)
    }

    async verifyRecordUpdated() {
        await expect(this.recordItemNameLast).toHaveText(this.licenseNameUpdate)
    }

    async verifyRecordDeleted() {
        await expect(this.page.locator(`//div[text()="${this.licenseNameUpdate}"]`)).toBeHidden()
    }

    async verifyActionsBtn() {
        await expect(this.deleteBtn).toBeVisible()
        await expect(this.editBtn).toBeVisible()
    }

    async clickDeleteBtn() {
        await this.deleteBtn.click()
    }

    async clickEditBtn() {
        await this.editBtn.click()
    }

    async dimissDialog() {
        await this.dialogDismissBtn.click()
    }

    async verifyDialogDismissed() {
        await expect(this.dialog).toBeHidden()
    }

    async verifyDialog() {
        await expect(this.dialogTitle).toHaveText('Are you Sure?')
        await expect(this.dialogMsg).toHaveText('The selected record will be permanently deleted. Are you sure you want to continue?')
        await expect(this.dialogCancelBtn).toContainText('No, Cancel')
        await expect(this.dialogYesBtn).toContainText('Yes, Delete')
    }

    async clickDialogCancelBtn() {
        await this.dialogCancelBtn.click()
    }

    async clickDialogDeleteBtn() {
        await this.dialogYesBtn.click()
    }
}