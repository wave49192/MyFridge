import React, { useState } from "react";

import { RecipeList, IngredientList, Navbar } from "../../components";

const HomePage: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<string[]>([]);

  const handleImageUpload = (file: File) => {
    // TODO: Call backend to process the image and recognize ingredients
    // Update the 'ingredients' state with the recognized ingredients
    // Call another function to fetch recipes based on the recognized ingredients
  };

  const fetchRecipes = (recognizedIngredients: string[]) => {
    // TODO: Call a recipe API to fetch recipes based on recognized ingredients
    // Update the 'recipes' state with the fetched recipes
  };

  return (
    <div>
      <Navbar />
      <IngredientList
        ingredients={ingredients}
        onImageUpload={handleImageUpload}
      />
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default HomePage;
