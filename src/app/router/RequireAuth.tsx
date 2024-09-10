import { getUserAuthData } from "entities/User";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RoutesPath } from "shared/config/route-config/routeConfig";
import { useAppSelector } from "shared/lib";

export function RequireAuth({ children }: { children: ReactNode }) {
  const auth = useAppSelector(getUserAuthData);
  const location = useLocation();

  if (!auth) {
    return <Navigate to={RoutesPath.main} state={{ from: location }} replace />;
  }

  return children;
}
