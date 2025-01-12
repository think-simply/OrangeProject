import { Page, Locator, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();
export default class SkillPage {
    readonly page :Page;
    constructor(page: Page){
      this.page = page;
    }
    elements = {
        passWord: () => this.page.locator('//input[@placeholder="Password"]'),
        loginBtn: () => this.page.locator('//button[@type="submit"]'),
        adminMenu: () => this.page.locator('//span[text()="Admin"]'),
        qualifications:() => this.page.locator('//span[normalize-space()="Qualifications"]'),
        skillsOption: () => this.page.locator('//li[@class="--active oxd-topbar-body-nav-tab --parent --visited"]//li[1]'),
        skillElement: () => this.page.locator('//h6[@class="oxd-text oxd-text--h6 orangehrm-main-title"]'),
        addSkillBtn: ()  => this.page.locator('//button[normalize-space()="Add"]'),
        nameSkill: ()  => this.page.locator('//label[@class="oxd-label oxd-input-field-required"]//ancestor::div[@class="oxd-form-row"]//descendant::input'),
        descriptionSkill: () => this.page.locator('//label[text()="Description"]//ancestor::div[@class="oxd-form-row"]//descendant::textarea'),
        saveSkillBtn: () => this.page.locator('//button[@type="submit"]'),
        addSkillsuccessmsg: () => this.page.locator('//div[@class="oxd-toast-start"]//p[@class="oxd-text oxd-text--p oxd-text--toast-message oxd-toast-content-text"]'),
        deleteIcon: () => this.page.locator('//div[contains(text(),"Skill 1")]//ancestor::div[@class="oxd-table"]//descendant::button[@class="oxd-icon-button oxd-table-cell-action-space"]'),
        yesDeleteSkillbtn: () => this.page.locator('//button[normalize-space()="Yes, Delete"]'),
        deleteSkillMsg: () => this.page.locator('//div[@id="oxd-toaster_1"]//following::p[text()="Successfully Deleted"]'),
        editIcon: () => this. page.locator('//div[contains(text(),"skill 2")]//ancestor::div[@class="oxd-table"]//descendant::i[@class="oxd-icon bi-pencil-fill"]'),
        updateSuccessMsg: () => this. page.locator('//div[@id = "oxd-toaster_1"]//following::div[@class="oxd-toast-content oxd-toast-content--success"]'),

    }
 async acessSkillPage() {
   await this.elements.adminMenu().click();
   await this.elements.qualifications().click();
   await this.elements.skillsOption().click();
}

 async afterAcessSkillPage(){
    await expect(this.elements.skillElement()).toBeVisible();
 }
 async createSkill(nameSkill: string, descriptionSkill: string){
    await this.elements.addSkillBtn().click();
    await this.elements.nameSkill().fill(nameSkill);
    await this.elements.descriptionSkill().fill(descriptionSkill);
    await this.elements.saveSkillBtn().click();
 }
 async afterCreateNewSkill(){
    await expect(this.elements.addSkillsuccessmsg()).toBeVisible();
 }
 async deleteSkillLevel(){
    await this.elements.deleteIcon().click();
    await this.elements.yesDeleteSkillbtn().click();
 }
  async afterDeleteSkill(){
    await expect(this.elements.deleteSkillMsg()).toBeVisible();
  }
  async updateLevel(){
    await this.elements.editIcon().click();
    await this.elements.nameSkill().click();
    await this.elements.nameSkill().fill('New skill1');
    await this.elements.saveSkillBtn().click();
  }
   async afterupdateSkill(){
    await expect(this.elements.updateSuccessMsg()).toBeVisible();
  }
};


 
