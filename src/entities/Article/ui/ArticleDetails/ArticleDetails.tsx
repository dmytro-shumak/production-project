import { memo, useEffect, type FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import {
  useAppDispatch,
  useAppSelector,
  useAsyncReducer,
  type ReducersList,
} from "shared/lib";
import { Text, TextAlign, TextTheme } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { Skeleton } from "shared/ui";
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails";
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";
import styles from "./ArticleDetails.module.css";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";

interface Props {
  className?: string;
  id: string;
}

const reducer: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails: FC<Props> = memo(({ className, id }) => {
  const { t } = useTranslation("article-details");
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getArticleDetailsIsLoading);
  const data = useAppSelector(getArticleDetailsData);
  const error = useAppSelector(getArticleDetailsError);

  useAsyncReducer(reducer, true);

  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div>
        <Skeleton
          width={200}
          height={200}
          borderRadius="100%"
          className={styles.avatar}
        />
        <Skeleton width={300} height={32} className={styles.title} />
        <Skeleton width={600} height={24} className={styles.skeleton} />
        <Skeleton width="100%" height={200} className={styles.skeleton} />
        <Skeleton width="100%" height={200} className={styles.skeleton} />
      </div>
    );
  }

  if (error) {
    return (
      <Text
        title={t("ErrorLoadingDetailsPage")}
        align={TextAlign.CENTER}
        theme={TextTheme.ERROR}
      />
    );
  }

  return (
    <div className={classNames(styles.articleDetails, {}, [className])}>
      ArticleDetails
    </div>
  );
});
