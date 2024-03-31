import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import DashboardPage from "./pages/Dashboard/DashboardPage.tsx";
import RecipesPage from "./pages/Recipes/RecipesPage.tsx";
import HomePage from "./pages/Home/HomePage.tsx";
import InventoryPage from "./pages/Inventory/InventoryPage.tsx";
import RecipeDetailsPage from "./pages/Recipes/RecipeDetailsPage.tsx";

document.documentElement.setAttribute("data-theme", "emmy");
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetailsPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
