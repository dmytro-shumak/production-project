import { memo, type ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

import styles from "./AppLink.module.css";
import { AppLinkTheme } from "./types";

import { classNames } from "@/shared/lib";

interface Props extends LinkProps {
  className?: string;
  children?: ReactNode;
  theme?: AppLinkTheme;
}

export const AppLink = memo<Props>(
  ({ className, children, to, theme = AppLinkTheme.Primary, ...linkProps }) => (
    <Link
      className={classNames(styles.appLink, {}, [className, styles[theme]])}
      to={to}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...linkProps}
    >
      {children}
    </Link>
  ),
);
