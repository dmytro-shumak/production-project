import {
  getScrollRestorationByPath,
  scrollRestorationActions,
} from "features/scrollRestoration";
import { useRef, type ReactNode, type UIEvent } from "react";
import { useLocation } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
  useInfiniteScroll,
  useInitialEffect,
} from "shared/lib";
import { classNames } from "shared/lib/classNames/classNames";
import { useThrottle } from "shared/lib/hooks/useThrottle/useThrottle";
import styles from "./Page.module.css";

interface Props {
  className?: string;
  onScrollEnd?: () => void;
  children: ReactNode;
}

export const Page = ({ className, children, onScrollEnd }: Props) => {
  const wrapperRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scrollPosition = useAppSelector((state) =>
    getScrollRestorationByPath(state, pathname),
  );

  useInfiniteScroll({ triggerRef, wrapperRef, callback: onScrollEnd });

  useInitialEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTop = scrollPosition;
    }
  });

  const onScroll = useThrottle((e: UIEvent<HTMLElement>) => {
    dispatch(
      scrollRestorationActions.setScrollPosition({
        position: e.currentTarget.scrollTop,
        path: pathname,
      }),
    );
  }, 500);

  return (
    <main
      className={classNames(styles.page, {}, [className])}
      ref={wrapperRef}
      id="pageContainer"
      onScroll={onScroll}
    >
      {children}
      {onScrollEnd ? <div className={styles.trigger} ref={triggerRef} /> : null}
    </main>
  );
};
