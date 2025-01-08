import { When, Then, BeforeStep } from "@cucumber/cucumber";
import EmailConfigPage from "../../../pages/admin/configuration/emailSubscriptions";
import { pageFixture } from "../../../../hooks/pageFixture";
let emailConfigPage: EmailConfigPage;
BeforeStep(async () => {
    emailConfigPage = new EmailConfigPage(pageFixture.adminPage);
});
When("User access Email subscription page", async () => {
    await emailConfigPage.navigateToEmailSubscription();
});
Then("Email subscription page has displayed as expected", async () => {
    await emailConfigPage.verifyPageUI();
});
When("User turns on Toggle", async () => {
    await emailConfigPage.navigateToEmailSubscription();
    await emailConfigPage.toggleOnStatus();
});
Then("Toggle has displayed in on status as expected", async () => {
    await emailConfigPage.verifyToggleOnStatus();
});
When("User turns off Toggle", async () => {
    await emailConfigPage.navigateToEmailSubscription();
    await emailConfigPage.toggleOffStatus();
});
Then("Toggle has displayed in off status as expected", async () => {
    await emailConfigPage.verifyToggleOffStatus();
}); 
