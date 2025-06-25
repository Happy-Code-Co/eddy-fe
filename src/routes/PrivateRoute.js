import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SpinLoader from "../layout/SpinLoader";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const result = await isAuthenticated();
      if (mounted) {
        setIsAuth(result);
        setAuthChecked(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [isAuthenticated]);

  if (!authChecked) return <SpinLoader />;
  if (!isAuth)
    return <Navigate to="/login" state={{ from: location }} replace />;
  return <Outlet />;
};

export default PrivateRoute;
