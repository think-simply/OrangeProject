import { Page, expect } from "@playwright/test";
import { APIRequestContext } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export default class LoginPage {
    readonly page: Page;
    private apiContext: any;
    constructor(page: Page) {
        this.page = page;
    }
    elements = {
        warningAuthorizationMessage: () => this.page.locator('//p[text()="Invalid credentials"]'),
    }
    async visit() {
        await this.page.goto(`${process.env.WEB_URL}`);
      }
      async verifyGuestAccess() {
                                                                       
      }

}
