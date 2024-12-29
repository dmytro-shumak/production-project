import { memo, useCallback, type ReactNode } from "react";

import { Card, CardTheme } from "../Card/Card";

import styles from "./Tabs.module.css";

import { classNames } from "@/shared/lib";

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface Props {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabChange: (tab: TabItem) => void;
}

export const Tabs = memo(({ className, onTabChange, tabs, value }: Props) => {
  const handleTabClick = useCallback(
    (tab: TabItem) => {
      return () => {
        onTabChange(tab);
      };
    },
    [onTabChange],
  );

  return (
    <div className={classNames(styles.tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          className={styles.tab}
          key={tab.value}
          theme={tab.value === value ? CardTheme.Normal : CardTheme.Outlined}
          onClick={handleTabClick(tab)}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
});
