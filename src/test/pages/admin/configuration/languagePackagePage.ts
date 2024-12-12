import { Page, Locator, expect } from "@playwright/test";

export default class AdminMenuPage {
    readonly page: Page;
    readonly userName: Locator;
    readonly toggle: Locator;
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
        this.toggle = page.locator('//div[text()="Leave Applications"]//ancestor::div[@class="oxd-table-row oxd-table-row--with-border"]//descendant::span')

    }
   

}