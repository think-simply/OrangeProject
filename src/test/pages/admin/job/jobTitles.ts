import { Page, Locator, expect } from "@playwright/test";
import dotenv from 'dotenv';
import data from '../../../../../dataTest.json'
import { generateRandomString } from "../../../../helper/randomString";
dotenv.config();

const randomJobTitle = generateRandomString(data.jobTitle.jobTitles)+"Test";

export default class JobTitlesPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
        // Locator
        
    }
    element = {
        adminMenu: () => this.page.locator('//span[text()="Admin"]'),
        jobMenu: () => this.page.locator('//span[text()="Job "]'),
        jobTitlesMenu: () => this.page.locator('//a[text()="Job Titles"]'),
        jobTitlesLabel: () => this.page.locator('//h6[text()="Job Titles"]'),
        addJobTitleBtn: () => this.page.locator('//button[text()=" Add "]'),
        jobTitleTxb: () => this.page.locator("//label[text()='Job Title']/ancestor::div[@class='oxd-input-group oxd-input-field-bottom-space']//descendant::input"),
        jobDescriptionInput: () => this.page.locator('//textarea[@placeholder="Type description here"]'),
        saveJobTitleBtn: () => this.page.locator('//button[text()=" Save "]'),
        jobTitleName: (jobName: string) => this.page.locator(`//div[text()="${jobName}"]`),
        newJob: (newName: string) => this.page.locator(`//div[text()="${newName}"]`),
        editJobTitlesBtn: (jobName: string) => this.page.locator(`//div[text()="${jobName}"]//ancestor::div[@role="row"]//button[i[contains(@class, "bi-pencil-fill")]]/i`),
        deleteJobTitleBtn: (jobName: string) => this.page.locator(`//div[text()="${jobName}"]//ancestor::div[@role="row"]//button[i[contains(@class, "bi-trash")]]/i`),
        deleteConfirmBtn: () => this.page.locator('//button[text()=" Yes, Delete "]'),
        checkAllItem: () => this.page.locator('//div[@class="oxd-table-header"]//div[@class="oxd-checkbox-wrapper"]'),
        deleteSelectedBtn: () => this.page.locator('//button[text()=" Delete Selected "]')
    }
    async userGoToJobTitles() {
        await this.element.adminMenu().click();
        await this.element.jobMenu().click();
        await this.element.jobTitlesMenu().click({timeout: 35000});
    }
    async verifyJobTitlesPage(){
        await expect(this.page).toHaveURL(`${process.env.JOB_TITLE_LIST_URL}`,{timeout: 35000})
        await expect(this.element.jobTitlesLabel()).toHaveText('Job Titles')
        await expect(this.element.addJobTitleBtn()).toBeVisible()
    }
    async createJobTitle(jobTitleName: string){
        await this.element.addJobTitleBtn().click()
        await this.element.jobTitleTxb().fill(jobTitleName)
        await this.element.jobDescriptionInput().fill(generateRandomString(data.jobTitle.jobDescription))
        await this.element.saveJobTitleBtn().click()
        await this.page.waitForSelector('.oxd-loading-spinner', { state: 'detached' });
    }
    async verifyCreateJobTitleSuccessfully(jobTitleName: string){
        await expect(this.page).toHaveURL(`${process.env.JOB_TITLE_LIST_URL}`,{timeout: 35000})
        await expect(this.element.jobTitleName(jobTitleName)).toBeVisible()
    }

    async updateJobTitles(jobTitleName:string, newName: string){
        await this.element.editJobTitlesBtn(jobTitleName).click()
        await this.element.jobTitleTxb().click()
        await this.element.jobTitleTxb().fill(newName)
        await this.element.jobDescriptionInput().fill(generateRandomString(data.jobTitle.jobDescription))
        await this.element.saveJobTitleBtn().click({timeout: 30000})
        await this.page.waitForSelector('.oxd-loading-spinner', { state: 'detached' });
    }
    async verifyUpdateJobTitleSuccessfully(jobTitleName: string){
        await expect(this.page).toHaveURL(`${process.env.JOB_TITLE_LIST_URL}`,{timeout: 35000})
        await expect(this.element.jobTitleName(jobTitleName)).toBeVisible()
    }

    async deleteJobTitles(jobTtileName: string){
        await this.element.deleteJobTitleBtn(jobTtileName).click()
        await this.element.deleteConfirmBtn().click()
        await this.page.waitForSelector('.oxd-loading-spinner', { state: 'detached' });
        
    }
    async verifyDeleteJobTitleSuccessfully(jobTitleName: string){
        //await expect(this.page).toHaveURL(`${process.env.JOB_TITLE_LIST_URL}`,{timeout: 35000})
        await expect(this.element.jobTitleName(jobTitleName)).not.toBeVisible()
    }
    async deleteMultiJobTitles(){
        await this.element.checkAllItem().click({force: true})
        await this.element.deleteSelectedBtn().click()
        await this.page.waitForSelector('.oxd-loading-spinner', { state: 'detached' });
        await this.element.deleteConfirmBtn().click()
        await this.page.waitForSelector('.oxd-loading-spinner', { state: 'detached' });
        
    }
    async verifyDeleteMultiJobTitleSuccessfully(jobTitleName: string){
        await expect(this.page).toHaveURL(`${process.env.JOB_TITLE_LIST_URL}`,{timeout: 35000})
        await expect(this.element.jobTitleName(jobTitleName)).not.toBeVisible()
    }

}