import React from "react";
import { Navbar, RecommendedRecipe } from "../../components";
import FridgeOverview from "../../components/FridgeOverview/FridgeOverveiw";

const DashboardPage: React.FC = () => {
  return (
    <div className="laptop:mx-20 hd:mx-60">
      <h1 className="text-4xl text-center font-bold mt-5 text-accent laptop:text-5xl laptop:my-12 ">
        Dashboard
      </h1>
      <FridgeOverview />
      <RecommendedRecipe
        isInRecipeDetailsPage={false}
        recommendedRecipes={[]}
      />
    </div>
  );
};

export default DashboardPage;
