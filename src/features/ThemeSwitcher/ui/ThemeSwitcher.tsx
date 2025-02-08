import { memo, useCallback } from "react";

import { saveJsonSettings } from "@/entities/User";
import DarkIcon from "@/shared/assets/icons/theme-dark.svg?react";
import LightIcon from "@/shared/assets/icons/theme-light.svg?react";
import ThemeIcon from "@/shared/assets/icons/theme.svg?react";
import { Theme } from "@/shared/const";
import { classNames } from "@/shared/lib";
import { ToggleFeatures } from "@/shared/lib/features";
import { useAppDispatch, useTheme } from "@/shared/lib/hooks";
import { Button, ButtonTheme } from "@/shared/ui";
import { Icon } from "@/shared/ui/redesigned/Icon";

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
    <ToggleFeatures
      featureName="isAppRedesigned"
      on={<Icon Svg={ThemeIcon} clickable onClick={onToggleHandler} />}
      off={
        <Button
          className={classNames("", {}, [className])}
          onClick={onToggleHandler}
          theme={ButtonTheme.Clear}
        >
          {theme === Theme.Light ? <LightIcon /> : <DarkIcon />}
        </Button>
      }
    />
  );
});
