import { LoginModal } from "features/AuthByUsername";
import { useCallback, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui";
import { useAppSelector } from "shared/lib";
import { getUserAuthData, logout } from "entities/User";
import { useDispatch } from "react-redux";
import styles from "./NavBar.module.css";

interface Props {
  className?: string;
}

export const NavBar: FC<Props> = ({ className }) => {
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

  if (authData) {
    return (
      <nav className={classNames(styles.navBar, {}, [className])}>
        <ul className={styles.links}>
          <Button theme={ButtonTheme.Outline} onClick={onLogout}>
            {t("Logout")}
          </Button>
        </ul>
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
};
