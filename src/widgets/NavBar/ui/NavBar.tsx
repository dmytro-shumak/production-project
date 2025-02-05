import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./NavBar.module.css";

import { getUserAuthData } from "@/entities/User";
import { LoginModal } from "@/features/authByUsername";
import { AvatarDropdown } from "@/features/avatarDropdown";
import { NotificationButton } from "@/features/notificationButton";
import { getRouteArticleCreate } from "@/shared/const/router";
import { classNames, useAppSelector } from "@/shared/lib";
import { ToggleFeatures } from "@/shared/lib/features";
import {
  AppLink,
  AppLinkTheme,
  Button,
  ButtonTheme,
  HStack,
  Text,
  TextTheme,
} from "@/shared/ui";

interface Props {
  className?: string;
}

export const NavBar = memo(({ className }: Props) => {
  const { t } = useTranslation();
  const authData = useAppSelector(getUserAuthData);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  if (authData) {
    return (
      <ToggleFeatures
        featureName="isAppRedesigned"
        on={
          <nav className={classNames(styles.navBarRedesigned, {}, [className])}>
            <HStack gap={16} className={styles.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
            <LoginModal isOpen={isModalOpen} onClose={closeModal} />
          </nav>
        }
        off={
          <nav className={classNames(styles.navBar, {}, [className])}>
            <Text
              className={styles.appName}
              title={t("MyApp")}
              theme={TextTheme.INVERTED}
            />
            <AppLink
              to={getRouteArticleCreate()}
              theme={AppLinkTheme.Secondary}
            >
              {t("CreateArticle")}
            </AppLink>
            <HStack gap={16} className={styles.actions}>
              {/* eslint-disable-next-line react/button-has-type */}
              {/* <button onClick={() => setIsOpen((prev) => !prev)}> CLick</button> */}
              {/* <Drawer isOpen={isOpen} onClose={() => setIsOpen((prev) => !prev)}>
            <NotificationList />
          </Drawer> */}
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
            <LoginModal isOpen={isModalOpen} onClose={closeModal} />
          </nav>
        }
      />
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
