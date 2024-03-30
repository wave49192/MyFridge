import React from "react";
import { Link } from "react-router-dom";

interface NavbarNavigation {
  isAtPage?: string;
}

const Navbar: React.FC<NavbarNavigation> = ({ isAtPage }) => {
  return (
    <div className="navbar sticky top-0 z-50 justify-center">
      <div className="self-center rounded-full backdrop-blur-xl bg-white/30 p-3">
        <Link
          to="/"
          className={`btn btn-ghost mobile:text-xs rounded-full laptop:mx-3 ${
            isAtPage === "Home" ? "bg-primary text-white hover:bg-primary" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          className={`btn btn-ghost mobile:text-xs rounded-full laptop:mx-3 ${
            isAtPage === "Dashboard"
              ? "bg-primary text-white hover:bg-primary"
              : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/inventory"
          className={`btn btn-ghost mobile:text-xs rounded-full laptop:mx-3 ${
            isAtPage === "Inventory"
              ? "bg-primary text-white hover:bg-primary"
              : ""
          }`}
        >
          Inventory
        </Link>
        <Link
          to="/recipes"
          className={`btn btn-ghost mobile:text-xs rounded-full laptop:mx-3 ${
            isAtPage === "Recipes"
              ? "bg-primary text-white hover:bg-primary"
              : ""
          }`}
        >
          Recipes
        </Link>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://dogtime.com/wp-content/uploads/sites/12/2023/11/GettyImages-1329412827-e1701097258260.jpg?w=1024"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
