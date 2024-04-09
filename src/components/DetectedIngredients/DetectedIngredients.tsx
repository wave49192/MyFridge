import { useEffect, useState } from "react";
import { Ingredient, InventoryItem } from "../../types/inventory";

interface Props {
  items: Item[];
	setItems: React.Dispatch<React.SetStateAction<Item[]>>
}

interface EditProps {
  item: Item;
  setItem: React.Dispatch<React.SetStateAction<Item[]>>;
}

type Item = Omit<InventoryItem, "id">;

const EditDetectedIngredient: React.FC<EditProps> = ({ item, setItem }) => {
  const handleEditAmount = (e: any) => {
    setItem((prev) =>
      prev.map((p) => {
        if (p.ingredient.id === item.ingredient.id) {
          return { ...p, quantity: parseInt(e.target.value) || 0 };
        }
        return p;
      })
    );
  };
  const handleEditUnit = (e: any) => {
    setItem((prev) =>
      prev.map((p) => {
        if (p.ingredient.id === item.ingredient.id) {
          return { ...p, unit: e.target.value };
        }
        return p;
      })
    );
  };
  return (
    <div className="flex gap-2 justify-between flex-1 items-center">
      <p className="text-base font-bold">{item.ingredient.name}</p>
      <div>
        <input
          onChange={handleEditAmount}
					value={item.quantity}
          placeholder="Amount"
          className="p-1 bg-neutral bg-opacity-10 w-16 rounded-md mr-4"
        ></input>
        <input
          onChange={handleEditUnit}
					value={item.unit}
          placeholder="Unit"
          className="p-1 bg-neutral bg-opacity-10 w-16 rounded-md"
        ></input>
      </div>
    </div>
  );
};

const DetectedIngredients: React.FC<Props> = ({ items, setItems }) => {
	
  return (
    <div className="p-4 flex flex-col bg-primary-content bg-opacity-25 w-10/12 rounded-[20px]">
      <p className="text-secondary font-bold">Detected Ingredients: </p>
      {items.map((v, i) => (
        <div
          key={i}
          className="flex px-4 py-3 my-2 bg-white text-secondary rounded-2xl laptop:text-xl"
        >
          <EditDetectedIngredient item={v} setItem={setItems} />
        </div>
      ))}
    </div>
  );
};

export default DetectedIngredients;
