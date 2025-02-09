import { memo, type ReactNode } from "react";

import styles from "./StickyContentLayout.module.css";

import { classNames } from "@/shared/lib/classNames/classNames";

interface StickyContentLayoutProps {
  className?: string;
  left?: ReactNode;
  content: ReactNode;
  right?: ReactNode;
}

export const StickyContentLayout = memo((props: StickyContentLayoutProps) => {
  const { className, content, left, right } = props;

  return (
    <div className={classNames(styles.mainLayout, {}, [className])}>
      {right && <div className={styles.left}>{left}</div>}
      <div className={styles.content}>{content}</div>
      {left && <div className={styles.right}>{right}</div>}
    </div>
  );
});
