import { memo, type ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./Flex.module.css";

export type FlexJustify = "start" | "end" | "center" | "between";
export type FlexAlign = "start" | "end" | "center";
export type FlexDirection = "row" | "column";

const justifyClasses: Record<FlexJustify, string> = {
  start: styles.justifyStart,
  end: styles.justifyEnd,
  center: styles.justifyCenter,
  between: styles.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
  start: styles.alignStart,
  end: styles.alignEnd,
  center: styles.alignCenter,
};

const directionClasses: Record<FlexDirection, string> = {
  row: styles.directionRow,
  column: styles.directionColumn,
};

interface Props {
  className?: string;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction?: FlexDirection;
  gap?: string | number;
  children?: ReactNode;
}

export const Flex = memo(
  ({
    className,
    children,
    align = "center",
    direction = "row",
    justify = "center",
    gap = 8,
  }: Props) => {
    return (
      <div
        className={classNames(styles.flex, {}, [
          className,
          justifyClasses[justify],
          alignClasses[align],
          directionClasses[direction],
        ])}
        style={{ gap }}
      >
        {children}
      </div>
    );
  },
);
