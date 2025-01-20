// pages/BasePage.ts
import { Page } from "@playwright/test";

export class BasePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async takeScreenshot(filePath: string): Promise<void> {
    await this.page.screenshot({ path: filePath, type: "png" });
  }
  protected getPage(): Page {
    return this.page;
  }
}
