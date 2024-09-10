import { AboutPage } from "pages/AboutPage";
import { MainPage } from "pages/MainPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { ProfilePage } from "pages/ProfilePage";
import type { RouteProps } from "react-router-dom";

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
};

export enum AppRoutes {
  MAIN = "main",
  ABOUT = "about",
  PROFILE = "profile",
  NOT_FOUND = "not_found",
}

export const RoutesPath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.ABOUT]: "/about",
  [AppRoutes.PROFILE]: "/profile",
  [AppRoutes.NOT_FOUND]: "*",
};

export const routesConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: RoutesPath.main,
    element: <MainPage />,
  },
  [AppRoutes.ABOUT]: {
    path: RoutesPath.about,
    element: <AboutPage />,
  },
  [AppRoutes.PROFILE]: {
    path: RoutesPath.profile,
    element: <ProfilePage />,
    authOnly: true, // Add authOnly prop to restrict access to the profile page to authenticated users.
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutesPath.not_found,
    element: <NotFoundPage />,
  },
};
