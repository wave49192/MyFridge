import axios from "axios";
import queryString from "query-string";
import React, { useEffect } from "react";
import { Link, Location, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface NavbarNavigation {
  isAtPage?: string;
}

const LinkWithHighlightAtLocation: React.FC<{
  location: string;
  pathName: string;
  currentLocation: Location;
}> = ({ location, pathName, currentLocation }) => (
  <Link
    to={"/" + location}
    className={`btn btn-ghost mobile:text-sm rounded-full laptop:mx-3 ${
      currentLocation.pathname.split("/")[1] === location
        ? "bg-primary text-white hover:bg-primary"
        : ""
    }`}
  >
    {pathName}
  </Link>
);

const Navbar: React.FC<NavbarNavigation> = () => {
  const {
    isAuthenticated,
    user,
    storeUserToSession,
    getUserFromSession,
    clearUserFromSession,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      const values = queryString.parse(location.search, { decode: false });
      const code = values.code ? values.code : null;

      if (code) {
        axios
          .get(`${import.meta.env.VITE_BACKEND_API_URL}/auth?code=${code}`)
          .then((res) => {
            storeUserToSession(
              {
                id: res.data.user.id,
                name: res.data.user.first_name,
                picture: res.data.picture,
              },
              res.data.access_token
            );
            navigate("/");
            window.location.reload();
          })
          .catch((err) => {
            console.log("error", err);
            return err;
          });
      }
    }

    getUserFromSession();
  }, [isAuthenticated]);
  const location = useLocation();

  return (
    <div className="navbar sticky top-0 z-50 justify-center">
      <div className="self-center rounded-full backdrop-blur-xl bg-white/30 p-3">
        <LinkWithHighlightAtLocation
          location={""}
          currentLocation={location}
          pathName={"Dashboard"}
        />
        <LinkWithHighlightAtLocation
          location={"inventory"}
          currentLocation={location}
          pathName={"Inventory"}
        />
        <LinkWithHighlightAtLocation
          location={"recipes"}
          currentLocation={location}
          pathName={"Recipes"}
        />
        {!user?.picture ? (
          <Link to={"/login"}>
            <button className="btn btn-outline btn-primary ml-4 rounded-full">
              Log in
            </button>
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img src={user.picture} />
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
                <a onClick={clearUserFromSession}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
