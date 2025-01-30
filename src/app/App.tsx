import { Suspense, useEffect } from "react";

import { AppRouter } from "./router";

import { getUserInitiated, initAuthData } from "@/entities/User";
import { classNames, useAppDispatch, useAppSelector } from "@/shared/lib";
import { useTheme } from "@/shared/lib/hooks";
import { Loader } from "@/shared/ui/Loader";
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

  return (
    <div className={classNames("app", {}, [theme])}>
      <Suspense fallback={<Loader />}>
        <NavBar />
        <div className="content-page">
          <Sidebar />
          {initiated && <AppRouter />}
        </div>
      </Suspense>
    </div>
  );
};

export default App;
