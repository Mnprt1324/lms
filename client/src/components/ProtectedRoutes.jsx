import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }) => {
  const { isAuthenticate } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (!isAuthenticate || !token) {
    return <Navigate to={"/login"} />;
  }

  return children;
};
export const AuthenticateUser = ({ children }) => {
  const { isAuthenticate } = useSelector((state) => state.auth);
  if (isAuthenticate) {
    return <Navigate to={"/"} />;
  }

  return children;
};

export const AdminRoutes = ({ children }) => {
  const { user, isAuthenticate } = useSelector((state) => state.auth);
  if (!isAuthenticate) {
    return <Navigate to={"/login"} />;
  }

  if (user.role !== "instructor") {
    return <Navigate to={"/"} />;
  }

  return children;
};
