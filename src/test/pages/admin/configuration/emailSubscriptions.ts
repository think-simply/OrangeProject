import { Page, expect } from "@playwright/test";

export default class EmailConfigPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    elements = {
        adminMenu: () => this.page.locator('//span[text()="Admin"]'),
        addBtn: () => this.page.locator('//button[normalize-space()="Add"]'),
        configurationSubMenu: () => this.page.locator('//span[normalize-space()="Configuration"]'),
        emailNoti: () => this.page.locator('//a[normalize-space()="Email Subscriptions"]'),
        toggle: () => this.page.locator('//div[text()="Leave Applications"]//ancestor::div[@class="oxd-table-row oxd-table-row--with-border"]//descendant::span'),
        pageTitle: () => this.page.locator('//h6[text()="Email Subscriptions"]'),
        notiTypeColumn: () => this.page.locator('//div[text()="Notification Type"]'),
        subscribeColumn: () => this.page.locator('//div[text()="Subscribers"]'),
        actionColumn: () => this.page.locator('//div[text()="Actions"]'),
        leaveApplication: () => this.page.locator('//div[text()="Leave Applications"]'),
        leaveApproval: () => this.page.locator('//div[text()="Leave Approvals"]'),
        leaveAssignment: () => this.page.locator('//div[text()="Leave Assignments"]'),
        leaveCancel: () => this.page.locator('//div[text()="Leave Cancellations"]'),
        leaveReject: () => this.page.locator('//div[text()="Leave Rejections"]'),
    }
    async navigateToEmailSubscription() {
        await this.elements.adminMenu().click();
        await this.elements.configurationSubMenu().click();
        await this.elements.emailNoti().click();
    }
    async verifyPageUI() {
        await expect(this.elements.pageTitle()).toBeVisible();
        await expect(this.elements.notiTypeColumn()).toBeVisible();
        await expect(this.elements.subscribeColumn()).toBeVisible();
        await expect(this.elements.actionColumn()).toBeVisible();
        await expect(this.elements.leaveApplication()).toBeVisible();
        await expect(this.elements.leaveApproval()).toBeVisible();
        await expect(this.elements.leaveAssignment()).toBeVisible();
        await expect(this.elements.leaveCancel()).toBeVisible();
        await expect(this.elements.leaveReject()).toBeVisible();
    }
    async toggleOnStatus() {
        await expect(this.elements.pageTitle()).toBeVisible();
        const toggle = this.elements.toggle();
        const isToggleOn = await toggle.isChecked();
        if (!isToggleOn) {
            await toggle.click();
        }
    }
    async verifyToggleOnStatus() {
        const toggle = this.elements.toggle();
        const isToggleOn = await toggle.isChecked();
        expect(isToggleOn).toBe(true);
    }
    async toggleOffStatus() {
        await expect(this.elements.pageTitle()).toBeVisible();
        // await expect(this.togle).toBeChecked()
        const toggle = this.elements.toggle();
        const isToggleOff = await toggle.isChecked() === false;
        // Click only if the toggle is off
        if (!isToggleOff) {
            await toggle.click();
        }
    }
    async verifyToggleOffStatus() {
        const toggle = this.elements.toggle()
        const isToggleOff = await toggle.isChecked() === false;
        expect(isToggleOff).toBe(true);
    }

}