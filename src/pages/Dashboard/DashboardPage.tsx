import React, { useEffect, useState } from "react";
import { RecommendedRecipe } from "../../components";
import FridgeOverview from "../../components/FridgeOverview/FridgeOverveiw";
import axios from "axios";
import { Inventory } from "../../types/inventory";
import { useAuth } from "../../context/AuthContext";

interface Recipe {
  recipe_id: string;
  title: string;
  image_url: string;
  publisher: string;
  source_url: string;
  cooking_time: number;
  ingredients: string;
  cuisine_type: string;
  cleaned_ingredients: string;
}

const DashboardPage: React.FC = () => {
  const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [inventory, setInventory] = useState<Inventory | null>();
  const [cleanedIngredients, setCleanedIngredients] = useState<string[]>();
  const { user } = useAuth();
  const fetchRecommendedRecipes = async () => {
    try {
      const response = await axios.post<Recipe[]>(
        `http://127.0.0.1:8000/recommend-recipe/`,
        {
          recipes: [
            {
              cleaned_ingredients: cleanedIngredients?.join(", ") || "", // Join the ingredients into a comma-separated string
            },
          ],
        }
      );
      setRecommendedRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recommended recipes:", error);
    }
  };

  const fetchUserInventory = async () => {
    try {
      const response = await axios.get<Inventory>(
        `http://127.0.0.1:8000/inventory/user/?user_id=${user?.id}`
      );
      setInventory(response.data);

      // Extract ingredient names from inventory items and set them to cleanedIngredients state
      const ingredients = response.data.items.map(
        (item) => item.ingredient.name
      );
      setCleanedIngredients(ingredients);
    } catch (error) {
      console.error("Error fetching user inventory:", error);
    }
  };
  const fetchRecipes = async () => {
    try {
      const response = await axios.get<Recipe[]>(
        `http://127.0.0.1:8000/recipes/`
      );
      setAllRecipes(response.data);
    } catch (error) {
      console.error("Error fetching all recipes:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserInventory();
    }
  }, [user]);

  useEffect(() => {
    if (cleanedIngredients) {
      fetchRecommendedRecipes();
    }
  }, [cleanedIngredients]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="laptop:mx-20 hd:mx-30">
      <h1 className="text-4xl text-center font-bold mt-5 text-accent laptop:text-5xl laptop:my-12 ">
        Dashboard
      </h1>
      {inventory ? (
        <>
          <FridgeOverview
            id={inventory?.id}
            items={inventory?.items}
            owned_by={inventory?.owned_by}
          />
        </>
      ) : (
        <div>
          <p className="text-center text-xl mb-20">
            You don't have an inventory yet
          </p>
        </div>
      )}

      {inventory?.items?.length && inventory.items.length > 0 ? (
        // Your code when inventory and items are defined and the length is greater than 0
        <RecommendedRecipe
          isInRecipeDetailsPage={false}
          recommendedRecipes={recommendedRecipes}
          shuffleRecipe={false}
          recipesPerPage={6}
        />
      ) : (
        // Your code when inventory or items are undefined, or the length is 0
        <RecommendedRecipe
          isInRecipeDetailsPage={false}
          recommendedRecipes={allRecipes}
          shuffleRecipe={false}
          recipesPerPage={6}
          customTitle={"Explore our Recipes"}
        />
      )}
    </div>
  );
};

export default DashboardPage;
