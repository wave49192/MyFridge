import React from "react";
import { FoodAndDrinkList } from "..";
interface DashboardFoodAndDrinksProps {
  items: string[];
  onImageUpload: (file: File) => void;
}

const DashboardIngredients: React.FC<DashboardFoodAndDrinksProps> = ({
  items,
  onImageUpload,
}) => {
  return <FoodAndDrinkList items={items} onImageUpload={onImageUpload} />;
};

export default DashboardIngredients;
