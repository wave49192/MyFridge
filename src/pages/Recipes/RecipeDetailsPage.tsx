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
  ingredients: string;
  cuisine_type: string;
}

const RecipeDetailsPage: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>(); // Access the recipeId parameter from the URL
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get<Recipe>(
          `http://127.0.0.1:8000/recipes/details/?recipe_id=${recipeId}`
        );
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

  // Parse ingredients string into key-value pairs
  const ingredientsArray = recipe.ingredients.split(", ").map((ingredient) => {
    const [amount, name] = ingredient.split(" ");
    return { amount, name };
  });

  return (
    <>
      <Navbar isAtPage="Recipes" />
      <div className="p-4">
        <h2 className="text-3xl font-bold mb-4">{recipe.title}</h2>
        <div className="flex flex-wrap justify-center items-start gap-4">
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="rounded-lg shadow-md w-72 h-auto"
          />
          <div>
            <p className="text-lg mb-2">
              <span className="font-semibold">Cooking Time:</span>{" "}
              {recipe.cooking_time} mins
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Publisher:</span>{" "}
              {recipe.publisher}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Cuisine Type:</span>{" "}
              {recipe.cuisine_type}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Source URL:</span>{" "}
              <a
                href={recipe.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {recipe.source_url}
              </a>
            </p>
            <div className="text-lg">
              <span className="font-semibold">Ingredients:</span>
              <ul className="list-disc pl-6">
                {ingredientsArray.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.amount} {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetailsPage;
