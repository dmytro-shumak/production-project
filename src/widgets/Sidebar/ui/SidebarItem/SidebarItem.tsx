import { t } from "i18next";
import { memo } from "react";
import { useSelector } from "react-redux";

import type { SidebarItemType } from "../../model/types/sidebar";

import styles from "./SidebarItem.module.css";

import { getUserAuthData } from "@/entities/User";
import { classNames } from "@/shared/lib";
import { AppLink, AppLinkTheme } from "@/shared/ui";

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
        to={item.path}
        theme={AppLinkTheme.InvertedPrimary}
        className={classNames("", { [styles.collapsed]: collapsed })}
      >
        <item.Icon className={styles.icon} />
        <span>{t(item.text)}</span>
      </AppLink>
    </li>
  );
});
