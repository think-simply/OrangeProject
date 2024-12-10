import { Page, Locator, expect } from "@playwright/test";

export default class EmailConfigPage {
    readonly page: Page;
    readonly toggle: Locator;
    readonly adminMenu: Locator;
    readonly addBtn: Locator;
    readonly configurationSubMenu: Locator;
    readonly emailNoti: Locator;
    readonly pageTitle: Locator;
    readonly notiTypeColumn: Locator;
    readonly subscribeColumn: Locator;
    readonly actionColumn: Locator;
    readonly leaveApplication: Locator;
    readonly leaveApproval: Locator;
    readonly leaveAssignment: Locator;
    readonly leaveCancel: Locator;
    readonly leaveReject: Locator;
    constructor(page: Page) {
        this.page = page;
        this.adminMenu = page.locator('//span[text()="Admin"]');
        this.addBtn = page.locator('//button[normalize-space()="Add"]');
        this.configurationSubMenu = page.locator('//span[normalize-space()="Configuration"]')
        this.emailNoti = page.locator('//a[normalize-space()="Email Subscriptions"]');
        this.toggle = page.locator('//div[text()="Leave Applications"]//ancestor::div[@class="oxd-table-row oxd-table-row--with-border"]//descendant::span')
        this.pageTitle = page.locator('//h6[text()="Email Subscriptions"]');
        this.notiTypeColumn = page.locator('//div[text()="Notification Type"]')
        this.subscribeColumn = page.locator('//div[text()="Subscribers"]');
        this.actionColumn = page.locator('//div[text()="Actions"]');
        this.leaveApplication = page.locator('//div[text()="Leave Applications"]');
        this.leaveApproval = page.locator('//div[text()="Leave Approvals"]');
        this.leaveAssignment = page.locator('//div[text()="Leave Assignments"]');
        this.leaveCancel = page.locator('//div[text()="Leave Cancellations"]');
        this.leaveReject = page.locator('//div[text()="Leave Rejections"]');
    }
    async navigateToEmailSubscription() {
        await this.adminMenu.click();
        await this.configurationSubMenu.click();
        await this.emailNoti.click();
    }
    async afterNavigatetoPage() {
        await expect(this.pageTitle).toBeVisible();
        expect(this.notiTypeColumn).toBeVisible();
        expect(this.subscribeColumn).toBeVisible();
        expect(this.actionColumn).toBeVisible();
        expect(this.leaveApplication).toBeVisible();
        expect(this.leaveApproval).toBeVisible();
        expect(this.leaveAssignment).toBeVisible();
        expect(this.leaveCancel).toBeVisible();
        expect(this.leaveReject).toBeVisible();
    }
    async toggleOnStatus() {
        await expect(this.pageTitle).toBeVisible();

        const toggle = this.toggle;
        const isToggleOn = await toggle.isChecked();

        // Click only if the toggle is off
        if (!isToggleOn) {
            await toggle.click();
        }
    }
    async checkToggleOnStatus() {
        const toggle = this.toggle;
        const isToggleOn = await toggle.isChecked();
        expect(isToggleOn).toBe(false);

    }
    async toggleOffStatus() {
        await expect(this.pageTitle).toBeVisible();
        // await expect(this.togle).toBeChecked()
        const toggle = this.toggle
        const isToggleOff = await toggle.isChecked() === false;
         // Click only if the toggle is off
         if (!isToggleOff) {
            await toggle.click();
        }
        
    }
    async checkToggleOffStatus() {
        const toggle = this.toggle
        const isToggleOff = await toggle.isChecked() === false;
        expect(isToggleOff).toBe(true);
    }

}