import { APIRequestContext } from "@playwright/test";
import { expect } from "@playwright/test";

class EducationService {
  private apiContext: APIRequestContext;

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
  }

  // Method to list all education
  async listAllEducation() {
    const response = await this.apiContext.get(`${process.env.EDU_API_URL}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response.status()).toBe(200); // Ensure API response status is 200
    const educations = await response.json();
    return educations.data; // Assuming `data` contains the list of education
  }

  // Method to delete an user by ID
  async deleteEducation(educationId: string) {
    const response = await this.apiContext.delete(
      `${process.env.EDU_API_URL}`,
      {
        data: { ids: [educationId] },
      }
    );

    expect(response.status()).toBe(200); // Ensure API response status is 200
  }

  // Main flow to list and delete an education by education name
  async listAndDeleteEducation(educationname: string) {
    const educations = await this.listAllEducation();
    if (!educations || educations.length === 0) {
      return;
    }

    const educationToDelete = educations.find(
      (education: { name: string }) => education.name === educationname
    );
    if (!educationToDelete) {
      return;
    }

    await this.deleteEducation(educationToDelete.id);
  }
}

export default EducationService;
