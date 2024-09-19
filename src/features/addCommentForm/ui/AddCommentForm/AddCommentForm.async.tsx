import { lazy, type FC } from "react";
import type { AddCommentFormProps } from "./AddCommentForm";

export const AddCommentFormLazy = lazy(
  () =>
    new Promise<{ default: FC<AddCommentFormProps> }>((resolve) => {
      // Specify the type of the imported module
      setTimeout(() => {
        resolve(import("./AddCommentForm"));
      }, 500);
    }),
);
