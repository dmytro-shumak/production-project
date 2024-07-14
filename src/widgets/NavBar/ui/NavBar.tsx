import { useCallback, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui";
import { Modal } from "shared/ui/Modal/Modal";
import styles from "./NavBar.module.css";

interface Props {
  className?: string;
}

export const NavBar: FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  return (
    <nav className={classNames(styles.navBar, {}, [className])}>
      <ul className={styles.links}>
        <Button theme={ButtonTheme.Outline} onClick={handleToggleModal}>
          {t("Login")}
        </Button>
      </ul>
      <Modal isOpen={isModalOpen} onClose={handleToggleModal} />
    </nav>
  );
};
