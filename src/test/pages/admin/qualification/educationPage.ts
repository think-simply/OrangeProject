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
    readonly actionColumn: Locator;
    readonly checkbox: Locator;
    readonly yesDeletebtn: Locator;
    readonly messageDelete: Locator;
    readonly deleteSelectedbtn: Locator;
    readonly editBtn: Locator;
    readonly updateLeveltext: Locator;
    readonly saveUpdateBtn: Locator;
    readonly updateMessage:Locator;

    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator('//input[@placeholder="Username"]');
        this.passWord = page.locator('//input[@placeholder="Password"]');
        this.loginBtn = page.locator('//button[@type="submit"]');
        this.adminMenu = page.locator('//span[text()="Admin"]');
        this.qualifications = page.locator('//span[normalize-space()="Qualifications"]');
        this.education = page.locator('//a[normalize-space()="Education"]');
        this.addLevel = page.locator('//button[normalize-space()="Add"]');
        this.eduLevel = page.locator('//div[@class="oxd-input-group__label-wrapper"]//following::div//input[@class="oxd-input oxd-input--active"]');
        this.saveLevel = page.locator('//button[@type="submit"]');
        this.messageSuccess = page.locator('//a[contains(@class,"Success")]');
        this.checkbox= page.locator('//div[@role="columnheader"][normalize-space()=""]//following::div[@class="oxd-checkbox-wrapper"][2]');
        this.deleteSelectedbtn= page.locator('//button[normalize-space()="Delete Selected"]');
        this.yesDeletebtn = page.locator('//button[normalize-space()="Yes, Delete"]');
        this.messageDelete= page.locator('//div[@class="oxd-toast oxd-toast--success oxd-toast-container--toast"]');
        this.editBtn= page.locator('//div[@role="table"]//button[@class="oxd-icon-button oxd-table-cell-action-space"][2]');
        this.saveUpdateBtn= page.locator('//button[@type="submit"]');
        this.updateMessage = page.locator('//div[@class="oxd-toast-start"]');


      

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

    async createEduLevel() {
        await this.qualifications.click();
        await this.education.click();
        await this.addLevel.click();
        await this.eduLevel.fill("A2");
        await this.saveLevel.click();
    }

    async AftercreateEduLevel() {
        await expect(this.messageSuccess).toBeVisible({ timeout: 10000 }); 
    }
    async updateLevel(){
        await this.adminMenu.click();
        await this.qualifications.click();
        await this.education.click();
        await this.editBtn.click();
        await this.updateLeveltext.fill("new name");
        await this.saveUpdateBtn.click();
        
    }
    async AfterUpdateLevel(){
        await expect(this.updateMessage).toBeVisible({timeout: 10000});
    }
    async deleteEduLevel(){
        await this.adminMenu.click();
        await this.qualifications.click();
        await this.education.click();
        await this.checkbox.click();
        await this.deleteSelectedbtn.click();
        await this.yesDeletebtn.click();
    }
    async AfterDeleteEduLevel(){
        await expect(this.messageDelete).toBeVisible({ timeout: 10000 });
    }


}

