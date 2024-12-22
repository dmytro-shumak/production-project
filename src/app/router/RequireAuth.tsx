import { useMemo, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserRole, getUserAuthData, getUserRoles } from "@/entities/User";
import { useAppSelector } from "@/shared/lib";
import { RoutesPath } from "@/shared/const/router";

interface Props {
  children: ReactNode;
  roles?: UserRole[];
}

export function RequireAuth({ children, roles }: Props) {
  const auth = useAppSelector(getUserAuthData);
  const location = useLocation();
  const userRoles = useAppSelector(getUserRoles);

  const hasRequiredRoles = useMemo(() => {
    if (!roles) {
      return true;
    }

    return roles.some((role) => userRoles?.includes(role));
  }, [roles, userRoles]);

  if (!hasRequiredRoles) {
    return (
      <Navigate to={RoutesPath.forbidden} state={{ from: location }} replace />
    );
  }

  if (!auth) {
    return <Navigate to={RoutesPath.main} state={{ from: location }} replace />;
  }

  return children;
}
