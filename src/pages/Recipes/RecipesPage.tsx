import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, RecipeList } from "../../components";
import placeholderImage from "../../assets/food-placeholder.png";

interface Recipe {
  recipe_id: string;
  title: string;
  image_url: string;
  publisher: string;
  source_url: string;
  cooking_time: number;
  ingredients: string[];
  cuisine_type: string;
}

const RecipesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch all recipes when component mounts
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/recipes/");
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
        const response = await axios.get(
          `http://127.0.0.1:8000/recipes/search/?name=${searchQuery}`
        );
        setSearchResults(response.data);
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
      <Navbar isAtPage="Recipes" />
      <div className="px-5">
        <h1 className="text-center text-3xl font-bold mb-6">Explore Recipes</h1>
        <div className="relative mb-5">
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
            className="absolute top-0 left-0 ml-3 mt-2 w-6 h-6 text-gray-500 mt-3 opacity-40 cursor-pointer"
            onClick={handleSearch}
          >
            <path d="M21 3C11.6016 3 4 10.6016 4 20C4 29.3984 11.6016 37 21 37C24.3555 37 27.4609 36.0156 30.0938 34.3438L42.375 46.625L46.625 42.375L34.5 30.2812C36.6797 27.4219 38 23.8789 38 20C38 10.6016 30.3984 3 21 3ZM21 7C28.1992 7 34 12.8008 34 20C34 27.1992 28.1992 33 21 33C13.8008 33 8 27.1992 8 20C8 12.8008 13.8008 7 21 7Z" />
          </svg>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <RecipeList
            loading={isLoading}
            recipes={searchResults}
            placeholderImage={placeholderImage}
          />
        </div>
      </div>
    </>
  );
};

export default RecipesPage;
