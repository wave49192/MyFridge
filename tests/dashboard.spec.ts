import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173");
});

test("DashboardPage not login ", async ({ page }) => {
  const notLoginText = await page.waitForSelector(
    'span:has-text("You don\'t have an inventory yet")'
  );
  const exploreText = await page.waitForSelector(
    "h1:has-text('Explore our Recipes')"
  );
  expect(notLoginText).not.toBeNull();
  expect(exploreText).not.toBeNull();
});

test("DashboardPage login", async ({ page }) => {
  await page.click("button:text('Log in')");
  await page.click("button:text('Mock Login')");
  await page.getByRole("link", { name: "Dashboard" }).click();

  const overviewText = await page.waitForSelector(
    "h1:has-text('Overview Fridge')"
  );
  expect(overviewText).not.toBeNull();
  const recommendedText = await page.waitForSelector(
    "h1:has-text('Recommended Recipes')"
  );
  expect(recommendedText).not.toBeNull();
});
