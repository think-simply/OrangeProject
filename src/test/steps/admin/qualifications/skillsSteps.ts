import { Given, When, Then } from "@cucumber/cucumber";
import EducationPage from "../../../pages/admin/qualifications/skillsPage";
import { pageFixture } from "../../../../hooks/pageFixture";
import SkillPage from "../../../pages/admin/qualifications/skillsPage";

Given("User navigates to Admin page", { timeout: 20000 }, async () => {
  const adminMenuPage = new SkillPage(pageFixture.adminPage);
  await adminMenuPage.visit();
});//access to admin page
When ("user access to skill page", {timeout:20000},async()=>{
    const skillPage = new SkillPage(pageFixture.adminPage);
    await skillPage.visitSkillPage();

});
Then ("all elements of skill page is displayed successfully",{timeout:20000},async()=>{
    const skillPage = new SkillPage(pageFixture.adminPage);
    await skillPage.afterVisitSkillPage();

});
When ("user input valid data into all fields of adding skill", {timeout:20000},async()=>{
    const skillPage = new SkillPage(pageFixture.adminPage);
    await skillPage.createSkill();
});
Then ("new skill is added successfully", {timeout:2000}, async()=>{
    const skillPage = new SkillPage(pageFixture.adminPage);
    await skillPage.afterCreateNewSkill();
});
When ("Update an existing skill successfully", {timeout: 20000}, async()=>{
    const skillPage = new SkillPage(pageFixture.adminPage);
    await skillPage.updateLevel();
});
Then ("the skill is updated successfully", {timeout:20000}, async()=>{
    const skillPage = new SkillPage(pageFixture.adminPage);
    await skillPage.afterupdateSkill();
});