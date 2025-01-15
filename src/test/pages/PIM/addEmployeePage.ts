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
    addEmployeeTab: () => this.page.locator('//a[text()="Add Employee"]'),
    mainTitle: () => this.page.locator('//h6[@class="oxd-text oxd-text--h6 orangehrm-main-title" and text()="Add Employee"]'),
    listPageMainTitle: () => this.page.locator('//h6[text()="Personal Details"]'),
    imageArea: () => this.page.locator('div.orangehrm-employee-image'),
    importImage: () => this.page.locator('img.employee-image'),
    initialSrc: () => "/orangehrm/web/images/default-photo.png",
    firstNameInput: () => this.page.locator('input[name="firstName"]'),
    middleNameInput: () => this.page.locator('input[name="middleName"]'),
    lastNameInput: () => this.page.locator('input[name="lastName"]'),
    employeeIdInput: () => this.page.locator('//label[text()="Employee Id"]/parent::div/following-sibling::div/input'),
    createDetailToggle: () => this.page.locator('input[type="checkbox"]'),
    saveBtn: () => this.page.locator('button[type="submit"]'),
    usernameInput: () => this.page.locator('//label[text()="Username"]/parent::div/following-sibling::div/input'),
    enableRadio: () => this.page.locator('input[type="radio"][value="1"]'),
    disableRadio: () => this.page.locator('input[type="radio"][value="2"]'),
    passwordInput: () => this.page.locator('//label[text()="Password"]/parent::div/following-sibling::div/input'),
    confirmPasswordInput: () => this.page.locator('//label[text()="Confirm Password"]/parent::div/following-sibling::div/input'),
    successToast: () => this.page.locator('//p[text()="Successfully Saved"]'),
    //name: () => this.page.locator(''),
  }
  async navigate() {
    await this.page.goto(`${process.env.WEB_URL}`);
    await this.elements.PIMSection().click();
    await this.elements.addEmployeeTab().click();
  }
  async checkUI(){
    await expect(this.elements.mainTitle()).toBeVisible();
    await expect(this.elements.imageArea()).toBeVisible();
    await expect(this.elements.createDetailToggle()).toBeVisible();
  }
  async inputValidData(firstName: string, middleName: string, lastName:string, employeeId: number){
    await this.elements.firstNameInput().fill(firstName+faker.number.int(1000));
    await this.elements.middleNameInput().fill(middleName+faker.lorem.word(3));
    await this.elements.lastNameInput().fill(lastName+faker.color.human());
    await this.elements.employeeIdInput().fill(employeeId+faker.number.int(10000).toString());
  }
  async updateAvatar(){
    const uploadsDir = path.join(__dirname, "dataToUpload/H1_Avatar.jpg");
    await this.elements.importImage().setInputFiles(uploadsDir);
    await this.elements.importImage().waitFor();
    //Verify
    const changedSrc = await this.elements.importImage().getAttribute('src');
    expect(changedSrc).not.toEqual(this.elements.initialSrc());
  }
  async clickSaveButton(){
    await this.elements.saveBtn().click()
  }
  async verifyEmployeeAdded(){
    await expect(this.elements.successToast()).toBeVisible();
    //check all values are display successfully
  }




}