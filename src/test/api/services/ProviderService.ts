import { APIRequestContext } from "@playwright/test";

export class ProviderService {
  private apiContext: APIRequestContext;

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
  }

  async createProvider(requestBody: object) {
    return await this.apiContext.post("v2/auth/openid-providers", {
      data: requestBody,
    });
  }

  async updateProvider(providerId: string, requestBody: object) {
    return await this.apiContext.put(`v2/auth/openid-providers/${providerId}`, {
      data: requestBody,
    });
  }

  async deleteProvider(providerId: string) {
    return await this.apiContext.delete("v2/auth/openid-providers", {
      data: { ids: [providerId] },
    });
  }

  async listProviders(limit: number = 50, offset: number = 0) {
    return await this.apiContext.get(
      `v2/auth/openid-providers?limit=${limit}&offset=${offset}`
    );
  }
  async getListing(limit: number, offset: number) {
    const response = await this.apiContext.get(
      `v2/auth/openid-providers?limit=${limit}&offset=${offset}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const responseBody = await response.json();
    return { status: response.status(), data: responseBody };
  }

  async postListing(limit: number, offset: number) {
    const response = await this.apiContext.post(
      `v2/auth/openid-providers?limit=${limit}&offset=${offset}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const responseBody = await response.json();
    return { status: response.status(), data: responseBody };
  }
}
