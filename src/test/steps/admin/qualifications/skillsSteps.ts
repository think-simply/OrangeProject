import { When, BeforeStep,Then } from "@cucumber/cucumber";
import { pageFixture } from "../../../../hooks/pageFixture";
import SkillPage from "../../../pages/admin/qualifications/skillsPage";
let skillPage: SkillPage;
BeforeStep(async () => {
    skillPage = new SkillPage(pageFixture.adminPage);
});

When ("user access to skill page", async()=>{
    await skillPage.acessSkillPage();
});
Then ("all elements of skill page is displayed successfully", async()=>{
    await skillPage.afterAcessSkillPage();
});
When ("user input valid data into name skill {string} and description skill {string}",async(nameSkill, descriptionSkill)=>{
    await skillPage.createSkill(nameSkill, descriptionSkill);
});
Then ("new skill is added successfully", async()=>{
    await skillPage.afterCreateNewSkill();
});
When ("Update an existing skill successfully", async()=>{
    await skillPage.updateLevel();
});
Then ("the skill is updated successfully", async()=>{
    await skillPage.afterupdateSkill();
});