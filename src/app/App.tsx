import { useTheme } from "app/providers/theme";
import { AppRouter } from "app/router";
import { classNames } from "shared/lib/classNames/classNames";
import { NavBar } from "widgets/nav-bar";
import "./styles/index.css";

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames("app", {}, [theme])}>
      {/* <Link to="/">Main Page</Link>
      <Link to="/about">About Page</Link> */}
      <NavBar />
      <button onClick={toggleTheme}>Toggle Theme</button>
      <AppRouter />
    </div>
  );
};

export default App;
