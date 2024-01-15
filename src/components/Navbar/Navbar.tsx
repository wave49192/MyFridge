import React from "react";

const Navbar = () => {
  let color = "bg-red-500";
  return (
    <div>
      <div className={color}>red</div>

      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
};

export default Navbar;
