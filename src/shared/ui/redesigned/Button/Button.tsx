import { memo, type ButtonHTMLAttributes, type ReactNode } from "react";

import styles from "./Button.module.css";

import { classNames } from "@/shared/lib";

export type ButtonVariant = "clear" | "outline" | "filled";
export type ButtonColor = "normal" | "success" | "cancel";
export type ButtonSize = "m" | "l" | "xl";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  square?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  buttonPrefix?: ReactNode;
  buttonSuffix?: ReactNode;
}

export const Button = memo<Props>(
  ({
    className,
    children,
    disabled,
    buttonPrefix,
    buttonSuffix,
    color = "normal",
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
          [styles.hasPrefixOrSuffix]: !!buttonPrefix || !!buttonSuffix,
        },
        [className, styles[variant], styles[size], styles[color]],
      )}
      disabled={disabled}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...buttonProps}
      type="button"
    >
      {buttonPrefix && (
        <span className={styles.buttonPrefix}>{buttonPrefix}</span>
      )}
      {children}
      {buttonSuffix && (
        <span className={styles.buttonSuffix}>{buttonSuffix}</span>
      )}
    </button>
  ),
);
