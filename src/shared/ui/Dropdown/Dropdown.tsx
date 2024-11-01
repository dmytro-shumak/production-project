import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { classNames } from "shared/lib";
import type { ReactNode } from "react";
import styles from "./Dropdown.module.css";

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
  button: ReactNode;
}

export const Dropdown = ({ className, button, items }: Props) => {
  return (
    <Menu as="div" className={classNames(styles.menu, {}, [className])}>
      <MenuButton className={styles.btn}>{button}</MenuButton>
      <MenuItems anchor="bottom" className={styles.menuItems}>
        {items.map((item) => {
          return (
            <MenuItem
              as="div"
              disabled={item.disabled}
              className={item.className}
            >
              <button className={styles.item} type="button">
                {item.content}
              </button>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
};
