import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import MembershipsPage from "#test/pages/admin/qualifications/membershipsPage";
import { pageFixture } from "#hooks/pageFixture";
let membershipsPage: MembershipsPage;

BeforeStep( async() => {
    membershipsPage = new MembershipsPage(pageFixture.page);
})

// Pre-condition
Given("User accessed Memberships page", async () => {
    await membershipsPage.accessMemberships();
});

// ME_01: Check UI of Memberships page
Then("All elements are displayed as expected in Memberships", async () => {
    await membershipsPage.checkMembershipsUI();
});

// ME_02: Add a new Membership
When("User clicks Add button for Membership", async () => {
    await membershipsPage.clickAddButton();
});
When("User inputs valid data for Membership contains name {string}", async (name) => {
    await membershipsPage.inputMembershipData(name);
});
When("User clicks Save button for Membership", async () => {
    await membershipsPage.clickSaveButton();
});
Then("New membership has been created", async () => {
    await membershipsPage.verifyNewMembershipCreated();
});

// ME_03: Update a Membership
When("User clicks Update icon for Membership has name {string}", async (nameToUpdate) => {
    await membershipsPage.clickUpdateIcon(nameToUpdate);
});
When("User updates data for Membership", async () => {
    await membershipsPage.updateMembershipData();
});
Then("Membership has been updated", async () => {
    await membershipsPage.verifyMembershipUpdated();
});

// ME_04: Delete a Membership
When("User clicks Delete icon for Membership has name {string}", async (nameToDelete) => {
    await membershipsPage.clickDeleteIcon(nameToDelete);
});
When("User confirms delete for Membership", async () => {
    await membershipsPage.confirmDelete();
});
Then("Membership has been deleted", async () => {
    await membershipsPage.verifyMembershipDeleted();
});

// ME_05: Delete multiple Memberships
When("User selects multiple memberships contain name {string} and {string}", async (name1, name2) => {
    await membershipsPage.selectMultipleMemberships(name1, name2);
});
When("User clicks Delete button for multiple Memberships", async () => {
    await membershipsPage.clickDeleteButton();
});
Then("All selected memberships have been deleted", async () => {
    await membershipsPage.verifyMultipleMembershipsDeleted();
});
