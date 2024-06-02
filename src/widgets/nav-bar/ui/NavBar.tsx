import type { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "shared/ui";
import styles from "./NavBar.module.css";

interface Props {
  className?: string;
}

export const NavBar: FC<Props> = ({ className }) => {
  return (
    <nav className={classNames(styles.navBar, {}, [className])}>
      <ul className={styles.links}>
        <li>
          <AppLink to="/" theme={AppLinkTheme.Secondary}>
            Main Page
          </AppLink>
        </li>
        <li>
          <AppLink to="/about">About Page</AppLink>
        </li>
      </ul>
    </nav>
  );
};
