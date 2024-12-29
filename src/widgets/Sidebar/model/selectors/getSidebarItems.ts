import { createSelector } from "@reduxjs/toolkit";

import type { SidebarItemType } from "../types/sidebar";

import { getUserAuthData } from "@/entities/User";
import AboutIcon from "@/shared/assets/icons/about.svg?react";
import ArticleIcon from "@/shared/assets/icons/article.svg?react";
import MainIcon from "@/shared/assets/icons/main.svg?react";
import ProfileIcon from "@/shared/assets/icons/profile.svg?react";
import { RoutesPath } from "@/shared/const/router";

export const getSideBarItems = createSelector(
  getUserAuthData,
  (userAuthData) => {
    const sidebarItemsList: SidebarItemType[] = [
      {
        path: RoutesPath.main,
        Icon: MainIcon,
        text: "Main",
      },
      {
        path: RoutesPath.about,
        Icon: AboutIcon,
        text: "About",
      },
    ];
    if (userAuthData) {
      sidebarItemsList.push(
        {
          path: `${RoutesPath.profile}/${userAuthData.id}`,
          Icon: ProfileIcon,
          text: "Profile",
          authOnly: true, // Add authOnly prop to restrict access to the profile page to authenticated users.
        },
        {
          path: RoutesPath.articles,
          Icon: ArticleIcon,
          text: "Articles",
          authOnly: true, // Add authOnly prop to restrict access to the profile page to authenticated users.
        },
      );
    }

    return sidebarItemsList;
  },
);
