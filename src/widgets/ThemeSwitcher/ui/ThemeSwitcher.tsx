import { memo } from "react";
import { Theme, useTheme } from "@/app/providers/theme";
import DarkIcon from "@/shared/assets/icons/theme-dark.svg";
import LightIcon from "@/shared/assets/icons/theme-light.svg";
import { classNames } from "@/shared/lib";
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
