import { Suspense, memo, useEffect, useLayoutEffect } from "react";

import { withTheme } from "./providers/theme/ui/withTheme";
import { AppRouter } from "./router";

import { getUserInitiated, initAuthData } from "@/entities/User";
import { LocalStorageKeys } from "@/shared/constants";
import { AppLoaderLayout } from "@/shared/layouts/AppLoaderLayout";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { classNames, useAppDispatch, useAppSelector } from "@/shared/lib";
import { ToggleFeatures } from "@/shared/lib/features";
import { useTheme } from "@/shared/lib/hooks";
import { Loader } from "@/shared/ui/deprecated/Loader";
import { NavBar } from "@/widgets/NavBar";
import { ScrollToolbar } from "@/widgets/ScrollToolbar";
import { Sidebar } from "@/widgets/Sidebar";

const App = memo(() => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const initiated = useAppSelector(getUserInitiated);

  useLayoutEffect(() => {
    document.body.className = `${theme} app-redesigned`;
    localStorage.setItem(LocalStorageKeys.THEME, theme);
  }, [theme]);

  useEffect(() => {
    if (!initiated) {
      dispatch(initAuthData());
    }
  }, [dispatch, initiated]);

  if (!initiated) {
    return <AppLoaderLayout />;

    // return (
    //   <ToggleFeatures
    //     featureName="isAppRedesigned"
    //     on={<AppLoaderLayout />}
    //     off={<Loader />}
    //   />
    // );
  }

  return (
    <ToggleFeatures
      featureName="isAppRedesigned"
      on={
        <div className={classNames("", {}, [theme])}>
          <Suspense fallback={<Loader />}>
            <MainLayout
              content={<AppRouter />}
              sidebar={<Sidebar />}
              header={<NavBar />}
              toolbar={<ScrollToolbar />}
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
});

export default withTheme(App);
