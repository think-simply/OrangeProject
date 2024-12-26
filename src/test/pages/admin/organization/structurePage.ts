import { Page, Locator, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

let nameTest: string = "";
let inputIDTest: string = "";
let dataTest1: string ="";

export default class StructureAdminPage {
  readonly page: Page;
  readonly adminSection: Locator;
  readonly structureItem: Locator;
  readonly organizationItem: Locator;
  //-------------------
  readonly mainTitle: Locator;
  readonly editToggle: Locator;
  readonly addBtn: Locator;
  readonly addOrgDialog: Locator;
  readonly inputUnitId: Locator;
  readonly inputName: Locator;
  readonly saveBtn: Locator;
  readonly successToast: Locator;
  readonly treeNodes: Locator;
  readonly editOrgDialog: Locator;
  readonly deletePopup: Locator;
  readonly yesBtn: Locator;
  readonly deleteToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.organizationItem = page.locator('//span[text()="Organization "]');
    this.adminSection = page.locator('//span[text()="Admin"]');
    this.mainTitle = page.locator('//h6[text()="Organization Structure"]');
    this.structureItem = page.locator('//a[@class="oxd-topbar-body-nav-tab-link" and text()="Structure"]');
    this.editToggle = page.locator("div.oxd-switch-wrapper");
    this.addBtn = page.locator("button.org-structure-add");
    this.addOrgDialog = page.locator("div.orangehrm-dialog-modal");
    this.inputUnitId = page.locator('//label[text()="Unit Id"]/following::input[1]');
    this.inputName = page.locator('//label[text()="Name"]/following::input[1]');
    this.saveBtn = page.locator('button[type="submit"]');
    this.successToast = page.locator("div.oxd-toast-content--success");
    this.treeNodes = page.locator("div.oxd-tree-node-content div.org-structure-card");
    this.editOrgDialog = page.locator('//div[@class="orangehrm-modal-header"]/p[text()="Edit Organization Unit"]');
    this.deletePopup = page.locator(
      '//div[@class="oxd-dialog-container-default--inner"]//div[@class="orangehrm-modal-header"]/p[text()="Are you Sure?"]'
    );
    this.yesBtn = page.locator("div.orangehrm-modal-footer button i.bi-trash");
    this.deleteToast = page.locator('//div[@class="oxd-toast-content oxd-toast-content--success"]/p[text()="Successfully Deleted"]');
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
  async accessOrganization() {
    await this.adminSection.click();
    await this.organizationItem.click();
  }
  async accessStructure() {
    await this.structureItem.click();
  }
  async checkStructureUI() {
    await expect(this.mainTitle).toBeVisible();
  }
  async changeToAddMode() {
    await this.editToggle.click();
    await this.addBtn.click();
    await expect(this.addOrgDialog).toBeVisible();
  }
  async inputData() {
    inputIDTest = this.generateRandomName(5);
    await this.inputUnitId.fill(inputIDTest);
    nameTest = this.generateRandomName(8);
    await this.inputName.fill(nameTest);
  }
  async clickSaveButton() {
    await this.saveBtn.click();
    await expect(this.successToast, "Could not Save data").toBeVisible();
  }
  async verifyNewOrganizationCreated() {
    //Wait until created data are displaying all
    await this.page.waitForTimeout(5000);
    //Start to check
    const nodeCount = await this.treeNodes.count();
    expect(nodeCount).toBeGreaterThan(0);
    const dataTest = inputIDTest + ": " + nameTest;
    // Tao mot bien de kiem tra co tim duoc dong vua tao hay khong
    // Khoi tao la false de nguoc lai voi dieu kien ben trong ham for
    let isMatch = false;
    for (let i = 0; i < nodeCount; i++) {
      const nodeValue = await this.treeNodes.nth(i).first().textContent();
      if (nodeValue.trim().toLowerCase() === dataTest.toLowerCase()) {
        console.log("Create Successfully!");
        isMatch = true;
      }
    }
    // Neu khong co gia tri nao match voi data test thi hien log error
    // Tai sao khong cho vao for: Vi log nay chi nen
    if (!isMatch) {
      console.log("Could not create.");
    }
  }
  async clickEditButton() {
    await this.changeToAddMode();
    await this.inputData();
    await this.clickSaveButton();
    const dataTest = inputIDTest + ": " + nameTest;
    const editIcon =
      '//div[text()="' +
      dataTest +
      '"]/following-sibling::div//i[@class="oxd-icon bi-pencil-fill"]';
    await this.page.locator(editIcon).click();
    await expect(this.editOrgDialog).toBeVisible();
  }
  async verifyOrganizationUpdated() {
    await this.clickSaveButton();
    await this.page.waitForTimeout(5000);

    const nodeCount = await this.treeNodes.count();
    expect(nodeCount).toBeGreaterThan(0);
    const dataTest = inputIDTest + ": " + nameTest;

    let isMatch = false;
    for (let i = 0; i < nodeCount; i++) {
      const nodeValue = await this.treeNodes.nth(i).first().textContent();
      if (nodeValue.trim().toLowerCase() === dataTest.toLowerCase()) {
        console.log("Updated Successfully!");
        isMatch = true;
      }
    }
    if (!isMatch) {
      console.log("Could not update.");
    }
  }
  async clickDeleteIcon() {
    await this.changeToAddMode();
    await this.inputData();
    await this.clickSaveButton();
    const dataTest = inputIDTest + ": " + nameTest;
    const deleteIcon =
      '//div[text()="' +
      dataTest +
      '"]/following-sibling::div//i[@class="oxd-icon bi-trash-fill"]';
    await this.page.locator(deleteIcon).click();
    await expect(this.deletePopup).toBeVisible();
    await this.yesBtn.click();
  }
  async verifyOrganizationDeleted() {
    await expect(this.deleteToast).toBeVisible();
    await this.page.waitForTimeout(5000);

    const nodeCount = await this.treeNodes.count();
    const dataTest = inputIDTest + ": " + nameTest;
    let isMatch = false;
    for (let i = 0; i < nodeCount; i++) {
      const nodeValue = await this.treeNodes.nth(i).first().textContent();
      if (nodeValue.trim().toLowerCase() === dataTest.toLowerCase()) {
        console.log("Deleted not successfully!");
        isMatch = true;
      }
    }
    if (!isMatch) {
      console.log("Delete successfully!");
    }
  }
  async clickAddSubOrganizationIcon() {
    await this.changeToAddMode();
    await this.inputData();
    await this.clickSaveButton();
    dataTest1 = inputIDTest + ": " + nameTest;
    const plusIcon =
      '//div[text()="' +
      dataTest1 +
      '"]/following-sibling::div//i[@class="oxd-icon bi-plus"]';
    await this.page.locator(plusIcon).click();
    await expect(this.addOrgDialog).toBeVisible();
  }
  async inputSubData() {
    inputIDTest = this.generateRandomName(5);
    await this.inputUnitId.fill(inputIDTest);
    nameTest = this.generateRandomName(8);
    await this.inputName.fill(nameTest);
  }
  async verifySubOrganizationCreated() {
    await expect(this.successToast).toBeVisible();
    const expandIcon =
      '//div[text()="' +
      dataTest1 +
      '"]/ancestor::div[@class="oxd-tree-node-content"]/preceding-sibling::span//i[@class="oxd-icon bi-chevron-down"]';
    await this.page.locator(expandIcon).click();
    //Check subitem is created
    const subdataTest = inputIDTest + ": " + nameTest;
    const nodeChilds =
      '//div[text()="' +
      dataTest1 +
      '"]/ancestor::div[@class="--parent --open --last oxd-tree-node-wrapper"]/following-sibling::ul/li//div[@class="org-name"]';
    const nodeCount = await this.page.locator(nodeChilds).count();
    let isMatch = false;
    for (let i = 0; i < nodeCount; i++) {
      const nodeValue = await this.page
        .locator(nodeChilds)
        .nth(i)
        .textContent();
      if (nodeValue.trim().toLowerCase() === subdataTest.toLowerCase()) {
        console.log("Create subitem Successfully!");
        isMatch = true;
      }
    }
    if (!isMatch) {
      console.log("Could not create.");
    }
  }
  
}