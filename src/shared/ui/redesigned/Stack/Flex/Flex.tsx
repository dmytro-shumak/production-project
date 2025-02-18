import { type ComponentProps, type ElementType, type ReactNode } from "react";

import styles from "./Flex.module.css";

import { classNames } from "@/shared/lib";

export type FlexJustify = "start" | "end" | "center" | "between" | "stretch";
export type FlexAlign = "start" | "end" | "center" | "stretch";
export type FlexWrap = "nowrap" | "wrap";
export type FlexDirection = "row" | "column";

export interface FlexOwnProps {
  justify?: FlexJustify;
  align?: FlexAlign;
  direction?: FlexDirection;
  wrap?: FlexWrap;
  gap?: string | number;
  children?: ReactNode;
  className?: string;
}

export type FlexProps<T extends ElementType = "div"> = FlexOwnProps &
  Omit<ComponentProps<T>, keyof FlexOwnProps> & {
    tag?: T;
  };

const justifyClasses: Record<FlexJustify, string> = {
  start: styles.justifyStart,
  end: styles.justifyEnd,
  center: styles.justifyCenter,
  between: styles.justifyBetween,
  stretch: styles.justifyStretch,
};

const alignClasses: Record<FlexAlign, string> = {
  start: styles.alignStart,
  end: styles.alignEnd,
  center: styles.alignCenter,
  stretch: styles.alignStretch,
};

const directionClasses: Record<FlexDirection, string> = {
  row: styles.directionRow,
  column: styles.directionColumn,
};

export const Flex = <T extends ElementType = "div">({
  tag,
  className,
  children,
  align = "center",
  direction = "row",
  justify = "center",
  wrap = "nowrap",
  gap = 8,
  ...restProps
}: FlexProps<T>) => {
  const Component = tag || "div";

  return (
    <Component
      className={classNames(styles.flex, {}, [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        styles[wrap],
      ])}
      style={{ gap }}
      {...restProps} // Spreading the rest of the props here
    >
      {children}
    </Component>
  );
};
