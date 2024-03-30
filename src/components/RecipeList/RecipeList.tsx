import React, { useState, useEffect } from "react";
import axios from "axios";
import placeholderImage from "../../assets/food-placeholder.png"; // Import placeholder image

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

const RecipeList: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

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

  // Render loading placeholder if data is still loading
  if (loading) {
    return (
      <div className="card card-side bg-base-100 m-2 h-48 ">
        <figure>
          <img
            src={placeholderImage} // Use placeholder image
            alt="Loading..."
            className="rounded-2xl mobile:w-32 mobile:h-48"
          />
        </figure>
        <div className="pl-3 w-[239px] flex-col justify-end">
          <div>
            <h2 className="text-xl font-bold text-secondary-green text-ellipsis overflow-hidden line-clamp-2">
              Loading...
            </h2>
            <div className="badge badge-primary text-white">loading...</div>
            <div className="flex-1">
              <p className="text-ellipsis overflow-hidden line-clamp-4">
                Loading...
              </p>
            </div>
          </div>

          <p className="flex-end text-xs text-end items-end">
            Cooking Time: <span className="text-primary">Loading mins</span>
          </p>
        </div>
      </div>
    );
  }

  // Render only the first twenty recipes
  const recipesToRender = recipes.slice(0, 20);

  return (
    <div className="pb-4">
      {recipesToRender.map((recipe) => (
        <div
          key={recipe.recipe_id}
          className="card card-side bg-base-100 m-2 h-48 "
        >
          <figure>
            <img
              src={recipe.image_url}
              alt={recipe.title}
              className="rounded-2xl mobile:w-32 mobile:h-48"
              onError={(e) => {
                // Display placeholder image if original image fails to load
                e.currentTarget.src = placeholderImage;
              }}
            />
          </figure>
          <div className="pl-3 w-[239px] flex-col justify-end">
            <div>
              <h2 className="text-xl font-bold text-secondary-green text-ellipsis overflow-hidden line-clamp-2">
                {recipe.title}
              </h2>
              <div className="badge badge-primary text-white">
                {recipe.cuisine_type}
              </div>
              <div className="flex-1">
                <p className="text-ellipsis overflow-hidden line-clamp-4">
                  Succulent salmon fillets seasoned with aromatic herbs, grilled
                  to perfection, and finished with a zesty lemon herb butter
                  sauce. The fish is tender and flaky, with a burst of fresh
                  flavors.
                </p>
              </div>
            </div>

            <p className="flex-end text-xs text-end items-end">
              Cooking Time:{" "}
              <span className="text-primary">{recipe.cooking_time} mins</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
