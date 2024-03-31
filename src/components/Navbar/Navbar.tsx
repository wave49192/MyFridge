import React from "react";
import { Link, Location, useLocation } from "react-router-dom";

interface NavbarNavigation {
  isAtPage?: string;
}

const LinkWithHighlightAtLocation: React.FC<{
  location: string;
  pathName: string;
  currentLocation: Location;
}> = ({ location, pathName, currentLocation }) => (
  <Link
    to={'/' + location}
    className={`btn btn-ghost mobile:text-xs rounded-full laptop:mx-3 ${
      currentLocation.pathname.split("/")[1] === location
        ? "bg-primary text-white hover:bg-primary"
        : ""
    }`}
  >
    {pathName}
  </Link>
);

const Navbar: React.FC<NavbarNavigation> = () => {
  const location = useLocation();

  return (
    <div className="navbar sticky top-0 z-50 justify-center">
      <div className="self-center rounded-full backdrop-blur-xl bg-white/30 p-3">
        <LinkWithHighlightAtLocation
          location={""}
          currentLocation={location} pathName={"Home"}        
          />
        
        <LinkWithHighlightAtLocation
          location={"dashboard"}
          currentLocation={location} pathName={"Dashboard"}        
          />
        <LinkWithHighlightAtLocation
          location={"inventory"}
          currentLocation={location} pathName={"Inventory"}        
          />
        <LinkWithHighlightAtLocation
          location={"recipes"}
          currentLocation={location} pathName={"Recipes"}        
          />
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
