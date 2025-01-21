import { BasePage } from "#test/pages/BasePage";
import { Page, expect } from "@playwright/test";
import dotenv from 'dotenv';
dotenv.config();

export default class EducationPage extends BasePage {
  constructor(page: Page) {
    super(page); // Pass the page instance to the BasePage constructor
  }
    elements = {
        passWord: () => this.getPage().locator('//input[@placeholder="Password"]'),
        loginBtn: () => this.getPage().locator('//button[@type="submit"]'),
        adminMenu: () => this.getPage().locator('//span[text()="Admin"]'),
        qualifications:() => this.getPage().locator('//span[normalize-space()="Qualifications"]'),
        education :() => this.getPage().locator('//a[normalize-space()="Education"]'),
        addLevel:()  => this.getPage().locator('//button[normalize-space()="Add"]'),
        eduLevel :() =>this.getPage().locator('//label[text()="Level"]//ancestor::div[@class="oxd-form-row"]//descendant::input'),
        saveLevel:()  => this.getPage().locator('//button[@type="submit"]'),
        messageSuccess:()  => this.getPage().locator('//div[@class="oxd-toast-container oxd-toast-container--bottom"]//p[text()="Success"]'),
        checkbox:(text:string) => this.getPage().locator(`//div[contains(text(), "${text}")]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-check oxd-checkbox-input-icon"]`),
        deleteSelectedbtn:() => this.getPage().locator('//button[normalize-space()="Delete Selected"]'),
        yesDeletebtn:()  => this.getPage().locator('//button[normalize-space()="Yes, Delete"]'),
        userName:()  => this.getPage().locator('//input[@placeholder="Username"]'),
        messageDelete:() =>this.getPage().locator('//div[@class="oxd-toast oxd-toast--success oxd-toast-container--toast"]'),
        editBtn:(text: string) => this.getPage().locator(`//div[text()="${text}"]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-pencil-fill"]`),
        saveUpdateBtn:() =>this.getPage().locator('//button[@type="submit"]'),
        newRecord:(text:string) => this.getPage().locator(`//div[text()="${text}"]`),
        actionColumn: () => this.getPage().locator('//div[text()="Actions"]'),
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

    async verifyCreateEduLevel(text:string) {
        await expect(this.elements.messageSuccess()).toBeVisible(); 
        await this.elements.actionColumn().waitFor();
        await expect(this.elements.newRecord(text)).toBeVisible();
    }
    async updateLevel(text:string, newEducation:string){
        await this.elements.editBtn(text).click();
        await this.elements.eduLevel().click();
        await this.elements.eduLevel().fill(newEducation);
        await this.elements.saveUpdateBtn().click();  
    }
    async verifyUpdateLevel(){
        await expect(this.elements.messageSuccess()).toBeVisible(); 
    }
    async deleteEduLevel(text:string){
        await this.elements.adminMenu().click();
        await this.elements.qualifications().click();
        await this.elements.education().click();
        await this.elements.checkbox(text).click();
        await this.elements.deleteSelectedbtn().click();
        await this.elements.yesDeletebtn().click();
    }
    async verifyDeleteEduLevel(){
        await expect(this.elements.messageSuccess()).toBeVisible();
    }
}