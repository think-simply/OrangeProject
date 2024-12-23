import { Page, Locator, expect } from "@playwright/test";

export default class SocialMediaPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    elements = {
        adminMenu: () => this.page.locator('//span[text()="Admin"]'),
        addBtn: () => this.page.locator('//button[normalize-space()="Add"]'),
        configurationSubMenu: () => this.page.locator('//span[normalize-space()="Configuration"]'),
        socialMediaAuthenSubMenu: () => this.page.locator('//a[normalize-space()="Social Media Authentication"]'),
        pageTitle: () => this.page.locator('//h6[text()="Provider List"]'),
        checkBox: () => this.page.locator('//div[text()="Name"]//parent::div//descendant::input[@type="checkbox"]'),
        nameColumn: () => this.page.locator('//div[text()="Name"]'),
        actionColumn: () => this.page.locator('//div[text()="Actions"]'),
        nameTextBox: () => this.page.locator('//label[normalize-space()="Name"]//ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//descendant::input'),
        providerUrl: () => this.page.locator('//label[normalize-space()="Provider URL"]//ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//descendant::input'),
        clientID: () => this.page.locator('//label[normalize-space()="Client ID"]//ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//descendant::input'),
        clientSecret: () => this.page.locator('//label[normalize-space()="Client Secret"]//ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//descendant::input'),
        saveBtn: () => this.page.locator('//button[@type="submit"]'),
        successToast: () => this.page.locator('//div[@class="oxd-toast-container oxd-toast-container--bottom"]//p[text()="Success"]'),
        newProvider: (text: string) => this.page.locator(`//div[text()="${text}"]`),
        editIcon: (text: string) => this.page.locator(`//div[text()="${text}"]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-pencil-fill"]`),
        updatedProvider: (text: string) => this.page.locator(`//div[text()="${text}"]`),
        deleteIcon: (text: string) => this.page.locator(`//div[text()="${text}"]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-trash"]`),
        confirmDeleteBtn: () => this.page.locator("//button[normalize-space()='Yes, Delete']"),
        checkbox1: (text: string) => this.page.locator(`//div[text()="${text}"]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-check oxd-checkbox-input-icon"]`),
        checkbox2: (text: string) => this.page.locator(`//div[text()="${text}"]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-check oxd-checkbox-input-icon"]`),
        deleteMultiBtn: () => this.page.locator("//button[normalize-space()='Delete Selected']"),
    }
    async accessSocialMediaAuthPage() {
        await this.elements.adminMenu().click();
        await this.elements.configurationSubMenu().click();
        await this.elements.socialMediaAuthenSubMenu().click();
    }
    async afterAcccessSocialMediaAuthPage() {
        await expect(this.elements.pageTitle()).toBeVisible();
        await expect(this.elements.addBtn()).toBeEnabled();
        await expect(this.elements.checkBox()).toBeVisible();
        await expect(this.elements.nameColumn()).toBeVisible();
        await expect(this.elements.actionColumn()).toBeVisible();
    }
    async createProvider() {
        await this.elements.addBtn().waitFor({ state: 'visible', timeout: 10000 });
        await this.elements.addBtn().click();
        await this.elements.nameTextBox().fill("provider1");
        await this.elements.providerUrl().fill("https://docs.google.com/spreadsheets/d/1YDePnz81KkzMfhZ0rkq_OyK2MgP_dL_XpSn7adSiz0Q/edit?gid=0#gid=0");
        await this.elements.clientID().fill("123");
        await this.elements.clientSecret().fill("123");
        await this.elements.saveBtn().click();
    }
    async afterCreateProvider(text:string) {
        await this.elements.successToast().waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.elements.newProvider(text)).toBeVisible();
    }
    async updateProvider(text:string) {
        await this.elements.editIcon(text).click();
        await this.elements.nameTextBox().fill("provider2");
        await this.elements.providerUrl().fill("https://docs.google.com/spreadsheets");
        await this.elements.clientID().fill("123");
        await this.elements.clientSecret().fill("123");
        await this.elements.saveBtn().click();
    }
    async afterUpdateProvider(text:string) {
        await this.elements.successToast().waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.elements.updatedProvider(text)).toBeVisible();
    }
    async deleteProvider(text:string) {
        await this.elements.deleteIcon(text).click();
        await this.elements.confirmDeleteBtn().click();
    }
    async afterDeleteProvider(text:string) {
        await this.elements.successToast().waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.elements.updatedProvider(text)).toBeHidden();
    }
    async deleteMultiProvider(text:string) {
        if (!await this.elements.checkbox1(text).isVisible()) {
            await this.createProvider()
            await this.elements.successToast().waitFor({ state: 'visible', timeout: 10000 });
        }
        if (!await this.elements.checkbox2(text).isVisible()) {
            await this.elements.addBtn().click();
            await this.elements.nameTextBox().fill("provider2");
            await this.elements.providerUrl().fill("https://docs.google.com/spreadsheets");
            await this.elements.clientID().fill("123");
            await this.elements.clientSecret().fill("123");
            await this.elements.saveBtn().click();
            await this.elements.successToast().waitFor({ state: 'visible', timeout: 10000 });
        }
        await this.elements.checkbox1(text).click();
        await this.elements.checkbox2(text).click();
        await this.elements.deleteMultiBtn().click();
        await this.elements.confirmDeleteBtn().click();
    }
    async afterDeleteMultiProvider(text:string) {
        await this.elements.successToast().waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.elements.newProvider(text)).toBeHidden();
        await expect(this.elements.checkbox2(text)).toBeHidden();
    }
}