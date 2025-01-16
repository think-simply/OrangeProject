import { APIRequestContext, request } from "@playwright/test";
import path from "path";
import * as fs from "fs";

export class ApiContextManager {
  private static apiContext: APIRequestContext | null = null;

  static async initializeContext(baseURL: string): Promise<APIRequestContext> {
    if (!this.apiContext) {
      const storageFile = path.join(
        process.cwd(),
        "playwright/.auth/admin.json"
      );
      const storageContent = fs.readFileSync(storageFile, "utf8");
      const storageData = JSON.parse(storageContent);
      const orangehrmCookie = storageData.cookies.find(
        (cookie: any) => cookie.name === "orangehrm"
      );
      if (!orangehrmCookie)
        throw new Error("orangehrm cookie not found in storage state");

      const cookieValue = `${orangehrmCookie.name}=${orangehrmCookie.value}`;
      this.apiContext = await request.newContext({
        baseURL,
        extraHTTPHeaders: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Cookie: cookieValue,
        },
      });
    }
    return this.apiContext;
  }

  static async getContext(): Promise<APIRequestContext> {
    if (!this.apiContext) throw new Error("API context is not initialized");
    return this.apiContext;
  }
}