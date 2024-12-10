import { Page, Locator, expect } from "@playwright/test";
//import { log } from "console";
//import exp from "constants";
import dotenv from "dotenv";
dotenv.config();

let updatedData: string = "";

export default class LocationsAdminPage {
  readonly page: Page;
  readonly adminSection: Locator;
  readonly organizationItem: Locator;
  //-------------------
  readonly userName: Locator;
  readonly passWord: Locator;
  readonly loginBtn: Locator;
  readonly locationsItem: Locator;
  readonly localtionsLabel: Locator;
  readonly nameInput: Locator;
  readonly cityInput: Locator;
  readonly countryDropdown: Locator;
  readonly VNOption: Locator;
  readonly cityColumnData: Locator;
  readonly nameColumnData: Locator;
  readonly contryColumnData: Locator;
  readonly addName: Locator;
  readonly addCountryList: Locator;
  readonly addNotes: Locator;
  readonly expectedCity: string;
  readonly uniqueName: string;
  readonly expectedName: string;
  readonly expectedCountry: string;
  readonly editIcon: Locator;
  readonly editLocationTitle: Locator;
  readonly deleteIcon: Locator;
  readonly deletePopup: Locator;
  readonly yesDeleteBtn: Locator;
  readonly deleteSuccessMessage: Locator;
  readonly singleCheckbox: Locator;
  readonly deleteBtn: Locator;
  //-----------------
  readonly addBtn: Locator;
  readonly saveBtn: Locator;
  readonly successToast: Locator;
  readonly searchBtn: Locator;
  readonly noResultsToast: Locator;
  readonly noResultsText: Locator;
  readonly tableLocations: string;
  readonly tableBodyLocations: Locator;

