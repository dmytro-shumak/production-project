import { lazy, type FC } from 'react';

export const MainPageLazy = lazy(
  () => new Promise<{ default: FC }>((resolve) => {
    // Specify the type of the imported module
    setTimeout(() => {
      resolve(import('./MainPage'));
    }, 500);
  }),
);
