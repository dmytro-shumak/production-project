import { useTheme } from "app/providers/theme";
import { Theme } from "app/providers/theme/lib/ThemeContext";
import type { FC } from "react";
import DarkIcon from "shared/assets/icons/theme-dark.svg";
import LightIcon from "shared/assets/icons/theme-light.svg";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./ThemeSwitcher.module.css";

interface Props {
  className?: string;
}

export const ThemeSwitcher: FC<Props> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={classNames(styles.themeSwitcher, {}, [className])} onClick={toggleTheme}>
      {theme === Theme.Light ? <LightIcon /> : <DarkIcon />}
    </button>
  );
};
