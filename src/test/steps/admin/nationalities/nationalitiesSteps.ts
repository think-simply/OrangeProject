import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import { pageFixture } from "#hooks/pageFixture";
import NationalitiesPage from "#test/pages/admin/nationalities/nationalitiesPage";
let nationalitiesPage: NationalitiesPage;

BeforeStep( async function () {
    nationalitiesPage = new NationalitiesPage(pageFixture.page);
})
//Pre-condition
Given("User accessed Nationalities page", async function () {
    await nationalitiesPage.accessNationalities();
});

//NA_01: Check UI of Nationalities page
Then("All elements are displayed as expected in Nationalities", async function () {
    await nationalitiesPage.checkNationalitiesUI();
});

// NA_02: Add a new nationality
When("User clicks Add button for Nationality", async function () {
    await nationalitiesPage.clickAddButton();
});
When("User inputs valid data for Nationality contains name {string}", async function (name) {
    await nationalitiesPage.inputNationalityData(name);
});
When("User clicks Save button for Nationality", async function () {
    await nationalitiesPage.clickSaveButton();
});
Then("New nationality has been created", async function () {
    await nationalitiesPage.verifyNewNationalityCreated();
});

// NA_03: Update a nationality
When("User clicks Update icon for Nationality with name {string}",  async function (name) {
    await nationalitiesPage.clickUpdateIcon(name);
});
When("User updates data for Nationality",  async function () {
    await nationalitiesPage.updateNationalityData();
});
When("User clicks Save button for Nationality updated",  async function () {
    await nationalitiesPage.clickSaveForUpdate();
});
Then("Nationality has been updated", async function () {
    await nationalitiesPage.verifyNationalityUpdated();
});

// NA_04: Delete a nationality
When("User clicks Delete icon for Nationality name is {string}", async function (nameToDelete) {
    await nationalitiesPage.clickDeleteIcon(nameToDelete);
});
When("User confirms delete Nationality", async function () {
    await nationalitiesPage.confirmDeleteNationality();
});
Then("Nationality has been deleted", async function () {
    await nationalitiesPage.verifyNationalityDeleted();
});

// NA_05: Delete multi nationality
When("User selects multi nationality names are {string} and {string}", async (nameToDelete1, nameToDelete2) => {
    await nationalitiesPage.selectMultipleNationalities(nameToDelete1, nameToDelete2);
});
When("User clicks Delete button for Nationality", async function () {
    await nationalitiesPage.clickDeleteButton();
});
Then("All selected nationalities have been deleted", async function () {
    await nationalitiesPage.verifyMultiNationalityDeleted();
});