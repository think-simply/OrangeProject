import { Given, When, Then } from "@cucumber/cucumber";
import SocialMediaPage from "../../../pages/admin/configuration/socialMediaAuthenPage";
import { pageFixture } from "../../../../hooks/pageFixture";

When("User access social media authen page",  async () => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.accessSocialMediaAuthPage();
});
Then("Social media page has displayed as expected", async () => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.verifyPageUI();
});
When("User creates a new provider with name {string}, provider url {string}, client id {string}, client secret {string}", async (name, url, id, secret) => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.accessSocialMediaAuthPage();
    await socialMediaPage.createProvider(name, url, id, secret);
});
Then("A new provider with name {string} has been created",async (text) => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.verifyCreateProvider(text);
});
When("User updates a provider {string} to name {string}, provider url {string}, client id {string}, client secret {string}", async (text,name, url, id, secret) => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.accessSocialMediaAuthPage();
    await socialMediaPage.updateProvider(text,name, url, id, secret);
});
Then("Provider has been updated to {string}", async (text) => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.verifyUpdateProvider(text);
});
When("User removes a provider with name {string}",async (text) => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.accessSocialMediaAuthPage();
    await socialMediaPage.deleteProvider(text);
});
Then("Provider {string} has been deleted", async (text) => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.verifyDeleteProvider(text);
});
When("User removes all providers contain text {string}", async (text) => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.accessSocialMediaAuthPage();
    await socialMediaPage.deleteMultiProvider(text);
});
Then("All selected provider contain text {string} have been deleted", async (text) => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.verifyDeleteMultiProvider(text);
});
When("User input on field {string} value {string}", async (field,value) => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.accessSocialMediaAuthPage();
    await socialMediaPage.inputDataOnCreateForm(field,value);
});
Then("Message has displayed under {string} as {string}", async (field,validation) => {
    const socialMediaPage = new SocialMediaPage(pageFixture.adminPage);
    await socialMediaPage.verifyValidationMessage(field,validation);
});
