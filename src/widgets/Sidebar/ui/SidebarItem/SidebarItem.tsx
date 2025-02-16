import { t } from "i18next";
import { memo } from "react";
import { useSelector } from "react-redux";

import type { SidebarItemType } from "../../model/types/sidebar";

import styles from "./SidebarItem.module.css";

import { getUserAuthData } from "@/entities/User";
import { classNames } from "@/shared/lib";
import { AppLink } from "@/shared/ui/redesigned/AppLink";
import { Icon } from "@/shared/ui/redesigned/Icon";

interface Props {
  item: SidebarItemType;
  collapsed?: boolean;
}

export const SidebarItem = memo<Props>(({ item, collapsed }) => {
  const isAuth = useSelector(getUserAuthData);

  if (item.authOnly && !isAuth) {
    return null; // Skip rendering for non-auth routes if user is not authenticated
  }

  return (
    <li>
      <AppLink
        activeClassName={styles.active}
        to={item.path}
        className={classNames(styles.itemRedesigned, {
          [styles.collapsed]: collapsed,
        })}
      >
        <Icon Svg={item.Icon} className={styles.redesignedIcon} />
        <span>{t(item.text)}</span>
      </AppLink>
    </li>
  );
});
