import { Page, Locator, expect } from "@playwright/test";
import { generateRandomNumber } from "../../../../helper/randomString";
import dotenv from 'dotenv';
dotenv.config();

let flexibleValue: string = ""; 
let flexibleValue2: string = ""; 

export default class MembershipsAdminPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    elements = {
        adminSection: () => this.page.locator('//span[text()="Admin"]'),
        qualificationsMenu: () => this.page.locator('//span[text()="Qualifications "]'),
        membershipItem: () => this.page.locator('//a[text()="Memberships"]'),
        mainTitle: () => this.page.locator('//h6[text()="Memberships"]'),
        membershipTable: () => this.page.locator('div.oxd-table'),
        addBtn: () => this.page.locator('//button/i[@class="oxd-icon bi-plus oxd-button-icon"]'),
        addTable: () => this.page.locator('orangehrm-card-container'),
        addTitle: () => this.page.locator('//h6[text()="Add Membership"]'),
        inputName: () => this.page.locator('div.oxd-input-group div input.oxd-input--active'),
        saveBtn: () => this.page.locator('//button[@type="submit"]'),
        saveToastSuccess: () => this.page.locator('//p[text()="Successfully Saved"]'),
        iconTable: () => this.page.locator('div.oxd-table-cell-actions'),
        allNameTable: () => this.page.locator('//div[@class="oxd-table-row oxd-table-row--with-border"]/div[2]'),
        updateTitle: () => this.page.locator('//h6[text()="Edit Membership"]'),
        updatedToastSuccess: () => this.page.locator('//div[@class="oxd-toast-content oxd-toast-content--success"]/p[text()="Successfully Updated"]'),
        editIcon: () => this.page.locator(`//div[text()="${flexibleValue}"]//ancestor::div[@role="row"]//button/i[@class="oxd-icon bi-pencil-fill"]`),
        deleteIcon: () => this.page.locator(`//div[text()="${flexibleValue}"]//ancestor::div[@role="row"]//button/i[@class="oxd-icon bi-trash"]`),
        confirmDeletePopup: () => this.page.locator('div.orangehrm-dialog-popup'),
        yesBtn: () => this.page.locator('//button[text()=" Yes, Delete "]'),
        deleteToastSuccess: () => this.page.locator('//p[text()="Successfully Deleted"]'),
        checkboxForData1: () => this.page.locator(`//div[text()="${flexibleValue}"]//ancestor::div[@class="oxd-table-row oxd-table-row--with-border"]//div[@class="oxd-checkbox-wrapper"]`),
        checkboxForData2: () => this.page.locator(`//div[text()="${flexibleValue2}"]//ancestor::div[@class="oxd-table-row oxd-table-row--with-border"]//div[@class="oxd-checkbox-wrapper"]`),
        deleteBtn: () => this.page.locator('button i.bi-trash-fill'),
        membershipData: () => this.elements.allNameTable().locator(`//div[text()="${flexibleValue}"]`),
        membershipData2: () => this.elements.allNameTable().locator(`//div[text()="${flexibleValue2}"]`),
        pageNumber: () => this.page.locator('//button[contains(@class, "oxd-pagination-page-item--page")]')
    }
    async accessMemberships(){
        await this.page.goto(`${process.env.WEB_URL}`);
        await this.elements.adminSection().click();
        await this.elements.qualificationsMenu().click();
        await this.elements.membershipItem().click();
    }
    async checkMembershipsUI(){
        await expect(this.elements.mainTitle()).toBeVisible();
        await expect(this.elements.membershipTable()).toBeVisible();
    }
    async clickAddButton(){
        await this.elements.addBtn().click();
        await expect(this.elements.addTitle()).toBeVisible();
        await this.elements.addTable().isVisible();
    }
    async inputMembershipData(name: string){
        flexibleValue = name + generateRandomNumber(3);
        await this.elements.inputName().fill(flexibleValue);
    }
    async clickSaveButton(){
        await this.elements.saveBtn().click();
    }
    async verifyNewMembershipCreated(){
        await expect(this.elements.saveToastSuccess()).toBeVisible();
        await this.elements.iconTable().nth(0).waitFor();
        await expect(this.elements.mainTitle()).toBeVisible();

        //Verified
        const isDisplayedpagination = await this.elements.pageNumber().nth(0).isVisible();
        if (isDisplayedpagination) {
          const pageCount = await this.elements.pageNumber().count();
          for (let i = 0; i < pageCount; i++) {
            await this.elements.pageNumber().nth(i).click();
            await this.page.waitForTimeout(3000);

            const isCreatedSuccess = await this.elements.membershipData().isVisible();
            if (isCreatedSuccess) {
              await expect(this.elements.membershipData()).toBeVisible();
              return;
            }

            const isLastPage = i === pageCount - 1;
            if (isLastPage) {
              break;
            }
          }
        } else {
          await expect(this.elements.membershipData()).toBeVisible();
        }
    }
    async clickUpdateIcon(name: string){
        //Create Data to Update
        await this.clickAddButton();
        await this.inputMembershipData(name);
        await this.clickSaveButton();
        await this.elements.iconTable().nth(0).waitFor();

        //Find and click Edit icon on created data
        await this.elements.editIcon().click();
        await this.elements.updateTitle().waitFor();
        await expect(this.elements.updateTitle()).toBeVisible();
    }
    async updateMembershipData(){
            //waifor all APIs loaded
            await this.page.waitForResponse(response => 
                response.status() === 200
            );
            //Update data
            flexibleValue2 = "UpdatedName"+generateRandomNumber(3);
            await this.elements.inputName().fill(flexibleValue2);
    }
    async verifyMembershipUpdated(){
        await expect(this.elements.updatedToastSuccess()).toBeVisible();
        await this.elements.iconTable().nth(0).waitFor();
        await expect(this.elements.mainTitle()).toBeVisible();
        //Verified
        const isDisplayedpagination = await this.elements.pageNumber().nth(0).isVisible();
        if (isDisplayedpagination) {
          const pageCount = await this.elements.pageNumber().count();
          for (let i = 0; i < pageCount; i++) {
            await this.elements.pageNumber().nth(i).click();
            await this.page.waitForTimeout(3000);

            const isUpdatedSuccess = await this.elements
              .membershipData2()
              .isVisible();
            if (isUpdatedSuccess) {
              await expect(this.elements.membershipData()).toBeHidden();
              await expect(this.elements.membershipData2()).toBeVisible();
              return;
            }

            const isLastPage = i === pageCount - 1;
            if (isLastPage) {
              break;
            }
          }
        } else {
          await expect(this.elements.membershipData2()).toBeVisible();
          await expect(this.elements.membershipData()).toBeHidden();
        }
    }
    async clickDeleteIcon(name: string){
        //Create Data to Delete
        await this.clickAddButton();
        await this.inputMembershipData(name);
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
    async verifyMembershipDeleted(){
        //Verified
        const isDisplayedpagination = await this.elements.pageNumber().nth(0).isVisible();
        if (isDisplayedpagination) {
          const pageCount = await this.elements.pageNumber().count();
          for (let i = 0; i < pageCount; i++) {
            await this.elements.pageNumber().nth(i).click();
            await this.page.waitForTimeout(3000);

            const isDeletedSuccess = await this.elements.membershipData().isVisible();
            if (isDeletedSuccess) {
                await expect(this.elements.membershipData()).toBeHidden();
              return;
            }

            const isLastPage = i === pageCount - 1;
            if (isLastPage) {
              break;
            }
          }
        } else {
            await expect(this.elements.membershipData()).toBeHidden();
        }
    }
    async selectMultipleMemberships(name1: string, name2: string){
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
    async verifyMultipleMembershipsDeleted(){
        //Verified 
        const isDisplayedpagination = await this.elements.pageNumber().nth(0).isVisible();
        if (isDisplayedpagination) {
          const pageCount = await this.elements.pageNumber().count();
          for (let i = 0; i < pageCount; i++) {
            await this.elements.pageNumber().nth(i).click();
            await this.page.waitForTimeout(3000);

            const isDeletedSuccess = await this.elements.membershipData().isVisible();
            if (isDeletedSuccess) {
                await expect(this.elements.membershipData()).toBeHidden();
                await expect(this.elements.membershipData2()).toBeHidden(); 
                return;
            }

            const isLastPage = i === pageCount - 1;
            if (isLastPage) {
              break;
            }
          }
        } else {
            await expect(this.elements.membershipData()).toBeHidden();
            await expect(this.elements.membershipData2()).toBeHidden(); 
        }    
    }
}