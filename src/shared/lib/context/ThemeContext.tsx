import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Theme } from "../../const";

export interface ThemeContextProps {
  theme?: Theme;
  setTheme?: Dispatch<SetStateAction<Theme>>;
}

export const ThemeContext = createContext<ThemeContextProps>({});