  constructor(page: Page) {
    this.page = page;
    this.expectedCity = "new";
    this.uniqueName = this.generateRandomName(5);
    this.expectedName = "New York Sales Office";
    this.expectedCountry = "Viet Nam";
    this.tableLocations = "div.orangehrm-container";
    this.userName = page.locator('//input[@name="username"]');
    this.passWord = page.locator('//input[@name="password"]');
    this.loginBtn = page.locator('//button[@type="submit"]');
    this.adminSection = page.locator('//span[text()="Admin"]');
    this.organizationItem = page.locator('//span[text()="Organization "]');
    this.locationsItem = page.locator('//a[text()="Locations"]');
    this.localtionsLabel = page.locator('//h5[text()="Locations"]');
    this.nameInput = page.locator('//label[text()="Name"]//parent::div//following-sibling::div/input'
    );
    this.cityInput = page.locator('//label[text()="City"]//parent::div//following-sibling::div/input'
    );
    this.countryDropdown = page.locator("div.oxd-select-text");
    this.VNOption = page.locator('//span[text()="Viet Nam"]');
    this.searchBtn = page.locator('button[type="submit"]');
    this.noResultsToast = page.locator("div.oxd-toast--info");
    this.noResultsText = page.locator('//span[text()="No Records Found"]');
    this.tableBodyLocations = page.locator("div.oxd-table-body");
    this.nameColumnData = page.locator(
      "div.oxd-table-card div.oxd-padding-cell:nth-child(2)"
    );
    this.cityColumnData = page.locator(
      "div.oxd-table-card div.oxd-padding-cell:nth-child(3)"
    );
    this.contryColumnData = page.locator(
      "div.oxd-table-card div.oxd-padding-cell:nth-child(4)"
    );
    this.addBtn = page.locator("div.orangehrm-header-container button");
    this.addName = page.locator(
      '//label[text()="Name"]//parent::div/following-sibling::div/input'
    );
    this.addCountryList = page.locator("div.oxd-select-text-input");
    this.addNotes = page.locator(
      '//label[text()="Notes"]//parent::div/following-sibling::div/textarea'
    );
    this.saveBtn = page.locator('button[type="submit"]');
    this.successToast = page.locator("div.oxd-toast--success");
    this.editIcon = page.locator("button i.bi-pencil-fill");
    this.editLocationTitle = page.locator('//h6[text()="Edit Location"]');
    this.deleteIcon = page.locator("button i.bi-trash");
    this.deletePopup = page.locator("div.orangehrm-dialog-popup");
    this.yesDeleteBtn = page.locator('//button[text()=" Yes, Delete "]');
    this.deleteSuccessMessage = page.locator(
      '//div[@class="oxd-toast-content oxd-toast-content--success"]/p[text()="Successfully Deleted"]'
    );
    this.singleCheckbox = page.locator("div.oxd-table-card-cell-checkbox");
    this.deleteBtn = page.locator('//button[text()=" Delete Selected "]');
  }
  generateRandomName(length: number): string {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomName = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomName += characters[randomIndex];
    }
    return randomName;
  }
  async visit() {
    await this.page.goto(`${process.env.WEB_URL}`);
  }
  async login() {
    //don't really need this
    await this.userName.fill("Admin");
    await this.passWord.fill("admin123");
    await this.loginBtn.click();
  }
  async accessOrganization() {
    await this.adminSection.click();
    await this.organizationItem.click();
  }
  async accessLocations() {
    await this.locationsItem.click();
  }
  async checkUILocations() {
    await expect(
      this.localtionsLabel,
      "Locations is not displaying!"
    ).toBeVisible();
  }
  async fillName() {
    await this.nameInput.fill(this.expectedName);
  }
  async checkName() {
    //Kiem tra xem loading icon da bien mat chua
    await this.page
      .waitForSelector("div.oxd-table-loader", {
        state: "detached",
        timeout: 5000,
      })
      .catch(() => null);
    // Kiểm tra nếu không có kết quả
    await this.page.waitForTimeout(1000);
    const hasRecordText = await this.noResultsText.isVisible();
    let isValidValue = true; //bien co the thay doi duoc
    // await this.page.waitForTimeout(1000);
    if (hasRecordText) {
      await this.page
        .waitForSelector("div.oxd-toast--info", { timeout: 5000 })
        .catch(() => null);
      expect(this.noResultsToast).toBeVisible();
      console.log(
        "Check No result about " + this.expectedName + " successfully"
      );
    } else {
      await this.page.waitForTimeout(1000);
      // Lấy tất cả các giá trị trong cột city
      //const cityColumn = this.cityColumnData;
      const rowCount = await this.nameColumnData.count();
      console.log("The number of rows is", rowCount);
      for (let i = 0; i < rowCount; i++) {
        const nameValue = await this.nameColumnData
          .nth(i)
          .first()
          .textContent();
        //nth: dùng để chọn phần tử thứ i (theo chỉ số, bắt đầu từ 0) trong nhóm các phần tử được cityColumn đại diện.
        console.log("NameValue:", nameValue);
        if (
          !nameValue
            ?.trim()
            .toLowerCase()
            .includes(this.expectedName.toLowerCase())
        ) {
          isValidValue = false;
          break; //neu chua 1 KQ sai thì dừng hẳn for
        }
      }
    }
    expect(isValidValue, "Error for searching City");
  }
  async fillCity() {
    await this.cityInput.fill(this.expectedCity);
  }
  async checkCity() {
    //Kiem tra xem loading icon da bien mat chua
    await this.page
      .waitForSelector("div.oxd-table-loader", {
        state: "detached",
        timeout: 5000,
      })
      .catch(() => null);
    // Kiểm tra nếu không có kết quả
    await this.page.waitForTimeout(1000);
    const hasRecordText = await this.noResultsText.isVisible();
    let isValidValue = true; //bien co the thay doi duoc
    // await this.page.waitForTimeout(1000);
    if (hasRecordText) {
      await this.page
        .waitForSelector("div.oxd-toast--info", { timeout: 5000 })
        .catch(() => null);
      expect(this.noResultsToast).toBeVisible();
      console.log("check No result successfully");
    } else {
      await this.page.waitForTimeout(1000);
      // Lấy tất cả các giá trị trong cột city
      const rowCount = await this.cityColumnData.count();
      console.log("The number of rows is", rowCount);
      for (let i = 0; i < rowCount; i++) {
        const cityValue = await this.cityColumnData
          .nth(i)
          .first()
          .textContent();
        //nth: dùng để chọn phần tử thứ i (theo chỉ số, bắt đầu từ 0) trong nhóm các phần tử được cityColumn đại diện.
        console.log("CityValue:", cityValue);
        if (
          !cityValue
            ?.trim()
            .toLowerCase()
            .includes(this.expectedCity.toLowerCase())
        ) {
          isValidValue = false;
          break; //neu chua 1 KQ sai thì dừng hẳn for
        }
      }
    }
    expect(isValidValue, "Error for searching City");
  }
  async selectCountry() {
    //await this.selectDropdownOption("div.oxd-select-text", "Viet Nam");
    //--> SelectOption chỉ dùng với Dropdownlist là có thẻ Select<>
    await this.countryDropdown.click();
    await this.VNOption.click();
  }
  async checkCountry() {
    //Kiem tra xem loading icon da bien mat chua
    await this.page
      .waitForSelector("div.oxd-table-loader", {
        state: "detached",
        timeout: 5000,
      })
      .catch(() => null);
    // Kiểm tra nếu không có kết quả
    await this.page.waitForTimeout(1000);
    const hasRecordText = await this.noResultsText.isVisible();
    let isValidValue = true; //bien co the thay doi duoc
    // await this.page.waitForTimeout(1000);
    if (hasRecordText) {
      await this.page
        .waitForSelector("div.oxd-toast--info", { timeout: 5000 })
        .catch(() => null);
      expect(this.noResultsToast).toBeVisible();
      console.log("check No result successfully");
    } else {
      await this.page.waitForTimeout(1000);
      // Lấy tất cả các giá trị trong cột city
      //const cityColumn = this.cityColumnData;
      const rowCount = await this.contryColumnData.count();
      console.log("The number of rows is", rowCount);
      for (let i = 0; i < rowCount; i++) {
        const countryValue = await this.contryColumnData
          .nth(i)
          .first()
          .textContent();
        //nth: dùng để chọn phần tử thứ i (theo chỉ số, bắt đầu từ 0) trong nhóm các phần tử được cityColumn đại diện.
        console.log("CountryValue:", countryValue);
        if (
          !countryValue
            ?.trim()
            .toLowerCase()
            .includes(this.expectedCity.toLowerCase())
        ) {
          isValidValue = false;
          break; //neu chua 1 KQ sai thì dừng hẳn for
        }
      }
    }
    expect(isValidValue, "Error for searching Country");
  }
  async searchClick() {
    await this.searchBtn.click();
  }
  async addClick() {
    await this.addBtn.click();
  }
  async addValidData(name: string) {
    await this.addName.fill(name);
    await this.addCountryList.click();
    await this.VNOption.click();
    await this.addNotes.fill("This is checking by Huyen");
  }
  async saveBtnClick() {
    await this.saveBtn.click();
  }
  async addSuccessfully() {
    await expect(this.successToast, "Not success").toBeVisible();
  }
  async searchAndClickEdit() {
    //Tao moi truoc
    await this.addClick();
    await this.addValidData(this.uniqueName);
    await this.saveBtnClick();

    //tim
    await this.page
      .waitForSelector("div.oxd-loading-spinner", {
        state: "detached",
        timeout: 5000,
      })
      .catch(() => null);
    await this.page.waitForTimeout(2000);
    await expect(this.localtionsLabel).toBeVisible();
    await this.nameInput.fill(this.uniqueName);
    await this.searchClick();
    await this.editIcon.click();
    await expect(this.editLocationTitle).toBeVisible();
  }
  async updateData(updateText: string) {
    // Chờ cho đến khi ô input có giá trị khác rỗng thì mới chạy tiếp
    await this.page.waitForFunction((locator) => {
      function getElementByXpath(path: any) {
        return document.evaluate(
          path,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
      }
      const input = getElementByXpath(locator) as HTMLInputElement;
      return input && input.value !== "";
    }, "//label[text()='Name']//parent::div/following-sibling::div/input");
    const currentValue = await this.addName.inputValue();
    const updatedValue = `${currentValue}${updateText}`;
    await this.addName.fill(updatedValue);
    console.log(
      "🚀 ~ LocationsAdminPage ~ updateData ~ updatedValue:",
      updatedValue
    );
    updatedData = updatedValue;
  }
  async checkUpdateSuccessfully() {
    await this.page
      .waitForSelector("div.oxd-loading-spinner", {
        state: "detached",
        timeout: 5000,
      })
      .catch(() => null);
    await this.page.waitForTimeout(3000);
    await expect(this.localtionsLabel).toBeVisible();
    console.log(
      "🚀 ~ LocationsAdminPage ~ checkUpdateSuccessfully ~ this.updatedData:",
      updatedData
    );
    await this.nameInput.fill(updatedData);
    await this.searchBtn.click();
    //Kiem tra loading icon bien mat chua
    await this.page
      .waitForSelector("div.oxd-table-loader", {
        state: "detached",
        timeout: 5000,
      })
      .catch(() => null);
    await this.page.waitForTimeout(1000);
    //Kiem tra da duoc update chua
    const updatedName = await this.nameColumnData.first().textContent();
    expect(updatedName, "Update data not successfully!").toEqual(updatedData);
  }
  async searchAndClickDelete() {
    //Tao moi truoc
    await this.addClick();
    await this.addValidData(this.uniqueName);
    await this.saveBtnClick();

    //tim
    await this.page
      .waitForSelector("div.oxd-loading-spinner", {
        state: "detached",
        timeout: 5000,
      })
      .catch(() => null);
    await this.page.waitForTimeout(3000);
    await expect(this.localtionsLabel).toBeVisible();
    await this.nameInput.fill(this.uniqueName);
    console.log(
      "🚀 ~ LocationsAdminPage ~ searchAndClickDelete ~ this.uniqueName:",
      this.uniqueName
    );
    updatedData = this.uniqueName;
    await this.searchClick();
    await this.deleteIcon.click();
  }
  async confirmYesToDelete() {
    await expect(this.deletePopup).toBeVisible();
    await this.yesDeleteBtn.click();
  }
  async checkDeleteSuccess() {
    await expect(this.deleteSuccessMessage).toBeVisible();
    //wait until loading icon disappears
    await this.page
      .waitForSelector("div.oxd-loading-spinner", {
        state: "detached",
        timeout: 5000,
      })
      .catch(() => null);
    //await this.page.waitForTimeout(1000);
    await expect(this.localtionsLabel).toBeVisible();
    await this.nameInput.fill(updatedData);
    await this.searchClick();
    //Check to delete successfully when the record is the only
    expect(this.noResultsToast).toBeVisible();
    console.log("Deleted successfully");
  }
  async creatDataToMultiDelete() {
    //Tao moi 1
    await this.addClick();
    await this.addValidData(this.generateRandomName(5));
    await this.saveBtnClick();
    //Tao moi 2
    await this.addClick();
    await this.addValidData(this.generateRandomName(5));
    await this.saveBtnClick();
    //Đợi đến khi hiển thị data
    await this.page
      .waitForSelector("div.oxd-loading-spinner", {
        state: "detached",
        timeout: 5000,
      })
      .catch(() => null);
    await this.page.waitForTimeout(2000);
  }
  async selectMultiLocations() {
    await this.page.waitForTimeout(3000);
    //Check lần lượt
    const rowCount = await this.contryColumnData.count();
    for (let i = 0; i < rowCount; i++) {
      const countryValue = await this.contryColumnData.nth(i).first().textContent();
      if (countryValue.trim().toLowerCase() === this.expectedCountry.toLowerCase()) {
        await this.singleCheckbox.nth(i).click();
      }
    }
  }
  async clickDelete(){
    await this.deleteBtn.click();
    await this.page.waitForTimeout(3000);
  }
  async deleteMultiLocations() {
    await expect(this.deleteSuccessMessage).toBeVisible();
    //wait until loading icon disappears
    await this.page
      .waitForSelector("div.oxd-loading-spinner", {
        state: "detached",
        timeout: 5000,
      })
      .catch(() => null);
    await this.page.waitForTimeout(1000);
    await expect(this.localtionsLabel).toBeVisible();
    await this.selectCountry();
    await this.searchClick();
    await expect(this.noResultsToast).toBeVisible();
    console.log("Deleted successfully");
  } 
}
