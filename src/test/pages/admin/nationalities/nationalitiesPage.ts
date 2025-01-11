import { Page, Locator, expect } from "@playwright/test";
import { generateRandomNumber } from "../../../../helper/randomString";
import dotenv from "dotenv";
dotenv.config();

let flexibleValue: string = ""; 
let flexibleValue2: string = "";
export default class NationalitiesAdminPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    elements = {
        adminSection: () => this.page.locator('//span[text()="Admin"]'),
        nationalitiesItem: () => this.page.locator('//a[text()="Nationalities"]'),
        mainTitle: () => this.page.locator('div.orangehrm-header-container h6'),
        tableNation: () => this.page.locator('div.orangehrm-container'),
        iconTable: () => this.page.locator('div.oxd-table-cell-actions'),
        tableRow: () => this.page.locator("div.oxd-table-row"),
        addBtn: () => this.page.locator('//button[@type="button"]/i[@class="oxd-icon bi-plus oxd-button-icon"]'),
        addNationCard: () => this.page.locator('//div[@class="orangehrm-card-container"]/h6[text()="Add Nationality"]'),
        inputName: () => this.page.locator('div.oxd-input-group div input'),
        targetData: (targetName: string) => this.elements.bodyTable().locator(`//div[text()="${targetName}"]`),
        saveBtn: () => this.page.locator('//button[@type="submit"]'),
        successToast: () => this.page.locator('//div[@id="oxd-toaster_1"]//p[text()="Successfully Saved"]'),
        pageNumber: () => this.page.locator('//button[contains(@class, "oxd-pagination-page-item--page")]'),
        recordsPerPage: () => this.page.locator('//div[@class="oxd-table-card"]//div[contains(@style,"flex-basis")]'),
        nextBtn: () => this.page.locator('button.oxd-pagination-page-item--previous-next i.bi-chevron-right'),
        updateSuccessToast: () => this.page.locator('//div[@id="oxd-toaster_1"]//p[text()="Successfully Updated"]'),
        editTitle: () => this.page.locator('div.orangehrm-card-container h6'),
        editIcon: (name: string) => this.page.locator(`//div[text()="${name}"]//ancestor::div[@class="oxd-table-row oxd-table-row--with-border"]//following-sibling::div/button/i[@class="oxd-icon bi-pencil-fill"]`),
        deleteIcon: (name: string) => this.page.locator(`//div[text()="${name}"]//ancestor::div[@class="oxd-table-row oxd-table-row--with-border"]//following-sibling::div/button/i[@class="oxd-icon bi-trash"]`),
        bodyTable: () => this.page.locator('div.oxd-table-body'),
        deleteConfirmationPopup: () => this.page.locator('div.orangehrm-dialog-popup'),
        yesBtn: () => this.page.locator('//button[text()=" Yes, Delete "]'),
        deleteToast: () => this.page.locator('//div[@class="oxd-toast-content oxd-toast-content--success"]/p[text()="Successfully Deleted"]'),
        //deleteIcon: () => this.page.locator('button i.bi-trash'),
        deleteDataCheckbox:(name:string) => this.elements.bodyTable().locator(`//div[text()="${name}"]/parent::div/preceding-sibling::div/div[@class="oxd-table-card-cell-checkbox"]`),
        deleteIconLoad: () => "button i.bi-trash",
        deleteSelectedBtn: () => this.page.locator('//button/i[@class="oxd-icon bi-trash-fill oxd-button-icon"]')
    }
    async accessNationalities() {
        await this.page.goto(`${process.env.WEB_URL}`);
        await this.elements.adminSection().click();
        await this.elements.nationalitiesItem().click();
        await this.elements.iconTable().nth(0).waitFor();
    }
    async checkNationalitiesUI() {
        await expect(this.elements.mainTitle()).toBeVisible();
        await expect(this.elements.tableNation()).toBeVisible();
    }
    async clickAddButton() {
        await this.elements.addBtn().click();
        await this.elements.saveBtn().waitFor();
        await expect(this.elements.addNationCard()).toBeVisible();
    }
    async inputNationalityData(name: string) {
        flexibleValue = name + generateRandomNumber(3);
        await this.elements.inputName().fill(flexibleValue);
    }
    async clickSaveButton() {
        await this.elements.saveBtn().click();
        await expect(this.elements.successToast()).toBeVisible();
        await this.elements.tableRow().nth(0).waitFor();
    }
    async checkAndClick(value: string, locatorNeedsClick: Locator){
        await this.elements.tableRow().nth(0).waitFor();
        const isDataDisplayed = await this.elements.targetData(value).isVisible();
        if (isDataDisplayed) {
            await locatorNeedsClick.click();
        }
        return isDataDisplayed;
    }
    async verifyAfterExecute(isDataHidden = true, nameCheck: string){
        let isPerformed = true;
        let isNotLastPage = true;
        if(isDataHidden){
            do {
                await this.elements.tableRow().nth(0).waitFor();
                const isDataDisplayed = await this.elements.targetData(nameCheck).isVisible();
                    if (isDataDisplayed) {
                        isPerformed = false;
                        return;
                    }
                    isNotLastPage = await this.elements.nextBtn().isVisible();
                    if(isNotLastPage){
                        await this.elements.nextBtn().click();
                    }
                } while (isNotLastPage);
            expect(isPerformed, "Error Execution");
            
        }
            do {
                await this.elements.tableRow().nth(0).waitFor();
                const isDataDisplayed = await this.elements.targetData(nameCheck).isVisible();
                    if (isDataDisplayed) {
                        isPerformed = true;
                        return;
                    }
                    isNotLastPage = await this.elements.nextBtn().isVisible();
                    if(isNotLastPage){
                        await this.elements.nextBtn().click();
                    }
            } while (isNotLastPage);
            expect(isPerformed, "Error Execution");
    }
    async verifyNewNationalityCreated() {
        await this.elements.pageNumber().nth(0).waitFor();
        await this.verifyAfterExecute(false,flexibleValue);
    }
    async clickUpdateIcon(name: string) {
        //Create data
        await this.clickAddButton();
        await this.inputNationalityData(name);
        await this.clickSaveButton();
        //Click updateIcon
        let isNotLastPage = true;
        do {
            await this.checkAndClick(flexibleValue, this.elements.editIcon(flexibleValue))
            isNotLastPage = await this.elements.nextBtn().isVisible();
            if(isNotLastPage){
                await this.elements.nextBtn().click();
            }
        } while (isNotLastPage);
    }
    async updateNationalityData() {
        flexibleValue2 = flexibleValue + generateRandomNumber(3);
        await expect(this.elements.inputName()).not.toHaveValue("");
        await this.elements.inputName().fill(flexibleValue2);
    }
    async clickSaveForUpdate() {
        await this.elements.saveBtn().click();
        await expect(this.elements.updateSuccessToast()).toBeVisible();
        await this.elements.tableRow().nth(0).waitFor();
    }
    async verifyNationalityUpdated() {
        await this.verifyAfterExecute(false, flexibleValue2);
        await this.elements.nationalitiesItem().click();
        await this.verifyAfterExecute(true, flexibleValue);
    }
    async clickDeleteIcon(nameToDelete: string) {
        // Create data to delete
        await this.clickAddButton();
        await this.inputNationalityData(nameToDelete);
        await this.clickSaveButton();
        // Click DeleteIcon
        let isNotLastPage = true;
        do {
          await this.elements.tableRow().nth(0).waitFor();
          const shouldStopLoop = await this.checkAndClick(flexibleValue,this.elements.deleteIcon(flexibleValue));
          if (shouldStopLoop) break;
          isNotLastPage = await this.elements.nextBtn().isVisible();
          if (isNotLastPage) {
            await this.elements.nextBtn().click();
          }
        } while (isNotLastPage);
    }
    async confirmDeleteNationality() {
        await expect(this.elements.deleteConfirmationPopup()).toBeVisible();
        await this.elements.yesBtn().click();
        await expect(this.elements.deleteToast()).toBeVisible();
        await this.elements.tableRow().nth(0).waitFor();
    }
    async verifyNationalityDeleted() {
        await this.verifyAfterExecute(true,flexibleValue);
    }
    async selectMultipleNationalities(nameToDelete1: string, nameToDelete2: string){
        //Add data to test
        //First data
        await this.clickAddButton();
        flexibleValue = nameToDelete1+generateRandomNumber(3);
        await this.elements.inputName().fill(flexibleValue);
        await this.clickSaveButton();
        await this.elements.tableRow().nth(0).waitFor();
        //Second data
        await this.clickAddButton();
        flexibleValue2 = nameToDelete2+generateRandomNumber(3);
        await this.elements.inputName().fill(flexibleValue2);
        await this.clickSaveButton();
        await this.elements.tableRow().nth(0).waitFor();
        //Check on checkboxes
        let isNotLastPage = true;
        do {
            const isChecked1 = await this.checkAndClick(flexibleValue, this.elements.deleteDataCheckbox(flexibleValue));
            const isChecked2 = await this.checkAndClick(flexibleValue2, this.elements.deleteDataCheckbox(flexibleValue2));
            if(isChecked1&&isChecked2) break;
            isNotLastPage = await this.elements.nextBtn().isVisible();
            if(isNotLastPage){
                await this.elements.nextBtn().click();
            }
        } while (isNotLastPage);
    }
    async clickDeleteButton(){
        await this.elements.deleteSelectedBtn().click();
        await expect(this.elements.deleteConfirmationPopup()).toBeVisible();
    }
    async verifyMultiNationalityDeleted(){
        await this.verifyAfterExecute(true, flexibleValue);
        await this.verifyAfterExecute(true, flexibleValue2);
    }
}



















