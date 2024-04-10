import React, { useState, useEffect } from "react";
import axios from "axios";
import { RecipeList } from "../../components";
import placeholderImage from "../../assets/food-placeholder.png";
import { useAuth } from "../../context/AuthContext";

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

const FavouritesPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchRecipes();
  }, [user]);

  const fetchRecipes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://127.0.0.1:8000/users/${user?.id}/favourites`);

      setSearchResults(response.data.favourite_recipes);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="px-5 laptop:mx-20 hd:mx-60">
        <h1 className="text-center text-3xl font-bold mb-6">Explore Recipes</h1>
        <div className="relative mb-5">
        </div>
        <div className="grid grid-cols-1 gap-4">
          <RecipeList
            loading={isLoading}
            recipes={searchResults}
            placeholderImage={placeholderImage}
            isShowOneRecipeCols={false}
            shuffleRecipe={false}
            recipesPerPage={12}
          />
        </div>
      </div>
    </>
  );
};

export default FavouritesPage;
