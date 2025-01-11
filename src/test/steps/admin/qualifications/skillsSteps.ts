import {  When, Then, BeforeStep } from "@cucumber/cucumber";
import { pageFixture } from "../../../../hooks/pageFixture";
import SkillPage from "../../../pages/admin/qualifications/skillsPage";
let skillPage: SkillPage;

BeforeStep( async() => {
    skillPage = new SkillPage(pageFixture.page);
})

When("User access to skill page", async()=>{
    await skillPage.visitSkillPage();
});
Then("All elements of skill page is displayed successfully",async()=>{
    await skillPage.afterVisitSkillPage();
});
When("User input valid data into all fields of adding skill", async()=>{
    await skillPage.createSkill();
});
Then("New skill is added successfully", async()=>{
    await skillPage.afterCreateNewSkill();
});
When("Update an existing skill successfully", async()=>{
    await skillPage.updateLevel();
});
Then("The skill is updated successfully", async()=>{
    await skillPage.afterupdateSkill();
});