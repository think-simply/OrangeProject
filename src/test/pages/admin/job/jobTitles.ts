import { Page, Locator, expect } from "@playwright/test";
import dotenv from 'dotenv';
import data from '../../../../../dataTest.json'
import { generateRandomString } from "../../../../helper/randomString";
dotenv.config();

const randomJobTitle = generateRandomString(data.jobTitle.jobTitles)+"Test";

export default class JobTitlesPage {
    readonly page: Page;
    readonly adminMenu: Locator;
    readonly jobMenu: Locator;
    readonly jobTitlesMenu: Locator;
    readonly jobTitlesLabel: Locator;
    readonly addJobTitleBtn: Locator;
    readonly jobTitleTxb: Locator;
    readonly jobDescriptionInput: Locator;
    readonly saveJobTitleBtn: Locator;
    readonly jobTitleName: Locator;
    readonly editJobTitlesBtn: Locator;
    readonly deleteJobTitleBtn: Locator;
    readonly deleteConfirmBtn: Locator;
    readonly checkAllItem: Locator;
    readonly deleteSelectedBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        // Locator
        this.adminMenu = page.locator('//span[text()="Admin"]');
        this.jobMenu = page.locator('//span[text()="Job "]');
        this.jobTitlesMenu = page.locator('//a[text()="Job Titles"]');
        this.jobTitlesLabel = page.locator('//h6[text()="Job Titles"]')
        this.addJobTitleBtn = page.locator('//button[text()=" Add "]')
        this.jobTitleTxb = page.locator("//div[@class='oxd-input-group oxd-input-field-bottom-space']//input[@class='oxd-input oxd-input--active']")
        this.jobDescriptionInput = page.locator('//textarea[@placeholder="Type description here"]')
        this.saveJobTitleBtn = page.locator('//button[text()=" Save "]')
        this.jobTitleName = page.locator(`//div[text()="${randomJobTitle}"]`)
        this.editJobTitlesBtn = page.locator(`//div[text()="${randomJobTitle}"]//ancestor::div[@role="row"]//button[i[contains(@class, "bi-pencil-fill")]]/i`)
        this.deleteJobTitleBtn = page.locator(`//div[text()="${randomJobTitle}"]//ancestor::div[@role="row"]//button[i[contains(@class, "bi-trash")]]/i`)
        this.deleteConfirmBtn = page.locator('//button[text()=" Yes, Delete "]')
        this.checkAllItem = page.locator('//div[@class="oxd-table-header"]//div[@class="oxd-checkbox-wrapper"]')
        this.deleteSelectedBtn = page.locator('//button[text()=" Delete Selected "]')
    }
    async userGoToJobTitles() {
        await this.adminMenu.click();
        await this.jobMenu.click();
        await this.jobTitlesMenu.click({timeout: 35000});
    }
    async verifyJobTitlesPage(){
        await expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewJobTitleList')
        await expect(this.jobTitlesLabel).toHaveText('Job Titles')
        await expect(this.addJobTitleBtn).toBeVisible()
    }
    async createJobTitle(){
        await this.addJobTitleBtn.click()
        await this.jobTitleTxb.fill(randomJobTitle)
        await this.jobDescriptionInput.fill(generateRandomString(data.jobTitle.jobDescription))
        await this.saveJobTitleBtn.click()
    }
    async verifyCreateJobTitleSuccessfully(){
        await expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewJobTitleList')
        await expect(this.jobTitleName).toBeVisible()
    }

    async updateJobTitles(){
        await this.editJobTitlesBtn.click()
        await this.jobTitleTxb.fill(randomJobTitle)
        await this.jobDescriptionInput.fill(generateRandomString(data.jobTitle.jobDescription))
        await this.saveJobTitleBtn.click()
    }
    async verifyUpdateJobTitleSuccessfully(){
        await expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewJobTitleList')
        await expect(this.jobTitleName).toBeVisible()
    }

    async deleteJobTitles(){
        await this.deleteJobTitleBtn.click()
        await this.deleteConfirmBtn.click()
        
    }
    async verifyDeleteJobTitleSuccessfully(){
        await expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewJobTitleList')
        await expect(this.jobTitleName).not.toBeVisible()
    }
    async deleteMultiJobTitles(){
        await this.checkAllItem.click()
        await this.deleteSelectedBtn.click()
        await this.deleteConfirmBtn.click()
        
    }
    async verifyDeleteMultiJobTitleSuccessfully(){
        await expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewJobTitleList')
        await expect(this.jobTitleName).not.toBeVisible()
    }

}