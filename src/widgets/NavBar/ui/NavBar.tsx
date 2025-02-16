import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./NavBar.module.css";

import { getUserAuthData } from "@/entities/User";
import { LoginModal } from "@/features/authByUsername";
import { AvatarDropdown } from "@/features/avatarDropdown";
import { NotificationButton } from "@/features/notificationButton";
import { classNames, useAppSelector } from "@/shared/lib";
import { HStack } from "@/shared/ui";
import { Button } from "@/shared/ui/redesigned/Button";

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
      <nav className={classNames(styles.navBarRedesigned, {}, [className])}>
        <HStack gap={16} className={styles.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
        <LoginModal isOpen={isModalOpen} onClose={closeModal} />
      </nav>
    );
  }

  return (
    <nav className={classNames(styles.navBarRedesigned, {}, [className])}>
      <ul className={styles.links}>
        <Button variant="clear" onClick={openModal}>
          {t("Login")}
        </Button>
      </ul>
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </nav>
  );
});
