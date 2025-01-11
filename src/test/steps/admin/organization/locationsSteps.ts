import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import { pageFixture } from "../../../../hooks/pageFixture";
import LocationsAdminPage from "../../../pages/admin/organization/locationsPage";
let locationsAdminPage: LocationsAdminPage;

BeforeStep (async() => {
  locationsAdminPage = new LocationsAdminPage(pageFixture.page);
})

//Pre-condition
Given("User accessed Locations", async () => {
  await locationsAdminPage.accessLocations();
});

//LO_01: Verify UI of Locations page
Then("All elements should be displayed as expected", async () => {
    await locationsAdminPage.checkUILocations();
});

//LO_02: Search location by name
When("User enters a keyword in the Name field", async () => {
    await locationsAdminPage.fillName();
});
When("User clicks search button", async () => {
  await locationsAdminPage.searchClick();
});
Then("The corresponding No results should be returned", async () => {
    await locationsAdminPage.checkName();
  }
);

//LO_03: Search location by city
When("User enters a keyword in the City field", async () => {
    await locationsAdminPage.fillCity();
});
Then("The corresponding City results should be returned",  async () => {
    await locationsAdminPage.checkCity();
});

//LO_04: Search location by country
When("User selects a value in the Country field", async () => {
    await locationsAdminPage.selectCountry();
});
Then("The corresponding Country results should be returned", async () => {
    await locationsAdminPage.checkCountry();
});

//LO_05: Create a new location
When("User clicks the Add button", async () => {
  await locationsAdminPage.addClick();
});
When("User inputs valid data contains name {string}", async (name) => {
  await locationsAdminPage.addValidData(name);
});
When("User clicks the Save button", async () => {
  await locationsAdminPage.saveBtnClick();
});
Then("A new location should be created", async () => {
  await locationsAdminPage.addSuccessfully();
});

//LO_06: Update an existing name
When( "User clicks the Edit button for a name", async () => {
    await locationsAdminPage.searchAndClickEdit();
});
When("User updates the data with updateText {string}", async (updateText) => {
  await locationsAdminPage.updateData(updateText);
});
Then("The location should be updated", async () => {
  await locationsAdminPage.checkUpdateSuccessfully();
});

// LO_07: Delete a single location
When("User clicks the Delete icon", async () => {
    await locationsAdminPage.searchAndClickDelete();
});
When("User confirms the deletion",  async () => {
    await locationsAdminPage.confirmYesToDelete();
});
Then("The location should be deleted",  async () => {
    await locationsAdminPage.checkDeleteSuccess();
});

// LO_08: Delete multiple locations
When("User selects multiple locations", async () => {
    await locationsAdminPage.creatDataToMultiDelete();
    await locationsAdminPage.selectMultiLocations();
});
When("User clicks the Delete button", async () => {
  await locationsAdminPage.clickDelete();
});
Then("All selected locations should be deleted", async () => {
    await locationsAdminPage.deleteMultiLocations();
});
