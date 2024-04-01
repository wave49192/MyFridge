import { useState, useEffect } from "react";
import axios from "axios";
import { RecipeList } from "..";
import placeholderImage from "../../assets/food-placeholder.png"; // Import placeholder image

interface RecommendedRecipeInterface {
  isInRecipeDetailsPage: boolean;
  screenHeight?: number; // New prop for screen height
  recommendedRecipes: Recipe[];
}

interface Recipe {
  recipe_id: string;
  title: string;
  image_url: string;
  publisher: string;
  source_url: string;
  cooking_time: number;
  ingredients: string;
  cuisine_type: string;
  cleaned_ingredients: string;
}

const RecommendedRecipe: React.FC<RecommendedRecipeInterface> = ({
  isInRecipeDetailsPage,
  screenHeight, // Receive screen height as prop
  recommendedRecipes,
}) => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (recommendedRecipes.length > 0) {
      setRecipes(recommendedRecipes);
      setLoading(false);
    } else if (!isInRecipeDetailsPage) {
      fetchData(); // Fetch data from API if recommended recipes are not provided
    }
  }, [recommendedRecipes]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/recipes/");
      const allRecipes = response.data;
      const slicedRecipes = response.data.slice(0, 20); // Slice only the first 20 recipes
      setRecipes(slicedRecipes);
      setLoading(false);
      // Store sliced recipes in local storage
      localStorage.setItem("recipes", JSON.stringify(allRecipes));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div
      className={`${isInRecipeDetailsPage ? "mx-6 " : "m-6"}`}
      style={{ overflowY: isInRecipeDetailsPage ? "scroll" : "visible" }}
    >
      <h1 className="text-accent font-bold mobile:text-xl laptop:text-3xl laptop:mb-8">
        Recommended For you
      </h1>
      {/* Pass fetched recipes data as props to RecipeList */}
      <RecipeList
        loading={loading}
        recipes={recipes}
        placeholderImage={placeholderImage}
        isShowOneRecipeCols={isInRecipeDetailsPage}
        screenHeight={screenHeight} // Pass screen height to RecipeList
      />
    </div>
  );
};

export default RecommendedRecipe;
