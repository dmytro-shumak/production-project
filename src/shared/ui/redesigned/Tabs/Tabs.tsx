import { memo, useCallback, type ReactNode } from "react";

import { Card } from "../Card/Card";
import { Flex, type FlexDirection } from "../Stack";

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
  direction?: FlexDirection;
}

export const Tabs = memo(
  ({ className, onTabChange, tabs, value, direction = "row" }: Props) => {
    const handleTabClick = useCallback(
      (tab: TabItem) => {
        return () => {
          onTabChange(tab);
        };
      },
      [onTabChange],
    );

    return (
      <Flex
        direction={direction}
        gap={8}
        className={classNames(styles.tabs, {}, [className])}
        align="start"
      >
        {tabs.map((tab) => {
          const isSelected = tab.value === value;

          return (
            <Card
              className={classNames(styles.tab, {
                [styles.selected]: isSelected,
              })}
              key={tab.value}
              variant={isSelected ? "light" : "normal"}
              onClick={handleTabClick(tab)}
              borderRadius={34}
            >
              {tab.content}
            </Card>
          );
        })}
      </Flex>
    );
  },
);
