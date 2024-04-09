import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173");
});

test("recipes page should contain search bar", async ({ page }) => {
  await page.getByRole("link", { name: "Recipes" }).click();
  const searchBar = await page.waitForSelector(".input");
  expect(searchBar).not.toBeNull();
});

test("should display recipes when the page loads", async ({ page }) => {
  await page.getByRole("link", { name: "Recipes" }).click();
  await page.waitForSelector(".card");
  const recipes = await page.waitForSelector(".card");
  expect(recipes).not.toBeNull();
});

test("clicking on a recipe should navigate to its details page", async ({
  page,
}) => {
  await page.getByRole("link", { name: "Recipes" }).click();
  await page.getByRole("link", { name: '5 Cup Salad Turkish "5 Cup' }).click();
  await expect(page).toHaveURL(/\/recipe\/\w+/);
});

test("pagination should display correct number of pages", async ({ page }) => {
  await page.getByRole("link", { name: "Recipes" }).click();

  await page.waitForSelector(".btn.btn-primary.text-white", {
    state: "attached",
  });

  const paginationButtons = await page.$$(".btn.btn-primary.text-white");
  expect(paginationButtons.length).toBeGreaterThan(0);
});

test("clicking on a pagination button should navigate to the corresponding page", async ({
  page,
}) => {
  await page.getByRole("link", { name: "Recipes" }).click();
  await page.click(".btn.btn-primary.text-white:nth-child(2)");
  const currentPageButton = await page.waitForSelector(
    ".btn.btn-primary.text-white.btn-active"
  );
  expect(await currentPageButton.innerText()).toBe("2");
});
