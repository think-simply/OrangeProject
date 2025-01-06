import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import { pageFixture } from "../../../../hooks/pageFixture";
import LocationsAdminPage from "../../../pages/admin/organization/locationsPage";
let adminMenuPage: LocationsAdminPage;

BeforeStep (async() => {
  adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
})

//Pre-condition
Given("User accessed Locations", async () => {
  await adminMenuPage.accessLocations();
});

//LO_01: Verify UI of Locations page
Then("All elements should be displayed as expected", async () => {
    await adminMenuPage.checkUILocations();
});

//LO_02: Search location by name
When("User enters a keyword in the Name field", async () => {
    await adminMenuPage.fillName();
});
When("User clicks search button", async () => {
  await adminMenuPage.searchClick();
});
Then("The corresponding No results should be returned", async () => {
    await adminMenuPage.checkName();
  }
);

//LO_03: Search location by city
When("User enters a keyword in the City field", async () => {
    await adminMenuPage.fillCity();
});
Then("The corresponding City results should be returned",  async () => {
    await adminMenuPage.checkCity();
});

//LO_04: Search location by country
When("User selects a value in the Country field", async () => {
    await adminMenuPage.selectCountry();
});
Then("The corresponding Country results should be returned", async () => {
    await adminMenuPage.checkCountry();
});

//LO_05: Create a new location
When("User clicks the Add button", async () => {
  await adminMenuPage.addClick();
});
When("User inputs valid data contains name {string}", async (name) => {
  await adminMenuPage.addValidData(name);
});
When("User clicks the Save button", async () => {
  await adminMenuPage.saveBtnClick();
});
Then("A new location should be created", async () => {
  await adminMenuPage.addSuccessfully();
});

//LO_06: Update an existing name
When( "User clicks the Edit button for a name", async () => {
    await adminMenuPage.searchAndClickEdit();
});
When("User updates the data with updateText {string}", async (updateText) => {
  await adminMenuPage.updateData(updateText);
});
Then("The location should be updated", async () => {
  await adminMenuPage.checkUpdateSuccessfully();
});

// LO_07: Delete a single location
When("User clicks the Delete icon", async () => {
    await adminMenuPage.searchAndClickDelete();
});
When("User confirms the deletion",  async () => {
    await adminMenuPage.confirmYesToDelete();
});
Then("The location should be deleted",  async () => {
    await adminMenuPage.checkDeleteSuccess();
});

// LO_08: Delete multiple locations
When( "User selects multiple locations", async () => {
    await adminMenuPage.creatDataToMultiDelete();
    await adminMenuPage.selectMultiLocations();
});
When("User clicks the Delete button", async () => {
  await adminMenuPage.clickDelete();
});
Then("All selected locations should be deleted", async () => {
    await adminMenuPage.deleteMultiLocations();
});
