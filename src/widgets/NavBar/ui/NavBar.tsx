import { LoginModal } from "features/AuthByUsername";
import { useCallback, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui";
import styles from "./NavBar.module.css";

interface Props {
  className?: string;
}

export const NavBar: FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <nav className={classNames(styles.navBar, {}, [className])}>
      <ul className={styles.links}>
        <Button theme={ButtonTheme.Outline} onClick={openModal}>
          {t("Login")}
        </Button>
      </ul>
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
      {/* <Modal isOpen={isModalOpen} onClose={handleToggleModal} /> */}
    </nav>
  );
};
