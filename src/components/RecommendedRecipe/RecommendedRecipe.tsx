import { useState, useEffect } from "react";
import { RecipeList } from "..";
import placeholderImage from "../../assets/food-placeholder.png"; // Import placeholder image

interface RecommendedRecipeInterface {
  isInRecipeDetailsPage: boolean;
  screenHeight?: number; // New prop for screen height
  recommendedRecipes: Recipe[];
  shuffleRecipe: boolean;
  recipesPerPage: number;
  customTitle?: string;
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
  shuffleRecipe,
  recipesPerPage,
  customTitle = "Recommended Recipes",
}) => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (recommendedRecipes.length > 0) {
      setRecipes(recommendedRecipes);
      setLoading(false);
    }
  }, [recommendedRecipes]);

  return (
    <div className={`${isInRecipeDetailsPage ? "mx-6 hide-scrollbar" : "m-6"}`}>
      <h1 className="text-accent font-bold mobile:text-[27px] mobile:font-semibold laptop:text-3xl laptop:mb-8 mb-5">
        {customTitle}
      </h1>
      {/* Pass fetched recipes data as props to RecipeList */}
      <RecipeList
        loading={loading}
        recipes={recipes}
        placeholderImage={placeholderImage}
        isShowOneRecipeCols={isInRecipeDetailsPage}
        screenHeight={screenHeight} // Pass screen height to RecipeList
        shuffleRecipe={shuffleRecipe}
        recipesPerPage={recipesPerPage}
      />
    </div>
  );
};

export default RecommendedRecipe;
