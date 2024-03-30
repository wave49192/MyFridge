import React from "react";
import { Link } from "react-router-dom";

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

interface RecipeListProps {
  loading: boolean;
  recipes: Recipe[];
  placeholderImage: string;
  isShowOneRecipeCols: boolean;
}

const RecipeList: React.FC<RecipeListProps> = ({
  loading,
  recipes,
  placeholderImage,
  isShowOneRecipeCols,
}) => {
  if (loading) {
    return (
      <div className="m-2 flex justify-center">
        <div className="card card-side bg-base-100 h-48 w-80">
          {/* Loading content */}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-4 ${
        isShowOneRecipeCols
          ? "grid-cols-1"
          : "laptop:grid-cols-2 desktop:grid-cols-3"
      }`}
    >
      {recipes.map((recipe) => (
        <Link to={`/recipe/${recipe.recipe_id}`} key={recipe.recipe_id}>
          <div className="card card-side bg-base-100 h-48 desktop:h-72">
            <figure>
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="rounded-2xl mobile:w-32 mobile:h-48 laptop:w-48 laptop:h-48 desktop:h-72"
                onError={(e) => {
                  // Display placeholder image if original image fails to load
                  e.currentTarget.src = placeholderImage;
                }}
              />
            </figure>
            <div className="pl-3 w-[239px] laptop:w-[300px] flex-col justify-end">
              <div>
                <h2 className="text-xl font-bold text-secondary-green text-ellipsis overflow-hidden line-clamp-2">
                  {recipe.title}
                </h2>
                <div className="badge badge-primary text-white">
                  {recipe.cuisine_type}
                </div>
                <div className="flex-1">
                  <p className="text-ellipsis overflow-hidden line-clamp-4">
                    "{recipe.title}" is a delightful dish that combines a
                    symphony of flavors and textures to create a culinary
                    masterpiece. This recipe features succulent ingredients
                    meticulously crafted to perfection, resulting in a dish that
                    is both satisfying and memorable. With each bite, you'll
                    experience a burst of savory goodness that tantalizes the
                    taste buds and leaves you craving for more. Whether you're a
                    seasoned chef or a novice in the kitchen, this recipe is
                    sure to impress and delight your senses. So why wait?
                    Indulge in the goodness of "{recipe.title}" today and embark
                    on a culinary journey like no other!
                  </p>
                </div>
              </div>
              <p className="flex-end text-xs text-end items-end">
                Cooking Time:{" "}
                <span className="text-primary">{recipe.cooking_time} mins</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecipeList;
