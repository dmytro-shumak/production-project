import { lazy, type FC } from "react";

export const ProfilePageLazy = lazy(
  () =>
    new Promise<{ default: FC }>((resolve) => {
      // Specify the type of the imported module
      setTimeout(() => {
        resolve(import("./ProfilePage"));
      }, 500);
    }),
);
