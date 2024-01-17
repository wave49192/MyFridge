import React from "react";
import { PiCookingPot } from "react-icons/pi";

interface RecipeListProps {
  recipes: string[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  const tempRecipes = [
    {
      imageUrl:
        "https://cdn.loveandlemons.com/wp-content/uploads/2021/04/green-salad.jpg",
      name: "Salad Caesar",
      description:
        "A classic Caesar salad with crisp lettuce, croutons, and a tangy Caesar dressing.",
      tag: ["Vegetarian", "Salad", "Healthy"],
      cookingTime: "30 mins",
      cookingSteps: [
        "1. Wash and chop the lettuce.",
        "2. Prepare croutons or use store-bought ones.",
        "3. Mix the lettuce and croutons in a bowl.",
        "4. Add Caesar dressing and toss well.",
        "5. Optionally, sprinkle with Parmesan cheese.",
        "6. Serve immediately and enjoy!",
      ],
    },
    {
      imageUrl:
        "https://www.onceuponachef.com/images/2017/02/Asian-Vegetable-Stir-Fry-3.jpg",
      name: "Vegetarian Stir Fry",
      description:
        "A quick and healthy stir fry loaded with colorful vegetables and tofu in a savory sauce.",
      tag: ["Vegetarian", "Asian"],
      cookingTime: "30 mins",
      cookingSteps: [
        "1. Prepare tofu and vegetables by chopping them into bite-sized pieces.",
        "2. Heat oil in a wok or large pan over medium-high heat.",
        "3. Add tofu and stir-fry until golden brown.",
        "4. Add vegetables and stir-fry until tender-crisp.",
        "5. Pour in the savory sauce and toss to coat evenly.",
        "6. Serve hot over rice or noodles.",
      ],
    },
    {
      imageUrl:
        "https://thekitchengirl.com/wp-content/uploads/Grilled-Salmon-a_19-1.jpg",
      name: "Grilled Salmon",
      description:
        "Delicious grilled salmon fillets seasoned to perfection and served with a side of veggies.",
      tag: ["Seafood", "Healthy", "Grilled"],
      cookingTime: "20 mins",
      cookingSteps: [
        "1. Preheat the grill to medium-high heat.",
        "2. Season salmon fillets with salt, pepper, and your favorite herbs.",
        "3. Grill the salmon for about 4-5 minutes per side, or until it flakes easily.",
        "4. In the last couple of minutes, grill vegetables of your choice.",
        "5. Serve grilled salmon on a plate with veggies on the side.",
        "6. Garnish with lemon wedges and fresh herbs.",
      ],
    },
    {
      imageUrl:
        "https://hips.hearstapps.com/hmg-prod/images/delish-202102-airfryerchickenparm-184-ls-1612561654.jpg?crop=1xw:0.84375xh;center,top&resize=1200:*",
      name: "Chicken Parmesan",
      description:
        "Classic comfort food featuring breaded chicken cutlets topped with marinara sauce and melted cheese.",
      tag: ["Chicken", "Italian", "Comfort Food"],
      cookingTime: "40 mins",
      cookingSteps: [
        "1. Preheat the oven to 375°F (190°C).",
        "2. Bread chicken cutlets with a mixture of breadcrumbs and Parmesan cheese.",
        "3. Bake the chicken for 20 minutes, or until cooked through.",
        "4. Top each cutlet with marinara sauce and mozzarella cheese.",
        "5. Bake for an additional 10 minutes, or until the cheese is melted and bubbly.",
        "6. Serve over pasta and garnish with fresh basil.",
      ],
    },
    {
      imageUrl:
        "https://www.inspiredtaste.net/wp-content/uploads/2023/01/Quinoa-Salad-Recipe-Video.jpg",
      name: "Quinoa Salad",
      description:
        "A refreshing quinoa salad with a mix of colorful vegetables, herbs, and a zesty vinaigrette.",
      tag: ["Vegetarian", "Salad", "Healthy"],
      cookingTime: "15 mins",
      cookingSteps: [
        "1. Rinse quinoa under cold water and cook according to package instructions.",
        "2. Let quinoa cool to room temperature.",
        "3. In a large bowl, combine quinoa with chopped vegetables and herbs.",
        "4. In a small bowl, whisk together olive oil, lemon juice, salt, and pepper to make the dressing.",
        "5. Pour the dressing over the quinoa mixture and toss to combine.",
        "6. Chill in the refrigerator for at least 30 minutes before serving.",
      ],
    },
    {
      imageUrl: "https://www.onceuponachef.com/images/2023/08/Beef-Tacos.jpg",
      name: "Beef Tacos",
      description:
        "Tasty beef tacos with seasoned ground beef, fresh toppings, and your favorite salsa.",
      tag: ["Beef", "Mexican", "Tacos"],
      cookingTime: "25 mins",
      cookingSteps: [
        "1. In a skillet, cook ground beef over medium heat until browned.",
        "2. Drain excess fat and add taco seasoning with water, following the package instructions.",
        "3. Simmer until the mixture thickens.",
        "4. Heat taco shells in the oven or microwave.",
        "5. Fill each shell with seasoned beef and top with your favorite toppings.",
        "6. Serve with salsa and enjoy!",
      ],
    },
    {
      imageUrl:
        "https://cdn.loveandlemons.com/wp-content/uploads/2023/01/mushroom-risotto.jpg",
      name: "Mushroom Risotto",
      description:
        "Creamy and flavorful mushroom risotto made with Arborio rice and a medley of mushrooms.",
      tag: ["Vegetarian", "Italian", "Risotto"],
      cookingTime: "35 mins",
      cookingSteps: [
        "1. In a saucepan, heat vegetable broth and keep it warm.",
        "2. In another pan, sauté chopped onions and garlic in olive oil until translucent.",
        "3. Add Arborio rice and cook until lightly toasted.",
        "4. Pour in white wine and cook until it evaporates.",
        "5. Begin adding warm vegetable broth, one ladle at a time, stirring until absorbed.",
        "6. Continue this process until the rice is creamy and cooked to al dente.",
        "7. Stir in sautéed mushrooms, Parmesan cheese, and fresh herbs.",
        "8. Season with salt and pepper to taste.",
        "9. Serve immediately and enjoy!",
      ],
    },
  ];

  return (
    <div className="px-10 pb-32">
      <h2 className="text-xm cursor-default font-bold mb-4">
        Available Recipes
      </h2>
      <div>
        {/* Map through tempRecipes and render each recipe */}
        {tempRecipes.map((recipe, index) => (
          <div key={index} className="rounded-lg pl-8 py-4 bg-base-200 mb-4">
            <div className="text-xl font-medium flex">
              <img
                src={recipe.imageUrl}
                className="w-14 h-14 object-cover rounded-lg mr-12"
                alt={recipe.name}
              />
              <div className="flex flex-col basis-1/2 justify-around">
                <p className="text-sm font-bold">{recipe.name}</p>
                <p className="text-xs">{recipe.description}</p>
              </div>
              <div className="basis-1/2 flex">
                <PiCookingPot className="mr-2  self-center" size={30} />
                <p className="flex text-center self-center text-sm">
                  {recipe.cookingTime}
                </p>
              </div>
              <p className="basis-1/2 self-center">
                {/* Render tags here */}
                {recipe.tag.map((tag, tagIndex) => (
                  <div key={tagIndex} className="badge badge-neutral m-1">
                    {tag}
                  </div>
                ))}
              </p>
              <div className="mr-5">
                <button
                  className="btn"
                  onClick={() =>
                    document.getElementById("my_modal_2").showModal()
                  }
                >
                  See recipe
                </button>
                <dialog id="my_modal_2" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">{recipe.name}</h3>
                    <p className="py-4">
                      {" "}
                      {recipe.cookingSteps?.map((step, stepIndex) => (
                        <span key={stepIndex}>
                          {`${step}`}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </div>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
