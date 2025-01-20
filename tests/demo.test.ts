import { test, expect } from "@playwright/test";

test("test", async function ({ page }) {
  await page.goto(
    "https://buianthai.online/orangehrm/web/index.php/auth/login"
  );
  await page.waitForURL(
    "https://buianthai.online/orangehrm/web/index.php/dashboard/index"
  );
  await page.locator('//span[text()="Admin"]').click();
  await page.getByText("-- Select --").first().click();
  await page.getByRole("option", { name: "ESS" }).click();
  await page.getByRole("button", { name: "Search" }).click();
  await page.waitForTimeout(1000);
  await page.pause();
});
