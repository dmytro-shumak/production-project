import { useCallback, useEffect, useState, type RefObject } from "react";

export const useHover = (ref: RefObject<HTMLElement>) => {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);
  const onMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseenter", onMouseEnter);
      node.addEventListener("mouseleave", onMouseLeave);

      // Убираем обработчики событий при размонтировании
      return () => {
        node.removeEventListener("mouseenter", onMouseEnter);
        node.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, [onMouseEnter, onMouseLeave, ref]);

  return isHovered;
};
