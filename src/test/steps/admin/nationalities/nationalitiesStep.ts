import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import { pageFixture } from "../../../../hooks/pageFixture";
import NationalitiesPage from "../../../pages/admin/nationalities/nationalitiesPage";
let nationalitiesPage: NationalitiesPage;

BeforeStep( async() => {
    nationalitiesPage = new NationalitiesPage(pageFixture.page);
})
//Pre-condition
Given("User accessed Nationalities page", async () => {
    await nationalitiesPage.accessNationalities();
});

//NA_01: Check UI of Nationalities page
Then("All elements are displayed as expected in Nationalities", async () => {
    await nationalitiesPage.checkNationalitiesUI();
});

// NA_02: Add a new nationality
When("User clicks Add button for Nationality", async () => {
    await nationalitiesPage.clickAddButton();
});
When("User inputs valid data for Nationality contains name {string}", async (name) => {
    await nationalitiesPage.inputNationalityData(name);
});
When("User clicks Save button for Nationality", async () => {
    await nationalitiesPage.clickSaveButton();
});
Then("New nationality has been created", async () => {
    await nationalitiesPage.verifyNewNationalityCreated();
});

// NA_03: Update a nationality
When("User clicks Update icon for Nationality with name {string}",  async (name) => {
    await nationalitiesPage.clickUpdateIcon(name);
});
When("User updates data for Nationality",  async () => {
    await nationalitiesPage.updateNationalityData();
});
When("User clicks Save button for Nationality updated",  async () => {
    await nationalitiesPage.clickSaveForUpdate();
});
Then("Nationality has been updated", async () => {
    await nationalitiesPage.verifyNationalityUpdated();
});

// NA_04: Delete a nationality
When("User clicks Delete icon for Nationality name is {string}", async (nameToDelete) => {
    await nationalitiesPage.clickDeleteIcon(nameToDelete);
});
When("User confirms delete Nationality", async () => {
    await nationalitiesPage.confirmDeleteNationality();
});
Then("Nationality has been deleted", async () => {
    await nationalitiesPage.verifyNationalityDeleted();
});

// NA_05: Delete multi nationality
When("User selects multi nationality names are {string} and {string}", { timeout: 100000 }, async (nameToDelete1, nameToDelete2) => {
    await nationalitiesPage.selectMultipleNationalities(nameToDelete1, nameToDelete2);
});
When("User clicks Delete button for Nationality", async () => {
    await nationalitiesPage.clickDeleteButton();
});
Then("All selected nationalities have been deleted", async () => {
    await nationalitiesPage.verifyMultiNationalityDeleted();
});