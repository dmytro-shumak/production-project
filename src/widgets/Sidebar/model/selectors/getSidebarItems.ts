import { createSelector } from "@reduxjs/toolkit";

import type { SidebarItemType } from "../types/sidebar";

import { getUserAuthData } from "@/entities/User";
import AboutIconDeprecated from "@/shared/assets/icons/about.svg?react";
import ArticleNew from "@/shared/assets/icons/article-new.svg?react";
import ArticleIconDeprecated from "@/shared/assets/icons/article.svg?react";
import AvatarIcon from "@/shared/assets/icons/avatar.svg?react";
import BookIcon from "@/shared/assets/icons/book.svg?react";
import HomeIcon from "@/shared/assets/icons/home.svg?react";
import MainIconDeprecated from "@/shared/assets/icons/main.svg?react";
import ProfileIconDeprecated from "@/shared/assets/icons/profile.svg?react";
import {
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
} from "@/shared/const/router";
import { toggleFeatures } from "@/shared/lib/features";

export const getSideBarItems = createSelector(
  getUserAuthData,
  (userAuthData) => {
    const sidebarItemsList: SidebarItemType[] = [
      {
        path: getRouteMain(),
        Icon: toggleFeatures({
          name: "isAppRedesigned",
          on: () => HomeIcon,
          off: () => MainIconDeprecated,
        }),
        text: "Main",
      },
      {
        path: getRouteAbout(),
        Icon: toggleFeatures({
          name: "isAppRedesigned",
          on: () => BookIcon,
          off: () => AboutIconDeprecated,
        }),
        text: "About",
      },
    ];
    if (userAuthData) {
      sidebarItemsList.push(
        {
          path: getRouteProfile(userAuthData.id),
          Icon: toggleFeatures({
            name: "isAppRedesigned",
            on: () => AvatarIcon,
            off: () => ProfileIconDeprecated,
          }),
          text: "Profile",
          authOnly: true, // Add authOnly prop to restrict access to the profile page to authenticated users.
        },
        {
          path: getRouteArticles(),
          Icon: toggleFeatures({
            name: "isAppRedesigned",
            on: () => ArticleNew,
            off: () => ArticleIconDeprecated,
          }),
          text: "Articles",
          authOnly: true, // Add authOnly prop to restrict access to the profile page to authenticated users.
        },
      );
    }

    return sidebarItemsList;
  },
);
