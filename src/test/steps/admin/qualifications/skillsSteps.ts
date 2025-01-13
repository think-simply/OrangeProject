import { When, BeforeStep,Then } from "@cucumber/cucumber";
import { pageFixture } from "../../../../hooks/pageFixture";
import SkillPage from "../../../pages/admin/qualifications/skillsPage";
let skillPage: SkillPage;
BeforeStep(async () => {
    skillPage = new SkillPage(pageFixture.page);
});
When ("user access to skill page", async()=>{
    await skillPage.acessSkillPage();
});
Then ("all elements of skill page is displayed successfully", async()=>{
    await skillPage.verifyAcessSkillPage();
});
When ("user input valid data into name skill {string} and description skill {string}",async(nameSkill, descriptionSkill)=>{
    await skillPage.createSkill(nameSkill, descriptionSkill);
});
Then ("new skill is added successfully", async()=>{
    await skillPage.verifyCreateNewSkill();
});
When ("user edit a skill", async()=>{
    await skillPage.updateLevel();
});
Then ("the skill is updated successfully", async()=>{
    await skillPage.verifyUpdateSkill();
});