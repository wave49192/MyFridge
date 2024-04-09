import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173");
});

test("Recipe details page should render correctly", async ({ page }) => {
  await page.goto("http://localhost:5173/recipe/5ed6604591c37cdc054bce0a");

  const recipeTitle = await page.textContent(".recipeTitle");
  expect(recipeTitle).toContain("Coconut Granola");
  const recipeImage = await page.waitForSelector("img");
  expect(recipeImage).not.toBeNull();

  const recipePublisher = await page.textContent(".publisher");
  expect(recipePublisher).toContain("Two Peas and Their Pod");
  const recipeCookingTime = await page.textContent(".cookingTime");
  expect(recipeCookingTime).toContain("75");
  const recipeIngredients = await page.waitForSelector(".ingredients");
  expect(recipeIngredients).not.toBeNull();

  const footerText = await page.textContent("footer h6");
  expect(footerText).toContain("STEP TO COOK");
});
