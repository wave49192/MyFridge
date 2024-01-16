import React, { useState } from "react";

import { RecipeList, IngredientList } from "../../components";
import { MdFastfood } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { BiFridge } from "react-icons/bi";
import { BiSolidFridge } from "react-icons/bi";
import { BiSolidFoodMenu } from "react-icons/bi";
const HomePage: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<string[]>([]);

  const handleImageUpload = (file: File) => {};

  const fetchRecipes = (recognizedIngredients: string[]) => {};

  return (
    <div>
      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <IngredientList
            ingredients={ingredients}
            onImageUpload={handleImageUpload}
          />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu  p-4 w-80 min-h-full bg-base-200 text-base-content font-bold">
            {/* Sidebar content here */}

            <a className="flex items-center ml-10 mt-5 mb-5">
              <BiFridge size={50} />
              <p className="text-4xl cursor-default">MyFridge</p>
            </a>
            <li></li>
            <a className="flex items-center">
              <p className="text-slate-600 font-bold ml-4 my-1">Menu</p>
            </a>
            <li>
              <a className="a-tag-style">
                <MdSpaceDashboard size={25} className="mr-2" />
                Dashboard
              </a>
            </li>
            <li></li>
            <a className="flex items-center">
              <p className="text-slate-600 font-bold ml-4 my-1">Content</p>
            </a>
            <li>
              <a className="a-tag-style">
                <BiSolidFridge size={25} className="mr-2" />
                Refrigerator
              </a>
            </li>
            <li>
              <a className="a-tag-style">
                <BiSolidFoodMenu size={25} className="mr-2" />
                Recipe Generator
              </a>
            </li>
          </ul>
        </div>
      </div>

      <RecipeList recipes={recipes} />
    </div>
  );
};

export default HomePage;
