import { Page, Locator, expect } from "@playwright/test";

export default class WorkShiftsPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    elements = {
        adminMenu: () => this.page.locator('//span[text()="Admin"]'),
        jobMenu: () => this.page.locator('//span[text()="Job "]'),
        workShiftMenu: () => this.page.locator('//a[text()="Work Shifts"]'),
        workShiftsTitle: () => this.page.locator('//h6[text()="Work Shifts"]'),
        addBtn: () => this.page.locator('//button[normalize-space()="Add"]'),
        nameColumn: () => this.page.locator('//div[text()="Name"]'),
        fromColumn: () => this.page.locator('//div[text()="From"]'),
        toColumn: () => this.page.locator('//div[text()="To"]'),
        hourPerDayColumn: () => this.page.locator('//div[text()="Hours Per Day"]'),
        actionsColumn: () => this.page.locator('//div[text()="Actions"]'),
        shiftName: () => this.page.locator('//label[text()="Shift Name"]//ancestor::div[contains(@class,"oxd-grid-item--gutters")]//descendant::input'),
        assignedEmployee: () => this.page.locator('//label[text()="Assigned Employees"]//ancestor::div[contains(@class,"oxd-grid-item--gutters")]//descendant::input'),
        saveBtn: () => this.page.locator('//button[@type="submit"]'),
        successToast: () => this.page.locator('//div[@class="oxd-toast-container oxd-toast-container--bottom"]//p[text()="Success"]'),
        workShift: (text: string) => this.page.locator(`//div[text()="${text}"]`),
        deleteIcon: (text: string) => this.page.locator(`//div[text()="${text}"]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-trash"]`),
        confirmDeleteBtn: () => this.page.locator("//button[normalize-space()='Yes, Delete']"),
        checkBox: (text: string) => this.page.locator(`//div[contains(text(), "${text}")]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-check oxd-checkbox-input-icon"]`),
        deleteMultiBtn: () => this.page.locator("//button[normalize-space()='Delete Selected']"),
        editIcon: (textTrial: string) => this.page.locator(`//div[text()="${textTrial}"]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-pencil-fill"]`),
        tableLocations: () => this.page.locator('div.orangehrm-container'),
    }
    async accessWorkShift() {
        await this.elements.adminMenu().click();
        await this.elements.jobMenu().click();
        await this.elements.workShiftMenu().click({ timeout: 35000 });
        await this.page.waitForLoadState();
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
    async addDataWorkShift(shift:string) {
        await this.elements.shiftName().click();
        await this.elements.shiftName().fill(shift);
    }
    async clickSave() {
        await this.elements.saveBtn().click();
    }
    async verifySaveSuccess(text:string) {
        await this.elements.successToast().waitFor({ state: 'visible', timeout: 4000 });
        await this.page.waitForTimeout(5000);
        await this.elements.tableLocations().nth(0).waitFor();
        await expect(this.elements.workShift(text)).toBeVisible();
    }
    async clickEditIcon(text:string) {
        await this.elements.editIcon(text).click();
    }
    async clickDelete(text:string) {
        await this.elements.tableLocations().nth(0).waitFor();
        await this.elements.deleteIcon(text).click();
        await this.elements.confirmDeleteBtn().click();
    }
    async verifyDeleteSuccess(text:string) {
        await this.elements.successToast().waitFor({ state: 'visible', timeout: 4000 });
        await this.elements.tableLocations().nth(0).waitFor();
        await expect(this.elements.workShift(text)).toBeHidden();
    }
    async removeMultiShift(text: string) {
        await this.elements.tableLocations().nth(0).waitFor();
        // get all checkbox
        const checkboxes = this.elements.checkBox(text);
        // Click each checkbox
        await checkboxes.first().click(); // or .nth(0)
        await checkboxes.last().click();  // or .nth(1)
        await this.elements.deleteMultiBtn().click();
        await this.elements.confirmDeleteBtn().click();
        await this.elements.successToast().waitFor({ state: 'visible', timeout: 20000 });
    }
    async verifyRemoveMultiShift(text: string) {
        await this.page.route(`${process.env.SEARCH_URL}`, async (route) => {
            const response = await route.fetch();
            expect(response.status()).toBe(200);
        });
        await expect(this.elements.workShift(text)).toBeHidden();
    }
}


