import { memo, type ReactNode } from "react";

import styles from "./MainLayout.module.css";

import { classNames } from "@/shared/lib";

interface Props {
  className?: string;
  header: ReactNode;
  content: ReactNode;
  sidebar: ReactNode;
  toolbar?: ReactNode;
}

export const MainLayout = memo(
  ({ className, content, header, sidebar, toolbar }: Props) => {
    return (
      <div className={classNames(styles.mainLayout, {}, [className])}>
        <div className={styles.sidebar}>{sidebar}</div>
        <div className={styles.content}>{content}</div>
        <div className={styles.rightBar}>
          <div className={styles.header}>{header}</div>
          <div className={styles.toolbar}>{toolbar}</div>
        </div>
      </div>
    );
  },
);
