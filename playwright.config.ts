import { defineConfig } from "@playwright/test";
import { testData } from "./utils/testData";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: testData.baseUrl,
    trace: "on-first-retry",
  },
});