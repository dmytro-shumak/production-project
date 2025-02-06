import { Suspense, useEffect } from "react";

import { AppRouter } from "./router";

import { getUserInitiated, initAuthData } from "@/entities/User";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { classNames, useAppDispatch, useAppSelector } from "@/shared/lib";
import { ToggleFeatures } from "@/shared/lib/features";
import { useTheme } from "@/shared/lib/hooks";
import { Loader } from "@/shared/ui/deprecated/Loader";
import { NavBar } from "@/widgets/NavBar";
import { Sidebar } from "@/widgets/Sidebar";

const App = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const initiated = useAppSelector(getUserInitiated);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  if (!initiated) {
    return <Loader />;
  }

  return (
    <ToggleFeatures
      featureName="isAppRedesigned"
      on={
        <div className={classNames("app-redesigned", {}, [theme])}>
          <Suspense fallback={<Loader />}>
            <MainLayout
              content={<AppRouter />}
              sidebar={<Sidebar />}
              header={<NavBar />}
            />
          </Suspense>
        </div>
      }
      off={
        <div className={classNames("app", {}, [theme])}>
          <Suspense fallback={<Loader />}>
            <NavBar />
            <div className="content-page">
              <Sidebar />
              <AppRouter />
            </div>
          </Suspense>
        </div>
      }
    />
  );
};

export default App;
