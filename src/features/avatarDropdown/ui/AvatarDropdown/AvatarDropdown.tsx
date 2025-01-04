import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  logout,
} from "@/entities/User";
import { getRouteAdminPanel, getRouteProfile } from "@/shared/const/router";
import { classNames, useAppSelector } from "@/shared/lib";
import { Avatar, Dropdown, type DropdownItem } from "@/shared/ui";

interface Props {
  className?: string;
}

export const AvatarDropdown = memo(({ className }: Props) => {
  const { t } = useTranslation();

  const authData = useAppSelector(getUserAuthData);
  const dispatch = useDispatch();
  const isAdmin = useAppSelector(isUserAdmin);
  const isManager = useAppSelector(isUserManager);

  const onLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const isAdminPanelAvailable = isAdmin || isManager;

  const items = useMemo<DropdownItem[]>(() => {
    return [
      ...(isAdminPanelAvailable
        ? [
            {
              content: t("AdminPanel"),
              href: getRouteAdminPanel(),
            },
          ]
        : []),
      {
        content: t("Profile"),
        href: authData?.id && getRouteProfile(authData.id),
      },
      { content: t("Logout"), onClick: onLogout },
    ];
  }, [authData?.id, isAdminPanelAvailable, onLogout, t]);

  if (!authData) {
    return null;
  }

  return (
    <Dropdown
      className={classNames("", {}, [className])}
      anchor="bottom end"
      button={<Avatar size={30} src={authData.avatar} />}
      items={items}
    />
  );
});
