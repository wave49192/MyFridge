import React from "react";

interface RecipeListProps {
  recipes: string[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <div>
      <h2>Recipes</h2>
      {/* Display the list of available recipes */}
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>{recipe}</li>
        ))}
      </ul>
    </div>
  );
};
export default RecipeList;
