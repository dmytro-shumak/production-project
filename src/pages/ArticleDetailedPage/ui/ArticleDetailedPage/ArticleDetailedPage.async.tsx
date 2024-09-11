import { lazy, type FC } from "react";

export const ArticleDetailedPageLazy = lazy(
  () =>
    new Promise<{ default: FC }>((resolve) => {
      // Specify the type of the imported module
      setTimeout(() => {
        resolve(import("./ArticleDetailedPage"));
      }, 500);
    }),
);
