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
        targetData: () => this.elements.bodyTable().locator(`//div[text()="${flexibleValue}"]`),
        saveBtn: () => this.page.locator('//button[@type="submit"]'),
        successToast: () => this.page.locator('//div[@id="oxd-toaster_1"]//p[text()="Successfully Saved"]'),
        pageNumber: () => this.page.locator('//button[contains(@class, "oxd-pagination-page-item--page")]'),
        recordsPerPage: () => this.page.locator('//div[@class="oxd-table-card"]//div[contains(@style,"flex-basis")]'),
        nextBtn: () => this.page.locator('button.oxd-pagination-page-item--previous-next i.bi-chevron-right'),
        updateSuccessToast: () => this.page.locator('//div[@id="oxd-toaster_1"]//p[text()="Successfully Updated"]'),
        editTitle: () => this.page.locator('div.orangehrm-card-container h6'),
        bodyTable: () => this.page.locator('div.oxd-table-body'),
        deleteConfirmationPopup: () => this.page.locator('div.orangehrm-dialog-popup'),
        yesBtn: () => this.page.locator('//button[text()=" Yes, Delete "]'),
        deleteToast: () => this.page.locator('//div[@class="oxd-toast-content oxd-toast-content--success"]/p[text()="Successfully Deleted"]'),
        deleteIcon: () => this.page.locator('button i.bi-trash'),
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
        //flexibleValue = name + generateRandomNumber(3);
        flexibleValue = "zzzz" + generateRandomNumber(3);
        await this.elements.inputName().fill(flexibleValue);
    }
    async clickSaveButton() {
        await this.elements.saveBtn().click();
        //await this.page.waitForTimeout(3000);
        await expect(this.elements.successToast()).toBeVisible();
        await this.elements.iconTable().nth(0).waitFor();
    }
    
    async verifyAfterExecute(isDeleted = true){
        let isPerformed = true;
        let isNotLastPage = true;
        if(isDeleted){
            do {
                await this.elements.tableRow().nth(0).waitFor();
                const isDataDisplayed = await this.elements.targetData().isVisible();
                    if (isDataDisplayed) {
                        console.log("🚀 ~ NationalitiesAdminPage ~ asyncverifyAfterExecute(isDeleted ~ isDataDisplayed: hehehe", isDataDisplayed)
                        isPerformed = false;
                        return;
                    }
                    isNotLastPage = await this.elements.nextBtn().isVisible();
                    if(isNotLastPage){
                        await this.elements.nextBtn().click();
                    }
                } while (isNotLastPage);
            console.log("🚀 ~ NationalitiesAdminPage ~ asyncverifyAfterExecute(isDeleted ~ isPerformed: hehe", isPerformed)
            expect(isPerformed = false, "Error Execution");
            
        }
            do {
                await this.elements.tableRow().nth(0).waitFor();
                const isDataDisplayed = await this.elements.targetData().isVisible();
                    if (isDataDisplayed) {
                        console.log("🚀 ~ NationalitiesAdminPage ~ asyncverifyAfterExecute(isDeleted ~ isDataDisplayed hihihi:", isDataDisplayed)
                        isPerformed = true;
                        return;
                    }
                    isNotLastPage = await this.elements.nextBtn().isVisible();
                    if(isNotLastPage){
                        await this.elements.nextBtn().click();
                    }
            } while (isNotLastPage);
            expect(isPerformed, "Error Execution");
            console.log("🚀 ~ NationalitiesAdminPage ~ asyncverifyAfterExecute(isDeleted ~ isPerformed: hihi", isPerformed)
            

    }









    //     //let isPerformed = true;
    //     await this.elements.pageNumber().nth(0).waitFor();
    //     const pageCount = await this.elements.pageNumber().count();
    //     console.log("🚀 ~ NationalitiesAdminPage ~ asyncverifyAfterExecute(isDeleted ~ pageCount:", pageCount)
        
    //     if(isDeleted) {
    //         for (let i = 0; i < pageCount; i++) {
    //             await this.elements.nextBtn().click();
    //             await this.elements.pageNumber().nth(0).waitFor();
    //             const isDataDisplayed = await this.elements.targetData().isVisible();
    //             if (isDataDisplayed) {
    //                 console.log("🚀 ~ NationalitiesAdminPage ~ verifyAfterExecute ~ isDataDisplayed: hehe", isDataDisplayed)
    //                 isPerformed = false;
    //                 return; 
    //             }
    //             const isLastPage = i === pageCount - 1;
    //             if (isLastPage) {
    //                 break; // Exit loop if no longer next page
    //             }
    //         }

    //         let i = 0
    //         do {
    //             i = i + 1;
    //         } while (i < pageCount);
            
    //         expect(isPerformed, "Error Execution");
    //     }
    //     for (let i = 0; i < pageCount; i++) {
    //         await this.elements.pageNumber().nth(i).click();
    //         await this.elements.tableRow().nth(0).waitFor();
    //         const isDataDisplayed = await this.elements.targetData().isVisible();
    //         console.log("🚀 ~ NationalitiesAdminPage ~ asyncverifyAfterExecute(isDeleted ~ targetData:", this.elements.targetData())
            
    //         if (isDataDisplayed) {
    //             console.log("🚀 ~ NationalitiesAdminPage ~ verifyAfterExecute ~ isDataDisplayed: hiii")
    //             isPerformed = true;
    //             return; 
    //         }
    //         const isLastPage = i === pageCount - 1;
    //         if (isLastPage) {
    //             break; // Exit loop if no longer next page
    //         }
    //     }
    //     expect(isPerformed, "Error Execution");
    // }

    async verifyNewNationalityCreated() {
        await this.elements.pageNumber().nth(0).waitFor();
        await this.verifyAfterExecute(false);
    }
    async clickUpdateIcon(name: string) {
        this.clickAddButton();
        this.inputNationalityData(name);
        this.clickSaveButton();
        await this.elements.pageNumber().nth(0).waitFor();
        const pageCount = await this.elements.pageNumber().count();
        for (let i = 0; i < pageCount; i++) {
            await this.elements.pageNumber().nth(i).click();
            await this.page.waitForTimeout(3000); // Wait for page to load
    
            const isCreatedDataLocator = await this.elements.bodyTable().locator(`//div[text()="${flexibleValue}"]`).isVisible();
            if (isCreatedDataLocator) {
                const flexibleUpdatedIcon = this.page.locator('//div[text()="' + flexibleValue + '"]//ancestor::div[@class="oxd-table-row oxd-table-row--with-border"]//following-sibling::div/button/i[@class="oxd-icon bi-pencil-fill"]');
                await flexibleUpdatedIcon.click();
                await this.page.waitForTimeout(3000);
                await expect(this.elements.editTitle()).toBeVisible();
                return;
            }
            const isLastPage = i === pageCount - 1;
            if (isLastPage) {
                break; // Exit loop if no longer next page
            }
        }
    }
    async updateNationalityData() {
        //flexibleValue2 = flexibleValue + this.randomNum;
        await expect(this.elements.inputName()).not.toHaveValue("");
        await this.elements.inputName().fill(flexibleValue2);
    }
    async clickSaveForUpdate() {
        await this.elements.saveBtn().click();
        await expect(this.elements.updateSuccessToast()).toBeVisible();
        await this.elements.pageNumber().nth(0).waitFor();
    }
    async verifyNationalityUpdated() {
        const pageCount = await this.elements.pageNumber().count();
        let isUpdatedNewvalue = false;
        let isOldValueHidden = false;
        for (let i = 0; i < pageCount; i++) {
            await this.elements.pageNumber().nth(i).click();
            await this.page.waitForTimeout(3000);
    
            const hasUpdatedData = await this.elements.bodyTable().locator(`//div[text()="${flexibleValue2}"]`).isVisible();
            if (hasUpdatedData) {
                isUpdatedNewvalue = true;
            }
            const isOldDataHidden = await this.elements.bodyTable().locator(`//div[text()="${flexibleValue}"]`).isHidden();
            if (isOldDataHidden) {
                isOldValueHidden = true;
            }
            const isLastPage = i === pageCount - 1;
            if (isLastPage) {
                break; // Exit loop if no longer next page
            }
        }
    }
    async clickDeleteIcon(nameToDelete: string) {
        // Create Name to delete
        this.clickAddButton();
        this.inputNationalityData(nameToDelete);
        this.clickSaveButton();
        await this.elements.pageNumber().nth(0).waitFor();
    
        // Find Name then click Delete icon
        const pageCount = await this.elements.pageNumber().count();
        for (let i = 0; i < pageCount; i++) {
            await this.elements.pageNumber().nth(i).click();
            await this.page.waitForTimeout(3000); // Wait for loading data in new page
    
            const isCreatedDataLocator = await this.elements.bodyTable().locator(`//div[text()="${flexibleValue}"]`).isVisible();
            if (isCreatedDataLocator) {
                const flexibleDeleteIcon = this.page.locator('//div[text()="' + flexibleValue + '"]//ancestor::div[@class="oxd-table-row oxd-table-row--with-border"]//following-sibling::div/button/i[@class="oxd-icon bi-trash"]');
                await flexibleDeleteIcon.click();
                await this.page.waitForTimeout(3000);
                await expect(this.elements.deleteConfirmationPopup()).toBeVisible();
                return;
            }
            const isLastPage = i === pageCount - 1;
            if (isLastPage) {
                break; // Exit loop if no longer next page
            }
        }
    }
    async confirmDeleteNationality() {
        await this.elements.yesBtn().click();
        await expect(this.elements.deleteToast()).toBeVisible();
        await this.page.waitForTimeout(3000); // Wait for correct page count
    }
    async verifyNationalityDeleted() {
        await this.elements.pageNumber().nth(0).waitFor();
        const pageCount = await this.elements.pageNumber().count();
        let isDeleted = true;
        for (let i = 0; i < pageCount; i++) {
            await this.elements.pageNumber().nth(i).click();
            await this.elements.pageNumber().nth(0).waitFor();
    
            const isDeletedDataLocator = await this.elements.bodyTable().locator(`//div[text()="${flexibleValue}"]`).isVisible();
            if (isDeletedDataLocator) {
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
        //flexibleValue = nameToDelete1+this.randomNum;
        await this.elements.inputName().fill(flexibleValue);
        this.clickSaveButton();
        await this.elements.pageNumber().nth(0).waitFor();

        this.clickAddButton();
        //flexibleValue2 = nameToDelete2+this.randomNum;
        await this.elements.inputName().fill(flexibleValue2);
        this.clickSaveButton();
        await this.elements.pageNumber().nth(0).waitFor();
        
        //Start searching
        const pageCount = await this.elements.pageNumber().count();

        let foundValue1 = false;
        let foundValue2 = false;
        
        for (let i = 0; i < pageCount; i++) {
          await this.elements.pageNumber().nth(i).click();
          //await this.elements.page().waitForTimeout(3000); // Wait for page to load
          await this.elements.pageNumber().nth(0).waitFor();

          // Check for first value
          const isDeleteData1Displayed = await this.elements.bodyTable()
            .locator(`//div[text()="${flexibleValue}"]`)
            .isVisible();
          const deleteDataCheckbox1 = this.elements.bodyTable().locator(
            `//div[text()="${flexibleValue}"]/parent::div/preceding-sibling::div/div[@class="oxd-table-card-cell-checkbox"]`
          );
          if (isDeleteData1Displayed && !foundValue1) {
            await deleteDataCheckbox1.click();
            foundValue1 = true;
          }

          // Check for second value
          const isDeleteData2Displayed = await this.elements.bodyTable()
            .locator(`//div[text()="${flexibleValue2}"]`)
            .isVisible();
          const deleteDataCheckbox2 = this.elements.bodyTable().locator(
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
        await this.elements.deleteSelectedBtn().click();
        await expect(this.elements.deleteConfirmationPopup()).toBeVisible();
    }
    async verifyMultiNationalityDeleted(){
        const pageCount = await this.elements.pageNumber().count();

        let isData1Deleted = true;
        let isData2Deleted = true;

        for (let i = 0; i < pageCount; i++) {
            await this.elements.pageNumber().nth(i).click();
            //await this.elements.page().waitForTimeout(3000); // Wait for page to load

            const isDisplayedData1Locator = await this.elements.bodyTable()
                .locator(`//div[text()="${flexibleValue}"]`)
                .isVisible();
            if(isDisplayedData1Locator) {
                isData1Deleted = false;
            }
            const isDisplayedData2Locator = await this.elements.bodyTable()
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











//     async accessNationalities(){
//         await this.page.goto(`${process.env.WEB_URL}`);
//         await this.adminSection.click();
//         await this.nationalitiesItem.click();
//     }
//     async checkNationalitiesUI(){
//         await expect(this.mainTitle).toBeVisible();
//         await expect(this.tableNation).toBeVisible();
//     }
//     async clickAddButton(){
//         await this.addBtn.click();
//         await expect(this.addNationCard).toBeVisible();
//     }
//     async inputNationalityData(name: string){
//         flexibleValue = name+this.randomNum;
//         await this.inputName.fill(flexibleValue);
//     }
//     async clickSaveButton(){
//         await this.saveBtn.click();
//         await this.page.waitForTimeout(3000);
//         await expect(this.successToast).toBeVisible();
//     }
//     async verifyNewNationalityCreated(){
//         let isCreated = false;
//         await this.pageNumber.nth(0).waitFor();
//         const pageCount = await this.pageNumber.count();
//         for (let i = 0; i < pageCount; i++) {
//             await this.pageNumber.nth(i).click();
//             await this.page.waitForTimeout(3000);

//             const isCreatedDataLocator = await this.bodyTable.locator(`//div[text()="${flexibleValue}"]`).isVisible();
//             if(isCreatedDataLocator) {
//                 isCreated = true;
//             }
//             const isLastPage = i === pageCount - 1;
//             if (isLastPage) {
//                 break; // Exit loop if no longer next page
//             }
//         }
//     }
//     async clickUpdateIcon(name: string){
//         this.clickAddButton();
//         this.inputNationalityData(name);
//         this.clickSaveButton();
//         await this.pageNumber.nth(0).waitFor();
//         const pageCount = await this.pageNumber.count();
//         for (let i = 0; i < pageCount; i++) {
//             await this.pageNumber.nth(i).click();
//             await this.page.waitForTimeout(3000); // Wait for page to load

//             const isCreatedDataLocator = await this.bodyTable.locator(`//div[text()="${flexibleValue}"]`).isVisible();
//             if(isCreatedDataLocator) {
//                 const flexibleUpdatedIcon = this.page.locator('//div[text()="'+flexibleValue+'"]//ancestor::div[@class="oxd-table-row oxd-table-row--with-border"]//following-sibling::div/button/i[@class="oxd-icon bi-pencil-fill"]');
//                 await flexibleUpdatedIcon.click();
//                 await this.page.waitForTimeout(3000);
//                 await expect(this.editTitle).toBeVisible();
//                 return;
//             }
//             const isLastPage = i === pageCount - 1;
//             if (isLastPage) {
//                 break; // Exit loop if no longer next page
//             }
//         }
//     }
//     async updateNationalityData(){
//         flexibleValue2 = flexibleValue+this.randomNum
//         await expect(this.inputName).not.toHaveValue("");
//         await this.inputName.fill(flexibleValue2);
//     }
//     async clickSaveForUpdate(){
//         await this.saveBtn.click();
//         await expect(this.updateSuccessToast).toBeVisible();
//         await this.pageNumber.nth(0).waitFor();
//     }
//     async verifyNationalityUpdated(){
//         const pageCount = await this.pageNumber.count();
//         let isUpdatedNewvalue = false;
//         let isOldValueHidden = false;
//         for (let i = 0; i < pageCount; i++) {
//             await this.pageNumber.nth(i).click();
//             await this.page.waitForTimeout(3000);

//             const hasUpdatedData = await this.bodyTable.locator(`//div[text()="${flexibleValue2}"]`).isVisible();
//             if(hasUpdatedData){
//                 isUpdatedNewvalue = true;
//             }
//             const isOldDataHidden = await this.bodyTable.locator(`//div[text()="${flexibleValue}"]`).isHidden();
//             if(isOldDataHidden){
//                 isOldValueHidden = true;
//             }            
//             const isLastPage = i === pageCount - 1;
//             if (isLastPage) {
//                 break; // Exit loop if no longer next page
//             }
//         }
//     }
//     async clickDeleteIcon(nameToDelete: string){
//         //Create Name to delete
//         this.clickAddButton();
//         this.inputNationalityData(nameToDelete);
//         this.clickSaveButton();
//         await this.pageNumber.nth(0).waitFor();

//         //Find Name then click Delete icon
//         const pageCount = await this.pageNumber.count();
//         for (let i = 0; i < pageCount; i++) {
//             await this.pageNumber.nth(i).click();
//             await this.page.waitForTimeout(3000); //Wait for loading data in new page

//             const isCreatedDataLocator = await this.bodyTable.locator(`//div[text()="${flexibleValue}"]`).isVisible();
//             if(isCreatedDataLocator) {
//                 const flexibleDeleteIcon = this.page.locator('//div[text()="'+flexibleValue+'"]//ancestor::div[@class="oxd-table-row oxd-table-row--with-border"]//following-sibling::div/button/i[@class="oxd-icon bi-trash"]');
//                 await flexibleDeleteIcon.click();
//                 await this.page.waitForTimeout(3000);
//                 await expect(this.deleteConfirmationPopup).toBeVisible();
//                 return; 
//             }
//             const isLastPage = i === pageCount - 1;
//             if (isLastPage) {
//                 break; // Exit loop if no longer next page
//             }
//         }

//     }
//     async confirmDeleteNationality(){
//         await this.yesBtn.click();
//         await expect(this.deleteToast).toBeVisible();
//         await this.page.waitForTimeout(3000); //wait for correct page count
//     }
//     async verifyNationalityDeleted(){
//         await this.pageNumber.nth(0).waitFor();
//         const pageCount = await this.pageNumber.count();
//         let isDeleted = true;
//         for (let i = 0; i < pageCount; i++) {
//             await this.pageNumber.nth(i).click();
//             await this.pageNumber.nth(0).waitFor();

//             const isDeletedDataLocator = await this.bodyTable.locator(`//div[text()="${flexibleValue}"]`).isVisible();
//             if(isDeletedDataLocator) {
//                 isDeleted = false;
//             }
//             const isLastPage = i === pageCount - 1;
//             if (isLastPage) {
//                 break; // Exit loop if no longer next page
//             }
//         }
//     }
    // async selectMultipleNationalities(nameToDelete1: string, nameToDelete2: string){
    //     //Add data to test
    //     this.clickAddButton();
    //     flexibleValue = nameToDelete1+this.randomNum;
    //     await this.inputName.fill(flexibleValue);
    //     this.clickSaveButton();
    //     await this.pageNumber.nth(0).waitFor();

    //     this.clickAddButton();
    //     flexibleValue2 = nameToDelete2+this.randomNum;
    //     await this.inputName.fill(flexibleValue2);
    //     this.clickSaveButton();
    //     await this.pageNumber.nth(0).waitFor();
        
    //     //Start searching
    //     const pageCount = await this.pageNumber.count();

    //     let foundValue1 = false;
    //     let foundValue2 = false;
        
    //     for (let i = 0; i < pageCount; i++) {
    //       await this.pageNumber.nth(i).click();
    //       await this.page.waitForTimeout(3000); // Wait for page to load
    //       await this.pageNumber.nth(0).waitFor();

    //       // Check for first value
    //       const isDeleteData1Displayed = await this.bodyTable
    //         .locator(`//div[text()="${flexibleValue}"]`)
    //         .isVisible();
    //       const deleteDataCheckbox1 = this.bodyTable.locator(
    //         `//div[text()="${flexibleValue}"]/parent::div/preceding-sibling::div/div[@class="oxd-table-card-cell-checkbox"]`
    //       );
    //       if (isDeleteData1Displayed && !foundValue1) {
    //         await deleteDataCheckbox1.click();
    //         foundValue1 = true;
    //       }

    //       // Check for second value
    //       const isDeleteData2Displayed = await this.bodyTable
    //         .locator(`//div[text()="${flexibleValue2}"]`)
    //         .isVisible();
    //       const deleteDataCheckbox2 = this.bodyTable.locator(
    //         `//div[text()="${flexibleValue2}"]/parent::div/preceding-sibling::div/div[@class="oxd-table-card-cell-checkbox"]`
    //       );
    //       if (isDeleteData2Displayed && !foundValue2) {
    //         await deleteDataCheckbox2.click();
    //         foundValue2 = true;
    //       }

    //       // If both values are found, stop the loop
    //       if (foundValue1 && foundValue2) {
    //         break;
    //       }

    //       // If it's the last page and not all values are found
    //       const isLastPage = i === pageCount - 1;
    //       if (isLastPage && (!foundValue1 || !foundValue2)) {
    //         break; // Exit loop if no longer next page
    //       }
    //     }
    // }
    // async clickDeleteButton(){
    //     await this.deleteSelectedBtn.click();
    //     await expect(this.deleteConfirmationPopup).toBeVisible();
    // }
    // async verifyMultiNationalityDeleted(){
    //     const pageCount = await this.pageNumber.count();

    //     let isData1Deleted = true;
    //     let isData2Deleted = true;

    //     for (let i = 0; i < pageCount; i++) {
    //         await this.pageNumber.nth(i).click();
    //         await this.page.waitForTimeout(3000); // Wait for page to load

    //         const isDisplayedData1Locator = await this.bodyTable
    //             .locator(`//div[text()="${flexibleValue}"]`)
    //             .isVisible();
    //         if(isDisplayedData1Locator) {
    //             isData1Deleted = false;
    //         }
    //         const isDisplayedData2Locator = await this.bodyTable
    //             .locator(`//div[text()="${flexibleValue2}"]`)
    //             .isVisible();
    //         if(isDisplayedData2Locator) {
    //             isData2Deleted = false;
    //         }
    //         const isLastPage = i === pageCount - 1;
    //         if (isLastPage) {
    //             break; // Exit loop if no longer next page
    //         }
    //     }
    // }
}



















