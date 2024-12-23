import { Given, When, Then } from "@cucumber/cucumber";
import SocialMediaPage from "../../../pages/admin/configuration/socialMediaAuthenPage";
import { pageFixture } from "../../../../hooks/pageFixture";

When("User access social media authen page",  async () => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.accessSocialMediaAuthPage();
});
Then("Social media page has displayed as expected", async () => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.afterAcccessSocialMediaAuthPage();
});

When("User creates a new provider", async () => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.accessSocialMediaAuthPage();
    await socialMediaPage.createProvider();
});
Then("A new provider has been created",async () => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.afterCreateProvider();
});

When("User updates a provider", async () => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.accessSocialMediaAuthPage();
    await socialMediaPage.updateProvider();
});
Then("A provider has been updated", async () => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.afterUpdateProvider();
});

When("User removes a provider",async () => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.accessSocialMediaAuthPage();
    await socialMediaPage.deleteProvider();
});
Then("A provider has been deleted", async () => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.afterDeleteProvider();
});
When("User removes multi provider", async () => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.accessSocialMediaAuthPage();
    await socialMediaPage.deleteMultiProvider();
});
Then("All selected providers have been deleted", async () => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.afterDeleteMultiProvider();
});
