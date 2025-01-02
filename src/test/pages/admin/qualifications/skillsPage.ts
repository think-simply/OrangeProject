import { Page, Locator, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();
export default class SkillPage {
    readonly page :Page;
    readonly adminMenu: Locator;
    readonly qualifications: Locator;
    readonly skillsOption: Locator;
    readonly skillElement: Locator;
    readonly addSkillBtn: Locator;
    readonly nameSkill: Locator;
    readonly descriptionSkill: Locator;
    readonly saveSkillBtn: Locator;
    readonly cancelSkillBtn: Locator;
    readonly addSkillsuccessmsg: Locator;
    readonly skillNameCheckbox: Locator;
    readonly deleteIcon: Locator;
    readonly yesDeleteSkillbtn: Locator;
    readonly deleteSkillMsg:Locator;
    readonly editIcon: Locator;
    readonly editSkillname: Locator;
    readonly updateSuccessMsg:Locator;


    constructor(page: Page) {
        this.page= page;
        this.adminMenu= page.locator('//span[text()="Admin"]');
        this.qualifications= page.locator('//span[normalize-space()="Qualifications"]');
        this.skillsOption= page.locator('//li[@class="--active oxd-topbar-body-nav-tab --parent --visited"]//li[1]');
        this.skillElement= page.locator('//h6[@class="oxd-text oxd-text--h6 orangehrm-main-title"]');
        this.addSkillBtn = page.locator('//button[normalize-space()="Add"]');
        this.nameSkill = page.locator('//label[@class="oxd-label oxd-input-field-required"]//ancestor::div[@class="oxd-form-row"]//descendant::input');
        this.descriptionSkill=page.locator('//label[text()="Description"]//ancestor::div[@class="oxd-form-row"]//descendant::textarea');
        this.saveSkillBtn=page.locator('//button[@type="submit"]');
        this.addSkillsuccessmsg=page.locator('//div[@class="oxd-toast-start"]//p[@class="oxd-text oxd-text--p oxd-text--toast-message oxd-toast-content-text"]');
        this.deleteIcon=page.locator('//div[contains(text(),"Skill 1")]//ancestor::div[@class="oxd-table"]//descendant::button[@class="oxd-icon-button oxd-table-cell-action-space"]');
        this.yesDeleteSkillbtn=page.locator('//button[normalize-space()="Yes, Delete"]');
        this.deleteSkillMsg=page.locator('//div[@id="oxd-toaster_1"]//following::p[text()="Successfully Deleted"]');
        this.editIcon= page.locator('//div[contains(text(),"skill 2")]//ancestor::div[@class="oxd-table"]//descendant::i[@class="oxd-icon bi-pencil-fill"]');
        this.updateSuccessMsg= page.locator('//div[@id = "oxd-toaster_1"]//following::div[@class="oxd-toast-content oxd-toast-content--success"]');





}

async visit() {
    await this.page.goto(`${process.env.WEB_URL}`);
}
 async accessAdmin() {
    await this.adminMenu.click();
}
 async visitSkillPage() {
    await this.qualifications.click();
    await this.skillsOption.click();
} 
 async afterVisitSkillPage(){
    await expect(this.skillElement).toBeVisible({timeout:10000});
 }
 async createSkill(){
    await this.addSkillBtn.click();
    await this.nameSkill.fill('Skill 1');
    await this.descriptionSkill.fill('test 1');
    await this.saveSkillBtn.click();
 }
 async afterCreateNewSkill(){
    await expect(this.addSkillsuccessmsg).toBeVisible({timeout: 10000});
 }
 async deleteSkillLevel(){
    await this.deleteIcon.click();
    await this.yesDeleteSkillbtn.click();
 }
  async afterDeleteSkill(){
    await expect(this.deleteSkillMsg).toBeVisible({timeout:10000});
  }
  async updateLevel(){
    await this.editIcon.click();
    await this.nameSkill.fill('New skill1');
    await this.saveSkillBtn.click();
  }
   async afterupdateSkill(){
    await expect(this.updateSuccessMsg).toBeVisible({timeout:10000});
  }
};


 
