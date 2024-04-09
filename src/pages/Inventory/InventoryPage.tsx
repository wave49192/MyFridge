import React, { useEffect, useState } from "react";
import TryFeature from "../../components/TryFeature/TryFeature";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Inventory, InventoryItem } from "../../types/inventory";
import { AiFillControl } from "react-icons/ai";
import { FaPencil } from "react-icons/fa6";
import { getEmojiByGroupName } from "../../utils/emojitify";

const InventoryPage: React.FC = () => {
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [selectedDeleting, setSelectedDeleting] = useState<
    { id: number; checked: boolean }[]
  >([]);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDeleteIngredients = () => {
    selectedDeleting
      .filter((item) => item.checked)
      .forEach((item) => {
        axios
          .delete(
            `${import.meta.env.VITE_BACKEND_API_URL}/inventory_items/${item.id}`
          )
          .then((_) => window.location.reload());
      });
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

  useEffect(() => {
    axios
      .get<Inventory>(
        `${import.meta.env.VITE_BACKEND_API_URL}/inventory/user/?user_id=${
          user?.id
        }`
      )
      .then((res) => {
        setInventory(res.data);
        setSelectedDeleting(
          res.data.items.map((d) => ({ id: d.id, checked: false }))
        );
        console.log(
          Object.entries(groupBy(res.data.items, (v) => v.ingredient.group))
        );
      })
      .catch((err) => {
      });
  }, [user]);

  return (
    <div className="flex flex-col items-center text-2xl gap-4 laptop:mx-20 hd:mx-60">
      <h2 className="text-accent font-bold">Inventory</h2>
      <div className="flex flex-col gap-4 w-10/12">
        <TryFeature />
        <div className="w-full flex items-center gap-4">
          <SearchBar />
          <button className="btn bg-accent bg-opacity-5 text-base-100 h-12 rounded-2xl">
            <AiFillControl className="text-accent" />
          </button>
          <button
            onClick={() => setIsDeleting(true)}
            className="btn bg-accent bg-opacity-5 text-base-100 h-12 rounded-2xl"
          >
            <FaPencil className="text-accent" />
          </button>
        </div>
        <div id='inventory'>
          {inventory ? (
            Object.entries(
              groupBy(inventory.items, (v) => v.ingredient.group)
            ).map((v, i) => (
              <>
                <p className="text-primary">{getEmojiByGroupName(v[0])}</p>
                <div
                  key={i}
                  className="flex flex-col px-4 py-3 my-2 bg-primary-2 bg-opacity-25 rounded-2xl laptop:text-xl"
                >
                  {v[1].map((item, itemIndex) => (
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-secondary">
                        {item.ingredient.name}
                      </span>
                      <div className="flex justify-center gap-2">
                        <span className="text-base">{item.quantity}</span>
                        <span className="text-base">{item.unit}</span>
                        {isDeleting ? (
                          <input
                            type="checkbox"
                            checked={selectedDeleting.filter(d => d.id === item.id)[0].checked}
                            onChange={(e) => {
                              setSelectedDeleting((prev) =>
                                prev.map((p) => {
                                  if (p.id === item.id) {
                                    return {
                                      id: p.id,
                                      checked: e.target.checked,
                                    };
                                  }
                                  return p;
                                })
                              );
                            }}
                            className="checkbox checkbox-primary"
                          ></input>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <Pagination />
      {!isDeleting ? (
        <Link to={"/inventory/add"} className="w-10/12">
          <div className="w-full btn rounded-3xl bg-primary text-base-100 sticky bottom-5">
            + Add Ingredient
          </div>
        </Link>
      ) : (
        <div className="flex w-10/12 gap-2">
          <div
            onClick={handleDeleteIngredients}
            className="w-9/12 btn rounded-3xl bg-primary text-base-100 sticky bottom-5"
          >
            Delete Selected Ingredient(s)
          </div>
          <div
            onClick={() => setIsDeleting(false)}
            className="btn rounded-3xl text-primary border border-primary bg-base-100 sticky bottom-5"
          >
            Cancel
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
