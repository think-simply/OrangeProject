import { Given, When, Then } from "@cucumber/cucumber";
import OrganizationAdminPage from "../../../pages/admin/organization/generalInforPage";
import { pageFixture } from "../../../../hooks/pageFixture";

//Pre-condition
Given("User navigates to page Admin_Organization",{timeout: 30000}, async () => {
  const adminMenuPage = new OrganizationAdminPage(pageFixture.adminPage);
  await adminMenuPage.visit();
  await adminMenuPage.accessOrganization();
});

//GI_01: Check UI of Organization General Information
When("User accesses General information in Organization",{timeout: 30000}, async () => {
  const adminMenuPage = new OrganizationAdminPage(pageFixture.adminPage);
  await adminMenuPage.accessGI();
});
Then("User should observe that all elements are displayed as expected",{timeout: 30000}, async () => {
    const adminMenuPage = new OrganizationAdminPage(pageFixture.adminPage);
    await adminMenuPage.checkUIGI();
  }
);

//GI_02: Edit Organization General Information
When("User turns the Edit toggle on",{timeout: 30000}, async () => {
  const adminMenuPage = new OrganizationAdminPage(pageFixture.adminPage);
  await adminMenuPage.turnOnEditMode();
});
When("User updates some data",{timeout: 30000}, async () => {
  const adminMenuPage = new OrganizationAdminPage(pageFixture.adminPage);
  await adminMenuPage.updateData();
});
When("User save the updated the data",{timeout: 30000}, async () => {
  const adminMenuPage = new OrganizationAdminPage(pageFixture.adminPage);
  await adminMenuPage.saveUpdates();
});
Then("The information should be updated successfully",{timeout: 30000}, async () => {
  const adminMenuPage = new OrganizationAdminPage(pageFixture.adminPage);
  await adminMenuPage.saveSuccessfully();
});
