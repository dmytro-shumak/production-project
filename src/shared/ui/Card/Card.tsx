import { type HTMLAttributes, type ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./Card.module.css";

export enum CardTheme {
  Normal = "normal",
  Outlined = "outlined",
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
  theme?: CardTheme;
}

export const Card = ({
  className,
  children,
  theme = CardTheme.Normal,
  ...otherProps
}: Props) => {
  return (
    <div
      className={classNames(styles.card, {}, [className, styles[theme]])}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
    >
      {children}
    </div>
  );
};
