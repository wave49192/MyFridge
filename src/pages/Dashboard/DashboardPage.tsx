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
  const [inventory, setInventory] = useState<Inventory | null>();
  const [cleanedIngredients, setCleanedIngredients] = useState<string[]>();
  const { user } = useAuth();

  useEffect(() => {
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

    if (user) {
      fetchRecommendedRecipes();
      fetchUserInventory();
    }
  }, [user, cleanedIngredients]);

  return (
    <div className="laptop:mx-20 hd:mx-30">
      <h1 className="text-4xl text-center font-bold mt-5 text-accent laptop:text-5xl laptop:my-12 ">
        Dashboard
      </h1>
      {inventory ? (
        <FridgeOverview
          id={inventory?.id}
          items={inventory?.items}
          owned_by={inventory?.owned_by}
        />
      ) : (
        <p>You don't have an inventory yet</p>
      )}
      <RecommendedRecipe
        isInRecipeDetailsPage={false}
        recommendedRecipes={recommendedRecipes}
        shuffleRecipe={false}
        recipesPerPage={6}
      />
    </div>
  );
};

export default DashboardPage;
