import { test, expect } from "@playwright/test";

test("add ingredient", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("button", { name: "Log in" }).click();
  await page.getByRole("button", { name: "Mock Login" }).click();
  await page.getByRole("link", { name: "Inventory" }).click();
  await page.getByRole("link", { name: "+ Add Ingredient" }).click();
  await page.getByRole("button", { name: "Add more ingredient" }).click();
  await page.getByLabel("Select Ingredients").click();
  await page.getByRole("option", { name: "yeast", exact: true }).click();
  await page.getByRole("textbox").first().click();
  await page.getByRole("textbox").first().fill("03");
  await page.getByRole("textbox").nth(1).click();
  await page.getByRole("textbox").nth(1).fill("tbsp");
  await page.getByText("✓").click();
  await page.getByRole("button", { name: "Add ingredients" }).click();
  const addedIngredient = await page.waitForSelector('span:has-text("yeast")');
  expect(addedIngredient).not.toBeNull();
});
