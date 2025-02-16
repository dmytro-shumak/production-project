import { memo, useCallback } from "react";

import { saveJsonSettings } from "@/entities/User";
import ThemeIcon from "@/shared/assets/icons/theme.svg?react";
import { useAppDispatch, useTheme } from "@/shared/lib/hooks";
import { Icon } from "@/shared/ui/redesigned/Icon";

export const ThemeSwitcher = memo(() => {
  const { toggleTheme } = useTheme();
  const dispatch = useAppDispatch();

  const onToggleHandler = useCallback(() => {
    toggleTheme((theme) => {
      dispatch(saveJsonSettings({ theme }));
    });
  }, [dispatch, toggleTheme]);

  return <Icon Svg={ThemeIcon} clickable onClick={onToggleHandler} />;
});
