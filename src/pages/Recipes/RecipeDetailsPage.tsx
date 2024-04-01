import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RecommendedRecipe } from "../../components";

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

const RecipeDetailsPage: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLaptopScreen, setIsLaptopScreen] = useState<boolean>(false);
  const [isHDScreen, setIsHDScreen] = useState<boolean>(false);
  const leftComponentRef = useRef<HTMLDivElement>(null);
  const [leftComponentHeight, setLeftComponentHeight] = useState<number>(0);

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

  useEffect(() => {
    if (leftComponentRef.current) {
      const leftComponentHeight = leftComponentRef.current.clientHeight;
      setLeftComponentHeight(leftComponentHeight);
    }
  }, [leftComponentRef]);

  useEffect(() => {
    const handleResize = () => {
      const laptopMediaQuery = window.matchMedia("(min-width: 427px)");
      const hdMediaQuery = window.matchMedia("(min-width: 1440px)");
      setIsLaptopScreen(laptopMediaQuery.matches);
      setIsHDScreen(hdMediaQuery.matches);
      if (leftComponentRef.current) {
        const leftComponentHeight = leftComponentRef.current.clientHeight;
        // Now you have the height of the left component
        setLeftComponentHeight(leftComponentHeight);
        console.log("Left Component Height:", leftComponentHeight);
      }
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [recipe, isLaptopScreen, isHDScreen]);

  useEffect(() => {
    const fetchRecommendedRecipes = async () => {
      try {
        const response = await axios.post<Recipe[]>(
          `http://127.0.0.1:8000/recommend-recipe/`,
          {
            recipes: [
              {
                recipe_id: recipe?.recipe_id,
                cleaned_ingredients: recipe?.cleaned_ingredients,
              },
            ],
          }
        );
        setRecommendedRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recommended recipes:", error);
      }
    };

    if (recipe) {
      fetchRecommendedRecipes();
    }
  }, [recipe]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const ingredientsArray = recipe.ingredients.split(",");

  return (
    <>
      <div className="hd:flex hd:mx-40">
        <div
          ref={leftComponentRef}
          className="flex flex-col min-h-screen justify-between bg-white text-accent flex-1 hd:flex-3"
        >
          <div className="flex-grow">
            <img
              src={recipe.image_url}
              alt={recipe.title}
              className="w-full h-[300px] laptop:h-[460px] desktop:h-[550px] desktop:mx-auto object-cover hd:rounded-3xl"
            />
            <div className="p-5">
              <h2 className="text-3xl laptop:text-4xl font-bold mb-1 text-secondary-green">
                {recipe.title}
              </h2>
              <p className="text-lg laptop:text-2xl mb-5 font-semibold">
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
              <p className="text-md mb-2 font-semibold laptop:text-xl mb-10">
                Cooking Time:{" "}
                <span className="text-md text-primary">
                  {recipe.cooking_time} mins
                </span>
              </p>
              <div className="w-full md:w-96 bg-base-100 shadow-xl bg-primary-2 bg-opacity-25">
                <div className="card-body">
                  <div className="text-lg">
                    <div className="text-center mb-4 font-bold text-primary opacity-75 laptop:text-2xl">
                      RECIPE INGREDIENTS
                    </div>
                  </div>
                  <div className="grid grid-cols-1 laptop:grid-cols-2 desktop:grid-cols-3">
                    {ingredientsArray.map((ingredient, index) => (
                      <div
                        key={index}
                        className="justify-between laptop:text-xl laptop:mb-5 desktop:mb-10 laptop:ml-10 desktop:ml-30"
                      >
                        <p className="opacity-75">
                          <span className="text-primary"> &#10003;</span>{" "}
                          <span className="text-accent ">{ingredient}</span>
                        </p>
                        {index !== ingredientsArray.length &&
                          !isLaptopScreen && (
                            <hr className="w-full border-t border-gray-200 my-1 opacity-20" />
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="p-8 bg-secondary text-white bg-opacity-85 hd:rounded">
            <div className="max-w-screen-md mx-auto">
              <h6 className="text-center text-white font-bold mb-3 ">
                STEP TO COOK
              </h6>
              <p className="laptop:text-center">
                This recipe was crafted and verified by the culinary experts.
                For detailed instructions, please visit their website.
              </p>
              <div className="mt-4 flex justify-center">
                <a
                  className="btn btn-primary text-white"
                  href={recipe.source_url}
                >
                  Click Here
                </a>
              </div>
            </div>
          </footer>
        </div>
        {isHDScreen && (
          <div className="hd:ml-4">
            <RecommendedRecipe
              isInRecipeDetailsPage={true}
              screenHeight={leftComponentHeight} // Pass dynamic screen height
              recommendedRecipes={recommendedRecipes}
              shuffleRecipe={true}
              recipesPerPage={24}
            />
          </div>
        )}
      </div>

      {!isHDScreen && (
        <div className="hd:ml-4">
          <RecommendedRecipe
            isInRecipeDetailsPage={false}
            screenHeight={leftComponentHeight} // Pass dynamic screen height
            recommendedRecipes={recommendedRecipes}
            shuffleRecipe={true}
            recipesPerPage={2}
          />
        </div>
      )}
    </>
  );
};

export default RecipeDetailsPage;
