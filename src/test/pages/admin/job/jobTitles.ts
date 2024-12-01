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

    constructor(page: Page) {
        this.page = page;
        this.adminMenu = page.locator('//span[text()="Admin"]');
        this.jobMenu = page.getByText('Job ');
        this.jobTitlesMenu = page.getByText('jobTitlesMenu');
        this.jobTitlesLabel = page.locator('//h6[text()="Job Titles"]')
        this.addJobTitleBtn = page.locator('//button[text()=" Add "]')
        this.jobTitleTxb = page.locator('//label[text()="Job Title"]/ancestor::div[@class="oxd-input-group"]/div/input')
        this.jobDescriptionInput = page.locator('//textarea[@placeholder="Type description here"]')
        this.saveJobTitleBtn = page.locator('//button[text()=" Save "]')
    }
    async userGoToJobTitles() {
        await this.adminMenu.click();
        await this.jobMenu.click();
        await this.jobTitlesMenu.click();
    }
    async verifyJobTitlesPage(){
        await expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewJobTitleList')
        await expect(this.jobTitlesLabel).toHaveText('Job Titles')
        await expect(this.addJobTitleBtn).toBeVisible()
    }
    async createJobTitle(){
        await this.adminMenu.click();
        await this.jobMenu.click();
        await this.jobTitlesMenu.click();
        await this.addJobTitleBtn.click()
        await this.jobTitleTxb.fill('Title Test 001')
        await this.jobDescriptionInput.fill('Job Description test 001')
        await this.saveJobTitleBtn.click()
    }
    async verifyCreateJobTitleSuccessfully(){
        await expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewJobTitleList')
    }


}