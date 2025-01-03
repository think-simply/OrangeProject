import { Given, When, Then } from "@cucumber/cucumber";
import OrganizationAdminPage from "../../../pages/admin/organization/generalInforPage";
import { pageFixture } from "../../../../hooks/pageFixture";

//Pre-condition
Given("User accesses General information in Organization", async () => {
  const adminMenuPage = new OrganizationAdminPage(pageFixture.adminPage);
  await adminMenuPage.accessGI();
});

//GI_01: Check UI of Organization General Information
Then("User should observe that all elements are displayed as expected", async () => {
    const adminMenuPage = new OrganizationAdminPage(pageFixture.adminPage);
    await adminMenuPage.checkUIGI();
  }
);

//GI_02: Edit Organization General Information
When("User turns the Edit toggle on", async () => {
  const adminMenuPage = new OrganizationAdminPage(pageFixture.adminPage);
  await adminMenuPage.turnOnEditMode();
});
When("User updates some data", async () => {
  const adminMenuPage = new OrganizationAdminPage(pageFixture.adminPage);
  await adminMenuPage.updateData();
});
When("User save the updated the data", async () => {
  const adminMenuPage = new OrganizationAdminPage(pageFixture.adminPage);
  await adminMenuPage.saveUpdates();
});
Then("The information should be updated successfully", async () => {
  const adminMenuPage = new OrganizationAdminPage(pageFixture.adminPage);
  await adminMenuPage.saveSuccessfully();
});
