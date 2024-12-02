import { Page, Locator, expect } from "@playwright/test";

export default class AdminMenuPage {
    readonly page: Page;
    readonly userName: Locator;
    

    constructor(page: Page) {
        this.page = page;
       

    }

    async accessSocialMediaAuthPage() {
      
    }

   }