import { Page, expect} from "@playwright/test";
import path from "path";
import { faker } from "@faker-js/faker";
import fs from 'fs-extra';
import dotenv from "dotenv";
import { E } from "@faker-js/faker/dist/airline-BnpeTvY9";
dotenv.config();

let flexibleData: string = "";

let employee: any;

export default class addEmployeePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  elements = {
    PIMSection: () => this.page.locator('//span[text()="PIM"]'),
    addEmployeeTab: () => this.page.locator('//a[text()="Add Employee"]'),
    mainTitle: () => this.page.locator('//h6[@class="oxd-text oxd-text--h6 orangehrm-main-title" and text()="Add Employee"]'),
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
    //Employee list
    listPageMainTitle: () => this.page.locator('//h6[text()="Personal Details"]'),
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
    employee.firstName = firstName+faker.number.int(1000);
    employee.middleName = middleName+faker.lorem.word(3);
    employee.lastName = lastName+faker.color.human();
    employee.employeeId = employeeId+faker.number.int(10000).toString();
    await this.elements.firstNameInput().fill(employee.firstName);
    await this.elements.middleNameInput().fill(employee.middleName);
    await this.elements.lastNameInput().fill(employee.lastName);
    await this.elements.employeeIdInput().fill(employee.employeeId);
  }
  async updateAvatar(){
    const uploadsDir = path.join(__dirname, "dataToUpload/H1_Avatar.jpg");
    await this.elements.importImage().setInputFiles(uploadsDir);
    await this.elements.importImage().waitFor();
    //Verify
    employee.changedSrc = await this.elements.importImage().getAttribute('src');
    expect(employee.changedSrc).not.toEqual(this.elements.initialSrc());
  }
  async clickSaveButton(){
    await this.elements.saveBtn().click()
  }
  async verifyEmployeeAdded(){
    await expect(this.elements.successToast()).toBeVisible();
    await this.elements.listPageMainTitle().isVisible();
    await expect(this.elements.listPageMainTitle()).toBeVisible();
    expect(this.elements.firstNameInput().inputValue()).toEqual(employee.firstName);
    expect(this.elements.middleNameInput().inputValue()).toEqual(employee.middleName);
    expect(this.elements.lastNameInput().inputValue()).toEqual(employee.lastName);
    expect(this.elements.employeeIdInput().inputValue()).toEqual(employee.employeeId);
    expect(employee.changedSrc).not.toEqual(this.elements.initialSrc());
  }




}