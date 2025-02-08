import { memo, useState, type FC } from "react";

import { getSideBarItems } from "../model/selectors/getSidebarItems";

import styles from "./Sidebar.module.css";
import { SidebarItem } from "./SidebarItem/SidebarItem";

import { LangSwitcher } from "@/features/LangSwitcher";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import ArrowIcon from "@/shared/assets/icons/arrow-bottom.svg?react";
import { Theme } from "@/shared/const";
import { useAppSelector, classNames } from "@/shared/lib";
import { ToggleFeatures } from "@/shared/lib/features";
import { useTheme } from "@/shared/lib/hooks";
import { Button, ButtonSize, VStack } from "@/shared/ui";
import { AppLogo } from "@/shared/ui/redesigned/AppLogo";
import { Icon } from "@/shared/ui/redesigned/Icon";

interface Props {
  className?: string;
}

export const Sidebar: FC<Props> = memo(({ className }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useTheme();
  const sidebarItemsList = useAppSelector(getSideBarItems);

  const handleToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <ToggleFeatures
      featureName="isAppRedesigned"
      on={
        <aside
          className={classNames(
            styles.sidebarRedesigned,
            { [styles.collapsed]: collapsed },
            [className],
          )}
        >
          <AppLogo className={styles.appLogo} size={collapsed ? 30 : 50} />
          <VStack className={styles.links} tag="ul">
            {sidebarItemsList.map((sidebarItem) => (
              <SidebarItem
                item={sidebarItem}
                key={sidebarItem.path}
                collapsed={collapsed}
              />
            ))}
          </VStack>
          <Icon
            onClick={handleToggle}
            className={styles.button}
            clickable
            Svg={ArrowIcon}
          />
        </aside>
      }
      off={
        <aside
          className={classNames(
            styles.sidebar,
            { [styles.collapsed]: collapsed },
            [className],
          )}
        >
          <Button
            onClick={handleToggle}
            square
            size={ButtonSize.L}
            className={styles.button}
            style={{ color: theme === Theme.Orange ? "#e58e13" : "#fff" }}
          >
            {collapsed ? ">" : "<"}
          </Button>
          <VStack className={styles.links} tag="ul" align="center">
            {sidebarItemsList.map((sidebarItem) => (
              <SidebarItem
                item={sidebarItem}
                key={sidebarItem.path}
                collapsed={collapsed}
              />
            ))}
          </VStack>
          <div className={styles.switchers}>
            <ThemeSwitcher />
            <LangSwitcher collapsed={collapsed} />
          </div>
        </aside>
      }
    />
  );
});
