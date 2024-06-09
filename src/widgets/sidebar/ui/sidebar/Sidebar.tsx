import { useState, type FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { LangSwitcher } from "widgets/lang-switcher";
import { ThemeSwitcher } from "widgets/theme-switcher";
import styles from "./Sidebar.module.css";

interface Props {
  className?: string;
}

export const Sidebar: FC<Props> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className={classNames(styles.sidebar, { [styles.collapsed]: collapsed }, [className])}>
      <button onClick={handleToggle}>{collapsed ? "Expand" : "Collapse"}</button>
      <div className={styles.switchers}>
        <ThemeSwitcher />
        <LangSwitcher />
      </div>
    </div>
  );
};
