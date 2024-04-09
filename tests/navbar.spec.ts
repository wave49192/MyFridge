import { test, expect } from "@playwright/test";

// Fixture for common navigation
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173");
});

test("dashboard tab goes to dashboard page", async ({ page }) => {
  await page.click('text="Dashboard"');
  const url = page.url();
  expect(url).toMatch(/dashboard/);
});

// test("inventory tab goes to inventory page", async ({ page }) => {
//   await page.click('text="Inventory"');
//   const url = page.url();
//   expect(url).toMatch(/inventory/);
// });

test("recipes tab goes to recipes page", async ({ page }) => {
  await page.click('text="Recipes"');
  const url = page.url();
  expect(url).toMatch(/recipes/);
});

test("show login button when not logged in", async ({ page }) => {
  const loginButton = await page.$('text="Log in"');
  expect(loginButton).not.toBeNull();
});
