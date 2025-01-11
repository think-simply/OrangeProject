import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import { pageFixture } from "../../../../hooks/pageFixture";
import LocationsPage from "../../../pages/admin/organization/locationsPage";
let locationsPage: LocationsPage;

BeforeStep (async() => {
  locationsPage = new LocationsPage(pageFixture.page);
})

//Pre-condition
Given("User accessed Locations", async () => {
  await locationsPage.accessLocations();
});

//LO_01: Verify UI of Locations page
Then("All elements should be displayed as expected", async () => {
    await locationsPage.checkUILocations();
});

//LO_02: Search location by name
When("User enters a keyword in the Name field", async () => {
    await locationsPage.fillName();
});
When("User clicks search button", async () => {
  await locationsPage.searchClick();
});
Then("The corresponding No results should be returned", async () => {
    await locationsPage.checkName();
  }
);

//LO_03: Search location by city
When("User enters a keyword in the City field", async () => {
    await locationsPage.fillCity();
});
Then("The corresponding City results should be returned",  async () => {
    await locationsPage.checkCity();
});

//LO_04: Search location by country
When("User selects a value in the Country field", async () => {
    await locationsPage.selectCountry();
});
Then("The corresponding Country results should be returned", async () => {
    await locationsPage.checkCountry();
});

//LO_05: Create a new location
When("User clicks the Add button", async () => {
  await locationsPage.addClick();
});
When("User inputs valid data contains name {string}", async (name) => {
  await locationsPage.addValidData(name);
});
When("User clicks the Save button", async () => {
  await locationsPage.saveBtnClick();
});
Then("A new location should be created", async () => {
  await locationsPage.addSuccessfully();
});

//LO_06: Update an existing name
When( "User clicks the Edit button for a name", async () => {
    await locationsPage.searchAndClickEdit();
});
When("User updates the data with updateText {string}", async (updateText) => {
  await locationsPage.updateData(updateText);
});
Then("The location should be updated", async () => {
  await locationsPage.checkUpdateSuccessfully();
});

// LO_07: Delete a single location
When("User clicks the Delete icon", async () => {
    await locationsPage.searchAndClickDelete();
});
When("User confirms the deletion",  async () => {
    await locationsPage.confirmYesToDelete();
});
Then("The location should be deleted",  async () => {
    await locationsPage.checkDeleteSuccess();
});

// LO_08: Delete multiple locations
When("User selects multiple locations", async () => {
    await locationsPage.creatDataToMultiDelete();
    await locationsPage.selectMultiLocations();
});
When("User clicks the Delete button", async () => {
  await locationsPage.clickDelete();
});
Then("All selected locations should be deleted", async () => {
    await locationsPage.deleteMultiLocations();
});
