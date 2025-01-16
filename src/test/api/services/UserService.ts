import { APIRequestContext } from "@playwright/test";
import { expect } from "@playwright/test";

class UserService {
  private apiContext: APIRequestContext;

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
  }

  // Method to list all users
  async listAllUsers() {
    const response = await this.apiContext.get(`${process.env.USER_API_URL}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response.status()).toBe(200); // Ensure API response status is 200
    const users = await response.json();
    return users.data; // Assuming `data` contains the list of users
  }

  // Method to delete a user by ID
  async deleteUser(userId: string) {
    const response = await this.apiContext.delete(
      `${process.env.USER_API_URL}`,
      {
        data: { ids: [userId] },
      }
    );

    expect(response.status()).toBe(200); // Ensure API response status is 200
  }

  // Main flow to list users and delete a user by username
  async listAndDeleteUser(username: string) {
    const users = await this.listAllUsers();
    if (!users || users.length === 0) {
      return;
    }

    const userToDelete = users.find(
      (user: { userName: string }) => user.userName === username
    );
    if (!userToDelete) {
      return;
    }

    await this.deleteUser(userToDelete.id);
  }
}

export default UserService;
