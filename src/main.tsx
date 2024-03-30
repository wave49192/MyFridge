import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import DashboardPage from "./pages/Dashboard/DashboardPage.tsx";
import RecipesPage from "./pages/Recipes/RecipesPage.tsx";
import HomePage from "./pages/Home/HomePage.tsx";
import InventoryPage from "./pages/Inventory/InventoryPage.tsx";
import RecipeDetailsPage from "./pages/Recipes/RecipeDetailsPage.tsx";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <html data-theme="emmy">
              <HomePage />
            </html>
          }
        />
        <Route
          path="/dashboard"
          element={
            <html data-theme="emmy">
              <DashboardPage />
            </html>
          }
        />
        <Route
          path="/recipes"
          element={
            <html data-theme="emmy">
              <RecipesPage />
            </html>
          }
        />
        <Route
          path="/inventory"
          element={
            <html data-theme="emmy">
              <InventoryPage />
            </html>
          }
        />
        <Route
          path="/recipe/:recipeId"
          element={
            <html data-theme="emmy">
              <RecipeDetailsPage />
            </html>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
