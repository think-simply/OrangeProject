import { Page, Locator, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();
export default class SkillPage {
    readonly page :Page;
    constructor(page: Page){
      this.page = page;
    }
    elements = {
        adminMenu:()=> this.page.locator('//span[text()="Admin"]'),
        qualifications:() => this.page.locator('//span[normalize-space()="Qualifications"]'),
        skillsOption:() => this.page.locator('//a[normalize-space()="Skills"]'),
        skillElement:() => this.page.locator('//h6[@class="oxd-text oxd-text--h6 orangehrm-main-title"]'),
        addSkillBtn:() => this.page.locator('//button[normalize-space()="Add"]'),
        nameSkill:() => this.page.locator('//label[text()="Name"]/parent::div/following-sibling::div/input[@class="oxd-input oxd-input--active"]'),
        descriptionSkill:() => this.page.locator('//label[text()="Description"]//ancestor::div[@class="oxd-form-row"]//descendant::textarea'),
        saveSkillBtn: () => this.page.locator('//button[@type="submit"]'),
        addSkillsuccessmsg: () => this.page.locator('//div[@class="oxd-toast-start"]//p[@class="oxd-text oxd-text--p oxd-text--toast-message oxd-toast-content-text"]'),
        deleteIcon: () => this.page.locator('//div[contains(text(),"Skill 1")]//ancestor::div[@class="oxd-table"]//descendant::button[@class="oxd-icon-button oxd-table-cell-action-space"]'),
        yesDeleteSkillbtn:() => this.page.locator('//button[normalize-space()="Yes, Delete"]'),
        deleteSkillMsg: () => this.page.locator('//div[@id="oxd-toaster_1"]//following::p[text()="Successfully Deleted"]'),
        editIcon: () => this. page.locator('//div[contains(text(), "skill 2")]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-pencil-fill"]'),
        nameTextbox:()=> this.page.locator('//label[text()="Name"]/parent::div/following-sibling::div/input[@class="oxd-input oxd-input--active"]'),
        updateSuccessMsg: () => this.page.locator('//div[@id = "oxd-toaster_1"]//following::div[@class="oxd-toast-content oxd-toast-content--success"]'),
    }

 async acessSkillPage() {
   await this.elements.adminMenu().click();
   await this.elements.qualifications().click();
   await this.elements.skillsOption().click();
}
 async verifyAcessSkillPage(){
    await expect(this.elements.skillElement()).toBeVisible();
 }
 async createSkill(nameSkill: string, descriptionSkill: string){
    await this.elements.addSkillBtn().click();
    await this.elements.nameSkill().fill(nameSkill);
    await this.elements.descriptionSkill().fill(descriptionSkill);
    await this.elements.saveSkillBtn().click();
 }
 async verifyCreateNewSkill(){
    await expect(this.elements.addSkillsuccessmsg()).toBeVisible();
 }
 async deleteSkillLevel(){
    await this.elements.deleteIcon().click();
    await this.elements.yesDeleteSkillbtn().click();
 }
  async verifyDeleteSkill(){
    await expect(this.elements.deleteSkillMsg()).toBeVisible();
  }
  async updateLevel(){
    await this.elements.editIcon().click();
    //await this.elements.nameTextbox().click();
    //await this.elements.nameTextbox().clear();
    await expect(this.elements.nameTextbox()).not.toHaveValue("");
    await this.elements.nameTextbox().fill('New skill1');
    await this.elements.saveSkillBtn().click();
  }
   async verifyUpdateSkill(){
    await expect(this.elements.updateSuccessMsg()).toBeVisible();
  }
};


 