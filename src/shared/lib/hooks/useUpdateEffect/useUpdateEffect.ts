import { useEffect, useRef, type DependencyList } from "react";

export const useUpdateEffect = (
  callback: (...args: any[]) => void,
  deps: DependencyList,
) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

      return;
    }

    callback();
  }, [callback, deps]);
};
