import { type ReactNode } from "react";

import styles from "./Overlay.module.css";

import { classNames } from "@/shared/lib";

interface Props {
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}

export const Overlay = ({ className, onClick, children }: Props) => {
  return (
    <div
      className={classNames(styles.overlay, {}, [className])}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
