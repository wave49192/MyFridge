import React, { useState, useEffect } from "react";
import "./FridgeOverview.css";
import { Inventory, InventoryItem } from "../../types/inventory";
import { Link } from "react-router-dom";
import { getEmojiByGroupName } from "../../utils/emojitify";

const mockFridgeValue = [
  {
    id: 15,
    ingredient: {
      id: 6759,
      name: "Water",
      group: "Drinks",
    },
    quantity: 3,
    unit: "pcs",
  },
  {
    id: 15,
    ingredient: {
      id: 67592,
      name: "Strawberry Cake",
      group: "Food",
    },
    quantity: 2,
    unit: "boxes",
  },
  {
    id: 15,
    ingredient: {
      id: 67592,
      name: "Coca Cola",
      group: "Food",
    },
    quantity: 2,
    unit: "boxes",
  },
];

const FridgeOverview: React.FC<Inventory> = ({ items }) => {
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

  const showFoodComponent = () => {
    setCurrentComponent("Food");
  };

  const showIngredientsComponent = () => {
    setCurrentComponent("Ingredients");
  };

  const groupBy = (
    array: InventoryItem[],
    predicate: (
      value: InventoryItem,
      index: number,
      array: InventoryItem[]
    ) => string
  ) =>
    array.reduce((acc, value, index, array) => {
      (acc[predicate(value, index, array)] ||= []).push(value);
      return acc;
    }, {} as { [key: string]: InventoryItem[] });

  return (
    <div className="mx-5 bg-base-100 p-4 rounded-mdjustify-center">
      <div className="flex items-center mb-2 justify-between">
        <div className="flex flex-1 justify-between">
          <h1 className="mobile:text-[27px] text-4xl font-bold mobile:font-semibold hd:mb-6">
            Overview Fridge
          </h1>
          <Link to={"/inventory"} className="mt-3 ml-2">
            <p className="text-md underline">View All</p>
          </Link>
        </div>
      </div>
      <div className="laptop:flex">
        {/* <div
          className={`space-y-2 bg-primary-2 bg-opacity-25 p-4 rounded-lg mb-5 laptop:flex-1 laptop:mr-12 ${
            currentComponent === "Food" ? "" : isLaptopScreen ? "" : "hidden"
          }`}
        >
          <h1 className="text-secondary font-bold text-xl">Food and Drinks</h1>
          You have{" "}
          <span className="text-primary">{mockFridgeValue.length}</span> food(s)
          and drink(s) in your fridge
          <div className="overflow-y-scroll mobile:max-h-[240px] laptop:max-h-[400px] hide-scrollbar">
            {mockFridgeValue.map((item, index) => (
              <div
                key={index}
                className="flex px-4 py-2 my-2 bg-primary-2 rounded-lg laptop:text-xl"
              >
                <p>{item.ingredient.name}</p>
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
          You have <span className="text-primary">{items.length}</span>{" "}
          ingredient(s) in your fridge
          <div className="overflow-y-scroll mobile:max-h-[240px] laptop:max-h-[400px] hide-scrollbar">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex px-4 py-2 my-2 bg-secondary bg-opacity-30 rounded-lg laptop:text-xl"
              >
                <p>{item.ingredient.name}</p>
              </div>
            ))}
          </div>
        </div> */}
        <div className="flex gap-4 overflow-x-auto w-full bg-primary-content bg-opacity-25 rounded-[20px] p-10">
          {Object.entries(groupBy(items, (v) => v.ingredient.group)).map(
            (item) => (
              <div className="p-8 rounded-lg w-min bg-white text-center">
                <p className="font-bold">{getEmojiByGroupName(item[0])}</p>
                <p>{item[1].length} item(s)</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FridgeOverview;
