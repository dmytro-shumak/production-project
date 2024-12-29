import { memo } from "react";

import DarkIcon from "@/shared/assets/icons/theme-dark.svg?react";
import LightIcon from "@/shared/assets/icons/theme-light.svg?react";
import { Theme } from "@/shared/const";
import { classNames } from "@/shared/lib";
import { useTheme } from "@/shared/lib/hooks";
import { Button, ButtonTheme } from "@/shared/ui";

interface Props {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: Props) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      className={classNames("", {}, [className])}
      onClick={toggleTheme}
      theme={ButtonTheme.Clear}
    >
      {theme === Theme.Light ? <LightIcon /> : <DarkIcon />}
    </Button>
  );
});