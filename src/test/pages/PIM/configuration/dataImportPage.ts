import { Page, Locator, expect, Download } from "@playwright/test";
import { generateRandomName } from "../../../../helper/randomString";
import path from "path";
//import fs from 'fs';
import fs from 'fs-extra';
import dotenv from "dotenv";
dotenv.config();

let flexibleData: string = "";

export default class dataImportPIMPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  elements = {
    PIMSection: () => this.page.locator('//span[text()="PIM"]'),
    configurationTab: () => this.page.locator('//span[text()="Configuration "]'),
    dataImportTab: () => this.page.locator('//a[text()="Data Import"]'),
    mainTitle: () => this.page.locator('//p[text()="Data Import"]'),
    noteTable: () => this.page.locator("div.orangehrm-information-card-container"),
    downloadLink: () => this.page.locator("a.download-link"),
    inputFileBtn: () => this.page.locator('//input[@type="file"]'),
    uploadBtn: () => this.page.locator('//button[@type="submit"]'),
    fileName: () => "Test" + generateRandomName(3)+".csv",
    uploadsFile: () => this.page.locator('//div[text()="DataTesttoUpload.csv"]'),
    importDetailPopup: () => this.page.locator('//div[@role="document"]'),
    okBtn: () => this.page.locator('//div[@class="orangehrm-modal-footer"]/button[@type="button"]'),
    successMessage: () => this.page.locator('p.orangehrm-success-message')
  };
  async navigate() {
    await this.page.goto(`${process.env.WEB_URL}`);
    await this.elements.PIMSection().click();
    await this.elements.configurationTab().click();
    await this.elements.dataImportTab().click();
  }
  async checkUI() {
    await this.elements.noteTable().waitFor();
    await expect(this.elements.noteTable()).toBeVisible();
  }
  async clickDownloadButton() {
    //create folder to store file
    // const downloadsDir = path.join(__dirname, "downloads");
    // if (fs.existsSync(downloadsDir)) {
    //   fs.mkdirSync(downloadsDir, { recursive: true });
    // }
    const downloadsDir = path.join(__dirname, "downloads");
    // Kiểm tra xem thư mục downloads có tồn tại không
    if (fs.existsSync(downloadsDir)) {
      // Xóa sạch nội dung trong thư mục downloads
      await fs.emptyDir(downloadsDir);
    } else {
      // Tạo thư mục downloads nếu chưa tồn tại
      await fs.mkdirp(downloadsDir);
    }
    //download
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.elements.downloadLink().click(),
    ]);
    //Save as Path
    const filePath = path.join(downloadsDir, this.elements.fileName());
    await download.saveAs(filePath);
    flexibleData = filePath;
  }
  async verifyDownload() {
    //verified
    console.log(`File has been downloaded and saved to: ${flexibleData}`);
  }
  async uploadFile(){
    //upload
    const uploadsDir = path.join(__dirname, "uploads/DataTesttoUpload.csv");
    await this.elements.inputFileBtn().setInputFiles(uploadsDir);
    await this.elements.uploadsFile().waitFor();
    await expect(this.elements.uploadsFile()).toBeVisible();
  }
  async verifyUpload(){
    await this.elements.uploadBtn().click();
    await this.elements.importDetailPopup().waitFor();
    await expect(this.elements.successMessage()).toBeVisible();
    await this.elements.okBtn().click();
    await expect(this.elements.importDetailPopup()).toBeHidden();
  }
}