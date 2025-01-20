import { When, BeforeStep, Then } from "@cucumber/cucumber";
import { pageFixture } from "#hooks/pageFixture";
import SkillPage from "#test/pages/admin/qualifications/skillsPage";
let skillPage: SkillPage;
BeforeStep(async function () {
  skillPage = new SkillPage(pageFixture.page);
});
When("User access to skill page", async function () {
  await skillPage.acessSkillPage();
});
Then("All elements of skill page is displayed successfully", async function () {
  await skillPage.verifyAcessSkillPage();
});
When(
  "User input valid data into name skill {string} and description skill {string}",
  async function (nameSkill, descriptionSkill) {
    await skillPage.createSkill(nameSkill, descriptionSkill);
  }
);
Then("New skill is added successfully", async function () {
  await skillPage.verifyCreateNewSkill();
});
When(
  "User edit a skill {string} into {string}",
  async function (text, newName) {
    await skillPage.updateLevel(text, newName);
  }
);
Then("The skill is updated successfully", async function () {
  await skillPage.verifyUpdateSkill();
});

When("User delete skill {string}", async function (text) {
  await skillPage.deleteSkill(text);
});
