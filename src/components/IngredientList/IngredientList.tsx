import React from "react";

interface IngredientListProps {
  ingredients: string[];
  onImageUpload: (file: File) => void;
}

const IngredientList: React.FC<IngredientListProps> = ({
  ingredients,
  onImageUpload,
}) => {
  return (
    <div>
      <h2>Ingredient List</h2>
      {/* Display the list of ingredients */}
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      {/* Upload image button */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files && onImageUpload(e.target.files[0])}
      />
    </div>
  );
};

export default IngredientList;
