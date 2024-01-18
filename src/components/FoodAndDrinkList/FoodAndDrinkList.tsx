import React, { useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { transitions } from "../../transitions/opacity";
import { animated } from "@react-spring/web";
interface FoodAndDrinkListProps {
  items: string[];
  onImageUpload: (file: File) => void;
}

interface Ingredient {
  name: string;
  imageUrl: string;
}

const FoodAndDrinkList: React.FC<FoodAndDrinkListProps> = ({
  items,
  onImageUpload,
}) => {
  const tempFood: Ingredient[] = [
    {
      name: "Egg",
      imageUrl:
        "https://i.insider.com/5919bca71442933b048b54be?width=750&format=jpeg&auto=webp",
    },
    {
      name: "Mansome",
      imageUrl:
        "https://st-th-1.byteark.com/assets.punpro.com/contents/i3158/1552896966958-53343568_2235077149861959_2494202373392564224_o.jpg",
    },
    {
      name: "Water",
      imageUrl: "https://pbs.twimg.com/media/FxsD9EEaMAAfzh8.jpg:large",
    },
  ];
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="p-10">
      <h2 className="text-3xl cursor-default font-bold mb-4">
        Food and Drinks
      </h2>
      <div className="flex justify-between">
        <h3 className="text-xl cursor-default font-bold">
          You have <span className="text-red-700">{tempFood.length}</span> Food
          and Drink in your fridge
        </h3>
        <button
          className="btn btn-accent "
          onClick={() => {
            if (dialogRef.current) {
              dialogRef.current.showModal()
            }
          }}
        >
          <IoMdAdd size={14} />
        </button>
        <dialog ref={dialogRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Upload Picture</h3>
            <p className="py-4">Please upload your food or drink picture</p>
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
                {/* Upload image button */}

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
      <div className="flex w-full overflow-x-auto mr-30">
        {transitions(tempFood)((style, item) => (
          <animated.div
            style={style}
            className="card w-50 h-26 bg-base-20 shadow-md border-2 border-neutral-200 mr-5 mb-3  "
          >
            <figure></figure>
            <div className="card-body p-12">
              <figure>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-28 object-cover mask mask-squircle"
                />
              </figure>
              <p className="card-title self-center text-xs">
                {item.name}
              </p>
            </div>
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default FoodAndDrinkList;
