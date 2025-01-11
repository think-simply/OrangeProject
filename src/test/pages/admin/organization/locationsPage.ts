import { Page, Locator, expect } from "@playwright/test";
import { generateRandomNumber } from "../../../../helper/randomString";
import dotenv from "dotenv";
dotenv.config();
import { generateRandomName } from "../../../../helper/randomString";

let flexibleData: string = "";
let flexibleData2: string = "";
let updatedData: string = "";

export default class LocationsAdminPage {
  readonly page: Page;
  constructor(page: Page) {
        this.page = page;
  }
  elements = {
    expectedCity: () => "new",
    uniqueName: () => generateRandomName(5),
    expectedName: () => "NameToSearch",
    expectedCountry: () => "Viet Nam",
    tableLocations: () => this.page.locator('div.orangehrm-container'),
    actionIcon: () => this.page.locator('div.oxd-table-cell-actions'),
    containsName: () => this.page.locator('//div[@class="oxd-table-card"]//div[2]'),
    containsCity: () => this.page.locator('//div[@class="oxd-table-card"]//div[3]'),
    containsCountry: () => this.page.locator('//div[@class="oxd-table-card"]//div[4]'),
    adminSection: () => this.page.locator('//span[text()="Admin"]'),
    organizationItem: () => this.page.locator('//span[text()="Organization "]'),
    locationsItem: () => this.page.locator('//a[text()="Locations"]'),
    localtionsLabel: () => this.page.locator('//h5[text()="Locations"]'),
    nameInput: () => this.page.locator('//label[text()="Name"]//parent::div//following-sibling::div/input'),
    cityInput: () => this.page.locator('//label[text()="City"]//parent::div//following-sibling::div/input'),
    countryDropdown: () => this.page.locator("div.oxd-select-text"),
    VNOption: () => this.page.locator('//span[text()="Viet Nam"]'),
    searchBtn: () => this.page.locator('button[type="submit"]'),
    noResultsToast: () => this.page.locator("div.oxd-toast--info"),
    noResultsText: () => this.page.locator('//span[text()="No Records Found"]'),
    tableBodyLocations: () => this.page.locator("div.oxd-table-body"),
    nameColumnData: () => this.page.locator("div.oxd-table-card div.oxd-padding-cell:nth-child(2)"),
    cityColumnData: () => this.page.locator("div.oxd-table-card div.oxd-padding-cell:nth-child(3)"),
    contryColumnData: () => this.page.locator("div.oxd-table-card div.oxd-padding-cell:nth-child(4)"),
    addBtn: () => this.page.locator("div.orangehrm-header-container button"),
    addName: () => this.page.locator('//label[text()="Name"]//parent::div/following-sibling::div/input'),
    addCountryList: () => this.page.locator("div.oxd-select-text-input"),
    addNotes: () => this.page.locator('//label[text()="Notes"]//parent::div/following-sibling::div/textarea'),
    saveBtn: () => this.page.locator('button[type="submit"]'),
    successToast: () => this.page.locator("div.oxd-toast--success"),
    editIcon: () => this.page.locator(`//div[text()="${flexibleData}"]//ancestor::div[@class="oxd-table-card"]//i[@class="oxd-icon bi-pencil-fill"]`),
    editLocationTitle: () => this.page.locator('//h6[text()="Edit Location"]'),
    deleteIcon: () => this.page.locator(`//div[text()="${flexibleData}"]//ancestor::div[@class="oxd-table-card"]//i[@class="oxd-icon bi-trash"]`),
    deletePopup: () => this.page.locator("div.orangehrm-dialog-popup"),
    yesDeleteBtn: () => this.page.locator('//button[text()=" Yes, Delete "]'),
    deleteSuccessMessage: () => this.page.locator('//div[@class="oxd-toast-content oxd-toast-content--success"]/p[text()="Successfully Deleted"]'),
    singleCheckbox: () => this.page.locator(`//div[text()="${this.elements.expectedCountry()}"]//ancestor::div[@role="row"]//div[@class="oxd-table-card-cell-checkbox"]`),
    deleteBtn: () => this.page.locator('//button[text()=" Delete Selected "]')
  }

