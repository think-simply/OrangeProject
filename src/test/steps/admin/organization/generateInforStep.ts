import { Given, When, Then } from "@cucumber/cucumber";
import OrganizationAdminPage from "../../../pages/admin/organization/organizationPage";
import { pageFixture } from "../../../../hooks/pageFixture";

// Given("User login as Admin", async()=>{
//     const adminMenuPage = new OrganizationAdminPage(pageFixture.adminPage);
//      await adminMenuPage.login();
// });
Given("User navigates to page Admin_Organization", async () => {
  const adminMenuPage = new OrganizationAdminPage(pageFixture.adminPage);
  await adminMenuPage.visit();
  await adminMenuPage.accessOrganization();
});
When("User accesses General information in Organization", async () => {
  const adminMenuPage = new OrganizationAdminPage(pageFixture.adminPage);
//   await adminMenuPage.accessGI();
});
Then("User should observe that all elements are displayed as expected", async () => {
    const adminMenuPage = new OrganizationAdminPage(pageFixture.adminPage);
    // await adminMenuPage.checkUIGI();
  }
);
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
