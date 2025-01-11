import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import { pageFixture } from "../../../../hooks/pageFixture";
import NationalitiesAdminPage from "../../../pages/admin/nationalities/nationalitiesPage";
let nationalitiesAdminPage: NationalitiesAdminPage;

BeforeStep( async() => {
    nationalitiesAdminPage = new NationalitiesAdminPage(pageFixture.page);
})
//Pre-condition
Given("User accessed Nationalities page", async () => {
    await nationalitiesAdminPage.accessNationalities();
});

//NA_01: Check UI of Nationalities page
Then("All elements are displayed as expected in Nationalities", async () => {
    await nationalitiesAdminPage.checkNationalitiesUI();
});

// NA_02: Add a new nationality
When("User clicks Add button for Nationality", async () => {
    await nationalitiesAdminPage.clickAddButton();
});
When("User inputs valid data for Nationality contains name {string}", async (name) => {
    await nationalitiesAdminPage.inputNationalityData(name);
});
When("User clicks Save button for Nationality", async () => {
    await nationalitiesAdminPage.clickSaveButton();
});
Then("New nationality has been created", async () => {
    await nationalitiesAdminPage.verifyNewNationalityCreated();
});

// NA_03: Update a nationality
When("User clicks Update icon for Nationality with name {string}",  async (name) => {
    await nationalitiesAdminPage.clickUpdateIcon(name);
});
When("User updates data for Nationality",  async () => {
    await nationalitiesAdminPage.updateNationalityData();
});
When("User clicks Save button for Nationality updated",  async () => {
    await nationalitiesAdminPage.clickSaveForUpdate();
});
Then("Nationality has been updated", async () => {
    await nationalitiesAdminPage.verifyNationalityUpdated();
});

// NA_04: Delete a nationality
When("User clicks Delete icon for Nationality name is {string}", async (nameToDelete) => {
    await nationalitiesAdminPage.clickDeleteIcon(nameToDelete);
});
When("User confirms delete Nationality", async () => {
    await nationalitiesAdminPage.confirmDeleteNationality();
});
Then("Nationality has been deleted", async () => {
    await nationalitiesAdminPage.verifyNationalityDeleted();
});

// NA_05: Delete multi nationality
When("User selects multi nationality names are {string} and {string}", { timeout: 100000 }, async (nameToDelete1, nameToDelete2) => {
    await nationalitiesAdminPage.selectMultipleNationalities(nameToDelete1, nameToDelete2);
});
When("User clicks Delete button for Nationality", async () => {
    await nationalitiesAdminPage.clickDeleteButton();
});
Then("All selected nationalities have been deleted", async () => {
    await nationalitiesAdminPage.verifyMultiNationalityDeleted();
});