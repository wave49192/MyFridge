import React from "react";
import { Navbar, RecommendedRecipe } from "../../components";
import FridgeOverview from "../../components/FridgeOverview/FridgeOverveiw";

const DashboardPage: React.FC = () => {
  return (
    <>
      <Navbar isAtPage="Dashboard" />
      <h1 className="text-4xl text-center font-bold mt-5 text-accent laptop:text-5xl laptop:my-12">
        Dashboard
      </h1>
      <FridgeOverview />
      <RecommendedRecipe isInRecipeDetailsPage={false} />
    </>
  );
};

export default DashboardPage;
