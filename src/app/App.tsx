import { useTheme } from "app/providers/theme";
import { AppRouter } from "app/router";
import { Suspense } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Loader } from "shared/ui/Loader";
import { NavBar } from "widgets/NavBar";
import { Sidebar } from "widgets/Sidebar";
import "./styles/index.css";

const App = () => {
  const { theme } = useTheme();

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
