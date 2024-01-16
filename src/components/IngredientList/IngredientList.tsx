import React from "react";
import { IoIosAddCircle } from "react-icons/io";
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
      </div>
      {/* Display the tempIngredients */}
      <div className="flex w-full mb-3 overflow-x-auto mr-30">
        {tempIngredients.map((tempIngredient, index) => (
          <div
            key={index}
            className="card w-50 h-26 bg-base-20 shadow-xl mr-5 mb-3  "
          >
            <figure></figure>
            <div className="card-body p-12">
              <figure>
                <img
                  src={tempIngredient.imageUrl}
                  alt={tempIngredient.name}
                  className="w-16 h-12 object-cover"
                />
              </figure>
              <p className="card-title self-center text-xs">
                {tempIngredient.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Upload image button */}
      <input
        type="file"
        accept="image/*"
        className="file-input file-input-bordered w-full max-w-xs"
        onChange={(e) => e.target.files && onImageUpload(e.target.files[0])}
      />
    </div>
  );
};

export default IngredientList;
