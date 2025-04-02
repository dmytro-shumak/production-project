import { useCallback, type ReactNode } from "react";

import { Card } from "../Card/Card";
import { Flex, type FlexDirection } from "../Stack";

import styles from "./Tabs.module.css";

import { classNames } from "@/shared/lib";
import { typedMemo } from "@/shared/types";

export interface TabItem<T extends string = string> {
  value: T;
  content: ReactNode;
}

interface Props<T extends string> {
  className?: string;
  tabs: TabItem<T>[];
  value: T;
  onTabChange: (tab: TabItem<T>) => void;
  direction?: FlexDirection;
}

const Tabs = <T extends string = string>({
  className,
  onTabChange,
  tabs,
  value,
  direction = "row",
}: Props<T>) => {
  const handleTabClick = useCallback(
    (tab: TabItem<T>) => {
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
};

export const MemoTabs = typedMemo(Tabs);
