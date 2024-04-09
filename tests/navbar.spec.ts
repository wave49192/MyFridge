import { test, expect } from "@playwright/test";

// Fixture for common navigation
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173");
});

test("dashboard tab goes to dashboard page", async ({ page }) => {
  await page.click('text="Dashboard"');
  const url = page.url();
  expect(url).toEqual("http://localhost:5173/");
});

test("inventory tab goes to inventory page", async ({ page }) => {
  await page.getByRole("button", { name: "Log in" }).click();
  await page.getByRole("button", { name: "Mock Login" }).click();
  await page.getByRole("link", { name: "Inventory" }).click();
  const url = page.url();
  expect(url).toMatch(/inventory/);
});

test("recipes tab goes to recipes page", async ({ page }) => {
  await page.click('text="Recipes"');
  const url = page.url();
  expect(url).toMatch(/recipes/);
});

test("show login button when not logged in", async ({ page }) => {
  const loginButton = await page.$('text="Log in"');
  expect(loginButton).not.toBeNull();
});

test("show user profile when authenticated", async ({ page }) => {
  await page.click('button:has-text("Log in")');
  await page.click('button:has-text("Mock Login")');
  const userProfileButton = await page.waitForSelector(".avatar");
  expect(userProfileButton).not.toBeNull();
});
