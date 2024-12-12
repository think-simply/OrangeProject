import { Given, When, Then } from "@cucumber/cucumber";
import SocialMediaPage from "../../../pages/admin/configuration/socialMediaAuthenPage";
import { pageFixture } from "../../../../hooks/pageFixture";

When("User access social media authen page", { timeout: 30000 }, async () => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.accessSocialMediaAuthPage();
});
Then("Social media page has displayed as expected", { timeout: 30000 }, async () => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.afterAcccessSocialMediaAuthPage();
});

When("User creates a new provider", { timeout: 30000 }, async () => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.accessSocialMediaAuthPage();
    await socialMediaPage.createProvider();
});
Then("A new provider has been created", { timeout: 30000 }, async () => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.afterCreateProvider();
});

When("User updates a provider", { timeout: 30000 }, async () => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.accessSocialMediaAuthPage();
    await socialMediaPage.updateProvider();
});
Then("A provider has been updated", { timeout: 30000 }, async () => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.afterUpdateProvider();
});

When("User removes a provider", { timeout: 30000 }, async () => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.accessSocialMediaAuthPage();
    await socialMediaPage.deleteProvider();
});
Then("A provider has been deleted", { timeout: 30000 }, async () => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.afterDeleteProvider();
});
When("User removes multi provider", { timeout: 30000 }, async () => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.accessSocialMediaAuthPage();
    await socialMediaPage.deleteMultiProvider();
});
Then("All selected providers have been deleted", { timeout: 30000 }, async () => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.afterDeleteMultiProvider();
});
