import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-base-100 bg-white">
      <div className="mobile:flex-auto justify-evenly laptop:justify-center">
        <a className="btn btn-ghost text-m ">Home</a>
        <a className="btn btn-ghost text-m ">Home</a>
        <a className="btn btn-ghost text-m ">Home</a>
        <a className="btn btn-ghost text-m ">Home</a>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
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
                <span className="badge">New</span>
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
  );
};

export default Navbar;
