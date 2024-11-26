import { type FC, type ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useModal } from "shared/lib/hooks";
import { Overlay } from "../Overlay";
import { Portal } from "../Portal/Portal";
import styles from "./Modal.module.css";

interface Props {
  className?: string;
  children?: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

export const Modal: FC<Props> = ({ className, children, isOpen, onClose }) => {
  const { contentClick } = useModal({ isOpen, onClose });

  return (
    <Portal portalContainer={document.body}>
      <div
        className={classNames(styles.modal, { [styles.opened]: isOpen }, [
          className,
        ])}
      >
        <Overlay onClick={onClose}>
          <div className={styles.content} onClick={contentClick}>
            {children}
          </div>
        </Overlay>
      </div>
    </Portal>
  );
};
