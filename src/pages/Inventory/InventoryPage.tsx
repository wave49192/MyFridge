import React, { useEffect, useState } from "react";
import { Navbar } from "../../components";
import TryFeature from "../../components/TryFeature/TryFeature";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";
import axios from "axios";

interface Ingredient {
  name: string
}

const InventoryPage: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    axios.get<Ingredient[]>('http://localhost:8000/ingredients').then(res => setIngredients(res.data))
  }, [])
  
  return (
    <div className="flex flex-col items-center text-2xl gap-4">
      <h2 className="text-accent font-bold">Inventory</h2>
      <div className="flex flex-col gap-4 w-10/12">
        <TryFeature />
        <div className="w-full flex justify-between items-center gap-4">
          <SearchBar />
          <button className="btn bg-accent bg-opacity-5 text-base-100 h-12 rounded-2xl">
            +
          </button>
          <button className="btn bg-accent bg-opacity-5 text-base-100 h-12 rounded-2xl">
            +
          </button>
        </div>
        <div>
          {ingredients.map((v, i) => (
            <div
              key={i}
              className="flex px-4 py-3 my-2 bg-primary-2 bg-opacity-25 rounded-2xl laptop:text-xl"
            >
              <p className="text-base font-bold text-secondary">{v.name}</p>
            </div>
          ))}
        </div>
      </div>
      <Pagination />
      <div className="w-10/12 btn rounded-3xl bg-primary text-base-100 sticky bottom-5">
        + Add Ingredient
      </div>
    </div>
  );
};

export default InventoryPage;
