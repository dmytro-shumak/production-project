import { memo, type ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "app/providers/theme";
import { Overlay } from "../Overlay";
import { Portal } from "../Portal/Portal";
import styles from "./Drawer.module.css";

interface Props {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Drawer = memo((props: Props) => {
  const { className, children, onClose, isOpen } = props;
  const { theme } = useTheme();

  return (
    <Portal>
      <div
        className={classNames(
          styles.drawer,
          {
            [styles.opened]: isOpen,
          },
          [className, theme, "app_drawer"],
        )}
      >
        <Overlay onClick={onClose} className={styles.overlay}>
          <div className={styles.content}>{children}</div>
        </Overlay>
      </div>
    </Portal>
  );
});
