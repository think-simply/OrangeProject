import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import { pageFixture } from "../../../../hooks/pageFixture";
import NationalitiesAdminPage from "../../../pages/admin/nationalities/nationalitiesPage";
let adminMenuPage: NationalitiesAdminPage;

BeforeStep( async() => {
    adminMenuPage = new NationalitiesAdminPage(pageFixture.adminPage);
})
//Pre-condition
Given("User accessed Nationalities page", async () => {
    await adminMenuPage.accessNationalities();
});

//NA_01: Check UI of Nationalities page
Then("All elements are displayed as expected in Nationalities", async () => {
    await adminMenuPage.checkNationalitiesUI();
});

// NA_02: Add a new nationality
When("User clicks Add button for Nationality", async () => {
    await adminMenuPage.clickAddButton();
});
When("User inputs valid data for Nationality contains name {string}", async (name) => {
    await adminMenuPage.inputNationalityData(name);
});
When("User clicks Save button for Nationality", async () => {
    await adminMenuPage.clickSaveButton();
});
Then("New nationality has been created", async () => {
    await adminMenuPage.verifyNewNationalityCreated();
});

// NA_03: Update a nationality
When("User clicks Update icon for Nationality with name {string}",  async (name) => {
    await adminMenuPage.clickUpdateIcon(name);
});
When("User updates data for Nationality",  async () => {
    await adminMenuPage.updateNationalityData();
});
When("User clicks Save button for Nationality updated",  async () => {
    await adminMenuPage.clickSaveForUpdate();
});
Then("Nationality has been updated", async () => {
    await adminMenuPage.verifyNationalityUpdated();
});

// NA_04: Delete a nationality
When("User clicks Delete icon for Nationality name is {string}", async (nameToDelete) => {
    await adminMenuPage.clickDeleteIcon(nameToDelete);
});
When("User confirms delete Nationality", async () => {
    await adminMenuPage.confirmDeleteNationality();
});
Then("Nationality has been deleted", async () => {
    await adminMenuPage.verifyNationalityDeleted();
});

// NA_05: Delete multi nationality
When("User selects multi nationality names are {string} and {string}", { timeout: 100000 }, async (nameToDelete1, nameToDelete2) => {
    await adminMenuPage.selectMultipleNationalities(nameToDelete1, nameToDelete2);
});
When("User clicks Delete button for Nationality", async () => {
    await adminMenuPage.clickDeleteButton();
});
Then("All selected nationalities have been deleted", async () => {
    await adminMenuPage.verifyMultiNationalityDeleted();
});