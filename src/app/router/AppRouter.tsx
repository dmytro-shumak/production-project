import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routesConfig } from 'shared/config/route-config/routeConfig';

export const AppRouter = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {Object.values(routesConfig).map(({ path, element }) => (
        <Route path={path} key={path} element={<div className="page-wrapper">{element}</div>} />
      ))}
    </Routes>
  </Suspense>
);
