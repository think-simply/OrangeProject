import { browser } from "k6/browser";
import papa from "https://jslib.k6.io/papaparse/5.1.1/index.js";
import { check } from "k6";

const csvData = papa.parse(open("users.csv"), { header: true }).data;

const scenarios = {
  smoke: {
    stages: [{ duration: "1m", target: 2 }], // Short smoke test
  },
  load: {
    stages: [
      { duration: "1m", target: 6 },
      { duration: "1m", target: 14 },
      { duration: "1m", target: 14 }, // Maintain peak load
      { duration: "1m", target: 0 },
    ],
  },
  stress: {
    stages: [
      { duration: "1m", target: 10 }, // Higher load for stress test
      { duration: "1m", target: 15 },
      { duration: "1m", target: 15 }, // Maintain peak load
      { duration: "1m", target: 0 },
    ],
  },
};

let selectedScenario = __ENV.SCENARIO || "load"; // Default to "load"

export const options = {
  stages: scenarios[selectedScenario].stages,
  scenarios: {
    ui: {
      executor: "shared-iterations",
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
      "https://buianthai.online/orangehrm/web/index.php/auth/login"
    );
    await page.waitForSelector(".oxd-form");
    const token = await page
      .locator('input[name="_token"]')
      .getAttribute("value");

    console.log("Token:", token);
    check(token, { "token present": (t) => t != null && t !== "" });
    await page.locator('input[name="username"]').type(user.username);
    await page.locator('input[name="password"]').type(user.password);
    await page.locator('button[type="submit"]').click();
    await page.waitForNavigation(); // Wait for redirect after login
    const cookies = await page.context().cookies();
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
