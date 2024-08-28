import type { FunctionComponent, SVGAttributes } from "react";
import { RoutesPath } from "shared/config/route-config/routeConfig";
import AboutIcon from "shared/assets/icons/about.svg";
import MainIcon from "shared/assets/icons/main.svg";
import ProfileIcon from "shared/assets/icons/profile.svg";

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: FunctionComponent<SVGAttributes<SVGElement>>;
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
  },
];
