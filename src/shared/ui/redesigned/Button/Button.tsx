import { memo, type ButtonHTMLAttributes, type ReactNode } from "react";

import styles from "./Button.module.css";

import { classNames } from "@/shared/lib";

export type ButtonVariant = "clear" | "outline";
export type ButtonSize = "m" | "l" | "xl";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  square?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = memo<Props>(
  ({
    className,
    children,
    disabled,
    variant = "outline",
    square = false,
    size = "m",
    ...buttonProps
  }) => (
    <button
      className={classNames(
        styles.button,
        {
          [styles.square]: square,
          [styles.disabled]: disabled,
        },
        [className, styles[variant], styles[size]],
      )}
      disabled={disabled}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...buttonProps}
      type="button"
    >
      {children}
    </button>
  ),
);
