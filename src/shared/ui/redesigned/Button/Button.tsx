import { memo, type ButtonHTMLAttributes, type ReactNode } from "react";

import styles from "./Button.module.css";

import { classNames } from "@/shared/lib";

export enum ButtonTheme {
  Clear = "clear",
  Primary = "primary",
  Outline = "outline",
  OutlineRed = "outlineRed",
}

export enum ButtonSize {
  L = "sizeL",
  M = "sizeM",
  S = "sizeS",
  XL = "sizeXL",
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  square?: boolean;
  theme?: ButtonTheme;
  size?: ButtonSize;
}

/**
 * deprecated, use components from redesign folder
 * @deprecated
 */
export const Button = memo<Props>(
  ({
    className,
    children,
    disabled,
    theme = ButtonTheme.Primary,
    square = false,
    size = ButtonSize.M,
    ...buttonProps
  }) => (
    <button
      className={classNames(
        styles.button,
        {
          [styles.square]: square,
          [styles.disabled]: disabled,
        },
        [className, styles[theme], styles[size]],
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
