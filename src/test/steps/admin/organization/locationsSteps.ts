import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import { pageFixture } from "#hooks/pageFixture";
import LocationsPage from "#test/pages/admin/organization/locationsPage";
let locationsPage: LocationsPage;

BeforeStep(async function () {
  locationsPage = new LocationsPage(pageFixture.page);
});

//Pre-condition
Given("User accessed Locations", async function () {
  await locationsPage.accessLocations();
});

//LO_01: Verify UI of Locations page
Then("All elements should be displayed as expected", async function () {
  await locationsPage.checkUILocations();
});

//LO_02: Search location by name
When("User enters a keyword in the Name field", async function () {
  await locationsPage.fillName();
});
When("User clicks search button", async function () {
  await locationsPage.searchClick();
});
Then("The corresponding No results should be returned", async function () {
  await locationsPage.checkName();
});

//LO_03: Search location by city
When("User enters a keyword in the City field", async function () {
  await locationsPage.fillCity();
});
Then("The corresponding City results should be returned", async function () {
  await locationsPage.checkCity();
});

//LO_04: Search location by country
When("User selects a value in the Country field", async function () {
  await locationsPage.selectCountry();
});
Then("The corresponding Country results should be returned", async function () {
  await locationsPage.checkCountry();
});

//LO_05: Create a new location
When("User clicks the Add button", async function () {
  await locationsPage.addClick();
});
When("User inputs valid data contains name {string}", async function (name) {
  await locationsPage.addValidData(name);
});
When("User clicks the Save button", async function () {
  await locationsPage.saveBtnClick();
});
Then("A new location should be created", async function () {
  await locationsPage.addSuccessfully();
});

//LO_06: Update an existing name
When("User clicks the Edit button for a name", async function () {
  await locationsPage.searchAndClickEdit();
});
When(
  "User updates the data with updateText {string}",
  async function (updateText) {
    await locationsPage.updateData(updateText);
  }
);
Then("The location should be updated", async function () {
  await locationsPage.checkUpdateSuccessfully();
});

// LO_07: Delete a single location
When("User clicks the Delete icon", async function () {
  await locationsPage.searchAndClickDelete();
});
When("User confirms the deletion", async function () {
  await locationsPage.confirmYesToDelete();
});
Then("The location should be deleted", async function () {
  await locationsPage.checkDeleteSuccess();
});

// LO_08: Delete multiple locations
When("User selects multiple locations", async function () {
  await locationsPage.creatDataToMultiDelete();
  await locationsPage.selectMultiLocations();
});
When("User clicks the Delete button", async function () {
  await locationsPage.clickDelete();
});
Then("All selected locations should be deleted", async function () {
  await locationsPage.deleteMultiLocations();
});
