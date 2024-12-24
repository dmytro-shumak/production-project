import React, { useMemo, useState, type ReactNode } from "react";
import { Theme, LOCAL_STORAGE_THEME_KEY } from "@/shared/const";
import { ThemeContext } from "@/shared/lib/context/ThemeContext";

interface Props {
  children: ReactNode;
}

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.Light,
  );

  const defaultProps = useMemo(() => ({ setTheme, theme }), [theme]);

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};
