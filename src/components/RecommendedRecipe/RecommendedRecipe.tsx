import React, { useState, useEffect } from "react";
import axios from "axios";
import { RecipeList } from "..";
import placeholderImage from "../../assets/food-placeholder.png"; // Import placeholder image

const RecommendedRecipe = () => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/recipes/");
        setRecipes(response.data);
        setLoading(false); // Mark loading as complete
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="m-6">
      <h1 className="text-accent font-bold mobile:text-xl">
        Recommended For you
      </h1>
      {/* Pass fetched recipes data as props to RecipeList */}
      <RecipeList
        loading={loading}
        recipes={recipes}
        placeholderImage={placeholderImage}
      />
    </div>
  );
};

export default RecommendedRecipe;
