import { useTheme } from "app/providers/theme";
import { AppRouter } from "app/router";
import { classNames } from "shared/lib/classNames/classNames";
import { NavBar } from "widgets/nav-bar";
import { ThemeSwitcher } from "widgets/theme-switcher";
import "./styles/index.css";

const App = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames("app", {}, [theme])}>
      <NavBar />
      <ThemeSwitcher />
      <AppRouter />
    </div>
  );
};

export default App;
