import {
  useCallback,
  useEffect,
  type FC,
  type MouseEvent,
  type ReactNode,
} from "react";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./Modal.module.css";

interface Props {
  className?: string;
  children?: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

export const Modal: FC<Props> = ({ className, children, isOpen, onClose }) => {
  const handleOverlayClick = () => {
    onClose?.();
  };

  const handleContentClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === "Escape") {
      onClose?.();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div
      className={classNames(styles.modal, { [styles.opened]: isOpen }, [
        className,
      ])}
    >
      <div className={styles.overlay} onClick={handleOverlayClick}>
        <div className={styles.content} onClick={handleContentClick}>
          {children}
        </div>
      </div>
    </div>
  );
};
