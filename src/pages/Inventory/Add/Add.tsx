import React, { useEffect, useState } from "react";
import { Ingredient } from "../../../types/inventory";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import GroupedAutocomplete from "../../../components/GroupedAutocomplete/GroupedAutocomplete";
import { useAuth } from "../../../context/AuthContext";

interface AddingIngredient {
  ingredient: number;
  name: string;
  amount: number;
  unit: string;
}

const AddPage = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const initialState = {
    ingredient: 0,
    name: "",
    amount: 0,
    unit: "",
  };
  const [addingIngredient, setAddingIngredient] =
    useState<AddingIngredient>(initialState);
  const [addedIngredient, setAddedIngredient] = useState<AddingIngredient[]>(
    []
  );
  const { user } = useAuth();
  const navigate = useNavigate();

  const capitalizeWord = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1);
  const handleAddIngredient = () => {
    axios
      .get(`http://localhost:8000/inventory/user/?user_id=${user?.id}`)
      .then((res) =>
        axios
          .post(`http://localhost:8000/inventory/${res.data.id}/ingredients/`, {
            ingredients: addedIngredient.map((a) => ({
              ingredient: a.ingredient,
              amount: a.amount,
              unit: a.unit,
            })),
          })
          .then((res) => {
            console.log(res.data);
            navigate("/inventory");
          })
      );
  };

  useEffect(() => {
    axios.get("http://localhost:8000/ingredients/").then((res) => {
      setIngredients(res.data);
    });
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 laptop:mx-20 hd:mx-60">
      <h1 className="text-3xl text-accent">Add Ingredient</h1>
      <div className="flex gap-4">
        <a className="text-primary border-b">Add manually</a>
        <Link to={"/inventory/detect"}>
          <a className="text-primary">Image detection</a>
        </Link>
      </div>
      <div className="flex flex-col w-full px-5 gap-4">
        {isAdding ? (
          <div className="flex flex-col bg-primary-content bg-opacity-25 rounded-[20px] p-2 items-center gap-2">
            <div className="grid grid-rows-3 grid-cols-4 gap-4 flex-1 p-3 justify-center items-center">
              <span className="col-span-1">Name</span>
              <div className="col-span-3 flex-1">
                <GroupedAutocomplete
                  ingredients={ingredients}
                  setIngredients={setAddingIngredient}
                />
              </div>
              <span className="cols-span-1">Amount</span>
              <input
                className="col-span-3 rounded-[20px] p-2"
                value={addingIngredient.amount}
                onChange={(e) =>
                  setAddingIngredient((prev) => ({
                    ...prev,
                    amount: parseInt(e.target.value),
                  }))
                }
              ></input>
              <span className="cols-span-1">Unit</span>
              <input
                className="col-span-3 rounded-[20px] p-2"
                value={addingIngredient.unit}
                onChange={(e) =>
                  setAddingIngredient((prev) => ({
                    ...prev,
                    unit: e.target.value,
                  }))
                }
              ></input>
            </div>
            <div className="flex gap-2">
              <div
                onClick={() => {
                  setIsAdding(false);
                  setAddingIngredient(initialState);
                }}
                className="rounded-full border border-primary text-primary text-center p-2 w-10 font-bold"
              >
                Ｘ
              </div>
              <div
                onClick={() => {
                  setIsAdding(false);
                  setAddedIngredient((prev) => [...prev, addingIngredient]);
                  setAddingIngredient(initialState);
                }}
                className="rounded-full bg-primary text-white text-center p-2 w-10"
              >
                ✓
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {addedIngredient ? (
          addedIngredient.map((a, i) => (
            <div
              key={i}
              className="flex items-center bg-primary-content bg-opacity-5 p-4 rounded-[20px] gap-2"
            >
              <div className="flex justify-between items-center flex-1">
                <span className="text-secondary font-bold text-lg">
                  {capitalizeWord(a.name)}
                </span>
                <span>
                  Amount: {a.amount} {a.unit}
                </span>
              </div>
              <div
                onClick={() =>
                  setAddedIngredient((prev) =>
                    prev.filter((item) => item.ingredient !== a.ingredient)
                  )
                }
                className="rounded-full bg-primary font-bold text-white w-10 p-2 text-center"
              >
                X
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
        <button
          onClick={() => setIsAdding(true)}
          className="bg-accent bg-opacity-5 rounded-[20px] border border-dashed border-accent border-opacity-25 py-3"
        >
          Add more ingredient
        </button>
        <div className="w-full flex gap-2 justify-center sticky bottom-5">
          <button
            onClick={handleAddIngredient}
            className="p-2 rounded-[20px] bg-primary text-base-100 flex-1"
          >
            Add ingredients
          </button>
          <button
            onClick={() => {
              setAddedIngredient([]);
              setAddingIngredient(initialState);
              setIsAdding(false);
            }}
            className="p-2 rounded-[20px] border border-primary text-primary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPage;
