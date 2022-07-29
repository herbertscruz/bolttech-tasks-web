import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function AccessRoute({ children }) {
  const { token } = useAuth();
  const location = useLocation();

  if (token) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />;
  }

  return children;
}

export default AccessRoute;
