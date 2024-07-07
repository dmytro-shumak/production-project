import { lazy, type FC } from "react";

export const AboutPageLazy = lazy(
  () =>
    new Promise<{ default: FC }>((resolve) => {
      // Specify the type of the imported module
      setTimeout(() => {
        resolve(import("./AboutPage"));
      }, 500);
    }),
);
