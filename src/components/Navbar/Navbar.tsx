import React from "react";

interface NavbarNavigation {
  isAtPage?: string;
}
const Navbar: React.FC<NavbarNavigation> = ({ isAtPage }) => {
  return (
    <>
      <div className="navbar sticky top-0 z-50 justify-center">
        <div className="self-center rounded-full backdrop-blur-xl bg-white/30 py-3 px-5">
          <a
            className={`btn btn-ghost text-m rounded-full ${
              isAtPage === "Home" ? "bg-primary text-white" : ""
            }`}
          >
            Home
          </a>
          <a
            className={`btn btn-ghost text-m rounded-full ${
              isAtPage === "Dashboard" ? "bg-primary text-white" : ""
            }`}
          >
            Dashboard
          </a>
          <a
            className={`btn btn-ghost text-m rounded-full ${
              isAtPage === "Inventory" ? "bg-primary text-white" : ""
            }`}
          >
            Inventory
          </a>
          <a
            className={`btn btn-ghost text-m rounded-full ${
              isAtPage === "Recipes" ? "bg-primary text-white" : ""
            }`}
          >
            Recipes
          </a>

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
                <a className="justify-between">
                  Profile
                  {/* <span className="badge">New</span> */}
                </a>
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
    </>
  );
};

export default Navbar;
