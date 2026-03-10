import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const role = localStorage.getItem("role");

  if (!isLoggedIn) {
    return children;
  }

  if (role === "Admin") {
    return <Navigate to="/admin" />;
  }

  return <Navigate to="/user-dashboard" />;
};

export default PublicRoute;