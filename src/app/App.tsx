import { useTheme } from "app/providers/theme";
import { AppRouter } from "app/router";
import { Link } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import "./styles/index.css";

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames("app", {}, [theme])}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <Link to="/">Main Page</Link>
      <Link to="/about">About Page</Link>
      <AppRouter />
    </div>
  );
};

export default App;
