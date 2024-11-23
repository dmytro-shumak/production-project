import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  logout,
} from "entities/User";
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
  HStack,
  Icon,
  Popover,
  Text,
  TextTheme,
  type DropdownItem,
} from "shared/ui";
import { RoutesPath } from "shared/config/routeConfig/routeConfig";
import NotificationIcon from "shared/assets/icons/notification.svg";
import { NotificationList } from "entities/Notifications";
import styles from "./NavBar.module.css";

interface Props {
  className?: string;
}

export const NavBar = memo(({ className }: Props) => {
  const { t } = useTranslation();
  const authData = useAppSelector(getUserAuthData);
  const dispatch = useDispatch();
  const isAdmin = useAppSelector(isUserAdmin);
  const isManager = useAppSelector(isUserManager);

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

  const isAdminPanelAvailable = isAdmin || isManager;

  const items = useMemo<DropdownItem[]>(() => {
    return [
      ...(isAdminPanelAvailable
        ? [
            {
              content: t("AdminPanel"),
              href: RoutesPath.admin_panel,
            },
          ]
        : []),
      {
        content: t("Profile"),
        href: `${RoutesPath.profile}/${authData?.id}`,
      },
      { content: t("Logout"), onClick: onLogout },
    ];
  }, [authData?.id, isAdminPanelAvailable, onLogout, t]);

  if (authData) {
    return (
      <nav className={classNames(styles.navBar, {}, [className])}>
        <Text
          className={styles.appName}
          title={t("MyApp")}
          theme={TextTheme.INVERTED}
        />
        <AppLink to={RoutesPath.article_create} theme={AppLinkTheme.Secondary}>
          {t("CreateArticle")}
        </AppLink>
        <HStack gap={16} className={styles.actions}>
          <Popover
            anchor="bottom end"
            button={
              <Button theme={ButtonTheme.Clear}>
                <Icon Svg={NotificationIcon} inverted />
              </Button>
            }
          >
            <NotificationList className={styles.notifications} />
          </Popover>
          <Dropdown
            anchor="bottom end"
            button={<Avatar size={30} src={authData.avatar} />}
            items={items}
          />
        </HStack>
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
