import "./FridgeOverview.css";

interface FoodItem {
  name: string;
}

const FridgeOverview: React.FC = () => {
  const foodItems: FoodItem[] = [
    { name: "Onion" },
    { name: "Onion" },
    { name: "Onion" },
    { name: "Onion" },
    { name: "Onion" },
  ];

  return (
    <div className="mx-5 bg-base-100 p-4 rounded-md shadow-md justify-center">
      <div className="flex items-center mb-2 justify-between">
        <div className="flex">
          <h1 className="text-2xl font-bold">Overview Fridge</h1>
          <a href="" className="mt-2 ml-3">
            <p className="text-md underline">View All</p>
          </a>
        </div>
        <div className="join grid grid-cols-2">
          <button className="join-item btn custom-disabled btn-outline rounded-full bg-primary text-xl text-white">
            &lt;
          </button>
          <button className="join-item btn btn-outline rounded-full bg-primary text-xl text-white">
            &gt;
          </button>
        </div>
      </div>
      <div className="space-y-2 bg-primary-2 bg-opacity-25 p-4 rounded-lg">
        <h1 className="text-secondary font-bold text-xl ">Food and Drinks</h1>
        You have <span className="text-primary">3</span> food(s) and drinks(s)
        in your fridge{" "}
        {foodItems.map((item, index) => (
          <div key={index} className="flex px-4 py-2 bg-primary-2 rounded-lg">
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FridgeOverview;
