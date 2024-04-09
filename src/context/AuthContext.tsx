import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children?: ReactNode;
};

type User = {
  id: number;
  name: string;
  picture: string;
};

type IAuthContext = {
  user: User | null;
  isAuthenticated: boolean;
  setMockUser: () => void;
  storeUserToSession: (user: User, accessToken: string) => void;
  getUserFromSession: () => void;
  clearUserFromSession: () => void;
};

const initialValue = {
  user: null,
  isAuthenticated: false,
  setMockUser: () => {},
  storeUserToSession: () => {},
  getUserFromSession: () => {},
  clearUserFromSession: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(initialValue.user);

  const isAuthenticated = user !== null;
  const navigate = useNavigate();

  const storeUserToSession = (user: User, accessToken: string) => {
    window.sessionStorage.setItem("user", JSON.stringify(user));
    window.sessionStorage.setItem("accessToken", accessToken);
  };

  const getUserFromSession = () => {
    const userFromStorage = window.sessionStorage.getItem("user");
    const user = userFromStorage ? JSON.parse(userFromStorage) : null;
    setUser(user);
  };

  const clearUserFromSession = () => {
    window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("accessToken");
    setUser(null);
    navigate("/");
  };

  const setMockUser = () => {
    const user = {
      id: 1,
      name: "Poomtum",
      picture:
        "https://lh3.googleusercontent.com/a/ACg8ocIeGpZV5RcQdZ_XueM3CuysGhtv-gisNpdKTRQJk-1N1h75_s_Z=s96-c",
    };
    storeUserToSession(user, "");
    navigate("/");
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        setMockUser,
        isAuthenticated,
        user,
        storeUserToSession,
        getUserFromSession,
        clearUserFromSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
