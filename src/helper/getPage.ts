import { pageFixture } from "../hooks/pageFixture";
import EducationPage from "../../../pages/admin/qualifications/educationPage";

// Reusable function to get the page object dynamically
export function getPage(userType: 'admin' | 'staff') {
  const page = pageFixture[`${userType}Page`];
  if (!page) {
    throw new Error(`${userType} page is not available in pageFixture`);
  }
  return new EducationPage(page);  // Or dynamically return the correct page class
}