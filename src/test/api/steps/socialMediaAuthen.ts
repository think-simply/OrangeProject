import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { APIRequestContext, request } from '@playwright/test';
import { expect } from '@playwright/test';
import {RequestBody, StorageState} from '../type/socialMediaAuthen'
import path from 'path';
import * as fs from 'fs';

let apiContext: APIRequestContext;
let apiEndpoint: string;
let response: any;
let providerId: string;
let providername: string;
let id: string;
let clientId: string;
let providerUrl: string;
let status: string
let responseData: any;

async function getAuthToken() {
    const storageFile = path.join(process.cwd(), 'playwright/.auth/admin.json');
    const storageContent = fs.readFileSync(storageFile, 'utf8');
    const storageData: StorageState = JSON.parse(storageContent);
    const orangehrmCookie = storageData.cookies.find(cookie => cookie.name === 'orangehrm');
    if (!orangehrmCookie) {
        throw new Error('orangehrm cookie not found in storage state');
    }
    return `${orangehrmCookie.name}=${orangehrmCookie.value}`;
}
Given('the API endpoint is {string}', async function (endpoint: string) {
    apiEndpoint = endpoint;
    const cookieValue = await getAuthToken();
    apiContext = await request.newContext({
        baseURL: endpoint,
        extraHTTPHeaders: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Cookie': cookieValue,
        }
    });
});
When('I send a POST request to create new provider with parameters:', async function (dataTable: DataTable) {
    const requestBody: RequestBody = {};
    dataTable.hashes().forEach((row) => {
        requestBody[row.parameter] = row.value;
    });
    response = await apiContext.post('v2/auth/openid-providers', {
        data: requestBody,
        headers: {
            'Content-Type': 'application/json'
        }
    });
});
Then('API should response correctly with provider name {string}', async function (name: string) {
    //get response
    const responseBody = await response.text();
    //parse JSON string to javascript object
    const responseBodyObject = JSON.parse(responseBody);
    const providerName = responseBodyObject.data.providerName;
    providerId = responseBodyObject.data.id;
    expect(providerName).toBe(name);
});
Then('the response status should be {int}', async function (expectedStatus: number) {
    expect(response.status()).toBe(expectedStatus);
});
When('I send a PUT request to update a provider with parameters:', async function (dataTable: DataTable) {
    const requestBody: RequestBody = {};
    dataTable.hashes().forEach((row) => {
        requestBody[row.parameter] = row.value;
    });
    response = await apiContext.put(`v2/auth/openid-providers/${providerId}`, {
        data: requestBody,
        headers: {
            'Content-Type': 'application/json'
        }
    });
});
When('I send a delete request to delete a provider', async function () {
    response = await apiContext.delete('v2/auth/openid-providers', {
        data: {
            ids: [providerId] // add providerId into body
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });
});
When('I send a GET request to get listing API', async function () {
    response = await apiContext.get('v2/auth/openid-providers?limit=50&offset=0', {
        headers: {
            'Content-Type': 'application/json'
        },
        ignoreHTTPSErrors: true, // Thêm option này
    });
    const responseBody = await response.text();
    responseData = JSON.parse(responseBody);
    // save data from first item in array data
    providername = responseData.data[0].providerName;
    id = responseData.data[0].id;
    clientId = responseData.data[0].clientId; 
    providerUrl = responseData.data[0].providerUrl;
    status = responseData.data[0].status;
});
Then('API should response correct properties', async function () {
  // verify first item have enough properties
  const firstItem = responseData.data[0];
  expect(firstItem).toHaveProperty('providerName', providername);
  expect(firstItem).toHaveProperty('id', id);
  expect(firstItem).toHaveProperty('clientId', clientId);
  expect(firstItem).toHaveProperty('providerUrl', providerUrl);
  expect(firstItem).toHaveProperty('status', status);
});
When('I send a POST request to get listing API', async function () {
    response = await apiContext.post('v2/auth/openid-providers?limit=50&offset=0', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
});





