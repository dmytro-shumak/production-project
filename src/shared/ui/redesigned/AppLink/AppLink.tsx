import { memo, type ReactNode } from "react";
import { NavLink, type LinkProps } from "react-router-dom";

import styles from "./AppLink.module.css";

import { classNames } from "@/shared/lib";

export type AppLinkVariant = "primary" | "red";

interface Props extends LinkProps {
  className?: string;
  children?: ReactNode;
  variant?: AppLinkVariant;
  activeClassName?: string;
}

export const AppLink = memo<Props>(
  ({
    className,
    children,
    to,
    variant = "primary",
    activeClassName = "",
    ...linkProps
  }) => (
    <NavLink
      className={({ isActive }) =>
        classNames("", { [activeClassName]: isActive }, [
          className,
          styles[variant],
        ])
      }
      to={to}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...linkProps}
    >
      {children}
    </NavLink>
  ),
);
