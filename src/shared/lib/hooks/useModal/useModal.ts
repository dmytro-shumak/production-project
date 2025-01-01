import { useCallback, useEffect, type MouseEvent } from "react";

interface Props {
  onClose?: () => void;
  isOpen?: boolean;
}

/**
 * Custom hook to manage modal behavior.
 *
 * @param {Function} onClose - Function to call when the modal should close.
 * @param {boolean} isOpen - Boolean indicating whether the modal is open.
 *
 * @returns {Object} An object containing the `contentClick` function.
 * @returns {Function} returns.contentClick - Function to handle click events on the modal content to stop propagation.
 */
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
