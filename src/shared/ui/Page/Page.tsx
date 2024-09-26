import { type ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./Page.module.css";

interface Props {
  className?: string;
  children: ReactNode;
}

export const Page = ({ className, children }: Props) => {
  return (
    <section className={classNames(styles.page, {}, [className])}>
      {children}
    </section>
  );
};
