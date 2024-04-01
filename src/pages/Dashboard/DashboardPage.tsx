import React, { useEffect, useState } from "react";
import { Navbar, RecommendedRecipe } from "../../components";
import FridgeOverview from "../../components/FridgeOverview/FridgeOverveiw";
import axios from "axios";
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

  useEffect(() => {
    const fetchRecommendedRecipes = async () => {
      try {
        const response = await axios.post<Recipe[]>(
          `http://127.0.0.1:8000/recommend-recipe/`,
          {
            recipes: [
              {
                cleaned_ingredients: "pizza, cake, cookies",
              },
            ],
          }
        );
        setRecommendedRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recommended recipes:", error);
      }
    };

    fetchRecommendedRecipes();
  }, []);

  return (
    <div className="laptop:mx-20 hd:mx-30">
      <h1 className="text-4xl text-center font-bold mt-5 text-accent laptop:text-5xl laptop:my-12 ">
        Dashboard
      </h1>
      <FridgeOverview />
      <RecommendedRecipe
        isInRecipeDetailsPage={false}
        recommendedRecipes={recommendedRecipes}
        shuffleRecipe={true}
      />
    </div>
  );
};

export default DashboardPage;
