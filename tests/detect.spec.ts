import { test, expect } from "@playwright/test";

test("DetectPage should render and detect ingredients from image", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("button", { name: "Log in" }).click();
  await page.getByRole("button", { name: "Mock Login" }).click();
  await page.getByRole("link", { name: "Inventory" }).click();
  await page.getByRole("button", { name: "Try now" }).click();
  await page.getByRole("button", { name: "Choose Image" }).click();

  // Mock the image upload
  const filePath = "./src/assets/2.jpg";
  const input = await page.$("input[type=file]");
  await input.setInputFiles(filePath);
  const uploadedImageElement = await page.$(".uploadedImage");
  expect(uploadedImageElement).not.toBeNull();

  await page.getByRole("button", { name: "Start detecting" }).click();
  const detectedIngredient = await page.waitForSelector(
    'p:has-text("cucumber")'
  );
  expect(detectedIngredient).not.toBeNull();

  await page.getByPlaceholder("Amount").click();
  await page.getByPlaceholder("Amount").fill("02");
  await page.getByPlaceholder("Unit").click();
  await page.getByPlaceholder("Unit").fill("3");
  await page.getByRole("button", { name: "Add Ingredient" }).click();

  const addedIngredient = await page.waitForSelector('p:has-text("cucumber")');
  expect(addedIngredient).not.toBeNull();
});
