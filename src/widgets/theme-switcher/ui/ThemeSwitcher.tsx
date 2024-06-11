import { Theme, useTheme } from 'app/providers/theme';
import type { FC } from 'react';
import DarkIcon from 'shared/assets/icons/theme-dark.svg';
import LightIcon from 'shared/assets/icons/theme-light.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui';
import styles from './ThemeSwitcher.module.css';

interface Props {
  className?: string;
}

export const ThemeSwitcher: FC<Props> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      className={classNames(styles.themeSwitcher, {}, [className])}
      onClick={toggleTheme}
      theme={ThemeButton.Clear}
    >
      {theme === Theme.Light ? <LightIcon /> : <DarkIcon />}
    </Button>
  );
};
