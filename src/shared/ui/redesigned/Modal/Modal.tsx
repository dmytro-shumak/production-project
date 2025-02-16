import { type FC, type ReactNode } from "react";

import { Overlay } from "../../redesigned/Overlay";
import { Portal } from "../../redesigned/Portal/Portal";

import styles from "./Modal.module.css";

import { classNames } from "@/shared/lib";
import { useModal } from "@/shared/lib/hooks";

interface Props {
  className?: string;
  contentClassName?: string;
  children?: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

export const Modal: FC<Props> = ({
  className,
  contentClassName,
  children,
  isOpen,
  onClose,
}) => {
  const { contentClick } = useModal({ isOpen, onClose });

  return (
    <Portal portalContainer={document.body}>
      <div
        className={classNames(styles.modal, { [styles.opened]: isOpen }, [
          className,
          styles.modalNew,
        ])}
      >
        <Overlay onClick={onClose}>
          <div
            className={classNames(styles.content, {}, [contentClassName])}
            onClick={contentClick}
          >
            {children}
          </div>
        </Overlay>
      </div>
    </Portal>
  );
};
