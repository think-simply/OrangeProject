// pages/AdminPage.ts
import { Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class AdminPage extends BasePage {
  constructor(page: Page) {
    super(page); // Pass the page instance to the BasePage constructor
  }
  async searchWithQueryParams(
    expectedParams: Record<string, string>
  ): Promise<void> {
    let isCorrectRequestSent = false;
    let retries = 0;

    // Set up route interception once before the loop
    await this.getPage().route("**/api/v2/admin**", async function (route) {
      const url = new URL(route.request().url());
      console.log("Intercepted request URL:", url.toString());

      // Log all parameters to debug mismatches
      console.log(
        "Request parameters:",
        Object.fromEntries(url.searchParams.entries())
      );

      const allParamsMatch = Object.entries(expectedParams).every(
        ([key, value]) => url.searchParams.get(key) === value
      );

      console.log("All parameters match:", allParamsMatch);

      if (allParamsMatch) {
        isCorrectRequestSent = true;
        console.log("Correct request detected, setting flag to true.");
      }

      await route.continue();
    });

    // Retry loop
    while (!isCorrectRequestSent && retries < 5) {
      console.log(`Attempt ${retries + 1}: Clicking the search button`);

      await this.getPage().locator('//button[@type="submit"]').click();

      try {
        const response = await this.getPage().waitForResponse(
          "**/api/v2/admin**",
          { timeout: 30000 }
        );

        console.log("Response received:", {
          url: response.url(),
          status: response.status(),
          body: await response.text(),
        });
      } catch (error) {
        console.error(
          `Response wait timeout on attempt ${retries + 1}:`,
          error
        );
      }

      retries++;
    }

    // Throw an error if the correct request wasn't sent
    if (!isCorrectRequestSent) {
      throw new Error(`Failed to match query params after ${retries} retries.`);
    }

    // Clean up after test
    await this.getPage().unroute("**/api/v2/admin**");
  }
}
