import type { FC, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./AppLink.module.css";
import { AppLinkTheme } from "./types";

interface Props extends LinkProps {
  className?: string;
  children?: ReactNode;
  theme?: AppLinkTheme;
}

export const AppLink: FC<Props> = ({
  className,
  children,
  to,
  theme = AppLinkTheme.Primary,
  ...linkProps
}) => {
  return (
    <Link
      className={classNames(styles.appLink, {}, [className, styles[theme]])}
      to={to}
      {...linkProps}
    >
      {children}
    </Link>
  );
};
