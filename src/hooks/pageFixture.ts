// pageFixture.ts
import { Page } from "@playwright/test";
export const pageFixture: { page: Page; adminPage: Page; staffPage: Page; } = {
  page: null,
  adminPage: null,
  staffPage: null,
};