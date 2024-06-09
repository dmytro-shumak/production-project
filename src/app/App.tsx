import { useTheme } from "app/providers/theme";
import { AppRouter } from "app/router";
import { classNames } from "shared/lib/classNames/classNames";
import { NavBar } from "widgets/nav-bar";
import { Sidebar } from "widgets/sidebar";
import "./styles/index.css";

const App = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames("app", {}, [theme])}>
      <NavBar />
      <div className="content-page">
        <Sidebar />
        <AppRouter />
      </div>
    </div>
  );
};

export default App;
