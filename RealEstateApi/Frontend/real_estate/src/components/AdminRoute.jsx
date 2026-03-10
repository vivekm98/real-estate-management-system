import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("role");

  return role === "Admin" ? children : <Navigate to="/user" />;
};

export default AdminRoute;