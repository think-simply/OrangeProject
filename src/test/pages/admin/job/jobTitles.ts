import { Page, Locator, expect } from "@playwright/test";
import dotenv from 'dotenv';
dotenv.config();

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
    readonly editJobTitlesBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.adminMenu = page.locator('//span[text()="Admin"]');
        this.jobMenu = page.locator('//span[text()="Job "]');
        this.jobTitlesMenu = page.locator('//a[text()="Job Titles"]');
        this.jobTitlesLabel = page.locator('//h6[text()="Job Titles"]')
        this.addJobTitleBtn = page.locator('//button[text()=" Add "]')
        this.jobTitleTxb = page.locator("//div[@class='oxd-input-group oxd-input-field-bottom-space']//input[@class='oxd-input oxd-input--active']")
        this.jobDescriptionInput = page.locator('//textarea[@placeholder="Type description here"]')
        this.saveJobTitleBtn = page.locator('//button[text()=" Save "]')
        this.editJobTitlesBtn = page.locator('//i[contains(@class, "bi-pencil-fill")])[1]')
        
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
        await this.jobTitleTxb.fill('Hoa Test Create Job Title' + Math.random())
        await this.jobDescriptionInput.fill('Job Description test 001')
        await this.saveJobTitleBtn.click()
    }
    async verifyCreateJobTitleSuccessfully(){
        await expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewJobTitleList')
    }

    async updateJobTitles(){
        await this.editJobTitlesBtn.click()
        await this.page.pause()
    }

}