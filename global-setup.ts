import { chromium } from "@playwright/test";
import { authConfig } from "./auth.Config";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { BasePage } from "./src/test/pages/basePage/basePage";

dotenv.config();

async function globalSetup() {
  // Tạo thư mục .auth nếu chưa tồn tại
  const authDir = path.join(process.cwd(), "playwright/.auth");
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }
  const browser = await chromium.launch();

  // Setup for admin
  const adminContext = await browser.newContext();
  const adminPage = await adminContext.newPage();
  await adminPage.goto(`${process.env.WEB_URL}`);
  await adminPage.fill(BasePage.userName, authConfig.admin.username);
  await adminPage.fill(BasePage.passWord, authConfig.admin.password);
  await adminPage.click(BasePage.loginBtn);
  // Wait for login to complete - adjust selector as needed
  await adminPage.waitForSelector('h6:text("Dashboard")');
  // Store authentication state
  console.log("Storing auth state...");
  await adminContext.storageState({ path: authConfig.admin.storageState });
  console.log("Auth state saved to:", authConfig.admin.storageState);
  await browser.close();
}

module.exports = globalSetup;
