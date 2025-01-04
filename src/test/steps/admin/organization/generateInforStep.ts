import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import OrganizationAdminPage from "../../../pages/admin/organization/generalInforPage";
import { pageFixture } from "../../../../hooks/pageFixture";
let adminMenuPage: OrganizationAdminPage;
BeforeStep( async() => {
  adminMenuPage = new OrganizationAdminPage(pageFixture.adminPage);
})
//Pre-condition
Given("User accesses General information in Organization", async () => {
  await adminMenuPage.accessGI();
});

//GI_01: Check UI of Organization General Information
Then("User should observe that all elements are displayed as expected", async () => {
    await adminMenuPage.checkUIGI();
  }
);

//GI_02: Edit Organization General Information
When("User turns the Edit toggle on", async () => {
  await adminMenuPage.turnOnEditMode();
});
When("User updates some data", async () => {
  await adminMenuPage.updateData();
});
When("User save the updated the data", async () => {
  await adminMenuPage.saveUpdates();
});
Then("The information should be updated successfully", async () => {
  await adminMenuPage.saveSuccessfully();
});
