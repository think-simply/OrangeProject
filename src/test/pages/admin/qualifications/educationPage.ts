import { Page, Locator, expect } from "@playwright/test";
import dotenv from 'dotenv';
dotenv.config();

export default class EducationPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    elements = {
        passWord: () => this.page.locator('//input[@placeholder="Password"]'),
        loginBtn: () => this.page.locator('//button[@type="submit"]'),
        adminMenu: () => this.page.locator('//span[text()="Admin"]'),
        qualifications:() => this.page.locator('//span[normalize-space()="Qualifications"]'),
        education :() => this.page.locator('//a[normalize-space()="Education"]'),
        addLevel:()  => this.page.locator('//button[normalize-space()="Add"]'),
        eduLevel :() =>this.page.locator('//label[text()="Level"]//ancestor::div[@class="oxd-form-row"]//descendant::input'),
        saveLevel:()  => this.page.locator('//button[@type="submit"]'),
        messageSuccess:()  => this.page.locator('//p[text()="Success"]'),
        checkbox:() => this.page.locator('//div[contains(text(), "A6")]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-check oxd-checkbox-input-icon"]'),
        deleteSelectedbtn:() => this.page.locator('//button[normalize-space()="Delete Selected"]'),
        yesDeletebtn:()  => this.page.locator('//button[normalize-space()="Yes, Delete"]'),
        userName:()  => this.page.locator('//input[@placeholder="Username"]'),
        messageDelete:() =>this.page.locator('//div[@class="oxd-toast oxd-toast--success oxd-toast-container--toast"]'),
        editBtn:() => this.page.locator('//div[text()="A1"]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-pencil-fill"]'),
        saveUpdateBtn:() =>this.page.locator('//button[@type="submit"]'),
        newRecord:(text:string) => this.page.locator(`//div[text()="${text}"]`),
        actionColumn: () => this.page.locator('//div[text()="Actions"]'),
    }
    async accessAdmin() {
        await this.elements.adminMenu().click();
        await this.elements.qualifications().click();
        await this.elements.education().click();
    }
    async createEduLevel(eduLevel:string) {
        await this.elements.addLevel().click();
        await this.elements.eduLevel().fill(eduLevel);
        await this.elements.saveLevel().click();
    }
    // this.updateMessage = page.locator('//div[@class="oxd-toast-start"]');

    async AftercreateEduLevel(text:string) {
        await expect(this.elements.messageSuccess()).toBeVisible({ timeout: 10000 }); 
        await this.elements.actionColumn().waitFor();
        await expect(this.elements.newRecord(text)).toBeVisible();
    }
    async updateLevel(){
        await this.elements.editBtn().click();
        await this.elements.eduLevel().click();
        await this.elements.eduLevel().fill("new name");
        await this.elements.saveUpdateBtn().click();  
    }
    async AfterUpdateLevel(){
        await expect(this.elements.messageSuccess()).toBeVisible({ timeout: 10000 }); 
    }
    async deleteEduLevel(){
        await this.elements.adminMenu().click();
        await this.elements.qualifications().click();
        await this.elements.education().click();
        await this.elements.checkbox().click();
        await this.elements.deleteSelectedbtn().click();
        await this.elements.yesDeletebtn().click();
    }
    async AfterDeleteEduLevel(){
        await expect(this.elements.messageSuccess()).toBeVisible({ timeout: 10000 }); 
    }


}
