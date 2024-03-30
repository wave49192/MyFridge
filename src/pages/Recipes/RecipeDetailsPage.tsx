// RecipeDetailsPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../../components";

interface Recipe {
  recipe_id: string;
  title: string;
  image_url: string;
  publisher: string;
  source_url: string;
  cooking_time: number;
  ingredients: string[];
  cuisine_type: string;
}
const RecipeDetailsPage = () => {
  const { recipeId } = useParams(); // Access the recipeId parameter from the URL
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/recipes/details/?recipe_id=${recipeId}`
        ); // Replace with your API endpoint for fetching recipe details
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar isAtPage="Recipes" />
      <h2>{recipe.title}</h2>
      {/* Display other recipe details */}
    </>
  );
};

export default RecipeDetailsPage;
