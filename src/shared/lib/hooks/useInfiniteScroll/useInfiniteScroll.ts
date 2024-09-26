import { useEffect, type RefObject } from "react";

export interface UseInfiniteScrollOptions {
  callback?: () => void;
  triggerRef: RefObject<HTMLElement>;
  wrapperRef: RefObject<HTMLElement>;
}

export const useInfiniteScroll = ({
  callback,
  triggerRef,
  wrapperRef,
}: UseInfiniteScrollOptions) => {
  useEffect(() => {
    const triggerNode = triggerRef.current;
    if (!triggerNode || !callback) {
      return;
    }

    const options = {
      root: wrapperRef.current || document.body,
      rootMargin: "0px",
      threshold: 1,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback?.();
      }
    }, options);

    observer.observe(triggerNode);

    return () => {
      observer.unobserve(triggerNode);
    };
  }, [callback, triggerRef, wrapperRef]);
};
