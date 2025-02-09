import {
  Popover as HPopover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import type { AnchorProps } from "@headlessui/react/dist/internal/floating";
import { memo, type ReactNode } from "react";

import popupStyles from "../../styles/popup.module.css";

import styles from "./Popover.module.css";

import { classNames } from "@/shared/lib";

interface Props {
  className?: string;
  menuClassName?: string;
  anchor?: AnchorProps;
  button: ReactNode;
  children: ReactNode;
}

export const Popover = memo(
  ({ button, className, menuClassName, children, anchor }: Props) => {
    return (
      <HPopover className={classNames(styles.popover, {}, [className])}>
        <PopoverButton as="div" className={popupStyles.btn}>
          {button}
        </PopoverButton>

        <PopoverPanel
          className={classNames(styles.menu, {}, [menuClassName])}
          anchor={anchor}
        >
          {children}
        </PopoverPanel>
      </HPopover>
    );
  },
);
