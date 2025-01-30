import { useContext } from "react";

import { Theme } from "../../../const";
import { ThemeContext } from "../../context/ThemeContext";

interface useThemeResult {
  theme: Theme;
  toggleTheme: (saveAction?: (theme: Theme) => void) => void;
}

export const useTheme = (): useThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = (saveAction?: (theme1: Theme) => void) => {
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
    saveAction?.(newTheme);
  };

  return { theme: theme || Theme.Light, toggleTheme };
};
