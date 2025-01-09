import { Page, Locator, expect } from "@playwright/test";
import dotenv from 'dotenv';
dotenv.config();

export default class AdminMenuPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    elements = {
        updatedAccount: (updatetext: string) => this.page.locator(`//div[text()="${updatetext}"]`),
        newUser: (demotext: string) => this.page.locator(`//div[text()="${demotext}"]`),
        editIcon: (textTrial: string) => this.page.locator(`//div[text()="${textTrial}"]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-pencil-fill"]`),
        loginBtn: () => this.page.locator('//button[@type="submit"]'),
        adminMenu: () => this.page.locator('//span[text()="Admin"]'),
        addBtn: () => this.page.locator('//button[normalize-space()="Add"]'),
        userRole: () => this.page.locator('//label[text()="User Role"]//ancestor::div[contains(@class,"oxd-grid-item--gutters")]//descendant::div[@class="oxd-select-wrapper"]'),
        status: () => this.page.locator('//label[text()="Status"]//ancestor::div[contains(@class,"oxd-grid-item--gutters")]//descendant::div[@class="oxd-select-wrapper"]'),
        employeeName: () => this.page.locator('//input[@placeholder="Type for hints..."]'),
        usernameFieldSearch: () => this.page.locator('//label[normalize-space()="Username"]//ancestor::div[@class="oxd-grid-item oxd-grid-item--gutters"]//descendant::input[@class="oxd-input oxd-input--active"]'),
        usernameField: () => this.page.getByRole('textbox').nth(2),
        passwordField: () => this.page.locator('//div[contains(@class,"user-password-cell")]//descendant::input[@type="password"]'),
        confirmPassword: () => this.page.locator('//label[normalize-space()="Confirm Password"]//ancestor::div[@class="oxd-grid-item oxd-grid-item--gutters"]//descendant::input[@type="password"]'),
        submitBtn: () => this.page.locator('//button[@type="submit"]'),
        statusOption: () => this.page.getByRole('option', { name: 'Enabled' }),
        employeeOption: () => this.page.getByRole('option', { name: 'tina thi Nguyen' }),
        messageSuccess: () => this.page.locator('//div[@class="oxd-toast-container oxd-toast-container--bottom"]//p[text()="Success"]'),
        userManagement: () => this.page.locator('//span[normalize-space()="User Management"]'),
        titlePage: () => this.page.locator('//h5[text()="System Users"]'),
        usernameLabel: () => this.page.locator('//label[text()="Username"]'),
        userRoleLabel: () => this.page.locator('//label[text()="User Role"]'),
        employeeNameLabel: () => this.page.locator('//label[text()="Employee Name"]'),
        statusLabel: () => this.page.locator('//label[text()="Status"]'),
        resetBtn: () => this.page.locator('//button[normalize-space()="Reset"]'),
        searchBtn: () => this.page.locator('//button[@type="submit"]'),
        addUserBtn: () => this.page.locator('//button[normalize-space()="Add"]'),
        userRoleColumn: () => this.page.locator('//div[text()="Username"]'),
        usernameColumn: () => this.page.locator('//div[text()="User Role"]'),
        employeeNameColumn: () => this.page.locator('//div[text()="Employee Name"]'),
        statusColumn: () => this.page.locator('//div[text()="Status"]'),
        actionColumn: () => this.page.locator('//div[text()="Actions"]'),
        userResult: () => this.page.locator("//div[@class='oxd-table-row oxd-table-row--with-border']//parent::div[@class='oxd-table-card']"),
        deleteIcon: (text: string) => this.page.locator(`//div[text()="${text}"]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-trash"]`),
        confirmDeleteBtn: () => this.page.locator("//button[normalize-space()='Yes, Delete']"),
        checkBox: (text: string) => this.page.locator(`//div[contains(text(), "${text}")]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-check oxd-checkbox-input-icon"]`),
        deleteMultiBtn: () => this.page.locator("//button[normalize-space()='Delete Selected']"),
        successToast: () => this.page.locator('//div[@class="oxd-toast-container oxd-toast-container--bottom"]//p[text()="Success"]'),
        resultsRowLocator: () => this.page.locator("//div[@class='oxd-table-row oxd-table-row--with-border']//parent::div[@class='oxd-table-card']"),
        roleColumnLocator: () => this.page.locator("//div[@class='oxd-table-row oxd-table-row--with-border']//parent::div[@class='oxd-table-card']//child::div[@class='oxd-table-cell oxd-padding-cell'][3]"),
        employeeNameLocator: () => this.page.locator("//div[@class='oxd-table-row oxd-table-row--with-border']//parent::div[@class='oxd-table-card']//child::div[@class='oxd-table-cell oxd-padding-cell'][4]"),
        statusLocator: () => this.page.locator("//div[@class='oxd-table-row oxd-table-row--with-border']//parent::div[@class='oxd-table-card']//child::div[@class='oxd-table-cell oxd-padding-cell'][5]"),
        noRecordText: (text: string) => this.page.locator(`//span[text()="${text}"]`),
        validationMessage: (validation: string) => this.page.locator(`//label[text()="${validation}"]//ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//descendant::span`),
        inputField: (validation: string) => this.page.locator(`//label[text()="${validation}"]//ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//descendant::input`),
    }
    async visit() {
        await this.page.goto(`${process.env.WEB_URL}`);
    }
    async accessUserPage() {
        await this.elements.adminMenu().click();
        await this.elements.userManagement().click();
    }
    async verifyUserPageUI() {
        await expect(this.elements.titlePage()).toBeVisible();
        await expect(this.elements.usernameLabel()).toBeVisible();
        await expect(this.elements.usernameFieldSearch()).toBeEditable();
        await expect(this.elements.userRoleLabel()).toBeVisible();
        await expect(this.elements.userRole()).toBeVisible();
        await expect(this.elements.employeeNameLabel()).toBeVisible();
        await expect(this.elements.employeeName()).toBeEditable()
        await expect(this.elements.statusLabel()).toBeVisible();
        await expect(this.elements.status()).toBeVisible();
        await expect(this.elements.resetBtn()).toBeVisible();
        await expect(this.elements.searchBtn()).toBeVisible();
        await expect(this.elements.addUserBtn()).toBeVisible();
        await expect(this.elements.usernameColumn()).toBeVisible();
        await expect(this.elements.userRoleColumn()).toBeVisible();
        await expect(this.elements.employeeNameColumn()).toBeVisible();
        await expect(this.elements.statusColumn()).toBeVisible();
        await expect(this.elements.actionColumn()).toBeVisible();
    }
    async createUser(role: string, employee: string, username: string, pass: string, confirm: string) {
        await this.elements.adminMenu().click();
        await this.elements.addBtn().click();
        await this.elements.userRole().click();
        await this.page.getByRole('option', { name: role }).click();
        await this.elements.status().click();
        await this.elements.statusOption().click();
        await this.elements.employeeName().fill(employee);
        await this.elements.employeeOption().click();
        await this.elements.usernameField().fill(username);
        await this.elements.passwordField().fill(pass);
        await this.elements.confirmPassword().fill(confirm);
        await this.elements.submitBtn().click();
        // await this.page.waitForTimeout(3000);
        await this.elements.successToast().waitFor({ state: 'visible', timeout: 4000 });
    }

    async verifyCreateUser(demotext: string) {
        await expect(this.elements.newUser(demotext)).toBeVisible();
    }
    async searchUserName(userName: string) {
        await this.elements.adminMenu().click();
        await this.elements.usernameFieldSearch().fill(userName);
        await this.elements.searchBtn().click();
        await this.page.waitForTimeout(5000);
        await expect(this.elements.actionColumn()).toBeVisible();
    }
    async verifySearchUserName(checkUser = false, text: string) {
        await this.page.route(`${process.env.SEARCH_URL}`, async (route) => {
            const response = await route.fetch();
            expect(response.status()).toBe(200);
        });
        //checkUser = true
        if (checkUser) {
            await expect(this.elements.userResult()).toHaveCount(1);
            await expect(this.elements.newUser(text)).toBeVisible();
        }
        //checkUser = false
        else {
            await expect(this.elements.noRecordText(text)).toBeVisible({ timeout: 5000 });
        }
    }
    async searchUserRole(role: string) {
        await this.elements.adminMenu().click();
        await this.elements.userRole().click();
        await this.page.getByRole('option', { name: role }).click();
        await this.elements.searchBtn().click();
        await this.page.waitForTimeout(5000);
        await expect(this.elements.actionColumn()).toBeVisible();
    }
    async verifySearchUserRole(checkUserRole = true, role: string) {
        if (checkUserRole) {
            const results = await this.elements.roleColumnLocator().all();
            // Check if any results are found
            expect(results.length).toBeGreaterThan(0);
            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                await expect(result).toBeVisible({ timeout: 5000 });
                const statusText = await result.textContent();
                expect(statusText).toBe(role);
            }
        }
    }
    async searchEmployeeName(text: string) {
        await this.elements.adminMenu().click();
        await this.elements.employeeName().fill(text);
        await this.elements.employeeOption().click();
        await this.elements.searchBtn().click();
        await this.page.waitForTimeout(5000);
        await expect(this.elements.actionColumn()).toBeVisible();
        await this.page.route(`${process.env.SEARCH_URL}`, async (route) => {
            const response = await route.fetch();
            expect(response.status()).toBe(200);
        });
    }
    async verifySearchEmployeeName(searchResult: string) {
        const results = await this.elements.employeeNameLocator().all();
        expect(results.length).toBeGreaterThan(0);
        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            await expect(result).toBeVisible({ timeout: 5000 });
            const statusText = await result.textContent();
            expect(statusText).toBe(searchResult);
        }
    }
    async searchStatus(status: string) {
        await this.elements.adminMenu().click();
        await this.elements.status().click();
        await this.page.getByRole('option', { name: status }).click();
        await this.elements.searchBtn().click();
        await this.page.waitForTimeout(5000);
        await expect(this.elements.actionColumn()).toBeVisible();
    }
    async verifySearchStatus(status: string) {
        const statusLocators = await this.elements.statusLocator().all();
        for (let i = 0; i < statusLocators.length; i++) {
            const statusLocator = statusLocators[i];
            await expect(statusLocator).toBeVisible({
                timeout: 5000
            });
            const statusText = await statusLocator.textContent();
            expect(statusText).toBe(status);
        }
    }
    async inputDataForFields(username: string, role: string, text: string, status: string) {
        await this.elements.adminMenu().click();
        await this.elements.usernameField().fill(username);
        await this.elements.userRole().click();
        await this.page.getByRole('option', { name: role }).click();
        await this.elements.employeeName().fill(text);
        await this.elements.employeeOption().click();
        await this.elements.status().click();
        await this.page.getByRole('option', { name: status }).click();
    }
    async pressReset() {
        await this.elements.resetBtn().click();
    }
    async verifyFieldsAfterReset() {
        const usernameValue = await this.elements.usernameField().textContent();
        expect(usernameValue).toBe('');
        const role = await this.elements.userRole().textContent();
        expect(role).toBe('-- Select --');
        const employee = await this.elements.employeeName().textContent();
        expect(employee).toBe('');
        const status = await this.elements.status().textContent();
        expect(status).toBe('-- Select --');
    }
    async updateAccount(textTrial: string, newname: string) {
        await this.elements.adminMenu().click();
        await this.elements.editIcon(textTrial).click();
        await this.elements.usernameField().click();
        await this.elements.usernameField().fill(newname);
        await this.elements.submitBtn().click();
        await this.elements.successToast().waitFor({ state: 'visible', timeout: 20000 });
    }
    async verifyUpdateAccount(updatetext: string) {
        await this.page.route(`${process.env.SEARCH_URL}`, async (route) => {
            const response = await route.fetch();
            expect(response.status()).toBe(200);
        });
        await this.page.waitForTimeout(4000);
        await expect(this.elements.updatedAccount(updatetext)).toBeVisible({ timeout: 10000 });
    }
    async removeAccount(text: string) {
        await this.elements.adminMenu().click();
        await this.elements.deleteIcon(text).click();
        await this.elements.confirmDeleteBtn().click();
        await this.elements.successToast().waitFor({ state: 'visible', timeout: 10000 });
    }
    async verifyRemoveAccount(updatetext: string) {
        await this.page.route(`${process.env.SEARCH_URL}`, async (route) => {
            const response = await route.fetch();
            expect(response.status()).toBe(200);
        });
        await this.page.waitForTimeout(3000);
        await expect(this.elements.updatedAccount(updatetext)).toBeHidden({ timeout: 10000 });
    }
    async removeMultiAccount(text: string) {
        await this.elements.adminMenu().click();
        // get all checkbox
        const checkboxes = this.elements.checkBox(text);
        // Click each checkbox
        await checkboxes.first().click(); // or .nth(0)()
        await checkboxes.last().click();  // or .nth(1)
        await this.elements.deleteMultiBtn().click();
        await this.elements.confirmDeleteBtn().click();
        await this.elements.successToast().waitFor({ state: 'visible', timeout: 20000 });
    }
    async verifyRemoveMultiAccount(text: string) {
        await this.page.route(`${process.env.SEARCH_URL}`, async (route) => {
            const response = await route.fetch();
            expect(response.status()).toBe(200);
        });
        await expect(this.elements.newUser(text)).toBeHidden();
    }
    async enterValueOnFields(validation: string, text: string) {
        await this.elements.adminMenu().click();
        await this.elements.addBtn().click();
        await this.elements.inputField(validation).fill(text);
        await this.elements.submitBtn().click();
    }
    async verifyValidationMessage(validation: string, text: string) {
        await expect(this.elements.validationMessage(validation)).toHaveText(text);
    }
    async enterValueOnDropdownFields() {
        await this.elements.adminMenu().click();
        await this.elements.addBtn().click();
        await this.elements.submitBtn().click();
    }
    async enterValueOnConfirmPass(text1: string, text2: string) {
        await this.elements.adminMenu().click();
        await this.elements.addBtn().click();
        await this.elements.passwordField().fill(text1);
        await this.elements.confirmPassword().fill(text2);
        await this.elements.submitBtn().click();
    }
}