import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import MembershipsPage from "#test/pages/admin/qualifications/membershipsPage";
import { pageFixture } from "#hooks/pageFixture";
let membershipsPage: MembershipsPage;

BeforeStep( async function () {
    membershipsPage = new MembershipsPage(pageFixture.page);
})

// Pre-condition
Given("User accessed Memberships page", async function () {
    await membershipsPage.accessMemberships();
});

// ME_01: Check UI of Memberships page
Then("All elements are displayed as expected in Memberships", async function () {
    await membershipsPage.checkMembershipsUI();
});

// ME_02: Add a new Membership
When("User clicks Add button for Membership", async function () {
    await membershipsPage.clickAddButton();
});
When("User inputs valid data for Membership contains name {string}", async function (name) {
    await membershipsPage.inputMembershipData(name);
});
When("User clicks Save button for Membership", async function () {
    await membershipsPage.clickSaveButton();
});
Then("New membership has been created", async function () {
    await membershipsPage.verifyNewMembershipCreated();
});

// ME_03: Update a Membership
When("User clicks Update icon for Membership has name {string}", async function (nameToUpdate) {
    await membershipsPage.clickUpdateIcon(nameToUpdate);
});
When("User updates data for Membership", async function () {
    await membershipsPage.updateMembershipData();
});
Then("Membership has been updated", async function () {
    await membershipsPage.verifyMembershipUpdated();
});

// ME_04: Delete a Membership
When("User clicks Delete icon for Membership has name {string}", async function (nameToDelete) {
    await membershipsPage.clickDeleteIcon(nameToDelete);
});
When("User confirms delete for Membership", async function () {
    await membershipsPage.confirmDelete();
});
Then("Membership has been deleted", async function () {
    await membershipsPage.verifyMembershipDeleted();
});

// ME_05: Delete multiple Memberships
When("User selects multiple memberships contain name {string} and {string}", async (name1, name2) => {
    await membershipsPage.selectMultipleMemberships(name1, name2);
});
When("User clicks Delete button for multiple Memberships", async function () {
    await membershipsPage.clickDeleteButton();
});
Then("All selected memberships have been deleted", async function () {
    await membershipsPage.verifyMultipleMembershipsDeleted();
});
