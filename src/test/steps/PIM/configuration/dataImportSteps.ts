import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import { pageFixture } from "../../../../hooks/pageFixture";
import dataImportPIMPage from "../../../pages/PIM/configuration/dataImportPage";
let dataImportPage: dataImportPIMPage;

BeforeStep( async function () {
    dataImportPage = new dataImportPIMPage(pageFixture.page);
})
//Pre-condition
Given("User accessed Data Import page", async function () {
    await dataImportPage.navigate();
});

//DI_01: Check UI
Then("The page displayed as expected", async function () {
    await dataImportPage.checkUI();
});

//DI_02: Download sample file
When("User clicks on Download button", async function () {
    await dataImportPage.clickDownloadButton();
});
Then("The sample file should be downloaded successfully", async function () {
    await dataImportPage.verifyDownload();
});

//DI_03: Upload a file
When("User uploads the modified file", async function () {
    await dataImportPage.uploadFile();
});
Then("The file should be uploaded successfully", async function () {
    await dataImportPage.verifyUpload();
});
