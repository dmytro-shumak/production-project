import type { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./Button.module.css";

export enum ThemeButton {
  Clear = "clear",
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  theme?: ThemeButton;
}

export const Button: FC<Props> = ({ className, children, theme, ...buttonProps }) => {
  return (
    <button className={classNames(styles.button, {}, [className, theme])} {...buttonProps}>
      {children}
    </button>
  );
};
