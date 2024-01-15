import React, { useState } from "react";

import { RecipeList, IngredientList, Navbar } from "../../components";

const HomePage: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<string[]>([]);

  const handleImageUpload = (file: File) => {};

  const fetchRecipes = (recognizedIngredients: string[]) => {};

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
