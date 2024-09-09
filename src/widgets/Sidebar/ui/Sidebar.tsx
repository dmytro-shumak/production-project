import { memo, useState, type FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonSize } from "shared/ui";
import { LangSwitcher } from "widgets/LangSwitcher";
import { SidebarItemsList } from "widgets/Sidebar/model/item";
import { SidebarItem } from "widgets/Sidebar/ui/SidebarItem/SidebarItem";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import { Theme, useTheme } from "app/providers/theme";
import styles from "./Sidebar.module.css";

interface Props {
  className?: string;
}

export const Sidebar: FC<Props> = memo(({ className }) => {
  const [collapsed, setCollapsed] = useState(true);
  const { theme } = useTheme();

  const handleToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
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
      <ul className={styles.links}>
        {SidebarItemsList.map((sidebarItem) => (
          <SidebarItem
            item={sidebarItem}
            key={sidebarItem.path}
            collapsed={collapsed}
          />
        ))}
      </ul>
      <div className={styles.switchers}>
        <ThemeSwitcher />
        <LangSwitcher collapsed={collapsed} />
      </div>
    </div>
  );
});
