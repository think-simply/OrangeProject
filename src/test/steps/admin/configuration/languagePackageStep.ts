import { Given, When, Then } from "@cucumber/cucumber";
import AdminMenuPage from "../../../pages/admin/configuration/languagePackagePage";
import { pageFixture } from "../../../../hooks/pageFixture";


When("User access social media authen page", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.accessSocialMediaAuthPage();
});
Then("Social media page has displayed as expected", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.afterAcccessSocialMediaAuthPage();
});
