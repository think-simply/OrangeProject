import { Page, expect } from "@playwright/test";
import dotenv from 'dotenv';
import data from './dataTest.json'
import { generateRandomString } from "#helper/randomString";
import { BasePage } from "#test/pages/BasePage";
dotenv.config();

export default class JobTitlesPage extends BasePage {
  constructor(page: Page) {
    super(page); // Pass the page instance to the BasePage constructor
  }
    element = {
        adminMenu: () => this.getPage().locator('//span[text()="Admin"]'),
        jobMenu: () => this.getPage().locator('//span[text()="Job "]'),
        jobTitlesMenu: () => this.getPage().locator('//a[text()="Job Titles"]'),
        jobTitlesLabel: () => this.getPage().locator('//h6[text()="Job Titles"]'),
        addJobTitleBtn: () => this.getPage().locator('//button[text()=" Add "]'),
        jobTitleTxb: () => this.getPage().locator("//label[text()='Job Title']/ancestor::div[@class='oxd-input-group oxd-input-field-bottom-space']//descendant::input"),
        jobDescriptionInput: () => this.getPage().locator('//textarea[@placeholder="Type description here"]'),
        saveJobTitleBtn: () => this.getPage().locator('//button[text()=" Save "]'),
        jobTitleName: (jobName: string) => this.getPage().locator(`//div[text()="${jobName}"]`),
        newJob: (newName: string) => this.getPage().locator(`//div[text()="${newName}"]`),
        editJobTitlesBtn: (jobName: string) => this.getPage().locator(`//div[text()="${jobName}"]//ancestor::div[@role="row"]//button[i[contains(@class, "bi-pencil-fill")]]/i`),
        deleteJobTitleBtn: (jobName: string) => this.getPage().locator(`//div[text()="${jobName}"]//ancestor::div[@role="row"]//button[i[contains(@class, "bi-trash")]]/i`),
        deleteConfirmBtn: () => this.getPage().locator('//button[text()=" Yes, Delete "]'),
        checkAllItem: () => this.getPage().locator('//div[@class="oxd-table-header"]//div[@class="oxd-checkbox-wrapper"]'),
        deleteSelectedBtn: () => this.getPage().locator('//button[text()=" Delete Selected "]'),
        messageSuccess: () => this.getPage().locator('//div[@class="oxd-toast-container oxd-toast-container--bottom"]//p[text()="Success"]'),
        actionColumn: () => this.getPage().locator('//div[text()="Actions"]'),
        checkBox: (text: string) => this.getPage().locator(`//div[contains(text(), "${text}")]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-check oxd-checkbox-input-icon"]`),
        deleteMultiBtn: () => this.getPage().locator("//button[normalize-space()='Delete Selected']"),
    }
    async userGoToJobTitles() {
        await this.element.adminMenu().click();
        await this.element.jobMenu().click();
        await this.element.jobTitlesMenu().click();
    }
    async verifyJobTitlesPage() {
        await expect(this.getPage()).toHaveURL(`${process.env.JOB_TITLE_LIST_URL}`, { timeout: 35000 })
        await expect(this.element.jobTitlesLabel()).toHaveText('Job Titles')
        await expect(this.element.addJobTitleBtn()).toBeVisible()
    }
    async createJobTitle(jobTitleName: string) {
        await this.element.addJobTitleBtn().click()
        await this.element.jobTitleTxb().fill(jobTitleName)
        await this.element.jobDescriptionInput().fill(generateRandomString(data.jobTitle.jobDescription))
        await this.element.saveJobTitleBtn().click()
        await this.element.messageSuccess().waitFor({ state: "visible", timeout: 4000 });
        await Promise.all([
            this.element.messageSuccess().waitFor({ state: "visible", timeout: 4000 }),
            this.getPage().waitForURL("**/orangehrm/web/index.php/admin/saveJobTitle**", {
              timeout: 10000,
            }),
          ]);
        await this.getPage().waitForURL(`${process.env.JOB_TITLE_LIST_URL}`, {
            timeout: 10000,
        });          
    }
    async verifyCreateJobTitleSuccessfully(jobTitleName: string) {
        await expect(this.element.actionColumn()).toBeVisible();
        await expect(this.element.jobTitleName(jobTitleName)).toBeVisible()
    }

    async updateJobTitles(jobTitleName: string, newName: string) {
        await this.element.editJobTitlesBtn(jobTitleName).click()
        await this.element.jobTitleTxb().click()
        await this.element.jobTitleTxb().fill(newName)
        await this.element.jobDescriptionInput().click()
        await this.element.jobDescriptionInput().fill(generateRandomString(data.jobTitle.jobDescription))
        await this.element.saveJobTitleBtn().click(),
        await this.element.messageSuccess().waitFor({ state: "visible", timeout: 4000 });
        await this.getPage().waitForURL(`${process.env.JOB_TITLE_LIST_URL}`, {
            timeout: 10000,
          });      
    }
    async verifyUpdateJobTitleSuccessfully(jobTitleName: string) {
        await expect(this.element.actionColumn()).toBeVisible();
        await expect(this.element.jobTitleName(jobTitleName)).toBeVisible()
    }

    async deleteJobTitles(jobTtileName: string) {
        await this.element.deleteJobTitleBtn(jobTtileName).click()
        await this.element.deleteConfirmBtn().click()
        await this.getPage().waitForSelector('.oxd-loading-spinner', { state: 'detached' });
    }
    async verifyDeleteJobTitleSuccessfully(jobTitleName: string) {
        //await expect(this.getPage()).toHaveURL(`${process.env.JOB_TITLE_LIST_URL}`,{timeout: 35000})
        await expect(this.element.jobTitleName(jobTitleName)).not.toBeVisible()
    }
    async deleteMultiJobTitles(text: string) {
        // get all checkbox
        const checkboxes = this.element.checkBox(text);
        // Click each checkbox
        await checkboxes.first().click(); // or .nth(0)()
        await checkboxes.last().click(); // or .nth(1)
        await this.element.deleteMultiBtn().click();
        await this.element.deleteConfirmBtn().click();
        await this.element
            .messageSuccess()
            .waitFor({ state: "visible", timeout: 20000 });
    }
    async verifyDeleteMultiJobTitleSuccessfully(jobTitleName: string) {
        await expect(this.getPage()).toHaveURL(`${process.env.JOB_TITLE_LIST_URL}`, { timeout: 35000 })
        await expect(this.element.jobTitleName(jobTitleName)).not.toBeVisible()
    }

}