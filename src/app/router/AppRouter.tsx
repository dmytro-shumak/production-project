import { RequireAuth } from "app/router/RequireAuth";
import { Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import {
  routesConfig,
  type AppRoutesProps,
} from "shared/config/route-config/routeConfig";
import { Loader } from "shared/ui/Loader";

export const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<Loader />}>
        <div className="page-wrapper">{route.element}</div>
      </Suspense>
    );

    return (
      <Route
        path={route.path}
        key={route.path}
        element={
          route.authOnly ? <RequireAuth>{element}</RequireAuth> : element
        }
      />
    );
  }, []);

  return <Routes>{Object.values(routesConfig).map(renderWithWrapper)}</Routes>;
};
