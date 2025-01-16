import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import { pageFixture } from "../../../../hooks/pageFixture";
import dataImportPIMPage from "../../../pages/PIM/configuration/dataImportPage";
let dataImportPage: dataImportPIMPage;

BeforeStep( async() => {
    dataImportPage = new dataImportPIMPage(pageFixture.page);
})
//Pre-condition
Given("User accessed Data Import page", async () => {
    await dataImportPage.navigate();
});

//DI_01: Check UI
Then("The page displayed as expected", async () => {
    await dataImportPage.checkUI();
});

//DI_02: Download sample file
When("User clicks on Download button", async () => {
    await dataImportPage.clickDownloadButton();
});
Then("The sample file should be downloaded successfully", async () => {
    await dataImportPage.verifyDownload();
});

//DI_03: Upload a file
When("User uploads the modified file", async () => {
    await dataImportPage.uploadFile();
});
Then("The file should be uploaded successfully", async () => {
    await dataImportPage.verifyUpload();
});
