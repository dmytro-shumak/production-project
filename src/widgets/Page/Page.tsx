import { useRef, type ReactNode, type UIEvent } from "react";
import { useLocation } from "react-router-dom";

import styles from "./Page.module.css";

import {
  getScrollRestorationByPath,
  scrollRestorationActions,
} from "@/features/scrollRestoration";
import {
  classNames,
  useAppDispatch,
  useAppSelector,
  useInfiniteScroll,
  useInitialEffect,
} from "@/shared/lib";
import { toggleFeatures } from "@/shared/lib/features";
import { useThrottle } from "@/shared/lib/hooks/useThrottle/useThrottle";

interface Props {
  className?: string;
  onScrollEnd?: () => void;
  children: ReactNode;
  dataTestid?: string;
}

export const Page = ({
  className,
  children,
  onScrollEnd,
  dataTestid,
}: Props) => {
  const wrapperRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scrollPosition = useAppSelector((state) =>
    getScrollRestorationByPath(state, pathname),
  );

  useInfiniteScroll({
    triggerRef,
    wrapperRef: toggleFeatures({
      name: "isAppRedesigned",
      on: () => null,
      off: () => wrapperRef,
    }),
    callback: onScrollEnd,
  });

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
      className={classNames(
        toggleFeatures({
          name: "isAppRedesigned",
          on: () => styles.pageRedesigned,
          off: () => styles.page,
        }),
        {},
        [className],
      )}
      ref={wrapperRef}
      id="pageContainer"
      onScroll={onScroll}
      data-testid={dataTestid}
    >
      {children}
      {onScrollEnd ? <div className={styles.trigger} ref={triggerRef} /> : null}
    </main>
  );
};
