import { BasePage } from "#test/pages/BasePage";
import { Page, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();
export default class SkillPage extends BasePage {
  constructor(page: Page) {
    super(page); // Pass the page instance to the BasePage constructor
  }
   elements = {
      adminMenu: () => this.getPage().locator('//span[text()="Admin"]'),
      qualifications: () => this.getPage().locator('//span[normalize-space()="Qualifications"]'),
      skillsOption: () => this.getPage().locator('//a[normalize-space()="Skills"]'),
      skillElement: () => this.getPage().locator('//h6[@class="oxd-text oxd-text--h6 orangehrm-main-title"]'),
      addSkillBtn: () => this.getPage().locator('//button[normalize-space()="Add"]'),
      nameSkill: () => this.getPage().locator('//label[text()="Name"]/parent::div/following-sibling::div/input[@class="oxd-input oxd-input--active"]'),
      descriptionSkill: () => this.getPage().locator('//label[text()="Description"]//ancestor::div[@class="oxd-form-row"]//descendant::textarea'),
      saveSkillBtn: () => this.getPage().locator('//button[@type="submit"]'),
      addSkillsuccessmsg: () => this.getPage().locator('//div[@class="oxd-toast-start"]//p[@class="oxd-text oxd-text--p oxd-text--toast-message oxd-toast-content-text"]'),
      yesDeleteSkillbtn: () => this.getPage().locator('//button[normalize-space()="Yes, Delete"]'),
      deleteSkillMsg: () => this.getPage().locator('//div[@id="oxd-toaster_1"]//following::p[text()="Successfully Deleted"]'),
      editIcon: (text: string) => this.getPage().locator(`//div[contains(text(), "${text}")]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-pencil-fill"]`),
      deleteIcon: (text: string) => this.getPage().locator(`//div[contains(text(), "${text}")]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-trash"]`),
      nameTextbox: () => this.getPage().locator('//label[text()="Name"]/parent::div/following-sibling::div/input'),
      updateSuccessMsg: () => this.getPage().locator('//div[@id = "oxd-toaster_1"]//following::div[@class="oxd-toast-content oxd-toast-content--success"]'),
   }

   async acessSkillPage() {
      await this.elements.adminMenu().click();
      await this.elements.qualifications().click();
      await this.elements.skillsOption().click();
   }
   async verifyAcessSkillPage() {
      await expect(this.elements.skillElement()).toBeVisible();
   }
   async createSkill(nameSkill: string, descriptionSkill: string) {
      await this.elements.addSkillBtn().click();
      await this.elements.nameSkill().fill(nameSkill);
      await this.elements.descriptionSkill().fill(descriptionSkill);
      await this.elements.saveSkillBtn().click();
   }
   async verifyCreateNewSkill() {
      await expect(this.elements.addSkillsuccessmsg()).toBeVisible();
   }
   async deleteSkill(text: string) {
      await this.elements.deleteIcon(text).click();
      await this.elements.yesDeleteSkillbtn().click();
      await expect(this.elements.updateSuccessMsg()).toBeVisible();
   }
   async verifyDeleteSkill() {
      await expect(this.elements.deleteSkillMsg()).toBeVisible();
   }
   async updateLevel(text: string, newName: string) {
      await this.elements.editIcon(text).click();
      await this.elements.nameTextbox().click();
      await this.elements.nameTextbox().fill(newName);
      await this.elements.saveSkillBtn().click();
   }
   async verifyUpdateSkill() {
      await expect(this.elements.updateSuccessMsg()).toBeVisible();
   }
};


