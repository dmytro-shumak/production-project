import { getUserAuthData } from "entities/User";
import { Suspense, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { routesConfig } from "shared/config/route-config/routeConfig";
import { useAppSelector } from "shared/lib";
import { Loader } from "shared/ui/Loader";

export const AppRouter = () => {
  const isAuth = useAppSelector(getUserAuthData);

  const routes = useMemo(() => {
    return Object.values(routesConfig).filter(
      (route) => !(route.authOnly && !isAuth),
    );
  }, [isAuth]);

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route
          path={path}
          key={path}
          element={
            <Suspense fallback={<Loader />}>
              <div className="page-wrapper">{element}</div>
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
};
