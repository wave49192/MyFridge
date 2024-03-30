import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../../components";

interface Recipe {
  recipe_id: string;
  title: string;
  image_url: string;
  publisher: string;
  source_url: string;
  cooking_time: number;
  ingredients: string;
  cuisine_type: string;
}

const RecipeDetailsPage: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get<Recipe>(
          `http://127.0.0.1:8000/recipes/details/?recipe_id=${recipeId}`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const ingredientsArray = recipe.ingredients.split(",");

  return (
    <div className="flex flex-col min-h-screen justify-between bg-white text-accent">
      <Navbar isAtPage="Recipes" />
      <div className="flex-grow">
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="w-full h-[300px] object-cover"
        />
        <div className="p-5">
          <h2 className="text-3xl font-bold mb-1 text-secondary-green">
            {recipe.title}
          </h2>
          <p className="text-lg mb-5 font-semibold">
            By<span className="text-primary"> {recipe.publisher}</span>
          </p>
          <div className="flex flex-wrap mb-3">
            <div className="badge badge-primary p-3 mb-3 mr-3 text-white">
              {recipe.cuisine_type}
            </div>
            <div className="badge badge-primary p-3 mb-3 mr-3 text-white">
              {recipe.cuisine_type}
            </div>
            <div className="badge badge-primary p-3 mb-3 mr-3 text-white">
              {recipe.cuisine_type}
            </div>
          </div>
          <p className="text-md mb-2 font-semibold">
            Cooking Time:{" "}
            <span className="text-md text-primary">
              {recipe.cooking_time} mins
            </span>
          </p>
          <div className="w-full md:w-96 bg-base-100 shadow-xl bg-primary-2 bg-opacity-25">
            <div className="card-body">
              <div className="text-lg">
                <div className="text-center mb-4 font-bold text-primary opacity-75">
                  RECIPE INGREDIENTS
                </div>
              </div>
              <ul>
                {ingredientsArray.map((ingredient, index) => (
                  <div key={index} className="justify-between">
                    <p className="text-accent opacity-75">{ingredient}</p>
                    {index !== ingredientsArray.length - 1 && (
                      <hr className="w-full border-t border-gray-200 my-1 opacity-20" />
                    )}
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <footer className="p-8 bg-secondary text-white bg-opacity-85">
        <div className="max-w-screen-md mx-auto">
          <h6 className="text-center text-white font-bold mb-3">
            STEP TO COOK
          </h6>
          <p className="laptop:text-center">
            This recipe was crafted and verified by the culinary experts. For
            detailed instructions, please visit their website.
          </p>
          <div className="mt-4 flex justify-center">
            <a className="btn btn-primary text-white" href={recipe.source_url}>
              Click Here
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RecipeDetailsPage;
