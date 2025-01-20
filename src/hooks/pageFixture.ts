// pageFixture.ts
import { Page } from "@playwright/test";
// export const pageFixture: { page: Page } = {
//   page: null
// };
export const pageFixture = {
  page: undefined as unknown as Page,
  adminPage: undefined as unknown as Page,
  staffPage: undefined as unknown as Page,
  nonLoggedPage: undefined as unknown as Page,
};