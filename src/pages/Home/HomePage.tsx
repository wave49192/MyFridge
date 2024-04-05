import React from "react";
import { useAuth } from "../../context/AuthContext";

const HomePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth()

  return <div>{isAuthenticated ? user?.name : 'no'}</div>;
};

export default HomePage;
