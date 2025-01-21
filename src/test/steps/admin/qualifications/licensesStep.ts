import { Given, Then, When, BeforeStep } from "@cucumber/cucumber";
import { LicensesPage } from "#test/pages/admin/qualifications/licensesPage";
import { pageFixture } from "#hooks/pageFixture";
let licensesPage: LicensesPage;

// Pre-condition
BeforeStep(async function () {
  licensesPage = new LicensesPage(pageFixture.page);
});
Given("User go to Qualifications > Licenses page", async function () {
  await licensesPage.visit();
  await licensesPage.clickAdminSection();
  await licensesPage.visitQualificationsLicenses();
});

// QL_01: Verify UI of Licenses page
Then("UI of Licenses page is displayed as expected", async function () {
  await licensesPage.verifyLicensesPage();
});

// QL_02: Add new license record -> Cancel
When("User clicks Add button for Licenses", async function () {
  await licensesPage.clickAddBtn();
});
When("User input valid data for Licenses", async function () {
  await licensesPage.inputLicense();
});
When(
  "User clicks Cancel button after data input for Licenses",
  async function () {
    await licensesPage.clickCancelBtn();
  }
);
Then("User is taken back to Licenses page", async function () {
  await licensesPage.verifyLicensesPage();
});

// QL_03: Add new license record -> Empty input
When(
  "User clicks Save button after data input for Licenses",
  async function () {
    await licensesPage.clickSaveBtn();
  }
);
Then(
  "Error message appears for required field for Licenses",
  async function () {
    await licensesPage.verifyErrorRequired();
  }
);

// QL_04: Add new license record -> Save
Then("New license record is created", async function () {
  await licensesPage.waitForRecordItem();
  await licensesPage.verifyRecordAdded();
});

// QL_05: Update new license record
When("User adds new license record", async function () {
  await licensesPage.clickAddBtn();
  await licensesPage.inputLicense();
  await licensesPage.clickSaveBtn();
  await licensesPage.waitForRecordItem();
});
When("User clicks Edit button for Licenses", async function () {
  await licensesPage.clickEditBtn();
});
When("User update valid data for Licenses", async function () {
  await licensesPage.updateLicense();
});
Then("License record is updated for Licenses", async function () {
  await licensesPage.waitForRecordItem();
  await licensesPage.verifyRecordUpdated();
});

// QL_06: Verify Delete dialog
When("User clicks Delete button for Licenses", async function () {
  await licensesPage.clickDeleteBtn();
});
Then(
  "Delete confirmation dialog appears as expected for Licenses",
  async function () {
    await licensesPage.verifyDialog();
  }
);

// QL_07: Delete dialog -> Dismiss
When("User clicks Close button for Licenses", async function () {
  await licensesPage.dimissDialog();
});
Then("Delete confirmation dialog disappears for Licenses", async function () {
  await licensesPage.verifyDialogDismissed();
});

// QL_08: Delete dialog -> Cancel
When("User clicks Cancel button for Licenses", async function () {
  await licensesPage.clickDialogCancelBtn();
});

// QL_09: Delete dialog -> Delete
When("User adds new alt license record", async function () {
  await licensesPage.clickAddBtn();
  await licensesPage.inputLicenseAlt();
  await licensesPage.clickSaveBtn();
  await licensesPage.waitForRecordItem();
});
When("User clicks Yes in delete dialog for Licenses", async function () {
  await licensesPage.clickDialogDeleteBtn();
});
Then(
  "Delete confirmation dialog disappears & record is deleted for Licenses",
  async function () {
    await licensesPage.verifyDialogDismissed();
    await licensesPage.waitForRecordItem();
    await licensesPage.verifyRecordDeleted();
  }
);
