import { type ReactNode } from "react";

import styles from "./Overlay.module.css";

import { classNames } from "@/shared/lib";
import { toggleFeatures } from "@/shared/lib/features";

interface Props {
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}

export const Overlay = ({ className, onClick, children }: Props) => {
  return (
    <div
      className={classNames(
        toggleFeatures({
          name: "isAppRedesigned",
          on: () => styles.overlayRedesigned,
          off: () => styles.overlay,
        }),
        {},
        [className],
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
