import { type HTMLAttributes, type ReactNode } from "react";

import styles from "./Card.module.css";

import { classNames } from "@/shared/lib";

export type CardVariant = "normal" | "outlined" | "light";
export type CardPadding = "0" | "8" | "16" | "24";

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
}

export const Card = ({
  className,
  children,
  variant = "normal",
  padding = "8",
  ...otherProps
}: Props) => {
  return (
    <div
      className={classNames(styles.card, {}, [
        className,
        styles[variant],
        styles[`padding_${padding}`],
      ])}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
    >
      {children}
    </div>
  );
};
