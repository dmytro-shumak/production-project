import { lazy, type FC } from "react";

export const ArticleDetailsPageLazy = lazy(
  () =>
    new Promise<{ default: FC }>((resolve) => {
      // Specify the type of the imported module
      setTimeout(() => {
        resolve(import("./ArticleDetailsPage"));
      }, 500);
    }),
);
