import { Given, When, Then } from "@cucumber/cucumber";
import AdminMenuPage from "../../../pages/admin/configuration/socialMediaAuthenPage";
import { pageFixture } from "../../../../hooks/pageFixture";


When("User access social media authen page", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.accessSocialMediaAuthPage();
});
Then("Social media page has displayed as expected", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.afterAcccessSocialMediaAuthPage();
});

When("User creates a new provider", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.accessSocialMediaAuthPage();
    await adminMenuPage.createProvider();
});
Then("A new provider has been created", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.afterCreateProvider();
});

When("User updates a new provider", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.accessSocialMediaAuthPage();
    await adminMenuPage.updateProvider();
});
Then("A new provider has been updated", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.afterUpdateProvider();
});

When("User removes a provider", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.accessSocialMediaAuthPage();
    await adminMenuPage.deleteProvider();
});
Then("A provider has been deleted", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.afterDeleteProvider();
});
When("User removes multi provider", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.accessSocialMediaAuthPage();
    await adminMenuPage.createProvider();
    await adminMenuPage.addProvider2(); 
    await adminMenuPage.deleteMultiProvider();
});
Then("A new provider have been deleted", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.afterDeleteMultiProvider();
});
