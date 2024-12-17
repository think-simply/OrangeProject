import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "../../../../hooks/pageFixture";
import LocationsAdminPage from "../../../pages/admin/organization/locationsPage";

Given("User accessed Locations", { timeout: 30000 }, async () => {
  const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
  await adminMenuPage.visit();
  await adminMenuPage.login();
  await adminMenuPage.accessOrganization();
  await adminMenuPage.accessLocations();
});
Then("All elements should be displayed as expected",
  { timeout: 30000 },
  async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.checkUILocations();
  }
);
//LO_02: Search location by name
When("User enters a keyword in the Name field",
  { timeout: 30000 },
  async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.fillName();
  }
);
When("User clicks search button", { timeout: 30000 }, async () => {
  const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
  await adminMenuPage.searchClick();
});
Then("The corresponding No results should be returned",
  { timeout: 30000 },
  async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.checkName();
  }
);
//LO_03: Search location by city
When("User enters a keyword in the City field",
  { timeout: 30000 },
  async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.fillCity();
  }
);
Then("The corresponding City results should be returned",
  { timeout: 30000 },
  async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.checkCity(); // TODO:  await adminMenuPage.checkCity(false) thì sẽ không trả ra kết quả
  }
);
//LO_04: Search location by country
When("User selects a value in the Country field",{ timeout: 30000 },
  async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.selectCountry();
  }
);
Then("The corresponding Country results should be returned", { timeout: 30000 },
  async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.checkCountry();
  }
);
//LO_05: Create a new location
When("User clicks the Add button", { timeout: 30000 }, async () => {
  const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
  await adminMenuPage.addClick();
});
When("User inputs valid data contains name {string}", { timeout: 30000 }, async (name) => {
  const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
  await adminMenuPage.addValidData(name);
});
When("User clicks the Save button", { timeout: 30000 }, async () => {
  const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
  await adminMenuPage.saveBtnClick();
});
Then("A new location should be created", { timeout: 30000 }, async () => {
  const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
  await adminMenuPage.addSuccessfully();
});
//LO_06: Update an existing name
When( "User clicks the Edit button for a name",  { timeout: 30000 },
  async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.searchAndClickEdit();
  }
);
When("User updates the data with updateText {string}", { timeout: 30000 }, async (updateText) => {
  const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
  await adminMenuPage.updateData(updateText);
});
Then("The location should be updated", { timeout: 30000 }, async () => {
  const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
  await adminMenuPage.checkUpdateSuccessfully();
});
// LO_07: Delete a single location
When(  "User clicks the Delete icon", { timeout: 30000 },
  async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.searchAndClickDelete();
  }
);
When(  "User confirms the deletion",  { timeout: 30000 }, async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.confirmYesToDelete();
  }
);
Then(  "The location should be deleted", { timeout: 30000 },  async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.checkDeleteSuccess();
  }
);

// LO_08: Delete multiple locations
When(  "User selects multiple locations",  { timeout: 30000 },  async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    // Add specific logic for selecting multiple locations
    await adminMenuPage.creatDataToMultiDelete();
    await adminMenuPage.selectMultiLocations();
  }
);
When("User clicks the Delete button",{ timeout: 30000 },  async () => {
  const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
  await adminMenuPage.clickDelete();
});

Then(  "all selected locations should be deleted", { timeout: 30000 }, async () => {
    const adminMenuPage = new LocationsAdminPage(pageFixture.adminPage);
    await adminMenuPage.deleteMultiLocations();
  }
);
