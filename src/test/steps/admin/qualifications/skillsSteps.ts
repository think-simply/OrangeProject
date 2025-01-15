import { When, BeforeStep,Then } from "@cucumber/cucumber";
import { pageFixture } from "#hooks/pageFixture";
import SkillPage from "#test/pages/admin/qualifications/skillsPage";
let skillPage: SkillPage;
BeforeStep(async () => {
    skillPage = new SkillPage(pageFixture.page);
});
When ("User access to skill page", async()=>{
    await skillPage.acessSkillPage();
});
Then ("All elements of skill page is displayed successfully", async()=>{
    await skillPage.verifyAcessSkillPage();
});
When ("User input valid data into name skill {string} and description skill {string}",async(nameSkill, descriptionSkill)=>{
    await skillPage.createSkill(nameSkill, descriptionSkill);
});
Then ("New skill is added successfully", async()=>{
    await skillPage.verifyCreateNewSkill();
});
When ("User edit a skill {string} into {string}", async(text, newName)=>{
    await skillPage.updateLevel(text, newName);
});
Then ("The skill is updated successfully", async()=>{
    await skillPage.verifyUpdateSkill();
});

When ("User delete skill {string}", async(text)=>{
    await skillPage.deleteSkill(text);
});