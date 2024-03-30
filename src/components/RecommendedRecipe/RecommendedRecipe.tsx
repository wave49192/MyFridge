import { RecipeList } from "..";

const RecommendedRecipe = () => {
  return (
    <div className="m-6">
      <h1 className="text-accent font-bold mobile:text-xl">
        Recommended For you
      </h1>
      <RecipeList />
    </div>
  );
};

export default RecommendedRecipe;
