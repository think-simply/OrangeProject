import { Locator, Page } from "@playwright/test";

export class QualificationsLicensesPage {
    readonly page: Page
    readonly adminSection: Locator
    readonly qualificationsItem: Locator
    readonly qualificationsLicensesItem: Locator
    readonly addBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.adminSection = page.locator('//span[text()="Admin"]')
        this.qualificationsItem = page.locator('//span[text()="Qualifications"]')
        this.qualificationsLicensesItem = page.locator('a', { hasText: 'Licenses' })
        this.addBtn = page.locator('button', { hasText: 'Add' })
    }
}