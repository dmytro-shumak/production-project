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
}) => (
  <Link
    className={classNames("", {}, [className, styles[theme]])}
    to={to}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...linkProps}
  >
    {children}
  </Link>
);
