import { Page, expect } from "@playwright/test";
import { generateRandomNumber } from "#helper/randomString";
import dotenv from 'dotenv';
import { BasePage } from "#test/pages/BasePage";
dotenv.config();

let flexibleValue: string = ""; 
let flexibleValue2: string = ""; 

export default class LanguagesPage extends BasePage {
  constructor(page: Page) {
    super(page); // Pass the page instance to the BasePage constructor
  }
    elements = {
        adminSection: () => this.getPage().locator('//span[text()="Admin"]'),
        qualificationsMenu: () => this.getPage().locator('//span[text()="Qualifications "]'),
        languageItem: () => this.getPage().locator('//a[text()="Languages"]'),
        mainTitle: () => this.getPage().locator('//h6[text()="Languages"]'),
        languageTable: () => this.getPage().locator('div.oxd-table'),
        addBtn: () => this.getPage().locator('//button/i[@class="oxd-icon bi-plus oxd-button-icon"]'),
        addTable: () => this.getPage().locator('orangehrm-card-container'),
        addTitle: () => this.getPage().locator('//h6[text()="Add Language"]'),
        inputName: () => this.getPage().locator('div.oxd-input-group div input.oxd-input--active'),
        saveBtn: () => this.getPage().locator('//button[@type="submit"]'),
        saveToastSuccess: () => this.getPage().locator('//p[text()="Successfully Saved"]'),
        iconTable: () => this.getPage().locator('div.oxd-table-cell-actions'),
        allNameTable: () => this.getPage().locator('//div[@class="oxd-table-row oxd-table-row--with-border"]/div[2]'),
        updateTitle: () => this.getPage().locator('//h6[text()="Edit Language"]'),
        updatedToastSuccess: () => this.getPage().locator('//div[@class="oxd-toast-content oxd-toast-content--success"]/p[text()="Successfully Updated"]'),
        editIcon: () => this.getPage().locator(`//div[text()="${flexibleValue}"]//ancestor::div[@role="row"]//button/i[@class="oxd-icon bi-pencil-fill"]`),
        deleteIcon: () => this.getPage().locator(`//div[text()="${flexibleValue}"]//ancestor::div[@role="row"]//button/i[@class="oxd-icon bi-trash"]`),
        confirmDeletePopup: () => this.getPage().locator('div.orangehrm-dialog-popup'),
        yesBtn: () => this.getPage().locator('//button[text()=" Yes, Delete "]'),
        deleteToastSuccess: () => this.getPage().locator('//p[text()="Successfully Deleted"]'),
        checkboxForData1: () => this.getPage().locator(`//div[text()="${flexibleValue}"]//ancestor::div[@class="oxd-table-row oxd-table-row--with-border"]//div[@class="oxd-checkbox-wrapper"]`),
        checkboxForData2: () => this.getPage().locator(`//div[text()="${flexibleValue2}"]//ancestor::div[@class="oxd-table-row oxd-table-row--with-border"]//div[@class="oxd-checkbox-wrapper"]`),
        deleteBtn: () => this.getPage().locator('button i.bi-trash-fill'),
        languageData: () => this.elements.allNameTable().locator(`//div[text()="${flexibleValue}"]`),
        languageData2: () => this.elements.allNameTable().locator(`//div[text()="${flexibleValue2}"]`),
        pageNumber: () => this.getPage().locator('//button[contains(@class, "oxd-pagination-page-item--page")]')
        //text: () => this.getPage().locator(''), 
    }
    async accessLanguages(){
        await this.getPage().goto(`${process.env.WEB_URL}`);
        await this.elements.adminSection().click();
        await this.elements.qualificationsMenu().click();
        await this.elements.languageItem().click();
    }
    async checkLanguagesUI(){
        await expect(this.elements.mainTitle()).toBeVisible();
        await expect(this.elements.languageTable()).toBeVisible();
    }
    async clickAddButton(){
        await this.elements.addBtn().click();
        await expect(this.elements.addTitle()).toBeVisible();
        await this.elements.addTable().isVisible();
    }
    async inputLanguageData(name: string){
        flexibleValue = name + generateRandomNumber(3);
        await this.elements.inputName().fill(flexibleValue);
    }
    async clickSaveButton(){
        await this.elements.saveBtn().click();
    }
    async verifyNewLanguageCreated(){
        await expect(this.elements.saveToastSuccess()).toBeVisible();
        await this.elements.iconTable().nth(0).waitFor();
        await expect(this.elements.mainTitle()).toBeVisible();

        //Verified
        const isDisplayedpagination = await this.elements.pageNumber().nth(0).isVisible();
        if (isDisplayedpagination) {
          const pageCount = await this.elements.pageNumber().count();
          for (let i = 0; i < pageCount; i++) {
            await this.elements.pageNumber().nth(i).click();
            const isCreatedSuccess = await this.elements.languageData().isVisible();
            if (isCreatedSuccess) {
              await expect(this.elements.languageData()).toBeVisible();
              return;
            }

            const isLastPage = i === pageCount - 1;
            if (isLastPage) {
              break;
            }
          }
        } else {
          await expect(this.elements.languageData()).toBeVisible();
        }
    }
    async clickUpdateIcon(name: string){
        //Create Data to Update
        await this.clickAddButton();
        await this.inputLanguageData(name);
        await this.clickSaveButton();
        await this.elements.iconTable().nth(0).waitFor();

        //Find and click Edit icon on created data
        await this.elements.editIcon().click();
        await this.elements.updateTitle().waitFor();
        await expect(this.elements.updateTitle()).toBeVisible();
    }
    async updateLanguageData(){
        //waifor all APIs loaded
        await this.getPage().waitForResponse(response => 
            response.status() === 200
        );
        //Update data
        flexibleValue2 = "UpdatedName"+generateRandomNumber(3);
        await this.elements.inputName().fill(flexibleValue2);
    }
    async verifyLanguageUpdated(){
        await expect(this.elements.updatedToastSuccess()).toBeVisible();
        await this.elements.iconTable().nth(0).waitFor();
        await expect(this.elements.mainTitle()).toBeVisible();
        //Verified
        const isDisplayedpagination = await this.elements.pageNumber().nth(0).isVisible();
        if (isDisplayedpagination) {
          const pageCount = await this.elements.pageNumber().count();
          for (let i = 0; i < pageCount; i++) {
            await this.elements.pageNumber().nth(i).click();

            const isUpdatedSuccess = await this.elements.languageData2().isVisible();
            if (isUpdatedSuccess) {
                await expect(this.elements.languageData()).toBeHidden();
                await expect(this.elements.languageData2()).toBeVisible();
                return;
            }

            const isLastPage = i === pageCount - 1;
            if (isLastPage) {
              break;
            }
          }
        } else {
          await expect(this.elements.languageData2()).toBeVisible();
          await expect(this.elements.languageData()).toBeHidden();
        }
    }
    async clickDeleteIcon(name: string){
        //Create Data to Delete
        await this.clickAddButton();
        await this.inputLanguageData(name);
        await this.clickSaveButton();
        await this.elements.iconTable().nth(0).waitFor();

        //Find and click Delete icon
        await this.elements.deleteIcon().click();
        await this.elements.confirmDeletePopup().waitFor();
        await expect(this.elements.confirmDeletePopup()).toBeVisible();
    }
    async confirmDelete(){
        await this.elements.yesBtn().click();
        await expect(this.elements.deleteToastSuccess()).toBeVisible();
        await this.elements.iconTable().nth(0).waitFor();
        await expect(this.elements.mainTitle()).toBeVisible();
    }
    async verifyLanguageDeleted(){
        //Verified
        const isDisplayedpagination = await this.elements.pageNumber().nth(0).isVisible();
        if (isDisplayedpagination) {
          const pageCount = await this.elements.pageNumber().count();
          for (let i = 0; i < pageCount; i++) {
            await this.elements.pageNumber().nth(i).click();

            const isDeletedSuccess = await this.elements.languageData().isVisible();
            if (isDeletedSuccess) {
                await expect(this.elements.languageData()).toBeHidden();
              return;
            }

            const isLastPage = i === pageCount - 1;
            if (isLastPage) {
              break;
            }
          }
        } else {
            await expect(this.elements.languageData()).toBeHidden();
        }
    }
    async selectMultipleLanguages(name1: string, name2: string){
        //Create Data1 to Delete
        await this.clickAddButton();
        flexibleValue = name1 + generateRandomNumber(3);
        await this.elements.inputName().fill(flexibleValue);        
        await this.clickSaveButton();
        await this.elements.iconTable().nth(0).waitFor();

        //Create Data2 to Delete
        await this.clickAddButton();
        flexibleValue2 = name2 + generateRandomNumber(3);
        await this.elements.inputName().fill(flexibleValue2);        
        await this.clickSaveButton();
        await this.elements.iconTable().nth(0).waitFor();

        //select checkboxes
        await this.elements.checkboxForData1().click();
        await this.elements.checkboxForData2().click();
    }
    async clickDeleteButton(){
        await this.elements.deleteBtn().click();
        await this.elements.confirmDeletePopup().waitFor();
        await expect(this.elements.confirmDeletePopup()).toBeVisible();
    }
    async verifyMultipleLanguagesDeleted(){
        //Verified 
        const isDisplayedpagination = await this.elements.pageNumber().nth(0).isVisible();
        if (isDisplayedpagination) {
          const pageCount = await this.elements.pageNumber().count();
          for (let i = 0; i < pageCount; i++) {
            await this.elements.pageNumber().nth(i).click();

            const isDeletedSuccess = await this.elements.languageData().isVisible();
            if (isDeletedSuccess) {
                await expect(this.elements.languageData()).toBeHidden();
                await expect(this.elements.languageData2()).toBeHidden(); 
                return;
            }

            const isLastPage = i === pageCount - 1;
            if (isLastPage) {
              break;
            }
          }
        } else {
            await expect(this.elements.languageData()).toBeHidden();
            await expect(this.elements.languageData2()).toBeHidden(); 
        }    
    }
}