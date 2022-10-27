import useAuth from "../hooks/useAuth";
import { useLocation, Navigate, Outlet } from "react-router-dom";

function RequireAuth({ allowedUserTypes }) {
  const { auth } = useAuth();
  const location = useLocation();

  return allowedUserTypes.includes(auth?.user?.userType) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorised" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
