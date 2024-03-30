import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import DashboardPage from "./pages/Dashboard/DashboardPage.tsx";
import RecipesPage from "./pages/Recipes/RecipesPage.tsx";
import HomePage from "./pages/Home/HomePage.tsx";
import InventoryPage from "./pages/Inventory/InventoryPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <html data-theme="emmy">
        <HomePage />
      </html>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <html data-theme="emmy">
        <DashboardPage />
      </html>
    ),
  },
  {
    path: "/recipes",
    element: (
      <html data-theme="emmy">
        <RecipesPage />
      </html>
    ),
  },
  {
    path: "/inventory",
    element: (
      <html data-theme="emmy">
        <InventoryPage />
      </html>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
