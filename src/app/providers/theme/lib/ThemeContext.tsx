import { createContext, type Dispatch, type SetStateAction } from "react";

export enum Theme {
  Light = "app-light-theme",
  Dark = "app-dark-theme",
  Orange = "app-orange-theme",
}

export interface ThemeContextProps {
  theme?: Theme;
  setTheme?: Dispatch<SetStateAction<Theme>>;
}

export const ThemeContext = createContext<ThemeContextProps>({});

export const LOCAL_STORAGE_THEME_KEY = "theme";
