import React from "react";
import { Navbar, RecipeList } from "../../components";
import FridgeOverview from "../../components/FridgeOverview/FridgeOverveiw";

const DashboardPage: React.FC = () => {
  return (
    <>
      <Navbar isAtPage="Dashboard" />
      <h1 className="text-4xl text-center font-bold mt-5 text-accent">
        Dashboard
      </h1>
      <FridgeOverview />
      <RecipeList />
    </>
  );
};

export default DashboardPage;
