import { useContext } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme } from "../../../const";
import { ThemeContext } from "../../context/ThemeContext";

interface useThemeResult {
  theme: Theme;
  toggleTheme: () => void;
}

export const useTheme = (): useThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    let newTheme: Theme;
    switch (theme) {
      case Theme.Dark:
        newTheme = Theme.Light;
        break;
      case Theme.Light:
        newTheme = Theme.Orange;
        break;
      case Theme.Orange:
        newTheme = Theme.Dark;
        break;
      default:
        newTheme = Theme.Light;
        break;
    }
    setTheme?.(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return { theme: theme || Theme.Light, toggleTheme };
};
