import { Navigate, useLocation } from "react-router-dom";

import { Loading } from "@components/SpinerWrapper";
import { RootStateType } from "@store/types";
import { useAppSelector } from "@hooks/useReduxToolKit";

function RequireAuth({ children }: any) {
  const { loggedIn, isLoading } = useAppSelector((state: RootStateType) => state.auth);

  const location = useLocation();

  if (!loggedIn && isLoading === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return isLoading ? <Loading /> : children;
}

export default RequireAuth;
