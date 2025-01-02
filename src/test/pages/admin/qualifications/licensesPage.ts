import { Page, expect } from "@playwright/test";
import dotenv from 'dotenv';
import { text } from "stream/consumers";
dotenv.config();

export class LicensesPage {
    readonly page: Page
    readonly licenseNamePrefix: string
    readonly licenseNameUpdateSuffix: string
    readonly licenseName: string
    readonly licenseNameUpdate: string
    static readonly randomNum: number = LicensesPage.generateRandomNumber(5)

    constructor(page: Page) {
        this.page = page
        this.licenseNamePrefix = 'Demo License '
        this.licenseNameUpdateSuffix = ' Update'
        this.licenseName = this.licenseNamePrefix + LicensesPage.randomNum
        this.licenseNameUpdate = this.licenseName + this.licenseNameUpdateSuffix
    }

    elements = {
        adminSection: () => this.page.locator('//span[text()="Admin"]'),
        qualificationsItem: () => this.page.locator('//span[text()="Qualifications "]'),
        qualificationsLicensesItem: () => this.page.locator('a', { hasText: 'Licenses' }),
        addBtn: () => this.page.locator('button', { hasText: 'Add' }),
        licenseTitle: () => this.page.locator('//h6[text()="Licenses"]'),
        addLicenseTitle: () => this.page.locator('//h6[text()="Add License"]'),
        licenseNameInput: () => this.page.locator('//label[text()="Name"]/following::input'),
        cancelBtn: () => this.page.locator('button', { hasText: 'Cancel' }),
        saveBtn: () => this.page.locator('button[type="submit"]'),
        errorRequired: () => this.page.locator('span', { hasText: 'Required' }),
        deleteBtn: (text: string) => this.page.locator(`//div[text()="${text}"]/../following-sibling::div/descendant::button[1]`),
        deleteBtnWait: (text: string) => this.page.waitForSelector(`//div[text()="${text}"]/../following-sibling::div/descendant::button[1]`),
        editBtn: (text: string) => this.page.locator(`//div[text()="${text}"]/../following-sibling::div/descendant::button[2]`),
        editBtnWait: (text: string) => this.page.waitForSelector(`//div[text()="${text}"]/../following-sibling::div/descendant::button[2]`),
        recordItemNameSpecific: (text: string) => this.page.locator(`//div[text()="${text}"]`),
        recordItemName: (index: number) => this.page.locator(`(//div[@role="row"])[${index}]/div[2]`),
        recordTable: () => this.page.locator('//div[@role="table"]'),
        dialog: () => this.page.locator('//div[@role="document"]'),
        dialogTitle: () => this.page.locator('//div[@role="document"]/descendant::p[1]'),
        dialogMsg: () => this.page.locator('//div[@role="document"]/descendant::p[2]'),
        dialogDismissBtn: () => this.page.locator('(//div[@role="document"]//button)[1]'),
        dialogCancelBtn: () => this.page.locator('//div[@role="document"]/descendant::button[2]'),
        dialogYesBtn: () => this.page.locator('//div[@role="document"]/descendant::button[3]'),
        recordNumText: () => this.page.locator('//hr[@role="separator"]/following-sibling::div/span'),
        recordItems: () => this.page.locator('(//div[@role="rowgroup"])[2]/div'),
    }

    private static generateRandomNumber(length: number): number {
        return Math.floor(Math.random() * Math.pow(10, length));
    }

    getRecordNumText() {
        const text = this.elements.recordNumText().innerText()
        return text
    }

    async clickAdminSection() {
        await this.elements.adminSection().click()
    }

    async visit() {
        await this.page.goto(`${process.env.WEB_URL}`)
    }

    async visitQualificationsLicenses() {
        await this.elements.qualificationsItem().click()
        await this.elements.qualificationsLicensesItem().click()
    }

    async clickAddBtn() {
        await this.elements.addBtn().click()
    }

    async clickCancelBtn() {
        await this.elements.cancelBtn().click()
    }

    async clickSaveBtn() {
        await this.elements.saveBtn().click()
    }

    async verifyLicensesPage() {
        await expect(this.elements.licenseTitle()).toBeVisible()
        await expect(this.elements.addBtn()).toBeVisible()
    }

    async verifyAddLicensePage() {
        await expect(this.elements.licenseNameInput()).toBeVisible()
        await expect(this.elements.cancelBtn()).toBeVisible()
        await expect(this.elements.saveBtn()).toBeVisible()
    }

    async inputLicense() {
        await this.elements.licenseNameInput().fill(this.licenseName)
        
    }

    async updateLicense() {
        await this.elements.licenseNameInput().click()
        await this.elements.licenseNameInput().clear()
        await this.elements.licenseNameInput().fill(this.licenseNameUpdate)
    }

    async verifyErrorRequired() {
        await expect(this.elements.errorRequired()).toBeVisible()
    }

    async waitForRecordItem() {
        await this.page.waitForTimeout(5000)
    }

    async verifyRecordAdded() {
        let isAdded = false
        const itemsCount = await this.elements.recordItems().count()
        for (let i = 2; i <= itemsCount; i++) {
            const text = await this.elements.recordItemName(i).innerText()
            if (text === this.licenseName) {
                isAdded = true
                break
            }
        }
    }

    async verifyRecordUpdated() {
        let isUpdated = false
        const itemsCount = await this.elements.recordItems().count()
        for (let i = 2; i <= itemsCount; i++) {
            const text = await this.elements.recordItemName(i).innerText()
            if (text === this.licenseNameUpdate) {
                isUpdated = true
                break
            }
        }
    }

    async verifyRecordDeleted() {
        await expect(this.elements.recordItemNameSpecific(this.licenseNameUpdate)).toBeHidden()
    }

    async verifyActionsBtn() {
        await expect(this.elements.deleteBtn(this.licenseName)).toBeVisible()
        await expect(this.elements.editBtn(this.licenseName)).toBeVisible()
    }

    async clickDeleteBtn() {
        await this.elements.deleteBtnWait(this.licenseNameUpdate)
        await this.elements.deleteBtn(this.licenseNameUpdate).click()
    }

    async clickEditBtn() {
        await this.elements.editBtnWait(this.licenseName)
        await this.elements.editBtn(this.licenseName).click()
    }

    async dimissDialog() {
        await this.elements.dialogDismissBtn().click()
    }

    async verifyDialogDismissed() {
        await expect(this.elements.dialog()).toBeHidden()
    }

    async verifyDialog() {
        await expect(this.elements.dialogTitle()).toHaveText('Are you Sure?')
        await expect(this.elements.dialogMsg()).toHaveText('The selected record will be permanently deleted. Are you sure you want to continue?')
        await expect(this.elements.dialogCancelBtn()).toContainText('No, Cancel')
        await expect(this.elements.dialogYesBtn()).toContainText('Yes, Delete')
    }

    async clickDialogCancelBtn() {
        await this.elements.dialogCancelBtn().click()
    }

    async clickDialogDeleteBtn() {
        await this.elements.dialogYesBtn().click()
    }
}