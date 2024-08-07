import type { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Modal } from "shared/ui/Modal/Modal";
import { LoginForm } from "../LoginForm/LoginForm";
import styles from "./LoginModal.module.css";

interface Props {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: FC<Props> = ({ className, isOpen, onClose }) => {
  return (
    <Modal
      className={classNames(styles.loginModal, {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
    >
      <LoginForm isOpen={isOpen} />
    </Modal>
  );
};
