import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173");
});

test("Inventory page should render correctly", async ({ page }) => {
  await page.goto("http://localhost:5173/inventory");
  await page.waitForLoadState("networkidle");
  const pageTitle = await page.textContent("h2");
  expect(pageTitle).toContain("Inventory");
  const searchBar = await page.waitForSelector("input[type='text']");
  expect(searchBar).not.toBeNull();
  const tryFeature = await page.waitForSelector(
    'div:has-text("AI Detecting Ingredients!")'
  );
  expect(tryFeature).not.toBeNull();
  const pagination = await page.waitForSelector('div:has-text("1 of 10")');
  expect(pagination).not.toBeNull();
  const addIngredientButton = await page.waitForSelector(
    "a[href='/inventory/add']"
  );
  expect(addIngredientButton).not.toBeNull();
});
