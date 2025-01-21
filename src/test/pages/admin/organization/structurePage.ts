import { Page, expect } from "@playwright/test";
import { generateRandomName } from "#helper/randomString";
import dotenv from "dotenv";
import { BasePage } from "#test/pages/BasePage";
dotenv.config();

let nameTest: string = "";
let inputIDTest: string = "";
let flexibleData: string = "";

export default class StructurePage extends BasePage {
  constructor(page: Page) {
    super(page); // Pass the page instance to the BasePage constructor
  }
  elements = {
    organizationItem: () => this.getPage().locator('//span[text()="Organization "]'),
    adminSection: () => this.getPage().locator('//span[text()="Admin"]'),
    mainTitle: () => this.getPage().locator('//h6[text()="Organization Structure"]'),
    structureItem: () => this.getPage().locator('//a[@class="oxd-topbar-body-nav-tab-link" and text()="Structure"]'),
    editToggle: () => this.getPage().locator("div.oxd-switch-wrapper"),
    plusIcon: (dataName: string) => this.getPage().locator(`//div[text()="${dataName}"]/following-sibling::div//i[@class="oxd-icon bi-plus"]`),
    editIcon: (dataName: string) => this.getPage().locator(`//div[text()="${dataName}"]/following-sibling::div//i[@class="oxd-icon bi-pencil-fill"]`),
    addBtn: () => this.getPage().locator("button.org-structure-add"),
    addOrgDialog: () => this.getPage().locator("div.orangehrm-dialog-modal"),
    inputUnitId: () => this.getPage().locator('//label[text()="Unit Id"]/following::input[1]'),
    inputName: () => this.getPage().locator('//label[text()="Name"]/following::input[1]'),
    inputDescription: () => this.getPage().locator('//label[text()="Name"]/following::textarea'),
    saveBtn: () => this.getPage().locator('//button[@type="submit"]'),
    successToast: () => this.getPage().locator("div.oxd-toast-content--success"),
    treeNodes: () => this.getPage().locator("div.oxd-tree-node-content div.org-structure-card"),
    editOrgDialog: () => this.getPage().locator('//div[@class="orangehrm-modal-header"]/p[text()="Edit Organization Unit"]'),
    deleteIcon:(dataName: string) => this.getPage().locator(`//div[text()="${dataName}"]/following-sibling::div//i[@class="oxd-icon bi-trash-fill"]`),
    deletePopup: () => this.getPage().locator('//div[@class="oxd-dialog-container-default--inner"]//div[@class="orangehrm-modal-header"]/p[text()="Are you Sure?"]'),
    yesBtn: () => this.getPage().locator("div.orangehrm-modal-footer button i.bi-trash"),
    deleteToast: () => this.getPage().locator('//div[@class="oxd-toast-content oxd-toast-content--success"]/p[text()="Successfully Deleted"]'),
  }

  async accessStructure() {
    await this.getPage().goto(`${process.env.WEB_URL}`);
    await this.elements.adminSection().click();
    await this.elements.organizationItem().click();
    await this.elements.structureItem().click();
  }
  async checkStructureUI() {
    await expect(this.elements.mainTitle()).toBeVisible();
  }
  async changeToAddMode() {
    await this.elements.editToggle().click();
    await this.elements.addBtn().click();
    await expect(this.elements.addOrgDialog()).toBeVisible();
  }
  async inputData() {
    inputIDTest = generateRandomName(5);
    await this.elements.inputUnitId().fill(inputIDTest);
    nameTest = generateRandomName(8);
    await this.elements.inputName().fill(nameTest);
    flexibleData = inputIDTest + ": " + nameTest;
    await this.elements.inputDescription().fill(nameTest)
  }
  async clickSaveButton() {
    await this.elements.saveBtn().click();
    await expect(this.elements.successToast()).toBeVisible();
  }
  async verifyData(dataTest: string){
    const nodeCount = await this.elements.treeNodes().count();
    let isMatch = false;
    for (let i = 0; i < nodeCount; i++) {
      const nodeValue = await this.elements.treeNodes().nth(i).first().textContent();
      if (nodeValue.trim().toLowerCase() === dataTest.toLowerCase()) {
        isMatch = true;
        return;
      }
    }
    expect(isMatch = true, "Unsuccessfully!");
  }
  async verifyNewOrganizationCreated() {
    await this.verifyData(flexibleData);
  }
  async clickEditButton() {
    //Create new data to edit
    await this.changeToAddMode();
    await this.inputData();
    await this.clickSaveButton();

    //Click edit icon
    await this.elements.editIcon(flexibleData).click();
    await expect(this.elements.editOrgDialog()).toBeVisible();
  }
  async verifyOrganizationUpdated() {
    const updatedData = flexibleData;
    await this.verifyData(updatedData);
  }
  async clickDeleteIcon() {
    //Create new data to edit
    await this.changeToAddMode();
    await this.inputData();
    await this.clickSaveButton();

    //Click Delete Icon
    await this.elements.deleteIcon(flexibleData).click();
    await expect(this.elements.deletePopup()).toBeVisible();
    await this.elements.yesBtn().click();
  }
  async verifyOrganizationDeleted() {
    await expect(this.elements.deleteToast()).toBeVisible();
    //Verify deleted successfully
    const nodeCount = await this.elements.treeNodes().count();
    let isMatch = false;
    for (let i = 0; i < nodeCount; i++) {
      const nodeValue = await this.elements.treeNodes().nth(i).first().textContent();
      if (nodeValue.trim().toLowerCase() === flexibleData.toLowerCase()) {
        isMatch = true;
        return;
      }
    }
    expect(isMatch = false, "Unsuccessfully!");
  }
  async clickAddSubOrganizationIcon() {
    //Create new data to edit
    await this.changeToAddMode();
    await this.inputData();
    await this.clickSaveButton();

    //Click plusIcon
    await this.elements.plusIcon(flexibleData).click();
    await expect(this.elements.addOrgDialog()).toBeVisible();
  }
  async inputSubData() {
    inputIDTest = generateRandomName(5);
    await this.elements.inputUnitId().fill(inputIDTest);
    nameTest = generateRandomName(8);
    await this.elements.inputName().fill(nameTest);
  }
  async verifySubOrganizationCreated() {
    await expect(this.elements.successToast()).toBeVisible();
  }
}