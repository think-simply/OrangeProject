import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import LanguagesAdminPage from "../../../pages/admin/qualifications/languagesPage";
import { pageFixture } from "../../../../hooks/pageFixture";
let adminMenuPage: LanguagesAdminPage;

BeforeStep( async() => {
    adminMenuPage = new LanguagesAdminPage(pageFixture.adminPage);
})

// Pre-condition
Given("User accessed Languages page", async () => {
    await adminMenuPage.accessLanguages();
});

// LA_01: Check UI of Language page
Then("All elements are displayed as expected", async () => {
    await adminMenuPage.checkLanguagesUI();
});

// LA_02: Add a new Language
When("Click Add button Language", async () => {
    await adminMenuPage.clickAddButton();
});
When("Input valid data for Language contains name {string}", async (name) => {
    await adminMenuPage.inputLanguageData(name);
});
When("Click Save button for Language", async () => {
    await adminMenuPage.clickSaveButton();
});
Then("New language has been created", async () => {
    await adminMenuPage.verifyNewLanguageCreated();
});

// LA_03: Update a Language
When("User clicks Update icon for Language has name {string}", async (nameToUpdate) => {
    await adminMenuPage.clickUpdateIcon(nameToUpdate);
});
When("User updates data for Language", async () => {
    await adminMenuPage.updateLanguageData();
});
Then("Language has been updated", async () => {
    await adminMenuPage.verifyLanguageUpdated();
});

// LA_04: Delete a Language
When("User clicks Delete icon for Language has name {string}", async (nameToDelete) => {
    await adminMenuPage.clickDeleteIcon(nameToDelete);
});
When("User confirms delete for Language", async () => {
    await adminMenuPage.confirmDelete();
});
Then("Language has been deleted", async () => {
    await adminMenuPage.verifyLanguageDeleted();
});

// LA_05: Delete multiple Languages
When("User selects multiple languages contain name {string} and {string}", async (name1, name2) => {
    await adminMenuPage.selectMultipleLanguages(name1, name2);
});
When("User clicks Delete button for multiple Languages", async () => {
    await adminMenuPage.clickDeleteButton();
});
Then("Selected languages have been deleted", async () => {
    await adminMenuPage.verifyMultipleLanguagesDeleted();
});
