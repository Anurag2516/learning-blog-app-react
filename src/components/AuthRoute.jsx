import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (currentUser && currentUser.length > 0) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AuthRoute;
