import { Page, Locator, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

let flexibleData: string = "";

export default class StructureAdminPage {
    readonly page: Page;
    readonly adminSection: Locator;
    readonly structureItem: Locator;
    readonly organizationItem: Locator;
    //-------------------
    readonly userName: Locator;
    readonly passWord: Locator;
    readonly loginBtn: Locator;
    readonly mainTitle: Locator;
    readonly editToggle: Locator;
    readonly addBtn: Locator;
    readonly addOrgDialog: Locator;
    readonly inputUnitId: Locator;
    readonly inputName: Locator;
    readonly saveBtn: Locator;
    readonly successToast: Locator;
    readonly treeNodes: Locator;



    constructor(page: Page) {
        this.page = page;
        this.organizationItem = page.locator('//span[text()="Organization "]');
        this.userName = page.locator('//input[@name="username"]');
        this.passWord = page.locator('//input[@name="password"]');
        this.loginBtn = page.locator('//button[@type="submit"]');
        this.adminSection = page.locator('//span[text()="Admin"]');
        this.mainTitle = page.locator('//h6[text()="Organization Structure"]');
        this.structureItem = page.locator('//a[@class="oxd-topbar-body-nav-tab-link" and text()="Structure"]');
        this.editToggle = page.locator('div.oxd-switch-wrapper');
        this.addBtn = page.locator('button.org-structure-add');
        this.addOrgDialog = page.locator('div.orangehrm-dialog-modal');
        this.inputUnitId = page.locator('//label[text()="Unit Id"]/following::input[1]');
        this.inputName = page.locator('//label[text()="Name"]/following::input[1]');
        this.saveBtn = page.locator('button[type="submit"]');
        this.successToast = page.locator('div.oxd-toast-content--success');
        this.treeNodes = page.locator('div.oxd-tree-node-content div.org-structure-card');

    }
    generateRandomName(length: number): string {
        const characters =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let randomName = "";
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomName += characters[randomIndex];
        }
        return randomName;
      }
    async visit() {
        await this.page.goto(`${process.env.WEB_URL}`);
      }
    async login() {
        //don't really need this
        await this.userName.fill("Admin");
        await this.passWord.fill("admin123");
        await this.loginBtn.click();
      }
    async accessOrganization() {
        await this.adminSection.click();
        await this.organizationItem.click();
      }
    async accessStructure(){
        await this.structureItem.click();
    }
    async checkStructureUI(){
        await expect(this.mainTitle).toBeVisible();
    }
    async changeToAddMode(){
        await this.editToggle.click();
        await this.addBtn.click();
        await expect(this.addOrgDialog).toBeVisible();
    }
    async inputData(){
        await this.inputUnitId.fill(this.generateRandomName(5));
        flexibleData = this.generateRandomName(8);
        await this.inputName.fill(flexibleData);
    }
    async clickSaveButton(){
        await this.saveBtn.click();
    }
    async verifyNewOrganizationCreated(){
        await expect(this.successToast).toBeVisible();
        await expect(this.addOrgDialog).toBeHidden();
        await expect(this.treeNodes).toBeVisible();

        const nodeCount = await this.treeNodes.count();
        for (let i = 0; i < nodeCount; i++) {
            const nodeValue = await this.treeNodes.nth(i).first().textContent();
            if (nodeValue.trim().toLowerCase() === flexibleData.toLowerCase()) {
                console.log("Create Successfully!")
            }
            console.log("Could not create.")
        }
    }
}