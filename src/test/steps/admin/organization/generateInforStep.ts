import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import GeneralInforPage from "#test/pages/admin/organization/generalInforPage";
import { pageFixture } from "#hooks/pageFixture";
let generalInforPage: GeneralInforPage;
BeforeStep( async() => {
  generalInforPage = new GeneralInforPage(pageFixture.page);
})
//Pre-condition
Given("User accesses General information in Organization", async () => {
  await generalInforPage.accessGI();
});

//GI_01: Check UI of Organization General Information
Then("User should observe that all elements are displayed as expected", async () => {
    await generalInforPage.checkUIGI();
  }
);

//GI_02: Edit Organization General Information
When("User turns the Edit toggle on", async () => {
  await generalInforPage.turnOnEditMode();
});
When("User updates some data", async () => {
  await generalInforPage.updateData();
});
When("User save the updated the data", async () => {
  await generalInforPage.saveUpdates();
});
Then("The information should be updated successfully", async () => {
  await generalInforPage.saveSuccessfully();
});
