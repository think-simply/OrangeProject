import { chromium } from '@playwright/test';
import { authConfig } from './src/config/auth.config';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

async function globalSetup(userType: 'admin' | 'staff') {
  const authDir = path.join(process.cwd(), "playwright/.auth");
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const browser = await chromium.launch();

  // Setup for the provided userType
  const userContext = await browser.newContext();
  const userPage = await userContext.newPage();
  await userPage.goto(`${process.env.WEB_URL}`);
  
  const userCredentials = authConfig[userType]; // Get credentials for admin or staff
  await userPage.fill('//input[@placeholder="Username"]', userCredentials.username);
  await userPage.fill('//input[@placeholder="Password"]', userCredentials.password);
  await userPage.click('//button[@type="submit"]');

  console.log(`Storing auth state for ${userType}...`);
  await userContext.storageState({ path: userCredentials.storageState });
  console.log(`Auth state saved to:`, userCredentials.storageState);

  await browser.close();
}

// Call this function for different user types
// Example usage for admin
globalSetup('admin');

// Example usage for staff
globalSetup('staff');