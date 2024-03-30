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
          : "laptop:grid-cols-2 desktop:grid-cols-3 hd:grid-cols-4"
      }`}
    >
      {recipes.map((recipe) => (
        <Link to={`/recipe/${recipe.recipe_id}`} key={recipe.recipe_id}>
          <div className="card card-side bg-base-100 h-48">
            <figure>
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="rounded-2xl mobile:w-32 mobile:h-48 laptop:w-48 laptop:h-48"
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
                    Succulent salmon fillets seasoned with aromatic herbs,
                    grilled to perfection, and finished with a zesty lemon herb
                    butter sauce. The fish is tender and flaky, with a burst of
                    fresh flavors.
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
