import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ApiContextManager } from "#test/api/services/ApiContextManager";
import { SubUnitService } from "#test/api/services/SubUnitService";

let subUnitService: SubUnitService;
let response: any;
let subUnitId: string;

Given("We created the SubUnitService context", async function () {
  const apiContext = await ApiContextManager.initializeContext(
    `${process.env.SUBUNIT_API_URL}`
  );
  subUnitService = new SubUnitService(apiContext);
});

Then("I delete a subunit name {string}", async function (name:string) {
  response = await subUnitService.deleteASubUnitsByName(name);
});

// Use below to clean up subunit
// Then("I deleted all old subunit", async function () {
//   response = await subUnitService.deleteAllLevel1SubUnits();
// });

