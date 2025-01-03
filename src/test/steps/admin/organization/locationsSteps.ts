import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "../../../../hooks/pageFixture";
import LocationsAdminPage from "../../../pages/admin/organization/locationsPage";

//Pre-condition
Given("User accessed Locations", async () => {
  const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
  await adminMenuPage.accessLocations();
});

//LO_01: Verify UI of Locations page
Then("All elements should be displayed as expected", async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.checkUILocations();
});

//LO_02: Search location by name
When("User enters a keyword in the Name field", async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.fillName();
});
When("User clicks search button", async () => {
  const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
  await adminMenuPage.searchClick();
});
Then("The corresponding No results should be returned", async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.checkName();
  }
);

//LO_03: Search location by city
When("User enters a keyword in the City field", async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.fillCity();
  }
);
Then("The corresponding City results should be returned",  async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.checkCity();
});

//LO_04: Search location by country
When("User selects a value in the Country field", async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.selectCountry();
});
Then("The corresponding Country results should be returned", async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.checkCountry();
});

//LO_05: Create a new location
When("User clicks the Add button", async () => {
  const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
  await adminMenuPage.addClick();
});
When("User inputs valid data contains name {string}", async (name) => {
  const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
  await adminMenuPage.addValidData(name);
});
When("User clicks the Save button", async () => {
  const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
  await adminMenuPage.saveBtnClick();
});
Then("A new location should be created", async () => {
  const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
  await adminMenuPage.addSuccessfully();
});

//LO_06: Update an existing name
When( "User clicks the Edit button for a name", async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.searchAndClickEdit();
});
When("User updates the data with updateText {string}", async (updateText) => {
  const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
  await adminMenuPage.updateData(updateText);
});
Then("The location should be updated", async () => {
  const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
  await adminMenuPage.checkUpdateSuccessfully();
});

// LO_07: Delete a single location
When("User clicks the Delete icon", async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.searchAndClickDelete();
});
When("User confirms the deletion",  async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.confirmYesToDelete();
});
Then("The location should be deleted",  async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.checkDeleteSuccess();
});

// LO_08: Delete multiple locations
When( "User selects multiple locations", async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.creatDataToMultiDelete();
    await adminMenuPage.selectMultiLocations();
});
When("User clicks the Delete button", async () => {
  const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
  await adminMenuPage.clickDelete();
});
Then("All selected locations should be deleted", async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.deleteMultiLocations();
});
