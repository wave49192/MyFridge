import { useState, useEffect } from "react";
import axios from "axios";
import { RecipeList } from "..";
import placeholderImage from "../../assets/food-placeholder.png"; // Import placeholder image

interface RecommendedRecipeInterface {
  isInRecipeDetailsPage: boolean;
}
const RecommendedRecipe: React.FC<RecommendedRecipeInterface> = ({
  isInRecipeDetailsPage,
}) => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Check if recipes exist in local storage
    const storedRecipes = localStorage.getItem("recipes");
    if (storedRecipes) {
      const parsedRecipes = JSON.parse(storedRecipes);
      const slicedRecipes = parsedRecipes.slice(0, 20); // Slice only the first 20 recipes
      setRecipes(slicedRecipes);
      setLoading(false);
    } else {
      fetchData(); // Fetch data from API if not found in local storage
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/recipes/");
      const slicedRecipes = response.data.slice(0, 20); // Slice only the first 20 recipes
      setRecipes(slicedRecipes);
      setLoading(false);
      // Store sliced recipes in local storage
      localStorage.setItem("recipes", JSON.stringify(slicedRecipes));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="m-6">
      <h1 className="text-accent font-bold mobile:text-xl laptop:text-3xl laptop:mb-8">
        Recommended For you
      </h1>
      {/* Pass fetched recipes data as props to RecipeList */}
      <RecipeList
        loading={loading}
        recipes={recipes}
        placeholderImage={placeholderImage}
        isShowOneRecipeCols={isInRecipeDetailsPage}
      />
    </div>
  );
};

export default RecommendedRecipe;
