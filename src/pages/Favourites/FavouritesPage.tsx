import React, { useState, useEffect } from "react";
import axios from "axios";
import { RecipeList } from "../../components";
import placeholderImage from "../../assets/food-placeholder.png";

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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Check if recipes exist in local storage
    const storedRecipes = localStorage.getItem("recipes");
    console.log(storedRecipes)
    if (storedRecipes) {
      const parsedRecipes = JSON.parse(storedRecipes);

      // Shuffle the parsed recipes
      const shuffledRecipes = parsedRecipes.sort(() => Math.random() - 0.5);

      // Slice the first 24 recipes
      const slicedRecipes = shuffledRecipes.slice(0, 24);

      setSearchResults(slicedRecipes);
      setIsLoading(false);
    } else {
      fetchRecipes(); // Fetch data from API if not found in local storage
    }
  }, []);

  const fetchRecipes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/recipes/");
      localStorage.setItem("recipes", JSON.stringify(response.data));

      setSearchResults(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      if (!searchQuery.trim()) {
        // If search query is empty, fetch all recipes
        await fetchRecipes();
      } else {
        const storedRecipes = localStorage.getItem("recipes");
        if (storedRecipes) {
          // If recipes exist in local storage, filter them by title
          const parsedRecipes = JSON.parse(storedRecipes);
          const filteredRecipes = parsedRecipes.filter((recipe: Recipe) =>
            recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSearchResults(filteredRecipes);
        } else {
          // If recipes don't exist in local storage, fetch from the API
          const response = await axios.get(
            `http://127.0.0.1:8000/recipes/search/?name=${searchQuery}`
          );
          setSearchResults(response.data);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error searching recipes:", error);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="px-5 laptop:mx-20 hd:mx-60">
        <h1 className="text-center text-3xl font-bold mb-6">Favourites Recipes</h1>
        {/* <div className="relative mb-5">
          <input
            type="text"
            placeholder="Search recipes"
            className="input input-bordered w-full pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            className="absolute top-0 left-0 ml-3 w-6 h-6 text-gray-500 mt-3 opacity-40 cursor-pointer"
            onClick={handleSearch}
          >
            <path d="M21 3C11.6016 3 4 10.6016 4 20C4 29.3984 11.6016 37 21 37C24.3555 37 27.4609 36.0156 30.0938 34.3438L42.375 46.625L46.625 42.375L34.5 30.2812C36.6797 27.4219 38 23.8789 38 20C38 10.6016 30.3984 3 21 3ZM21 7C28.1992 7 34 12.8008 34 20C34 27.1992 28.1992 33 21 33C13.8008 33 8 27.1992 8 20C8 12.8008 13.8008 7 21 7Z" />
          </svg>
        </div> */}
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
