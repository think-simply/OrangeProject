import { Page, Locator, expect } from "@playwright/test";
import dotenv from 'dotenv';
dotenv.config();

export default class AdminMenuPage {
    readonly page: Page;
    readonly userName: Locator;
    readonly passWord: Locator;
    readonly loginBtn: Locator;
    readonly adminMenu: Locator;
    readonly addBtn: Locator;
    readonly userRole: Locator;
    readonly status: Locator;
    readonly employeeName: Locator;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly confirmPassword: Locator;
    readonly submitBtn: Locator;
    readonly userRoleOption: Locator;
    readonly statusOption: Locator;
    readonly employeeOption: Locator;
    readonly newEssUser: Locator;
    readonly messageSuccess: Locator;
    readonly userManagement: Locator;
    readonly titlePage: Locator;
    readonly usernameLabel: Locator;
    readonly resetBtn: Locator;
    readonly searchBtn: Locator;
    readonly addUserBtn: Locator;
    readonly usernameColumn: Locator;
    readonly userRoleColumn: Locator;
    readonly employeeNameColumn: Locator;
    readonly statusColumn: Locator;
    readonly actionColumn: Locator;
    readonly checkBox: Locator;
    readonly userRoleLabel: Locator;
    readonly employeeNameLabel: Locator;
    readonly statusLabel: Locator;
    readonly adminRoleOption: Locator;
    readonly newAdminUser: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator('//input[@placeholder="Username"]');
        this.passWord = page.locator('//input[@placeholder="Password"]');
        this.loginBtn = page.locator('//button[@type="submit"]');
        this.adminMenu = page.locator('//span[text()="Admin"]');
        this.addBtn = page.locator('//button[normalize-space()="Add"]');
        this.userRole = page.locator('//label[text()="User Role"]//ancestor::div[contains(@class,"oxd-grid-item--gutters")]//descendant::div[@class="oxd-select-wrapper"]')
        this.status = page.locator('//label[text()="Status"]//ancestor::div[contains(@class,"oxd-grid-item--gutters")]//descendant::div[@class="oxd-select-wrapper"]')
        this.employeeName = page.locator('//input[@placeholder="Type for hints..."]')
        this.usernameField = page.locator('//label[normalize-space()="Username"]//ancestor::div[@class="oxd-grid-item oxd-grid-item--gutters"]//descendant::input[@class="oxd-input oxd-input--active"]')
        this.passwordField = page.locator('//div[contains(@class,"user-password-cell")]//descendant::input[@type="password"]')
        this.confirmPassword = page.locator('//label[normalize-space()="Confirm Password"]//ancestor::div[@class="oxd-grid-item oxd-grid-item--gutters"]//descendant::input[@type="password"]')
        this.submitBtn = page.locator('//button[@type="submit"]')
        this.userRoleOption = page.getByRole('option', { name: 'ESS' })
        this.adminRoleOption = page.getByRole('option', { name: 'Admin' })
        this.statusOption = page.getByRole('option', { name: 'Enabled' })
        this.employeeOption = page.getByRole('option', { name: 'Timothy Lewis Amiano' })
        this.newEssUser = page.locator('//div[text()="usernamenttheu"]')
        this.newAdminUser = page.locator('//div[text()="usernamenttheuAdmin"]')
        this.messageSuccess = page.locator('//div[@class="oxd-toast-container oxd-toast-container--bottom"]//p[text()="Success"]')
        this.userManagement = page.locator('//span[normalize-space()="User Management"]')
        this.titlePage = page.locator('//h5[text()="System Users"]')
        this.usernameLabel= page.locator('//label[text()="Username"]')
        this.userRoleLabel= page.locator('//label[text()="Username"]')
        this.employeeNameLabel= page.locator('//label[text()="Username"]')
        this.statusLabel= page.locator('//label[text()="Username"]')
        this.resetBtn= page.locator('//button[normalize-space()="Reset"]')
        this.searchBtn = page.locator('//button[@type="submit"]')
        this.addUserBtn = page.locator('//button[normalize-space()="Add"]')  
        this.checkBox = page.locator('//div[text()="Username"]//parent::div//descendant::input[@type="checkbox"]')
        this.userRoleColumn = page.locator('//div[text()="Username"]')
        this.usernameColumn = page.locator('//div[text()="User Role"]')
        this.employeeNameColumn = page.locator('//div[text()="Employee Name"]')
        this.statusColumn = page.locator('//div[text()="Status"]')
        this.actionColumn = page.locator('//div[text()="Actions"]')

    }
    async visit() {
        await this.page.goto(`${process.env.WEB_URL}`);
    }
    async login() {
        await this.userName.fill("Admin");
        await this.passWord.fill("admin123");
        await this.loginBtn.click();
    }
    async accessUserPage(){
        await this.adminMenu.click();
        await this.userManagement.click();
    }
    async afterAccessUserPage(){
        await expect(this.titlePage).toBeVisible();
        await expect(this.usernameLabel).toBeVisible();
        await expect(this.usernameField).toBeEditable();
        await expect(this.userRoleLabel).toBeVisible();
        await expect(this.userRole).toBeVisible();
        await expect(this.employeeNameLabel).toBeVisible();
        await expect(this.employeeName).toBeEditable()
        await expect(this.statusLabel).toBeVisible();
        await expect(this.status).toBeVisible();
        await expect(this.resetBtn).toBeVisible();
        await expect(this.searchBtn).toBeVisible();
        await expect(this.addUserBtn).toBeVisible();
        await expect(this.checkBox).toBeVisible();
        await expect(this.usernameColumn).toBeVisible();
        await expect(this.userRoleColumn).toBeVisible();
        await expect(this.employeeNameColumn).toBeVisible();
        await expect(this.statusColumn).toBeVisible();
        await expect(this.actionColumn).toBeVisible();
    }
    
    async createEssUser() {
        //employee: string, username: string, pass: string, confirm: string
        await this.adminMenu.click();
        await this.addBtn.click();
        await this.userRole.click();
        await this.userRoleOption.click();
        await this.status.click();
        await this.statusOption.click();
        await this.employeeName.fill("t");
        await this.employeeOption.click();
        await this.usernameField.fill("usernamenttheu");
        await this.passwordField.fill("admin123");
        await this.confirmPassword.fill("admin123");
        await this.submitBtn.click();

    }
    async afterCreateEssUser() {
        await this.page.waitForSelector('//div[@class="oxd-toast-container oxd-toast-container--bottom"]//p[text()="Success"]');
        await expect(this.newEssUser).toBeVisible();
    }
    async createAdminUser() {
        //employee: string, username: string, pass: string, confirm: string
        await this.adminMenu.click();
        await this.addBtn.click();
        await this.userRole.click();
        await this.adminRoleOption.click();
        await this.status.click();
        await this.statusOption.click();
        await this.employeeName.fill("t");
        await this.employeeOption.click();
        await this.usernameField.fill("usernamenttheuAdmin");
        await this.passwordField.fill("admin123");
        await this.confirmPassword.fill("admin123");
        await this.submitBtn.click();

    }
    async afterCreateAdminUser() {
        await this.page.waitForSelector('//div[@class="oxd-toast-container oxd-toast-container--bottom"]//p[text()="Success"]');
        await expect(this.newAdminUser).toBeVisible();
    }

    async searchUserName() {
        //employee: string, username: string, pass: string, confirm: string
        await this.adminMenu.click();
        await this.addBtn.click();
        await this.userRole.click();
        await this.adminRoleOption.click();
        await this.status.click();
        await this.statusOption.click();
        await this.employeeName.fill("t");
        await this.employeeOption.click();
        await this.usernameField.fill("usernamenttheuAdmin");
        await this.passwordField.fill("admin123");
        await this.confirmPassword.fill("admin123");
        await this.submitBtn.click();

    }
    async afterSearchUserName() {
        await this.page.waitForSelector('//div[@class="oxd-toast-container oxd-toast-container--bottom"]//p[text()="Success"]');
        await expect(this.newAdminUser).toBeVisible();
    }

}