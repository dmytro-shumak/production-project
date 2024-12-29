import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import type { AnchorProps } from "@headlessui/react/dist/internal/floating";
import type { ReactNode } from "react";

import { AppLink } from "../../../AppLink";
import popupStyles from "../../styles/popup.module.css";

import styles from "./Dropdown.module.css";

import { classNames } from "@/shared/lib";

export interface DropdownItem {
  disabled?: boolean;
  className?: string;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface Props {
  className?: string;
  items: DropdownItem[];
  anchor?: AnchorProps;
  button: ReactNode;
}

export const Dropdown = ({
  className,
  button,
  items,
  anchor = "bottom",
}: Props) => {
  return (
    <Menu as="div" className={classNames(styles.menu, {}, [className])}>
      <MenuButton className={popupStyles.btn}>{button}</MenuButton>
      <MenuItems anchor={anchor} className={styles.menuItems}>
        {items.map((item, index) => {
          if (item.href) {
            return (
              <MenuItem
                as={AppLink}
                key={index}
                to={item.href}
                disabled={item.disabled}
                className={classNames(styles.link, {}, [item.className])}
              >
                <button
                  className={styles.item}
                  type="button"
                  onClick={item.onClick}
                >
                  {item.content}
                </button>
              </MenuItem>
            );
          }

          return (
            <MenuItem
              as={item.href ? AppLink : "div"}
              disabled={item.disabled}
              className={item.className}
              key={index}
            >
              <button
                className={styles.item}
                type="button"
                onClick={item.onClick}
              >
                {item.content}
              </button>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
};
