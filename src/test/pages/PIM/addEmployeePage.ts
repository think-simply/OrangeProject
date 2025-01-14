import { Page, expect} from "@playwright/test";
import path from "path";
import { faker } from "@faker-js/faker";
import fs from 'fs-extra';
import dotenv from "dotenv";
dotenv.config();

let flexibleData: string = "";

export default class addEmployeePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  elements = {
    PIMSection: () => this.page.locator('//span[text()="PIM"]'),
    addEmployeeTab: () => this.page.locator(''),
    //name: () => this.page.locator(''),
    //name: () => this.page.locator(''),
    //name: () => this.page.locator(''),
    //name: () => this.page.locator(''),
    //name: () => this.page.locator(''),
    //name: () => this.page.locator(''),
    //name: () => this.page.locator(''),
    //name: () => this.page.locator(''),
    //name: () => this.page.locator(''),
    //name: () => this.page.locator(''),
    //name: () => this.page.locator(''),


  }
  async navigate() {
    await this.page.goto(`${process.env.WEB_URL}`);
    await this.elements.PIMSection().click();
    await this.elements.addEmployeeTab().click();
  }




}