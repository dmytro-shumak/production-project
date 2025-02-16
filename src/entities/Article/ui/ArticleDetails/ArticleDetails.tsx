import { memo, useEffect, type FC } from "react";
import { useTranslation } from "react-i18next";

import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails";
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";

import styles from "./ArticleDetails.module.css";
import { renderArticleBlock } from "./renderArticleBlock";

import {
  classNames,
  useAppDispatch,
  useAppSelector,
  useAsyncReducer,
  type ReducersList,
} from "@/shared/lib";
import { TextAlign, Text as TextDeprecated, TextTheme } from "@/shared/ui";
import { AppImage } from "@/shared/ui/redesigned/AppImage";
import { Skeleton as SkeletonRedesigned } from "@/shared/ui/redesigned/Skeleton";
import { Text } from "@/shared/ui/redesigned/Text";

interface Props {
  className?: string;
  id: string;
}

const reducer: ReducersList = {
  articleDetails: articleDetailsReducer,
};

const Redesigned = () => {
  const article = useAppSelector(getArticleDetailsData);

  return (
    <>
      <Text title={article?.title} size="large" bold />
      <Text title={article?.subtitle} />
      <AppImage
        fallback={
          <SkeletonRedesigned width="100%" height={420} borderRadius={16} />
        }
        src={article?.img}
        className={styles.img}
      />
      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};

export const ArticleDetails: FC<Props> = memo(({ className, id }) => {
  const { t } = useTranslation("article-details");
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(getArticleDetailsIsLoading);
  const error = useAppSelector(getArticleDetailsError);

  useAsyncReducer(reducer, true);

  useEffect(() => {
    if (__PROJECT__ !== "storybook") {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  const Skeleton = SkeletonRedesigned;

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
      <TextDeprecated
        title={t("ErrorLoadingDetailsPage")}
        align={TextAlign.CENTER}
        theme={TextTheme.ERROR}
      />
    );
  }

  return (
    <div
      className={classNames(styles.articleDetails, {}, [className])}
      data-testid="ArticleDetails"
    >
      <Redesigned />
    </div>
  );
});
