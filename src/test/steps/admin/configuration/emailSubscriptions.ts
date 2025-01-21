import { When, Then, BeforeStep } from "@cucumber/cucumber";
import EmailConfigPage from "#test/pages/admin/configuration/emailSubscriptions";
import { pageFixture } from "#hooks/pageFixture";

let emailConfigPage: EmailConfigPage;
BeforeStep(async function () {
  emailConfigPage = new EmailConfigPage(pageFixture.page);
});
When("User access Email subscription page", async function () {
  await emailConfigPage.navigateToEmailSubscription();
});
Then("Email subscription page has displayed as expected", async function () {
  await emailConfigPage.verifyPageUI();
});
When("User turns on Toggle", async function () {
  await emailConfigPage.navigateToEmailSubscription();
  await emailConfigPage.toggleOnStatus();
});
Then("Toggle has displayed in on status as expected", async function () {
  await emailConfigPage.verifyToggleOnStatus();
});
When("User turns off Toggle", async function () {
  await emailConfigPage.navigateToEmailSubscription();
  await emailConfigPage.toggleOffStatus();
});
Then("Toggle has displayed in off status as expected", async function () {
  await emailConfigPage.verifyToggleOffStatus();
});
