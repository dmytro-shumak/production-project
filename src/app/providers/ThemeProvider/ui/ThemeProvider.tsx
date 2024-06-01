import {
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  ThemeContext,
} from "app/providers/ThemeProvider/lib/ThemeContext";
import React, { useMemo, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.Light
  );

  const defaultProps = useMemo(() => ({ setTheme, theme }), [theme]);

  return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
