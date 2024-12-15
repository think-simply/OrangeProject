import { Page, Locator, expect } from "@playwright/test";
import dotenv from 'dotenv';
dotenv.config();

export default class EducationPage {
    readonly page: Page;
    readonly userName: Locator;
    readonly passWord: Locator;
    readonly loginBtn: Locator;
    readonly adminMenu: Locator;
    readonly qualifications: Locator;
    readonly education: Locator;
    readonly addLevel: Locator;
    readonly eduLevel: Locator;
    readonly saveLevel: Locator;
    readonly messageSuccess: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator('//input[@placeholder="Username"]');
        this.passWord = page.locator('//input[@placeholder="Password"]');
        this.loginBtn = page.locator('//button[@type="submit"]');
        this.adminMenu = page.locator('//span[text()="Admin"]');
        this.qualifications = page.locator('//li[@class="oxd-topbar-body-nav-tab --parent --visited"]');
        this.education = page.locator('//a[normalize-space()="Education"]');
        this.addLevel = page.locator('//button[normalize-space()="Add"]');
        this.eduLevel = page.locator('//label[text()="Level"]//ancestor::div[contains(@class,"oxd-input-group__label-wrapper")]//descendant::div[@class="oxd-input oxd-input--focus"]');
        this.saveLevel = page.locator('//button[@type="submit"]');
        this.messageSuccess = page.locator('//a[contains(@class,"Success"]');
    }

    async visit() {
        await this.page.goto(`${process.env.WEB_URL}`);
    }

    async login() {
        await this.userName.fill("Admin");
        await this.passWord.fill("admin123");
        await this.loginBtn.click();
    }

    async accessAdmin() {
        await this.adminMenu.click();
    }

    async creatEduLevel() {
        await this.qualifications.click();
        await this.education.click();
        await this.addLevel.click();
        await this.eduLevel.fill("G1");
        await this.saveLevel.click();
    }

    async AftercreateEduLevel() {
        await expect(this.messageSuccess).toBeVisible({ timeout: 5000 });  // Adjusted timeout
    }
}
