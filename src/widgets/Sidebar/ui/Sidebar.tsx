import { memo, useState, type FC } from "react";

import { getSideBarItems } from "../model/selectors/getSidebarItems";

import styles from "./Sidebar.module.css";
import { SidebarItem } from "./SidebarItem/SidebarItem";

import { LangSwitcher } from "@/features/LangSwitcher";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import ArrowIcon from "@/shared/assets/icons/arrow-bottom.svg?react";
import { classNames, useAppSelector } from "@/shared/lib";
import { AppLogo } from "@/shared/ui/redesigned/AppLogo";
import { Icon } from "@/shared/ui/redesigned/Icon";
import { VStack } from "@/shared/ui/redesigned/Stack";

interface Props {
  className?: string;
}

export const Sidebar: FC<Props> = memo(({ className }) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarItemsList = useAppSelector(getSideBarItems);

  const handleToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <aside
      className={classNames(styles.sidebar, { [styles.collapsed]: collapsed }, [
        className,
      ])}
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
        buttonProps={{ "data-testid": "Sidebar.CollapsedButton" }}
      />
      <div className={styles.switchers}>
        <ThemeSwitcher />
        <LangSwitcher />
      </div>
    </aside>
  );
});
