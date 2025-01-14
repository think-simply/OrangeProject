import { Given, When, Then } from "@cucumber/cucumber";
import AdminMenuPage from "../../../pages/admin/userManagement/userPage";
import { pageFixture } from "../../../../hooks/pageFixture";


Given("User ESS navigates to page", async () => {
    const employeePage = new AdminMenuPage(pageFixture.memberPage);
    await employeePage.visit();
});
Then("User ESS can not access the Admin menu", async () => {
    const employeePage = new AdminMenuPage(pageFixture.memberPage);
    await employeePage.essAccessUserPage();
});