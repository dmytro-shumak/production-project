import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { useJsonSettings } from "@/entities/User";
import { Theme } from "@/shared/const";
import { LocalStorageKeys } from "@/shared/constants";
import { ThemeContext } from "@/shared/lib/context/ThemeContext";

interface Props {
  children: ReactNode;
  initialTheme?: Theme;
}

const fallbackTheme = localStorage.getItem(LocalStorageKeys.THEME) as Theme;

export const ThemeProvider: React.FC<Props> = ({ children, initialTheme }) => {
  const { theme: defaultTheme } = useJsonSettings();
  const [theme, setTheme] = useState<Theme>(
    initialTheme || fallbackTheme || Theme.Light,
  );
  const isThemeInitialized = useRef(false);

  useEffect(() => {
    if (isThemeInitialized.current || !defaultTheme) {
      return;
    }

    setTheme(defaultTheme);
    isThemeInitialized.current = true;
  }, [defaultTheme]);

  const defaultProps = useMemo(() => ({ setTheme, theme }), [theme]);

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};
