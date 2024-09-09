import { useTheme } from "app/providers/theme";
import { AppRouter } from "app/router";
import { initAuthData } from "entities/User";
import { Suspense, useEffect } from "react";
import { useAppDispatch } from "shared/lib";
import { classNames } from "shared/lib/classNames/classNames";
import { Loader } from "shared/ui/Loader";
import { NavBar } from "widgets/NavBar";
import { Sidebar } from "widgets/Sidebar";

const App = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("theme", theme);
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
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
