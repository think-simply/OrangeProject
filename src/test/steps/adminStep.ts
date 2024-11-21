import { Given, When, Then } from "@cucumber/cucumber";
import AdminMenuPage from "../pages/adminPage";
import { pageFixture } from "../../hooks/pageFixture";


Given("User navigates to page", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.visit();
});
When("User logs in as Admin", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.login();
});
When("User creates a new ESS user", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.createUser();
});
// Then("New ESS user has been created successfully", { timeout: 30000 }, async () => {
//     const adminMenuPage = new AdminMenuPage(pageFixture.page);
//     await adminMenuPage.ErrorMessage();
// });

