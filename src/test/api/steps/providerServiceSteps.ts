import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ApiContextManager } from "#test/api/services/ApiContextManager";
import { ProviderService } from "#test/api/services/ProviderService";

let providerService: ProviderService;
let response: any;
let providerId: string;

Given("The API endpoint is {string}", async function (endpoint: string) {
  const apiContext = await ApiContextManager.initializeContext(endpoint);
  providerService = new ProviderService(apiContext);
});

When(
  "I send a POST request to create new provider with parameters:",
  async function (dataTable: DataTable) {
    const requestBody: Record<string, string> = {};
    dataTable.hashes().forEach(function (row) {
      requestBody[row.parameter] = row.value;
    });
    response = await providerService.createProvider(requestBody);
  }
);

Then(
  "API should response correctly with provider name {string}",
  async function (name: string) {
    const responseBody = await response.json();
    expect(responseBody.data.providerName).toBe(name);
    providerId = responseBody.data.id;
  }
);

Then(
  "The response status should be {int}",
  async function (expectedStatus: number) {
    expect(response.status()).toBe(expectedStatus);
  }
);

When(
  "I send a PUT request to update a provider with parameters:",
  async function (dataTable: DataTable) {
    const requestBody: Record<string, string> = {};
    dataTable.hashes().forEach(function (row) {
      requestBody[row.parameter] = row.value;
    });
    response = await providerService.updateProvider(providerId, requestBody);
  }
);

When("I send a delete request to delete a provider", async function () {
  response = await providerService.deleteProvider(providerId);
});

When("I send a GET request to get listing API", async function () {
  response = await providerService.listProviders(50, 0);
});

Then("API should response correct properties", async function () {
  const responseBody = await response.json();
  const firstItem = responseBody.data[0];
  expect(firstItem).toHaveProperty("providerName");
  expect(firstItem).toHaveProperty("id");
  expect(firstItem).toHaveProperty("clientId");
  expect(firstItem).toHaveProperty("providerUrl");
  expect(firstItem).toHaveProperty("status");
});

When("I send a POST request to get listing API", async function () {
  response = await providerService.postListing(50, 0);
});
