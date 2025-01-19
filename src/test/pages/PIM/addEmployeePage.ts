import { Locator, Page, expect} from "@playwright/test";
import path from "path";
//import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
dotenv.config();

let flexibleData: string = "";

let employee = { 
  firstName: '', 
  middleName: '', 
  lastName: '', 
  employeeId: '',
  username: '', 
  password: '', 
  confirmPassword: '',
  changedSrc: ''
};

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
    importImage: () => this.page.locator('input[type="file"]'),
    avatarSrc: () => this.page.locator('img.employee-image'),
    initialSrc: () => "/orangehrm/web/images/default-photo.png",
    firstNameInput: () => this.page.locator('input[name="firstName"]'),
    middleNameInput: () => this.page.locator('input[name="middleName"]'),
    lastNameInput: () => this.page.locator('input[name="lastName"]'),
    employeeIdInput: () => this.page.locator('//label[text()="Employee Id"]/parent::div/following-sibling::div/input'),
    createDetailToggle: () => this.page.locator('//input[@type="checkbox"]/following::span'),
    saveBtn: () => this.page.locator('button[type="submit"]'),
    usernameInput: () => this.page.locator('//label[text()="Username"]/parent::div/following-sibling::div/input'),
    enableRadio: () => this.page.locator('input[type="radio"][value="1"]+span'),
    disableRadio: () => this.page.locator('input[type="radio"][value="2"]+span'),
    passwordInput: () => this.page.locator('//label[text()="Password"]/parent::div/following-sibling::div/input'),
    confirmPasswordInput: () => this.page.locator('//label[text()="Confirm Password"]/parent::div/following-sibling::div/input'),
    successToast: () => this.page.locator('//p[text()="Successfully Saved"]'),
    //Employee list
    listPageMainTitle: () => this.page.locator('//h6[text()="Personal Details"]'),
    tableInfor: () => this.page.locator('div.orangehrm-edit-employee-content input.oxd-input'),
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
  async inputValidData(firstName: string, middleName: string, lastName:string, employeeId: string){
    employee.firstName = firstName
    //+faker.number.int(1000);
    employee.middleName = middleName
    //+faker.lorem.word(3);
    employee.lastName = lastName
    //+faker.color.human();
    employee.employeeId = employeeId
    //+faker.number.int(100);
    await this.elements.firstNameInput().fill(employee.firstName);
    await this.elements.middleNameInput().fill(employee.middleName);
    await this.elements.lastNameInput().fill(employee.lastName);
    await this.elements.employeeIdInput().fill(employee.employeeId);
  }
  async updateAvatar(){
    const uploadsDir = path.join(__dirname, "dataToUpload/H1_Avatar.jpg");
    await this.elements.importImage().setInputFiles(uploadsDir);
    //Verify
    await this.elements.avatarSrc().waitFor();
    employee.changedSrc = await this.elements.avatarSrc().getAttribute('src');
    expect(employee.changedSrc).not.toEqual(this.elements.initialSrc());
  }
  async clickSaveButton(){
    await this.elements.saveBtn().click()
  }
  async verifyValue(fieldName: Locator, targetValue: String){
    await expect(fieldName).not.toHaveValue("");
    expect(await fieldName.inputValue()).toEqual(targetValue);
  }
  async verifyEmployeeAdded(){
    await expect(this.elements.successToast()).toBeVisible();
    await this.elements.listPageMainTitle().isVisible();
    //await this.elements.tableInfor().nth(0).waitFor();
    await expect(this.elements.listPageMainTitle()).toBeVisible();
    await this.verifyValue(this.elements.firstNameInput(),employee.firstName);
    await this.verifyValue(this.elements.middleNameInput(),employee.middleName);
    await this.verifyValue(this.elements.lastNameInput(),employee.lastName);
    await this.verifyValue(this.elements.employeeIdInput(),employee.employeeId);
    expect(employee.changedSrc).not.toEqual(this.elements.initialSrc());
  }
  async clickCreateLoginDetailsButton(){
    await this.elements.createDetailToggle().click();
  }
  async inputValidDataDetail(
    firstName: string, 
    middleName: string, 
    lastName: string, 
    employeeId: string, 
    username: string, 
    password: string, 
    ){
    //Create new data
    await this.inputValidData(firstName, middleName, lastName, employeeId);
    employee.username=username
    //+faker.lorem.word(5);
    employee.password=password
    //+faker.lorem.word(3)+faker.number.int(1000);
    employee.confirmPassword=employee.password;
    await this.elements.usernameInput().fill(employee.username);
    await this.elements.passwordInput().fill(employee.password);
    await this.elements.confirmPasswordInput().fill(employee.confirmPassword);
    //Select random status radio
    //Math.random(): returned random ex:0.123, 0.678, ...)
    //() ?(true) :(false)the same as if(true) else(false)
    const randomRadio = Math.random() < 1/2 ? this.elements.enableRadio() : this.elements.disableRadio();
    await randomRadio.click();
  }
}