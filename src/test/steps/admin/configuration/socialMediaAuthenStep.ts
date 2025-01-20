import { When, Then, BeforeStep } from "@cucumber/cucumber";
import SocialMediaPage from "#test/pages/admin/configuration/socialMediaAuthenPage";
import { pageFixture } from "#hooks/pageFixture";
let socialMediaPage: SocialMediaPage;
BeforeStep(async function () {
  socialMediaPage = new SocialMediaPage(pageFixture.page);
});
When("User access social media authen page", async function () {
  await socialMediaPage.accessSocialMediaAuthPage();
});
Then("Social media page has displayed as expected", async function () {
  await socialMediaPage.verifyPageUI();
});
When(
  "User creates a new provider with name {string}, provider url {string}, client id {string}, client secret {string}",
  async function (name, url, id, secret) {
    await socialMediaPage.accessSocialMediaAuthPage();
    await socialMediaPage.createProvider(name, url, id, secret);
  }
);
Then(
  "A new provider with name {string} has been created",
  async function (text) {
    await socialMediaPage.verifyCreateProvider(text);
  }
);
When(
  "User updates a provider {string} to name {string}, provider url {string}, client id {string}, client secret {string}",
  async function (text, name, url, id, secret) {
    await socialMediaPage.accessSocialMediaAuthPage();
    await socialMediaPage.updateProvider(text, name, url, id, secret);
  }
);
Then("Provider has been updated to {string}", async function (text) {
  await socialMediaPage.verifyUpdateProvider(text);
});
When("User removes a provider with name {string}", async function (text) {
  await socialMediaPage.deleteProvider(text);
});
Then("Provider {string} has been deleted", async function (text) {
  await socialMediaPage.verifyDeleteProvider(text);
});
When("User removes all providers contain text {string}", async function (text) {
  await socialMediaPage.accessSocialMediaAuthPage();
  await socialMediaPage.deleteMultiProvider(text);
});
Then(
  "All selected provider contain text {string} have been deleted",
  async function (text) {
    await socialMediaPage.verifyDeleteMultiProvider(text);
  }
);
When(
  "User input on field {string} value {string}",
  async function (field, value) {
    await socialMediaPage.accessSocialMediaAuthPage();
    await socialMediaPage.inputDataOnCreateForm(field, value);
  }
);
Then(
  "Message has displayed under {string} as {string}",
  async function (field, validation) {
    await socialMediaPage.verifyValidationMessage(field, validation);
  }
);
