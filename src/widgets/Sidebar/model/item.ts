import type { FunctionComponent, SVGAttributes } from "react";
import { RoutesPath } from "shared/config/route-config/routeConfig";
import AboutIcon from "shared/assets/icons/about.svg";
import MainIcon from "shared/assets/icons/main.svg";
import ProfileIcon from "shared/assets/icons/profile.svg";
import ArticleIcon from "shared/assets/icons/article.svg";

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: FunctionComponent<SVGAttributes<SVGElement>>;
  authOnly?: boolean; // Add authOnly prop to restrict access to the sidebar item. If true, only authenticated users will see the item.
}

export const SidebarItemsList: SidebarItemType[] = [
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
  {
    path: RoutesPath.profile,
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
];
