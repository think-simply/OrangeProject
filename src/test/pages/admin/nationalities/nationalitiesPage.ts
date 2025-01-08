import { Page, Locator, expect } from "@playwright/test";
import exp from "constants";
import dotenv from "dotenv";
dotenv.config();

let flexibleValue: string = ""; 
let flexibleValue2: string = "";
export default class NationalitiesAdminPage {
    readonly page: Page;
    readonly adminSection: Locator;
    readonly nationalitiesItem: Locator;
    readonly mainTitle:Locator;
    readonly tableNation:Locator;
    readonly addBtn: Locator;
    readonly addNationCard: Locator;
    readonly inputName: Locator;
    readonly saveBtn: Locator;
    readonly successToast: Locator;
    readonly pageNumber: Locator;
    readonly recordsPerPage: Locator;
    readonly nextBtn: Locator;
    readonly randomNum: string;
    readonly updateIcon: Locator;
    readonly updateSuccessToast: Locator;
    readonly editTitle: Locator;
    readonly bodyTable: Locator;
    readonly deleteConfirmationPopup: Locator;
    readonly yesBtn: Locator;
    readonly deleteToast: Locator;
    readonly deleteIcon: Locator; //for Wait
    readonly deleteIconLoad: string;
    readonly deleteSelectedBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.randomNum = this.generateRandomNumber(3);
        this.adminSection = page.locator('//span[text()="Admin"]');
        this.nationalitiesItem = page.locator('//a[text()="Nationalities"]');
        this.mainTitle = page.locator('div.orangehrm-header-container h6');
        this.tableNation = page.locator('div.orangehrm-container');
        this.addBtn = page.locator('//button[@type="button"]/i[@class="oxd-icon bi-plus oxd-button-icon"]');
        this.addNationCard = page.locator('//div[@class="orangehrm-card-container"]/h6[text()="Add Nationality"]');
        this.inputName = page.locator('div.oxd-input-group div input');
        this.saveBtn = page.locator('//button[@type="submit"]');
        this.successToast = page.locator('//div[@id="oxd-toaster_1"]//p[text()="Successfully Saved"]');
        this.pageNumber= page.locator('//button[contains(@class, "oxd-pagination-page-item--page")]');
        this.recordsPerPage = page.locator('//div[@class="oxd-table-card"]//div[contains(@style,"flex-basis")]');
        this.nextBtn = page.locator('button.oxd-pagination-page-item--previous-next i.bi-chevron-right');
        this.updateSuccessToast = page.locator('//div[@id="oxd-toaster_1"]//p[text()="Successfully Updated"]')
        this.editTitle = page.locator('div.orangehrm-card-container h6');
        this.bodyTable = page.locator('div.oxd-table-body');
        this.deleteConfirmationPopup = page.locator('div.orangehrm-dialog-popup');
        this.yesBtn = page.locator('//button[text()=" Yes, Delete "]');
        this.deleteToast = page.locator('//div[@class="oxd-toast-content oxd-toast-content--success"]/p[text()="Successfully Deleted"]');
        this.deleteIcon = page.locator('button i.bi-trash');
        this.deleteIconLoad = "button i.bi-trash";
        this.deleteSelectedBtn = page.locator('//button/i[@class="oxd-icon bi-trash-fill oxd-button-icon"]');


    }
    generateRandomNumber(length: number): string {
        const digits = "0123456789"; // Only contains number is 0-9
        let randomNumber = "";
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * digits.length);
          randomNumber += digits[randomIndex];
        }
        return randomNumber;
      }
    async accessNationalities(){
        await this.page.goto(`${process.env.WEB_URL}`);
        await this.adminSection.click();
        await this.nationalitiesItem.click();
    }
    async checkNationalitiesUI(){
        await expect(this.mainTitle).toBeVisible();
        await expect(this.tableNation).toBeVisible();
    }
    async clickAddButton(){
        await this.addBtn.click();
        await expect(this.addNationCard).toBeVisible();
    }
    async inputNationalityData(name: string){
        flexibleValue = name+this.randomNum;
        await this.inputName.fill(flexibleValue);
    }
    async clickSaveButton(){
        await this.saveBtn.click();
        await this.page.waitForTimeout(3000);
        await expect(this.successToast).toBeVisible();
    }
    async verifyNewNationalityCreated(){
        let isCreated = false;
        await this.pageNumber.nth(0).waitFor();
        const pageCount = await this.pageNumber.count();
        for (let i = 0; i < pageCount; i++) {
            await this.pageNumber.nth(i).click();
            await this.page.waitForTimeout(3000);

            const isCreatedDataLocator = await this.bodyTable.locator(`//div[text()="${flexibleValue}"]`).isVisible();
            if(isCreatedDataLocator) {
                isCreated = true;
            }
            const isLastPage = i === pageCount - 1;
            if (isLastPage) {
                break; // Exit loop if no longer next page
            }
        }

    }
    async clickUpdateIcon(name: string){
        this.clickAddButton();
        this.inputNationalityData(name);
        this.clickSaveButton();
        //The second way
        //  we have 2 way to wait to count page number.
        // 1 is use expect poll fn to wait until count greater than 1
        // await expect.poll(async () => this.pageNumber.count(), {
        //     timeout: 5000
        // }).toBeGreaterThan(1);
        // 2 is use waitFor fn to wait until the first page number to be visible on dom
        await this.pageNumber.nth(0).waitFor();
        const pageCount = await this.pageNumber.count();
        for (let i = 0; i < pageCount; i++) {
            await this.pageNumber.nth(i).click();
            await this.page.waitForTimeout(3000); // Wait for page to load

            const isCreatedDataLocator = await this.bodyTable.locator(`//div[text()="${flexibleValue}"]`).isVisible();
            if(isCreatedDataLocator) {
                const flexibleUpdatedIcon = this.page.locator('//div[text()="'+flexibleValue+'"]//ancestor::div[@class="oxd-table-row oxd-table-row--with-border"]//following-sibling::div/button/i[@class="oxd-icon bi-pencil-fill"]');
                await flexibleUpdatedIcon.click();
                await this.page.waitForTimeout(3000);
                await expect(this.editTitle).toBeVisible();
                return; //Found but still go to page 5???
            }
            const isLastPage = i === pageCount - 1;
            if (isLastPage) {
                break; // Exit loop if no longer next page
            }
        }
    }
    async updateNationalityData(){
        flexibleValue2 = flexibleValue+this.randomNum
        //await this.page.waitForTimeout(3000);
        await this.inputName.fill(flexibleValue2);
    }
    async clickSaveForUpdate(){
        await this.saveBtn.click();
        await expect(this.updateSuccessToast).toBeVisible();
        await this.pageNumber.nth(0).waitFor();
    }
    async verifyNationalityUpdated(){
        const pageCount = await this.pageNumber.count();
        let isUpdatedNewvalue = false;
        let isOldValueHidden = false;
        for (let i = 0; i < pageCount; i++) {
            await this.pageNumber.nth(i).click();
            await this.page.waitForTimeout(3000);

            const hasUpdatedData = await this.bodyTable.locator(`//div[text()="${flexibleValue2}"]`).isVisible();
            if(hasUpdatedData){
                isUpdatedNewvalue = true;
            }
            const isOldDataHidden = await this.bodyTable.locator(`//div[text()="${flexibleValue}"]`).isHidden();
            if(isOldDataHidden){
                isOldValueHidden = true;
            }            
            const isLastPage = i === pageCount - 1;
            if (isLastPage) {
                break; // Exit loop if no longer next page
            }
        }
    }
    async clickDeleteIcon(nameToDelete: string){
        //Create Name to delete
        this.clickAddButton();
        this.inputNationalityData(nameToDelete);
        this.clickSaveButton();
        await this.pageNumber.nth(0).waitFor();

        //Find Name then click Delete icon
        const pageCount = await this.pageNumber.count();
        for (let i = 0; i < pageCount; i++) {
            await this.pageNumber.nth(i).click();
            await this.page.waitForTimeout(3000); //Wait for loading data in new page

            const isCreatedDataLocator = await this.bodyTable.locator(`//div[text()="${flexibleValue}"]`).isVisible();
            if(isCreatedDataLocator) {
                const flexibleDeleteIcon = this.page.locator('//div[text()="'+flexibleValue+'"]//ancestor::div[@class="oxd-table-row oxd-table-row--with-border"]//following-sibling::div/button/i[@class="oxd-icon bi-trash"]');
                await flexibleDeleteIcon.click();
                await this.page.waitForTimeout(3000);
                await expect(this.deleteConfirmationPopup).toBeVisible();
                return; 
            }
            const isLastPage = i === pageCount - 1;
            if (isLastPage) {
                break; // Exit loop if no longer next page
            }
        }

    }
    async confirmDeleteNationality(){
        await this.yesBtn.click();
        await expect(this.deleteToast).toBeVisible();
        await this.page.waitForTimeout(3000); //wait for correct page count
    }
    async verifyNationalityDeleted(){
        await this.pageNumber.nth(0).waitFor();
        const pageCount = await this.pageNumber.count();
        let isDeleted = true;
        for (let i = 0; i < pageCount; i++) {
            await this.pageNumber.nth(i).click();
            await this.pageNumber.nth(0).waitFor();

            const isDeletedDataLocator = await this.bodyTable.locator(`//div[text()="${flexibleValue}"]`).isVisible();
            if(isDeletedDataLocator) {
                isDeleted = false;
            }
            const isLastPage = i === pageCount - 1;
            if (isLastPage) {
                break; // Exit loop if no longer next page
            }
        }
    }
    async selectMultipleNationalities(nameToDelete1: string, nameToDelete2: string){
        //Add data to test
        this.clickAddButton();
        flexibleValue = nameToDelete1+this.randomNum;
        await this.inputName.fill(flexibleValue);
        this.clickSaveButton();
        await this.pageNumber.nth(0).waitFor();

        this.clickAddButton();
        flexibleValue2 = nameToDelete2+this.randomNum;
        await this.inputName.fill(flexibleValue2);
        this.clickSaveButton();
        await this.pageNumber.nth(0).waitFor();
        
        //Start searching
        const pageCount = await this.pageNumber.count();

        let foundValue1 = false;
        let foundValue2 = false;
        
        for (let i = 0; i < pageCount; i++) {
          await this.pageNumber.nth(i).click();
          await this.page.waitForTimeout(3000); // Wait for page to load
          await this.pageNumber.nth(0).waitFor();

          // Check for first value
          const isDeleteData1Displayed = await this.bodyTable
            .locator(`//div[text()="${flexibleValue}"]`)
            .isVisible();
          const deleteDataCheckbox1 = this.bodyTable.locator(
            `//div[text()="${flexibleValue}"]/parent::div/preceding-sibling::div/div[@class="oxd-table-card-cell-checkbox"]`
          );
          if (isDeleteData1Displayed && !foundValue1) {
            await deleteDataCheckbox1.click();
            foundValue1 = true;
          }

          // Check for second value
          const isDeleteData2Displayed = await this.bodyTable
            .locator(`//div[text()="${flexibleValue2}"]`)
            .isVisible();
          const deleteDataCheckbox2 = this.bodyTable.locator(
            `//div[text()="${flexibleValue2}"]/parent::div/preceding-sibling::div/div[@class="oxd-table-card-cell-checkbox"]`
          );
          if (isDeleteData2Displayed && !foundValue2) {
            await deleteDataCheckbox2.click();
            foundValue2 = true;
          }

          // If both values are found, stop the loop
          if (foundValue1 && foundValue2) {
            break;
          }

          // If it's the last page and not all values are found
          const isLastPage = i === pageCount - 1;
          if (isLastPage && (!foundValue1 || !foundValue2)) {
            break; // Exit loop if no longer next page
          }
        }
    }
    async clickDeleteButton(){
        await this.deleteSelectedBtn.click();
        await expect(this.deleteConfirmationPopup).toBeVisible();
    }
    async verifyMultiNationalityDeleted(){
        const pageCount = await this.pageNumber.count();

        let isData1Deleted = true;
        let isData2Deleted = true;

        for (let i = 0; i < pageCount; i++) {
            await this.pageNumber.nth(i).click();
            await this.page.waitForTimeout(3000); // Wait for page to load

            const isDisplayedData1Locator = await this.bodyTable
                .locator(`//div[text()="${flexibleValue}"]`)
                .isVisible();
            if(isDisplayedData1Locator) {
                isData1Deleted = false;
            }
            const isDisplayedData2Locator = await this.bodyTable
                .locator(`//div[text()="${flexibleValue2}"]`)
                .isVisible();
            if(isDisplayedData2Locator) {
                isData2Deleted = false;
            }
            const isLastPage = i === pageCount - 1;
            if (isLastPage) {
                break; // Exit loop if no longer next page
            }
        }
    }
}



















