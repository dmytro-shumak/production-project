import { lazy, type FC } from "react";

export const ArticlesPageLazy = lazy(
  () =>
    new Promise<{ default: FC }>((resolve) => {
      // Specify the type of the imported module
      setTimeout(() => {
        resolve(import("./ArticlesPage"));
      }, 500);
    }),
);
