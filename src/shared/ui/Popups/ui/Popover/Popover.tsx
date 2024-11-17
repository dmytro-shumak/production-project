import {
  Popover as HPopover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { memo, type ReactNode } from "react";
import { classNames } from "shared/lib";
import type { AnchorProps } from "@headlessui/react/dist/internal/floating";
import styles from "./Popover.module.css";
import popupStyles from "../../styles/popup.module.css";

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
        <PopoverButton className={popupStyles.btn}>{button}</PopoverButton>

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
