import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "shared/ui";
import styles from "./NavBar.module.css";

interface Props {
  className?: string;
}

export const NavBar: FC<Props> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <nav className={classNames(styles.navBar, {}, [className])}>
      <ul className={styles.links}>
        <li>
          <AppLink to="/" theme={AppLinkTheme.Secondary}>
            {t("MainPage")}
          </AppLink>
        </li>
        <li>
          <AppLink to="/about">{t("AboutPage")}</AppLink>
        </li>
      </ul>
    </nav>
  );
};