  async accessLocations() {
    await this.page.goto(`${process.env.WEB_URL}`);
    await this.elements.adminSection().click();
    await this.elements.organizationItem().click();
    await this.elements.locationsItem().click();
  }
  async checkUILocations() {
    await expect(this.elements.localtionsLabel(),"Locations is not displaying!").toBeVisible();
  }
  async addClick() {
    await this.elements.addBtn().click();
  }
  async addValidData(name: string){
    flexibleData = name + generateRandomNumber(3)
    flexibleData2 = this.elements.expectedCity() + generateRandomNumber(3);
    await this.elements.addName().fill(flexibleData);
    await this.elements.cityInput().fill(flexibleData2);
    await this.elements.addCountryList().click();
    await this.elements.VNOption().click();
    await this.elements.addNotes().fill("This is checking by Huyen");
  }
  async saveBtnClick() {
    await this.elements.saveBtn().click();
  }
  async addSuccessfully() {
    await expect(this.elements.successToast()).toBeVisible();
  }
  async verifyAfterSearch(hasNoRecordText = true,columnData: Locator, dataChecking: string, isOldDataDisplayed = true){
    let isValidValue = true;

    if (hasNoRecordText) {
      await expect(this.elements.noResultsToast()).toBeVisible();
      await expect(this.elements.noResultsText()).toBeVisible();
      return;
    }
    //await this.elements.actionIcon().nth(0).waitFor();
    await this.page.waitForTimeout(5000);
    const rowCount = await columnData.count();
    const lowercasedDataChecking = dataChecking.toLowerCase();
    for (let i = 0; i < rowCount; i++) {
      const valuesInColumn = (await columnData.nth(i).first().textContent())?.trim().toLowerCase();
      if ((isOldDataDisplayed && valuesInColumn === lowercasedDataChecking) ||  //2 cases OR
       (!isOldDataDisplayed && !valuesInColumn.includes(lowercasedDataChecking)))
      { 
        isValidValue = false;
        break; 
      }
    }
    expect(isValidValue, "Error Value");
  }
  async fillName() {
    //Create data to check
    await this.addClick();
    await this.addValidData(this.elements.expectedName());
    await this.saveBtnClick();
    //Fill name to search
    await this.elements.tableLocations().nth(0).waitFor();
    await this.elements.nameInput().fill(flexibleData);
  }
  async checkName() {
    await this.verifyAfterSearch(false,this.elements.nameColumnData(), flexibleData, false);
  }
  async fillCity() {
    //Create data to check
    await this.addClick();
    await this.addValidData(this.elements.expectedName());
    await this.saveBtnClick();
    //Fill City to search
    await this.elements.actionIcon().nth(0).waitFor();
    await this.elements.cityInput().fill(flexibleData2);
  }
  async checkCity() {
    await this.verifyAfterSearch(false,this.elements.cityColumnData(), flexibleData2, false);
  }
  async selectCountry() {
    //Create data to check
    await this.addClick();
    await this.addValidData(this.elements.expectedName());
    await this.saveBtnClick();
    //Select City to search
    await this.elements.tableLocations().waitFor();
    await this.elements.countryDropdown().click();
    await this.elements.VNOption().click();
  }
  async checkCountry() {
    await this.verifyAfterSearch(false,this.elements.contryColumnData(), this.elements.expectedCountry(), false);
  }
  async searchClick() {
    await this.elements.searchBtn().click();
    await this.page.waitForTimeout(2000);
  }
  async searchAndClickEdit() {
    //Create data to update
    await this.addClick();
    await this.addValidData("NameToUpdate");
    await this.saveBtnClick();

    //Search
    await this.elements.tableLocations().nth(0).waitFor();
    await this.elements.nameInput().fill(flexibleData);
    await this.searchClick();

    //Click EditIcon
    await this.elements.actionIcon().nth(0).waitFor();
    await this.elements.editIcon().click();
    await expect(this.elements.editLocationTitle()).toBeVisible();
  }
  async updateData(updateText: string) {
    await expect(this.elements.addName()).not.toHaveValue("");
    const currentValue = await this.elements.addName().inputValue();
    updatedData = `${currentValue}${updateText}`;
    await this.elements.addName().fill(updatedData);
  }
  async checkUpdateSuccessfully() {
    //Updated data will be displayed
    await this.elements.actionIcon().nth(0).waitFor();
    await this.elements.nameInput().fill(updatedData);
    await this.searchClick();
    await this.verifyAfterSearch(false,this.elements.nameColumnData(), updatedData, false);
    //Old data will be hidden
    await this.elements.actionIcon().nth(0).waitFor();
    await this.elements.nameInput().fill(flexibleData);
    await this.searchClick();
    await this.verifyAfterSearch(false,this.elements.nameColumnData(), flexibleData, true);
  }
  async searchAndClickDelete() {
    //Create data to Delete
    await this.addClick();
    await this.addValidData("NameToDelete");
    await this.saveBtnClick();

    //Search
    await this.elements.tableLocations().nth(0).waitFor();
    await this.elements.nameInput().fill(flexibleData);
    await this.searchClick();

    //Click DeleteIcon
    await this.elements.actionIcon().nth(0).waitFor();
    await this.elements.deleteIcon().click();
  }
  async confirmYesToDelete() {
    await expect(this.elements.deletePopup()).toBeVisible();
    await this.elements.yesDeleteBtn().click();
  }
  async checkDeleteSuccess() {
    await this.elements.deleteSuccessMessage().isVisible();
    await expect(this.elements.deleteSuccessMessage()).toBeVisible();
    await this.elements.tableLocations().nth(0).waitFor();
    await this.verifyAfterSearch(true,this.elements.nameColumnData(), flexibleData, false);
  }
  async creatDataToMultiDelete() {
    //Create Data[[1]
    await this.addClick();
    await this.addValidData("NameToDelete1");
    await this.saveBtnClick();
    await this.elements.tableLocations().nth(0).waitFor();

    //Create Data[[1]
    await this.addClick();
    await this.addValidData("NameToDelete2");
    await this.saveBtnClick();
    await this.elements.tableLocations().nth(0).waitFor();
  }
  async selectMultiLocations() {
    await this.elements.actionIcon().nth(0).waitFor();
    const checkboxesCount = await this.elements.singleCheckbox().count();
    for (let i = 0; i < checkboxesCount; i++) {
        await this.elements.singleCheckbox().nth(i).click();
    }
  }
  async clickDelete(){
    await this.elements.deleteBtn().click();
  }
  async deleteMultiLocations() {
    await this.elements.tableLocations().nth(0).waitFor();
    await this.elements.countryDropdown().click();
    await this.elements.VNOption().click();
    await this.searchClick();
    await expect(this.elements.noResultsToast()).toBeVisible();
  }
}
