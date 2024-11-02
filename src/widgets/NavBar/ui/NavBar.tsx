import { getUserAuthData, logout } from "entities/User";
import { LoginModal } from "features/authByUsername";
import { memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useAppSelector } from "shared/lib";
import { classNames } from "shared/lib/classNames/classNames";
import {
  AppLink,
  AppLinkTheme,
  Avatar,
  Button,
  ButtonTheme,
  Dropdown,
  Text,
  TextTheme,
  type DropdownItem,
} from "shared/ui";
import { RoutesPath } from "shared/config/routeConfig/routeConfig";
import styles from "./NavBar.module.css";

interface Props {
  className?: string;
}

export const NavBar = memo(({ className }: Props) => {
  const { t } = useTranslation();
  const authData = useAppSelector(getUserAuthData);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const items = useMemo<DropdownItem[]>(() => {
    return [
      {
        content: t("Profile"),
        href: `${RoutesPath.profile}/${authData?.id}`,
      },
      { content: t("Logout"), onClick: onLogout },
    ];
  }, [authData?.id, onLogout, t]);

  if (authData) {
    return (
      <nav className={classNames(styles.navBar, {}, [className])}>
        <Text
          className={styles.appName}
          title={t("My app")}
          theme={TextTheme.INVERTED}
        />
        <AppLink to={RoutesPath.article_create} theme={AppLinkTheme.Secondary}>
          {t("CreateArticle")}
        </AppLink>
        <Dropdown
          anchor="bottom end"
          className={styles.dropdown}
          button={<Avatar size={30} src={authData.avatar} />}
          items={items}
        />
        <LoginModal isOpen={isModalOpen} onClose={closeModal} />
      </nav>
    );
  }

  return (
    <nav className={classNames(styles.navBar, {}, [className])}>
      <ul className={styles.links}>
        <Button theme={ButtonTheme.Outline} onClick={openModal}>
          {t("Login")}
        </Button>
      </ul>
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </nav>
  );
});
