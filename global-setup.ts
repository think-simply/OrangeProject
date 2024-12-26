import { chromium } from '@playwright/test';
import { authConfig } from './auth.config';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
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
  await adminPage.fill('//input[@placeholder="Username"]', authConfig.admin.username);
  await adminPage.fill('//input[@placeholder="Password"]', authConfig.admin.password);
  await adminPage.click('//button[@type="submit"]');
  // Wait for login to complete - adjust selector as needed
  // await adminPage.waitForSelector('//p[normalize-space()="Time at Work"]', { timeout: 10000 });
  console.log('Storing auth state...');
  await adminContext.storageState({ path: authConfig.admin.storageState });
  console.log('Auth state saved to:', authConfig.admin.storageState);


  await browser.close();
}

export default globalSetup;
