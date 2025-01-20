import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import GeneralInforPage from "#test/pages/admin/organization/generalInforPage";
import { pageFixture } from "#hooks/pageFixture";
let generalInforPage: GeneralInforPage;
BeforeStep(async function () {
  generalInforPage = new GeneralInforPage(pageFixture.page);
});
//Pre-condition
Given("User accesses General information in Organization", async function () {
  await generalInforPage.accessGI();
});

//GI_01: Check UI of Organization General Information
Then(
  "User should observe that all elements are displayed as expected",
  async function () {
    await generalInforPage.checkUIGI();
  }
);

//GI_02: Edit Organization General Information
When("User turns the Edit toggle on", async function () {
  await generalInforPage.turnOnEditMode();
});
When("User updates some data", async function () {
  await generalInforPage.updateData();
});
When("User save the updated the data", async function () {
  await generalInforPage.saveUpdates();
});
Then("The information should be updated successfully", async function () {
  await generalInforPage.saveSuccessfully();
});
