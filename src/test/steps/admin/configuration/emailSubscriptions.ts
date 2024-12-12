import { Given, When, Then } from "@cucumber/cucumber";
import EmailConfigPage from "../../../pages/admin/configuration/emailSubscriptions";
import { pageFixture } from "../../../../hooks/pageFixture";

When("User access Email subscription page", { timeout: 30000 }, async () => {
    const emailConfigPage = new EmailConfigPage(pageFixture.adminPage);
    await emailConfigPage.navigateToEmailSubscription();
});
Then("Email subscription page has displayed as expected", { timeout: 30000 }, async () => {
    const emailConfigPage = new EmailConfigPage(pageFixture.adminPage);
    await emailConfigPage.afterNavigatetoPage();
});
When("User turns on Toggle", { timeout: 30000 }, async () => {
    const emailConfigPage = new EmailConfigPage(pageFixture.adminPage);
    await emailConfigPage.navigateToEmailSubscription();
    await emailConfigPage.toggleOnStatus();
});
Then("Toggle has displayed in on status as expected", { timeout: 30000 }, async () => {
    const emailConfigPage = new EmailConfigPage(pageFixture.adminPage);
    await emailConfigPage.checkToggleOnStatus();
});
When("User turns off Toggle", { timeout: 30000 }, async () => {
    const emailConfigPage = new EmailConfigPage(pageFixture.adminPage);
    await emailConfigPage.navigateToEmailSubscription();
    await emailConfigPage.toggleOffStatus();
});
Then("Toggle has displayed in off status as expected", { timeout: 30000 }, async () => {
    const emailConfigPage = new EmailConfigPage(pageFixture.adminPage);
    await emailConfigPage.checkToggleOffStatus();
}); 
