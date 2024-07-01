import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Button.module.css';

export enum ThemeButton {
  Clear = 'clear',
  Primary = 'primary',
  Outline = 'outline',
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  theme?: ThemeButton;
}

export const Button: FC<Props> = ({
  className,
  children,
  theme = ThemeButton.Primary,
  ...buttonProps
}) => (
  <button
    className={classNames(styles.button, {}, [className, styles[theme]])}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...buttonProps}
    type="button"
  >
    {children}
  </button>
);
