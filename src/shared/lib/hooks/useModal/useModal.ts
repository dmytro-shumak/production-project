import { useCallback, useEffect, type MouseEvent } from "react";

interface Props {
  onClose?: () => void;
  isOpen?: boolean;
}

export const useModal = ({ onClose, isOpen }: Props) => {
  const contentClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose?.();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);

      return () => {
        window.removeEventListener("keydown", onKeyDown);
      };
    }
  }, [isOpen, onKeyDown]);

  return {
    contentClick,
  };
};
