import { useRef, type ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useInfiniteScroll } from "shared/lib";
import styles from "./Page.module.css";

interface Props {
  className?: string;
  onScrollEnd?: () => void;
  children: ReactNode;
}

export const Page = ({ className, children, onScrollEnd }: Props) => {
  const wrapperRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useInfiniteScroll({ triggerRef, wrapperRef, callback: onScrollEnd });

  return (
    <section
      className={classNames(styles.page, {}, [className])}
      ref={wrapperRef}
    >
      {children}
      <div ref={triggerRef} />
    </section>
  );
};
