import React, { useEffect, useState } from "react";
import TryFeature from "../../components/TryFeature/TryFeature";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Inventory } from "../../types/inventory";



const InventoryPage: React.FC = () => {
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get<Inventory>(`http://127.0.0.1:8000/inventory/user/?user_id=${user?.id}`)
      .then((res) => setInventory(res.data))
      .catch(err => navigate("/"));
  }, [user]);

  return (
    <div className="flex flex-col items-center text-2xl gap-4 laptop:mx-20 hd:mx-60">
      <h2 className="text-accent font-bold">Inventory</h2>
      <div className="flex flex-col gap-4 w-10/12">
        <TryFeature />
        <div className="w-full flex justify-between items-center gap-4">
          {/* <SearchBar />
          <button className="btn bg-accent bg-opacity-5 text-base-100 h-12 rounded-2xl">
            +
          </button>
          <button className="btn bg-accent bg-opacity-5 text-base-100 h-12 rounded-2xl">
            +
          </button> */}
        </div>
        <div>
          {inventory ? inventory.items.map((v, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3 my-2 bg-primary-2 bg-opacity-25 rounded-2xl laptop:text-xl"
            >
              <span className="text-base font-bold text-secondary">{v.ingredient.name}</span>
              <div>
                <span className="text-base mr-2">{v.quantity}</span>
                <span className="text-base">{v.unit}</span>
              </div>
            </div>
          )) : <></>}
        </div>
      </div>
      <Pagination />
      <Link to={"/inventory/add"}>
        <div className="w-10/12 btn rounded-3xl bg-primary text-base-100 sticky bottom-5">
          + Add Ingredient
        </div>
      </Link>
    </div>
  );
};

export default InventoryPage;
