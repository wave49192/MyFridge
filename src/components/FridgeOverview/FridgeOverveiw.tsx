import React, { useState, useEffect } from "react";
import "./FridgeOverview.css";

interface FoodItem {
  name: string;
}

const FridgeOverview: React.FC = () => {
  const [currentComponent, setCurrentComponent] = useState<
    "Food" | "Ingredients"
  >("Food");
  const [isLaptopScreen, setIsLaptopScreen] = useState<boolean>(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 427px)");
    setIsLaptopScreen(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => {
      setIsLaptopScreen(e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const foodItems: FoodItem[] = [
    { name: "Onion" },
    { name: "Tomato" },
    { name: "Apple" },
    { name: "Apple" },
    { name: "Apple" },
    { name: "Apple" },
    { name: "Apple" },
    { name: "Apple" },
    { name: "Apple" },
    { name: "Apple" },
    { name: "Apple" },
    { name: "Apple" },
    { name: "Apple" },
    { name: "Apple" },
    { name: "Apple" },
    { name: "Apple" },
  ];

  const showFoodComponent = () => {
    setCurrentComponent("Food");
  };

  const showIngredientsComponent = () => {
    setCurrentComponent("Ingredients");
  };

  return (
    <div className="mx-5 bg-base-100 p-4 rounded-md shadow-md justify-center">
      <div className="flex items-center mb-2 justify-between">
        <div className="flex">
          <h1 className="text-2xl font-bold">Overview Fridge</h1>
          {/* <a href="" className="mt-2 ml-3">
            <p className="text-md underline">View All</p>
          </a> */}
        </div>
        {!isLaptopScreen && (
          <div className="laptop:hidden join grid grid-cols-2">
            <button
              onClick={showFoodComponent}
              className={`join-item btn btn-outline rounded-full bg-primary text-xl text-white 
            ${currentComponent === "Food" ? "custom-disabled" : ""}`}
            >
              &lt;
            </button>
            <button
              onClick={showIngredientsComponent}
              className={`join-item btn btn-outline rounded-full bg-primary text-xl text-white 
            ${currentComponent === "Ingredients" ? "custom-disabled" : ""}`}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
      <div className="laptop:flex">
        <div
          className={`space-y-2 bg-primary-2 bg-opacity-25 p-4 rounded-lg mb-5 laptop:flex-1 laptop:mr-12 ${
            currentComponent === "Food" ? "" : isLaptopScreen ? "" : "hidden"
          }`}
        >
          <h1 className="text-secondary font-bold text-xl">Food and Drinks</h1>
          You have <span className="text-primary">{foodItems.length}</span>{" "}
          food(s) and drink(s) in your fridge
          <div className="overflow-y-scroll mobile:max-h-[240px] laptop:max-h-[400px] hide-scrollbar">
            {foodItems.map((item, index) => (
              <div
                key={index}
                className="flex px-4 py-2 my-2 bg-primary-2 rounded-lg laptop:text-xl"
              >
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`space-y-2 bg-secondary-green bg-opacity-15 p-4 mb-5 rounded-lg laptop:flex-1 ${
            currentComponent === "Ingredients"
              ? ""
              : isLaptopScreen
              ? ""
              : "hidden"
          }`}
        >
          <h1 className="text-secondary font-bold text-xl">Ingredients</h1>
          You have <span className="text-primary">{foodItems.length}</span>{" "}
          ingredient(s) in your fridge
          <div className="overflow-y-scroll mobile:max-h-[240px] laptop:max-h-[400px] hide-scrollbar">
            {foodItems.map((item, index) => (
              <div
                key={index}
                className="flex px-4 py-2 my-2 bg-secondary bg-opacity-30 rounded-lg laptop:text-xl"
              >
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FridgeOverview;
