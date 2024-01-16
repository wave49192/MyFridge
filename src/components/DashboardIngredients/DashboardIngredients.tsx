import React from "react";
import { IngredientList } from "..";
interface DashboardIngredientsProps {
  ingredients: string[];
  onImageUpload: (file: File) => void;
}

const DashboardIngredients: React.FC<DashboardIngredientsProps> = ({
  ingredients,
  onImageUpload,
}) => {
  return (
    <IngredientList ingredients={ingredients} onImageUpload={onImageUpload} />
  );
};

export default DashboardIngredients;
