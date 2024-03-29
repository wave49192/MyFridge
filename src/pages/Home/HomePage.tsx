import React from "react";

import { Navbar, RecipeList } from "../../components";

const HomePage: React.FC = () => {
  return (
    <div>
      <Navbar isAtPage="Home" />
      <RecipeList />
    </div>
  );
};

export default HomePage;
