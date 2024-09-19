import { AboutPage } from "pages/AboutPage";
import { ArticleDetailsPage } from "pages/ArticleDetailsPage";
import { ArticlesPage } from "pages/ArticlesPage";
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
  ARTICLES = "articles",
  ARTICLE_DETAILS = "article_details",
  NOT_FOUND = "not_found",
}

export const RoutesPath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.ABOUT]: "/about",
  [AppRoutes.PROFILE]: "/profile",
  [AppRoutes.ARTICLES]: "/articles",
  [AppRoutes.ARTICLE_DETAILS]: "/articles/:id",
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
    path: `${RoutesPath.profile}/:id`,
    element: <ProfilePage />,
    authOnly: true, // Add authOnly prop to restrict access to the profile page to authenticated users.
  },
  [AppRoutes.ARTICLES]: {
    path: RoutesPath.articles,
    element: <ArticlesPage />,
    authOnly: true, // Add authOnly prop to restrict access to the profile page to authenticated users.
  },
  [AppRoutes.ARTICLE_DETAILS]: {
    path: RoutesPath.article_details,
    element: <ArticleDetailsPage />,
    authOnly: true, // Add authOnly prop to restrict access to the profile page to authenticated users.
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutesPath.not_found,
    element: <NotFoundPage />,
  },
};
