import React, { useState } from "react";
import { Link } from "react-router-dom";
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

interface RecipeListProps {
  loading: boolean;
  recipes: Recipe[];
  placeholderImage: string;
  isShowOneRecipeCols: boolean;
  screenHeight?: number;
  shuffleRecipe: boolean;
  recipesPerPage: number;
}

const RecipeList: React.FC<RecipeListProps> = ({
  loading,
  recipes,
  placeholderImage,
  isShowOneRecipeCols,
  screenHeight = 0,
  shuffleRecipe,
  recipesPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const shuffleRecipes = (recipes: Recipe[]): Recipe[] => {
    return recipes.slice().sort(() => Math.random() - 0.5);
  };

  // Shuffle recipes if shuffleRecipe is true
  const renderedRecipe = shuffleRecipe
    ? shuffleRecipes(currentRecipes)
    : currentRecipes;

  const renderPlaceholderCard = () => (
    <div
      className={`grid gap-4 ${
        isShowOneRecipeCols
          ? "grid-cols-1 overflow-y-auto hide-scrollbar"
          : "laptop:grid-cols-2 desktop:grid-cols-3"
      }`}
    >
      <div className="card card-side bg-base-100 h-48 desktop:h-72">
        <figure>
          <img
            src={placeholderImage}
            alt="Loading..."
            className="rounded-2xl mobile:w-32 mobile:h-48 laptop:w-48 laptop:h-48 desktop:h-72"
          />
        </figure>
        <div className="pl-3 w-[239px] laptop:w-[300px] flex-col justify-end">
          <div>
            <h2 className="text-xl font-bold text-secondary-green text-ellipsis overflow-hidden line-clamp-2">
              Loading...
            </h2>
            <div className="badge badge-primary text-white">Loading...</div>
            <div className="flex-1">
              <p className="text-ellipsis overflow-hidden line-clamp-4 desktop:line-clamp-8">
                Loading...
              </p>
            </div>
          </div>
          <p className="flex-end text-xs text-end items-end">
            Cooking Time: <span className="text-primary">Loading...</span>
          </p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="m-2 flex justify-center">{renderPlaceholderCard()}</div>
    );
  }

  return (
    <div className="flex-col">
      {/* Your existing recipe rendering code */}
      <div
        className={`grid gap-4 ${
          isShowOneRecipeCols
            ? "grid-cols-1 overflow-y-auto hide-scrollbar"
            : "laptop:grid-cols-2 desktop:grid-cols-3"
        }`}
        style={{
          maxHeight: isShowOneRecipeCols ? `${screenHeight}px` : "none",
        }}
      >
        {renderedRecipe.map((recipe) => (
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
                    <p className="text-ellipsis overflow-hidden line-clamp-4 desktop:line-clamp-8">
                      "{recipe.title}" is a delightful dish that combines a
                      symphony of flavors and textures to create a culinary
                      masterpiece. This recipe features succulent ingredients
                      meticulously crafted to perfection, resulting in a dish
                      that is both satisfying and memorable. With each bite,
                      you'll experience a burst of savory goodness that
                      tantalizes the taste buds and leaves you craving for more.
                      Whether you're a seasoned chef or a novice in the kitchen,
                      this recipe is sure to impress and delight your senses. So
                      why wait? Indulge in the goodness of "{recipe.title}"
                      today and embark on a culinary journey like no other!
                    </p>
                  </div>
                </div>
                <p className="flex-end text-xs text-end items-end">
                  Cooking Time:{" "}
                  <span className="text-primary">
                    {recipe.cooking_time} mins
                  </span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      // Pagination
      {!isShowOneRecipeCols && (
        <div className="join mt-10 flex justify-end">
          {currentPage > 1 && (
            <>
              <button
                onClick={() => paginate(1)}
                className={`join-item btn btn-primary text-white`}
                style={{ width: "40px", height: "40px" }}
              >
                {"<<"}
              </button>
              <button
                onClick={() => paginate(currentPage - 1)}
                className={`join-item btn btn-primary text-white`}
                style={{ width: "40px", height: "40px" }}
              >
                {"<"}
              </button>
            </>
          )}
          {Array.from({
            length: Math.min(Math.ceil(recipes.length / recipesPerPage), 7),
          }).map((_, index) => {
            let page: number;
            if (
              currentPage <= 4 ||
              Math.ceil(recipes.length / recipesPerPage) <= 7
            ) {
              page = index + 1;
            } else if (
              currentPage >=
              Math.ceil(recipes.length / recipesPerPage) - 3
            ) {
              page = Math.ceil(recipes.length / recipesPerPage) - 7 + index + 1;
            } else {
              page = currentPage - 3 + index;
            }
            return (
              page >= 1 &&
              page <= Math.ceil(recipes.length / recipesPerPage) && (
                <button
                  key={index}
                  onClick={() => paginate(page)}
                  className={`join-item btn btn-primary text-white ${
                    currentPage === page ? "btn-active" : ""
                  }`}
                  style={{ width: "40px", height: "40px" }}
                >
                  {page}
                </button>
              )
            );
          })}
          {currentPage < Math.ceil(recipes.length / recipesPerPage) && (
            <>
              <button
                onClick={() => paginate(currentPage + 1)}
                className={`join-item btn btn-primary text-white`}
                style={{ width: "40px", height: "40px" }}
              >
                {">"}
              </button>
              <button
                onClick={() =>
                  paginate(Math.ceil(recipes.length / recipesPerPage))
                }
                className={`join-item btn btn-primary text-white`}
                style={{ width: "40px", height: "40px" }}
              >
                {">>"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
