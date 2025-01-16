import { APIRequestContext } from "@playwright/test";
import { expect } from "@playwright/test";

class JobTitleService {
  private apiContext: APIRequestContext;

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
  }

  // Method to list all
  async listAllJobTitles() {
    const response = await this.apiContext.get(`${process.env.JOB_API_URL}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response.status()).toBe(200); // Ensure API response status is 200
    const jobs = await response.json();
    return jobs.data; // Assuming `data` contains the list of job titles
  }

  // Method to delete a record by ID
  async deleteJobTile(jobId: string) {
    const response = await this.apiContext.delete(
      `${process.env.JOB_API_URL}`,
      {
        data: { ids: [jobId] },
      }
    );

    expect(response.status()).toBe(200); // Ensure API response status is 200
  }

  // Main flow to list users and delete a user by username
  async listAndDeleteJobTitle(jobTitleName: string) {
    const jobs = await this.listAllJobTitles();
    if (!jobs || jobs.length === 0) {
      return;
    }

    const jobToDelete = jobs.find(
      (job: { title: string }) => job.title === jobTitleName // get value from param 'title' in response of API
    );
    if (!jobToDelete) {
      return;
    }

    await this.deleteJobTile(jobToDelete.id);
  }
}

export default JobTitleService;
