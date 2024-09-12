import type { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useAsyncReducer, type ReducersList } from "shared/lib";
import styles from "./ArticleDetails.module.css";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";

interface Props {
  className?: string;
}

const reducer: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails: FC<Props> = ({ className }) => {
  useAsyncReducer(reducer, true);
  return (
    <div className={classNames(styles.articleDetails, {}, [className])}>
      ArticleDetails
    </div>
  );
};
