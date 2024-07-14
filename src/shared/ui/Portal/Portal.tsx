import type { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
  portalContainer: HTMLElement;
}

export const Portal: FC<Props> = ({
  children,
  portalContainer = document.body,
}) => {
  return createPortal(children, portalContainer);
};
