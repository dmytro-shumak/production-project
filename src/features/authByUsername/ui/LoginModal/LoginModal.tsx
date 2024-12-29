import type { FC } from "react";

import { LoginForm } from "../LoginForm/LoginForm";

import { classNames } from "@/shared/lib";
import { Modal } from "@/shared/ui/Modal";

interface Props {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: FC<Props> = ({ className, isOpen, onClose }) => {
  return (
    <Modal
      className={classNames("", {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
    >
      <LoginForm isOpen={isOpen} onSuccess={onClose} />
    </Modal>
  );
};
