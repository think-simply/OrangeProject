import { browser } from "k6/browser";
import papa from "https://jslib.k6.io/papaparse/5.1.1/index.js";
import { check } from "k6";

const csvData = papa.parse(open("users.csv"), { header: true }).data;

// Define test configurations for different scenarios
const testConfigs = {
  smoke: {
    executor: "shared-iterations",
    vus: 2,
    iterations: 10,
    maxDuration: "1m",
  },
  load: {
    executor: "shared-iterations",
    vus: 14,
    iterations: 14,
    maxDuration: "5m",
  },
  normal: {
    executor: "ramping-vus",
    stages: [
      { duration: "30s", target: 6 }, // Increase to 6 VUs in 30s
      { duration: "30s", target: 10 }, // Increase to 10 VUs in next 30s
      { duration: "30s", target: 6 }, // Reduce to 6 VUs in next 30s
      { duration: "30s", target: 0 }, // Reduce to 0 VUs in final 30s
    ],
  },
};

const scenario = __ENV.SCENARIO;

// Export dynamic options based on selected scenario
export const options = {
  scenarios: {
    ui: {
      executor: testConfigs[scenario].executor,
      // Apply stages if present (for ramping-vus), otherwise use shared-iterations properties
      ...(testConfigs[scenario].stages
        ? { stages: testConfigs[scenario].stages }
        : {
            vus: testConfigs[scenario].vus,
            iterations: testConfigs[scenario].iterations,
            maxDuration: testConfigs[scenario].maxDuration,
          }),
      // Browser options remain at this level for all scenarios
      options: {
        browser: {
          type: "chromium",
        },
      },
    },
  },
  thresholds: {
    checks: ["rate==1.0"],
  },
};

export default async function () {
  const page = await browser.newPage();
  let user = csvData[__VU - 1];
  try {
    await page.goto(
      "https://buianthai.online/orangehrm/web/index.php/auth/login",
      { timeout: 60000 }
    );
    await page.waitForSelector(".oxd-form", { timeout: 60000 });
    const token = await page
      .locator('input[name="_token"]')
      .getAttribute("value", { timeout: 60000 });

    console.log("Token:", token);
    check(token, { "token present": (t) => t != null && t !== "" });
    await page.locator('input[name="username"]').type(user.username);
    await page.locator('input[name="password"]').type(user.password);
    await page.locator('button[type="submit"]').click({ timeout: 60000 });
    await page.waitForNavigation({ timeout: 60000 }); // Wait for redirect after login
    const cookies = await page.context().cookies({ timeout: 60000 });
    const orangehrmCookie = cookies.find((c) => c.name === "orangehrm");
    console.log(
      `Cookie for VU ${__VU}:`,
      orangehrmCookie ? orangehrmCookie.value : "Not found"
    );

    check(orangehrmCookie, {
      "cookie present": (c) => c != null,
      "cookie contains orangehrm": (c) => c && c.name === "orangehrm",
    });
  } finally {
    await page.close();
  }
}
