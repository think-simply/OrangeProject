import { Page, Locator, expect } from "@playwright/test";

export default class AdminMenuPage {
    readonly page: Page;
    readonly userName: Locator;
    readonly togle: Locator;
    readonly adminMenu: Locator;
    readonly addBtn: Locator;
    readonly configurationSubMenu: Locator;
    readonly emailNoti: Locator;


    constructor(page: Page) {
        this.page = page;
        this.adminMenu = page.locator('//span[text()="Admin"]');
        this.addBtn = page.locator('//button[normalize-space()="Add"]');
        this.configurationSubMenu = page.locator('//span[normalize-space()="Configuration"]')
        this.emailNoti = page.locator('//a[normalize-space()="Email Subscriptions"]');
        this.togle = page.locator('//div[text()="Leave Assignments"]//ancestor::div[@class="oxd-table-row oxd-table-row--with-border"]//descendant::span')
    }

    async config(){
        await this.adminMenu.click();
        await this.configurationSubMenu.click();
        await this.emailNoti.click();

    }
    async togleOffStatus() {
        // await expect(this.togle).toBeChecked()
        const togle = this.page.locator('//div[text()="Leave Applications"]//ancestor::div[@class="oxd-table-row oxd-table-row--with-border"]//descendant::span')

        const isToggleOff = await togle.isChecked() === false;
        // Assertion
        expect(isToggleOff).toBe(true);
    }

}