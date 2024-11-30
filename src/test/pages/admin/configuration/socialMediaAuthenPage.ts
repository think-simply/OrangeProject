import { Page, Locator, expect } from "@playwright/test";
import dotenv from 'dotenv';
dotenv.config();
const axios = require('axios');

export default class AdminMenuPage {
    readonly page: Page;
    readonly userName: Locator;
    readonly passWord: Locator;
    readonly loginBtn: Locator;
    readonly adminMenu: Locator;
    readonly addBtn: Locator;
    readonly configurationSubMenu: Locator;
    readonly socialMediaAuthenSubMenu: Locator;
    readonly pageTitle: Locator;
    readonly checkBox: Locator;
    readonly nameColumn: Locator;
    readonly actionColumn: Locator;
    readonly nameTextBox: Locator;
    readonly providerUrl: Locator;
    readonly clientID : Locator;
    readonly clientSecret: Locator;
    readonly saveBtn: Locator;
    readonly successToast: Locator;
    readonly newProvider: Locator;
    readonly editIcon: Locator;
    readonly updatedProvider: Locator;
    readonly deleteIcon: Locator;
    readonly confirmDeleteBtn: Locator;
    readonly checkbox1: Locator;
    readonly checkbox2: Locator;
    readonly deleteMultiBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator('//input[@placeholder="Username"]');
        this.passWord = page.locator('//input[@placeholder="Password"]');
        this.loginBtn = page.locator('//button[@type="submit"]');
        this.adminMenu = page.locator('//span[text()="Admin"]');
        this.addBtn = page.locator('//button[normalize-space()="Add"]');
        this.configurationSubMenu = page.locator('//span[normalize-space()="Configuration"]')
        this.socialMediaAuthenSubMenu = page.locator('//a[normalize-space()="Social Media Authentication"]');
        this.pageTitle = page.locator('//h6[text()="Provider List"]');
        this.checkBox = page.locator('//div[text()="Name"]//parent::div//descendant::input[@type="checkbox"]');
        this.nameColumn = page.locator('//div[text()="Name"]');
        this.actionColumn = page.locator('//div[text()="Actions"]');
        this.nameTextBox = page.locator('//label[normalize-space()="Name"]//ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//descendant::input')
        this.providerUrl = page.locator('//label[normalize-space()="Provider URL"]//ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//descendant::input')
        this.clientID = page.locator('//label[normalize-space()="Client ID"]//ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//descendant::input')
        this.clientSecret = page.locator('//label[normalize-space()="Client Secret"]//ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//descendant::input')
        this.saveBtn = page.locator('//button[@type="submit"]')
        this.successToast = page.locator('//div[@class="oxd-toast-container oxd-toast-container--bottom"]//p[text()="Success"]');
        this.newProvider = page.locator('//div[text()="provider1"]');
        this.editIcon = page.locator('//div[text()="provider1"]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-pencil-fill"]')
        this.updatedProvider = page.locator('//div[text()="provider2"]')
        this.deleteIcon = page.locator('//div[text()="provider2"]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-trash"]')
        this.confirmDeleteBtn = page.locator("//button[normalize-space()='Yes, Delete']")
        this.checkbox1 = page.locator('//div[text()="provider1"]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-check oxd-checkbox-input-icon"]')
        this.checkbox2 = page.locator('//div[text()="provider2"]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-check oxd-checkbox-input-icon"]')
        this.deleteMultiBtn = page.locator("//button[normalize-space()='Delete Selected']")

    }

    async accessSocialMediaAuthPage() {
        await this.adminMenu.click();
        await this.configurationSubMenu.click();
        await this.socialMediaAuthenSubMenu.click();
    }

    async afterAcccessSocialMediaAuthPage() {
        await expect(this.pageTitle).toBeVisible();
        await expect(this.addBtn).toBeEnabled();
        await expect(this.checkBox).toBeVisible();
        await expect(this.nameColumn).toBeVisible();
        await expect(this.actionColumn).toBeVisible();
    }

    async createProvider() {
        await this.addBtn.click();
        await this.nameTextBox.fill("provider1");
        await this.providerUrl.fill("https://docs.google.com/spreadsheets/d/1YDePnz81KkzMfhZ0rkq_OyK2MgP_dL_XpSn7adSiz0Q/edit?gid=0#gid=0");
        await this.clientID.fill("123");
        await this.clientSecret.fill("123");
        await this.saveBtn.click();
    }

    async afterCreateProvider() {
        await this.successToast.waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.newProvider).toBeVisible();
    }

    async updateProvider() {
        await this.editIcon.click();
        await this.nameTextBox.fill("provider2");
        await this.providerUrl.fill("https://docs.google.com/spreadsheets/d/1YDePnz81KkzMfhZ0rkq_OyK2MgP_dL_XpSn7adSiz0Q/edit?gid=0#gid=0");
        await this.clientID.fill("123");
        await this.clientSecret.fill("123");
        await this.saveBtn.click();
    }

    async afterUpdateProvider() {
        await this.successToast.waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.updatedProvider).toBeVisible();
    }

    async deleteProvider() {
        await this.deleteIcon.click();
        await this.confirmDeleteBtn.click();
    }

    async afterDeleteProvider() {
        await this.successToast.waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.updatedProvider).toBeHidden();
    }

    async addProvider2() {
        await this.addBtn.click();
        await this.nameTextBox.fill("provider2");
        await this.providerUrl.fill("https://docs.google.com/spreadsheets/d/1YDePnz81KkzMfhZ0rkq_OyK2MgP_dL_XpSn7adSiz0Q/edit?gid=0#gid=0");
        await this.clientID.fill("123");
        await this.clientSecret.fill("123");
        await this.saveBtn.click();
    }
    async deleteMultiProvider() {
        await this.checkbox1.click();
        await this.checkbox2.click();
        await this.deleteMultiBtn.click();
        await this.confirmDeleteBtn.click();
    }

    async afterDeleteMultiProvider() {
        await this.successToast.waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.checkbox1).toBeHidden();
        await expect(this.checkbox2).toBeHidden();
    }

}