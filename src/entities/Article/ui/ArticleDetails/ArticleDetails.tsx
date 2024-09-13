import { memo, useEffect, type FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useAppDispatch, useAsyncReducer, type ReducersList } from "shared/lib";
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";
import styles from "./ArticleDetails.module.css";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";

interface Props {
  className?: string;
}

const reducer: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails: FC<Props> = memo(({ className }) => {
  const dispatch = useAppDispatch();

  useAsyncReducer(reducer, true);

  useEffect(() => {
    dispatch(fetchArticleById("1"));
  }, [dispatch]);

  return (
    <div className={classNames(styles.articleDetails, {}, [className])}>
      ArticleDetails
    </div>
  );
});
