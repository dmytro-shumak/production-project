import { memo, useCallback } from "react";

import { saveJsonSettings } from "@/entities/User";
import DarkIcon from "@/shared/assets/icons/theme-dark.svg?react";
import LightIcon from "@/shared/assets/icons/theme-light.svg?react";
import { Theme } from "@/shared/const";
import { classNames } from "@/shared/lib";
import { useAppDispatch, useTheme } from "@/shared/lib/hooks";
import { Button, ButtonTheme } from "@/shared/ui";

interface Props {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: Props) => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();

  const onToggleHandler = useCallback(() => {
    toggleTheme((theme) => {
      dispatch(saveJsonSettings({ theme }));
    });
  }, [dispatch, toggleTheme]);

  return (
    <Button
      className={classNames("", {}, [className])}
      onClick={onToggleHandler}
      theme={ButtonTheme.Clear}
    >
      {theme === Theme.Light ? <LightIcon /> : <DarkIcon />}
    </Button>
  );
});
