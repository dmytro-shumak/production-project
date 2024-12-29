import { Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";

import { routesConfig } from "./config/routeConfig";
import { RequireAuth } from "./RequireAuth";

import type { AppRoutesProps } from "@/shared/types";
import { Loader } from "@/shared/ui/Loader";

export const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = <Suspense fallback={<Loader />}>{route.element}</Suspense>;

    return (
      <Route
        path={route.path}
        key={route.path}
        element={
          route.authOnly ? (
            <RequireAuth roles={route.roles}>{element}</RequireAuth>
          ) : (
            element
          )
        }
      />
    );
  }, []);

  return <Routes>{Object.values(routesConfig).map(renderWithWrapper)}</Routes>;
};
