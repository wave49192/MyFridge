import { animated, useTransition } from "@react-spring/web";
import React, { useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { transitions } from "../../transitions/opacity";
interface IngredientListProps {
  ingredients: string[];
  onImageUpload: (file: File) => void;
}

interface Ingredient {
  name: string;
  imageUrl: string;
}

const IngredientList: React.FC<IngredientListProps> = ({
  ingredients,
  onImageUpload,
}) => {
  const tempIngredients: Ingredient[] = [
    {
      name: "Tomato",
      imageUrl:
        "https://cdn.discordapp.com/attachments/787647617307770930/1196874418228559982/pexels-photo-533280.png?ex=65b9372a&is=65a6c22a&hm=0c5f0189fa23baef31f76751f344237957a4f61099c34cf4b6c8bd3003dc4eee&",
    },
    {
      name: "Cheese",
      imageUrl:
        "https://images-prod.healthline.com/hlcmsresource/images/AN_images/healthiest-cheese-1296x728-swiss.jpg",
    },
    {
      name: "Garlic",
      imageUrl:
        "https://assets-global.website-files.com/63ed08484c069d0492f5b0bc/6541526f7a196ff18cd6fdc8_6373b353b73006ad3fe81233_633611cb47a5327eddfa9ea4_garlic-blood-sugar-hero.jpeg",
    },
    {
      name: "Garlic",
      imageUrl:
        "https://assets-global.website-files.com/63ed08484c069d0492f5b0bc/6541526f7a196ff18cd6fdc8_6373b353b73006ad3fe81233_633611cb47a5327eddfa9ea4_garlic-blood-sugar-hero.jpeg",
    },
    {
      name: "Garlic",
      imageUrl:
        "https://assets-global.website-files.com/63ed08484c069d0492f5b0bc/6541526f7a196ff18cd6fdc8_6373b353b73006ad3fe81233_633611cb47a5327eddfa9ea4_garlic-blood-sugar-hero.jpeg",
    },
  ];
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="p-10">
      <h2 className="text-3xl cursor-default font-bold mb-4">
        Ingredient List
      </h2>
      <div className="flex justify-between">
        <h3 className="text-xl cursor-default font-bold">
          You have{" "}
          <span className="text-red-700">{tempIngredients.length}</span>{" "}
          ingredient(s) in your fridge
        </h3>
        <button className="btn-accent dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
            <IoMdAdd size={14} />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a
                onClick={() => {
                  if (dialogRef.current) {
                    dialogRef.current.showModal();
                  }
                }}
              >
                Upload Image
              </a>
            </li>
            <li>
              <a>Select Ingredients</a>
            </li>
          </ul>
        </button>
        <dialog ref={dialogRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Upload Image</h3>
            <p className="py-4">Please upload your food ingredients image</p>
            <div className="modal-action flex flex-col">
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full max-w-xs"
                onChange={(e) =>
                  e.target.files && onImageUpload(e.target.files[0])
                }
              />
              <form method="dialog" className="">
                {/* if there is a button in form, it will close the modal */}
                <div className="flex justify-between mt-8">
                  <button type="submit" className="btn btn-accent">
                    Submit
                  </button>
                  <button className="btn">Close</button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      {/* Display the tempIngredients */}
      <div className="flex w-full mb-3 overflow-x-auto mr-30">
        {transitions(tempIngredients)((style, item) => (
          <animated.div
            style={style}
            className="card w-50 h-26 bg-base-20 shadow-md border-2 border-neutral-200 mr-5 mb-3 "
          >
            <figure></figure>
            <div className="card-body p-12 ">
              <figure>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-28 object-cover mask mask-squircle"
                />
              </figure>
              <p className="card-title self-center text-xs">{item.name}</p>
            </div>
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default IngredientList;
