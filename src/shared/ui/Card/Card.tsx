import { type HTMLAttributes, type ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./Card.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

export const Card = ({ className, children, ...otherProps }: Props) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={classNames(styles.card, {}, [className])} {...otherProps}>
      {children}
    </div>
  );
};
