import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Button.module.css';

export enum ButtonTheme {
  Clear = 'clear',
  Primary = 'primary',
  Outline = 'outline',
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

export const Button: FC<Props> = ({
  className,
  children,
  theme = ButtonTheme.Primary,
  square = false,
  size = ButtonSize.M,
  ...buttonProps
}) => (
  <button
    className={classNames(styles.button, {
      [styles.square]: square,
    }, [className, styles[theme], styles[size]])}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...buttonProps}
    type="button"
  >
    {children}
  </button>
);
