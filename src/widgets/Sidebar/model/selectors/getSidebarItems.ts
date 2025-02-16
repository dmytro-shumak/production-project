import { createSelector } from "@reduxjs/toolkit";

import type { SidebarItemType } from "../types/sidebar";

import { getUserAuthData } from "@/entities/User";
import ArticleNew from "@/shared/assets/icons/article-new.svg?react";
import AvatarIcon from "@/shared/assets/icons/avatar.svg?react";
import BookIcon from "@/shared/assets/icons/book.svg?react";
import HomeIcon from "@/shared/assets/icons/home.svg?react";
import {
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
} from "@/shared/const/router";

export const getSideBarItems = createSelector(
  getUserAuthData,
  (userAuthData) => {
    const sidebarItemsList: SidebarItemType[] = [
      {
        path: getRouteMain(),
        Icon: HomeIcon,
        text: "Main",
      },
      {
        path: getRouteAbout(),
        Icon: BookIcon,
        text: "About",
      },
    ];
    if (userAuthData) {
      sidebarItemsList.push(
        {
          path: getRouteProfile(userAuthData.id),
          Icon: AvatarIcon,
          text: "Profile",
          authOnly: true, // Add authOnly prop to restrict access to the profile page to authenticated users.
        },
        {
          path: getRouteArticles(),
          Icon: ArticleNew,
          text: "Articles",
          authOnly: true, // Add authOnly prop to restrict access to the profile page to authenticated users.
        },
      );
    }

    return sidebarItemsList;
  },
);
