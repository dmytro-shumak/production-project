import { memo, useState, type FC } from "react";
import { useTheme } from "@/shared/lib/hooks";
import { useAppSelector, classNames } from "@/shared/lib";
import { Button, ButtonSize, VStack } from "@/shared/ui";
import { LangSwitcher } from "@/features/LangSwitcher";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { SidebarItem } from "./SidebarItem/SidebarItem";
import { getSideBarItems } from "../model/selectors/getSidebarItems";
import styles from "./Sidebar.module.css";
import { Theme } from "@/shared/const";

interface Props {
  className?: string;
}

export const Sidebar: FC<Props> = memo(({ className }) => {
  const [collapsed, setCollapsed] = useState(true);
  const { theme } = useTheme();
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
  );
});
