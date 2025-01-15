import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import { pageFixture } from "#hooks/pageFixture";
import LanguagesPage from "#test/pages/admin/qualifications/languagesPage";
let languagesPage: LanguagesPage;

BeforeStep(async () => {
    languagesPage = new LanguagesPage(pageFixture.page)
})
// Pre-condition
Given("User accessed Languages page", async () => {
    await languagesPage.accessLanguages();
});

// LA_01: Check UI of Language page
Then("All elements are displayed as expected", async () => {
    await languagesPage.checkLanguagesUI();
});

// LA_02: Add a new Language
When("Click Add button Language", async () => {
    await languagesPage.clickAddButton();
});
When("Input valid data for Language contains name {string}", async (name) => {
    await languagesPage.inputLanguageData(name);
});
When("Click Save button for Language", async () => {
    await languagesPage.clickSaveButton();
});
Then("New language has been created", async () => {
    await languagesPage.verifyNewLanguageCreated();
});

// LA_03: Update a Language
When("User clicks Update icon for Language has name {string}", async (nameToUpdate) => {
    await languagesPage.clickUpdateIcon(nameToUpdate);
});
When("User updates data for Language", async () => {
    await languagesPage.updateLanguageData();
});
Then("Language has been updated", async () => {
    await languagesPage.verifyLanguageUpdated();
});

// LA_04: Delete a Language
When("User clicks Delete icon for Language has name {string}", async (nameToDelete) => {
    await languagesPage.clickDeleteIcon(nameToDelete);
});
When("User confirms delete for Language", async () => {
    await languagesPage.confirmDelete();
});
Then("Language has been deleted", async () => {
    await languagesPage.verifyLanguageDeleted();
});

// LA_05: Delete multiple Languages
When("User selects multiple languages contain name {string} and {string}", async (name1, name2) => {
    await languagesPage.selectMultipleLanguages(name1, name2);
});
When("User clicks Delete button for multiple Languages", async () => {
    await languagesPage.clickDeleteButton();
});
Then("Selected languages have been deleted", async () => {
    await languagesPage.verifyMultipleLanguagesDeleted();
});
