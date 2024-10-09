import { lazy, type FC } from "react";

export const ArticleEditPageLazy = lazy(
  () =>
    new Promise<{ default: FC }>((resolve) => {
      // Specify the type of the imported module
      setTimeout(() => {
        resolve(import("./ArticleEditPage"));
      }, 500);
    }),
);
