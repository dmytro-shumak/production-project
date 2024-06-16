import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routesConfig } from 'shared/config/route-config/routeConfig';
import { Loader } from 'shared/ui/Loader';

export const AppRouter = () => (
  <Routes>
    {Object.values(routesConfig).map(({ path, element }) => (
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
